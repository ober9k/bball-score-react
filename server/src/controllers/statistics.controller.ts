import type { StatisticsLog } from "@types/statistics-log";
import { sleep } from "@utils/sleep";
import { addFromPlayerLog, buildEmptyStatisticsLog, calculateAverages } from "@utils/statistics.utils";
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

  const statisticsLogs: Array<StatisticsLog> = [];

  function getRow(player: Player): StatisticsLog | undefined {
    return statisticsLogs.find((playerLog) => playerLog.playerId === player.id);
  }

  function hasRow(player: Player): boolean {
    return getRow(player) !== undefined;
  }

  function updateForPlayer(playerLog: PlayerLog): void {
    // TODO: refactor to something nicer
    if (!hasRow(playerLog.player!)) {
      statisticsLogs.push(
        buildEmptyStatisticsLog(playerLog.player!)
      );
    }

    // TODO: refactor to something nicer
    // TODO: player will eventually always exist
    addFromPlayerLog(getRow(playerLog.player!)!, playerLog);
  }

  playerLogs.forEach((playerLog) => {
    updateForPlayer(playerLog);
  });

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
