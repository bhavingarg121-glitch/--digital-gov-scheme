import React, { useState } from "react";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("favorites");

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-100 via-blue-50 to-indigo-200 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow p-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-indigo-700">SchemeSathi Dashboard</h1>
        <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
          Logout
        </button>
      </header>

      {/* Tabs */}
      <nav className="flex justify-center space-x-6 bg-indigo-50 py-4 shadow-inner">
        <button
          onClick={() => setActiveTab("favorites")}
          className={`px-4 py-2 rounded ${
            activeTab === "favorites"
              ? "bg-indigo-600 text-white"
              : "bg-white text-indigo-600 border"
          }`}
        >
          Favorites
        </button>
        <button
          onClick={() => setActiveTab("applications")}
          className={`px-4 py-2 rounded ${
            activeTab === "applications"
              ? "bg-indigo-600 text-white"
              : "bg-white text-indigo-600 border"
          }`}
        >
          Applications
        </button>
        <button
          onClick={() => setActiveTab("notifications")}
          className={`px-4 py-2 rounded ${
            activeTab === "notifications"
              ? "bg-indigo-600 text-white"
              : "bg-white text-indigo-600 border"
          }`}
        >
          Notifications
        </button>
      </nav>

      {/* Content */}
      <main className="flex-grow p-6">
        {activeTab === "favorites" && (
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-bold text-indigo-700 mb-4">Your Favorite Schemes</h2>
            <p className="text-gray-600">Saved schemes will appear here.</p>
          </div>
        )}

        {activeTab === "applications" && (
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-bold text-indigo-700 mb-4">Your Applications</h2>
            <p className="text-gray-600">Track the status of schemes you’ve applied for.</p>
          </div>
        )}

        {activeTab === "notifications" && (
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-bold text-indigo-700 mb-4">Notifications</h2>
            <p className="text-gray-600">Alerts and deadlines will appear here.</p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white shadow p-6 text-center text-gray-500">
        © {new Date().getFullYear()} SchemeSathi · Empowering Citizens
      </footer>
    </div>
  );
}
