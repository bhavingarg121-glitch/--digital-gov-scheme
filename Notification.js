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
