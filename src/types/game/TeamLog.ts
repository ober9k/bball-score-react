import type { PlayerLog } from "./PlayerLog.ts";

export type TeamLog = {
  id: number,
  teamId: number,
  teamScore: number,
  playerLogs: Array<PlayerLog>;
}
