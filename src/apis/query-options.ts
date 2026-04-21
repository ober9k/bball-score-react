import {
  authUserQueryFn,
  buildDivisionsQueryFn,
  buildGamesQueryFn, buildOptionsQueryFn,
  buildPlayersQueryFn,
  buildSeasonsQueryFn,
  buildStandingsQueryFn,
  buildStatisticsQueryFn,
  buildTeamsQueryFn,
  logoutQueryFn
} from "@/apis/query-functions";
import { getDivisionsQK, getGamesQK, getPlayersQK, getSeasonsQK, getStandingsQK, getStatisticsQK, getTeamsQK, queryKeys } from "@/apis/query-keys";

export type StatisticsContext = "averages" | "totals";

export const seasonsQueryOptions = {
  queryKey: getSeasonsQK(),
  queryFn:  buildSeasonsQueryFn(),
};

export function buildSeasonQueryOptions(id: number) {
  return {
    queryKey: getSeasonsQK(id),
    queryFn:  buildSeasonsQueryFn(id),
  };
}

export const divisionsQueryOptions = {
  queryKey: getDivisionsQK(),
  queryFn:  buildDivisionsQueryFn(),
};

export function buildDivisionQueryOptions(id: number) {
  return {
    queryKey: getDivisionsQK(id),
    queryFn:  buildDivisionsQueryFn(id),
  };
}

export const teamsQueryOptions = {
  queryKey: getTeamsQK(),
  queryFn:  buildTeamsQueryFn(),
};

export function buildTeamQueryOptions(id: number) {
  return {
    queryKey: getTeamsQK(id),
    queryFn:  buildTeamsQueryFn(id),
  };
}

export const playersQueryOptions = {
  queryKey: getPlayersQK(),
  queryFn:  buildPlayersQueryFn(),
};

export function buildPlayerQueryOptions(id: number) {
  return {
    queryKey: getPlayersQK(id),
    queryFn:  buildPlayersQueryFn(id),
  };
}

export const gamesQueryOptions = {
  queryKey: getGamesQK(),
  queryFn:  buildGamesQueryFn(),
};

export function buildGameQueryOptions(id: number) {
  return {
    queryKey: getGamesQK(id),
    queryFn:  buildGamesQueryFn(id),
  };
}

export function buildStandingsQueryOptions() {
  return {
    queryKey: getStandingsQK(),
    queryFn:  buildStandingsQueryFn(),
  };
}

export function buildStatisticsQueryOptions(context: StatisticsContext) {
  return {
    queryKey: getStatisticsQK(context),
    queryFn:  buildStatisticsQueryFn(context),
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

export type OptionsType = "seasons" | "divisions" | "teams"; /* use a key or something instead */

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
