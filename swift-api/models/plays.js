const mongoose = require('mongoose');

const playSchema = new mongoose.Schema({
  song: { type: mongoose.Schema.Types.ObjectId, ref: 'Song', required: true },
  month: { type: String, required: true },
  year: { type: Number, required: true },
  plays: { type: Number, default: 0 }
});

module.exports = mongoose.model('Play', playSchema);
