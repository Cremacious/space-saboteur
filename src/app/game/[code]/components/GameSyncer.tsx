'use client';
import { useEffect } from 'react';
import { useGameStore } from '@/stores/useGameStore';

export default function GameSyncer({ code }: { code: string }) {
  useEffect(() => {
    useGameStore.getState().syncGame(code);
  }, [code]);
  return null;
}
