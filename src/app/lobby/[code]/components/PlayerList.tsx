'use client';
import { Button } from '@/components/ui/button';
import { useLobbyStore } from '@/stores/useLobbyStore';

const PlayerList = ({ currentUserId }: { currentUserId: string }) => {
  const { players, hostId } = useLobbyStore();

  const isHost = currentUserId === hostId;

  return (
    <div className="blue-box">
      <h3 className="neon-text mb-4 text-center space-font text-lg">
        Players In Lobby ({players.length})
      </h3>
      <ul className="space-y-3">
        {players.map((player) => (
          <li
            key={player.id}
            className="metallic-list-item flex items-center justify-between "
          >
            <div className="flex items-center gap-2">
              <span className="space-font text-lg my-0.5 text-white">
                {player.name}
              </span>
              {isHost && <Button>Remove</Button>}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default PlayerList;
