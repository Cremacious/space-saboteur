'use client';

const RoundInfo = ({
  round,
  totalRounds,
  players,
}: {
  round: number;
  totalRounds: number;
  players: { id: string; name: string; eliminated: boolean }[];
}) => {
  return (
    <div className="w-full max-w-4xl mx-auto mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-2">
      <div className="space-font neon-subheader">
        Round {round} / {totalRounds}
      </div>
      <div className="space-font neon-subheader">
        Active Players: {players.filter((p) => !p.eliminated).length} /{' '}
        {players.length}
      </div>
    </div>
  );
};
export default RoundInfo;
