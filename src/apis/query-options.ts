import { divisionQueryFn, divisionsQueryFn, playerQueryFn, playersQueryFn, teamQueryFn, teamsQueryFn } from "@/apis/query-functions";
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
