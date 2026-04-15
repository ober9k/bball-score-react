import { fetchAll, fetchById } from "@/apis/api.ts";
import {
  buildDivisionQueryOptions,
  buildGameQueryOptions,
  buildPlayerQueryOptions,
  buildSeasonQueryOptions,
  buildTeamQueryOptions,
  divisionsQueryOptions,
  gamesQueryOptions,
  playersQueryOptions,
  seasonsQueryOptions,
  teamsQueryOptions
} from "@/apis/query-options.ts";

export async function seasonsLoader({ context }) {
  return fetchAll(context.queryClient, seasonsQueryOptions);
}

export async function seasonLoader({ context, params }) {
  const seasonId = +params["seasonId"];
  return fetchById(context.queryClient, buildSeasonQueryOptions(seasonId));
}

export async function divisionsLoader({ context }) {
  return fetchAll(context.queryClient, divisionsQueryOptions);
}

export async function divisionLoader({ context, params }) {
  const divisionId = +params["divisionId"];
  return fetchById(context.queryClient, buildDivisionQueryOptions(divisionId));
}

export async function teamsLoader({ context }) {
  return fetchAll(context.queryClient, teamsQueryOptions);
}

export async function teamLoader({ context, params }) {
  const teamId = +params["teamId"];
  return fetchById(context.queryClient, buildTeamQueryOptions(teamId));
}

export async function playersLoader({ context }) {
  return fetchAll(context.queryClient, playersQueryOptions);
}

export async function playerLoader({ context, params }) {
  const playerId = +params["playerId"];
  return fetchById(context.queryClient, buildPlayerQueryOptions(playerId));
}

export async function gamesLoader({ context }) {
  return fetchAll(context.queryClient, gamesQueryOptions);
}

export async function gameLoader({ context, params }) {
  const gameId = +params["gameId"];
  return fetchById(context.queryClient, buildGameQueryOptions(gameId));
}
