import express, { type Request, type Response } from "express";
import cors from "cors";
import { sleep } from "./utils/sleep";
import playerRoutes from "./routes/playerRoutes";
import teamRoutes from "./routes/teamRoutes";

const app = express();

app.use(cors({
  origin: ["http://localhost:5173"] // todo: update to env
}));

app.get("/api", async (req: Request, res: Response) => {
  await sleep(1000);
  res.json({
    home: "helloWorld",
  });
});

app.use(playerRoutes);
app.use(teamRoutes);

export default app;
