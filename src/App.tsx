import "./index.css";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Profile from "./profile/Profile";
import { api } from "./utils/api";
import { useEffect } from "react";

import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Logout from "./pages/Auth/Logout";

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  const hideLayout =
    location.pathname === "/login" || location.pathname === "/register";

  useEffect(() => {
    api
      .get("/me", { withCredentials: true })
      .then(() => {})
      .catch(() => {
        alert("Login to use daw!");
      });
  }, [navigate]);

  return (
    <>
      {!hideLayout && <Navbar />}
      <div className={`flex ${hideLayout ? "" : "min-h-screen"}`}>
        {!hideLayout && <Sidebar />}
        <div className="flex-1 bg-white p-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/:username" element={<Profile />} />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
