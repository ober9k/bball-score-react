import { findAll, findByTeamId, findTeamPlayersById, updateByTeamId } from "@services/team.service";
import type { TeamData } from "@types/data/team-data";
import type { Player } from "@types/player";
import type { StatisticsLog } from "@types/statistics-log";
import { sleep } from "@utils/sleep";
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

export async function getTeamStatistics(req: Request, res: Response) {
  await sleep(1000);
  const teamId = +req.params.teamId;

  res.status(200).json({
    team: findByTeamId(teamId),
    teamStatistics: getStatisticsLogs(teamId),
  });
}
