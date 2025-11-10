import { Server } from 'socket.io';
import type { NextApiRequest } from 'next';
// import type { NextApiResponseServerIO } from '@/types/next';
import type { NextApiResponseServerIO } from '@/lib/types/next';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponseServerIO
) {
  if (!res.socket.server.io) {
    const io = new Server(res.socket.server, {
      path: '/api/socket_io',
    });

    // Track online users in memory (for demo; use Redis for production)
    const onlineUsers = new Set<string>();

    io.on('connection', (socket) => {
      socket.on('user-online', (userId: string) => {
        onlineUsers.add(userId);
        io.emit('online-users', Array.from(onlineUsers));
      });

      socket.on('user-offline', (userId: string) => {
        onlineUsers.delete(userId);
        io.emit('online-users', Array.from(onlineUsers));
      });

      socket.on('disconnect', () => {
        // Optionally handle disconnects
      });
    });

    res.socket.server.io = io;
  }
  res.end();
}
