import type { Game } from "../types/Game.ts";
import type { Team } from "../types/Team.ts";

export function getAwayTeam(game: Game): Team {
  return game.teamLogs[0].team;
}
export function getHomeTeam(game: Game): Team {
  return game.teamLogs[1].team;
}
