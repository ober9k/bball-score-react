import express from "express";
import { getTeam, getTeamPlayers, getTeams, getTeamStatistics, updateTeam } from "@controllers/team.controller";

export default express.Router()
  .get("/api/teams", getTeams)
  .get("/api/teams/:teamId", getTeam)
  .get("/api/teams/:teamId/players", getTeamPlayers)
  .get("/api/teams/:teamId/statistics", getTeamStatistics)
  .put("/api/teams/:teamId", updateTeam); /* TODO: potentially prefix to manager */
