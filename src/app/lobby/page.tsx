import Header from '@/components/layout/Header';
import { Button } from '@/components/ui/button';

const roomCode = 'ABCD1234';
const lobbyUsers = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
  { id: 3, name: 'Charlie' },
];
const friends = [
  { id: 4, name: 'David', invited: false },
  { id: 5, name: 'Eve', invited: false },
  { id: 6, name: 'Frank', invited: true },
];
const characterCards = [
  { name: 'Saboteur', description: 'Secretly tries to sabotage the mission.' },
  { name: 'Engineer', description: 'Can fix broken systems each round.' },
  { name: 'Medic', description: 'Can protect a player from being kicked.' },
  { name: 'Pilot', description: 'Can swap two players’ positions.' },
  { name: 'Scientist', description: 'Can reveal a card once per game.' },
  { name: 'Guard', description: 'Can block a player’s action.' },
  { name: 'Spy', description: 'Can peek at another player’s card.' },
  { name: 'Commander', description: 'Can change the order of play.' },
  { name: 'Alien', description: 'Has a mysterious effect each round.' },
];

const LobbyPage = () => {
  return (
    <div className="min-h-screen flex items-center">
      <div className="max-w-5xl mx-auto py-10 px-4">
        <div className="metallic-container">
          <h2 className="neon-header">Lobby</h2>
          {/* Room Code */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <div>
              <span className="label-text">Room Code</span>
              <div className="text-2xl font-bold space-font">{roomCode}</div>
            </div>
            <button className="space-button bg-cyan-700 text-white px-4 py-2 rounded-lg hover:bg-cyan-500 transition">
              Copy Room Code
            </button>
          </div>

          {/* Users in Lobby */}
          <div className="mb-8">
            <h3 className="neon-text mb-2">Players in Lobby</h3>
            <ul className="flex flex-wrap gap-3">
              {lobbyUsers.map((user) => (
                <li key={user.id} className="metallic-list-item space-font">
                  {user.name}
                </li>
              ))}
            </ul>
          </div>

          {/* Friends List */}
          <div className="mb-8">
            <h3 className="neon-text mb-2">Invite Friends</h3>
            <ul className="space-y-2">
              {friends.map((friend) => (
                <li
                  key={friend.id}
                  className="flex items-center justify-between metallic-list-item"
                >
                  <span className="space-font">{friend.name}</span>
                  <button
                    className={`space-button px-3 py-1 rounded ${
                      friend.invited
                        ? 'bg-gray-400 text-gray-700 cursor-not-allowed'
                        : 'bg-cyan-600 text-white hover:bg-cyan-400'
                    }`}
                    disabled={friend.invited}
                  >
                    {friend.invited ? 'Invited' : 'Invite'}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Character Card Selection */}
          <div className="mb-2">
            <h3 className="neon-text mb-4">Select Character Cards</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {characterCards.map((card) => (
                <div key={card.name} className="metallic-box p-4 hoverAnimate">
                  <div className="space-font text-lg font-bold mb-2">
                    {card.name}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {card.description}
                  </div>
                  {/* Add selection logic here if needed */}
                </div>
              ))}
            </div>
          </div>
          {/* Start Game Button */}
          <div className="flex justify-center mt-8">
            <Button variant={'defaultLarge'} className="">
              Start Game
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LobbyPage;
