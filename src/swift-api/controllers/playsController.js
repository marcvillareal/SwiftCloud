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

module.exports = {
  getSongOfTheYear,
  getSongOfTheMonth,
};
