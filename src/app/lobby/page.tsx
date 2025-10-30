import { Button } from '@/components/ui/button';
import PlayerList from './components/PlayerList';
import InviteFriends from './components/InviteFriends';
import RoleSelection from './components/RoleSelection';
import TimeSelection from './components/TimeSelection';

const roomCode = 'ABCDEF';

const LobbyPage = () => {
  return (
    <div className="min-h-screen flex items-center">
      <div className=" mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-10 px-4 items-start">
          {/* Lobby */}
          <div className="metallic-container space-y-8">
            <div>
              <h2 className="neon-header space-font border-b-2 border-cyan-400 pb-4 mx-8">
                Lobby
              </h2>
              <div className="flex flex-col md:flex-row md:items-center md:justify-center gap-4">
                <div>
                  <div className="text-2xl font-bold space-font text-center text-white">
                    Game Code: {roomCode}
                  </div>
                </div>
                <Button variant={'defaultLarge'}>Copy Code</Button>
              </div>
            </div>

            <div className="flex flex-col gap-8">
              <PlayerList />

              <InviteFriends />
            </div>
          </div>
          {/* Game Settings */}
          <div className="metallic-container md:col-span-2">
            <h2 className="neon-header space-font border-b-2 border-cyan-400 pb-4 mx-8">
              Game Settings
            </h2>

            <div className="space-y-8 mt-4">
              <div className="flex flex-row justify-evenly items-center ">
                <div className="flex justify-center">
                  <Button variant={'defaultLarge'} className="text-3xl p-4">
                    Start Game
                  </Button>
                </div>
                {/* Timer */}
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
              </div>

              <RoleSelection />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LobbyPage;
