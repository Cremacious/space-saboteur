'use client';
import { useEffect } from 'react';
import { useLobbyStore } from '@/stores/useLobbyStore';

const LobbyStoreResetter = ({ code }: { code: string }) => {
  useEffect(() => {
    useLobbyStore.getState().reset();
  }, [code]);
  return null;
};
export default LobbyStoreResetter;
