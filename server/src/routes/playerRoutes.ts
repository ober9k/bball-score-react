import express from "express";
import { getPlayers } from "../controllers/playerController";

export default express.Router()
    .get("/api/players", getPlayers);
