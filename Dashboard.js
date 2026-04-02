import React, { useEffect, useState } from "react";
import GuestBanner from "./GuestBanner.js";

export default function Dashboard() {
  const [isGuest, setIsGuest] = useState(false);
  const [schemes, setSchemes] = useState([]);
  const [pensions, setPensions] = useState([]);
  const [news, setNews] = useState([]);

  useEffect(() => {
    const guestFlag = sessionStorage.getItem("guestMode");
    if (guestFlag === "true") setIsGuest(true);

    // Fetch data dynamically
    const fetchData = async () => {
      try {
        const res = await fetch("/api/dashboard-data"); // backend route serving JSON
        const data = await res.json();
        setSchemes(data.schemes || []);
        setPensions(data.pensions || []);
        setNews(data.news || []);
      } catch (err) {
        console.error("Error loading dashboard data", err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Top Navigation */}
      <header className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center shadow">
        <h1 className="text-xl font-bold">SchemeSathi Dashboard</h1>
        <nav className="space-x-4">
          <a href="#schemes" className="hover:underline">Schemes</a>
          <a href="#pensions" className="hover:underline">Pensions</a>
          <a href="#news" className="hover:underline">News</a>
        </nav>
      </header>

      {/* Main Content */}
      <main className="p-6">
        {isGuest && <GuestBanner />}

        {/* Schemes Section */}
        <section id="schemes" className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Featured Schemes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {schemes.map((scheme) => (
              <div key={scheme.id} className="bg-white p-4 rounded shadow hover:shadow-lg transition">
                <h3 className="font-bold">{scheme.title}</h3>
                <p className="text-sm text-gray-600">{scheme.description}</p>
                {isGuest && scheme.restricted && (
                  <p className="text-xs text-red-600 mt-2 flex items-center">
                    🔒 Login required to access details
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Pension Section */}
        <section id="pensions" className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Pension Schemes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {pensions.map((pension) => (
              <div key={pension.id} className="bg-white p-4 rounded shadow hover:shadow-lg transition">
                <h3 className="font-bold">{pension.title}</h3>
                <p className="text-sm text-gray-600">{pension.description}</p>
                {isGuest && pension.restricted && (
                  <p className="text-xs text-red-600 mt-2 flex items-center">
                    🔒 Login required to view eligibility
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* News Section */}
        <section id="news">
          <h2 className="text-2xl font-semibold mb-4">Latest News</h2>
          <div className="space-y-4">
            {news.map((item) => (
              <div key={item.id} className="bg-white p-4 rounded shadow hover:shadow-lg transition">
                <h3 className="font-bold">{item.headline}</h3>
                <p className="text-sm text-gray-600">{item.summary}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
