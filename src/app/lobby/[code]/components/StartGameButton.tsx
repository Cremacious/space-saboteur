'use client';
import { useLobbyStore } from '@/stores/useLobbyStore';

const StartGameButton = () => {
  const { players, selectedRoles, startGame } = useLobbyStore();
  const requiredRoles = players.length + 3;
  const selectedCount = selectedRoles.reduce((sum, r) => sum + r.quantity, 0);
  const canStart = players.length >= 3 && selectedCount >= requiredRoles;

  return (
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
  );
};
export default StartGameButton;
