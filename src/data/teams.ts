import type { Team } from "../types/Team.ts";

export const mockTeams: Array<Team> = [
  { id: 11, name: "SayLess 2.0", shortName: "SAY", teamStyle: { bgColor: "#F34841", textColor: "#ffffff" } },
  { id: 12, name: "Bloodlines", shortName: "BLD", teamStyle: { bgColor: "#dfdfdf", textColor: "#000000" } },
  { id: 13, name: "Chaos", shortName: "CHA", teamStyle: { bgColor: "#B72E2F", textColor: "#ffffff" } },
  { id: 14, name: "eHub Knights 2.0", shortName: "EHB", teamStyle: { bgColor: "#27A2CC", textColor: "#0B172D" } },
  { id: 15, name: "FBBL", shortName: "FBB", teamStyle: { bgColor: "#6D591F", textColor: "#ffffff" } },
  { id: 16, name: "Hustlers", shortName: "HUS", teamStyle: { bgColor: "#C1633A", textColor: "#ffffff" } },
  { id: 17, name: "InvestorKit", shortName: "INV", teamStyle: { bgColor: "#58B484", textColor: "#ffffff" } },
];

/**
 * TEMP: expectation that you select a valid team
 * @param teamId
 */
export function findTeamById(teamId: number): Team {
  return mockTeams.find(({ id }) => id === teamId)!;
}

export function tempFindTeamById(teamId: number): Team | undefined {
  return mockTeams.find(({ id }) => id === teamId);
}
