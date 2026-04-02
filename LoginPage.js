import React, { useState } from "react";
import Layout from "./Layout.js";
import Notification from "./Notification.js";

export default function LoginPage() {
  const [phone, setPhone] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");

  const handleSendOtp = async () => {
    const res = await fetch("/api/send-otp", {
      method: "POST",
      body: JSON.stringify({ phone }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    setMessage(data.message);
    if (data.success) setOtpSent(true);
  };

  const handleVerifyOtp = async () => {
    const res = await fetch("/api/verify-otp", {
      method: "POST",
      body: JSON.stringify({ phone, otp }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    setMessage(data.message);
  };

  const handleRegister = async () => {
    const res = await fetch("/api/register", {
      method: "POST",
      body: JSON.stringify({ phone }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    setMessage(data.message);
  };

  return (
    <Layout>
      <Notification message={message} />
      {!otpSent ? (
        <>
          <input
            type="text"
            placeholder="Enter phone/email"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <button onClick={handleSendOtp}>Send OTP</button>
          <button onClick={handleRegister}>Register</button>
        </>
      ) : (
        <>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <button onClick={handleVerifyOtp}>Verify OTP</button>
        </>
      )}
    </Layout>
  );
}
