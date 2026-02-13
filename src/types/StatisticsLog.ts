import type { Player } from "./Player.ts";

export type StatisticsLog = {
  id: number,
  playerId: number,
  player: Player,
  played: number,
  points: number,
  rebounds: number,
  assists: number,
  steals: number,
  blocks: number,
  personalFouls: number,
  turnovers: number,
}
