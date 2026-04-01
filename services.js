import React, { useState } from "react";

export default function LoginPage() {
  const [phone, setPhone] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");

  const handleSendOtp = () => {
    // Call backend API to send OTP
    setOtpSent(true);
    alert("OTP sent to your phone/email!");
  };

  const handleVerifyOtp = () => {
    // Call backend API to verify OTP
    alert("Login successful!");
  };

  const handleSkip = () => {
    alert("You chose to skip login. Limited features available.");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-100 to-indigo-200">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-indigo-600 mb-6">
          SchemeSathi Login
        </h2>

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
  );
}
