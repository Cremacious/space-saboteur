import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const GameActions = () => {
  return (
    <div className="bg-indigo-800/60 rounded-xl p-6 shadow-lg flex flex-col gap-6">
      <h2 className="text-2xl font-semibold mb-2 text-center">Game Lobby</h2>
      <div className="flex flex-col md:flex-row gap-4  md:justify-center">
        <Button className="">Create New Game</Button>
        <form className="flex gap-2 items-center">
          <Input
            type="text"
            placeholder="Enter Game Code"
            maxLength={6}
            className="px-3 py-2 rounded bg-indigo-950 border border-indigo-700 text-white w-61"
          />
          <Button className="">Join</Button>
        </form>
      </div>
      <div className="mt-4">
        <h3 className="font-semibold mb-1">Continue Game</h3>
        <ul className="space-y-2">
          <li className="flex items-center justify-between bg-indigo-900/70 rounded p-3">
            <span>Game #123456 (Paused, 5/12 players)</span>
            <Button className="">Resume</Button>
          </li>
        </ul>
      </div>
    </div>
  );
};
export default GameActions;
