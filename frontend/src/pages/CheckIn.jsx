import React from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";
import "../styles/attendance.css"; // Make sure to import the updated CSS

export default function CheckIn() {
  const nav = useNavigate();

  const checkIn = async () => {
    const userId = 1; // get this from auth / context / localStorage
    const res = await API.post(`/attendance/checkin?user_id=${userId}`);
    localStorage.setItem("attendance_id", res.data.attendance_id);
    nav("/workouts");
  };

  return (
    <div className="attendance-container">
      <h2 className="attendance-title">Mark Attendance</h2>
      <button className="attendance-button" onClick={checkIn}>
        Check In
      </button>
    </div>
  );
}
