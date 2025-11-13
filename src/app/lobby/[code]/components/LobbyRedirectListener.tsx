'use client'
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useLobbyStore } from '@/stores/useLobbyStore';

const LobbyRedirectListener = () => {
  const router = useRouter();
  const { socket } = useLobbyStore();

  useEffect(() => {
    if (!socket) return;
    const handler = ({ code }: { code: string }) => {
      router.push(`/game/${code}`);
    };
    socket.on('redirect-to-game', handler);
    return () => {
      socket.off('redirect-to-game', handler);
    };
  }, [socket, router]);

  return null;
};

export default LobbyRedirectListener;
