import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ allowedRoles }) => {
  const email = localStorage.getItem("email");
  const role = localStorage.getItem("role"); // Assuming role is also stored in localStorage

  if (!email) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(role)) {
    return <Navigate to={role === "admin" ? "/admin" : "/"} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
