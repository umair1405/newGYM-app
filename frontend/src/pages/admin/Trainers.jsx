// src/pages/admin/Trainers.jsx
import React, { useEffect, useState } from "react";
import API from "../../api/api";

export default function Trainers() {
  const [trainers, setTrainers] = useState([]);
if (localStorage.getItem("is_admin_authenticated") !== "true") {
  return <h2>Unauthorized Access</h2>;
}

  useEffect(() => {
    API.get("/trainers")
      .then((res) => setTrainers(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>Trainers</h2>

      <table border="1" cellPadding="8" style={{ width: "100%" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Specialty</th>
          </tr>
        </thead>
        <tbody>
          {trainers.map((t) => (
            <tr key={t.id}>
              <td>{t.id}</td>
              <td>{t.name}</td>
              <td>{t.specialty}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
