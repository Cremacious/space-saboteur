'use client';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

const Players = ({
  players,
}: {
  players: { id: string; name: string; eliminated: boolean }[];
}) => {
  const [viewPlayers, setViewPlayers] = useState(false);

  const handleViewPlayers = () => {
    setViewPlayers(!viewPlayers);
  };

  return (
    <div>
      <div className="flex justify-center">
        <Button
          onClick={handleViewPlayers}
          className="space-font text-xl text-center mb-4 p-6"
        >
          {viewPlayers ? 'Hide Players' : 'View Players'}
        </Button>
      </div>

      {viewPlayers && (
        <div className="w-full max-w-3xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 justify-items-center mb-8">
          {players.map((player) => (
            <div
              key={player.id}
              className={`metallic-box flex flex-col items-center justify-center py-4 px-2 h-36 w-40 ${
                player.eliminated ? 'opacity-70 grayscale' : ''
              }`}
            >
              <div className="space-font text-lg mb-2 text-white">
                {player.name}
              </div>
              <div className="w-10 h-10 rounded-full bg-cyan-400 flex items-center justify-center text-black font-bold text-xl mb-2">
                {player.name[0]}
              </div>
              <div className="h-5 flex items-center justify-center">
                {player.eliminated && (
                  <span className="text-white text-xs space-font">
                    Eliminated
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
export default Players;
