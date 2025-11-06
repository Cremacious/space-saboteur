import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import CreateGameButton from './CreateGameButton';
import { GameType } from '@/lib/types/game.type';
import JoinGameButton from './JoinGameButton';

//TODO: Handle no games case

const GameActions = ({
  games,
  userId,
}: {
  games: GameType[];
  userId: string;
}) => {
  return (
    <div className="metallic-container">
      <h2 className="neon-header space-font">Game Lobby</h2>
      <div className="flex flex-col md:flex-row gap-4 md:gap-8 md:justify-center">
        <CreateGameButton />

        <form className="flex gap-2 items-center">
          <Input
            type="text"
            placeholder="Enter Game Code"
            maxLength={6}
            className="space-font w-full md:w-40"
          />
          <Button>Join</Button>
        </form>
      </div>
      <div className="mt-8 space-y-4">
        <h3 className="neon-text mb-4 space-font text-center">Current Games</h3>
        <ul className="space-y-4">
          {games.length === 0 ? (
            <div className="text-center neon-text space-font">
              No active games. Create or join a game to get started!
            </div>
          ) : null}
          {games.map((game) => {
            // Replace 'currentUserId' with the actual user ID from your auth/context
            const currentUserId = userId; // TODO: get current user ID from context or props
            const isPlayer = game.players.some(
              (player) => player.id === currentUserId
            );

            return (
              <li
                key={game.id}
                className="metallic-box flex flex-col md:flex-row items-center justify-between space-x-4"
              >
                <div className="flex md:flex-row flex-col items-center">
                  <div className="text-lg flex items-center space-font text-center">
                    Game {game.code}
                  </div>
                  <div className="md:ml-2 text-lg flex items-center space-font">
                    (Paused, {game.players.length}/12 players)
                  </div>
                </div>
                <JoinGameButton code={game.code} isPlayer={isPlayer} />
              </li>
            );
          })}
          {/* <li className="metallic-box flex flex-col md:flex-row items-center justify-between space-x-4">
            <div className="flex md:flex-row flex-col items-center">
              <div className="text-lg flex items-center space-font text-center">
                Invite #123456
              </div>
              <div className="md:ml-2  text-lg flex items-center space-font">
                (Hosted By JohnDoe)
              </div>
            </div>
            <Button className="md:mt-0 mt-4">Join</Button>
          </li> */}
        </ul>
      </div>
    </div>
  );
};
export default GameActions;
