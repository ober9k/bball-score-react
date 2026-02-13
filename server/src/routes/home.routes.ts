import express from "express";
import { getHome } from "@controllers/home.controller";

export default express.Router()
  .get("/api/home", getHome);
