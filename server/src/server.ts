import cors from "cors";
import express from "express";
import homeRoutes from "./routes/homeRoutes";
import playerRoutes from "./routes/playerRoutes";
import teamRoutes from "./routes/teamRoutes";

const app = express();

app.use(cors({
  origin: ["http://localhost:5173"] // todo: update to env
}));

app.use(homeRoutes);
app.use(playerRoutes);
app.use(teamRoutes);

export default app;
