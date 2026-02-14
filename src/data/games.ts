import type { Game } from "../types/Game.ts";
import type { PlayerLog } from "../types/game/PlayerLog.ts";
import type { TeamLog } from "../types/game/TeamLog.ts";
import type { Totals } from "../types/stats/Totals.ts";
import type { Team } from "../types/Team.ts";
import { filterPlayerLogByPlayerId, getAwayTeamLog, getHomeTeamLog } from "../utilities/GameUtils.ts";
import { findPlayerById } from "./players.ts";
import { findTeamById } from "./teams.ts";

let playerLogId = 1;

let gameId = 1;
let teamLogId = 1;

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

function mockPlayer(playerId: number, played: boolean, points: number, rebounds: number, assists: number, steals: number, blocks: number, turnovers: number, personalFouls: number) {
  return { id: playerLogId++, playerId, played, points, rebounds, assists, steals, blocks, turnovers, personalFouls } as PlayerLog;
}

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
      playerLogs: [],
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
      playerLogs: [],
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
      teamId: 12,
      team: undefined,
      teamScore: 56,
      /*periodScores: [6, 23, 9, 18], // +1 to 1st*/
      playerLogs: [],
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
      playerLogs: [],
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
      playerLogs: [],
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
      playerLogs: [],
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
      playerLogs: [],
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
      playerLogs: [],
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
      playerLogs: [],
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
      playerLogs: [],
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
      playerLogs: [],
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
