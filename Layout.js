import React from "react";
import { Link } from "react-router-dom";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-r from-indigo-100 via-blue-50 to-indigo-200">
      {/* Header */}
      <header className="bg-white shadow p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-indigo-700">SchemeSathi</h1>
        <nav className="space-x-4">
          <Link
            to="/"
            className="text-indigo-600 hover:text-indigo-800 font-medium"
          >
            Home
          </Link>
          <Link
            to="/schemes"
            className="text-indigo-600 hover:text-indigo-800 font-medium"
          >
            Schemes
          </Link>
          <Link
            to="/dashboard"
            className="text-indigo-600 hover:text-indigo-800 font-medium"
          >
            Dashboard
          </Link>
          <Link
            to="/login"
            className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
          >
            Login
          </Link>
        </nav>
      </header>

      {/* Main Content with Sidebar */}
      <div className="flex flex-grow">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-inner p-6 hidden md:block">
          <h2 className="text-lg font-bold text-indigo-700 mb-4">Categories</h2>
          <ul className="space-y-2 text-gray-700">
            <li><Link to="/schemes/pension" className="hover:text-indigo-600">Pension</Link></li>
            <li><Link to="/schemes/education" className="hover:text-indigo-600">Education</Link></li>
            <li><Link to="/schemes/employment" className="hover:text-indigo-600">Employment</Link></li>
            <li><Link to="/schemes/health" className="hover:text-indigo-600">Health</Link></li>
          </ul>
        </aside>

        {/* Page Content */}
        <main className="flex-grow p-6">{children}</main>
      </div>

      {/* Footer */}
      <footer className="bg-white shadow p-4 text-center text-gray-500">
        © {new Date().getFullYear()} SchemeSathi · Empowering Citizens
      </footer>
    </div>
  );
}
