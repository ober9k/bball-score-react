import type { Team } from "../types/Team.ts";

export const mockTeams: Array<Team> = [
  {
    id: 10,
    name: "Liverpool Lads",
  },
  {
    id: 11,
    name: "Blacktown Bogans",
  },
];

/**
 * TEMP: expectation that you select a valid team
 * @param teamId
 */
export function findTeamById(teamId: number): Team {
  return mockTeams.find(({ id }) => id === teamId)!;
}
