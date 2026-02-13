import type { Team } from "@types/Team";

/**
 * This is shared with /client as well.
 */
export type StandingsLog = {
  id: number,
  teamId: number,
  team: Team,
  wins: number,
  losses: number,
  draws: number,
  byes: number,
  pointsFor: number,
  pointsAgainst: number,
}
