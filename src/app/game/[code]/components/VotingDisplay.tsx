'use client';
import { useGameStore } from '@/stores/useGameStore';
import { useState, useEffect } from 'react';

const VotingDisplay = ({
  userId,
  gameCode,
}: {
  userId: string;
  gameCode: string;
}) => {
  const { players, votes=[], castVote, round, gamePhase } = useGameStore();
  const [selected, setSelected] = useState<string | null>(null);

  const activePlayers = players.filter((p) => !p.eliminated);

  const handleVote = async (votedForId: string) => {
    setSelected(votedForId);
    await castVote(gameCode, userId, votedForId);
  };

  const myVote = votes.find((v) => v.voterId === userId);

  if (gamePhase !== 'voting') {
    return null;
  }

  return (
    <div>
      <h2 className="text-xl mb-4">Vote to eliminate a player</h2>
      <div className="flex flex-wrap gap-2 justify-center">
        {activePlayers.map((player) => (
          <button
            key={player.id}
            disabled={!!myVote}
            onClick={() => handleVote(player.id)}
            className={`px-4 py-2 rounded border ${
              myVote?.votedForId === player.id
                ? 'bg-red-400 text-black border-red-700 font-bold'
                : 'bg-cyan-800 text-cyan-200 border-cyan-400'
            }`}
          >
            {player.name}
          </button>
        ))}
      </div>
      {myVote && (
        <div className="mt-4 text-green-400 font-bold">
          You voted for{' '}
          {activePlayers.find((p) => p.id === myVote.votedForId)?.name}
        </div>
      )}
    </div>
  );
};
export default VotingDisplay;
