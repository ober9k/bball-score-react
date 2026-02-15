import type { StatisticsLog } from "@types/statistics-log";
import { sleep } from "@utils/sleep";
import { addFromPlayerLog, calculateAverages, prepareStatisticsLogs } from "@utils/statistics.utils";
import type { Request, Response } from "express";
import { mockGames } from "../../../src/data/games";
import type { PlayerLog } from "../../../src/types/game/PlayerLog";
import type { Player } from "../../../src/types/Player";

function getStatisticsLogs(): Array<StatisticsLog> {
  const playerLogs = mockGames
    .map((game) => [...game.teamLogs])
    .flat()
    .map((teamLog) => [...teamLog.playerLogs])
    .flat();

  /**
   * Create initial dataset for statistics.
   */
  const statisticsLogs = prepareStatisticsLogs(playerLogs);

  function getRow(player: Player): StatisticsLog {
    return statisticsLogs.find((playerLog) => playerLog.playerId === player.id);
  }

  function updateForPlayer(playerLog: PlayerLog): void {
    addFromPlayerLog(getRow(playerLog.player!), playerLog);
  }

  /* calculate individual stats for players */
  playerLogs.forEach(updateForPlayer);

  /* potential separate flag/data for totals/averages */
  statisticsLogs.forEach(calculateAverages);

  return statisticsLogs;
}

export async function getStatistics(req: Request, res: Response) {
  await sleep(1000);

  res.status(200).json({
    statisticsLogs: getStatisticsLogs(),
  });
}
