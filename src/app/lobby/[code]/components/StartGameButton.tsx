'use client';
import { useLobbyStore } from '@/stores/useLobbyStore';
import { useOnlineStore } from '@/stores/useOnlineStore';

const StartGameButton = () => {
  const { players, selectedRoles, startGame } = useLobbyStore();
  const { onlineFriends } = useOnlineStore();

  const requiredRoles = players.length + 3;
  const selectedCount = selectedRoles.reduce((sum, r) => sum + r.quantity, 0);
  const allPlayersOnline =
    players.length > 0 &&
    players.every((player) => onlineFriends.includes(player.id));
  const canStart =
    players.length >= 3 && selectedCount >= requiredRoles && allPlayersOnline;

  return (
    <div className="flex flex-col justify-center">
      <button
        onClick={canStart ? startGame : undefined}
        disabled={!canStart}
        className={`text-4xl p-6 rounded-full font-bold space-font text-black transition-colors duration-150 ${
          canStart
            ? 'bg-cyan-400 hover:bg-cyan-500 cursor-pointer'
            : 'bg-gray-300 cursor-not-allowed'
        }`}
      >
        Start Game
      </button>
      {players.length >= 3 &&
        selectedCount >= requiredRoles &&
        !allPlayersOnline && (
          <div className="text-red-400 font-bold text-center mt-2">
            All players must be online to start the game
          </div>
        )}
    </div>
  );
};
export default StartGameButton;
