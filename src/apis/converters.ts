import type { Season } from "@/types/season.ts";

export type DtoConverter<T> = (data: any) => T;

export function toSeason(season: any): Season {
  return {
    id:   season.id,
    name: season.name,
  };
}
