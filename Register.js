import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "./Layout.js";
import Notification from "./Notification.js";

export default function LoginPage() {
  const [activeTab, setActiveTab] = useState("email"); // "email", "otp", "register"
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  // Email/Password login
  const handleEmailLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      setMessage(data.message);
      if (data.success) {
        sessionStorage.removeItem("guestMode");
        navigate("/dashboard");
      }
    } catch {
      setMessage("Error logging in. Please try again.");
    }
  };

  // OTP flow
  const handleSendOtp = async () => {
    try {
      const res = await fetch("/api/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone }),
      });
      const data = await res.json();
      setMessage(data.message);
      if (data.success) setOtpSent(true);
    } catch {
      setMessage("Error sending OTP. Please try again.");
    }
  };

  const handleVerifyOtp = async () => {
    try {
      const res = await fetch("/api/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, otp }),
      });
      const data = await res.json();
      setMessage(data.message);
      if (data.success) {
        sessionStorage.removeItem("guestMode");
        navigate("/dashboard");
      }
    } catch {
      setMessage("Error verifying OTP. Please try again.");
    }
  };

  // Register flow
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
        // after registration, navigate to dashboard
        sessionStorage.removeItem("guestMode");
        navigate("/dashboard");
      }
    } catch {
      setMessage("Error registering. Please try again.");
    }
  };

  const skipLogin = () => {
    sessionStorage.setItem("guestMode", "true");
    setMessage("Guest mode activated.");
    navigate("/dashboard");
  };

  return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
          <h1 className="text-2xl font-bold mb-6 text-center">Login / Register</h1>
          <Notification message={message} />

          {/* Tabs */}
          <div className="flex mb-6 border-b">
            <button
              className={`flex-1 py-2 ${
                activeTab === "email"
                  ? "border-b-2 border-blue-600 font-semibold"
                  : "text-gray-500"
              }`}
              onClick={() => setActiveTab("email")}
            >
              Email Login
            </button>
            <button
              className={`flex-1 py-2 ${
                activeTab === "otp"
                  ? "border-b-2 border-blue-600 font-semibold"
                  : "text-gray-500"
              }`}
              onClick={() => setActiveTab("otp")}
            >
              Phone OTP
            </button>
            <button
              className={`flex-1 py-2 ${
                activeTab === "register"
                  ? "border-b-2 border-blue-600 font-semibold"
                  : "text-gray-500"
              }`}
              onClick={() => setActiveTab("register")}
            >
              Register
            </button>
          </div>

          {/* Email/Password Form */}
          {activeTab === "email" && (
            <form onSubmit={handleEmailLogin}>
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
              <button
                type="submit"
                className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
              >
                Login
              </button>
            </form>
          )}

          {/* OTP Form */}
          {activeTab === "otp" && (
            <>
              {!otpSent ? (
                <>
                  <input
                    type="text"
                    placeholder="Enter phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full mb-4 px-3 py-2 border rounded focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    onClick={handleSendOtp}
                    className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                  >
                    Send OTP
                  </button>
                </>
              ) : (
                <>
                  <input
                    type="text"
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="w-full mb-4 px-3 py-2 border rounded focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    onClick={handleVerifyOtp}
                    className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                  >
                    Verify OTP
                  </button>
                </>
              )}
            </>
          )}

          {/* Register Form */}
          {activeTab === "register" && (
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
          )}

          {/* Guest Mode */}
          <button
            onClick={skipLogin}
            className="w-full mt-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition"
          >
            Skip Login (Guest Mode)
          </button>
        </div>
      </div>
    </Layout>
  );
}
