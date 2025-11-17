'use client';
import { useGameStore } from '@/stores/useGameStore';
import { RoleType } from '@/lib/types/role.type';
import { useEffect } from 'react';

export default function SpyAction({
  roles,
  setHasPerformedAction,
}: {
  roles: RoleType[];
  setHasPerformedAction: (v: boolean) => void;
}) {
  const { players } = useGameStore();

  const saboteurRole = roles.find((r) => r.name === 'Saboteur');
  const saboteurRoleId = saboteurRole?.id;

  const saboteurPlayers = players.filter((p) => p.roleId === saboteurRoleId);

  useEffect(() => {

    setHasPerformedAction(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="text-center">
      {saboteurPlayers.length > 0 ? (
        <div>
          {saboteurPlayers.map((player) => (
            <div key={player.id} className="mb-2 text-cyan-300 font-bold">
              {player.name} is the saboteur
            </div>
          ))}
        </div>
      ) : (
        <div className="text-cyan-300 font-bold">
          No active player is the saboteur...
        </div>
      )}
    </div>
  );
}