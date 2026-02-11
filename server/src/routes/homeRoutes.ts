import express from "express";
import { getHome } from "../controllers/homeController";

export default express.Router()
  .get("/api/home", getHome);
