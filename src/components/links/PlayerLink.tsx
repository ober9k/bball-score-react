import { Link } from "@tanstack/react-router";
import { Paths } from "../../routes/paths.ts";
import type { Player } from "../../types/Player.ts";

type PlayerLinkProps = {
  player: Player,
}

export default function PlayerLink({ player }: PlayerLinkProps) {
  return (
    <Link to={Paths.Player} params={{playerId: player.id}}>
      {player.name}&nbsp;
      <small className="text-gray-400">
        #{player.number}
      </small>
    </Link>
  );
}
