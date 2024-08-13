const Play = require("../models/plays");
const Song = require("../models/song");

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

// Top 5 Songs of the Year

async function getTop5SongsOfTheYear(year) {
  const top5SongsOfTheYear = await Play.aggregate([
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
      $limit: 15, // Limit to top 5 songs
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

  return top5SongsOfTheYear; // Return the array of top 5 songs
}

// Top Song Writer of the Year

async function getTopWriterOfTheYear(year) {
  try {
    const topWriterOfTheYear = await Song.aggregate([
      // Match songs by the given year
      { $match: { year } },

      // Unwind the writers array so each writer is treated as a separate document
      { $unwind: "$writers" },

      // Exclude "Taylor Swift" from the results
      { $match: { writers: { $ne: "Taylor Swift" } } },

      // Group by writer and count the number of songs they have written
      {
        $group: {
          _id: "$writers", // Group by writer
          songCount: { $sum: 1 }, // Count the number of songs
        },
      },

      // Sort by the number of songs in descending order
      { $sort: { songCount: -1 } },

      // Limit to the top writer
      { $limit: 1 },

      // Optional: Project the result to rename fields
      {
        $project: {
          _id: 0,
          writer: "$_id", // Field name for writer
          songCount: 1, // Field name for number of songs
        },
      },
    ]);

    // Return the top writer or null if no results
    return topWriterOfTheYear[0] || null;
  } catch (error) {
    console.error("Error in getTopWriterOfTheYear:", error.message);
    throw error;
  }
}

// Most Featured Artist

async function getMostFeaturedArtist(year) {
  try {
    const mostFeaturedArtist = await Song.aggregate([
      // Match songs by the given year and exclude Taylor Swift
      { $match: { year: year, artist: { $ne: "Taylor Swift" } } },

      // Group by artist and count the number of songs they are featured in
      {
        $group: {
          _id: "$artist", // Group by artist
          songCount: { $sum: 1 }, // Count the number of songs
        },
      },

      // Sort by the number of songs in descending order
      { $sort: { songCount: -1 } },

      // Limit to the top artist
      { $limit: 1 },

      // Optional: Project the result to rename fields
      {
        $project: {
          _id: 0,
          artist: "$_id", // Field name for artist
          songCount: 1, // Field name for number of songs
        },
      },
    ]);

    // Return the most featured artist or null if no results
    return mostFeaturedArtist[0] || null;
  } catch (error) {
    console.error("Error in getMostFeaturedArtist:", error.message);
    throw error;
  }
}

module.exports = {
  getSongOfTheYear,
  getSongOfTheMonth,
  getSongOfAllTime,
  getTop5SongsOfTheYear,
  getTopWriterOfTheYear,
  getMostFeaturedArtist,
};
