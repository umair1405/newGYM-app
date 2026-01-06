import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api/api";
import "../styles/workout.css";

export default function WorkoutDetails() {
  const { id } = useParams();
  const nav = useNavigate();

  const [exercises, setExercises] = useState([]);
  const [zoomImg, setZoomImg] = useState(null);
  const [activeExercise, setActiveExercise] = useState(null);

  useEffect(() => {
    API.get(`/workout/exercises/${id}`)
      .then((res) => setExercises(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  if (!exercises.length) {
    return <div className="loader">Loading Workout...</div>;
  }

  return (
    <div className="workout-container">
      <h2 className="workout-title">Workout Exercises</h2>

      <div className="exercise-grid">
        {exercises.map((ex) => (
          <div key={ex.id} className="exercise-card">
            <div className="exercise-img" onClick={() => setZoomImg(ex.image_url)}>
              <img
                src={ex.image_url}
                alt={ex.name}
                onError={(e) => (e.target.src = "/gymphoto.jpg")}
              />
            </div>

            <div className="exercise-info">
              <h3>{ex.name}</h3>

              <p className="preview-text">
                {ex.description.slice(0, 80)}...
              </p>

              <button
                className="details-btn"
                onClick={() => setActiveExercise(ex)}
              >
                View Details
              </button>

              <div className="exercise-meta">
                <span>🔥 Strength</span>
                <span>💪 Chest</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button className="finish-btn" onClick={() => nav("/checkout")}>
        Finish Workout
      </button>

      {/* IMAGE ZOOM */}
      {zoomImg && (
        <div className="zoom-overlay" onClick={() => setZoomImg(null)}>
          <img src={zoomImg} alt="Zoomed Exercise" />
        </div>
      )}

      {/* DETAILS MODAL */}
      {activeExercise && (
        <div
          className="details-overlay"
          onClick={() => setActiveExercise(null)}
        >
          <div
            className="details-modal"
            onClick={(e) => e.stopPropagation()}
          >
            {/* IMAGE ON TOP */}
            <div className="details-image">
              <img
                src={activeExercise.image_url}
                alt={activeExercise.name}
                onError={(e) => (e.target.src = "/gymphoto.jpg")}
              />
            </div>

            {/* CONTENT */}
            <div className="details-content">
              <h3>{activeExercise.name}</h3>
              <p>{activeExercise.description}</p>
            </div>

            <button
              className="close-btn"
              onClick={() => setActiveExercise(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
