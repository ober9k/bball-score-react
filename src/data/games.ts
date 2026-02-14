import type { Game } from "../types/Game.ts";
import type { PlayerLog } from "../types/game/PlayerLog.ts";
import type { TeamLog } from "../types/game/TeamLog.ts";
import type { Player } from "../types/Player.ts";
import type { Totals } from "../types/stats/Totals.ts";
import type { Team } from "../types/Team.ts";
import { filterPlayerLogByPlayerId, getAwayTeamLog, getHomeTeamLog } from "../utilities/GameUtils.ts";
import { findPlayerById } from "./players.ts";
import { findTeamById } from "./teams.ts";

let gameId = 1;
let teamLogId = 1;
let playerLogId = 1;

const gameIds = {
  W1:  gameId++,
  W2:  gameId++,
  W3:  gameId++,
  W4:  gameId++,
  W5:  gameId++,
  W6:  gameId++,
  W7:  gameId++,
  W8:  gameId++,
  W9:  gameId++,
  W10: gameId++,
  W11: gameId++,
  W12: gameId++, // semi-finals
};

function mockPlayer(playerId: number, player: Player, played: boolean, points: number, rebounds: number, assists: number, steals: number, blocks: number, turnovers: number, personalFouls: number) {
  return { id: playerLogId++, playerId, player, played, points, rebounds, assists, steals, blocks, turnovers, personalFouls } as PlayerLog;
}

