'use client';
import { useGameStore } from '@/stores/useGameStore';
import { RoleType } from '@/lib/types/role.type';
import { useEffect, useState } from 'react';

export default function InsomniacAction({
  roles,
  setHasPerformedAction,
  userId,
}: {
  roles: RoleType[];
  setHasPerformedAction: (v: boolean) => void;
  userId: string;
}) {
  const { players } = useGameStore();
  const [currentRoleName, setCurrentRoleName] = useState<string | null>(null);

  useEffect(() => {
    const player = players.find((p) => p.userId === userId || p.id === userId);
    if (player) {
      const role = roles.find((r) => r.id === player.roleId);
      setCurrentRoleName(role?.name ?? null);
    }
    setHasPerformedAction(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [players, roles, userId]);

  return (
    <div className="text-center">
      {currentRoleName === 'Insomniac' ? (
        <div>
          <div className="mb-2 text-cyan-300 font-bold">
            Your role has not changed, you are still the Insomniac.
          </div>
        </div>
      ) : (
        <div>
          <div className="mb-2 text-cyan-300 font-bold">
            Your role has been changed to...
          </div>
          <div className="text-2xl text-yellow-300 font-bold">
            {currentRoleName}
          </div>
        </div>
      )}
    </div>
  );
}
