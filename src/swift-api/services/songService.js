const Song = require("../models/song");

// Search Songs

const searchSongs = async (query) => {
  return await Song.find({ title: new RegExp(query, "i") }); // Searches song via title
};

// Filter Songs

const filterSongs = async (filters) => {
  const query = {};

  // Add filters to the query if they are provided
  if (filters.title) {
    query.title = new RegExp(filters.title, "i"); // Case-insensitive regex search
  }

  if (filters.album) {
    query.album = new RegExp(filters.album, "i"); // Case-insensitive regex search
  }

  if (filters.year) {
    query.year = parseInt(filters.year, 10); // Ensure year is a number
  }

  // Execute the query to find matching songs
  const songs = await Song.find(query);
  return songs;
};

module.exports = {
  searchSongs,
  filterSongs,
};
