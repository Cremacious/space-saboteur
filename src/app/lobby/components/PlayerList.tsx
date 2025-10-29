const PlayerList = () => {
  const PLAYERS = [
    { id: 1, name: 'You' },
    { id: 2, name: 'Alex' },
    { id: 3, name: 'Alex' },
    { id: 4, name: 'Sam' },
    { id: 5, name: 'Jordan' },
    { id: 6, name: 'Taylor' },
    { id: 7, name: 'Morgan' },
    { id: 8, name: 'Casey' },
    { id: 9, name: 'Riley' },
    { id: 10, name: 'Jamie' },
    { id: 11, name: 'Drew' },
    { id: 12, name: 'Cameron' },
  ];

  return (
    <div className="blue-box">
      <h3 className="neon-text mb-4 text-center space-font text-lg">
        Players In Lobby (3)
      </h3>
      <ul className="space-y-3">
        {PLAYERS.map((player) => (
          <li
            key={player.id}
            className="metallic-list-item flex items-center justify-between "
          >
            <div className="flex items-center gap-2">
              <span className="space-font text-lg my-0.5 text-white">
                {player.name}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default PlayerList;
