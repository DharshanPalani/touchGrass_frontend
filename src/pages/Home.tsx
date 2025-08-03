import { useEffect, useState } from "react";
import { api } from "../utils/api";
import { useNavigate } from "react-router-dom";

type UserProfile = {
  username: string;
  id: string;
};

function Home() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    api.get("/me", { withCredentials: true }).then((res: any) => {
      setUser(res.data.user);
    });
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-amber-950 text-center p-6">
      <h1 className="text-4xl font-bold text-gray-100 mb-4">
        Welcome to Touch grass
      </h1>
      <h3 className="text-2xl text-gray-300">
        Touch Grass Online, {user?.username}
      </h3>
      <button className="border-2 w-20 p-5 mx-auto mt-4 text-white">
        Logout
      </button>
    </div>
  );
}

export default Home;
