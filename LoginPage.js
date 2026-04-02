import React, { useState } from "react";
import Layout from "./Layout.js";
import Notification from "./Notification.js";

export default function LoginPage() {
  const [phone, setPhone] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");

  // Send OTP
  const handleSendOtp = async () => {
    try {
      // Call backend API to send OTP
      await fetch("/api/send-otp", {
        method: "POST",
        body: JSON.stringify({ phone }),
        headers: { "Content-Type": "application/json" },
      });
      setOtpSent(true);
      setMessage("OTP sent to your phone/email!");
    } catch (err) {
      setMessage("Failed to send OTP.");
    }
  };

  // Verify OTP
  const handleVerifyOtp = async () => {
    try {
      const res = await fetch("/api/verify-otp", {
        method: "POST",
        body: JSON.stringify({ phone, otp }),
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      if (data.success) setMessage("Login successful!");
      else setMessage("Invalid OTP. Try again.");
    } catch (err) {
      setMessage("Verification failed.");
    }
  };

  // Guest mode
  const handleSkip = () => {
    setMessage("Guest mode activated. Limited features available.");
  };

  // Register new user
  const handleRegister = async () => {
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        body: JSON.stringify({ phone }),
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      if (data.success) setMessage("Registration successful!");
      else setMessage("Registration failed.");
    } catch (err) {
      setMessage("Error during registration.");
    }
  };

  return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-100 via-blue-50 to-indigo-200">
        <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
          <h2 className="text-2xl font-bold text-center text-indigo-700 mb-6">
            SchemeSathi Login
          </h2>

          <Notification message={message} />

          {!otpSent ? (
            <>
              <input
                type="text"
                placeholder="Enter phone/email"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
              <button
                onClick={handleSendOtp}
                className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
              >
                Send OTP
              </button>
              <button
                onClick={handleRegister}
                className="w-full mt-3 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Register
              </button>
            </>
          ) : (
            <>
              <input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
              <button
                onClick={handleVerifyOtp}
                className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
              >
                Verify OTP
              </button>
            </>
          )}

          <div className="mt-6 text-center">
            <button
              onClick={handleSkip}
              className="text-gray-600 underline hover:text-indigo-600"
            >
              Skip for now
            </button>
          </div>

          {/* Benefits Card */}
          <div className="mt-6 bg-gray-100 p-4 rounded-lg">
            <h3 className="font-semibold text-indigo-600 mb-2">
              Benefits of Logging In:
            </h3>
            <ul className="list-disc list-inside text-gray-700 text-sm">
              <li>Personalized dashboard</li>
              <li>Save favorite schemes</li>
              <li>Track applied schemes</li>
              <li>Get notifications & deadlines</li>
              <li>Language preference saved</li>
            </ul>
            <h3 className="font-semibold text-gray-600 mt-4 mb-2">
              Skip Mode (Limited Access):
            </h3>
            <ul className="list-disc list-inside text-gray-500 text-sm">
              <li>Explore schemes (read-only)</li>
              <li>No saving or tracking</li>
              <li>No notifications</li>
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  );
}
