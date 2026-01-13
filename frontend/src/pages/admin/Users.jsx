// src/pages/admin/Users.jsx
import React, { useEffect, useState } from "react";
import API from "../../api/api";

export default function Users() {
  const [users, setUsers] = useState([]);
if (localStorage.getItem("is_admin_authenticated") !== "true") {
  return <h2>Unauthorized Access</h2>;
}

  useEffect(() => {
    API.get("/users")
      .then((res) => setUsers(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>All Users</h2>

      <table border="1" cellPadding="8" style={{ width: "100%" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Email</th>
            <th>Trainer ID</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.email}</td>
              <td>{u.trainer_id || "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
