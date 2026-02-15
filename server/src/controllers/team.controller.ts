import { findAll, findByTeamId, findTeamPlayersById, findTeamStatisticsLogsById, updateByTeamId } from "@services/team.service";
import type { TeamData } from "@types/data/team-data";
import type { StatisticsLog } from "@types/statistics-log";
import { sleep } from "@utils/sleep";
import { calculateStatisticsFromPlayerLogs } from "@utils/statistics.utils";
import { type Request, type Response } from "express";
import { mockGames } from "../../../src/data/games";

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

export async function getTeamStatistics(req: Request, res: Response) {
  await sleep(1000);
  const teamId = +req.params.teamId;

  res.status(200).json({
    team: findByTeamId(teamId),
    teamStatisticsLogs: findTeamStatisticsLogsById(teamId),
  });
}
