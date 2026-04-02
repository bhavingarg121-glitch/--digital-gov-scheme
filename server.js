import express from "express";
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.json());



// Send OTP
app.post("/api/send-otp", (req, res) => {
  const { phone } = req.body;
  const otp = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
  otpStore[phone] = otp;
  console.log(`OTP for ${phone}: ${otp}`); // In real app, send via SMS/email
  res.json({ success: true, message: "OTP sent!" });
});

// Verify OTP
app.post("/api/verify-otp", (req, res) => {
  const { phone, otp } = req.body;
  if (otpStore[phone] && otpStore[phone] === otp) {
    delete otpStore[phone]; // clear after use
    res.json({ success: true, message: "Login successful!" });
  } else {
    res.json({ success: false, message: "Invalid OTP." });
  }
});

// Register new user
app.post("/api/register", (req, res) => {
  const { phone } = req.body;
  if (users.includes(phone)) {
    res.json({ success: false, message: "User already exists." });
  } else {
    users.push(phone);
    res.json({ success: true, message: "Registration successful!" });
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
