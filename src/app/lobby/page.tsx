import { Button } from '@/components/ui/button';
import PlayerList from './components/PlayerList';
import InviteFriends from './components/InviteFriends';
import RoleSelection from './components/RoleSelection';

const roomCode = 'ABCDEF';

const LobbyPage = () => {
  return (
    <div className="min-h-screen flex items-center">
      <div className="max-w-5xl mx-auto py-10 px-4">
        <div className="metallic-container space-y-8">
          <div>
            <h2 className="neon-header space-font">Lobby</h2>
            <div className="flex flex-col md:flex-row md:items-center md:justify-center gap-4">
              <div>
                <div className="text-2xl font-bold space-font text-white">
                  Game Code: {roomCode}
                </div>
              </div>
              <Button variant={'defaultLarge'}>Copy Code</Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <PlayerList />

            <InviteFriends />
          </div>

          <RoleSelection />

          <div className="flex justify-center">
            <Button variant={'defaultLarge'} className="text-3xl p-4">
              Start Game
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LobbyPage;
