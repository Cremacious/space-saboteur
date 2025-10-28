import RoleCard from '@/components/roles/RoleCard';

const characterCards = [
  { name: 'Saboteur', description: 'Secretly tries to sabotage the mission.' },
  { name: 'Spy', description: 'Wins if the saboteur is successful.' },
  {
    name: 'Psychic',
    description: "Can look at one player's card or two center cards",
  },
  {
    name: 'Kleptomaniac',
    description: "Switches their role with another player's",
  },
  { name: 'Engineer', description: "Switches two other player's cards" },
  { name: 'Drunk', description: 'Trades role with a card in the center' },
  {
    name: 'Insomniac',
    description: 'Can  check if their card has been changed.',
  },
  {
    name: 'Nihilist',
    description: 'Does not have an ability, and his goal is to die.',
  },
  {
    name: 'Passenger',
    description: 'Does not wake at night and has no special abilities',
  },
];

const RoleSelection = () => {
  return (
    <div className="">
      <h3 className="neon-text text-lg mb-4 text-center space-font">
        Select Role Cards (0/6)
      </h3>
      <div className="mt-6"></div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {characterCards.map((card) => (
          <div key={card.name} className="metallic-box p-4 hoverAnimate">
            <div className="space-font text-xl font-bold mb-2 text-center neon-text">
              {card.name}
            </div>
            <div className=" text-white text-center space-font">
              {card.description}
            </div>
            {/* Add selection logic here if needed */}
          </div>
        ))}
      </div>
    </div>
  );
};
export default RoleSelection;
