import type { Activatable, Archivable } from "@/types/base.ts";
import type { BriefDivision } from "@/types/division.ts";

export type Team = {
  id:         number,
  name:       string,
  shortName:  string,
  divisionId: number,
  active:     boolean,
  archived:   boolean,
  leagueId:   number,
};

export type BriefTeam = {
  id:         number,
  name:       string,
  shortName:  string,
  divisionId: number,
  division:   BriefDivision,
  leagueId: number,
} & Activatable & Archivable;

export type BriefTeamData = Omit<BriefTeam, "id" | "division">;

export type UpdateTeamDto = Omit<Team, "id">; /* to be removed */
