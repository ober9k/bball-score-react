import { getStatistics } from "@controllers/statistics.controller";
import express from "express";

export default express.Router()
  .get("/api/statistics", getStatistics);
