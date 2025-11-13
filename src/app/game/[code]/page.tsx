import RoundInfo from './components/RoundInfo';
import Players from './components/Players';
import CenterDeck from './components/CenterDeck';
import RoleDrawer from './components/RoleDrawer';
import TurnAction from './components/TurnAction';
import { getGameByCode } from '@/actions/game.action';
const players = [
  { id: 1, name: 'You', eliminated: false },
  { id: 2, name: 'Alex', eliminated: false },
  { id: 3, name: 'George', eliminated: false },
  { id: 4, name: 'Sam', eliminated: true },
  { id: 5, name: 'Jordan', eliminated: false },
  { id: 6, name: 'Taylor', eliminated: false },
  { id: 7, name: 'Morgan', eliminated: false },
  { id: 8, name: 'Casey', eliminated: false },
  { id: 9, name: 'Riley', eliminated: false },
  // { id: 10, name: 'Blake', eliminated: false },
  // { id: 11, name: 'Quinn', eliminated: false },
  // { id: 12, name: 'Skyler', eliminated: false },
];

const centerDeck = ['Card 1', 'Card 2', 'Card 3'];
const round = 2;
const totalRounds = 4;

const GameBoardPage = async ({
  params,
}: {
  params: Promise<{ code: string }>;
}) => {
  const { code } = await params;
  const game = await getGameByCode(code);
  console.log('Game data:', game);

  return (
    <div className="min-h-screen w-full flex justify-center items-start py-10 px-4 m-2 md:m-4 ">
      <div className="metallic-container max-w-7xl w-full mx-auto flex flex-col items-center">
        <h1 className="text-2xl text-white">{code}</h1>
        <RoundInfo round={round} totalRounds={totalRounds} players={players} />
        <Players players={players} />
        <CenterDeck centerDeck={centerDeck} />
        <TurnAction />
        <RoleDrawer />
      </div>
    </div>
  );
};

export default GameBoardPage;
