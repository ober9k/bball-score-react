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
  gamesQueryFn, gameQueryFn
} from "@/apis/query-functions";
import { queryKeys } from "@/apis/query-keys";

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
  queryKey: [queryKeys.seasons],
  queryFn: seasonsQueryFn,
};

export function buildSeasonQueryOptions(seasonId: number) {
  return {
    queryKey: [queryKeys.season, seasonId],
    queryFn: seasonQueryFn,
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
  queryKey: [queryKeys.teams],
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
