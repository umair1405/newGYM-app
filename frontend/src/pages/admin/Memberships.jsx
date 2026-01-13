// src/pages/admin/Memberships.jsx
import React, { useEffect, useState } from "react";
import API from "../../api/api";

export default function Memberships() {
  const [memberships, setMemberships] = useState([]);
if (localStorage.getItem("is_admin_authenticated") !== "true") {
  return <h2>Unauthorized Access</h2>;
}

  useEffect(() => {
    API.get("/memberships")
      .then((res) => setMemberships(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>Membership Plans</h2>

      <table border="1" cellPadding="8" style={{ width: "100%" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Duration (months)</th>
          </tr>
        </thead>
        <tbody>
          {memberships.map((m) => (
            <tr key={m.id}>
              <td>{m.id}</td>
              <td>{m.name}</td>
              <td>₹{m.price}</td>
              <td>{m.duration_months}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
