import { leaguePaths } from "@/routes/league/routes.ts";
import type { Player } from "@/types/player.ts";
import type { Team } from "@/types/team.ts";
import { Link } from "@tanstack/react-router";

type PlayerLinkProps = {
  player: Player,
}

export function PlayerLink({ player }: PlayerLinkProps) {
  return (
    <Link to={leaguePaths.Players.View} params={{ playerId: player.id }}>
      {player.name}
    </Link>
  );
}

type TeamLinkProps = {
  team: Team,
}

export function TeamLink({ team }: TeamLinkProps) {
  return (
    <Link to={leaguePaths.Teams.View} params={{ teamId: team.id }}>
      {team.name}
    </Link>
  );
}
