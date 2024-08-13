const Play = require("../models/plays");

// Song of the Year

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

// Song of the Month
async function getSongOfTheMonth(year, month) {
  const songOfTheMonth = await Play.aggregate([
    { $match: { year, month } }, // Filter plays by the given year and month
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
        from: "Songs", // Connects to database collection "Songs"
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

  return songOfTheMonth[0] || null; // Return the song or null if no results
}

// Best Song of All Time

async function getSongOfAllTime() {
  const SongOfAllTime = await Play.aggregate([
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
        from: "Songs", // Join with the songs collection to get song details
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

  return SongOfAllTime[0] || null; // Return the song or null if no results
}

module.exports = {
  getSongOfTheYear,
  getSongOfTheMonth,
  getSongOfAllTime,
};
