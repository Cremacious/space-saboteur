import { Button } from '@/components/ui/button';
import PlayerList from './components/PlayerList';
import InviteFriends from './components/InviteFriends';
import RoleSelection from './components/RoleSelection';
import TimeSelection from './components/TimeSelection';

const roomCode = 'ABCDEF';

const LobbyPage = () => {
  return (
    <div className="min-h-screen flex items-center">
      <div className="max-w-5xl mx-auto py-10 px-4 space-y-6 w-full">
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            <PlayerList />

            <InviteFriends />
          </div>
        </div>
        <div className="metallic-container">
          <h2 className="neon-header space-font">Game Settings</h2>
          <div className="space-y-8 mt-4">
            <RoleSelection />
            <div className="space-y-4">
              <div>
                <h3 className="neon-text text-2xl text-center space-font">
                  Round Timer
                </h3>
                <h3 className="text-white text-md text-center space-font">
                  Determines how long each discussion round lasts.
                </h3>
              </div>
              <TimeSelection />
            </div>
            <div className="flex justify-center">
              <Button variant={'defaultLarge'} className="text-3xl p-4">
                Start Game
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LobbyPage;
