import type { Player } from "../types/Player.ts";
import { Position } from "../types/Position.ts";

export const mockPlayers: Array<Player> = [
  // SayLess 2.0
  { id: 11, name: "J.J. Baltan",   number: 16,  position: Position.PointGuard,    height: `5'6"` },
  { id: 12, name: "A. Cuenca",     number: 9,   position: Position.PowerForward,  height: `5'7"` },
  { id: 13, name: "A.J. Dimailig", number: 23,  position: Position.PowerForward,  height: `5'9"` },
  { id: 14, name: "D. Hardaker",   number: 2,   position: Position.SmallForward,  height: `5'8"` },
  { id: 15, name: "K. Joven",      number: 11,  position: Position.PointGuard,    height: `5'7"` },
  { id: 16, name: "K. Joven",      number: 26,  position: Position.SmallForward,  height: `5'8"` },
  { id: 17, name: "K. Joven",      number: 14,  position: Position.ShootingGuard, height: `5'8"` },
  { id: 18, name: "A. Martinez",   number: 1,   position: Position.Center,        height: `6'1"` },
  { id: 19, name: "T.J. Rivera",   number: 0,   position: Position.PowerForward,  height: `5'9"` },
  { id: 20, name: "C. Sheridan",   number: 91,  position: Position.Center,        height: `6'3"` },
  // InvestorKit
  { id: 21, name: "Player #7",     number: 7,   position: Position.Center,        height: `5'11"` },
  { id: 22, name: "Player #8",     number: 8,   position: Position.PointGuard,    height: `5'7"` },
  { id: 23, name: "Player #9",     number: 9,   position: Position.SmallForward,  height: `5'11"` },
  { id: 24, name: "Player #11",    number: 11,  position: Position.ShootingGuard, height: `5'8"` },
  { id: 25, name: "Player #12",    number: 12,  position: Position.Center,        height: `6'0"` },
  { id: 26, name: "Player #22",    number: 22,  position: Position.SmallForward,  height: `5'8"` },
  { id: 27, name: "Player #55",    number: 55,  position: Position.ShootingGuard, height: `5'9"` },
  { id: 28, name: "Player #68",    number: 68,  position: Position.PointGuard,    height: `5'7"` },
  { id: 29, name: "Player #100",   number: 100, position: Position.PowerForward,  height: `5'10"` },
];

/**
 * TEMP: expectation that you select a valid player
 * @param playerId
 */
export function findPlayerById(playerId: number): Player {
  return mockPlayers.find(({ id }) => id === playerId)!;
}
