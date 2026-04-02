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
