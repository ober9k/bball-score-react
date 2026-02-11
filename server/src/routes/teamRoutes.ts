import express from "express";
import { getTeam, getTeamPlayers, getTeams } from "../controllers/teamController";

export default express.Router()
  .get("/api/teams", getTeams)
  .get("/api/teams/:teamId", getTeam)
  .get("/api/teams/:teamId/players", getTeamPlayers);
