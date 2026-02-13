import type { Team } from "../types/Team.ts";

export const mockTeams: Array<Team> = [
  {
    id: 10,
    name: "Liverpool Lads",
    shortName: "LPL",
    teamStyle: {
      bgColor: "#993333",
      textColor: "#ffffff",
    },
  },
  {
    id: 11,
    name: "Blacktown Bogans",
    shortName: "BTB",
    teamStyle: {
      bgColor: "#339933",
      textColor: "#ffffff",
    },
  },
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
