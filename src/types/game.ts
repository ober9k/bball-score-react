import type { PhaseType } from "@/types/game/phase.ts";
import type { TeamLog } from "@/types/game/team-log.ts";

export type Game = {
  id: number,
  date: Date
  phase: PhaseType,
  round: number,
  teamLogs: TeamLog[],
}
