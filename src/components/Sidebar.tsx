import { api } from "../utils/api";
import { useNavigate } from "react-router-dom";

function Sidebar() {
  const navigator = useNavigate();

  const handleMyProfile = () => {
    api.get("/me", { withCredentials: true }).then((res: any) => {
      navigator("/" + res.data.user.username);
    });
  };

  return (
    <aside className="h-screen w-56 bg-green-700 text-white font-sans">
      <div className="flex h-full flex-col items-center justify-center space-y-6 text-base font-bold">
        <a href="/friends" className="hover:underline">
          My Friends
        </a>
        <a href="/settings" className="hover:underline">
          My Settings
        </a>
        <button onClick={handleMyProfile} className="hover:underline">
          My Profile
        </button>
        <a href="/logout" className="hover:underline">
          Logout
        </a>
      </div>
    </aside>
  );
}

export default Sidebar;
