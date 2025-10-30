'use client';
import { useState } from 'react';
import RoleSelectionCard from './RoleSelectionCard';
import drunkImage from '@/assets/roles/drunk-profile.png';
import engineerImage from '@/assets/roles/engineer-profile.png';
import saboteurImage from '@/assets/roles/saboteur-profile.png';
import insomniacImage from '@/assets/roles/insomniac-profile.png';
import kleptomaniacImage from '@/assets/roles/kleptomaniac-profile.png';
import nihilistImage from '@/assets/roles/nihilist-profile.png';
import passengerImage from '@/assets/roles/passenger-profile.png';
import psychicImage from '@/assets/roles/psychic-profile.png';
import spyImage from '@/assets/roles/spy-profile.png';

type CharacterCard = {
  id: number;
  name: string;
  description: string;
};

const characterCards = [
  {
    id: 1,
    image: saboteurImage,
    name: 'Saboteur',
    description: 'Secretly tries to sabotage the mission.',
  },
  {
    id: 2,
    image: spyImage,
    name: 'Spy',
    description: 'Wins if the saboteur is successful.',
  },
  {
    id: 3,
    image: psychicImage,
    name: 'Psychic',
    description: "Can look at one player's card or two center cards",
  },
  {
    id: 4,
    name: 'Kleptomaniac',
    image: kleptomaniacImage,
    description: "Switches their role with another player's",
  },
  {
    id: 5,
    name: 'Engineer',
    image: engineerImage,
    description: "Switches two other player's cards",
  },
  {
    id: 6,
    name: 'Drunk',
    image: drunkImage,
    description: 'Trades role with a card in the center',
  },
  {
    id: 7,
    image: insomniacImage,
    name: 'Insomniac',
    description: 'Can  check if their card has been changed.',
  },
  {
    id: 8,
    image: nihilistImage,
    name: 'Nihilist',
    description: 'Does not have an ability, and his goal is to die.',
  },
  {
    id: 9,
    image: passengerImage,
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
    <div className=" mt-8">
      <h3 className="neon-text text-2xl text-center space-font">
        Select Role Cards (1/6)
      </h3>
      <div className="mt-6"></div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
        {characterCards.map((card) => (
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
