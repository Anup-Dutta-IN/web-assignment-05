"use client";

import { useState } from "react";

export default function CreatePostPage({ params }) {
  const userId = params?.id; // ← GET USER ID FROM URL

  const [message, setMessage] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const MAX_CHARS = 280;

  const handleSubmit = async () => {
    setError("");

    if (!message.trim()) {
      setError("Message is required");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("/api/post/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,        // ⭐ SEND USER ID
          message,
          imageUrl,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to create post");
      }

      // reset
      setMessage("");
      setImageUrl("");

      alert("Post uploaded 🚀");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center">
      <div className="w-full max-w-10xl bg-white p-6 mt-6">

        {/* MESSAGE */}
        <textarea
          placeholder="What's on your mind?"
          value={message}
          onChange={(e) => {
            if (e.target.value.length <= MAX_CHARS) {
              setMessage(e.target.value);
            }
          }}
          className="w-full text-lg outline-none resize-none"
          rows={4}
        />

        <div className="text-sm text-zinc-500 text-right mt-1">
          {MAX_CHARS - message.length} characters remaining
        </div>

        {/* IMAGE URL */}
        <input
          type="text"
          placeholder="Optional image link"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          className="w-full mt-4 p-3 border rounded"
        />

        {/* IMAGE PREVIEW */}
        {imageUrl && (
          <img
            src={imageUrl}
            alt="Preview"
            className="w-full mt-4 rounded-lg object-cover"
          />
        )}

        {/* ERROR */}
        {error && (
          <p className="text-red-600 text-sm mt-4">
            {error}
          </p>
        )}

        {/* BUTTON */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className={`w-full mt-6 py-3 rounded text-white ${
            loading
              ? "bg-zinc-400 cursor-not-allowed"
              : "bg-black hover:bg-zinc-800"
          }`}
        >
          {loading ? "Posting..." : "POST"}
        </button>
      </div>
    </div>
  );
}
