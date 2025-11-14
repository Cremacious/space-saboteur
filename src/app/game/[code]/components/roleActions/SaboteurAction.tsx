
import { useGameStore } from '@/stores/useGameStore';
import { RoleType } from '@/lib/types/role.type';
import { useState } from 'react';

export default function SaboteurAction({
  roles,
  setHasPerformedAction,
}: {
  roles: RoleType[];
  setHasPerformedAction: (v: boolean) => void;
}) {
  const { centerDeck } = useGameStore();
  const [revealedIdx, setRevealedIdx] = useState<number | null>(null);

  return (
    <div>
      <div className="mb-2">Click a center card to reveal it:</div>
      <div className="flex justify-center gap-6">
        {centerDeck.map((card, idx) => (
          <button
            key={idx}
            disabled={revealedIdx !== null}
            onClick={() => {
              setRevealedIdx(idx);
              setHasPerformedAction(true);
            }}
            className="metallic-box w-24 h-36 flex items-center justify-center text-cyan-300 space-font text-lg border-2 border-cyan-400 shadow-lg"
          >
            <span>
              {revealedIdx === idx
                ? roles.find((r) => r.id === card.roleId)?.name ?? '?'
                : '?'}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
