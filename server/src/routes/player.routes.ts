import { getPlayer, getPlayers } from "@controllers/player.controller";
import express from "express";

export default express.Router()
  .get("/api/players", getPlayers)
  .get("/api/players/:playerId", getPlayer)
