import type { Team } from "../Team.ts";

/**
 * TBD: maybe there is a better place for this
 */
export type StandingsRow = {
  id: number,
  teamId: number,
  team?: Team,
  wins: number,
  losses: number,
  draws: number,
  byes: number,
  pointsFor: number,
  pointsAgainst: number,
}
