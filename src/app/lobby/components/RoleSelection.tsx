'use client';
import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';

type CharacterCard = {
  id: number;
  name: string;
  description: string;
};

const characterCards = [
  {
    id: 1,
    name: 'Saboteur',
    description: 'Secretly tries to sabotage the mission.',
  },
  { id: 2, name: 'Spy', description: 'Wins if the saboteur is successful.' },
  {
    id: 3,
    name: 'Psychic',
    description: "Can look at one player's card or two center cards",
  },
  {
    id: 4,
    name: 'Kleptomaniac',
    description: "Switches their role with another player's",
  },
  { id: 5, name: 'Engineer', description: "Switches two other player's cards" },
  {
    id: 6,
    name: 'Drunk',
    description: 'Trades role with a card in the center',
  },
  {
    id: 7,
    name: 'Insomniac',
    description: 'Can  check if their card has been changed.',
  },
  {
    id: 8,
    name: 'Nihilist',
    description: 'Does not have an ability, and his goal is to die.',
  },
  {
    id: 9,
    name: 'Passenger',
    description: 'Does not wake at night and has no special abilities',
  },
];

const RoleSelection = () => {
  const [selectedRoles, setSelectedRoles] = useState<CharacterCard[]>([]);

  const handleRoleSelect = (role: CharacterCard) => {
    if (selectedRoles.includes(role)) {
      setSelectedRoles(selectedRoles.filter((r) => r !== role));
    } else {
      setSelectedRoles([...selectedRoles, role]);
    }
  };

  return (
    <div className="">
      <h3 className="neon-text text-lg mb-4 text-center space-font">
        Select Role Cards (1/6)
      </h3>
      <div className="mt-6"></div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {characterCards.map((card) => (
          <div
            onClick={() => handleRoleSelect(card)}
            key={card.id}
            className="metallic-box p-4 hoverAnimate justify-between flex flex-col"
          >
            <div>
              <div className="space-font text-xl font-bold mb-2 text-center neon-text">
                {card.name}
              </div>
              <div className=" text-white text-center space-font">
                {card.description}
              </div>
            </div>
            {selectedRoles.includes(card) && (
              <div>
                <div className="bg-slate-800 rounded-xl p-2 mt-4 text-center text-white space-font border-2 border-white">
                  <div>Selected</div>

                  {(card.id === 1 || card.id === 9) && (
                    <div className="flex flex-row gap-6 justify-center items-center mt-2">
                      <Button className="flex items-center justify-center">
                        <Minus className="text-black" />
                      </Button>
                      <div className="text-xl">1</div>
                      <Button className="flex items-center justify-center">
                        <Plus className="text-black" />
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      {selectedRoles.length > 0 && (
        <div className="mt-4 text-white space-font text-center">
          Selected Roles: {selectedRoles.map((role) => role.name).join(', ')}
        </div>
      )}
    </div>
  );
};
export default RoleSelection;
