import { getStandings } from "@controllers/standingsController";
import express from "express";

export default express.Router()
  .get("/api/standings", getStandings);
