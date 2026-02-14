import {
  buildPlayerQueryOptions,
  buildTeamPlayersQueryOptions,
  buildTeamQueryOptions, buildTeamStatisticsQueryOptions,
  homeQueryOptions,
  playersQueryOptions,
  standingsQueryOptions,
  statisticsQueryOptions,
  teamsQueryOptions
} from "../api/queryOptions.ts";
import { findGameById, findPlayerGameLogs, mockGames } from "../data/games.ts";

export function homeLoader({ context: queryClient }) {
  /* todo: OOOOPSSS, messed up passing this through */
  return queryClient.queryClient.ensureQueryData(homeQueryOptions);
}

export function gamesLoader() {
  return {
    games: mockGames, /* temporary handling which will later ping an API */
  };
}

export function gameLoader({ params }) {
  const gameId = parseInt(params["gameId"]);

  if (isNaN(gameId)) {
    throw Error("Invalid `gameId` provided.");
  }

  const game = findGameById(gameId);

  if (game === undefined) {
    throw Error("Unable to find game with `gameId` provided.");
  }

  return {
    game: game,
  };
}

export function playersLoader({ context: queryClient }) {
  return queryClient.queryClient.ensureQueryData(playersQueryOptions);
}

export async function playerLoader({ context: queryClient, params }) {
  const playerId = +params["playerId"];

  const { player, team } = await queryClient.queryClient.ensureQueryData(buildPlayerQueryOptions(playerId));
  const gameLogs = findPlayerGameLogs(playerId);

  return {
    player,
    team,
    gameLogs, /* TODO: handle data request properly */
  };
}

export function standingsLoader({ context: queryClient }) {
  return queryClient.queryClient.ensureQueryData(standingsQueryOptions);
}

export function statisticsLoader({ context: queryClient }) {
  return queryClient.queryClient.ensureQueryData(statisticsQueryOptions);
}

export function teamsLoader({ context: queryClient }) {
  return queryClient.queryClient.ensureQueryData(teamsQueryOptions);
}

export async function teamLoader({ context: queryClient, params }) {
  const teamId = +params["teamId"];

  const { team } = await queryClient.queryClient.ensureQueryData(buildTeamQueryOptions(teamId));
  const { teamPlayers } = await queryClient.queryClient.ensureQueryData(buildTeamPlayersQueryOptions(teamId));
  const { teamStatistics } = await queryClient.queryClient.ensureQueryData(buildTeamStatisticsQueryOptions(teamId));

  return {
    team,
    teamPlayers,
    teamStatistics,
  };
}
