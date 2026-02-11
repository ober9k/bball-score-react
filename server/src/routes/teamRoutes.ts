import express from "express";
import { getTeams } from "../controllers/teamController";

export default express.Router()
  .get("/api/teams", getTeams);
