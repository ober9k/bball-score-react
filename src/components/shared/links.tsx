import { leaguePaths } from "@/routes/league/routes.ts";
import { managerPaths } from "@/routes/manager/routes.ts";
import type { BriefDivision, Division } from "@/types/division.ts";
import type { BriefGame, Game } from "@/types/game.ts";
import type { BriefPlayer, Player } from "@/types/player.ts";
import type { BriefSeason, Season } from "@/types/season.ts";
import type { BriefTeam, Team } from "@/types/team.ts";
import { Link } from "@tanstack/react-router"

type GameUpdateLinkProps = {
  game: Game | BriefGame,
};

export function GameUpdateLink({ game }: GameUpdateLinkProps) {
  /**
   * @todo: this is a place holder due to compilation complaints for `params` types
   */
  const buildLink = (game: Game | BriefGame): string => {
    return managerPaths.Games.Update.replace("$gameId", game.id.toString());
  };

  return (
    <Link to={buildLink(game)}>
      <span>Edit Game</span>
    </Link>
  );
}

type DivisionUpdateLinkProps = {
  division: Division | BriefDivision,
};

export function DivisionUpdateLink({ division }: DivisionUpdateLinkProps) {
  /**
   * @todo: this is a place holder due to compilation complaints for `params` types
   */
  const buildLink = (division: Division | BriefDivision): string => {
    return managerPaths.Divisions.Update.replace("$divisionId", division.id.toString());
  };

  return (
    <Link to={buildLink(division)}>
      <span>Edit Division</span>
    </Link>
  );
}

type PlayerUpdateLinkProps = {
  player: Player | BriefPlayer,
};

export function PlayerUpdateLink({ player }: PlayerUpdateLinkProps) {
  /**
   * @todo: this is a place holder due to compilation complaints for `params` types
   */
  const buildLink = (player: Player | BriefPlayer): string => {
    return managerPaths.Players.Update.replace("$playerId", player.id.toString());
  };
  
  return (
    <Link to={buildLink(player)}>
      <span>Edit Player</span>
    </Link>
  );
}

type TeamUpdateLinkProps = {
  team: Team | BriefTeam,
};

export function TeamUpdateLink({ team }: TeamUpdateLinkProps) {
  /**
   * @todo: this is a place holder due to compilation complaints for `params` types
   */
  const buildLink = (team: Team | BriefTeam): string => {
    return managerPaths.Teams.Update.replace("$teamId", team.id.toString());
  };

  return (
    <Link to={buildLink(team)}>
      <span>Edit Team</span>
    </Link>
  );
}

type SeasonUpdateLinkProps = {
  season: Season | BriefSeason,
};

export function SeasonUpdateLink({ season }: SeasonUpdateLinkProps) {
  /**
   * @todo: this is a place holder due to compilation complaints for `params` types
   */
  const buildLink = (season: Season | BriefSeason): string => {
    return managerPaths.Seasons.Update.replace("$seasonId", season.id.toString());
  };

  return (
    <Link to={buildLink(season)}>
      <span>Edit Season</span>
    </Link>
  );
}

type DivisionLinkProps = {
  division: Division | BriefDivision,
};

export function DivisionLink({ division }: DivisionLinkProps) {
  /**
   * @todo: this is a place holder due to compilation complaints for `params` types
   */
  const buildDivisionViewLink = (division: Division | BriefDivision): string => {
    return leaguePaths.Divisions.View.replace("$divisionId", division.id.toString());
  };

  return (
    <Link to={buildDivisionViewLink(division)}>
      <span>{division.name}</span>
    </Link>
  );
}

type GameLinkProps = {
  game: Game | BriefGame,
};

export function GameLink({ game }: GameLinkProps) {
  /**
   * @todo: this is a place holder due to compilation complaints for `params` types
   */
  const buildGameViewLink = (game: Game | BriefGame): string => {
    return leaguePaths.Games.View.replace("$gameId", game.id.toString());
  };

  return (
    <Link to={buildGameViewLink(game)}>
      <span>{game.id}</span> {/*this is temporary for viewing*/}
    </Link>
  );
}

type PlayerLinkProps = {
  player: Player | BriefPlayer,
  withNumber?: boolean,
};

export function PlayerLink({ player, withNumber }: PlayerLinkProps) {
  /**
   * @todo: this is a place holder due to compilation complaints for `params` types
   */
  const buildPlayerViewLink = (player: Player | BriefPlayer): string => {
    return leaguePaths.Players.View.replace("$playerId", player.id.toString());
  };

  return (
    <Link to={buildPlayerViewLink(player)}>
      <span>{player.name}</span>
      {withNumber && (
        <span>#{player.number}</span>
      )}
    </Link>
  );
}

type TeamLinkProps = {
  team: Team | BriefTeam,
};

export function TeamLink({ team }: TeamLinkProps) {
  /**
   * @todo: this is a place holder due to compilation complaints for `params` types
   */
  const buildTeamViewLink = (team: Team | BriefTeam): string => {
    return leaguePaths.Teams.View.replace("$teamId", team.id.toString());
  };

  return (
    <Link to={buildTeamViewLink(team)}>
      <span>{team.name}</span>
    </Link>
  );
}

type SeasonLinkProps = {
  season: Season | BriefSeason,
};

export function SeasonLink({ season }: SeasonLinkProps) {
  /**
   * @todo: this is a place holder due to compilation complaints for `params` types
   */
  const buildSeasonViewLink = (season: Season | BriefSeason): string => {
    return leaguePaths.Seasons.View.replace("$seasonId", season.id.toString());
  };

  return (
    <Link to={buildSeasonViewLink(season)}>
      <span>{season.name}</span>
    </Link>
  );
}
