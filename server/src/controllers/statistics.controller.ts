import type { StatisticsLog } from "@types/statistics-log";
import { sleep } from "@utils/sleep";
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

  let statisticsRow = 1;
  const statisticsLogs: Array<StatisticsLog> = [];

  function getRow(player: Player): StatisticsLog | undefined {
    return statisticsLogs.find((playerLog) => playerLog.playerId === player.id);
  }

  function hasRow(player: Player): boolean {
    return getRow(player) !== undefined;
  }

  function createForPlayer(player: Player): StatisticsLog {
    return {
      id: statisticsRow++,
      playerId: player.id,
      player: player,
      played: 0,
      totals: {
        points: 0,
        rebounds: 0,
        assists: 0,
        steals: 0,
        blocks: 0,
        personalFouls: 0,
        turnovers: 0,
      },
    };
  }

  function updateForPlayer(playerLog: PlayerLog): void {
    // todo: refactor to something nicer
    if (!hasRow(playerLog.player!)) {
      statisticsLogs.push(
        createForPlayer(playerLog.player!)
      );
    }

    // todo: refactor to something nicer
    const playerRow = getRow(playerLog.player!)!;

    playerRow.played += playerLog.played ? 1 : 0;
    playerRow.totals.points += playerLog.points;
    playerRow.totals.rebounds += playerLog.rebounds;
    playerRow.totals.assists += playerLog.assists;
    playerRow.totals.steals += playerLog.steals;
    playerRow.totals.blocks += playerLog.blocks;
    playerRow.totals.personalFouls += playerLog.personalFouls;
    playerRow.totals.turnovers += playerLog.turnovers;
  }

  playerLogs.forEach((playerLog) => {
    updateForPlayer(playerLog);
  });

  statisticsLogs.forEach((statisticsLog) => {
    statisticsLog.totals.points /= statisticsLog.played;
    statisticsLog.totals.rebounds /= statisticsLog.played;
    statisticsLog.totals.assists /= statisticsLog.played;
    statisticsLog.totals.steals /= statisticsLog.played;
    statisticsLog.totals.blocks /= statisticsLog.played;
    statisticsLog.totals.personalFouls /= statisticsLog.played;
    statisticsLog.totals.turnovers /= statisticsLog.played;
  });

  return statisticsLogs;
}

export async function getStatistics(req: Request, res: Response) {
  await sleep(1000);

  res.status(200).json({
    statisticsLogs: getStatisticsLogs(),
  });
}
