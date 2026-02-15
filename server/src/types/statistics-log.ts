import type { Player } from "@types/player";
import type { Totals } from "@types/stats/totals";

export type StatisticsLog = {
  id: number,
  playerId: number,
  player: Player,
  played: number,
  totals: Totals,
}
