import React, { useState } from "react";
import Layout from "./Layout.js";
import Notification from "./Notification.js";

export default function LoginPage() {
  const [phone, setPhone] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");

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
        window.location.href = "dashboard.html";
      }
    } catch {
      setMessage("Error verifying OTP. Please try again.");
    }
  };

  const handleRegister = async () => {
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone }),
      });
      const data = await res.json();
      setMessage(data.message);
    } catch {
      setMessage("Error registering. Please try again.");
    }
  };

  const skipLogin = () => {
    setMessage("Guest mode activated.");
    window.location.href = "dashboard.html"; // limited access interface
  };

  return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
          <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
          <Notification message={message} />

          {!otpSent ? (
            <>
              <input
                type="text"
                placeholder="Enter phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full mb-4 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={handleSendOtp}
                className="w-full py-2 mb-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
              >
                Send OTP
              </button>
              <button
                onClick={handleRegister}
                className="w-full py-2 mb-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
              >
                Register
              </button>
              <button
                onClick={skipLogin}
                className="w-full py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition"
              >
                Skip Login (Guest Mode)
              </button>
            </>
          ) : (
            <>
              <input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full mb-4 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={handleVerifyOtp}
                className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
              >
                Verify OTP
              </button>
              <button
                onClick={skipLogin}
                className="w-full py-2 mt-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition"
              >
                Skip Login (Guest Mode)
              </button>
            </>
          )}
        </div>
      </div>
    </Layout>
  );
}
