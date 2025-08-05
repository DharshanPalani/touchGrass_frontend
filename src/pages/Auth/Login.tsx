import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { api } from "../../utils/api";

function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (username !== "" && password !== "") {
      api
        .post("/login", { username, password }, { withCredentials: true })
        .then(() => {
          alert("Login successful");
          navigate("/");
        })
        .catch((err: any) => {
          console.error(err);
          alert("Login failure");
        });
    }
  };

  return (
    <div className="min-h-screen bg-white text-green-900 flex items-center justify-center px-4">
      <div className="flex w-full max-w-5xl items-center justify-between gap-10 py-16">
        <div className="flex-1">
          <h1 className="text-6xl font-extrabold text-green-800 mb-4">
            TouchGrass
          </h1>
          <p className="text-xl max-w-md">
            Find friends to touch grass with only on TouchGrass
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

            <button
              className="w-full border border-green-700 bg-green-700 text-white py-2 text-sm font-bold hover:bg-white hover:text-green-700 transition"
              onClick={handleLogin}
            >
              Log In
            </button>

            <span className="text-center text-sm text-green-800 cursor-pointer hover:underline">
              Forgot password?
            </span>

            <hr className="my-2 border-green-400" />

            <a
              href="/register"
              className="w-fit mx-auto px-4 py-2 border border-green-700 text-green-700 font-semibold text-sm hover:bg-green-700 hover:text-white transition"
            >
              Create new account
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
