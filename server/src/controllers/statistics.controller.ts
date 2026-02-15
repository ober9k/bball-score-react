import { findStatisticsLogs } from "@services/statistics.service";
import { sleep } from "@utils/sleep";
import type { Request, Response } from "express";

export async function getStatistics(req: Request, res: Response) {
  await sleep(1000);

  res.status(200).json({
    statisticsLogs: findStatisticsLogs(),
  });
}
