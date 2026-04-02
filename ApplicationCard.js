import React from "react";

export default function ApplicationCard({ application }) {
  // Status color mapping
  const statusColors = {
    Pending: "bg-yellow-100 text-yellow-700 border border-yellow-400",
    Approved: "bg-green-100 text-green-700 border border-green-400",
    Rejected: "bg-red-100 text-red-700 border border-red-400",
  };

  return (
    <div className="bg-white shadow rounded-lg p-6 flex justify-between items-start hover:shadow-md transition">
      {/* Scheme Info */}
      <div className="flex-1">
        <h3 className="text-lg font-bold text-indigo-700 mb-2">
          {application.scheme_title}
        </h3>
        <p className="text-gray-600 text-sm mb-2">
          Applied on:{" "}
          <span className="font-medium">
            {new Date(application.applied_at).toLocaleDateString()}
          </span>
        </p>
        <a
          href={application.official_link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-indigo-600 hover:text-indigo-800 underline text-sm font-medium"
        >
          Official Link
        </a>
      </div>

      {/* Status Badge */}
      <div
        className={`px-3 py-1 rounded text-sm font-semibold ${statusColors[application.status]}`}
      >
        {application.status}
      </div>
    </div>
  );
}
const express = require("express");
const router = express.Router();
const db = require("../db");

// Get user applications
router.get("/:userId", async (req, res) => {
  try {
    const result = await db.query(
      `SELECT a.application_id, a.status, a.applied_at, s.title AS scheme_title, s.official_link
       FROM applications a 
       JOIN schemes s ON a.scheme_id = s.scheme_id 
       WHERE a.user_id = $1`,
      [req.params.userId]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Apply for a scheme
router.post("/", async (req, res) => {
  const { user_id, scheme_id } = req.body;
  try {
    await db.query(
      "INSERT INTO applications (user_id, scheme_id) VALUES ($1, $2)",
      [user_id, scheme_id]
    );
    res.json({ message: "Application submitted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