const mockPlayerLogs = [
  /* week 1 */
  [ playerLogId++, gameIds.W1, 11, 1664,  4, 12,  0,  2,  0,  0,  5,  1,  3,  1,  0,  4,  2 ],
  [ playerLogId++, gameIds.W1, 12, 1667,  2, 10,  1,  8,  0,  1,  1,  2,  1,  0,  0,  1,  2 ],
  [ playerLogId++, gameIds.W1, 13,    0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0 ],
  [ playerLogId++, gameIds.W1, 14, 1194,  0,  4,  0,  4,  0,  0,  0,  0,  0,  0,  1,  0,  0 ],
  [ playerLogId++, gameIds.W1, 15, 1257,  4, 11,  0,  3,  0,  0,  1,  4,  3,  4,  0,  3,  1 ],
  [ playerLogId++, gameIds.W1, 16, 2400,  6, 16,  1,  6,  2,  2,  2,  7,  2,  3,  0,  3,  3 ],
  [ playerLogId++, gameIds.W1, 17, 2088,  4,  8,  0,  3,  0,  0,  4,  2,  2,  4,  1,  1,  2 ],
  [ playerLogId++, gameIds.W1, 18,    0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0 ],
  [ playerLogId++, gameIds.W1, 19, 1730,  2,  6,  0,  0,  0,  0,  1,  4,  2,  0,  0,  0,  1 ],
  [ playerLogId++, gameIds.W1, 20,    0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0 ],
  /* week 2 */
  [ playerLogId++, gameIds.W2, 11, 1850,  8, 16,  3,  7,  0,  1,  1,  0,  1,  3,  0,  2,  1 ],
  [ playerLogId++, gameIds.W2, 12,    0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0 ],
  [ playerLogId++, gameIds.W2, 13,    0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0 ],
  [ playerLogId++, gameIds.W2, 14, 1422,  0,  6,  0,  6,  0,  0,  0,  2,  1,  0,  0,  2,  1 ],
  [ playerLogId++, gameIds.W2, 15, 1824,  2,  7,  2,  4,  2,  2,  0,  3,  2,  1,  0,  1,  1 ],
  [ playerLogId++, gameIds.W2, 16, 2252,  4, 13,  2,  7,  3,  4,  2,  4,  7,  4,  0,  2,  0 ],
  [ playerLogId++, gameIds.W2, 17, 1830,  1,  8,  1,  6,  0,  0,  3,  5,  1,  1,  0,  0,  0 ],
  [ playerLogId++, gameIds.W2, 18,    0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0 ],
  [ playerLogId++, gameIds.W2, 19, 1854,  0,  3,  0,  0,  0,  0,  2,  4,  1,  0,  0,  0,  4 ],
  [ playerLogId++, gameIds.W2, 20,  968,  1,  3,  0,  2,  0,  0,  1,  1,  0,  0,  0,  0,  5 ],
  /* week 3 */
  [ playerLogId++, gameIds.W3, 11, 1421,  8, 13,  2,  5,  0,  1,  4,  0,  0,  2,  0,  0,  1 ],
  [ playerLogId++, gameIds.W3, 12, 1253,  2,  8,  1,  5,  2,  3,  0,  3,  2,  0,  1,  2,  1 ],
  [ playerLogId++, gameIds.W3, 13,  473,  0,  1,  0,  0,  0,  0,  0,  2,  1,  0,  0,  2,  3 ],
  [ playerLogId++, gameIds.W3, 14,  923,  0,  5,  0,  5,  0,  0,  0,  1,  1,  2,  1,  0,  1 ],
  [ playerLogId++, gameIds.W3, 15, 1627,  6, 15,  3,  7,  0,  0,  1,  0,  4,  5,  0,  2,  1 ],
  [ playerLogId++, gameIds.W3, 16, 1467,  0,  0,  0,  0,  0,  0,  0,  2,  2,  2,  0,  2,  1 ],
  [ playerLogId++, gameIds.W3, 17, 1314,  2,  5,  1,  3,  0,  0,  1,  3,  2,  3,  0,  0,  1 ],
  [ playerLogId++, gameIds.W3, 18, 1135,  3, 10,  0,  0,  1,  3,  3,  7,  0,  0,  0,  0,  0 ],
  [ playerLogId++, gameIds.W3, 19,  824,  1,  4,  0,  0,  0,  0,  2,  0,  0,  0,  0,  1,  2 ],
  [ playerLogId++, gameIds.W3, 20, 1573,  1,  4,  0,  0,  0,  2,  2,  3,  0,  1,  0,  0,  4 ],
  /* week 4 */
  [ playerLogId++, gameIds.W4, 11, 2183,  4,  7,  2,  4,  1,  2,  3,  2,  3,  2,  0,  3,  3 ],
  [ playerLogId++, gameIds.W4, 12, 1565,  1,  4,  1,  3,  0,  0,  0,  1,  0,  0,  0,  1,  1 ],
  [ playerLogId++, gameIds.W4, 13,    0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0 ],
  [ playerLogId++, gameIds.W4, 14,  713,  1,  5,  1,  5,  0,  0,  0,  0,  0,  0,  0,  0,  0 ],
  [ playerLogId++, gameIds.W4, 15, 2188,  4, 14,  1,  6,  0,  0,  1,  5,  2,  2,  2,  3,  1 ],
  [ playerLogId++, gameIds.W4, 16, 1899,  6, 13,  3,  8,  2,  4,  0,  5,  3,  3,  1,  2,  3 ],
  [ playerLogId++, gameIds.W4, 17, 1796,  2,  5,  0,  2,  0,  0,  3,  0,  3,  4,  0,  1,  1 ],
  [ playerLogId++, gameIds.W4, 18,    0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0 ],
  [ playerLogId++, gameIds.W4, 19, 1656,  2,  5,  0,  0,  0,  0,  1,  2,  0,  1,  0,  1,  4 ],
  [ playerLogId++, gameIds.W4, 20,    0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0 ],
  /* week 6 */
  [ playerLogId++, gameIds.W6, 11, 1676,  2,  6,  1,  4,  0,  0,  1,  1,  0,  2,  0,  0,  0 ],
  [ playerLogId++, gameIds.W6, 12,  810,  0,  1,  0,  0,  0,  0,  0,  0,  0,  0,  0,  1,  1 ],
  [ playerLogId++, gameIds.W6, 13,    0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0 ],
  [ playerLogId++, gameIds.W6, 14,    0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0 ],
  [ playerLogId++, gameIds.W6, 15, 1771,  9, 20,  1,  6,  1,  4,  2,  3,  4,  2,  0,  2,  1 ],
  [ playerLogId++, gameIds.W6, 16, 1676,  2,  9,  1,  5,  0,  0,  0,  2,  3,  2,  0,  2,  0 ],
  [ playerLogId++, gameIds.W6, 17, 1736,  3,  8,  1,  4,  0,  0,  0,  4,  1,  3,  0,  3,  1 ],
  [ playerLogId++, gameIds.W6, 18, 1732,  3,  5,  0,  0,  0,  0,  2,  1,  2,  1,  1,  0,  0 ],
  [ playerLogId++, gameIds.W6, 19, 1258,  0,  2,  0,  0,  1,  2,  5,  3,  0,  0,  0,  1,  2 ],
  [ playerLogId++, gameIds.W6, 20, 1341,  0,  0,  0,  0,  0,  0,  0,  4,  0,  1,  0,  3,  4 ],
  /* week 7 */
  [ playerLogId++, gameIds.W7, 11, 1612,  3, 11,  0,  7,  1,  2,  1,  2,  1,  2,  0,  1,  2 ],
  [ playerLogId++, gameIds.W7, 12, 1129,  1,  5,  0,  2,  0,  0,  2,  3,  1,  1,  0,  1,  1 ],
  [ playerLogId++, gameIds.W7, 13, 2266,  3,  9,  0,  1,  3,  4,  4,  3,  9,  2,  0,  3,  2 ],
  [ playerLogId++, gameIds.W7, 14,    0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0 ],
  [ playerLogId++, gameIds.W7, 15, 1401,  0,  3,  0,  1,  0,  0,  0,  5,  3,  0,  0,  1,  1 ],
  [ playerLogId++, gameIds.W7, 16, 1939,  6, 15,  1,  6,  3,  4,  3,  3,  3,  2,  0,  3,  1 ],
  [ playerLogId++, gameIds.W7, 17, 1249,  3,  5,  1,  2,  0,  0,  1,  2,  0,  2,  0,  0,  0 ],
  [ playerLogId++, gameIds.W7, 18,    0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0 ],
  [ playerLogId++, gameIds.W7, 19,  486,  0,  4,  0,  0,  0,  0,  2,  0,  0,  1,  0,  2,  1 ],
  [ playerLogId++, gameIds.W7, 20, 1918,  4, 10,  0,  0,  1,  1,  0,  3,  0,  0,  1,  1,  2 ],
  /* week 8 */
  [ playerLogId++, gameIds.W8, 11, 1730,  5, 11,  1,  3,  0,  0,  2,  1,  3,  2,  0,  1,  1 ],
  [ playerLogId++, gameIds.W8, 12, 1227,  2,  7,  2,  6,  0,  0,  2,  2,  1,  0,  0,  1,  1 ],
  [ playerLogId++, gameIds.W8, 13,    0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0 ],
  [ playerLogId++, gameIds.W8, 14, 1044,  0,  4,  0,  4,  0,  0,  0,  0,  0,  1,  0,  0,  0 ],
  [ playerLogId++, gameIds.W8, 15, 1498,  9, 15,  1,  4,  0,  1,  1,  2,  3,  1,  0,  2,  0 ],
  [ playerLogId++, gameIds.W8, 16, 1686,  4,  9,  0,  2,  0,  0,  1,  4,  3,  5,  0,  3,  3 ],
  [ playerLogId++, gameIds.W8, 17, 1060,  1,  4,  0,  2,  0,  0,  1,  2,  0,  4,  1,  3,  1 ],
  [ playerLogId++, gameIds.W8, 18, 1086,  4,  7,  0,  0,  1,  2,  1,  4,  0,  3,  2,  1,  2 ],
  [ playerLogId++, gameIds.W8, 19, 1033,  3,  3,  0,  0,  0,  0,  1,  0,  1,  2,  0,  0,  2 ],
  [ playerLogId++, gameIds.W8, 20, 1636,  1,  6,  1,  1,  0,  0,  2,  3,  0,  0,  1,  1,  3 ],
  /* week 9 */
  [ playerLogId++, gameIds.W9, 11, 1568,  3,  8,  1,  4,  0,  0,  2,  1,  1,  0,  0,  1,  0 ],
  [ playerLogId++, gameIds.W9, 12, 1327,  0,  9,  0,  6,  1,  2,  0,  3,  1,  1,  0,  0,  0 ],
  [ playerLogId++, gameIds.W9, 13, 1803,  1,  3,  0,  0,  0,  1,  1, 10,  8,  0,  1,  2,  2 ],
  [ playerLogId++, gameIds.W9, 14, 1014,  0,  8,  0,  6,  0,  0,  1,  1,  0,  0,  0,  1,  0 ],
  [ playerLogId++, gameIds.W9, 15, 1621,  4,  7,  0,  2,  0,  0,  0,  2,  1,  1,  0,  3,  0 ],
  [ playerLogId++, gameIds.W9, 16, 1602,  6, 14,  2,  6,  6,  8,  3,  2,  3,  5,  0,  0,  0 ],
  [ playerLogId++, gameIds.W9, 17,    0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0 ],
  [ playerLogId++, gameIds.W9, 18,  772,  2,  5,  0,  1,  0,  0,  3,  5,  0,  0,  0,  1,  0 ],
  [ playerLogId++, gameIds.W9, 19,  872,  0,  0,  0,  0,  0,  0,  0,  3,  0,  0,  0,  2,  3 ],
  [ playerLogId++, gameIds.W9, 20, 1421,  4, 10,  0,  1,  2,  2,  1,  6,  0,  1,  0,  1,  2 ],
  /* week 10 */
  [ playerLogId++, gameIds.W10, 11, 2400, 10, 15,  0,  3,  3,  7,  4,  1,  3,  4,  0,  1,  1 ],
  [ playerLogId++, gameIds.W10, 12,    0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0 ],
  [ playerLogId++, gameIds.W10, 13, 2175,  2,  8,  0,  0,  1,  2,  2,  7,  7,  0,  0,  5,  0 ],
  [ playerLogId++, gameIds.W10, 14, 1735,  4, 15,  4, 14,  0,  0,  2,  2,  2,  0,  0,  1,  1 ],
  [ playerLogId++, gameIds.W10, 15,    0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0 ],
  [ playerLogId++, gameIds.W10, 16, 1416,  1,  7,  0,  2,  0,  2,  2,  6,  8,  1,  0,  2,  0 ],
  [ playerLogId++, gameIds.W10, 17,    0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0 ],
  [ playerLogId++, gameIds.W10, 18,    0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0 ],
  [ playerLogId++, gameIds.W10, 19, 1274,  5,  9,  0,  0,  0,  0,  3,  4,  1,  0,  1,  2,  4 ],
  [ playerLogId++, gameIds.W10, 20, 2400,  9, 15,  0,  2,  1,  2,  2, 10,  2,  1,  3,  1,  3 ],
  /* week 11 */
  [ playerLogId++, gameIds.W11, 11,    0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0 ],
  [ playerLogId++, gameIds.W11, 12,    0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0 ],
  [ playerLogId++, gameIds.W11, 13, 2257,  4, 12,  0,  1,  1,  2,  4,  5,  6,  1,  0,  2,  1 ],
  [ playerLogId++, gameIds.W11, 14,  952,  1,  9,  1,  9,  0,  0,  0,  3,  1,  0,  0,  0,  0 ],
  [ playerLogId++, gameIds.W11, 15, 1699,  5, 19,  1, 10,  0,  0,  2,  3,  4,  3,  0,  1,  0 ],
  [ playerLogId++, gameIds.W11, 16, 1863,  5, 14,  2,  6,  0,  0,  0,  4,  1,  4,  0,  0,  0 ],
  [ playerLogId++, gameIds.W11, 17, 1781,  4,  8,  2,  6,  0,  0,  3,  3,  2,  2,  0,  0,  1 ],
  [ playerLogId++, gameIds.W11, 18, 1874,  0,  4,  0,  1,  0,  0,  1,  5,  2,  2,  0,  1,  0 ],
  [ playerLogId++, gameIds.W11, 19,    0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0 ],
  [ playerLogId++, gameIds.W11, 20, 1574,  2,  7,  0,  1,  2,  2,  0,  1,  0,  0,  0,  2,  1 ],
  /* week 12 */
  [ playerLogId++, gameIds.W12, 11,    0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0 ],
  [ playerLogId++, gameIds.W12, 12, 1375,  2,  6,  2,  6,  0,  0,  0,  2,  0,  1,  0,  1,  2 ],
  [ playerLogId++, gameIds.W12, 13,    0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0 ],
  [ playerLogId++, gameIds.W12, 14,  892,  0,  4,  0,  4,  0,  0,  1,  1,  0,  0,  0,  0,  1 ],
  [ playerLogId++, gameIds.W12, 15, 1855,  8, 17,  5, 10,  3,  4,  1,  3,  2,  1,  0,  1,  3 ],
  [ playerLogId++, gameIds.W12, 16, 2050,  2,  9,  0,  4,  0,  0,  1,  3,  4,  4,  0,  1,  2 ],
  [ playerLogId++, gameIds.W12, 17, 1964,  0,  5,  0,  5,  0,  0,  0,  2,  1,  1,  0,  0,  2 ],
  [ playerLogId++, gameIds.W12, 18, 1306,  0,  3,  0,  0,  2,  2,  0,  7,  2,  0,  1,  1,  0 ],
  [ playerLogId++, gameIds.W12, 19, 1128,  2,  3,  0,  0,  0,  0,  1,  1,  0,  0,  0,  2,  0 ],
  [ playerLogId++, gameIds.W12, 20, 1430,  3,  7,  1,  1,  0,  2,  2,  2,  0,  2,  0,  1,  3 ],
];



