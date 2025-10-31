'use client';
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerClose,
} from '@/components/ui/drawer';
import RoleCard from '@/components/roles/RoleCard';

const players = [
  { id: 1, name: 'You', eliminated: false },
  { id: 2, name: 'Alex', eliminated: false },
  { id: 3, name: 'George', eliminated: false },
  { id: 4, name: 'Sam', eliminated: true },
];
const centerDeck = ['Card 1', 'Card 2', 'Card 3'];
const round = 2;
const totalRounds = 4;

const GameBoardPage = () => {
  return (
    <div className="min-h-screen metallic-container flex flex-col items-center py-10 px-4 m-2 md:m-4">
      {/* Round Info */}
      <div className="w-full max-w-4xl mx-auto mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-2">
        <div className="space-font neon-subheader">
          Round {round} / {totalRounds}
        </div>
        <div className="space-font neon-subheader">
          {/* Active Players: {players.filter((p) => !p.eliminated).length} /{' '}
          {players.length} */}
          Active Players: 12/12
        </div>
      </div>

      {/* Players */}
      <div className="w-full max-w-3xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
        {players.map((player) => (
          <div
            key={player.id}
            className={`metallic-box flex flex-col items-center justify-center py-4 px-2 ${
              player.eliminated ? 'opacity-40 grayscale' : ''
            }`}
          >
            <div className="space-font text-lg mb-2">{player.name}</div>
            <div className="w-10 h-10 rounded-full bg-cyan-400 flex items-center justify-center text-black font-bold text-xl mb-2">
              {player.name[0]}
            </div>
            {player.eliminated && (
              <div className="text-red-400 text-xs mt-2">Eliminated</div>
            )}
          </div>
        ))}
      </div>

      {/* Center Deck */}
      <div className="w-full max-w-md mx-auto flex justify-center gap-6 mb-8">
        {centerDeck.map((card, idx) => (
          <div
            key={idx}
            className="metallic-box w-24 h-36 flex items-center justify-center text-cyan-300 space-font text-lg border-2 border-cyan-400 shadow-lg"
          >
            <span>?</span>
          </div>
        ))}
      </div>

      {/* Turn Actions (placeholder) */}
      <div className="w-full max-w-2xl mx-auto mb-24">
        <div className="bg-cyan-900/30 border border-cyan-400 rounded-xl p-6 text-cyan-200 font-mono shadow-inner flex flex-col items-center">
          <div className="space-font text-lg mb-2">
            Your Turn: Swap two players&apos; cards
          </div>

          <button className="mt-4 bg-cyan-400 text-black px-6 py-2 rounded-full space-font font-bold">
            Complete Turn
          </button>
        </div>
      </div>

      {/* View Role Drawer */}
      <div className="fixed bottom-4 left-0 right-0 flex justify-center z-50">
        <Drawer>
          <DrawerTrigger>
            <button className="space-font bg-cyan-400 text-black px-6 py-3 rounded-full text-xl shadow-lg hover:bg-cyan-500 transition-colors duration-150">
              View Role
            </button>
          </DrawerTrigger>
          <DrawerContent className="bg-slate-900/90 backdrop-blur-lg border-4 border-cyan-400 shadow-[0_0_24px_#00f2ff80] rounded-3xl p-6 max-w-md mx-auto">
            <DrawerHeader>
              <DrawerTitle className="space-font neon-header">
                Your Role Card
              </DrawerTitle>
            </DrawerHeader>
            <RoleCard />
            <DrawerClose>
              <button className="mt-4 blue-box text-cyan-300 px-4 py-2 rounded-xl">
                Close
              </button>
            </DrawerClose>
          </DrawerContent>
        </Drawer>
      </div>
    </div>
  );
};

export default GameBoardPage;
