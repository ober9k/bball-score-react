import { findAll, findByPlayerId, findTeamByPlayerId } from "@services/player.service";
import { sleep } from "@utils/sleep";
import { type Request, type Response } from "express";

export async function getPlayers(req: Request, res: Response) {
  await sleep(1000);

  res.status(200).json({
    players: findAll(),
  });
}

export async function getPlayer(req: Request, res: Response) {
  await sleep(1500);
  const playerId = +req.params.playerId;

  res.status(200).json({
    player: findByPlayerId(playerId),
    team: findTeamByPlayerId(playerId),
  });
}
