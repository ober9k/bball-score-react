import type { TeamStyle } from "@types/team-style";

/**
 * This is shared with /client as well.
 */
export type Team = {
  id: number,
  name: string,
  teamStyle: TeamStyle,
}
