import { toBriefDivision, toBriefGame, toBriefPlayer, toBriefSeason, toBriefTeam } from "@/apis/manage/converters.ts";
import { buildAllQueryFn, buildByIdQueryFn } from "@/apis/query-functions.ts";
import type { BriefDivision } from "@/types/division.ts";
import type { BriefGame } from "@/types/game.ts";
import type { BriefPlayer } from "@/types/player.ts";
import type { BriefSeason } from "@/types/season.ts";
import type { BriefTeam } from "@/types/team.ts";

export function buildManageSeasonsAllOptions() {
  return {
    queryKey: ["manage", "seasons"],
    queryFn:  buildAllQueryFn<BriefSeason>(toBriefSeason)
  };
}

export function buildManageSeasonsByIdOptions(id: number) {
  return {
    queryKey: ["manage", "seasons", id.toString()],
    queryFn:  buildByIdQueryFn<BriefSeason>(toBriefSeason)
  };
}

export function buildManageDivisionsAllOptions() {
  return {
    queryKey: ["manage", "divisions"],
    queryFn:  buildAllQueryFn<BriefDivision>(toBriefDivision)
  };
}

export function buildManageDivisionsByIdOptions(id: number) {
  return {
    queryKey: ["manage", "divisions", id.toString()],
    queryFn:  buildByIdQueryFn<BriefDivision>(toBriefDivision)
  };
}

export function buildManageTeamsAllOptions() {
  return {
    queryKey: ["manage", "teams"],
    queryFn:  buildAllQueryFn<BriefTeam>(toBriefTeam)
  };
}

export function buildManageTeamsByIdOptions(id: number) {
  return {
    queryKey: ["manage", "teams", id.toString()],
    queryFn:  buildByIdQueryFn<BriefTeam>(toBriefTeam)
  };
}

export function buildManagePlayersAllOptions() {
  return {
    queryKey: ["manage", "players"],
    queryFn:  buildAllQueryFn<BriefPlayer>(toBriefPlayer)
  };
}

export function buildManagePlayersByIdOptions(id: number) {
  return {
    queryKey: ["manage", "players", id.toString()],
    queryFn:  buildByIdQueryFn<BriefPlayer>(toBriefPlayer)
  };
}

export function buildManageGamesAllOptions() {
  return {
    queryKey: ["manage", "games"],
    queryFn:  buildAllQueryFn<BriefGame>(toBriefGame)
  };
}

export function buildManageGamesByIdOptions(id: number) {
  return {
    queryKey: ["manage", "games", id.toString()],
    queryFn:  buildByIdQueryFn<BriefGame>(toBriefGame)
  };
}
