import { type Request, type Response } from "express";
import { mockTeams, tempFindTeamById } from "../../../src/data/teams";
import { sleep } from "../utils/sleep";

export async function getTeams(req: Request, res: Response) {
  await sleep(1000);

  res.status(200).json({
  /* referencing mock data for now */
  teams: mockTeams,
  });
}

export async function getTeam(req: Request, res: Response) {
  await sleep(1500);

  const teamId = +req.params.teamId;
  const team   = tempFindTeamById(teamId);

  if (team === undefined) {
    res.status(404).json("Unable to find team with `teamId` provided.");
    return;
  }

  res.status(200).json({
    team
  });
}

