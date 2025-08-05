import { useEffect, useState } from "react";
import { api } from "../utils/api";
import { useParams } from "react-router-dom";

type UserData = {
  username: string;
  firstName: string;
  lastName: string;
  age: number;
  course: string;
  interested: string;
  relationship: string;
  bio: string;
  canEdit: boolean;
};

function Profile() {
  const { username } = useParams();
  const [profileData, setProfileData] = useState<UserData | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    api
      .get(`/user/${username}`, { withCredentials: true })
      .then((res: any) => {
        if (!res.data || !res.data.username) {
          setNotFound(true);
        } else {
          setProfileData(res.data);
        }
      })
      .catch(() => {
        setNotFound(true);
      });
  }, [username]);

  const handleProfileEdit = () => {
    console.log("Edited profile data:", profileData);
  };

  const handleChange = (key: keyof UserData, value: string | number) => {
    if (!profileData) return;
    setProfileData({ ...profileData, [key]: value });
  };

  if (notFound) {
    return (
      <div className="min-h-screen bg-white p-6 font-sans text-green-900">
        <p className="text-center text-lg font-bold text-green-700">
          Profile not found.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white p-6 font-sans text-green-900">
      <div className="mx-auto w-[700px] border border-green-700 p-6">
        <div className="mb-6 flex items-center border-b border-green-700 pb-4">
          <div className="h-16 w-16 bg-green-700" />
          <div className="ml-4">
            <p className="text-lg font-bold text-green-900">
              @{profileData?.username}
            </p>
            {profileData?.canEdit && (
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="mt-1 text-sm font-bold text-green-700 underline"
              >
                {isEditing ? "Cancel" : "Edit"}
              </button>
            )}
          </div>
        </div>

        <div className="mb-4 grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-bold text-green-800">
              First Name
            </label>
            <input
              type="text"
              value={profileData?.firstName || ""}
              onChange={(e) => handleChange("firstName", e.target.value)}
              disabled={!isEditing}
              className="w-full border border-green-700 p-1 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-green-800">
              Last Name
            </label>
            <input
              type="text"
              value={profileData?.lastName || ""}
              onChange={(e) => handleChange("lastName", e.target.value)}
              disabled={!isEditing}
              className="w-full border border-green-700 p-1 text-sm"
            />
          </div>
        </div>

        <div className="mb-4 grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-bold text-green-800">
              Age
            </label>
            <input
              type="number"
              value={profileData?.age || ""}
              onChange={(e) => handleChange("age", parseInt(e.target.value))}
              disabled={!isEditing}
              className="w-full border border-green-700 p-1 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-green-800">
              Course
            </label>
            <input
              type="text"
              value={profileData?.course || ""}
              onChange={(e) => handleChange("course", e.target.value)}
              disabled={!isEditing}
              className="w-full border border-green-700 p-1 text-sm"
            />
          </div>
        </div>

        <div className="mb-4 grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-bold text-green-800">
              Interested In
            </label>
            <input
              type="text"
              value={profileData?.interested || ""}
              onChange={(e) => handleChange("interested", e.target.value)}
              disabled={!isEditing}
              className="w-full border border-green-700 p-1 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-green-800">
              Relationship Status
            </label>
            <input
              type="text"
              value={profileData?.relationship || ""}
              onChange={(e) => handleChange("relationship", e.target.value)}
              disabled={!isEditing}
              className="w-full border border-green-700 p-1 text-sm"
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-bold text-green-800">Bio</label>
          <textarea
            value={profileData?.bio || ""}
            onChange={(e) => handleChange("bio", e.target.value)}
            disabled={!isEditing}
            className="w-full border border-green-700 p-2 text-sm"
            rows={4}
          />
        </div>

        {isEditing && (
          <button
            onClick={handleProfileEdit}
            className="mt-2 border border-green-700 bg-green-100 px-4 py-1 text-sm font-bold text-green-900"
          >
            Save Changes
          </button>
        )}
      </div>
    </div>
  );
}

export default Profile;
