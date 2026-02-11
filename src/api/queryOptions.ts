import { homeQueryFn, playerQueryFn, playersQueryFn, teamQueryFn, teamsQueryFn } from "./queryFunctions.ts";
import QueryKeys from "./queryKeys.ts";

export const homeQueryOptions = {
  queryKey: [QueryKeys.Home],
  queryFn: homeQueryFn,
};

export const playersQueryOptions = {
  queryKey: [QueryKeys.Players],
  queryFn: playersQueryFn,
};

export function buildPlayerQueryOptions(playerId: number) {
  return {
    queryKey: [QueryKeys.Player, playerId],
    queryFn: playerQueryFn,
  }
}

export const teamsQueryOptions = {
  queryKey: [QueryKeys.Teams],
  queryFn: teamsQueryFn,
};

export function buildTeamQueryOptions(teamId: number) {
  return {
    queryKey: [QueryKeys.Team, teamId],
    queryFn: teamQueryFn,
  }
}

