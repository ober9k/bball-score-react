import type { Team } from "./Team.ts";

/**
 * This is shared with /server as well.
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
