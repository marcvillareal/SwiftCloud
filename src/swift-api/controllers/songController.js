const songService = require('../services/songService');

const searchSongs = async (req, res) => {
    try {
      const songs = await songService.searchSongs(req.query.q);
      res.status(200).json(songs);
    } catch (error) {
      res.status(500).json({ error: 'Failed to search songs' });
    }
  };

  module.exports = {
    searchSongs
  };