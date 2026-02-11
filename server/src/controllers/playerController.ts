import { type Request, type Response } from "express";
import { mockPlayers } from "../../../src/data/players";
import { sleep } from "../utils/sleep";

export async function getPlayers(req: Request, res: Response) {
    await sleep(1000);

    res.status(200).json({
      /* referencing mock data for now */
       players: mockPlayers,
    });
}
