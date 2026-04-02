import React from "react";

export default function NotificationCard({ notification, onMarkRead }) {
  return (
    <div
      className={`bg-white shadow rounded-lg p-4 flex justify-between items-start hover:shadow-md transition ${
        notification.is_read ? "opacity-70" : ""
      }`}
    >
      {/* Notification Content */}
      <div className="flex-1">
        <h3 className="text-sm font-semibold text-indigo-700 mb-1">
          {notification.type}
        </h3>
        <p className="text-gray-600 text-sm mb-2">{notification.message}</p>
        <span className="text-gray-400 text-xs">
          {new Date(notification.created_at).toLocaleString()}
        </span>
      </div>

      {/* Actions */}
      <div className="ml-4">
        {!notification.is_read && (
          <button
            onClick={() => onMarkRead(notification.notification_id)}
            className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 text-xs font-semibold"
          >
            Mark as Read
          </button>
        )}
      </div>
    </div>
  );
}
const express = require("express");
const router = express.Router();
const db = require("../db");

// Get user notifications
router.get("/:userId", async (req, res) => {
  try {
    const result = await db.query(
      "SELECT * FROM notifications WHERE user_id = $1 ORDER BY created_at DESC",
      [req.params.userId]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Mark notification as read
router.put("/:id/read", async (req, res) => {
  try {
    await db.query("UPDATE notifications SET is_read = TRUE WHERE notification_id = $1", [
      req.params.id,
    ]);
    res.json({ message: "Notification marked as read" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
