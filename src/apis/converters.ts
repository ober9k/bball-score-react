import type { Division } from "@/types/division.ts";
import type { Game, PlayerLog, TeamLog } from "@/types/game.ts";
import type { Player } from "@/types/player.ts";
import type { Season } from "@/types/season.ts";
import type { StandingsLog } from "@/types/standings-log.ts";
import type { StatisticsLog } from "@/types/statistics-log.ts";
import type { Team } from "@/types/team.ts";

export type DtoConverter<T> = (data: any) => T;

export function toSeason(season: any): Season {
  return {
    id:       season.id,
    name:     season.name,
    active:   season.active,
    archived: season.archived,
  };
}

export function toDivision(division: any): Division {
  return {
    id:       division.id,
    name:     division.name,
    active:   division.active,
    archived: division.archived,
    seasonId: division.seasonId,
  };
}

export function toTeam(team: any): Team {
  return {
    id:         team.id,
    name:       team.name,
    shortName:  team.shortName,
    active:     team.active,
    archived:   team.archived,
    divisionId: team.divisionId,
  };
}

export function toPlayer(player: any): Player {
  return {
    id:       player.id,
    name:     player.name,
    position: player.position,
    number:   player.number,
    height:   player.height,
    active:   player.active,
    archived: player.archived,
  };
}

export function toGame(game: any): Game {
  return {
    id:         game.id,
    date:       game.date,
    phase:      game.phase,
    round:      game.round,
    seasonId:   game.seasonId,
    divisionId: game.divisionId,
    active:     game.active,
    archived:   game.archived,
    teamLogs:   game.teamLogs.map(toTeamLog),
  };
}

export function toTeamLog(teamLog: any): TeamLog {
  return {
    id:         teamLog.id,
    side:       teamLog.side,
    score:      teamLog.score,
    byPeriod:   teamLog.byPeriod,
    team:       teamLog.team,
    playerLogs: teamLog.playerLogs.map(toPlayerLog),
  };
}

export function toPlayerLog(playerLog: any): PlayerLog {
  return {
    player:  playerLog.player,
    started: playerLog.started,
    stats:   playerLog.stats,
  };
}

export function toStandingsLog(standingsLog: any): StandingsLog {
  return {
    ...standingsLog, /* this case should be clean, just missing team.divisionId */
  };
}

export function toStatisticsLog(statisticsLog: any): StatisticsLog {
  return {
    ...statisticsLog, /* this case should be clean, just missing team.divisionId */
  };
}
