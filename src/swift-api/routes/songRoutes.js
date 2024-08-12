const express = require("express");
const router = express.Router();
const Song = require("../models/song");
const songController = require("../controllers/songController");

router.get("/search/songs", songController.searchSongs);

module.exports = router;
