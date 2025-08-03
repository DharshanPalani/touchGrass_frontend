import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { api } from "../../utils/api";

function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (username != "" && password != "") {
      api
        .post(
          "/login",
          { username: username, password: password },
          { withCredentials: true }
        )
        .then((res: any) => {
          alert("Login successful");
          navigate("/");
        })
        .catch((err: any) => {
          console.error(err);
          alert("Login failuer");
        });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center bg-amber-900 min-h-screen text-white">
      <h1 className="text-4xl font-bold mb-10">Login</h1>

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

        <button
          className="w-full border border-white text-white rounded-md hover:border-amber-400 hover:text-amber-200 transition"
          onClick={() => handleLogin()}
        >
          Login
        </button>
      </div>
    </div>
  );
}

export default Login;
