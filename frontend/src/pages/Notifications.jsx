// src/pages/Notifications.jsx
import React, { useEffect, useState } from "react";
import API from "../api/api";

export default function Notifications() {
  const [notes, setNotes] = useState([]);
  const userId = localStorage.getItem("user_id");

  useEffect(() => {
    API.get(`/notifications/user/${userId}`)
      .then((res) => setNotes(res.data))
      .catch((err) => console.error(err));
  }, [userId]);

  return (
    <div style={{ padding: 20 }}>
      <h2>Notifications</h2>

      {notes.length === 0 && <p>No notifications.</p>}

      <ul>
        {notes.map((n) => (
          <li key={n.id} style={{ marginBottom: 10 }}>
            <strong>{new Date(n.created_at).toLocaleString()}</strong>
            <br />
            {n.message}
          </li>
        ))}
      </ul>
    </div>
  );
}
