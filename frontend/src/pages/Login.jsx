import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "../styles/auth.css"; // 👈 ADD THIS

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const nav = useNavigate();

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await axios.post("http://127.0.0.1:8000/auth/login", {
      email,
      password,
    });

    const userId = res.data.user_id;

    if (!userId) {
      alert("Login failed: user id not received");
      return;
    }

    localStorage.clear(); // 🔥 reset previous session
    localStorage.setItem("user_id", userId);
    localStorage.setItem("is_checked_in", "false"); // 🔒 navbar hidden

    nav("/checkin");
  } catch (err) {
    alert(err?.response?.data?.detail || "Invalid email or password");
  }
};



  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Gym Login</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">Sign In</button>
        </form>

        <p style={{ marginTop: 12 }}>
          Don’t have an account?{" "}
          <Link to="/register" className="auth-link">
            Create Account
          </Link>
        </p>
      </div>
    </div>
  );
}
