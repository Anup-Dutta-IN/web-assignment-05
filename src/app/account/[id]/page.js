"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { AiOutlineClose } from "react-icons/ai";

export default function AccountViewPage() {
  const params = useParams();
  const userId = params.id;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // User data state
  const [userData, setUserData] = useState(null);

  // Modal states
  const [showUsernameModal, setShowUsernameModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);

  // Form states
  const [usernameForm, setUsernameForm] = useState({
    oldUsername: "",
    newUsername: "",
  });

  const [passwordForm, setPasswordForm] = useState({
    newPassword: "",
    confirmNewPassword: "",
  });

  const [imageForm, setImageForm] = useState({
    oldImageUrl: "",
    newImageUrl: "",
  });

  // Fetch user data on mount
  useEffect(() => {
    async function fetchUserData() {
      try {
        setLoading(true);
        const res = await fetch(`/api/profile/fetch/${userId}`);
        const data = await res.json();

        if (!res.ok) throw new Error(data.message);

        setUserData(data.user);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    if (userId) {
      fetchUserData();
    }
  }, [userId]);

  // Handle Username Modal
  const handleUsernameEdit = () => {
    setUsernameForm({
      oldUsername: userData.username,
      newUsername: "",
    });
    setShowUsernameModal(true);
  };

  // Handle Password Modal
  const handlePasswordEdit = () => {
    setPasswordForm({
      newPassword: "",
      confirmNewPassword: "",
    });
    setShowPasswordModal(true);
  };

  // Handle Image Modal
  const handleImageEdit = () => {
    setImageForm({
      oldImageUrl: userData.profileImage || "",
      newImageUrl: "",
    });
    setShowImageModal(true);
  };

  // Update Username
  async function handleUpdateUsername() {
    setError("");
    setSuccess("");

    if (!usernameForm.newUsername) {
      setError("Username is required");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("/api/profile/edit", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: userData._id,
          username: usernameForm.newUsername,
          profileImage: userData.profileImage,
        }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message);

      setUserData(data.user);
      setSuccess("Username updated successfully!");
      setShowUsernameModal(false);
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  // Update Password
  async function handleUpdatePassword() {
    setError("");
    setSuccess("");

    if (!passwordForm.newPassword) {
      setError("Password is required");
      return;
    }

    if (passwordForm.newPassword !== passwordForm.confirmNewPassword) {
      setError("Passwords do not match");
      return;
    }

    if (passwordForm.newPassword.length < 4) {
      setError("Password must be at least 4 characters");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("/api/profile/edit", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: userData._id,
          username: userData.username,
          profileImage: userData.profileImage,
          password: passwordForm.newPassword,
        }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message);

      setUserData(data.user);
      setSuccess("Password updated successfully!");
      setShowPasswordModal(false);
      setPasswordForm({ newPassword: "", confirmNewPassword: "" });
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  // Update Profile Image
  async function handleUpdateImage() {
    setError("");
    setSuccess("");

    if (!imageForm.newImageUrl) {
      setError("Image URL is required");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("/api/profile/edit", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: userData._id,
          username: userData.username,
          profileImage: imageForm.newImageUrl,
        }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message);

      setUserData(data.user);
      setSuccess("Profile image updated successfully!");
      setShowImageModal(false);
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  if (loading && !userData) {
    return (
      <section className="flex min-h-screen justify-center items-center bg-white">
        <p className="text-lg">Loading...</p>
      </section>
    );
  }

  if (!userData) {
    return (
      <section className="flex min-h-screen justify-center items-center bg-white">
        <p className="text-lg text-red-600">User not found</p>
      </section>
    );
  }

  return (
    <section className="flex min-h-screen justify-center items-center bg-white p-4">
      <div className="w-full max-w-10xl p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <h1 className=" md:hidden text-2xl font-bold">My Account</h1>
          </div>
        </div>

        {error && (
          <p className="text-red-600 text-sm mb-3 text-center bg-red-50 p-2 rounded">
            {error}
          </p>
        )}

        {success && (
          <p className="text-green-600 text-sm mb-3 text-center bg-green-50 p-2 rounded">
            {success}
          </p>
        )}

        {/* USERNAME MODAL */}
        {showUsernameModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
            <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-md relative">
              <button
                onClick={() => setShowUsernameModal(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              >
                <AiOutlineClose className="cursor-pointer" size={24} />
              </button>

              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Change Username
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-600">
                    Old Username
                  </label>
                  <input
                    type="text"
                    value={usernameForm.oldUsername}
                    disabled
                    className="w-full mt-1 px-3 py-3 rounded-md bg-gray-100 text-gray-700"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-600">
                    New Username
                  </label>
                  <input
                    type="text"
                    value={usernameForm.newUsername}
                    onChange={(e) =>
                      setUsernameForm({
                        ...usernameForm,
                        newUsername: e.target.value,
                      })
                    }
                    placeholder="Enter new username"
                    className="w-full mt-1 px-3 py-3 rounded-md border border-gray-300 focus:border-blue-400 focus:ring-2 focus:ring-blue-200"
                  />
                </div>

                <button
                  onClick={handleUpdateUsername}
                  disabled={loading || !usernameForm.newUsername}
                  className="w-full bg-blue-500 text-white py-3 rounded-lg cursor-pointer mt-4 transition hover:bg-blue-600 disabled:bg-gray-400"
                >
                  {loading ? "Updating..." : "UPDATE"}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* PASSWORD MODAL */}
        {showPasswordModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
            <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-md relative">
              <button
                onClick={() => setShowPasswordModal(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              >
                <AiOutlineClose className="cursor-pointer" size={24} />
              </button>

              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Change Password
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-600">
                    New Password
                  </label>
                  <input
                    type="password"
                    value={passwordForm.newPassword}
                    onChange={(e) =>
                      setPasswordForm({
                        ...passwordForm,
                        newPassword: e.target.value,
                      })
                    }
                    placeholder="Enter new password"
                    className="w-full mt-1 px-3 py-3 rounded-md border border-gray-300 focus:border-blue-400 focus:ring-2 focus:ring-blue-200"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-600">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    value={passwordForm.confirmNewPassword}
                    onChange={(e) =>
                      setPasswordForm({
                        ...passwordForm,
                        confirmNewPassword: e.target.value,
                      })
                    }
                    placeholder="Confirm new password"
                    className="w-full mt-1 px-3 py-3 rounded-md border border-gray-300 focus:border-blue-400 focus:ring-2 focus:ring-blue-200"
                  />
                </div>

                <button
                  onClick={handleUpdatePassword}
                  disabled={loading || !passwordForm.newPassword}
                  className="w-full bg-blue-500 text-white py-3 rounded-lg cursor-pointer mt-4 transition hover:bg-blue-600 disabled:bg-gray-400"
                >
                  {loading ? "Updating..." : "UPDATE"}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* PROFILE IMAGE MODAL */}
        {showImageModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
            <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-md relative">
              <button
                onClick={() => setShowImageModal(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              >
                <AiOutlineClose className="cursor-pointer" size={24} />
              </button>

              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Change Profile Image
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-600">
                    Old Image Link
                  </label>
                  <input
                    type="text"
                    value={imageForm.oldImageUrl}
                    disabled
                    className="w-full mt-1 px-3 py-3 rounded-md bg-gray-100 text-gray-700 break-all"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-600">
                    New Image Link
                  </label>
                  <input
                    type="text"
                    value={imageForm.newImageUrl}
                    onChange={(e) =>
                      setImageForm({
                        ...imageForm,
                        newImageUrl: e.target.value,
                      })
                    }
                    placeholder="Enter new image URL"
                    className="w-full mt-1 px-3 py-3 rounded-md border border-gray-300 focus:border-blue-400 focus:ring-2 focus:ring-blue-200"
                  />
                </div>

                <button
                  onClick={handleUpdateImage}
                  disabled={loading || !imageForm.newImageUrl}
                  className="w-full bg-blue-500 text-white py-3 rounded-lg cursor-pointer mt-4 transition hover:bg-blue-600 disabled:bg-gray-400"
                >
                  {loading ? "Updating..." : "UPDATE"}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* View Mode */}
        <div className="space-y-4">
          {/* Profile Image */}
          <div className="flex flex-col items-center mb-4">
            {userData.profileImage ? (
              <img
                src={userData.profileImage}
                alt="Profile"
                className="w-32 h-32 object-cover rounded-full border-4 border-gray-300"
              />
            ) : (
              <div className="w-32 h-32 bg-gray-300 rounded-full flex items-center justify-center">
                <span className="text-4xl text-gray-600">
                  {userData.username.charAt(0).toUpperCase()}
                </span>
              </div>
            )}
            <button
              onClick={handleImageEdit}
              className="text-blue-600 text-sm underline cursor-pointer hover:text-blue-700 mt-2"
            >
              Change it
            </button>
          </div>

          {/* Username */}
          <div className="bg-white p-4 rounded">
            <label className="block text-sm font-semibold text-gray-600 mb-1">
              Username
            </label>
            <div className="flex items-center justify-between">
              <p className="text-lg">{userData.username}</p>
              <button
                onClick={handleUsernameEdit}
                className="text-blue-600 text-sm cursor-pointer underline hover:text-blue-700"
              >
                Change it
              </button>
            </div>
          </div>

          {/* Password */}
          <div className="bg-white p-4 rounded">
            <label className="block text-sm font-semibold text-gray-600 mb-1">
              Password
            </label>
            <div className="flex items-center justify-between">
              <p className="text-lg">••••••••</p>
              <button
                onClick={handlePasswordEdit}
                className="text-blue-600 text-sm cursor-pointer underline hover:text-blue-700"
              >
                Change it
              </button>
            </div>
          </div>

          {/* Role */}
          <div className="bg-white p-4 rounded">
            <label className="block text-sm font-semibold text-gray-600 mb-1">
              Role
            </label>
            <p className="text-lg capitalize">{userData.role}</p>
          </div>

          {/* Account Created */}
          <div className="bg-white p-4 rounded">
            <label className="block text-sm font-semibold text-gray-600 mb-1">
              Account Created
            </label>
            <p className="text-sm">
              {new Date(userData.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}