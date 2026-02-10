const express = require("express");
const {getTeams} = require("../controllers/teamController");

module.exports = express.Router()
    .get("/api/teams", getTeams);
