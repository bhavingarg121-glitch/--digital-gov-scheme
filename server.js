const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/schemesDB")
.then(()=>console.log("MongoDB Connected"))
.catch(err=>console.log(err));

// Schema
const schemeSchema = new mongoose.Schema({
  name: String,
  description: String,
  category: String,
  state: String,
  link: String,
  eligibility: {
    minAge: Number,
    maxAge: Number,
    incomeLimit: Number,
    gender: String,
    occupation: String,
    stateSpecific: String
  }
});

const Scheme = mongoose.model("Scheme", schemeSchema);

// 🔍 FIND SCHEMES (OPTIMIZED)
app.post("/api/findSchemes", async (req, res) => {
  const { age, income, gender, occupation, state } = req.body;

  try {
    const schemes = await Scheme.find({
      $and: [
        { $or: [{ "eligibility.minAge": { $exists: false } }, { "eligibility.minAge": { $lte: age } }] },
        { $or: [{ "eligibility.maxAge": { $exists: false } }, { "eligibility.maxAge": { $gte: age } }] },
        { $or: [{ "eligibility.incomeLimit": { $exists: false } }, { "eligibility.incomeLimit": { $gte: income } }] },
        { $or: [{ "eligibility.gender": "any" }, { "eligibility.gender": gender }] },
        { $or: [{ "eligibility.occupation": occupation }, { "eligibility.occupation": "any" }] },
        { $or: [{ "eligibility.stateSpecific": "All" }, { "eligibility.stateSpecific": state }] }
      ]
    });

    // 🤖 AI SCORING
    const scored = schemes.map(s => {
      let score = 0;

      if (s.eligibility?.occupation === occupation) score += 4;
      if (s.eligibility?.stateSpecific === state) score += 3;
      if (income <= (s.eligibility?.incomeLimit || Infinity)) score += 2;
      if (s.eligibility?.gender === gender) score += 1;

      return { ...s._doc, score };
    });

    // sort by score
    scored.sort((a, b) => b.score - a.score);

    res.json(scored);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
