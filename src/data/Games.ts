import type { Game } from "../types/Game.ts";
import type { PlayerLog } from "../types/game/PlayerLog.ts";

function mockPlayer(id: number, playerId: number, played: boolean, points: number, rebounds: number, assists: number) {
  return { id, playerId, played, points, rebounds, assists } as PlayerLog;
}

export const mockGames: Array<Game> = [
  {
    id: 1,
    date: new Date("2025-02-01"),
    teamLogs: [
      {
        id: 1,
        teamId: 10,
        teamScore: 55,
        playerLogs: [
          mockPlayer(1, 11, true, 15,  7,  3),
          mockPlayer(1, 12, true, 11,  6,  2),
          mockPlayer(1, 13, true,  8, 13,  5),
          mockPlayer(1, 14, true,  5,  3,  2),
          mockPlayer(1, 15, true, 16,  9,  5),
        ],
      },
      {
        id: 2,
        teamId: 11,
        teamScore: 53,
        playerLogs: [
          mockPlayer(1, 21, true, 16,  8,  4),
          mockPlayer(1, 22, true, 11,  7,  1),
          mockPlayer(1, 23, true,  7,  2,  3),
          mockPlayer(1, 24, true, 13,  5,  3),
          mockPlayer(1, 25, true,  6, 11,  4),
        ],
      },
    ],
  },
  {
    id: 2,
    date: new Date("2025-02-08"),
    teamLogs: [
      {
        id: 4,
        teamId: 11,
        teamScore: 83,
        playerLogs: [
          mockPlayer(1, 21, true, 15,  8,  9),
          mockPlayer(1, 22, true, 14,  9,  1),
          mockPlayer(1, 23, true,  7, 11,  5),
          mockPlayer(1, 24, true, 41,  5,  5),
          mockPlayer(1, 25, true,  6,  6,  4),
        ],
      },
      {
        id: 3,
        teamId: 10,
        teamScore: 67,
        playerLogs: [
          mockPlayer(1, 11, true,  9,  5,  1),
          mockPlayer(1, 12, true, 15,  9,  4),
          mockPlayer(1, 13, true, 11, 10, 11),
          mockPlayer(1, 14, true,  7,  9,  1),
          mockPlayer(1, 15, true, 25,  5,  0),
        ],
      },
    ],
  },
];

/**
 * TEMP: expectation that you select a valid game
 * @param gameId
 */
export function findGameById(gameId: number): Game {
  return mockGames.find(({ id }) => id === gameId)!;
}