const parseRawPlayerLog = (rawPlayerLog: any) => {
  const [
    /*id*/,
    /*gameId*/,
    playerId,
    minutes,
    fieldGoalsMade,
    /*fieldGoalsAttempted*/,
    threePointFieldGoalsMade,
    /*threePointFieldGoalsAttempted*/,
    freeThrowsMade,
    /*freeThrowsAttempted*/,
    offensiveRebounds,
    defensiveRebounds,
    assists,
    steals,
    blocks,
    turnovers,
    personalFouls
  ] = rawPlayerLog;

  const player   = findPlayerById(playerId);
  const played   = minutes > 0 ? 1 : 0;
  const rebounds = offensiveRebounds + defensiveRebounds;
  const points   = fieldGoalsMade * 2 + threePointFieldGoalsMade + freeThrowsMade;

  return mockPlayer(
    /*id,*/
    /*gameId,*/
    playerId,
    player,
    Boolean(played),
    /*minutes,*/
    /*fieldGoalsMade,*/
    /*fieldGoalsAttempted,*/
    /*threePointFieldGoalsMade,*/
    /*threePointFieldGoalsAttempted,*/
    /*freeThrowsMade,*/
    /*freeThrowsAttempted,*/
    /*offensiveRebounds,*/
    /*defensiveRebounds,*/
    points,
    rebounds,
    assists,
    steals,
    blocks,
    turnovers,
    personalFouls
  );

}

