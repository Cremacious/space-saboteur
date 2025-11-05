'use client';
import { useState } from 'react';
import RoleSelectionCard from './RoleSelectionCard';

type RoleCard = {
  id: number;
  image: string;
  name: string;
  description: string;
};



const RoleSelection = ({ roles }: { roles: RoleCard[] }) => {
  const [selectedRoles, setSelectedRoles] = useState<RoleCard[]>([]);

  const handleRoleSelect = (role: RoleCard) => {
    if (selectedRoles.includes(role)) {
      setSelectedRoles(selectedRoles.filter((r) => r !== role));
    } else {
      setSelectedRoles([...selectedRoles, role]);
    }
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
            selectedRoles={selectedRoles}
            handleRoleSelect={handleRoleSelect}
          />
        ))}
      </div>
    </div>
  );
};
export default RoleSelection;
