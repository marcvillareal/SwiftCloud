const Play = require("../models/plays"); // Make sure to match the filename correctly
const Song = require("../models/song"); // Ensure you have the correct model path

async function getSongOfTheYear(year) {
  const songOfTheYear = await Play.aggregate([
    { $match: { year } }, // Filter plays by the given year
    {
      $group: {
        _id: "$song", // Group by song
        totalPlays: { $sum: "$plays" }, // Sum the plays for each song
      },
    },
    {
      $sort: { totalPlays: -1 }, // Sort by total plays in descending order
    },
    {
      $limit: 1, // Get the song with the most plays
    },
    {
      $lookup: {
        from: "Songs", // Ensure this matches the collection name in your schema
        localField: "_id",
        foreignField: "_id",
        as: "song",
      },
    },
    {
      $unwind: "$song", // Unwind the song array
    },
    {
      $project: {
        _id: 0,
        title: "$song.title",
        artist: "$song.artist",
        album: "$song.album",
        year: "$song.year",
        totalPlays: 1,
      },
    },
  ]);

  return songOfTheYear[0] || null; // Return the song or null if no results
}

module.exports = {
  getSongOfTheYear,
};
