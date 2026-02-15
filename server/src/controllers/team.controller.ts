import { findAll, findByTeamId, findTeamPlayersById, updateByTeamId } from "@services/team.service";
import type { TeamData } from "@types/data/team-data";
import type { Player } from "@types/player";
import type { StatisticsLog } from "@types/statistics-log";
import { sleep } from "@utils/sleep";
import { addFromPlayerLog, buildEmptyStatisticsLog, calculateAverages } from "@utils/statistics.utils";
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

  /* TODO: fix duplication later */
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

export async function getTeamStatistics(req: Request, res: Response) {
  await sleep(1000);
  const teamId = +req.params.teamId;

  res.status(200).json({
    team: findByTeamId(teamId),
    teamStatistics: getStatisticsLogs(teamId),
  });
}
