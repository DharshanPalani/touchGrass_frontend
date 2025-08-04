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
      <div className="min-h-screen bg-[#f0f2f5] p-6">
        <p className="text-center text-gray-700">Profile not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f0f2f5] px-6 py-10 text-black">
      <div className="mx-auto max-w-2xl space-y-8">
        <div className="flex items-center gap-6">
          <div className="h-24 w-24 rounded-full bg-gray-400" />
          <div>
            <p className="text-2xl font-medium text-gray-800">
              @{profileData?.username}
            </p>
            {profileData?.canEdit && (
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="mt-1 text-sm text-blue-600 underline hover:text-blue-700"
              >
                {isEditing ? "Cancel" : "Edit"}
              </button>
            )}
          </div>
        </div>

        <div className="flex flex-wrap gap-6">
          <div className="flex w-48 flex-col">
            <label className="mb-1 text-xs text-gray-600">First Name</label>
            <input
              type="text"
              value={profileData?.firstName || ""}
              onChange={(e) => handleChange("firstName", e.target.value)}
              disabled={!isEditing}
              className="rounded border border-gray-300 bg-white p-1 text-sm focus:outline-none"
            />
          </div>
          <div className="flex w-48 flex-col">
            <label className="mb-1 text-xs text-gray-600">Last Name</label>
            <input
              type="text"
              value={profileData?.lastName || ""}
              onChange={(e) => handleChange("lastName", e.target.value)}
              disabled={!isEditing}
              className="rounded border border-gray-300 bg-white p-1 text-sm focus:outline-none"
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-6">
          <div className="flex w-48 flex-col">
            <label className="mb-1 text-xs text-gray-600">Age</label>
            <input
              type="number"
              value={profileData?.age || ""}
              onChange={(e) => handleChange("age", parseInt(e.target.value))}
              disabled={!isEditing}
              className="rounded border border-gray-300 bg-white p-1 text-sm focus:outline-none"
            />
          </div>
          <div className="flex w-48 flex-col">
            <label className="mb-1 text-xs text-gray-600">Course</label>
            <input
              type="text"
              value={profileData?.course || ""}
              onChange={(e) => handleChange("course", e.target.value)}
              disabled={!isEditing}
              className="rounded border border-gray-300 bg-white p-1 text-sm focus:outline-none"
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-6">
          <div className="flex w-48 flex-col">
            <label className="mb-1 text-xs text-gray-600">Interested In</label>
            <input
              type="text"
              value={profileData?.interested || ""}
              onChange={(e) => handleChange("interested", e.target.value)}
              disabled={!isEditing}
              className="rounded border border-gray-300 bg-white p-1 text-sm focus:outline-none"
            />
          </div>
          <div className="flex w-48 flex-col">
            <label className="mb-1 text-xs text-gray-600">
              Relationship Status
            </label>
            <input
              type="text"
              value={profileData?.relationship || ""}
              onChange={(e) => handleChange("relationship", e.target.value)}
              disabled={!isEditing}
              className="rounded border border-gray-300 bg-white p-1 text-sm focus:outline-none"
            />
          </div>
        </div>

        <div className="flex flex-col">
          <label className="mb-1 text-xs text-gray-600">Bio</label>
          <textarea
            value={profileData?.bio || ""}
            onChange={(e) => handleChange("bio", e.target.value)}
            disabled={!isEditing}
            className="rounded border border-gray-300 bg-white p-2 text-sm focus:outline-none"
            rows={3}
          />
        </div>

        {isEditing && (
          <button
            onClick={handleProfileEdit}
            className="border border-gray-500 bg-gray-200 px-4 py-1 text-sm text-gray-800 hover:bg-gray-300"
          >
            Save Changes
          </button>
        )}
      </div>
    </div>
  );
}

export default Profile;
