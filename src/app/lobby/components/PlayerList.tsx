const PlayerList = () => {
  return (
    <div className="blue-box">
      <h3 className="neon-text mb-4 text-center space-font text-lg">
        Players In Lobby (3)
      </h3>
      <ul className="space-y-3">
        <li className="metallic-list-item flex items-center justify-between ">
          <div className="flex items-center gap-2">
            <span className="space-font text-lg my-0.5 text-white">You</span>
          </div>
        </li>
        <li className="metallic-list-item flex items-center justify-between ">
          <div className="flex items-center gap-2">
            <span className="space-font text-lg my-0.5 text-white">Alex</span>
          </div>
        </li>
        <li className="metallic-list-item flex items-center justify-between ">
          <div className="flex items-center gap-2">
            <span className="space-font text-lg text-white">Alex</span>
          </div>
        </li>
      </ul>
    </div>
  );
};
export default PlayerList;
