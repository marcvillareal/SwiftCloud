const express = require("express");
const fs = require("fs");
const path = require("path");
const csv = require("csv-parser");
const Song = require("../models/song");
const Play = require("../models/plays");

const router = express.Router();

router.get("/import", async (req, res) => {
  const results = [];
  const filePath = path.join(__dirname, "../data/swift_data.csv");

  fs.createReadStream(filePath)
    .pipe(csv())
    .on("data", (data) => results.push(data))
    .on("end", async () => {
      try {
        for (const row of results) {
          // Validate row data before processing
          if (!row.Song || !row.Artist || !row.Writer || !row.Year) {
            console.warn("Skipping invalid row:", row);
            continue; // Skip invalid rows
          }

          // Create the song document
          const song = new Song({
            title: row.Song,
            artist: row.Artist,
            writers: row.Writer.split("\n").map((writer) =>
              writer.trim().replace(/\"/g, "")
            ),
            album: row.Album === "None" ? null : row.Album,
            year: parseInt(row.Year, 10),
          });

          const savedSong = await song.save();

          // Create play documents
          const playMonths = ["June", "July", "August"];
          for (const month of playMonths) {
            const playCount = parseInt(row[`Plays - ${month}`], 10);
            if (playCount) {
              const play = new Play({
                song: savedSong._id,
                month: month,
                plays: playCount,
                year: savedSong.year,
              });
              await play.save();
            }
          }
        }
        res.send("Data imported successfully");
      } catch (error) {
        console.error("Error importing data:", error);
        res.status(500).send("An error occurred");
      }
    })
    .on("error", (error) => {
      console.error("Error reading CSV file:", error);
      res.status(500).send("Error reading CSV file");
    });
});

module.exports = router;
