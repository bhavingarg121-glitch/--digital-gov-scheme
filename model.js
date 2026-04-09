const mongoose = require("mongoose");

const schemeSchema = new mongoose.Schema({
  name: String,
  description: String,
  category: String,
  state: String,
  link: String
});

module.exports = mongoose.model("Scheme", schemeSchema);
