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
      points: 0,
      rebounds: 0,
      assists: 0,
      steals: 0,
      blocks: 0,
      personalFouls: 0,
      turnovers: 0,
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
    playerRow.points += playerLog.points;
    playerRow.rebounds += playerLog.rebounds;
    playerRow.assists += playerLog.assists;
    playerRow.steals += playerLog.steals;
    playerRow.blocks += playerLog.blocks;
    playerRow.personalFouls += playerLog.personalFouls;
    playerRow.turnovers += playerLog.turnovers;
  }

  playerLogs.forEach((playerLog) => {
    updateForPlayer(playerLog);
  });

  statisticsLogs.forEach((statisticsLog) => {
    statisticsLog.points /= statisticsLog.played;
    statisticsLog.rebounds /= statisticsLog.played;
    statisticsLog.assists /= statisticsLog.played;
    statisticsLog.steals /= statisticsLog.played;
    statisticsLog.blocks /= statisticsLog.played;
    statisticsLog.personalFouls /= statisticsLog.played;
    statisticsLog.turnovers /= statisticsLog.played;
  });

  return statisticsLogs;
}

export async function getStatistics(req: Request, res: Response) {
  await sleep(1000);

  res.status(200).json({
    statisticsLogs: getStatisticsLogs(),
  });
}
