const Song = require("../models/song");

const searchSongs = async (query) => {
  return await Song.find({ title: new RegExp(query, "i") }); // Searches song via title
};

module.exports = {
  searchSongs
};
