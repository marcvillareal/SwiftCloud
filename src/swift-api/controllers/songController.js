const songService = require("../services/songService");

const searchSongs = async (req, res) => {
  try {
    const songs = await songService.searchSongs(req.query.q);
    res.status(200).json(songs);
  } catch (error) {
    res.status(500).json({ error: "Failed to search songs" });
  }
};

const filterSongs = async (req, res) => {
  try {
    const filters = req.query; // Get filters from query parameters
    const songs = await songService.filterSongs(filters);

    if (songs.length === 0) {
      return res
        .status(404)
        .json({ message: "No songs found matching the criteria." });
    }

    res.status(200).json(songs);
  } catch (error) {
    console.error("Error filtering songs:", error);
    res
      .status(500)
      .json({ message: "An error occurred while filtering songs." });
  }
};

module.exports = {
  searchSongs,
  filterSongs,
};
