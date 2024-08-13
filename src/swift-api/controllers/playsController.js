const playService = require("../services/playService");

// Song of the Year

async function getSongOfTheYear(req, res) {
  const year = parseInt(req.params.year);

  if (isNaN(year)) {
    return res.status(400).json({ message: "Invalid year" });
  }

  try {
    const songOfTheYear = await playService.getSongOfTheYear(year);
    if (songOfTheYear) {
      return res.status(200).json(songOfTheYear);
    } else {
      return res
        .status(404)
        .json({ message: "No song data found for the given year" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

// Song of the Month

async function getSongOfTheMonth(req, res) {
  const year = parseInt(req.params.year);
  const month = req.params.month;

  // Basic validation for year and month
  if (isNaN(year) || !month) {
    return res.status(400).json({ message: "Invalid year or month" });
  }

  try {
    const songOfTheMonth = await playService.getSongOfTheMonth(year, month);
    if (songOfTheMonth) {
      return res.status(200).json(songOfTheMonth);
    } else {
      return res
        .status(404)
        .json({ message: "No song data found for the given month and year" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

// Best Song of All Time

async function getSongOfAllTime(req, res) {
  try {
    const bestSong = await playService.getSongOfAllTime();
    if (bestSong) {
      return res.status(200).json(bestSong);
    } else {
      return res.status(404).json({ message: "No song data found" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

// Top 5 Songs of the Year

async function getTop5SongsOfTheYear(req, res) {
  const year = parseInt(req.params.year);

  if (isNaN(year)) {
    return res.status(400).json({ message: "Invalid year" });
  }

  try {
    const top5Songs = await playService.getTop5SongsOfTheYear(year);
    if (top5Songs && top5Songs.length > 0) {
      return res.status(200).json(top5Songs);
    } else {
      return res
        .status(404)
        .json({ message: "No song data found for the given year" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

// Top Writer of the Year

async function getTopWriterOfTheYear(req, res) {
  const year = parseInt(req.params.year);

  if (isNaN(year)) {
    return res.status(400).json({ message: "Invalid year" });
  }

  try {
    const topWriter = await playService.getTopWriterOfTheYear(year);
    if (topWriter) {
      return res.status(200).json(topWriter);
    } else {
      return res
        .status(404)
        .json({ message: "No writer data found for the given year" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

module.exports = {
  getSongOfTheYear,
  getSongOfTheMonth,
  getSongOfAllTime,
  getTop5SongsOfTheYear,
  getTopWriterOfTheYear,
};
