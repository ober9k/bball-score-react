import { fetchAllWithConverter, fetchByIdWithConverter } from "@/apis/api.ts";
import { toDivision, toGame, toPlayer, toSeason, toStandingsLog, toStatisticsLog, toTeam } from "@/apis/converters.ts";
import type { DivisionLoaderProps, DivisionsLoaderProps, SeasonLoaderProps, SeasonsLoaderProps } from "@/apis/loaders/types.ts";
import { fetchAll, fetchAllWithConverter, fetchById } from "@/apis/api.ts";
import { toStandingsLog, toStatisticsLog } from "@/apis/converters.ts";
import type {
  DivisionLoaderProps,
  DivisionsLoaderProps,
  GameLoaderProps,
  GamesLoaderProps,
  PlayerLoaderProps,
  PlayersLoaderProps,
  SeasonLoaderProps,
  SeasonsLoaderProps,
  TeamLoaderProps,
  TeamsLoaderProps
} from "@/apis/loaders/types.ts";
import {
  buildDivisionsQueryOptions,
  buildGamesQueryOptions,
  buildPlayersQueryOptions,
  buildSeasonsQueryOptions,
  buildStandingsQueryOptions,
  buildStatisticsQueryOptions,
  buildTeamsQueryOptions,
} from "@/apis/query-options.ts";
import type { Division } from "@/types/division.ts";
import type { Game } from "@/types/game.ts";
import type { Player } from "@/types/player.ts";
import type { Season } from "@/types/season.ts";
import type { StandingsLog } from "@/types/standings-log.ts";
import type { StatisticsLog } from "@/types/statistics-log.ts";
import type { Team } from "@/types/team.ts";

export async function seasonsLoader({ context }): SeasonsLoaderProps {
  return {
    seasons: await fetchAll<Season>(context.queryClient, buildSeasonsQueryOptions()),
  }
}

export async function seasonLoader({ context, params }): SeasonLoaderProps {
  return {
    season: await fetchById<Season>(context.queryClient, buildSeasonsQueryOptions(+params.seasonId)),
  }
}

export async function divisionsLoader({ context }): DivisionsLoaderProps {
  return {
    divisions: await fetchAll<Division>(context.queryClient, buildDivisionsQueryOptions()),
  }
}

export async function divisionLoader({ context, params }): DivisionLoaderProps {
  return {
    division: await fetchById<Division>(context.queryClient, buildDivisionsQueryOptions(+params.divisionId)),
  }
}

export async function teamsLoader({ context }): TeamsLoaderProps {
  return {
    teams: await fetchAll<Team>(context.queryClient, buildTeamsQueryOptions()),
  }
}

export async function teamLoader({ context, params }): TeamLoaderProps {
  return {
    team: await fetchById<Team>(context.queryClient, buildTeamsQueryOptions(+params.teamId)),
  }
}

export async function playersLoader({ context }): PlayersLoaderProps {
  return {
    players: await fetchAll<Player>(context.queryClient, buildPlayersQueryOptions()),
  }
}

export async function playerLoader({ context, params }): PlayerLoaderProps {
  return {
    player: await fetchById<Player>(context.queryClient, buildPlayersQueryOptions(+params.playerId)),
  }
}

export async function gamesLoader({ context }): GamesLoaderProps {
  return {
    games: await fetchAll<Game>(context.queryClient, buildGamesQueryOptions()),
  }
}

export async function gameLoader({ context, params }): GameLoaderProps {
  return {
    game: await fetchById<Game>(context.queryClient, buildGamesQueryOptions(+params.gameId)),
  }
}

}

export async function standingsLoader({ context }) {
  return fetchAllWithConverter<StandingsLog>(context.queryClient, buildStandingsQueryOptions(), toStandingsLog);
}

export async function statisticsLoader({ context, deps }) {
  const statisticsContext = (deps.context === "totals") ? "totals" : "averages";
  return fetchAllWithConverter<StatisticsLog>(context.queryClient, buildStatisticsQueryOptions(statisticsContext), toStatisticsLog);
}
