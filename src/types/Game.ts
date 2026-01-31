import type { TeamLog } from "./game/TeamLog.ts";

export type Game = {
  id: number,
  date: Date,
  teamLogs: Array<TeamLog>,
}
