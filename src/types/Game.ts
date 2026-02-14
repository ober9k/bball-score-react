import type { TeamLog } from "./game/TeamLog.ts";

export type Game = {
  id: number,
  date: Date,
  round: number,
  teamLogs: Array<TeamLog>,
}
