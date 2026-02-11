import { type Request, type Response } from "express";
import { sleep } from "../utils/sleep";

export async function getTeams(req: Request, res: Response) {
    await sleep(1000);

    res.status(200).json({
        teams: [],
    });
}
