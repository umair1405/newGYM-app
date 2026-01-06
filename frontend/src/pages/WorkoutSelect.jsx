import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";
import "../styles/workoutSelect.css"; 

export default function WorkoutSelect() {
  const [workouts, setWorkouts] = useState([]);
  const nav = useNavigate();

  useEffect(() => {
    API.get("/workout/categories").then((res) => setWorkouts(res.data));
  }, []);

  return (
    <div className="workout-select-container">
      <h2 className="workout-select-title">Select Workout</h2>

      <div className="workout-grid">
        {workouts.map((w) => (
          <div
            key={w.id}
            className="workout-card"
            onClick={() => nav(`/workouts/${w.id}`)}
          >
            <button>{w.name}</button>
          </div>
        ))}
      </div>
    </div>
  );
}
