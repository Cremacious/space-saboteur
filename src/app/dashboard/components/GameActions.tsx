import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const GameActions = () => {
  return (
    <div className="metallic-container">
      <h2 className="neon-header space-font">Game Lobby</h2>
      <div className="flex flex-col md:flex-row gap-4  md:justify-center">
        <Button className="">Create New Game</Button>
        <form className="flex gap-2 items-center">
          <Input
            type="text"
            placeholder="Enter Game Code"
            maxLength={6}
            className="space-font"
          />
          <Button>Join</Button>
        </form>
      </div>
      <div className="mt-8">
        <h3 className="neon-text mb-4 space-font text-center">Continue Game</h3>
        <ul className="space-y-2">
          <li className="metallic-box flex flex-col md:flex-row items-center justify-between space-x-4">
            <div className="flex md:flex-row flex-col items-center">
              <div className="text-lg flex items-center space-font text-center">
                Game #123456
              </div>
              <div className="md:ml-2  text-lg flex items-center space-font">
                (Paused, 5/12 players)
              </div>
            </div>
            <Button className="md:mt-0 mt-4">Resume</Button>
          </li>
        </ul>
      </div>
    </div>
  );
};
export default GameActions;
