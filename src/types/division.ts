import type { Activatable, Archivable } from "@/types/base";
import type { BriefSeason } from "@/types/season";

export type Division = {
  id:       number,
  name:     string,
  seasonId: number,
  active:   boolean,
  archived: boolean,
  leagueId: number,
};

export type BriefDivision = {
  id:       number,
  name:     string,
  seasonId: number,
  season:   BriefSeason,
  leagueId: number,
} & Activatable & Archivable;

export type BriefDivisionData = Omit<BriefDivision, "id" | "season" | "leagueId">;

export type UpdateDivisionDto = Omit<Division, "id">; /* to be removed */
