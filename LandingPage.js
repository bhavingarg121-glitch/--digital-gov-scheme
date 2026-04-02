import React from "react";
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-100 via-blue-50 to-indigo-200 flex flex-col">
      {/* Hero Section */}
      <header className="flex justify-between items-center p-6 bg-white shadow">
        <h1 className="text-2xl font-bold text-indigo-700">SchemeSathi</h1>
        <nav>
          <button
            onClick={() => navigate("/login")}
            className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
          >
            Login/Register
          </button>
        </nav>
      </header>

      {/* Main Hero */}
      <main className="flex flex-col items-center justify-center flex-grow text-center px-6">
        <h2 className="text-4xl font-bold text-indigo-800 mb-4">
          Guiding Citizens to Schemes That Matter
        </h2>
        <p className="text-gray-600 max-w-xl mb-8">
          Discover, save, and track government schemes with ease. SchemeSathi
          helps you stay informed and take action.
        </p>
        <div className="space-x-4">
          <button
            onClick={() => navigate("/schemes")}
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700"
          >
            Explore Schemes
          </button>
          <button
            onClick={() => navigate("/login")}
            className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700"
          >
            Login/Register
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white shadow p-6 text-center text-gray-500">
        © {new Date().getFullYear()} SchemeSathi · Built for citizens
      </footer>
    </div>
  );
}
