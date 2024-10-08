const mongoose = require("mongoose");

const songSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    artist: { type: String, required: true },
    writers: [{ type: String, required: true }],
    album: { type: String, required: false },
    year: { type: Number, required: true },
  },
  { collection: "Songs" }
); 

module.exports = mongoose.model("Song", songSchema);
