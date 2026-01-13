// src/pages/Payments.jsx
import React, { useEffect, useState } from "react";
import API from "../api/api";

export default function Payments() {
  const [payments, setPayments] = useState([]);
  const userId = localStorage.getItem("user_id");

  useEffect(() => {
    API.get(`/payments/user/${userId}`)
      .then((res) => setPayments(res.data))
      .catch((err) => console.error(err));
  }, [userId]);

  return (
    <div style={{ padding: 20 }}>
      <h2>My Payments</h2>

      {payments.length === 0 && <p>No payments found.</p>}

      <table border="1" cellPadding="8" style={{ width: "100%", marginTop: 10 }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Membership</th>
            <th>Amount</th>
            <th>Start Date</th>
            <th>End Date</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((p) => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.membership?.name || p.membership_id}</td>
              <td>₹{p.amount}</td>
              <td>{new Date(p.start_date).toLocaleDateString()}</td>
              <td>{new Date(p.end_date).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
