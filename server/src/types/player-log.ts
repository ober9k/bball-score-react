import type { Player } from "@types/player";
import type { Totals } from "@types/stats/totals";

export type PlayerLog = {
  id: number,
  playerId: number,
  player: Player,
  played: boolean,
  totals: Totals,
}
