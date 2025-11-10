'use client';
import { useEffect } from 'react';
import io from 'socket.io-client';
import { useOnlineStore } from '@/stores/useOnlineStore';

export default function SocketProvider({ userId }: { userId: string }) {
  const setOnlineFriends = useOnlineStore((s) => s.setOnlineFriends);

  useEffect(() => {
    const socket = io('/', { path: '/api/socket' });

    socket.on('connect', () => {
      console.log('Socket connected:', socket.id);
      socket.emit('user-online', userId);
    });

    socket.on('online-users', (ids: string[]) => {
      console.log('Received online users:', ids);
      setOnlineFriends(ids);
    });

    socket.on('disconnect', () => {
      console.log('Socket disconnected');
      socket.emit('user-offline', userId);
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
