const express = require("express");
const router = express.Router();
const db = require("../db");

// Get user favorites
router.get("/:userId", async (req, res) => {
  try {
    const result = await db.query(
      `SELECT f.favorite_id, s.* 
       FROM favorites f 
       JOIN schemes s ON f.scheme_id = s.scheme_id 
       WHERE f.user_id = $1`,
      [req.params.userId]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add favorite
router.post("/", async (req, res) => {
  const { user_id, scheme_id } = req.body;
  try {
    await db.query(
      "INSERT INTO favorites (user_id, scheme_id) VALUES ($1, $2) ON CONFLICT DO NOTHING",
      [user_id, scheme_id]
    );
    res.json({ message: "Favorite added" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
