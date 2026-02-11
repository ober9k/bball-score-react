import express from "express";
import { getTeam, getTeams } from "../controllers/teamController";

export default express.Router()
  .get("/api/teams", getTeams)
  .get("/api/teams/:teamId", getTeam);
