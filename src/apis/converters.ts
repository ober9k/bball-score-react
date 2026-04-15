import type { Division } from "@/types/division.ts";
import type { Game, SideType, TeamLog } from "@/types/game.ts";
import type { Player } from "@/types/player.ts";
import type { Season } from "@/types/season.ts";
import type { Team } from "@/types/team.ts";

export type DtoConverter<T> = (data: any) => T;

export function toSeason(season: any): Season {
  return {
    id:   season.id,
    name: season.name,
  };
}

export function toDivision(division: any): Division {
  return {
    id:       division.id,
    name:     division.name,
    seasonId: division.seasonId,
  };
}

export function toTeam(team: any): Team {
  return {
    id:         team.id,
    name:       team.name,
    shortName:  team.shortName,
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
  };
}

export function toGame(game: any): Game {
  return {
    id:       game.id,
    date:     game.date,
    phase:    game.phase,
    round:    game.round,
    teamLogs: game.gameTeams.map(toTeamLog), /* temporary, update key on API as well */
  };
}

export function toTeamLog(teamLog: any): TeamLog {
  return {
    id:         teamLog.id,
    side:       teamLog.side,
    score:      teamLog.score,
    byPeriod:   teamLog.scoreByPeriod, /* score by period */
    team:       teamLog.team,
    playerLogs: [], /* temporary */
  };
}
