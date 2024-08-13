const express = require("express");
const router = express.Router();
const Song = require("../models/song");
const songController = require("../controllers/songController");

// Routes 
router.get("/search/songs", songController.searchSongs);
router.get('/filter/songs', songController.filterSongs);

module.exports = router;
