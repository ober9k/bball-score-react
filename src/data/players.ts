import type { Player } from "../types/Player.ts";
import { Position } from "../types/Position.ts";

export const mockPlayers: Array<Player> = [
  {
    id: 11,
    name: "Alfonso Mccormick",
    position: Position.PointGuard,
    number: 21,
  },
  {
    id: 12,
    name: "Myron Gaines",
    position: Position.ShootingGuard,
    number: 11,
  },
  {
    id: 13,
    name: "Genaro Acosta",
    position: Position.SmallForward,
    number: 17,
  },
  {
    id: 14,
    name: "Zackary Fernandez",
    position: Position.PowerForward,
    number: 36,
  },
  {
    id: 15,
    name: "Leonardo Irwin",
    position: Position.Center,
    number: 12,
  },
  {
    id: 21,
    name: "Andres Wolfe",
    position: Position.PointGuard,
    number: 24,
  },
  {
    id: 22,
    name: "Kevin Chapman",
    position: Position.ShootingGuard,
    number: 41,
  },
  {
    id: 23,
    name: "Alexis Mendoza",
    position: Position.SmallForward,
    number: 15,
  },
  {
    id: 24,
    name: "Joaquin Bernal",
    position: Position.PowerForward,
    number: 18,
  },
  {
    id: 25,
    name: "Elliott Ryder",
    position: Position.Center,
    number: 33,
  },
];

/**
 * TEMP: expectation that you select a valid player
 * @param playerId
 */
export function findPlayerById(playerId: number): Player {
  return mockPlayers.find(({ id }) => id === playerId)!;
}

export function tempFindPlayerById(playerId: number): Player {
  return mockPlayers.find(({ id }) => id === playerId);
}
