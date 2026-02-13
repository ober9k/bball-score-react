import type HttpException from "@models/http-exception.model";
import { isHttpException } from "@models/http-exception.model";
import homeRoutes from "@routes/home.routes";
import playerRoutes from "@routes/player.routes";
import standingsRoutes from "@routes/standings.routes";
import statisticsRoutes from "@routes/statistics.routes";
import teamRoutes from "@routes/team.routes";
import cors from "cors";
import express, { type NextFunction, type Request, type Response } from "express";


const app = express();

app.use(cors({
  origin: ["http://localhost:5173"] // todo: update to env
}));

app.use(express.json());

app.use(homeRoutes);
app.use(playerRoutes);
app.use(standingsRoutes);
app.use(statisticsRoutes);
app.use(teamRoutes);

app.use((
  err: Error | HttpException,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (isHttpException(err)) {
    // work with the custom handler
    switch (err.errorCode) {
      case 404:
        res.status(404).json(err.message);
        return;
      default:
        res.status(500).json(err.message);
    }
    return;
  }

  // default fall back handling
  res.status(500).json(err.message);
});

export default app;
