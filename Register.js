import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "./Layout.js";
import Notification from "./Notification.js";

export default function LoginPage() {
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const skipLogin = () => {
    sessionStorage.setItem("guestMode", "true");
    setMessage("Guest mode activated.");
    navigate("/dashboard");
  };

  return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
          <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
          <Notification message={message} />

          {/* Example: Email login form */}
          <form>
            <input
              type="email"
              placeholder="Email"
              className="w-full mb-4 px-3 py-2 border rounded focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full mb-4 px-3 py-2 border rounded focus:ring-2 focus:ring-blue-500"
              required
            />
            <button
              type="submit"
              className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              Login
            </button>
          </form>

          {/* Guest Mode */}
          <button
            onClick={skipLogin}
            className="w-full mt-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition"
          >
            Skip Login (Guest Mode)
          </button>

          {/* Register Link */}
          <p className="mt-6 text-center text-sm text-gray-600">
            Don’t have an account?{" "}
            <button
              onClick={() => navigate("/register")}
              className="text-blue-600 hover:underline font-medium"
            >
              Register here
            </button>
          </p>
        </div>
      </div>
    </Layout>
  );
}
