import { Routes, Route } from "react-router-dom";
import React from "react";

import Login from "./pages/Login";
import Register from "./pages/Register";
import CheckIn from "./pages/CheckIn";
import WorkoutSelect from "./pages/WorkoutSelect";
import WorkoutDetails from "./pages/WorkoutDetails";
import Checkout from "./pages/Checkout";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/checkin" element={<CheckIn />} />
      <Route path="/workouts" element={<WorkoutSelect />} />
      <Route path="/workouts/:id" element={<WorkoutDetails />} />
      <Route path="/checkout" element={<Checkout />} />
    </Routes>
  );
}

export default App;
