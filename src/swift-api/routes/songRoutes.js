const express = require('express');
const router = express.Router();
const Song = require('../models/song');

// Search songs by title, artist, or album
router.get('/search', async (req, res) => {
  const { query } = req.query;
  try {
    const songs = await Song.find({
      $or: [
        { title: { $regex: query, $options: 'i' } },
        { artist: { $regex: query, $options: 'i' } },
        { album: { $regex: query, $options: 'i' } },
      ],
    });
    res.status(200).json(songs);
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while searching for songs' });
  }
});

module.exports = router;
