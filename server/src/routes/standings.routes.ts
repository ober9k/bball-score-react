import { getStandings } from "@controllers/standings.controller";
import express from "express";

export default express.Router()
  .get("/api/standings", getStandings);
