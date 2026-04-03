import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Layout from "./Layout.js";
import Notification from "./Notification.js";

export default function RegisterPage() {
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/register", {
        phone,
      });

      if (res.data.success) {
        setMessage("Registration successful! Please login.");
        // Redirect to login after short delay
        setTimeout(() => navigate("/login"), 1500);
      } else {
        setMessage(res.data.message || "Registration failed");
      }
    } catch (err) {
      console.error("Register error:", err);
      setMessage(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
          <h1 className="text-2xl font-bold mb-6 text-center">Register</h1>
          <Notification message={message} />

          <form onSubmit={handleRegister}>
            <input
              type="text"
              placeholder="Phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full mb-4 px-3 py-2 border rounded focus:ring-2 focus:ring-blue-500"
              required
            />
            <button
              type="submit"
              className="w-full py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
            >
              Register
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <button
              onClick={() => navigate("/login")}
              className="text-blue-600 hover:underline font-medium"
            >
              Login here
            </button>
          </p>
        </div>
      </div>
    </Layout>
  );
}
