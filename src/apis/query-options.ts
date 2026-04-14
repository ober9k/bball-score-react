import { authUserQueryFn, buildDivisionsQueryFn, buildPlayersQueryFn, buildSeasonsQueryFn, buildTeamsQueryFn, gameQueryFn, gamesQueryFn, logoutQueryFn } from "@/apis/query-functions";
import { getDivisionsQK, getGamesQK, getPlayersQK, getSeasonsQK, getTeamsQK, queryKeys } from "@/apis/query-keys";

export const seasonsQueryOptions = {
  queryKey: getSeasonsQK(),
  queryFn:  buildSeasonsQueryFn(),
};

export function buildSeasonQueryOptions(id: number) {
  return {
    queryKey: getSeasonsQK(id),
    queryFn:  buildSeasonsQueryFn(id),
  }
}

export const divisionsQueryOptions = {
  queryKey: getDivisionsQK(),
  queryFn:  buildDivisionsQueryFn(),
};

export function buildDivisionQueryOptions(id: number) {
  return {
    queryKey: getDivisionsQK(id),
    queryFn:  buildDivisionsQueryFn(id),
  }
}

export const teamsQueryOptions = {
  queryKey: getTeamsQK(),
  queryFn:  buildTeamsQueryFn(),
};

export function buildTeamQueryOptions(id: number) {
  return {
    queryKey: getTeamsQK(id),
    queryFn:  buildTeamsQueryFn(id),
  }
}

export const playersQueryOptions = {
  queryKey: getPlayersQK(),
  queryFn:  buildPlayersQueryFn(),
};

export function buildPlayerQueryOptions(id: number) {
  return {
    queryKey: getPlayersQK(id),
    queryFn:  buildPlayersQueryFn(id),
  }
}

export const gamesQueryOptions = {
  queryKey: getGamesQK(),
  queryFn:  gamesQueryFn,
};

export function buildGameQueryOptions(id: number) {
  return {
    queryKey: getGamesQK(id),
    queryFn:  gameQueryFn,
  }
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
