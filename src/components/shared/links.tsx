import { leaguePaths } from "@/routes/league/routes.ts";
import type { Player } from "@/types/player.ts";
import type { Team } from "@/types/team.ts";
import { Link } from "@tanstack/react-router";

type PlayerLinkProps = {
  player: Player,
}

export function PlayerLink({ player }: PlayerLinkProps) {
  /**
   * @todo: this is a place holder due to compilation complaints for `params` types
   */
  const buildPlayerViewLink = (player: Player): string => {
    return leaguePaths.Teams.View.replace("$playerId", player.id.toString());
  };

  return (
    <Link to={buildPlayerViewLink(player)}>
      {player.name}
    </Link>
  );
}

type TeamLinkProps = {
  team: Team,
}

export function TeamLink({ team }: TeamLinkProps) {
  /**
   * @todo: this is a place holder due to compilation complaints for `params` types
   */
  const buildTeamViewLink = (team: Team): string => {
    return leaguePaths.Teams.View.replace("$teamId", team.id.toString());
  };

  return (
    <Link to={buildTeamViewLink(team)}>
      {team.name}
    </Link>
  );
}
