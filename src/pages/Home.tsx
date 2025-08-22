import { useEffect, useState } from "react";
import { api } from "../utils/api";
import { useNavigate } from "react-router-dom";

type UserProfile = {
  username: string;
  id: string;
};

function Home() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [searchUser, setSearchUser] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get("/me", { withCredentials: true })
      .then((res: any) => {
        setUser(res.data.user);
      })
      .catch(() => {
        navigate("/login");
      });
  }, [navigate]);

  const handleSearch = () => {
    navigate("/" + searchUser);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white text-center p-6">
      <h1 className="text-4xl font-bold text-green-700 mb-4 border-b border-green-700 pb-2 w-full max-w-md">
        Welcome to Touch Grass
      </h1>
      <h3 className="text-xl text-green-800 mb-6">
        Search for someone, {user?.username}
      </h3>
      <input
        type="text"
        placeholder="Search users you wanna touch grass with"
        className="w-full max-w-md border border-green-700 p-3 text-green-900 text-sm rounded-none focus:outline-none"
        onChange={(e: any) => {
          setSearchUser(e.target.value);
        }}
      />
      <input
        type="button"
        className=" border border-green-700"
        value="SEARCH"
        onClick={() => handleSearch()}
      />
    </div>
  );
}

export default Home;
