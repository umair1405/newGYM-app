// src/pages/Subscribe.jsx
import React, { useEffect, useState } from "react";
import API from "../api/api";
import "../styles/workoutSelect.css";

export default function Subscribe() {
  const [memberships, setMemberships] = useState([]);
  const userId = localStorage.getItem("user_id");

  useEffect(() => {
    API.get("/memberships")
      .then((res) => setMemberships(res.data))
      .catch((err) => console.error(err));
  }, []);

  const subscribe = async (membershipId, price, duration) => {
    try {
      await API.post("/payments", {
        user_id: userId,
        membership_id: membershipId,
        amount: price,
        duration_months: duration,
      });

      alert("Subscription successful!");
    } catch (err) {
      alert("Subscription failed");
      console.error(err);
    }
  };

  return (
    <div className="workout-select-container">
      <h2 className="workout-select-title">Choose Membership</h2>

      <div className="workout-grid">
        {memberships.map((m) => (
          <div key={m.id} className="workout-card">
            <h3>{m.name}</h3>
            <p>Price: ₹{m.price}</p>
            <p>Duration: {m.duration_months} months</p>

            <button onClick={() => subscribe(m.id, m.price, m.duration_months)}>
              Subscribe
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
