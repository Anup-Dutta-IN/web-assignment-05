"use client";

import { useState } from "react";
import { useParams } from "next/navigation";

export default function CreatePostPage() {
  const params = useParams();
  const userId = params?.id; // ✅ Correct way in Next 16

  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    setError("");

    if (!imageUrl.trim()) {
      setError("Image link is required");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("/api/gallery/upload", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          imageUrl,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Upload failed");
      }

      setImageUrl("");
      alert("Image added to gallery 🚀");

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center">
      <div className="w-full max-w-10xl bg-white p-6 mt-10">

        <h1 className="text-2xl font-semibold mb-4">Upload Image</h1>

        <input
          type="text"
          placeholder="Paste image URL..."
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          className="w-full p-3 border rounded-lg"
        />

        {imageUrl && (
          <img
            src={imageUrl}
            alt="Preview"
            className="w-full mt-5 rounded-lg object-cover max-h-[400px]"
          />
        )}

        {error && (
          <p className="text-red-600 text-sm mt-4">{error}</p>
        )}

        <button
          onClick={handleSubmit}
          disabled={loading}
          className={`w-full mt-6 py-3 rounded text-white ${
            loading
              ? "bg-zinc-400 cursor-not-allowed"
              : "bg-black hover:bg-zinc-800"
          }`}
        >
          {loading ? "Uploading..." : "UPLOAD"}
        </button>

      </div>
    </div>
  );
}
