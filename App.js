import React, { useState } from "react";
import LoginPage from "./LoginPage.js";
import Dashboard from "./Dashboard.js";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <>
      {isLoggedIn ? (
        <Dashboard />
      ) : (
        <LoginPage onLoginSuccess={() => setIsLoggedIn(true)} />
      )}
    </>
  );
}
