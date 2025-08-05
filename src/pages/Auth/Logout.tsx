import { useEffect, useRef } from "react";
import { api } from "../../utils/api";
import { useNavigate } from "react-router-dom";

function Logout() {
  const navigate = useNavigate();
  const hasConfirmed = useRef(false);

  const handleLogout = () => {
    api.post("/logout", {}, { withCredentials: true }).then(() => {
      navigate("/login");
    });
  };

  useEffect(() => {
    if (hasConfirmed.current) return;
    hasConfirmed.current = true;

    const confirmLogout = confirm(
      "Are you sure you want to logout to touch grass?"
    );
    if (confirmLogout) {
      handleLogout();
    } else {
      navigate("/");
    }
  }, []);

  return null;
}

export default Logout;
