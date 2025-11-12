'use client';
import { Button } from '@/components/ui/button';
import { useLobbyStore } from '@/stores/useLobbyStore';
import { useOnlineStore } from '@/stores/useOnlineStore';

const PlayerList = ({ currentUserId }: { currentUserId: string }) => {
  //TODO: Update player list when a player joins/leaves lobby

  const { players, hostId, removePlayer } = useLobbyStore();

  const isHost = currentUserId === hostId;

  const handleRemovePlayer = (playerId: string) => {
    removePlayer(playerId);
  };

  const { onlineFriends } = useOnlineStore();

  return (
    <div className="blue-box">
      <h3 className="neon-text mb-4 text-center space-font text-lg">
        Players In Lobby ({players.length})
      </h3>
      <ul className="space-y-3">
        {players.map((player) => (
          <li key={player.id} className="metallic-list-item">
            <div className="flex flex-row justify-between items-center w-full">
              <div className="flex flex-row items-center gap-2">
                <div
                  className={`w-2 h-2 rounded-full  ${
                    onlineFriends.includes(player.id)
                      ? 'bg-green-400'
                      : 'bg-gray-400'
                  }`}
                />
                <div className="space-font text-lg my-0.5 text-white">
                  {player.name}
                </div>
              </div>
              {isHost && player.id !== hostId && (
                <button
                  className="text-xs font-bold bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded-md"
                  onClick={() => handleRemovePlayer(player.id)}
                >
                  Remove
                </button>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default PlayerList;
