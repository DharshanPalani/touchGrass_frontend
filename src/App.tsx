import "./index.css";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Profile from "./profile/Profile";
import Logout from "./pages/Auth/Logout";
import { api } from "./utils/api";
import { useEffect, useState } from "react";

import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/register";

  useEffect(() => {
    api
      .get("/me", { withCredentials: true })
      .then(() => {
        setIsAuthenticated(true);
      })
      .catch(() => {
        setIsAuthenticated(false);
      });
  }, []);

  if (isAuthenticated === null) {
    return (
      <div className="flex items-center justify-center min-h-screen text-green-800">
        Checking authentication...
      </div>
    );
  }

  return (
    <>
      {!isAuthPage && isAuthenticated && <Navbar />}
      <div className={`flex ${!isAuthPage && "min-h-screen"}`}>
        {!isAuthPage && isAuthenticated && <Sidebar />}

        <div className="flex-1 bg-white p-6">
          <Routes>
            <Route
              path="/"
              element={
                isAuthenticated ? (
                  <Home />
                ) : (
                  <div className="flex flex-col items-center justify-center text-center min-h-screen text-green-800">
                    <h1 className="text-4xl font-bold mb-6">
                      Welcome to TouchGrass
                    </h1>
                    <p className="text-lg mb-4">
                      You must be logged in to touch grass.
                    </p>
                    <div className="flex gap-4">
                      <button
                        onClick={() => navigate("/login")}
                        className="border border-green-700 px-6 py-2 text-green-800 hover:bg-green-700 hover:text-white transition"
                      >
                        Login
                      </button>
                      <button
                        onClick={() => navigate("/register")}
                        className="border border-green-700 px-6 py-2 text-green-800 hover:bg-green-700 hover:text-white transition"
                      >
                        Register
                      </button>
                    </div>
                  </div>
                )
              }
            />
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
