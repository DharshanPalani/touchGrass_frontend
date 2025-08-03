import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../utils/api";

function Register() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = () => {
    if (username != "" && password == confirmPassword) {
      api
        .post(
          "/register",
          { username: username, password: password },
          { withCredentials: true }
        )
        .then((res: any) => {
          alert("Register successfully");
          navigate("/login");
        })
        .catch((err: any) => {
          console.log(err);
          alert("Register failure");
        });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center bg-amber-900 min-h-screen text-white">
      <h1 className="text-4xl font-bold mb-10">Register</h1>

      <div className="flex flex-col w-full max-w-sm gap-8">
        <input
          type="text"
          placeholder="Username"
          className="w-full border-b border-white bg-transparent text-white placeholder-white focus:outline-none focus:border-amber-400"
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border-b border-white bg-transparent text-white placeholder-white focus:outline-none focus:border-amber-400"
          onChange={(e) => setPassword(e.target.value)}
        />

        <input
          type="confirm_password"
          placeholder="Confirm password"
          className="w-full border-b border-white bg-transparent text-white placeholder-white focus:outline-none focus:border-amber-400"
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <button
          className="w-full border border-white text-white rounded-md hover:border-amber-400 hover:text-amber-200 transition"
          onClick={() => handleRegister()}
        >
          Register Now!
        </button>
      </div>
    </div>
  );
}

export default Register;
