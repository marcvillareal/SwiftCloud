const express = require("express");
const router = express.Router();
const songController = require("../controllers/songController");

// Song Routes 
router.get("/search/songs", songController.searchSongs);
router.get('/filter/songs', songController.filterSongs);

module.exports = router;
