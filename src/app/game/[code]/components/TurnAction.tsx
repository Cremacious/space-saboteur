'use client';

import { useGameStore } from '@/stores/useGameStore';
import { useEffect, useState } from 'react';
import { RoleType } from '@/lib/types/role.type';
import { RoleActionDispatcher } from './roleActions/RoleActionDispatcher';
import { advanceTurn } from '@/actions/game.action';

type RoleWithAbility = RoleType & { ability: string };

const TurnAction = ({
  userId,
  roles,
  gameCode,
}: {
  userId: string;
  roles: RoleWithAbility[];
  gameCode: string;
}) => {
  const {
    players,
    turnOrder,
    currentTurn,
    hasPerformedAction,
    setHasPerformedAction,
    nextTurn,
  } = useGameStore();
  const [currentRole, setCurrentRole] = useState<RoleWithAbility | null>(null);

  useEffect(() => {
    if (!turnOrder || turnOrder.length === 0 || roles.length === 0) return;
    const roleId = turnOrder[currentTurn];
    setCurrentRole(roles.find((r) => r.id === roleId) ?? null);
  }, [turnOrder, currentTurn, roles]);

  const player = players.find((p) => p.userId === userId || p.id === userId);
  const isMyTurn = player && player.roleId === currentRole?.id;

  function renderRoleAction() {
    if (!isMyTurn) return null;
    return (
      <RoleActionDispatcher
        roleName={currentRole?.name ?? ''}
        roles={roles}
        setHasPerformedAction={setHasPerformedAction}
      />
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto mt-8 mb-24">
      <div className="bg-cyan-900/30 border border-cyan-400 rounded-xl p-6 text-cyan-200 font-mono shadow-inner flex flex-col items-center">
        <div className="space-font text-lg mb-2">
          {isMyTurn
            ? currentRole?.ability || 'No ability for this role.'
            : currentRole
            ? `${currentRole.name} is taking their turn`
            : 'Waiting for turn...'}
        </div>
        {renderRoleAction()}
        {isMyTurn && (
          <button
            className="mt-4 bg-cyan-400 text-black px-6 py-2 rounded-full space-font font-bold"
            disabled={!hasPerformedAction}
            onClick={() => {
              nextTurn();
              setHasPerformedAction(false);
            }}
          >
            Complete Turn
          </button>
        )}
      </div>
    </div>
  );
};

export default TurnAction;
