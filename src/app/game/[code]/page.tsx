import RoundInfo from './components/RoundInfo';
import Players from './components/Players';
import CenterDeck from './components/CenterDeck';
import RoleDrawer from './components/RoleDrawer';
import TurnAction from './components/TurnAction';
import { getGameByCode } from '@/actions/game.action';
import ReadyDialog from './components/ReadyDialog';
import { getAuthenticatedUser } from '@/lib/auth-server';
import { redirect } from 'next/navigation';
//TODO: Protect this route to only allow access to players in the game

const centerDeck = ['Card 1', 'Card 2', 'Card 3'];

const GameBoardPage = async ({
  params,
}: {
  params: Promise<{ code: string }>;
}) => {
  const { code } = await params;
  const game = await getGameByCode(code);
  console.log('Game data:', game);
  const { user, error } = await getAuthenticatedUser();

  if (error) {
    redirect('/sign-in');
  }

  return (
    <div className="min-h-screen w-full flex justify-center items-start py-10 px-4 m-2 md:m-4 ">
      <div className="metallic-container max-w-7xl w-full mx-auto flex flex-col items-center">
        <div className="space-font neon-subheader">{code}</div>
        <RoundInfo
          round={game.currentRound}
          totalRounds={game.rounds}
          players={game.players}
        />
        <Players players={game.players} />
        <CenterDeck centerDeck={centerDeck} />
        <TurnAction />
        <RoleDrawer />
      </div>
      <ReadyDialog userId={user!.id} gameCode={code} players={game.players} />
    </div>
  );
};

export default GameBoardPage;
