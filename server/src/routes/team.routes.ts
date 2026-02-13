import express from "express";
import { getTeam, getTeamPlayers, getTeams, updateTeam } from "@controllers/team.controller";

export default express.Router()
  .get("/api/teams", getTeams)
  .get("/api/teams/:teamId", getTeam)
  .get("/api/teams/:teamId/players", getTeamPlayers)
  .put("/api/teams/:teamId", updateTeam); /* TODO: potentially prefix to manager */
