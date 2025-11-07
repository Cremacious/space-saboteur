'use client';
import { useLobbyStore } from '@/stores/useLobbyStore';
import { useEffect } from 'react';
import { GameType } from '@/lib/types/game.type';

const StartGameButton = ({ code, game }: { code: string; game: GameType }) => {
  const { setRoomCode, setPlayers, setInvitedFriends, setHostId } =
    useLobbyStore();

  useEffect(() => {
    if (code) setRoomCode(code);
    if (game) {
      setHostId(game.hostId);
      setPlayers(
        game.players.map((p) => ({
          id: p.userId,
          name: p.name,
          isHost: p.userId === game.hostId,
          isReady: !!p.isReady,
        }))
      );
      setInvitedFriends(game.invites.map((invite) => invite.recipientId));
    }
  }, [code, game, setRoomCode, setPlayers, setInvitedFriends, setHostId]);

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
