import type { Team } from "../Team.ts";
import type { PlayerLog } from "./PlayerLog.ts";

export type TeamLog = {
  id: number,
  teamId: number,
  team?: Team,
  teamScore: number,
  playerLogs: Array<PlayerLog>;
}
