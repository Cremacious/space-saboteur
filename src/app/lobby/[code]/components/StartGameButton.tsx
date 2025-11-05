'use client';
import { useLobbyStore } from '@/stores/useLobbyStore';
import { useEffect } from 'react';
import { GameType } from '@/lib/types/game.type';

const StartGameButton = ({ code, game }: { code: string; game: GameType }) => {
  const { setRoomCode, setPlayers } = useLobbyStore();

  useEffect(() => {
    if (code) setRoomCode(code);
    if (game) {
      game.players.forEach(() => {
        setPlayers(game.players.map((p) => ({
          id: p.id,
          name: p.name,
          isHost: !!p.isHost,
          isReady: !!p.isReady,
        })));
      });
    }
  }, [code, game, setRoomCode, setPlayers]);

  const handleStartGame = () => {};

  return (
    <button
      onClick={handleStartGame}
      className="text-4xl p-6 bg-cyan-400 rounded-full font-bold space-font text-black hover:bg-cyan-500 transition-colors duration-150"
    >
      Start Game
    </button>
  );
};
export default StartGameButton;
