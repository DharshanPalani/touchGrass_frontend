import "./index.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Profile from "./profile/Profile";
import { api } from "./utils/api";
import { useEffect } from "react";

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get("/me", { withCredentials: true })
      .then(() => {})
      .catch(() => {
        alert("Login to use daw!");
      });
  }, [navigate]);
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/:username" element={<Profile />} />
    </Routes>
  );
}

export default App;
