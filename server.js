import express from "express";
import bodyParser from "body-parser";
import pool from "./db.js";

const app = express();
app.use(bodyParser.json());

// Send OTP
app.post("/api/send-otp", async (req, res) => {
  const { phone } = req.body;
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  await pool.query("INSERT INTO otps (phone, otp) VALUES ($1, $2)", [phone, otp]);
  res.json({ success: true, message: "OTP sent!" });
});

// Verify OTP
app.post("/api/verify-otp", async (req, res) => {
  const { phone, otp } = req.body;
  const result = await pool.query(
    "SELECT * FROM otps WHERE phone=$1 AND otp=$2 ORDER BY created_at DESC LIMIT 1",
    [phone, otp]
  );
  if (result.rows.length > 0) {
    await pool.query("DELETE FROM otps WHERE phone=$1", [phone]);
    res.json({ success: true, message: "Login successful!" });
  } else {
    res.json({ success: false, message: "Invalid OTP." });
  }
});

// Register
app.post("/api/register", async (req, res) => {
  const { phone } = req.body;
  const exists = await pool.query("SELECT * FROM users WHERE phone=$1", [phone]);
  if (exists.rows.length > 0) {
    res.json({ success: false, message: "User already exists." });
  } else {
    await pool.query("INSERT INTO users (phone) VALUES ($1)", [phone]);
    res.json({ success: true, message: "Registration successful!" });
  }
});

app.listen(5000, () => console.log("Server running on port 5000"));
