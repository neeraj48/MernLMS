import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const RouteGuard = ({ children }) => {
  const { user } = useSelector((store) => store.auth);
  // const isAuthenticated = localStorage.getItem("token") !== null;
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default RouteGuard;
