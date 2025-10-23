const GameStats = () => {
  return (
    <div className="bg-indigo-800/60 rounded-xl p-6 shadow-lg">
      <h2 className="text-2xl font-semibold mb-4">Your Stats</h2>
      {/* <div>
        <h2 className="text-2xl font-semibold mb-2">Your Stats</h2>
        <div className="flex flex-wrap gap-6">
          <div className="bg-indigo-900/70 rounded p-4 flex-1 min-w-[150px]">
            <div className="text-lg font-bold">Wins</div>
            <div className="text-2xl">12</div>
          </div>
          <div className="bg-indigo-900/70 rounded p-4 flex-1 min-w-[150px]">
            <div className="text-lg font-bold">Losses</div>
            <div className="text-2xl">7</div>
          </div>
          <div className="bg-indigo-900/70 rounded p-4 flex-1 min-w-[150px]">
            <div className="text-lg font-bold">Most Common Character</div>
            <div className="text-xl flex items-center gap-2">Engineer</div>
          </div>
          <div className="bg-indigo-900/70 rounded p-4 flex-1 min-w-[150px]">
            <div className="text-lg font-bold">Saboteur Rate</div>
            <div className="text-2xl">18%</div>
          </div>
        </div>
      </div> */}
      <div className="space-y-4">
        <div className="grid grid-cols-4 gap-4">
          <div className="bg-blue-500 flex flex-col p-4 rounded-xl">
            <div className="text-center text-2xl">Wins</div>
            <div className="text-center text-2xl">6</div>
          </div>
          <div className="bg-blue-500 flex flex-col p-4 rounded-xl">
            <div className="text-center text-2xl">Loses</div>
            <div className="text-center text-2xl">2</div>
          </div>
          <div className="bg-blue-500 flex flex-col p-4 rounded-xl col-span-2">
            <div className="text-center text-2xl">Win Ratio</div>
            <div className="text-center text-2xl">75%</div>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-blue-500 flex flex-col p-4 rounded-xl col-span-2">
            <div className="text-center text-2xl">Most Played Role</div>
            <div className="text-center text-2xl">Engineer</div>
          </div>
          <div className="bg-blue-500 flex flex-col p-4 rounded-xl">
            <div className="text-center text-2xl">Saboteur Ratio</div>
            <div className="text-center text-2xl">15%</div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default GameStats;
