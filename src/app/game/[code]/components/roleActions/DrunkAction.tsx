'use client';
import { useGameStore } from '@/stores/useGameStore';
import { RoleType } from '@/lib/types/role.type';
import { useState } from 'react';

import { swapDrunkWithCenter } from '@/actions/game.action';

export default function DrunkAction({
  roles,
  setHasPerformedAction,
  userId,
  gameCode,
}: {
  roles: RoleType[];
  setHasPerformedAction: (v: boolean) => void;
  userId: string;
  gameCode: string;
}) {
  const { centerDeck, players, syncGame } = useGameStore();
  const [swappedIdx, setSwappedIdx] = useState<number | null>(null);
  const [swapDone, setSwapDone] = useState(false);

  const player = players.find((p) => p.userId === userId || p.id === userId);

  const handleSwap = async (idx: number) => {
    if (swapDone || !player) return;
    setSwappedIdx(idx);
    // Call your server action to swap roles in the DB
    await swapDrunkWithCenter(gameCode, player.id, centerDeck[idx].position);
    // Sync the game state after swap
    await syncGame(gameCode);
    setSwapDone(true);
    setHasPerformedAction(true);
  };

  return (
    <div>
      <div className="mb-2">Choose a center card to swap with your role:</div>
      <div className="flex justify-center gap-6">
        {centerDeck.map((card, idx) => (
          <button
            key={idx}
            disabled={swapDone}
            onClick={() => handleSwap(idx)}
            className="metallic-box w-24 h-36 flex items-center justify-center text-cyan-300 space-font text-lg border-2 border-cyan-400 shadow-lg"
          >
            <span>?</span>
          </button>
        ))}
      </div>
      {swapDone && (
        <div className="mt-4 text-yellow-400 font-bold">
          You swapped your role with a center card. You do not know your new role!
        </div>
      )}
    </div>
  );
}