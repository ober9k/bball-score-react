import { type Request, type Response } from "express";
import { mockPlayers, tempFindPlayerById } from "../../../src/data/players";
import { findTeamByPlayerId } from "../../../src/data/teamPlayers";
import { sleep } from "../utils/sleep";

export async function getPlayers(req: Request, res: Response) {
  await sleep(1000);

  res.status(200).json({
    /* referencing mock data for now */
     players: mockPlayers,
  });
}

export async function getPlayer(req: Request, res: Response) {
  await sleep(1500);

  const playerId = +req.params.playerId;
  const player   = tempFindPlayerById(playerId);

  if (player === undefined) {
    res.status(404).json("Unable to find team with `playerId` provided.");
    return;
  }

  res.status(200).json({
    player
  });
}

export async function getPlayerTeam(req: Request, res: Response) {
  await sleep(1500);

  const playerId = +req.params.playerId;
  const player   = tempFindPlayerById(playerId);

  if (player === undefined) {
    res.status(404).json("Unable to find team with `playerId` provided.");
    return;
  }

  res.status(200).json({
    team: findTeamByPlayerId(playerId)
  });
}
