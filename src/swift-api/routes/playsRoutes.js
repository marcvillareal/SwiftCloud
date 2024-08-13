const express = require("express");
const router = express.Router();
const playsController = require("../controllers/playsController");

// Plays Routes
router.get("/song-of-the-year/:year", playsController.getSongOfTheYear);

module.exports = router;
