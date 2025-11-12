'use client';
import { useEffect } from 'react';
import { useLobbyStore } from '@/stores/useLobbyStore';
import { PlayerType } from '@/lib/types/player.type';
import { GameType } from '@/lib/types/game.type';

export default function LobbyStateInitializer({
  game,
  code,
  userId,
}: {
  game: GameType;
  code: string;
  userId: string;
}) {
  const {
    reset,
    setRoomCode,
    setPlayers,
    setInvitedFriends,
    setHostId,
    connectToLobbySocket,
  } = useLobbyStore();

  useEffect(() => {
    reset();
    if (code) setRoomCode(code);
    if (game) {
      setHostId(game.hostId);
      setPlayers(
        game.players.map((p: PlayerType) => ({
          id: p.userId,
          name: p.name,
          isHost: p.userId === game.hostId,
          isReady: !!p.isReady,
        }))
      );
      setInvitedFriends(
        game.invites.map(
          (invite: { recipientId: string }) => invite.recipientId
        )
      );
      const isHost = game.hostId === userId;
      connectToLobbySocket(code, isHost);
    }
  }, [
    game,
    code,
    userId,
    reset,
    setRoomCode,
    setPlayers,
    setInvitedFriends,
    setHostId,
    connectToLobbySocket,
  ]);

  return null;
}
