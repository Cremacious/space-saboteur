'use client';
import RoleSelectionCard from './RoleSelectionCard';
import { useLobbyStore } from '@/stores/useLobbyStore';

type RoleCard = {
  id: string;
  image?: string;
  name: string;
  description: string;
};

const RoleSelection = ({ roles }: { roles: RoleCard[] }) => {
  const { selectedRoles, setSelectedRoles, players, hostId } = useLobbyStore();
  const userId = ''; // get current user id from auth/session

  const requiredRoles = players.length + 3;
  const selectedCount = selectedRoles.reduce((sum, r) => sum + r.quantity, 0);

  const handleAdd = (role: RoleCard) => {
    if (selectedCount >= requiredRoles) return;
    setSelectedRoles(role, 'add');
  };

  const handleRemove = (role: RoleCard) => setSelectedRoles(role, 'remove');

  const handleRoleSelect = (role: RoleCard) => {
    const isSelected = !!selectedRoles.find((r) => r.id === role.id);
    if (!isSelected && selectedCount >= requiredRoles) return;
    setSelectedRoles(role, 'toggle');
  };

  const cardIsSelected = (card: RoleCard) =>
    !!selectedRoles.find((r) => r.id === card.id);

  return (
    <div className="mt-8">
      <h3 className="neon-text text-2xl text-center space-font">
        Select Role Cards ({selectedCount}/{requiredRoles})
      </h3>
      {userId === hostId && selectedCount >= requiredRoles && (
        <div className="text-red-400 text-center mt-2">
          You have reached the maximum number of roles for this lobby.
        </div>
      )}
      <div className="mt-6"></div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
        {roles.map((card) => {
          const selected = selectedRoles.find((r) => r.id === card.id);
          return (
            <RoleSelectionCard
              key={card.id}
              card={card}
              quantity={selected?.quantity ?? 0}
              onAdd={() => handleAdd(card)}
              onRemove={() => handleRemove(card)}
              handleRoleSelect={() => handleRoleSelect(card)}
              cardIsSelected={cardIsSelected}
            />
          );
        })}
      </div>
      {userId === hostId && (
        <button
          disabled={selectedCount < requiredRoles}
          onClick={() => useLobbyStore.getState().startGame()}
        >
          Start Game
        </button>
      )}
    </div>
  );
};
export default RoleSelection;
