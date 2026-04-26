const mongoose = require("mongoose");

const historySchema = new mongoose.Schema({
  userId: String,
  input: Object,
  results: Array,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("History", historySchema);
