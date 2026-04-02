import React, { useEffect, useState } from "react";
import { getSchemes } from "../services/api"; // service layer call

export default function GuestExplore() {
  const [schemes, setSchemes] = useState([]);

  useEffect(() => {
    // Fetch schemes from backend
    getSchemes().then((res) => setSchemes(res.data));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-100 via-blue-50 to-indigo-200 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow p-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-indigo-700">SchemeSathi</h1>
        <button className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">
          Login/Register
        </button>
      </header>

      {/* Banner */}
      <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 m-6 rounded">
        <p>
          You’re exploring in <strong>Guest Mode</strong>.  
          Login to save favorites, track applications, and get notifications.
        </p>
      </div>

      {/* Scheme List */}
      <main className="flex-grow p-6">
        <h2 className="text-xl font-bold text-indigo-700 mb-4">Available Schemes</h2>
        <ul className="space-y-4">
          {schemes.map((scheme) => (
            <li
              key={scheme.scheme_id}
              className="bg-white shadow rounded-lg p-4 flex justify-between items-center"
            >
              <div>
                <h3 className="font-semibold">{scheme.title}</h3>
                <p className="text-gray-600 text-sm">{scheme.description}</p>
                <a
                  href={scheme.official_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-600 text-sm underline"
                >
                  Official Link
                </a>
              </div>
              <span className="text-gray-400 text-sm italic">
                Login to save/apply
              </span>
            </li>
          ))}
        </ul>
      </main>

      {/* Footer */}
      <footer className="bg-white shadow p-6 text-center text-gray-500">
        © {new Date().getFullYear()} SchemeSathi · Guest Mode
      </footer>
    </div>
  );
}
