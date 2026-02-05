import type { Game } from "../types/Game.ts";
import type { TeamLog } from "../types/game/TeamLog.ts";
import type { Team } from "../types/Team.ts";

export function getAwayTeamLog(game: Game): TeamLog {
  return game.teamLogs[0];
}

export function getAwayTeam(game: Game): Team {
  return getAwayTeamLog(game).team;
}

export function getHomeTeamLog(game: Game): TeamLog {
  return game.teamLogs[1];
}

export function getHomeTeam(game: Game): Team {
  return getHomeTeamLog(game).team;
}
