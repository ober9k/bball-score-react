import { toDivision, toGame, toPlayer, toSeason, toStandingsLog, toStatisticsLog, toTeam } from "@/apis/converters.ts";
import { authUserQueryFn, buildAllQueryFn, buildByIdQueryFn, buildOptionsQueryFn, buildStandingsQueryFn, logoutQueryFn } from "@/apis/query-functions";
import { getDivisionsQK, getGamesQK, getPlayersQK, getSeasonsQK, getStandingsQK, getTeamsQK, queryKeys } from "@/apis/query-keys";
import type { Division } from "@/types/division.ts";
import type { Game } from "@/types/game.ts";
import type { Player } from "@/types/player.ts";
import type { Season } from "@/types/season.ts";
import type { StandingsLog } from "@/types/standings-log.ts";
import type { StatisticsLog } from "@/types/statistics-log.ts";
import type { Team } from "@/types/team.ts";

export type StatisticsMode = "averages" | "totals";

export function buildSeasonsQueryOptions(id?: number) {
  return {
    queryKey: getSeasonsQK(id),
    queryFn:  (id && id > 0)
      ? buildByIdQueryFn<Season>(toSeason)
      : buildAllQueryFn<Season>(toSeason),
  };
}

export function buildDivisionsQueryOptions(id?: number) {
  return {
    queryKey: getDivisionsQK(id),
    queryFn:  (id && id > 0)
      ? buildByIdQueryFn<Division>(toDivision)
      : buildAllQueryFn<Division>(toDivision),
  };
}

export function buildTeamsQueryOptions(id?: number) {
  return {
    queryKey: getTeamsQK(id),
    queryFn:  (id && id > 0)
      ? buildByIdQueryFn<Team>(toTeam)
      : buildAllQueryFn<Team>(toTeam),
  };
}

export function buildPlayersQueryOptions(id?: number) {
  return {
    queryKey: getPlayersQK(id),
    queryFn:  (id && id > 0)
      ? buildByIdQueryFn<Player>(toPlayer)
      : buildAllQueryFn<Player>(toPlayer),
  };
}

export function buildPlayersStatisticsQueryOptions(id: number, mode: StatisticsMode) {
  return {
    queryKey: [queryKeys.Players, id.toString(), "statistics", mode],
    queryFn:  buildAllQueryFn<StatisticsLog>(toStatisticsLog),
  };
}

export function buildGamesQueryOptions(id?: number) {
  return {
    queryKey: getGamesQK(id),
    queryFn:  (id && id > 0)
      ? buildByIdQueryFn<Game>(toGame)
      : buildAllQueryFn<Game>(toGame),
  };
}

export function buildTeamPlayersQueryOptions(id: number) {
  return {
    queryKey: [queryKeys.Teams, id.toString(), "players"],
    queryFn:  buildAllQueryFn<Player>(toPlayer),
  };
}

export function buildTeamStatisticsQueryOptions(id: number, mode: StatisticsMode) {
  return {
    queryKey: [queryKeys.Teams, id.toString(), "statistics", mode],
    queryFn:  buildAllQueryFn<StatisticsLog>(toStatisticsLog),
  };
}

export function buildStandingsQueryOptions() {
  return {
    queryKey: getStandingsQK(),
    queryFn:  buildAllQueryFn<StandingsLog>(toStandingsLog),
  };
}

export function buildStatisticsQueryOptions(mode: StatisticsMode) {
  return {
    queryKey: [queryKeys.Statistics, mode],
    queryFn:  buildAllQueryFn<StatisticsLog>(toStatisticsLog),
  };
}

export const logoutQueryOptions = {
  queryKey: [queryKeys.Logout],
  queryFn: logoutQueryFn,
};

export const authUserQueryOptions = {
  queryKey: ["authUser"],
  queryFn: authUserQueryFn,
  staleTime: 0,
  gcTime: 0,
};

export const optionsKeys = [
  queryKeys.Seasons,
  queryKeys.Divisions,
  queryKeys.Teams,
] as const;

export type OptionsKeyType = typeof optionsKeys[number];

export function buildOptionsQueryOptions(optionsKey: OptionsKeyType) {
  if (!optionsKeys.includes(optionsKey)) {
    throw new Error("Unsupported `optionsKey` provided for retrieving options.");
  }

  return {
    queryKey: [optionsKey, "options"],
    queryFn:  buildOptionsQueryFn(optionsKey),
  }
}
