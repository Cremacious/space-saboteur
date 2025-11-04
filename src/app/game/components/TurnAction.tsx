const TurnAction = () => {
  return (
    <div className="w-full max-w-2xl mx-auto mt-8 mb-24">
      <div className="bg-cyan-900/30 border border-cyan-400 rounded-xl p-6 text-cyan-200 font-mono shadow-inner flex flex-col items-center">
        <div className="space-font text-lg mb-2">
          Your Turn: Swap two players&apos; cards
        </div>
        <button className="mt-4 bg-cyan-400 text-black px-6 py-2 rounded-full space-font font-bold">
          Complete Turn
        </button>
      </div>
    </div>
  );
};
export default TurnAction;
