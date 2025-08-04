import { useEffect, useState } from "react";
import { api } from "../utils/api";
import { useParams } from "react-router-dom";

type UserData = {
  username: string;
  canEdit: boolean;
};

function Profile() {
  const { username } = useParams();
  const [profileData, setProfileData] = useState<UserData | null>(null);

  useEffect(() => {
    api.get(`/user/${username}`, { withCredentials: true }).then((res: any) => {
      setProfileData(res.data);
    });
  }, [username]);

  return (
    <div>
      <input value={profileData?.username} />
      {profileData?.canEdit ? <button>Edit</button> : <p></p>}
    </div>
  );
}

export default Profile;
