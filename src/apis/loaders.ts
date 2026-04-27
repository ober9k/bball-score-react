import { fetchAll, fetchAllWithConverter, fetchById } from "@/apis/api.ts";
import { toStandingsLog } from "@/apis/converters.ts";
import type {
  DivisionLoaderProps,
  DivisionsLoaderProps,
  GameLoaderProps,
  GamesLoaderProps,
  PlayerGamesLoaderProps,
  PlayerLoaderProps,
  PlayersLoaderProps,
  PlayerStatisticsLoaderProps,
  SeasonLoaderProps,
  SeasonsLoaderProps,
  TeamLoaderProps,
  TeamPlayersLoaderProps,
  TeamsLoaderProps
} from "@/apis/loaders/types.ts";
import {
  buildDivisionsQueryOptions,
  buildGamesQueryOptions,
  buildPlayersQueryOptions,
  buildPlayersStatisticsQueryOptions,
  buildSeasonsQueryOptions,
  buildStandingsQueryOptions,
  buildStatisticsQueryOptions,
  buildTeamPlayersQueryOptions,
  buildTeamsQueryOptions,
  buildTeamStatisticsQueryOptions
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

export async function teamPlayersLoader({ context, params }): TeamPlayersLoaderProps {
  return {
    team:           await fetchById<Team>(context.queryClient, buildTeamsQueryOptions(+params.teamId)),
    players:        await fetchById<Player>(context.queryClient, buildTeamPlayersQueryOptions(+params.teamId)),
    statisticsLogs: await fetchAll<StatisticsLog>(context.queryClient, buildTeamStatisticsQueryOptions(+params.teamId, "averages")), /* todo: optimize */
  }
}

export async function playersLoader({ context }): PlayersLoaderProps {
  return {
    players:        await fetchAll<Player>(context.queryClient, buildPlayersQueryOptions()),
    statisticsLogs: await fetchAll<StatisticsLog>(context.queryClient, buildStatisticsQueryOptions("averages")), /* todo: optimize */
  }
}

export async function playerLoader({ context, params }): PlayerLoaderProps {
  return {
    player: await fetchById<Player>(context.queryClient, buildPlayersQueryOptions(+params.playerId)),
  }
}

export async function playerStatisticsLoader({ context, params }): PlayerStatisticsLoaderProps {
  return {
    player:                 await fetchById<Player>(context.queryClient, buildPlayersQueryOptions(+params.playerId)),
    averagesStatisticsLogs: await fetchAll<StatisticsLog>(context.queryClient, buildPlayersStatisticsQueryOptions(+params.playerId, "averages")), /* todo: optimize */
    totalsStatisticsLogs:   await fetchAll<StatisticsLog>(context.queryClient, buildPlayersStatisticsQueryOptions(+params.playerId, "totals")),   /* todo: optimize */
  }
}

export async function playerGamesLoader({ context, params }): PlayerGamesLoaderProps {
  return {
    player:              await fetchById<Player>(context.queryClient, buildPlayersQueryOptions(+params.playerId)),
    gamesStatisticsLogs: await fetchAll<StatisticsLog>(context.queryClient, buildPlayersStatisticsQueryOptions(+params.playerId, "games")),   /* todo: optimize */
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

export async function teamStatisticsLoader({ context, params }) {
  return {
    team:                   await fetchById<Team>(context.queryClient, buildTeamsQueryOptions(+params.teamId)),
    averagesStatisticsLogs: await fetchAll<StatisticsLog>(context.queryClient, buildTeamStatisticsQueryOptions(+params.teamId, "averages")), /* todo: optimize */
    totalsStatisticsLogs:   await fetchAll<StatisticsLog>(context.queryClient, buildTeamStatisticsQueryOptions(+params.teamId, "totals")),   /* todo: optimize */
  }
}

export async function standingsLoader({ context }) {
  return fetchAllWithConverter<StandingsLog>(context.queryClient, buildStandingsQueryOptions(), toStandingsLog);
}

export async function statisticsLoader({ context, deps }) {
  const mode = (deps.mode === "totals") ? "totals" : "averages";
  return {
    statisticsLogs: await fetchAll<StatisticsLog>(context.queryClient, buildStatisticsQueryOptions(mode)),
  }
}
