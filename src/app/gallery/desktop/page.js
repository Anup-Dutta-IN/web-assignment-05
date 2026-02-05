"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";

// Dynamic import without SSR
const AccountViewComponent = dynamic(
  () => import("@/app/gallery/create/view/[id]/page"),
  { ssr: false }
);

export default function AccountPage() {
  const router = useRouter();
  const [verifyUsername, setVerifyUsername] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [userId, setUserId] = useState("");
  const [userProfileImage, setUserProfileImage] = useState("");

  // Load credentials from localStorage on mount
  useEffect(() => {
    const storedUsername = localStorage.getItem("assignment.onetan.in.Username");
    const storedPassword = localStorage.getItem("assignment.onetan.in.Password");
    
    if (storedUsername) setVerifyUsername(storedUsername);
    if (storedPassword) setVerifyPassword(storedPassword);
  }, []);

  // Verify user
  async function handleVerify(e) {
    e.preventDefault();
    setError("");

    if (!verifyUsername || !verifyPassword) {
      setError("Please enter username and password");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch("/api/profile/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: verifyUsername,
          password: verifyPassword,
        }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message);

      // Set user data after successful verification
      setIsVerified(true);
      setUserId(data.user._id);
      setUserProfileImage(data.user.profileImage);
      setError("");

      // Store credentials in localStorage
      localStorage.setItem("assignment.onetan.in.Username", verifyUsername);
      localStorage.setItem("assignment.onetan.in.Password", verifyPassword);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  // Clear Cache handler
  const handleClearCache = () => {
    localStorage.removeItem("assignment.onetan.in.Username");
    localStorage.removeItem("assignment.onetan.in.Password");
    setVerifyUsername("");
    setVerifyPassword("");
    setIsVerified(false);
    setUserId("");
    setUserProfileImage("");
    setError("");
  };

  return (
      <div className="min-h-screen bg-zinc-100 flex justify-center">
        <div className="w-full max-w-10xl bg-white min-h-screen flex">
          
          {/* LEFT SECTION - 70% */}
          <div className="w-[70%] pb-20 px-8 py-10 border-r border-zinc-200 overflow-y-auto h-screen">
            {!isVerified ? (
              <div className="flex items-center justify-center h-full">
                <p className="text-zinc-400 text-xl">
                  Please verify your account to view profile
                </p>
              </div>
            ) : (
              <AccountViewComponent params={{ id: userId }} />
            )}
          </div>

          {/* RIGHT SECTION - 30% */}
          <div className="w-[30%] px-8 py-10 overflow-hidden relative">
            {!isVerified ? (
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-center gap-2">
                  <h2 className="text-2xl font-bold mb-6">Verify Account</h2>
                </div>

                {error && (
                  <p className="text-red-600 text-sm mb-3 text-center bg-red-50 p-2 rounded">
                    {error}
                  </p>
                )}

                <input
                  type="text"
                  placeholder="Username"
                  value={verifyUsername}
                  onChange={(e) => setVerifyUsername(e.target.value)}
                  className="w-full mb-3 px-3 py-2 bg-black/10 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
                />

                <input
                  type="password"
                  placeholder="Password"
                  value={verifyPassword}
                  onChange={(e) => setVerifyPassword(e.target.value)}
                  className="w-full mb-4 px-3 py-2 bg-black/10 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
                />

                {/* Create A New Account Link */}
                <div className="mb-4">
                  <button
                    onClick={() => router.push("/auth/register")}
                    className="text-blue-600 hover:text-blue-800 text-sm underline"
                  >
                    Create A New Account
                  </button>
                </div>

                <button
                  onClick={handleVerify}
                  disabled={loading}
                  className="w-full bg-black text-white py-2 rounded disabled:opacity-50"
                >
                  {loading ? "Verifying..." : "Verify"}
                </button>
              </div>
            ) : (
              <div className="flex flex-col items-center h-full">
                <h2 className="text-2xl font-bold mb-6">User Info</h2>

                {/* Profile Image */}
                {userProfileImage && (
                  <img
                    src={userProfileImage}
                    alt="Profile"
                    className="w-32 h-32 rounded-full object-cover mb-4 border-2 border-zinc-300"
                  />
                )}

                {/* User ID */}
                <div className="w-full bg-zinc-100 p-4 rounded mb-4">
                  <p className="text-sm text-zinc-600 mb-1">User ID:</p>
                  <p className="text-sm font-mono break-all">{userId}</p>
                </div>

                <div className="w-full bg-green-50 border border-green-200 p-3 rounded">
                  <p className="text-green-700 text-sm text-center">
                    ✓ Verified
                  </p>
                </div>

                {/* Clear Cache Button - Bottom Right */}
                <div className="mt-10 w-full flex justify-center">
                  <button
                    onClick={handleClearCache}
                    className="px-4 py-2 text-sm text-red-600 border border-red-600 rounded hover:bg-red-50 transition"
                  >
                    Clear Cache
                  </button>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
  );
}