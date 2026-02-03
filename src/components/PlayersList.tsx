import type { Player } from "../types/Player.ts";
import { mapBasePosition } from "../utilities/PlayerUtils.ts";
import PlayerLink from "./links/PlayerLink.tsx";

type PlayerListProps = {
  players: Array<Player>,
}

export default function PlayersList({ players }: PlayerListProps) {
  return (
    <div>
      <ul>
        {players.map((player) => (
          <li key={player.id}>
            #{player.number} &ndash; <strong><PlayerLink player={player} /></strong> <small>({mapBasePosition(player.position)})</small>
          </li>
        ))}
      </ul>
    </div>
  );
}
