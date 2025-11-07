'use client';
import RoleSelectionCard from './RoleSelectionCard';
import { useLobbyStore } from '@/stores/useLobbyStore';

type RoleCard = {
  id: number;
  image?: string;
  name: string;
  description: string;
};

const RoleSelection = ({ roles }: { roles: RoleCard[] }) => {
  const { selectedRoles, setSelectedRoles } = useLobbyStore();

  const handleRoleSelect = (role: RoleCard) => {
    let updatedRoles;
    if (selectedRoles.some((r) => r.id === role.id)) {
      updatedRoles = selectedRoles.filter((r) => r.id !== role.id);
    } else {
      updatedRoles = [...selectedRoles, role];
    }
    setSelectedRoles(updatedRoles);
  };

  return (
    <div className=" mt-8">
      <h3 className="neon-text text-2xl text-center space-font">
        Select Role Cards (1/6)
      </h3>
      <div className="mt-6"></div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
        {roles.map((card) => (
          <RoleSelectionCard
            key={card.id}
            card={card}
            cardIsSelected={(role) =>
              selectedRoles.some((r) => r.id === role.id)
            }
            handleRoleSelect={handleRoleSelect}
          />
        ))}
      </div>
    </div>
  );
};
export default RoleSelection;
