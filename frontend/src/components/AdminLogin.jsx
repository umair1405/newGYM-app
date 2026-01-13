import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const nav = useNavigate();

  const login = async () => {
    try {
      await axios.post("http://127.0.0.1:8000/admin/login", null, {
        params: { username, password }
      });

      localStorage.setItem("is_admin_authenticated", "true");
      nav("/admin/users");
    } catch (err) {
      alert("Invalid Admin Credentials");
    }
  };

  return (
    <div>
      <h2>Admin Login</h2>
      <input placeholder="Username" onChange={e => setUsername(e.target.value)} />
      <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
      <button onClick={login}>Login</button>
    </div>
  );
}
