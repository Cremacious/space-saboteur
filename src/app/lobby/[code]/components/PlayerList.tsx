'use client';
import { Button } from '@/components/ui/button';
import { useLobbyStore } from '@/stores/useLobbyStore';

const PlayerList = ({ currentUserId }: { currentUserId: string }) => {
  const { players, hostId, removePlayer } = useLobbyStore();

  const isHost = currentUserId === hostId;

  const handleRemovePlayer = (playerId: string) => {
    removePlayer(playerId);
  };

  return (
    <div className="blue-box">
      <h3 className="neon-text mb-4 text-center space-font text-lg">
        Players In Lobby ({players.length})
      </h3>
      <ul className="space-y-3">
        {players.map((player) => (
          <li key={player.id} className="metallic-list-item">
            <div className="flex flex-row justify-between items-center w-full">
              <div className="space-font text-lg my-0.5 text-white">
                {player.name}
              </div>
              {isHost && player.id !== hostId && (
                <Button onClick={() => handleRemovePlayer(player.id)}>
                  Remove
                </Button>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default PlayerList;
