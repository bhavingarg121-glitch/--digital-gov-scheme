const mongoose = require("mongoose");

const schemeSchema = new mongoose.Schema({
  name: String,
  description: String,
  link: String,

  eligibility: {
    minAge: Number,
    maxAge: Number,
    incomeLimit: Number,
    occupation: String,
    gender: String,
    state: String
  }
});

module.exports = mongoose.model("Scheme", schemeSchema);
