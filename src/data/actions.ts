import axios from "axios";
import type { Team } from "../types/Team.ts";

export type TeamData = Pick<Team, "id" | "name" | "teamStyle">;

export async function updateTeam(teamData: TeamData) {
  // TODO: tidy up and wire-up the remaining logic
  await axios.put("http://localhost:8080/api/teams/" + teamData.id, teamData);
  return "Updated";
}