const express = require("express");
const router = express.Router();
const db = require("../db");

// Get all schemes
router.get("/", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM schemes ORDER BY created_at DESC");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
