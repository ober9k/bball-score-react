import { fetchAllWithConverter, fetchByIdWithConverter } from "@/apis/api.ts";
import { toDivision, toGame, toPlayer, toSeason, toStandingsLog, toStatisticsLog, toTeam } from "@/apis/converters.ts";
import type { DivisionLoaderProps, DivisionsLoaderProps, SeasonLoaderProps, SeasonsLoaderProps } from "@/apis/loaders/types.ts";
import {
  buildDivisionQueryOptions,
  buildGameQueryOptions,
  buildPlayerQueryOptions,
  buildSeasonQueryOptions,
  buildStandingsQueryOptions,
  buildStatisticsQueryOptions,
  buildTeamQueryOptions,
  divisionsQueryOptions,
  gamesQueryOptions,
  playersQueryOptions,
  seasonsQueryOptions,
  teamsQueryOptions
} from "@/apis/query-options.ts";
import type { Division } from "@/types/division.ts";
import type { Game } from "@/types/game.ts";
import type { Player } from "@/types/player.ts";
import type { Season } from "@/types/season.ts";
import type { StandingsLog } from "@/types/standings-log.ts";
import type { StatisticsLog } from "@/types/statistics-log.ts";
import type { Team } from "@/types/team.ts";

export async function seasonsLoader({ context }): SeasonsLoaderProps {
  return fetchAllWithConverter<Season>(context.queryClient, seasonsQueryOptions, toSeason);
}

export async function seasonLoader({ context, params }): SeasonLoaderProps {
  const seasonId = +params["seasonId"];
  return fetchByIdWithConverter<Season>(context.queryClient, buildSeasonQueryOptions(seasonId), toSeason);
}

export async function divisionsLoader({ context }): DivisionsLoaderProps {
  return fetchAllWithConverter<Division>(context.queryClient, divisionsQueryOptions, toDivision);
}

export async function divisionLoader({ context, params }): DivisionLoaderProps {
  const divisionId = +params["divisionId"];
  return fetchByIdWithConverter<Division>(context.queryClient, buildDivisionQueryOptions(divisionId), toDivision);
}

export async function teamsLoader({ context }) {
  return fetchAllWithConverter<Team>(context.queryClient, teamsQueryOptions, toTeam);
}

export async function teamLoader({ context, params }) {
  const teamId = +params["teamId"];
  return fetchByIdWithConverter<Team>(context.queryClient, buildTeamQueryOptions(teamId), toTeam);
}

export async function playersLoader({ context }) {
  return fetchAllWithConverter<Player>(context.queryClient, playersQueryOptions, toPlayer);
}

export async function playerLoader({ context, params }) {
  const playerId = +params["playerId"];
  return fetchByIdWithConverter<Player>(context.queryClient, buildPlayerQueryOptions(playerId), toPlayer);
}

export async function gamesLoader({ context }) {
  return fetchAllWithConverter<Game>(context.queryClient, gamesQueryOptions, toGame);
}

export async function gameLoader({ context, params }) {
  const gameId = +params["gameId"];
  return fetchByIdWithConverter<Game>(context.queryClient, buildGameQueryOptions(gameId), toGame);
}

export async function standingsLoader({ context }) {
  return fetchAllWithConverter<StandingsLog>(context.queryClient, buildStandingsQueryOptions(), toStandingsLog);
}

export async function statisticsLoader({ context, deps }) {
  const statisticsContext = (deps.context === "totals") ? "totals" : "averages";
  return fetchAllWithConverter<StatisticsLog>(context.queryClient, buildStatisticsQueryOptions(statisticsContext), toStatisticsLog);
}
