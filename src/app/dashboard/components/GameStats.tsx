const GameStats = () => {
  return (
    <div className="metallic-container space-font">
      <h2 className="neon-header space-font">Your Stats</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
        <div className="metallic-stat">
          <span className="text-lg">Wins</span>
          <span className="neon-text text-3xl ">6</span>
        </div>
        <div className="metallic-stat">
          <span className="text-lg">Losses</span>
          <span className="neon-text text-3xl ">2</span>
        </div>
        <div className="metallic-stat col-span-2">
          <span className="text-lg">Win Ratio</span>
          <span className="neon-text text-3xl">75%</span>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="metallic-stat col-span-1 md:col-span-2 flex-row md:flex-col">
          <span className=" text-lg">Most Played Role</span>
          <span className="neon-text text-3xl flex items-center gap-2 t">
            Medic
          </span>
        </div>
        <div className="metallic-stat w-full">
          <span className=" text-lg">Saboteur Ratio</span>
          <span className="neon-text text-3xl ">15%</span>
        </div>
      </div>
    </div>
  );
};

export default GameStats;
