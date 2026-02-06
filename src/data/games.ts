import type { Game } from "../types/Game.ts";
import type { PlayerLog } from "../types/game/PlayerLog.ts";
import type { TeamLog } from "../types/game/TeamLog.ts";
import { findPlayerById } from "./players.ts";
import { findTeamById } from "./teams.ts";

let playerLogId = 1;

function mockPlayer(playerId: number, played: boolean, points: number, rebounds: number, assists: number, steals: number, blocks: number, turnovers: number, personalFouls: number) {
  return { id: playerLogId++, playerId, played, points, rebounds, assists, steals, blocks, turnovers, personalFouls } as PlayerLog;
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
          mockPlayer(11, true, 15,  7,  3, 1, 0, 2, 0),
          mockPlayer(12, true, 11,  6,  2, 1, 1, 1, 3),
          mockPlayer(13, true,  8, 13,  5, 2, 2, 0, 0),
          mockPlayer(14, true,  5,  3,  2, 1, 0, 3, 2),
          mockPlayer(15, true, 16,  9,  5, 3, 0, 2, 2),
        ],
      },
      {
        id: 2,
        teamId: 11,
        teamScore: 53,
        playerLogs: [
          mockPlayer(21, true, 16,  8,  4, 2, 0, 0, 4),
          mockPlayer(22, true, 11,  7,  1, 2, 2, 3, 0),
          mockPlayer(23, true,  7,  2,  3, 1, 1, 4, 1),
          mockPlayer(24, true, 13,  5,  3, 1, 2, 2, 1),
          mockPlayer(25, true,  6, 11,  4, 0, 0, 1, 3),
        ],
      },
    ],
  },
  {
    id: 2,
    date: new Date("2025-02-08"),
    teamLogs: [
      {
        id: 3,
        teamId: 11,
        teamScore: 83,
        playerLogs: [
          mockPlayer(21, true, 15,  8,  9, 2, 0, 1, 3),
          mockPlayer(22, true, 14,  9,  1, 0, 2, 4, 0),
          mockPlayer(23, true,  7, 11,  5, 2, 0, 1, 2),
          mockPlayer(24, true, 41,  5,  5, 1, 1, 1, 2),
          mockPlayer(25, true,  6,  6,  4, 0, 5, 2, 2),
        ],
      },
      {
        id: 4,
        teamId: 10,
        teamScore: 67,
        playerLogs: [
          mockPlayer(11, true,  9,  5,  1, 2, 0, 2, 0),
          mockPlayer(12, true, 15,  9,  4, 3, 1, 2, 2),
          mockPlayer(13, true, 11, 10, 11, 5, 5, 1, 3),
          mockPlayer(14, true,  7,  9,  1, 1, 0, 3, 2),
          mockPlayer(15, true, 25,  5,  0, 0, 1, 0, 0),
        ],
      },
    ],
  },
  {
    id: 3,
    date: new Date("2025-02-15"),
    teamLogs: [
      {
        id: 4,
        teamId: 10,
        teamScore: 61,
        playerLogs: [
          mockPlayer(11, true, 17,  3,  2, 2, 2, 1, 2),
          mockPlayer(12, true,  6,  5,  5, 3, 2, 3, 0),
          mockPlayer(13, true,  8, 16,  2, 1, 1, 3, 3),
          mockPlayer(14, true,  9,  3,  2, 0, 1, 2, 1),
          mockPlayer(15, true, 21,  8,  4, 2, 0, 0, 1),
        ],
      },
      {
        id: 5,
        teamId: 11,
        teamScore: 49,
        playerLogs: [
          mockPlayer(21, true, 12,  8,  4, 2, 0, 2, 1),
          mockPlayer(22, true, 15,  7,  0, 1, 0, 2, 0),
          mockPlayer(23, true,  6,  2,  5, 3, 2, 3, 4),
          mockPlayer(24, true,  9,  5,  2, 1, 1, 2, 2),
          mockPlayer(25, true,  7, 10,  3, 1, 1, 0, 1),
        ],
      },
    ],
  },
];

/**
 * Populated referenced teams within the logs.
 * (this would normally be done on the API)
 */
function populateTeamLogs(teamLogs: Array<TeamLog>) {
  teamLogs.forEach((teamLog) => {
    teamLog.team = findTeamById(teamLog.teamId);
  });
}

/**
 * Populated referenced players within the logs.
 * (this would normally be done on the API)
 */
function populatePlayerLogs(playerLogs: Array<PlayerLog>) {
  playerLogs.forEach((playerLog) => {
    playerLog.player = findPlayerById(playerLog.playerId);
  });
}

/**
 * Apply the populate log functions.
 */
mockGames.forEach((game) => {
  populateTeamLogs(game.teamLogs);

  game.teamLogs.forEach((teamLog) => {
    populatePlayerLogs(teamLog.playerLogs);
  });
});

/**
 * TEMP: expectation that you select a valid game
 * @param gameId
 */
export function findGameById(gameId: number): Game {
  return mockGames.find(({ id }) => id === gameId)!;
}

/**
 * TEMP: expectation that you select a valid player for games
 * This will return all games which player has some playerLogs.
 * @param playerId
 */
export function findPlayerGames(playerId: number): Array<Game> {
  return mockGames.map((game) => {
    return {
      ...game,
      teamLogs: game.teamLogs.map((teamLog) => {
        return {
          ...teamLog,
          playerLogs: teamLog.playerLogs.filter(({ playerId: id }) => id === playerId ),
        };
      })
    };
  });
}
