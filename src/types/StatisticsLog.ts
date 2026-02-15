import type { Player } from "./Player.ts";
import type { Totals } from "./stats/Totals.ts";

export type StatisticsLog = {
  id: number,
  playerId: number,
  player: Player,
  played: number,
  totals: Totals,
}
