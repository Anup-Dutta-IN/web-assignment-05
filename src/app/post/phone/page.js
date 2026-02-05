"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function AccountPage() {
  const router = useRouter();
  const [verifyUsername, setVerifyUsername] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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

      // Store credentials in localStorage
      localStorage.setItem("assignment.onetan.in.Username", verifyUsername);
      localStorage.setItem("assignment.onetan.in.Password", verifyPassword);

      // Redirect to view page with user ID
      router.push(`/post/create/${data.user._id}`);
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
    setError("");
  };

  return (
    <>
      {/* FORM JUST BELOW HEADER */}
      <section className="bg-white px-8 pt-55 pb-20 relative min-h-screen">
        <h2 className="text-2xl font-bold mb-6">Verify Account</h2>

        <form onSubmit={handleVerify} className="w-full">
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
            className="w-full p-3 border rounded mb-4"
          />

          <input
            type="password"
            placeholder="Password"
            value={verifyPassword}
            onChange={(e) => setVerifyPassword(e.target.value)}
            className="w-full p-3 border rounded mb-4"
          />

          {/* Create A New Account Link */}
          <div className="mb-4">
            <button
              type="button"
              onClick={() => router.push("/auth/register")}
              className="text-blue-600 hover:text-blue-800 text-sm underline"
            >
              Create A New Account
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-3 rounded"
          >
            {loading ? "Verifying..." : "Verify"}
          </button>
        </form>

        {/* Clear Cache Button */}
        <div className="mt-10 w-full flex justify-center">
          <button
            type="button"
            onClick={handleClearCache}
            className="px-4 py-2 text-sm text-red-600 border border-red-600 rounded hover:bg-red-50 transition"
          >
            Clear Cache
          </button>
        </div>
      </section>
    </>
  );
}
