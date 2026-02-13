import type { TeamStyle } from "./team/TeamStyle.ts";

export type Team = {
  id: number,
  name: string,
  shortName: string,
  teamStyle: TeamStyle,
}
