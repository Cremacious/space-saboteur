export type Role = {
  id: number;
  image: string;
  name: string;
  description: string;
  ability: string;
};

export const ROLES: Role[] = [
  {
    id: 1,
    image: '/assets/roles/saboteur-profile.png',
    name: 'Saboteur',
    description: 'Secretly tries to sabotage the mission.',
    ability:
      'Saboteurs can spot other saboteurs on their turn. If only one saboteur, you may look at a card from the center.',
  },
  {
    id: 2,
    image: '/assets/roles/spy-profile.png',
    name: 'Spy',
    description: 'Only wins if the saboteur wins.',
    ability: 'Minions can see who the saboteur is on their turn.',
  },
  {
    id: 3,
    image: '/assets/roles/psychic-profile.png',
    name: 'Psychic',
    description: "Can look at one player's card or two center cards.",
    ability:
      'You may look at another player’s card or two of the center cards.',
  },
  {
    id: 4,
    image: '/assets/roles/kleptomaniac-profile.png',
    name: 'Kleptomaniac',
    description: "Switches their role with another player's.",
    ability:
      'You may exchange your card with another player’s card, and then view your new card.',
  },
  {
    id: 5,
    image: '/assets/roles/engineer-profile.png',
    name: 'Engineer',
    description: "Switches two other player's cards.",
    ability: 'You may exchange cards between two other players.',
  },
  {
    id: 6,
    image: '/assets/roles/drunk-profile.png',
    name: 'Drunk',
    description: 'Trades role with a card in the center.',
    ability: 'You may exchange your card with a card from the center.',
  },
  {
    id: 7,
    image: '/assets/roles/insomniac-profile.png',
    name: 'Insomniac',
    description: 'Can check if their card has been changed.',
    ability: 'You may look at your card to see if it was changed.',
  },
  {
    id: 8,
    image: '/assets/roles/nihilist-profile.png',
    name: 'Nihilist',
    description: 'Does not have an ability, and his goal is to die.',
    ability: 'You have no ability, only the desire to be voted out.',
  },
  {
    id: 9,
    image: '/assets/roles/passenger-profile.png',
    name: 'Passenger',
    description: 'Does not wake at night and has no special abilities.',
    ability: 'He has no special abilities, but he is definitely innocent.',
  },
];
