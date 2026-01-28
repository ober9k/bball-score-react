import { mockPlayers } from "../data/Players.ts";
import { mapBasePosition } from "../utilities/PlayerUtils.ts";

export default function PlayerList() {
  const players = mockPlayers;

  return (
    <div>
      <ul>
        {players.map((player) => (
          <li key={player.id}>
            #{player.number} &ndash; {player.name} <small>({mapBasePosition(player.position)})</small>
          </li>
        ))}
      </ul>
    </div>
  );
}
