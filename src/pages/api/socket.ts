import { Server } from 'socket.io';
import type { NextApiRequest } from 'next';
import type { NextApiResponseServerIO } from '@/lib/types/next';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponseServerIO
) {
  if (!res.socket.server.io) {
    const io = new Server(res.socket.server, {
      path: '/api/socket',
    });

    const onlineUsers = new Set<string>();

    io.on('connection', (socket) => {
      console.log('New socket connection:', socket.id);

      socket.on('user-online', (userId: string) => {
        console.log('User online:', userId);
        onlineUsers.add(userId);
        io.emit('online-users', Array.from(onlineUsers));
      });

      socket.on('user-offline', (userId: string) => {
        console.log('User offline:', userId);
        onlineUsers.delete(userId);
        io.emit('online-users', Array.from(onlineUsers));
      });

      socket.on('disconnect', () => {
        console.log('Socket disconnected:', socket.id);
      });

      socket.on('join-lobby', (lobbyCode) => {
        console.log('join-lobby', lobbyCode);
        socket.join(lobbyCode);
      });

      socket.on('player-ready', ({ gameCode }) => {
        if (gameCode) {
          io.to(gameCode).emit('player-ready', { gameCode });
        }
      });

      socket.on('update-lobby-settings', ({ lobbyCode, settings }) => {
        console.log(
          'Emitting lobby-settings-updated',
          settings,
          'to',
          lobbyCode
        );
        io.in(lobbyCode)
          .allSockets()
          .then((sockets) => {
            console.log('Sockets in room', lobbyCode, Array.from(sockets));
          });
        io.to(lobbyCode).emit('lobby-settings-updated', settings);
        console.log('Being sent...');
        io.emit('lobby-settings-updated', settings);
      });

      socket.on('game-started', ({ lobbyCode }) => {
        io.to(lobbyCode).emit('redirect-to-game', { code: lobbyCode });
      });
    });

    res.socket.server.io = io;
  }
  res.end();
}
