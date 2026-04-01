const { Pool } = require("pg");
const bcrypt = require("bcrypt");

// Database connection
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: 5432,
});

// Save user after OTP verification
app.post("/register", async (req, res) => {
  const { phone, name, email, password } = req.body;
  try {
    const passwordHash = await bcrypt.hash(password, 10);

    const result = await pool.query(
      "INSERT INTO users (phone, name, email, password_hash) VALUES ($1, $2, $3, $4) RETURNING user_id",
      [phone, name, email, passwordHash]
    );

    res.json({ message: "User registered successfully", userId: result.rows[0].user_id });
  } catch (err) {
    res.status(500).json({ error: "Failed to register user" });
  }
});

// Fetch user profile (after login)
app.get("/profile/:phone", async (req, res) => {
  const { phone } = req.params;
  try {
    const result = await pool.query("SELECT * FROM users WHERE phone=$1", [phone]);
    if (result.rows.length === 0) return res.status(404).json({ error: "User not found" });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch profile" });
  }
});
