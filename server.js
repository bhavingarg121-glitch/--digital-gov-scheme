const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");

const app = express();

app.use(cors());
app.use(express.json());

// ================= MONGODB =================
mongoose.connect("mongodb://127.0.0.1:27017/schemesDB")
.then(() => console.log("✅ MongoDB Connected"))
.catch(err => console.log(err));

// ================= MODELS =================

// User Model
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String
});
const User = mongoose.model("User", userSchema);

// Scheme Model
const schemeSchema = new mongoose.Schema({
  name: String,
  description: String,
  category: String,
  state: String,
  link: String
});
const Scheme = mongoose.model("Scheme", schemeSchema);

// ================= AUTH =================

// REGISTER
app.post("/api/register", async (req, res) => {
  const { name, email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User({ name, email, password: hashedPassword });
  await user.save();

  res.json({ message: "Registered successfully" });
});

// LOGIN
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && await bcrypt.compare(password, user.password)) {
    res.json({ name: user.name, email: user.email });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
});

// ================= SCHEMES =================

// COUNT
app.get("/api/count", async (req, res) => {
  const count = await Scheme.countDocuments();
  res.json({ total: count });
});

// FIND SCHEMES
app.post("/api/schemes", async (req, res) => {
  const { category } = req.body;
  const data = await Scheme.find({ category });
  res.json(data);
});

// ADD SCHEMES (RUN ONCE)
app.get("/api/addSchemes", async (req, res) => {
  const data = require("./schemes.json");
  await Scheme.insertMany(data);
  res.send("✅ Schemes added to DB");
});

// ================= SERVER =================
app.listen(3000, () => console.log("🚀 Server running on port 3000"));
