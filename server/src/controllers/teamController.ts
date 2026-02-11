import { type Request, type Response } from "express";
import { findPlayersByTeamId } from "../../../src/data/teamPlayers";
import { mockTeams, tempFindTeamById } from "../../../src/data/teams";
import { sleep } from "@utils/sleep";

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

export async function getTeamPlayers(req: Request, res: Response) {
  await sleep(2000);

  const teamId = +req.params.teamId;
  const team   = tempFindTeamById(teamId);

  if (team === undefined) {
    res.status(404).json("Unable to find team with `teamId` provided.");
    return;
  }

  res.status(200).json({
    teamPlayers: findPlayersByTeamId(teamId)
  });
}

export async function updateTeam(req: Request, res: Response) {
  const teamData = req.body;
  delete teamData.id; /* to be stripped later */

  const teamId = +req.params.teamId;
  const team = tempFindTeamById(teamId);

  if (team === undefined) {
    res.status(404).json("Unable to find team with `teamId` provided.");
    return;
  }

  // TODO: tidy up the update handling
  team.name = teamData.name;
  team.teamStyle = {
    bgColor: teamData.teamStyle.bgColor,
    textColor: teamData.teamStyle.textColor,
  };

  res.status(200).json({
    team,
    message: "Team with `teamId` provided successfully updated.",
  });
}
