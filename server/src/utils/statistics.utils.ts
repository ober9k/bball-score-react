import type { Player } from "@types/player";
import type { StatisticsLog } from "@types/statistics-log";
import type { Totals } from "@types/stats/totals";
import type { PlayerLog } from "../../../src/types/game/PlayerLog";

export function getTotalsKeys(totals: Totals): Array<string> {
  return Object.getOwnPropertyNames(totals);
}

/**
 * Prepare a set of statistics logs for the distinct player list.
 * @param playerLogs
 */
export function prepareStatisticsLogs(playerLogs: Array<PlayerLog>): Array<StatisticsLog> {
  /**
   * Filter to just a distinct set of players.
   */
  const distinctPlayers = playerLogs
    .map(({ playerId, player }) => ({ playerId, player }))
    .filter(({ playerId }, index, self) => {
      return (index === self.findIndex(({ playerId: id }) => id === playerId));
    });

  /**
   * Create initial dataset for statistics.
   */
  return distinctPlayers
    .map(({ player }) => buildEmptyStatisticsLog(player!));
}

export function buildEmptyStatisticsLog(player: Player): StatisticsLog {
  return {
    id: player.id,
    playerId: player.id,
    player: player,
    played: 0,
    totals: buildEmptyTotals(),
  };
}

export function buildEmptyTotals(): Totals {
  return {
    points: 0,
    rebounds: 0,
    assists: 0,
    steals: 0,
    blocks: 0,
    personalFouls: 0,
    turnovers: 0,
  };
}

export function addFromPlayerLog(statisticsLog: StatisticsLog, playerLog: PlayerLog): void {
  statisticsLog.played += playerLog.played ? 1 : 0;

  getTotalsKeys(statisticsLog.totals).forEach((key) => {
    statisticsLog.totals[key] += playerLog[key];
  });
}

/**
 * Calculate averages from totals based on games played.
 * @param statisticsLog
 */
export function calculateAverages(statisticsLog: StatisticsLog): void {
  getTotalsKeys(statisticsLog.totals).forEach((key) => {
    statisticsLog.totals[key] /= statisticsLog.played;
  });
}
