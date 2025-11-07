'use client';
import { useEffect } from 'react';
import { useLobbyStore } from '@/stores/useLobbyStore';
import { PlayerType } from '@/lib/types/player.type';
import { GameType } from '@/lib/types/game.type';

export default function LobbyStateInitializer({
  game,
  code,
}: {
  game: GameType;
  code: string;
}) {
  const { reset, setRoomCode, setPlayers, setInvitedFriends, setHostId } =
    useLobbyStore();

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
    }
  }, [
    game,
    code,
    reset,
    setRoomCode,
    setPlayers,
    setInvitedFriends,
    setHostId,
  ]);

  return null;
}
