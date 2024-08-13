const playService = require("../services/playService");

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
      return res.status(404).json({ message: "No song data found for the given year" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

module.exports = {
  getSongOfTheYear,
};
