import type { SideType } from "@/types/game/side.ts";
import type { Team } from "@/types/team.ts";

export type TeamLog = {
  id: number,
  side: SideType,
  score: number,
  scoreByPeriod: number[],
  team: Team,
}
