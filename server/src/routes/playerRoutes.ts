import express from "express";
import { getPlayer, getPlayers, getPlayerTeam } from "../controllers/playerController";

export default express.Router()
  .get("/api/players", getPlayers)
  .get("/api/players/:playerId", getPlayer)
  .get("/api/players/:playerId/team", getPlayerTeam);
