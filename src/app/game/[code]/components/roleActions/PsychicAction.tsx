'use client';
import { useGameStore } from '@/stores/useGameStore';
import { RoleType } from '@/lib/types/role.type';
import { useState } from 'react';

export default function PsychicAction({
  roles,
  setHasPerformedAction,
}: {
  roles: RoleType[];
  setHasPerformedAction: (v: boolean) => void;
}) {
  const { centerDeck, players } = useGameStore();
  const [revealedCenterIdxs, setRevealedCenterIdxs] = useState<number[]>([]);
  const [revealedPlayerId, setRevealedPlayerId] = useState<string | null>(null);

  function handleCenterClick(idx: number) {
    if (revealedCenterIdxs.length < 2 && !revealedCenterIdxs.includes(idx)) {
      const newIdxs = [...revealedCenterIdxs, idx];
      setRevealedCenterIdxs(newIdxs);
      if (newIdxs.length === 2) setHasPerformedAction(true);
    }
  }

  function handlePlayerClick(playerId: string) {
    setRevealedPlayerId(playerId);
    setHasPerformedAction(true);
  }

  return (
    <div>
      <div className="mb-4 font-bold">Psychic: Choose one action</div>
      <div className="mb-2">Option 1: Reveal two center cards</div>
      <div className="flex justify-center gap-6 mb-4">
        {centerDeck.map((card, idx) => (
          <button
            key={idx}
            disabled={
              revealedCenterIdxs.length === 2 ||
              revealedCenterIdxs.includes(idx) ||
              revealedPlayerId !== null
            }
            onClick={() => handleCenterClick(idx)}
            className="metallic-box w-24 h-36 flex items-center justify-center text-cyan-300 space-font text-lg border-2 border-cyan-400 shadow-lg"
          >
            <span>
              {revealedCenterIdxs.includes(idx)
                ? roles.find((r) => r.id === card.roleId)?.name ?? '?'
                : '?'}
            </span>
          </button>
        ))}
      </div>
      <div className="mb-2">Option 2: Reveal another player&apos;s role</div>
      <div className="flex flex-wrap gap-2 justify-center">
        {players.map((player) => (
          <button
            key={player.id}
            disabled={
              revealedPlayerId !== null ||
              revealedCenterIdxs.length > 0 ||
              player.roleId == null
            }
            onClick={() => handlePlayerClick(player.id)}
            className="px-4 py-2 rounded bg-cyan-800 text-cyan-200 border border-cyan-400"
          >
            {player.name}
          </button>
        ))}
      </div>
      {revealedPlayerId && (
        <div className="mt-4 text-center text-cyan-300 text-lg">
          <span className="font-bold">
            {players.find((p) => p.id === revealedPlayerId)?.name}
          </span>
          {' is '}
          <span className="font-bold">
            {roles.find(
              (r) =>
                r.id === players.find((p) => p.id === revealedPlayerId)?.roleId
            )?.name ?? '?'}
          </span>
        </div>
      )}
    </div>
  );
}
