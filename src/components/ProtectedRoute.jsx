import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../lib/auth";

export const ProtectedRoute = ({ allowedRoles = [] }) => {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate type="replace" to="/auth" />;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    // If the user's role is not allowed, redirect them based on their actual role
    if (user.role === "organizer") {
      return <Navigate type="replace" to="/organizer/dashboard" />;
    }
    return <Navigate type="replace" to="/home" />;
  }

  return <Outlet />;
};
