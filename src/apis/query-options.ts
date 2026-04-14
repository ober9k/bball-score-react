import {
  authUserQueryFn,
  divisionQueryFn,
  divisionsQueryFn,
  gameQueryFn,
  gamesQueryFn,
  logoutQueryFn,
  playerQueryFn,
  playersQueryFn,
  seasonQueryFn,
  seasonsQueryFn,
  teamQueryFn,
  teamsQueryFn,
  usersMeQueryFn
} from "@/apis/query-functions";
import { getDivisionsQK, getPlayersQK, getSeasonsQK, getTeamsQK, queryKeys } from "@/apis/query-keys";

export const seasonsQueryOptions = {
  queryKey: getSeasonsQK(),
  queryFn:  seasonsQueryFn,
};

export function buildSeasonQueryOptions(id: number) {
  return {
    queryKey: getSeasonsQK(id),
    queryFn:  seasonQueryFn,
  }
}

export const divisionsQueryOptions = {
  queryKey: getDivisionsQK(),
  queryFn:  divisionsQueryFn,
};

export function buildDivisionQueryOptions(id: number) {
  return {
    queryKey: getDivisionsQK(id),
    queryFn:  divisionQueryFn,
  }
}

export const teamsQueryOptions = {
  queryKey: getTeamsQK(),
  queryFn:  teamsQueryFn,
};

export function buildTeamQueryOptions(id: number) {
  return {
    queryKey: getTeamsQK(id),
    queryFn:  teamQueryFn,
  }
}

export const playersQueryOptions = {
  queryKey: getPlayersQK(),
  queryFn:  playersQueryFn,
};

export function buildPlayerQueryOptions(id: number) {
  return {
    queryKey: getPlayersQK(id),
    queryFn:  playerQueryFn,
  }
}

export const gamesQueryOptions = {
  queryKey: [queryKeys.Games],
  queryFn: gamesQueryFn,
};

export function buildGameQueryOptions(gameId: number) {
  return {
    queryKey: [queryKeys.Game, gameId],
    queryFn: gameQueryFn,
  }
}

export const logoutQueryOptions = {
  queryKey: [queryKeys.Logout],
  queryFn: logoutQueryFn,
};

export const usersMeQueryOptions = {
  queryKey: [queryKeys.UsersMe],
  queryFn: usersMeQueryFn,
};

export const authUserQueryOptions = {
  queryKey: ["authUser"],
  queryFn: authUserQueryFn,
  staleTime: 0,
  gcTime: 0,
};
