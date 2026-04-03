import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import jwt from "jsonwebtoken";
import pool from "./db.js";

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Secret key for JWT
const JWT_SECRET = "yourSecretKeyHere";

// Send OTP
app.post("/api/send-otp", async (req, res) => {
  try {
    const { phone } = req.body;
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    await pool.query("INSERT INTO otps (phone, otp, created_at) VALUES ($1, $2, NOW())", [phone, otp]);

    res.json({ success: true, message: "OTP sent!" });
  } catch (err) {
    console.error("Error in send-otp:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// Verify OTP
app.post("/api/verify-otp", async (req, res) => {
  try {
    const { phone, otp } = req.body;

    const result = await pool.query(
      "SELECT * FROM otps WHERE phone=$1 AND otp=$2 ORDER BY created_at DESC LIMIT 1",
      [phone, otp]
    );

    if (result.rows.length > 0) {
      await pool.query("DELETE FROM otps WHERE phone=$1", [phone]);

      // Generate JWT token
      const token = jwt.sign({ phone }, JWT_SECRET, { expiresIn: "1h" });

      res.json({ success: true, message: "Login successful!", token });
    } else {
      res.status(401).json({ success: false, message: "Invalid OTP." });
    }
  } catch (err) {
    console.error("Error in verify-otp:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// Register
app.post("/api/register", async (req, res) => {
  try {
    const { phone } = req.body;

    const exists = await pool.query("SELECT * FROM users WHERE phone=$1", [phone]);

    if (exists.rows.length > 0) {
      res.json({ success: false, message: "User already exists." });
    } else {
      await pool.query("INSERT INTO users (phone) VALUES ($1)", [phone]);
      res.json({ success: true, message: "Registration successful!" });
    }
  } catch (err) {
    console.error("Error in register:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// Protected route example
app.get("/api/dashboard", async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ success: false, message: "No token provided" });

    const token = authHeader.split(" ")[1];
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) return res.status(403).json({ success: false, message: "Invalid token" });

      res.json({ success: true, message: `Welcome, user ${decoded.phone}` });
    });
  } catch (err) {
    console.error("Error in dashboard:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

app.listen(5000, () => console.log("Server running on port 5000"));
