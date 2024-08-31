import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import NavBar from "../majorComponents/Home/NavBar";

interface UpdateProfileProps {
  onProfileUpdateSuccess: (message: string) => void;
  onPasswordChangeSuccess: (message: string) => void;
}

const Update: React.FC<UpdateProfileProps> = ({
  onProfileUpdateSuccess,
  onPasswordChangeSuccess,
}) => {
  const BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;

  const [profileData, setProfileData] = useState({
    userName: "",
    fullName: "",
    email: "",
  });

  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
  };

  const handleSubmitProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("accessToken");
    setLoading(true);
    setError(null);
    try {
      const response = await axios.put(
        BASE_URL + "/users/profile",
        profileData,
        {
          headers: { Authorization: "Bearer " + token },
        }
      );
      onProfileUpdateSuccess(response.data.message);
    } catch (err: unknown) {
      toast.error("Failed to update profile", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const token = localStorage.getItem("accessToken");

    try {
      const response = await axios.post(
        BASE_URL + "/users/profile",
        passwordData,
        {
          headers: { Authorization: "Bearer " + token },
        }
      );
      onPasswordChangeSuccess(response.data.message);
    } catch (err: unknown) {
      //   console.log(err.response?.data?.message);
      toast.error("Failed to change password", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <NavBar />
      <div className="p-4 lg:w-[50%] lg:flex lg:justify-center lg:flex-col lg:m-auto lg:border-2 lg:p-8 lg:rounded-xl lg:shadow-md">
        <h2 className="text-xl font-bold mb-4">Update Profile</h2>
        {error && <p className="text-red-500">{error}</p>}

        <form onSubmit={handleSubmitProfile} className="mb-6">
          <div className="mb-4">
            <label
              htmlFor="fullName"
              className="block text-sm font-medium text-gray-700"
            >
              Full Name
            </label>
            <input
              type="text"
              name="fullName"
              id="fullName"
              value={profileData.fullName}
              onChange={handleProfileChange}
              className="mt-1 block w-full p-2 border rounded"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={profileData.email}
              onChange={handleProfileChange}
              className="mt-1 block w-full p-2 border rounded"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="userName"
              className="block text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <input
              type="text"
              name="userName"
              id="userName"
              value={profileData.userName}
              onChange={handleProfileChange}
              className="mt-1 block w-full p-2 border rounded"
            />
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            disabled={loading}
          >
            {loading ? "Updating..." : "Update Profile"}
          </button>
        </form>

        <h2 className="text-xl font-bold mb-4">Change Password</h2>
        <form onSubmit={handleSubmitPassword}>
          <div className="mb-4">
            <label
              htmlFor="oldPassword"
              className="block text-sm font-medium text-gray-700"
            >
              Old Password
            </label>
            <input
              type="password"
              name="oldPassword"
              id="oldPassword"
              value={passwordData.oldPassword}
              onChange={handlePasswordChange}
              className="mt-1 block w-full p-2 border rounded"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="newPassword"
              className="block text-sm font-medium text-gray-700"
            >
              New Password
            </label>
            <input
              type="password"
              name="newPassword"
              id="newPassword"
              value={passwordData.newPassword}
              onChange={handlePasswordChange}
              className="mt-1 block w-full p-2 border rounded"
            />
          </div>

          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            disabled={loading}
          >
            {loading ? "Changing Password..." : "Change Password"}
          </button>
        </form>
      </div>
    </>
  );
};

export default Update;
