import { Navigate } from "react-router-dom";

export function ProtectedPage({ children, role }) {
  const token = localStorage.getItem("access_token");
  const userRole = localStorage.getItem("role");

  if (!token || userRole !== role) {
    return <Navigate to="/" />;
  }

  return children;
}


