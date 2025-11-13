'use client';
import { useGameStore } from '@/stores/useGameStore';
import { PlayerType } from '@/lib/types/player.type';

const ReadyDialog = ({
  gameCode,
  players,
  userId,
}: {
  gameCode: string;
  players: PlayerType[];
  userId: string;
}) => {
  const { isReadyDialogOpen, readyUp, players: storePlayers } = useGameStore();

  // Find the current player in the store
  const player = storePlayers.find((p) => p.id === userId);

  // Check if all players are ready
  const allReady =
    storePlayers.length > 0 && storePlayers.every((p) => p.isReady);

  // Dialog is open if not all players are ready
  if (allReady) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg flex flex-col items-center">
        <h2 className="text-2xl mb-4">Ready to Play?</h2>
        <button
          className="bg-cyan-500 text-white px-6 py-2 rounded text-xl font-bold disabled:bg-gray-400"
          onClick={() => readyUp(gameCode, userId)}
          disabled={player?.isReady}
        >
          {player?.isReady ? 'You are ready' : 'Ready'}
        </button>
        <div className="mt-4 text-gray-700 text-center">
          {storePlayers.filter((p) => p.isReady).length} / {storePlayers.length}{' '}
          players ready
        </div>
      </div>
    </div>
  );
};

export default ReadyDialog;
