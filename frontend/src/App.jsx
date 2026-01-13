import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";
import AdminLogin from "./components/AdminLogin";

// Auth
import Login from "./pages/Login";
import Register from "./pages/Register";

// User
import CheckIn from "./pages/CheckIn";
import WorkoutSelect from "./pages/WorkoutSelect";
import WorkoutDetails from "./pages/WorkoutDetails";
import Checkout from "./pages/Checkout";
import Subscribe from "./pages/Subscribe";
import Payments from "./pages/Payments";
import Notifications from "./pages/Notifications";

// Admin
import Users from "./pages/admin/Users";
import Memberships from "./pages/admin/Memberships";
import Trainers from "./pages/admin/Trainers";

function App() {
  useEffect(() => {
    const handleBeforeUnload = () => {
      // ❌ User closed browser without checkout → clear session
      localStorage.clear();
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, []);

  return (
    <>
      <Navbar />

      <Routes>
        {/* PUBLIC */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* USER PROTECTED */}
        <Route
          path="/checkin"
          element={
            <ProtectedRoute>
              <CheckIn />
            </ProtectedRoute>
          }
        />

        <Route
          path="/workouts"
          element={
            <ProtectedRoute>
              <WorkoutSelect />
            </ProtectedRoute>
          }
        />

        <Route
          path="/workouts/:id"
          element={
            <ProtectedRoute>
              <WorkoutDetails />
            </ProtectedRoute>
          }
        />

        <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          }
        />

        <Route
          path="/subscribe"
          element={
            <ProtectedRoute>
              <Subscribe />
            </ProtectedRoute>
          }
        />

        <Route
          path="/payments"
          element={
            <ProtectedRoute>
              <Payments />
            </ProtectedRoute>
          }
        />

        <Route
          path="/notifications"
          element={
            <ProtectedRoute>
              <Notifications />
            </ProtectedRoute>
          }
        />

        {/* ADMIN LOGIN PAGE */}
        <Route path="/admin-login" element={<AdminLogin />} />

        {/* ADMIN PROTECTED */}
        <Route
          path="/admin/users"
          element={
            <AdminRoute>
              <Users />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/memberships"
          element={
            <AdminRoute>
              <Memberships />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/trainers"
          element={
            <AdminRoute>
              <Trainers />
            </AdminRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
