import React, { useEffect, useState } from "react";
import GuestBanner from "./GuestBanner.js";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [isGuest, setIsGuest] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const guestFlag = sessionStorage.getItem("guestMode");
    if (guestFlag === "true") setIsGuest(true);
  }, []);

  const handleLogout = () => {
    // Clear all session flags
    sessionStorage.removeItem("guestMode");
    sessionStorage.removeItem("authToken");
    // Redirect back to login
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Top Navigation */}
      <header className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center shadow">
        <h1 className="text-xl font-bold">SchemeSathi Dashboard</h1>
        <nav className="space-x-4">
          <a href="#schemes" className="hover:underline">Schemes</a>
          <a href="#pensions" className="hover:underline">Pensions</a>
          <a href="#news" className="hover:underline">News</a>
          <button
            onClick={handleLogout}
            className="ml-4 bg-red-600 px-3 py-1 rounded hover:bg-red-700 transition"
          >
            Logout
          </button>
        </nav>
      </header>

      {/* Main Content */}
      <main className="p-6">
        {isGuest && <GuestBanner />}

        {/* Example sections */}
        <section id="schemes" className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Featured Schemes</h2>
          {/* dynamic content here */}
        </section>

        <section id="pensions" className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Pension Schemes</h2>
          {/* dynamic content here */}
        </section>

        <section id="news">
          <h2 className="text-2xl font-semibold mb-4">Latest News</h2>
          {/* dynamic content here */}
        </section>
      </main>
    </div>
  );
}
