'use client';
import { useGameStore } from '@/stores/useGameStore';
import { RoleType } from '@/lib/types/role.type';
import { useState } from 'react';
// You already have this server action:
import { swapPlayerRoles } from '@/actions/game.action';

const KleptomaniacAction = ({
  roles,
  setHasPerformedAction,
  userId,
  gameCode,
}: {
  roles: RoleType[];
  setHasPerformedAction: (v: boolean) => void;
  userId: string;
  gameCode: string;
}) => {
  const { players, syncGame } = useGameStore();
  const [selected, setSelected] = useState<string | null>(null);
  const [swapDone, setSwapDone] = useState(false);

  const otherPlayers = players.filter(
    (p) => p.userId !== userId && p.id !== userId
  );

  const handleSwap = async (playerId: string) => {
    if (swapDone) return;
    setSelected(playerId);
    const me = players.find((p) => p.userId === userId || p.id === userId);
    if (!me) return;
    await swapPlayerRoles(gameCode, me.id, playerId);
    await syncGame(gameCode);
    setSwapDone(true);
    setHasPerformedAction(true);
  };

  return (
    <div>
      <div className="mb-2">Select a player to swap your role with:</div>
      <div className="flex flex-wrap gap-2 justify-center mb-4">
        {otherPlayers.map((player) => (
          <button
            key={player.id}
            onClick={() => handleSwap(player.id)}
            disabled={swapDone}
            className={`px-4 py-2 rounded border ${
              selected === player.id
                ? 'bg-cyan-400 text-black border-cyan-700 font-bold'
                : 'bg-cyan-800 text-cyan-200 border-cyan-400'
            }`}
          >
            {player.name}
          </button>
        ))}
      </div>
      {swapDone && (
        <div className="mt-4 text-green-400 font-bold">
          Roles swapped! You may now complete your turn.
        </div>
      )}
    </div>
  );
};

export default KleptomaniacAction;
