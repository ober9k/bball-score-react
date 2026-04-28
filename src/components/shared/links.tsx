import { leaguePaths } from "@/routes/league/routes.ts";
import { managerPaths } from "@/routes/manager/routes.ts";
import type { Division } from "@/types/division.ts";
import type { Game } from "@/types/game.ts";
import type { Player } from "@/types/player.ts";
import type { Season } from "@/types/season.ts";
import type { Team } from "@/types/team.ts";
import { Link } from "@tanstack/react-router"

type GameUpdateLinkProps = {
  game: Game,
};

export function GameUpdateLink({ game }: GameUpdateLinkProps) {
  /**
   * @todo: this is a place holder due to compilation complaints for `params` types
   */
  const buildLink = (game: Game): string => {
    return managerPaths.Games.Update.replace("$gameId", game.id.toString());
  };

  return (
    <Link to={buildLink(game)}>
      <span>Edit Game</span>
    </Link>
  );
}

type DivisionUpdateLinkProps = {
  division: Division,
};

export function DivisionUpdateLink({ division }: DivisionUpdateLinkProps) {
  /**
   * @todo: this is a place holder due to compilation complaints for `params` types
   */
  const buildLink = (division: Division): string => {
    return managerPaths.Divisions.Update.replace("$divisionId", division.id.toString());
  };

  return (
    <Link to={buildLink(division)}>
      <span>Edit Division</span>
    </Link>
  );
}

type PlayerUpdateLinkProps = {
  player: Player,
};

export function PlayerUpdateLink({ player }: PlayerUpdateLinkProps) {
  /**
   * @todo: this is a place holder due to compilation complaints for `params` types
   */
  const buildLink = (player: Player): string => {
    return managerPaths.Players.Update.replace("$playerId", player.id.toString());
  };
  
  return (
    <Link to={buildLink(player)}>
      <span>Edit Player</span>
    </Link>
  );
}

type TeamUpdateLinkProps = {
  team: Team,
};

export function TeamUpdateLink({ team }: TeamUpdateLinkProps) {
  /**
   * @todo: this is a place holder due to compilation complaints for `params` types
   */
  const buildLink = (team: Team): string => {
    return managerPaths.Teams.Update.replace("$teamId", team.id.toString());
  };

  return (
    <Link to={buildLink(team)}>
      <span>Edit Team</span>
    </Link>
  );
}

type SeasonUpdateLinkProps = {
  season: Season,
};

export function SeasonUpdateLink({ season }: SeasonUpdateLinkProps) {
  /**
   * @todo: this is a place holder due to compilation complaints for `params` types
   */
  const buildLink = (season: Season): string => {
    return managerPaths.Seasons.Update.replace("$seasonId", season.id.toString());
  };

  return (
    <Link to={buildLink(season)}>
      <span>Edit Season</span>
    </Link>
  );
}

type PlayerLinkProps = {
  player: Player,
  withNumber?: boolean,
  asEdit?: boolean,
  asView?: boolean,
};

export function PlayerLink({ player, withNumber, asEdit, asView }: PlayerLinkProps) {
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
