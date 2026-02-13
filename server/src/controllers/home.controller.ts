import { type Request, type Response } from "express";
import { sleep } from "@utils/sleep";

export async function getHome(req: Request, res: Response) {
  await sleep(1000);

  res.status(200).json({
    home: "Hello World!",
  });
}
