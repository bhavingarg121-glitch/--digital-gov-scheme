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

/* ================= MODELS ================= */

const userSchema = new mongoose.Schema({
  name: String,
  history: [
    {
      occupation: String,
      income: Number,
      state: String,
      date: { type: Date, default: Date.now }
    }
  ]
});
const User = mongoose.model("User", userSchema);

const schemeSchema = new mongoose.Schema({
  name: String,
  description: String,
  category: String,
  state: String,
  link: String,
  eligibility: {
    occupation: String,
    incomeLimit: Number,
    stateSpecific: String
  }
});
const Scheme = mongoose.model("Scheme", schemeSchema);

/* ================= LOGIN ================= */

app.post("/api/login", async (req,res)=>{
  const { name } = req.body;

  let user = await User.findOne({ name });

  if(!user){
    user = new User({ name });
    await user.save();
  }

  res.json(user);
});

/* ================= FIND SCHEMES ================= */

app.post("/api/findSchemes", async (req,res)=>{

  const { occupation, income, state, userId } = req.body;

  const schemes = await Scheme.find({
    $or: [
      { category: occupation },
      { "eligibility.occupation": occupation }
    ]
  });

  // save history
  if(userId){
    await User.findByIdAndUpdate(userId, {
      $push: {
        history: { occupation, income, state }
      }
    });
  }

  res.json(schemes);
});

/* ================= HISTORY ================= */

app.get("/api/history/:id", async (req,res)=>{
  const user = await User.findById(req.params.id);
  res.json(user.history);
});

/* ================= RECOMMEND ================= */

app.get("/api/recommend/:id", async (req,res)=>{

  const user = await User.findById(req.params.id);

  if(!user || user.history.length === 0){
    return res.json([]);
  }

  const last = user.history[user.history.length - 1];

  const schemes = await Scheme.find({
    $or: [
      { category: last.occupation },
      { "eligibility.occupation": last.occupation }
    ]
  });

  res.json(schemes.slice(0,5));
});

/* ================= ADD SAMPLE DATA ================= */

app.get("/api/add", async (req,res)=>{

  await Scheme.insertMany([
    {
      name: "PM Kisan",
      description: "₹6000/year to farmers",
      category: "farmer",
      link: "https://pmkisan.gov.in/"
    },
    {
      name: "Scholarship Portal",
      description: "Scholarships for students",
      category: "student",
      link: "https://scholarships.gov.in/"
    },
    {
      name: "Mudra Loan",
      description: "Loan for small business",
      category: "business",
      link: "https://mudra.org.in/"
    },
    {
      name: "Ujjwala Yojana",
      description: "Free LPG for women",
      category: "woman",
      link: "https://pmuy.gov.in/"
    }
  ]);

  res.send("Data added");
});

/* ================= START ================= */

app.listen(3000, ()=>console.log("Server running on http://localhost:3000"));
