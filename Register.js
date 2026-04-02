import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "./Layout.js";
import Notification from "./Notification.js";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, phone }),
      });
      const data = await res.json();
      setMessage(data.message);
      if (data.success) {
        setSuccess(true);
        sessionStorage.removeItem("guestMode");
        sessionStorage.setItem("authToken", "true");

        // Auto‑redirect after 2 seconds
        setTimeout(() => {
          navigate("/dashboard");
        }, 2000);
      }
    } catch {
      setMessage("Error registering. Please try again.");
    }
  };

  return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
          <h1 className="text-2xl font-bold mb-6 text-center">Register</h1>
          <Notification message={message} />

          {!success ? (
            <form onSubmit={handleRegister}>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full mb-4 px-3 py-2 border rounded focus:ring-2 focus:ring-blue-500"
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full mb-4 px-3 py-2 border rounded focus:ring-2 focus:ring-blue-500"
                required
              />
              <input
                type="text"
                placeholder="Phone (optional)"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full mb-4 px-3 py-2 border rounded focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="w-full py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
              >
                Register
              </button>
            </form>
          ) : (
            <p className="text-green-600 font-semibold text-center mt-4">
              ✅ Registration successful! Redirecting to dashboard…
            </p>
          )}

          {!success && (
            <button
              onClick={() => navigate("/")}
              className="w-full mt-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition"
            >
              Back to Login
            </button>
          )}
        </div>
      </div>
    </Layout>
  );
}