const filterHomeGamePlayersByGameId = (id: number) => {
  return mockPlayerLogs.filter((playerLog) => {
    const [ , gameId ] = playerLog;
    return gameId === id;
  });
};

export const mockGames: Array<Game> = [
  {
    id: gameIds.W1,
    date: new Date("2025-07-27"),
    round: 1,
    teamLogs: [{
      id: teamLogId++,
      teamId: 11,
      team: undefined,
      teamScore: 48,
      /*periodScores: [9, 14, 13, 12],*/
      playerLogs: filterHomeGamePlayersByGameId(gameIds.W1).map(parseRawPlayerLog),
    }, {
      id: teamLogId++,
      teamId: 12,
      team: undefined,
      teamScore: 50, // W?
      // periodScores: [14, 13, 12, 11],
      playerLogs: [],
    }],
  },
  {
    id: gameIds.W2,
    date: new Date("2025-08-03"),
    round: 2,
    teamLogs: [{
      id: teamLogId++,
      teamId: 11,
      team: undefined,
      teamScore: 45,
      /*periodScores: [9, 16, 9, 11],*/
      playerLogs: filterHomeGamePlayersByGameId(gameIds.W2).map(parseRawPlayerLog),
    }, {
      id: teamLogId++,
      teamId: 16,
      team: undefined,
      teamScore: 45, // D?
      /*periodScores: [9, 13, 12, 11],*/
      playerLogs: [],
    }],
  },
  {
    id: gameIds.W3,
    date: new Date("2025-08-10"),
    round: 3,
    teamLogs: [{
      id: teamLogId++,
      teamId: 11,
      team: undefined,
      teamScore: 56,
      /*periodScores: [6, 23, 9, 18], // +1 to 1st*/
      playerLogs: filterHomeGamePlayersByGameId(gameIds.W3).map(parseRawPlayerLog),
    }, {
      id: teamLogId++,
      teamId: 14,
      team: undefined,
      teamScore: 31, // L?
      /*periodScores: [7, 10, 5, 9],*/
      playerLogs: [],
    }],
  },
  {
    id: gameIds.W4,
    date: new Date("2025-08-17"),
    round: 4,
    teamLogs: [{
      id: teamLogId++,
      teamId: 11,
      team: undefined,
      teamScore: 51,
      /*periodScores: [7, 12, 14, 18], // +3 = 51*/
      playerLogs: filterHomeGamePlayersByGameId(gameIds.W4).map(parseRawPlayerLog),
    }, {
      id: teamLogId++,
      teamId: 17,
      team: undefined,
      teamScore: 51,
      /*periodScores: [12, 8, 14, 17], // -1 = 51*/
      playerLogs: [],
    }],
  },
  // W5 = bye
  {
    id: gameIds.W6,
    date: new Date("2025-08-31"),
    round: 6,
    teamLogs: [{
      id: teamLogId++,
      teamId: 11,
      team: undefined,
      teamScore: 44,
      /*periodScores: [0, 0, 0, 0],*/
      playerLogs: filterHomeGamePlayersByGameId(gameIds.W6).map(parseRawPlayerLog),
    }, {
      id: teamLogId++,
      teamId: 13,
      team: undefined,
      teamScore: 0,
      /*periodScores: [0, 0, 0, 0],*/
      playerLogs: [],
    }],
  },
  {
    id: gameIds.W7,
    date: new Date("2025-09-14"),
    round: 7,
    teamLogs: [{
      id: teamLogId++,
      teamId: 11,
      team: undefined,
      teamScore: 50,
      /*periodScores: [0, 0, 0, 0],*/
      playerLogs: filterHomeGamePlayersByGameId(gameIds.W7).map(parseRawPlayerLog),
    }, {
      id: teamLogId++,
      teamId: 12,
      team: undefined,
      teamScore: 0,
      /*periodScores: [0, 0, 0, 0],*/
      playerLogs: [],
    }],
  },
  {
    id: gameIds.W8,
    date: new Date("2025-09-21"),
    round: 8,
    teamLogs: [{
      id: teamLogId++,
      teamId: 11,
      team: undefined,
      teamScore: 55,
      /*periodScores: [0, 0, 0, 0],*/
      playerLogs: filterHomeGamePlayersByGameId(gameIds.W8).map(parseRawPlayerLog),
    }, {
      id: teamLogId++,
      teamId: 15,
      team: undefined,
      teamScore: 0,
      /*periodScores: [0, 0, 0, 0],*/
      playerLogs: [],
    }],
  },
  {
    id: gameIds.W9,
    date: new Date("2025-09-28"),
    round: 9,
    teamLogs: [{
      id: teamLogId++,
      teamId: 11,
      team: undefined,
      teamScore: 52,
      /*periodScores: [12, 17, 12, 11],*/
      playerLogs: filterHomeGamePlayersByGameId(gameIds.W9).map(parseRawPlayerLog),
    }, {
      id: teamLogId++,
      teamId: 16,
      team: undefined,
      teamScore: 47, // L?
      /*periodScores: [6, 15, 17, 9],*/
      playerLogs: [],
    }],
  },
  {
    id: gameIds.W10,
    date: new Date("2025-10-12"),
    round: 10,
    teamLogs: [{
      id: teamLogId++,
      teamId: 11,
      team: undefined,
      teamScore: 71,
      /*periodScores: [0, 0, 0, 0],*/
      playerLogs: filterHomeGamePlayersByGameId(gameIds.W10).map(parseRawPlayerLog),
    }, {
      id: teamLogId++,
      teamId: 14,
      team: undefined,
      teamScore: 0,
      /*periodScores: [0, 0, 0, 0],*/
      playerLogs: [],
    }],
  },
  {
    id: gameIds.W11,
    date: new Date("2025-10-19"),
    round: 11,
    teamLogs: [{
      id: teamLogId++,
      teamId: 11,
      team: undefined,
      teamScore: 51,
      /*periodScores: [0, 0, 0, 0],*/
      playerLogs: filterHomeGamePlayersByGameId(gameIds.W11).map(parseRawPlayerLog),
    }, {
      id: teamLogId++,
      teamId: 13,
      team: undefined,
      teamScore: 0,
      /*periodScores: [0, 0, 0, 0],*/
      playerLogs: [],
    }],
  },
  {
    id: gameIds.W12,
    date: new Date("2025-11-02"),
    round: 12, // semi-finals
    teamLogs: [{
      id: teamLogId++,
      teamId: 11,
      team: undefined,
      teamScore: 47,
      /*periodScores: [19, 5, 6, 17],*/
      playerLogs: filterHomeGamePlayersByGameId(gameIds.W12).map(parseRawPlayerLog),
    }, {
      id: teamLogId++,
      teamId: 17,
      team: undefined,
      teamScore: 55,
      /*periodScores: [12, 18, 10, 15],*/
      playerLogs: [],
    }],
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

/* simplified structure for the purpose of rendering */
export type GameLog = {
  id: number,
  date: Date,
  atHome: boolean,
  ownTeam: Team,
  ownScore: number,
  opposingTeam: Team,
  opposingScore: number,
  totals: Totals,
}

/**
 * Return a game log of the specific player's results.
 * TODO: optimize logic with eventual API handling
 * @param playerId
 */
export function findPlayerGameLogs(playerId: number): Array<GameLog> {
  return mockGames.map((game) => {
    const awayTeamLog = getAwayTeamLog(game);
    const homeTeamLog = getHomeTeamLog(game);

    const awayPlayerLogs = filterPlayerLogByPlayerId(awayTeamLog.playerLogs, playerId);
    const homePlayerLogs = filterPlayerLogByPlayerId(homeTeamLog.playerLogs, playerId);

    /* ref: no rows, so player is in home team */
    const atHome = (homePlayerLogs.length === 1);

    const ownTeam = !atHome
      ? awayTeamLog.team!  /* always expected, todo: fix source */
      : homeTeamLog.team!; /* always expected, todo: fix source */
    const ownScore = !atHome
      ? awayTeamLog.teamScore
      : homeTeamLog.teamScore;

    const opposingTeam = atHome
      ? awayTeamLog.team!  /* always expected, todo: fix source */
      : homeTeamLog.team!; /* always expected, todo: fix source */
    const opposingScore = atHome
      ? awayTeamLog.teamScore
      : homeTeamLog.teamScore;

    const playerLog = [...awayPlayerLogs, ...homePlayerLogs].pop()!

    /* todo: optimize */
    return {
      id: game.id,
      date: game.date,
      atHome: atHome,
      ownTeam: ownTeam,
      ownScore: ownScore,
      opposingTeam: opposingTeam,
      opposingScore: opposingScore,
      totals: {
        points: playerLog.points,
        rebounds: playerLog.rebounds,
        assists: playerLog.assists,
        steals: playerLog.steals,
        blocks: playerLog.blocks,
        personalFouls: playerLog.personalFouls,
        turnovers: playerLog.turnovers,
      }
    };
  });
}
