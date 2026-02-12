import homeRoutes from "@routes/homeRoutes";
import playerRoutes from "@routes/playerRoutes";
import standingsRoutes from "@routes/standingsRoutes";
import teamRoutes from "@routes/teamRoutes";
import cors from "cors";
import express from "express";

const app = express();

app.use(cors({
  origin: ["http://localhost:5173"] // todo: update to env
}));

app.use(express.json());

app.use(homeRoutes);
app.use(playerRoutes);
app.use(standingsRoutes);
app.use(teamRoutes);

export default app;
