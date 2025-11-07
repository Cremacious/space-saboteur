import Header from '@/components/layout/Header';
import GameActions from './components/GameActions';
import GameStats from './components/GameStats';
import FriendsList from './components/FriendsList';
import { getAuthenticatedUser } from '@/lib/auth-server';
import { redirect } from 'next/navigation';
import { getGamesByUser } from '@/actions/game.action';
// import { getFriendsList } from '@/actions/friend.action';

const DashboardPage = async () => {
  const { user, error } = await getAuthenticatedUser();
  if (error) {
    redirect('/sign-in');
  }

  const games = await getGamesByUser(user!.id);

  return (
    <div className="min-h-screen flex items-center  text-white font-sans">
      <div className="max-w-6xl mx-auto py-10 px-4">
        <Header />
        {/* Dashboard Grid */}
        {user?.name}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-8">
            <GameActions
              userName={user!.name}
              userId={user!.id}
              games={games}
            />
            <GameStats />
          </div>

          {/* Friends & Invites */}
          <FriendsList />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
