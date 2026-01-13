import { Navigate } from "react-router-dom";

export default function AdminRoute({ children }) {
  const isAdmin = localStorage.getItem("is_admin_authenticated");

  if (isAdmin !== "true") {
    return <Navigate to="/admin-login" replace />;
  }

  return children;
}
