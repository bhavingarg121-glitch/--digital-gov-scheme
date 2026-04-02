import React from "react";
import Layout from "./Layout.js";

export default function Dashboard() {
  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 p-8">
        <h1 className="text-3xl font-bold text-indigo-700 mb-6">
          Welcome to SchemeSathi
        </h1>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-semibold text-gray-800">My Dashboard</h2>
            <p className="text-sm text-gray-600 mt-2">
              View your saved schemes and personalized updates.
            </p>
          </div>

          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-semibold text-gray-800">Explore Schemes</h2>
            <p className="text-sm text-gray-600 mt-2">
              Browse all available government schemes by category.
            </p>
          </div>

          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-semibold text-gray-800">Notifications</h2>
            <p className="text-sm text-gray-600 mt-2">
              Stay updated with deadlines and announcements.
            </p>
          </div>
        </div>

        {/* Featured Schemes */}
        <div className="bg-white shadow rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-indigo-600 mb-4">
            Featured Schemes
          </h2>
          <ul className="list-disc list-inside text-gray-700">
            <li>Pradhan Mantri Jan Dhan Yojana</li>
            <li>Ayushman Bharat Health Scheme</li>
            <li>National Pension Scheme</li>
          </ul>
        </div>

        {/* Footer Info */}
        <div className="text-center text-gray-500 text-sm mt-10">
          © {new Date().getFullYear()} SchemeSathi. All rights reserved.
        </div>
      </div>
    </Layout>
  );
}
