'use client';
import { useLobbyStore } from '@/stores/useLobbyStore';
import { Badge } from '@/components/ui/badge';

//TODO: Show role images when available

const PlayerWaitingDisplay = () => {
  const { roundTimer, selectedRoles, hostId, players } = useLobbyStore();

  const host = players.find((p) => p.id === hostId);

  return (
    <div className="flex flex-col items-center justify-center py-8 space-y-8">
      <div className="text-2xl neon-text space-font text-center">
        Waiting for{' '}
        <span className="text-cyan-400">{host?.name || 'the host'}</span> to
        start the game...
      </div>
      <div className="w-full max-w-md metallic-container p-6 space-y-6">
        <div>
          <h4 className="neon-text text-lg space-font mb-2 text-center">
            Round Timer
          </h4>
          <div className="text-3xl text-white space-font text-center">
            {roundTimer / 60} minute{roundTimer / 60 > 1 ? 's' : ''}
          </div>
        </div>
        <div>
          <h4 className="neon-text text-lg space-font mb-2 text-center">
            Selected Roles
          </h4>
          <div className="flex flex-wrap gap-3 justify-center">
            {selectedRoles.length === 0 ? (
              <span className="text-cyan-300 space-font">
                No roles selected yet.
              </span>
            ) : (
              selectedRoles.map((role) => (
                <Badge
                  key={role.id}
                  className="bg-cyan-800 text-cyan-200 px-4 py-2 rounded-lg flex items-center gap-2"
                >
                  {/* {role.image && (
                    <img
                      src={role.image}
                      alt={role.name}
                      className="w-6 h-6 rounded-full"
                    />
                  )} */}
                  <span className="space-font">{role.name} {role.quantity > 1 ? `(${role.quantity})` : ''}</span>
                </Badge>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerWaitingDisplay;
