const CenterDeck = ({ centerDeck }: { centerDeck: string[] }) => {
  return (
    <div className="w-full max-w-md mx-auto flex justify-center gap-6 my-8">
      {centerDeck.map((card, idx) => (
        <div
          key={idx}
          className="metallic-box w-24 h-36 flex items-center justify-center text-cyan-300 space-font text-lg border-2 border-cyan-400 shadow-lg"
        >
          <span>?</span>
        </div>
      ))}
    </div>
  );
};
export default CenterDeck;
