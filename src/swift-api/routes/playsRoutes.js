const express = require("express");
const router = express.Router();
const playsController = require("../controllers/playsController");

// Plays Routes
router.get("/song-of-the-year/:year", playsController.getSongOfTheYear);
router.get("/song-of-the-month/:year/:month", playsController.getSongOfTheMonth);
router.get("/song-of-all-time", playsController.getSongOfAllTime);

module.exports = router;
