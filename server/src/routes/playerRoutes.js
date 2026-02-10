const express = require("express");
const {getPlayers} = require("../controllers/playerController");

module.exports = express.Router()
    .get("/api/players", getPlayers);
