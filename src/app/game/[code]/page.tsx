import RoundInfo from './components/RoundInfo';
import Players from './components/Players';
import CenterDeck from './components/CenterDeck';
import RoleDrawer from './components/RoleDrawer';
import TurnAction from './components/TurnAction';
import { getGameByCode } from '@/actions/game.action';
import { getAuthenticatedUser } from '@/lib/auth-server';
import { redirect } from 'next/navigation';
import GameSyncer from './components/GameSyncer';
import { useGameStore } from '@/stores/useGameStore';
import { getAllRoles } from '@/actions/game.action';
import VotingDisplay from './components/VotingDisplay';
//TODO: Protect this route to only allow access to players in the game

// const centerDeck = ['Card 1', 'Card 2', 'Card 3'];

const GameBoardPage = async ({
  params,
}: {
  params: Promise<{ code: string }>;
}) => {
  const { code } = await params;
  const game = await getGameByCode(code);
  const { user, error } = await getAuthenticatedUser();

  if (error) {
    redirect('/sign-in');
  }

  if (typeof window !== 'undefined') {
    const { initReadySocket } = useGameStore.getState();
    initReadySocket(code);
  }

  const roles = await getAllRoles();

  return (
    <div className="min-h-screen w-full flex justify-center items-start py-10 px-4 m-2 md:m-4 ">
      <GameSyncer code={code} />
      <div className="metallic-container max-w-7xl w-full mx-auto flex flex-col items-center">
        <div className="space-font neon-subheader">{code}</div>
        <RoundInfo
          round={game.currentRound}
          totalRounds={game.rounds}
          players={game.players}
        />
        <Players players={game.players} />
        <CenterDeck roles={roles} />
        <VotingDisplay userId={user!.id} gameCode={code} />
        <TurnAction gameCode={code} userId={user!.id} roles={roles} />
        <RoleDrawer roles={roles} userId={user!.id} />
      </div>
    </div>
  );
};

export default GameBoardPage;
