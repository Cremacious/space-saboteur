'use client';
import { useEffect } from 'react';
import io from 'socket.io-client';
import { useOnlineStore } from '@/stores/useOnlineStore';

const SOCKET_URL = '/api/socket';

export default function SocketProvider({ userId }: { userId: string }) {
  const setOnlineFriends = useOnlineStore((s) => s.setOnlineFriends);

  useEffect(() => {
    const socket = io(SOCKET_URL, { path: '/api/socket' });

    socket.emit('user-online', userId);

    socket.on('online-users', (ids: string[]) => {
      setOnlineFriends(ids);
    });

    window.addEventListener('beforeunload', () => {
      socket.emit('user-offline', userId);
      socket.disconnect();
    });

    return () => {
      socket.emit('user-offline', userId);
      socket.disconnect();
    };
  }, [userId, setOnlineFriends]);

  return null;
}
