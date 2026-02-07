import type { Team } from "../types/Team.ts";
import { findTeamById } from "./teams.ts";

export type TeamData = Pick<Team, "id" | "name" | "teamStyle">;

export async function updateTeam(teamData: TeamData) {
  console.log("Updating Team:", teamData);

  const existingTeam = findTeamById(teamData.id);

  /* keeping it simple for now */
  existingTeam.name = teamData.name;
  existingTeam.teamStyle.bgColor = teamData.teamStyle.bgColor;
  existingTeam.teamStyle.textColor = teamData.teamStyle.textColor;

  await new Promise((res) => setTimeout(res, 1000));
  return "Updated";
}