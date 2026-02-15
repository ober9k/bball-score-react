import type { StatisticsLog } from "@types/statistics-log";
import { calculateStatisticsFromPlayerLogs } from "@utils/statistics.utils";
import { mockGames } from "../../../src/data/games";

export function findStatisticsLogs(): Array<StatisticsLog> {
  const playerLogs = mockGames
    .map((game) => [...game.teamLogs])
    .flat()
    .map((teamLog) => [...teamLog.playerLogs])
    .flat();

  return calculateStatisticsFromPlayerLogs(playerLogs);
}
