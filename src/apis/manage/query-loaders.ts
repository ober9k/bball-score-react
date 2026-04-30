import { fetchAll, fetchById } from "@/apis/api.ts";
import {
  buildManageDivisionsAllOptions,
  buildManageDivisionsByIdOptions,
  buildManageGamesAllOptions,
  buildManageGamesByIdOptions,
  buildManagePlayersAllOptions,
  buildManagePlayersByIdOptions,
  buildManageSeasonsAllOptions,
  buildManageSeasonsByIdOptions,
  buildManageTeamsAllOptions,
  buildManageTeamsByIdOptions
} from "@/apis/manage/query-options.ts";
import type {
  ManageDivisionsAllLoaderProps,
  ManageDivisionsByIdLoaderProps,
  ManageGamesAllLoaderProps,
  ManageGamesByIdLoaderProps,
  ManagePlayersAllLoaderProps,
  ManagePlayersByIdLoaderProps,
  ManageSeasonsAllLoaderProps,
  ManageSeasonsByIdLoaderProps,
  ManageTeamsAllLoaderProps,
  ManageTeamsByIdLoaderProps
} from "@/apis/manage/types/loader-props.ts";
import type { BriefDivision } from "@/types/division.ts";
import type { BriefGame } from "@/types/game.ts";
import type { BriefPlayer } from "@/types/player.ts";
import type { BriefSeason } from "@/types/season.ts";
import type { BriefTeam } from "@/types/team.ts";

export async function manageSeasonsAllLoader({ context }): Promise<ManageSeasonsAllLoaderProps> {
  return {
    seasons: await fetchAll<BriefSeason>(context.queryClient, buildManageSeasonsAllOptions()),
  };
}

export async function manageSeasonsByIdLoader({ context, params }): Promise<ManageSeasonsByIdLoaderProps> {
  return {
    season: await fetchById<BriefSeason>(context.queryClient, buildManageSeasonsByIdOptions(+params.seasonId)),
  };
}

export async function manageDivisionsAllLoader({ context }): Promise<ManageDivisionsAllLoaderProps> {
  return {
    divisions: await fetchAll<BriefDivision>(context.queryClient, buildManageDivisionsAllOptions()),
  };
}

export async function manageDivisionsByIdLoader({ context, params }): Promise<ManageDivisionsByIdLoaderProps> {
  return {
    division: await fetchById<BriefDivision>(context.queryClient, buildManageDivisionsByIdOptions(+params.divisionId)),
  };
}

export async function manageTeamsAllLoader({ context }): Promise<ManageTeamsAllLoaderProps> {
  return {
    teams: await fetchAll<BriefTeam>(context.queryClient, buildManageTeamsAllOptions()),
  };
}

export async function manageTeamsByIdLoader({ context, params }): Promise<ManageTeamsByIdLoaderProps> {
  return {
    team: await fetchById<BriefTeam>(context.queryClient, buildManageTeamsByIdOptions(+params.teamId)),
  };
}

export async function managePlayersAllLoader({ context }): Promise<ManagePlayersAllLoaderProps> {
  return {
    players: await fetchAll<BriefPlayer>(context.queryClient, buildManagePlayersAllOptions()),
  };
}

export async function managePlayersByIdLoader({ context, params }): Promise<ManagePlayersByIdLoaderProps> {
  return {
    player: await fetchById<BriefPlayer>(context.queryClient, buildManagePlayersByIdOptions(+params.playerId)),
  };
}

export async function manageGamesAllLoader({ context }): Promise<ManageGamesAllLoaderProps> {
  return {
    games: await fetchAll<BriefGame>(context.queryClient, buildManageGamesAllOptions()),
  };
}

export async function manageGamesByIdLoader({ context, params }): Promise<ManageGamesByIdLoaderProps> {
  return {
    game: await fetchById<BriefGame>(context.queryClient, buildManageGamesByIdOptions(+params.gameId)),
  };
}
