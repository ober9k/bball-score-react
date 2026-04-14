import {
  divisionQueryFn,
  divisionsQueryFn,
  usersMeQueryFn,
  playerQueryFn,
  playersQueryFn,
  seasonQueryFn,
  seasonsQueryFn,
  teamQueryFn,
  teamsQueryFn,
  logoutQueryFn,
  gamesQueryFn, gameQueryFn, authUserQueryFn
} from "@/apis/query-functions";
import { getSeasonsQK, queryKeys } from "@/apis/query-keys";

export const divisionsQueryOptions = {
  queryKey: [queryKeys.Divisions],
  queryFn: divisionsQueryFn,
};

export function buildDivisionQueryOptions(divisionId: number) {
  return {
    queryKey: [queryKeys.Division, divisionId],
    queryFn: divisionQueryFn,
  }
}

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

export const playersQueryOptions = {
  queryKey: [queryKeys.Players],
  queryFn: playersQueryFn,
};

export function buildPlayerQueryOptions(playerId: number) {
  return {
    queryKey: [queryKeys.Player, playerId],
    queryFn: playerQueryFn,
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

export const teamsQueryOptions = {
  queryKey: [queryKeys.Teams],
  queryFn: teamsQueryFn,
};

export function buildTeamQueryOptions(teamId: number) {
  return {
    queryKey: [queryKeys.team, teamId],
    queryFn: teamQueryFn,
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
