import type { Division } from "@/types/division.ts";
import type { Game } from "@/types/game.ts";
import type { Player } from "@/types/player.ts";
import type { Season } from "@/types/season.ts";
import type { StandingsLog } from "@/types/standings-log.ts";
import type { StatisticsLog } from "@/types/statistics-log.ts";
import type { Team } from "@/types/team.ts";

export type SeasonsLoaderProps = {
  seasons: Season[],
};

export type SeasonLoaderProps = {
  season: Season,
};

export type DivisionsLoaderProps = {
  divisions: Division[],
};

export type DivisionLoaderProps = {
  division: Division,
};

export type TeamsLoaderProps = {
  teams: Team[],
};

export type TeamLoaderProps = {
  team: Team,
};

export type TeamPlayersLoaderProps = {
  team: Team,
  players: Player[],
  statisticsLogs: StatisticsLog[],
};

export type TeamStatisticsLoaderProps = {
  team: Team,
  averagesStatisticsLogs: StatisticsLog[],
  totalsStatisticsLogs: StatisticsLog[],
};

export type PlayersLoaderProps = {
  players: Player[],
  statisticsLogs: StatisticsLog[],
};

export type PlayerLoaderProps = {
  player: Player,
};

export type PlayerStatisticsLoaderProps = {
  player: Player,
  averagesStatisticsLogs: StatisticsLog[],
  totalsStatisticsLogs: StatisticsLog[],
};

export type GamesLoaderProps = {
  games: Game[],
};

export type GameLoaderProps = {
  game: Game,
};

export type StandingsLoaderProps = {
  standings: StandingsLog[],
};

export type StatisticsLoaderProps = {
  statisticsLogs: StatisticsLog[],
};
