'use client';

import { useGameStore } from '@/stores/useGameStore';
import { RoleType } from '@/lib/types/role.type';

const CenterDeck = ({
  revealedIdx,
  roles,
}: {
  revealedIdx?: number | null;
  roles: RoleType[];
}) => {
  const { centerDeck } = useGameStore();
  return (
    <div className="w-full max-w-md mx-auto flex justify-center gap-6 my-8">
      {centerDeck.map((card, idx) => {
        const role = roles.find((r) => r.id === card.roleId);
        return (
          <div
            key={idx}
            className="metallic-box w-24 h-36 flex items-center justify-center text-cyan-300 space-font text-lg border-2 border-cyan-400 shadow-lg"
          >
            <span>
              {revealedIdx === idx ? role?.name ?? '?' : '?'}
            </span>
          </div>
        );
      })}
    </div>
  );
};
export default CenterDeck;