import React from "react";
import API from "../api/api";
import "../styles/attendance.css"; // Make sure to import the updated CSS
import { useNavigate } from "react-router-dom";

export default function Checkout() {
    const nav = useNavigate();
  const finish = async () => {
    const attendanceId = localStorage.getItem("attendance_id");
    await API.post(`/attendance/checkout?attendance_id=${attendanceId}`);
     nav("/");
  };

  return (
    <div className="attendance-container">
      <h2 className="attendance-title">Finish Workout</h2>
      <button className="attendance-button" onClick={finish}>
        Check Out
      </button>
    </div>
  );
}
