import type { Player } from "../Player.ts";

export type PlayerLog = {
  id: number,
  playerId: number,
  player?: Player,
  played: boolean,
  points: number,
  rebounds: number,
  assists: number,
  steals: number,
  blocks: number,
  personalFouls: number,
  turnovers: number,
}
