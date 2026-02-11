import express from "express";
import { getPlayer, getPlayers } from "../controllers/playerController";

export default express.Router()
  .get("/api/players", getPlayers)
  .get("/api/players/:playerId", getPlayer);
