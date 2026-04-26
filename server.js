const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

mongoose.connect("mongodb://127.0.0.1:27017/schemesathi")
.then(()=>console.log("MongoDB Connected"));

const User = require("./models/User");
const Scheme = require("./models/Scheme");
const History = require("./models/History");

// ================= AUTH =================

// REGISTER
app.post("/api/register", async (req,res)=>{
  const hashed = await bcrypt.hash(req.body.password, 10);

  const user = new User({
    email: req.body.email,
    password: hashed
  });

  await user.save();
  res.send("Registered");
});

// LOGIN
app.post("/api/login", async (req,res)=>{
  const user = await User.findOne({ email: req.body.email });

  if(!user) return res.send("User not found");

  const valid = await bcrypt.compare(req.body.password, user.password);
  if(!valid) return res.send("Wrong password");

  const token = jwt.sign({ id: user._id }, "SECRET_KEY");

  res.json({ token });
});

// ================= AI FIND =================

function scoreScheme(s, u){
  let score = 0;

  if(u.age >= s.eligibility.minAge && u.age <= s.eligibility.maxAge) score += 2;
  if(u.income <= s.eligibility.incomeLimit) score += 2;
  if(s.eligibility.occupation === u.occupation) score += 2;
  if(s.eligibility.state === u.state) score += 1;
  if(s.eligibility.gender === u.gender) score += 1;

  return score;
}

// FIND SCHEMES
app.post("/api/find", async (req,res)=>{

  const user = req.body;

  const schemes = await Scheme.find();

  const results = schemes
    .map(s => ({...s._doc, score: scoreScheme(s,user)}))
    .filter(s => s.score >= 3)
    .sort((a,b)=>b.score-a.score);

  res.json(results);
});

// ADD SAMPLE DATA
app.get("/api/add", async (req,res)=>{

  await Scheme.insertMany([
    {
      name:"PM Kisan",
      description:"₹6000/year support",
      link:"https://pmkisan.gov.in",
      eligibility:{minAge:18,maxAge:60,incomeLimit:300000,occupation:"farmer",state:"Maharashtra"}
    },
    {
      name:"Scholarship",
      description:"Student financial aid",
      link:"https://scholarships.gov.in",
      eligibility:{minAge:17,maxAge:30,incomeLimit:500000,occupation:"student"}
    },
    {
      name:"Mudra Loan",
      description:"Loan for business",
      link:"https://mudra.org.in",
      eligibility:{minAge:21,maxAge:55,incomeLimit:1000000,occupation:"business"}
    }
  ]);

  res.send("Data Added");
});

app.listen(3000, ()=>console.log("Server Running"));
