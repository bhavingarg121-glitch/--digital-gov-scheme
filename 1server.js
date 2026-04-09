const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/schemesDB")
.then(()=>console.log("MongoDB Connected"));

const User = require("./models/User");
const Scheme = require("./models/Scheme");

// LOGIN
app.post("/api/login", async (req,res)=>{
  const { name } = req.body;

  let user = await User.findOne({ name });

  if(!user){
    user = new User({ name });
    await user.save();
  }

  res.json(user);
});

// COUNT
app.get("/api/count", async (req,res)=>{
  const count = await Scheme.countDocuments();
  res.json({ total: count });
});

// FIND SCHEMES
app.post("/api/schemes", async (req,res)=>{
  const { category } = req.body;
  const data = await Scheme.find({ category });
  res.json(data);
});

// ADD DATA
app.get("/api/addSchemes", async (req,res)=>{
  const data = require("./schemes.json");
  await Scheme.insertMany(data);
  res.send("Data Added");
});

app.listen(3000, ()=>console.log("Server Running"));
