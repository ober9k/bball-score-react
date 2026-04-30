import { toBriefDivision, toBriefGame, toBriefPlayer, toBriefSeason, toBriefTeam } from "@/apis/manage/converters.ts";
import { buildAllQueryFn, buildByIdQueryFn } from "@/apis/query-functions.ts";
import type { BriefDivision } from "@/types/division.ts";
import type { BriefGame } from "@/types/game.ts";
import type { BriefPlayer } from "@/types/player.ts";
import type { BriefSeason } from "@/types/season.ts";
import type { BriefTeam } from "@/types/team.ts";

const QueryKeys = {
  Seasons:   ["manage", "seasons"],
  Divisions: ["manage", "divisions"],
  Teams:     ["manage", "teams"],
  Players:   ["manage", "players"],
  Games:     ["manage", "games"],
} as const;

export function buildManageSeasonsAllOptions() {
  return {
    queryKey: [...QueryKeys.Seasons],
    queryFn:  buildAllQueryFn<BriefSeason>(toBriefSeason)
  };
}

export function buildManageSeasonsByIdOptions(id: number) {
  return {
    queryKey: [...QueryKeys.Seasons, id.toString()],
    queryFn:  buildByIdQueryFn<BriefSeason>(toBriefSeason)
  };
}

export function buildManageDivisionsAllOptions() {
  return {
    queryKey: [...QueryKeys.Divisions],
    queryFn:  buildAllQueryFn<BriefDivision>(toBriefDivision)
  };
}

export function buildManageDivisionsByIdOptions(id: number) {
  return {
    queryKey: [...QueryKeys.Divisions, id.toString()],
    queryFn:  buildByIdQueryFn<BriefDivision>(toBriefDivision)
  };
}

export function buildManageTeamsAllOptions() {
  return {
    queryKey: [...QueryKeys.Teams],
    queryFn:  buildAllQueryFn<BriefTeam>(toBriefTeam)
  };
}

export function buildManageTeamsByIdOptions(id: number) {
  return {
    queryKey: [...QueryKeys.Teams, id.toString()],
    queryFn:  buildByIdQueryFn<BriefTeam>(toBriefTeam)
  };
}

export function buildManagePlayersAllOptions() {
  return {
    queryKey: [...QueryKeys.Players],
    queryFn:  buildAllQueryFn<BriefPlayer>(toBriefPlayer)
  };
}

export function buildManagePlayersByIdOptions(id: number) {
  return {
    queryKey: [...QueryKeys.Players, id.toString()],
    queryFn:  buildByIdQueryFn<BriefPlayer>(toBriefPlayer)
  };
}

export function buildManageGamesAllOptions() {
  return {
    queryKey: [...QueryKeys.Games],
    queryFn:  buildAllQueryFn<BriefGame>(toBriefGame)
  };
}

export function buildManageGamesByIdOptions(id: number) {
  return {
    queryKey: [...QueryKeys.Games, id.toString()],
    queryFn:  buildByIdQueryFn<BriefGame>(toBriefGame)
  };
}
