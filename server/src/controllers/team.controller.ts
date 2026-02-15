import { findAll, findByTeamId, findTeamPlayersById, updateByTeamId } from "@services/team.service";
import type { TeamData } from "@types/data/team-data";
import type { Player } from "@types/player";
import type { StatisticsLog } from "@types/statistics-log";
import { sleep } from "@utils/sleep";
import { addFromPlayerLog, calculateAverages, prepareStatisticsLogs } from "@utils/statistics.utils";
import { type Request, type Response } from "express";
import { mockGames } from "../../../src/data/games";
import type { PlayerLog } from "../../../src/types/game/PlayerLog";

export async function getTeams(req: Request, res: Response) {
  await sleep(1000);
  res.status(200).json({
    teams: findAll(),
  });
}

export async function getTeam(req: Request, res: Response) {
  await sleep(1500);
  const teamId = +req.params.teamId;

  res.status(200).json({
    team: findByTeamId(teamId),
  });
}

export async function getTeamPlayers(req: Request, res: Response) {
  await sleep(2000);
  const teamId = +req.params.teamId;

  res.status(200).json({
    team: findByTeamId(teamId),
    teamPlayers: findTeamPlayersById(teamId)
  });
}

export async function updateTeam(req: Request, res: Response) {
  await sleep(1000);
  const teamId = +req.params.teamId;

  res.status(200).json({
    team: updateByTeamId(teamId, req.body as TeamData),
    message: "Successfully updated team with `teamId` provided.",
  });
}

function getStatisticsLogs(teamId: number): Array<StatisticsLog> {
  const playerLogs = mockGames
    .map((game) => [...game.teamLogs])
    .flat()
    .filter((teamLog) => teamLog.teamId === teamId) /* fuck yeah */
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

export async function getTeamStatistics(req: Request, res: Response) {
  await sleep(1000);
  const teamId = +req.params.teamId;

  res.status(200).json({
    team: findByTeamId(teamId),
    teamStatistics: getStatisticsLogs(teamId),
  });
}
