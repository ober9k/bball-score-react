import type { Player } from "../Player.ts";
import type { Totals } from "../stats/Totals.ts";

export type PlayerLog = {
  id: number,
  playerId: number,
  player?: Player,
  played: boolean,
  totals: Totals,
}
