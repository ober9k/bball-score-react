import { fetchAll, fetchById } from "@/apis/api.ts";
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

export async function seasonsLoader({ context }): Promise<SeasonsLoaderProps> {
  return {
    seasons: await fetchAll<Season>(context.queryClient, buildSeasonsQueryOptions()),
  }
}

export async function seasonLoader({ context, params }): Promise<SeasonLoaderProps> {
  return {
    season: await fetchById<Season>(context.queryClient, buildSeasonsQueryOptions(+params.seasonId)),
  }
}

export async function divisionsLoader({ context }): Promise<DivisionsLoaderProps> {
  return {
    divisions: await fetchAll<Division>(context.queryClient, buildDivisionsQueryOptions()),
  }
}

export async function divisionLoader({ context, params }): Promise<DivisionLoaderProps> {
  return {
    division: await fetchById<Division>(context.queryClient, buildDivisionsQueryOptions(+params.divisionId)),
  }
}

export async function teamsLoader({ context }): Promise<TeamsLoaderProps> {
  return {
    teams: await fetchAll<Team>(context.queryClient, buildTeamsQueryOptions()),
  }
}

export async function teamLoader({ context, params }): Promise<TeamLoaderProps> {
  return {
    team: await fetchById<Team>(context.queryClient, buildTeamsQueryOptions(+params.teamId)),
  }
}

export async function teamPlayersLoader({ context, params }): Promise<TeamPlayersLoaderProps> {
  return {
    team:           await fetchById<Team>(context.queryClient, buildTeamsQueryOptions(+params.teamId)),
    players:        await fetchAll<Player>(context.queryClient, buildTeamPlayersQueryOptions(+params.teamId)),
    statisticsLogs: await fetchAll<StatisticsLog>(context.queryClient, buildTeamStatisticsQueryOptions(+params.teamId, "averages")), /* todo: optimize */
  }
}

export async function playersLoader({ context }): Promise<PlayersLoaderProps> {
  return {
    players:        await fetchAll<Player>(context.queryClient, buildPlayersQueryOptions()),
    statisticsLogs: await fetchAll<StatisticsLog>(context.queryClient, buildStatisticsQueryOptions("averages")), /* todo: optimize */
  }
}

export async function playerLoader({ context, params }): Promise<PlayerLoaderProps> {
  return {
    player: await fetchById<Player>(context.queryClient, buildPlayersQueryOptions(+params.playerId)),
  }
}

export async function playerStatisticsLoader({ context, params }): Promise<PlayerStatisticsLoaderProps> {
  return {
    player:                 await fetchById<Player>(context.queryClient, buildPlayersQueryOptions(+params.playerId)),
    averagesStatisticsLogs: await fetchAll<StatisticsLog>(context.queryClient, buildPlayersStatisticsQueryOptions(+params.playerId, "averages")), /* todo: optimize */
    totalsStatisticsLogs:   await fetchAll<StatisticsLog>(context.queryClient, buildPlayersStatisticsQueryOptions(+params.playerId, "totals")),   /* todo: optimize */
  }
}

export async function playerGamesLoader({ context, params }): Promise<PlayerGamesLoaderProps> {
  return {
    player:              await fetchById<Player>(context.queryClient, buildPlayersQueryOptions(+params.playerId)),
    gamesStatisticsLogs: await fetchAll<StatisticsLog>(context.queryClient, buildPlayersStatisticsQueryOptions(+params.playerId, "games")),   /* todo: optimize */
  }
}

export async function gamesLoader({ context }): Promise<GamesLoaderProps> {
  return {
    games: await fetchAll<Game>(context.queryClient, buildGamesQueryOptions()),
  }
}

export async function gameLoader({ context, params }): Promise<GameLoaderProps> {
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
  return {
    standingsLogs: await fetchAll<StandingsLog>(context.queryClient, buildStandingsQueryOptions()),
  };
}

export async function statisticsLoader({ context, deps }) {
  const mode = (deps.mode === "totals") ? "totals" : "averages";
  return {
    statisticsLogs: await fetchAll<StatisticsLog>(context.queryClient, buildStatisticsQueryOptions(mode)),
  }
}
