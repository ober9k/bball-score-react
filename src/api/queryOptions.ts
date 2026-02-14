import {
  homeQueryFn,
  playerQueryFn,
  playersQueryFn,
  playerTeamQueryFn,
  standingsQueryFn,
  statisticsQueryFn,
  teamPlayersQueryFn,
  teamQueryFn,
  teamsQueryFn,
  teamStatisticsQueryFn
} from "./queryFunctions.ts";
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

export const standingsQueryOptions = {
  queryKey: [QueryKeys.Standings],
  queryFn: standingsQueryFn,
};

export const statisticsQueryOptions = {
  queryKey: [QueryKeys.Statistics],
  queryFn: statisticsQueryFn,
};

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

export function buildTeamPlayersQueryOptions(teamId: number) {
  return {
    queryKey: [QueryKeys.TeamPlayers, teamId],
    queryFn: teamPlayersQueryFn,
  }
}

export function buildTeamStatisticsQueryOptions(teamId: number) {
  return {
    queryKey: [QueryKeys.TeamStatistics, teamId],
    queryFn: teamStatisticsQueryFn,
  }
}
