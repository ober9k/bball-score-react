import type { Activatable, Archivable } from "@/types/base.ts";
import type { BriefDivision } from "@/types/division.ts";
import type { BriefGame } from "@/types/game.ts";
import type { BriefPlayer } from "@/types/player.ts";
import type { BriefSeason } from "@/types/season.ts";
import type { BriefTeam } from "@/types/team.ts";

function withActivatable(data: any): Activatable {
  return {
    activated: data.active,
  };
}

function withArchivable(data: any): Archivable {
  return {
    archived: data.archived,
  };
}

function withLeagueId(data: any): { leagueId: number } {
  return {
    leagueId: data.leagueId,
  };
}

export function toBriefSeason(data: any): BriefSeason {
  return {
    id:   data.id,
    name: data.name,
    ...withActivatable(data),
    ...withArchivable(data),
    ...withLeagueId(data),
  };
}

export function toBriefDivision(data: any): BriefDivision {
  return {
    id:       data.id,
    name:     data.name,
    seasonId: data.seasonId,
    season:   toBriefSeason(data.season),
    ...withActivatable(data),
    ...withArchivable(data),
    ...withLeagueId(data),
  };
}

export function toBriefTeam(data: any): BriefTeam {
  return {
    id:         data.id,
    name:       data.name,
    shortName:  data.shortName,
    divisionId: data.divisionId,
    division:   toBriefDivision(data.division),
    ...withActivatable(data),
    ...withArchivable(data),
    ...withLeagueId(data),
  };
}

export function toBriefPlayer(data: any): BriefPlayer {
  return {
    id:       data.id,
    name:     data.name,
    position: data.position,
    number:   data.number,
    height:   data.height,
    ...withActivatable(data),
    ...withArchivable(data),
    ...withLeagueId(data),
  };
}

export function toBriefGame(data: any): BriefGame {
  return {
    id:         data.id,
    date:       data.date,
    phase:      data.phase,
    round:      data.round,
    seasonId:   data.seasonId,
    season:     toBriefSeason(data.season),
    divisionId: data.divisionId,
    division:   toBriefDivision(data.division),
    ...withActivatable(data),
    ...withArchivable(data),
    ...withLeagueId(data),
  };
}
