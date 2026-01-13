import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const nav = useNavigate();
  const isCheckedIn = localStorage.getItem("is_checked_in");
  const isAdmin = localStorage.getItem("is_admin_authenticated");

  if (isCheckedIn !== "true") return null;

  const logout = () => {
    localStorage.clear();
    nav("/");
  };

  return (
    <nav style={{ padding: 10, background: "#222" }}>
      {/* USER LINKS */}
      {!isAdmin && (
        <>
          <Link to="/checkin" style={{ color: "#fff", marginRight: 10 }}>Check In</Link>
          <Link to="/subscribe" style={{ color: "#fff", marginRight: 10 }}>Subscribe</Link>
          <Link to="/payments" style={{ color: "#fff", marginRight: 10 }}>Payments</Link>
          <Link to="/notifications" style={{ color: "#fff", marginRight: 10 }}>Notifications</Link>
        </>
      )}

      {/* ADMIN DROPDOWN */}
      {!isAdmin && (
        <button onClick={() => nav("/admin-login")} style={{ marginLeft: 20 }}>
          Admin
        </button>
      )}

      {/* ADMIN LINKS */}
      {isAdmin === "true" && (
        <>
          <span style={{ marginLeft: 20, color: "#aaa" }}>Admin:</span>
          <Link to="/admin/users" style={{ color: "#0f0", marginLeft: 10 }}>Users</Link>
          <Link to="/admin/memberships" style={{ color: "#0f0", marginLeft: 10 }}>Memberships</Link>
          <Link to="/admin/trainers" style={{ color: "#0f0", marginLeft: 10 }}>Trainers</Link>
          <button onClick={logout} style={{ marginLeft: 20 }}>Logout</button>
        </>
      )}
    </nav>
  );
}
