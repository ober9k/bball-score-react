import type { Division } from "@/types/division.ts";
import type { Player } from "@/types/player.ts";
import type { Season } from "@/types/season.ts";
import type { Team } from "@/types/team.ts";

export type DtoConverter<T> = (data: any) => T;

export function toSeason(season: any): Season {
  return {
    id:   season.id,
    name: season.name,
  };
}

export function toDivision(division: any): Division {
  return {
    id:       division.id,
    name:     division.name,
    seasonId: division.seasonId,
  };
}

export function toTeam(team: any): Team {
  return {
    id:         team.id,
    name:       team.name,
    shortName:  team.shortName,
    divisionId: team.divisionId,
  };
}

export function toPlayer(player: any): Player {
  return {
    id:       player.id,
    name:     player.name,
    position: player.position,
    number:   player.number,
    height:   player.height,
  };
}
