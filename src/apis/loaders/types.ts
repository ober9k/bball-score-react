import type { Division } from "@/types/division.ts";
import type { Season } from "@/types/season.ts";

export type SeasonsLoaderProps = {
  seasons: Season[],
};

export type SeasonLoaderProps = {
  season: Season,
};

export type DivisionsLoaderProps = {
  divisions: Division[],
};

export type DivisionLoaderProps = {
  division: Division,
};
