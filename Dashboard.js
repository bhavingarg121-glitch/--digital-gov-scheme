
import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  // Check login state
  const isGuest = sessionStorage.getItem("guestMode") === "true";
  const isLoggedIn = sessionStorage.getItem("authToken"); // or any flag you set after login

  if (isGuest || isLoggedIn) {
    return children; // allow access
  } else {
    return <Navigate to="/" replace />; // redirect to login
  }
}
