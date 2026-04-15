import type { Player } from "@/types/player.ts";
import type { Stats } from "@/types/stats.ts";
import type { Team } from "@/types/team.ts";

export const Side = {
  AWAY_TEAM: "AWAY_TEAM",
  HOME_TEAM: "HOME_TEAM",
} as const;

export type SideType = typeof Side[keyof typeof Side];

export const Phase = {
  PRE_SEASON:     "PRE_SEASON",
  REGULAR_SEASON: "REGULAR_SEASON",
  POST_SEASON:    "POST_SEASON",
} as const;

export type PhaseType = typeof Phase[keyof typeof Phase];

export type PlayerLog = {
  player:  Player,
  started: boolean,
  stats:   Stats,
};

export type TeamLog = {
  id:         number,
  side:       SideType,
  score:      number,
  byPeriod:   number[], /* score by period */
  team:       Team,
  playerLogs: PlayerLog[],
};

export type Game = {
  id:       number,
  date:     Date
  phase:    PhaseType,
  round:    number,
  teamLogs: TeamLog[],
};
