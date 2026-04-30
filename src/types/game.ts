import type { Activatable, Archivable } from "@/types/base.ts";
import type { BriefDivision } from "@/types/division.ts";
import type { Player } from "@/types/player.ts";
import type { BriefSeason } from "@/types/season.ts";
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

export type TeamLogWithTotals = TeamLog & {
  totals: Stats,
};

export type Game = {
  id:         number,
  date:       Date
  phase:      PhaseType,
  round:      number,
  seasonId:   number,
  divisionId: number,
  active:     boolean,
  archived:   boolean,
  teamLogs:   TeamLog[],
};

export type BriefGame = {
  id:         number,
  date:       Date,
  phase:      PhaseType,
  round:      number,
  seasonId:   number,
  season:     BriefSeason,
  divisionId: number,
  division:   BriefDivision,
  leagueId:   number,
} & Activatable & Archivable;

export type BriefGameData = Omit<BriefGame, "id" | "season" | "division">;

export type UpdateGameDto = Omit<Game, "id" | "teamLogs">; /* to be removed */
