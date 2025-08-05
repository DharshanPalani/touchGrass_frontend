import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../utils/api";

function Register() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = () => {
    if (username !== "" && password === confirmPassword) {
      api
        .post("/register", { username, password }, { withCredentials: true })
        .then(() => {
          alert("Register successfully");
          navigate("/login");
        })
        .catch((err: any) => {
          console.log(err);
          alert("Register failure");
        });
    } else {
      alert("Passwords do not match or fields are empty");
    }
  };

  return (
    <div className="min-h-screen bg-white text-green-900 flex items-center justify-center px-4">
      <div className="flex w-full max-w-5xl items-center justify-between gap-10 py-16">
        <div className="flex-1">
          <h1 className="text-6xl font-extrabold text-green-800 mb-4">
            Join TouchGrass
          </h1>
          <p className="text-xl max-w-md">
            Create an account so you could find new friends to touch grass with!
          </p>
        </div>

        <div className="w-full max-w-sm bg-white border border-green-800 p-6 rounded shadow">
          <div className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Username"
              className="w-full border border-green-700 px-3 py-2 text-sm focus:outline-none"
              onChange={(e) => setUsername(e.target.value)}
            />

            <input
              type="password"
              placeholder="Password"
              className="w-full border border-green-700 px-3 py-2 text-sm focus:outline-none"
              onChange={(e) => setPassword(e.target.value)}
            />

            <input
              type="password"
              placeholder="Confirm Password"
              className="w-full border border-green-700 px-3 py-2 text-sm focus:outline-none"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            <button
              className="w-full border border-green-700 bg-green-700 text-white py-2 text-sm font-bold hover:bg-white hover:text-green-700 transition"
              onClick={handleRegister}
            >
              Register Now!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
