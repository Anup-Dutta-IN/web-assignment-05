"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function GalleryViewPage() {
  const params = useParams();
  const userId = params.id; // ✅ SAFE

  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(null);
  const [error, setError] = useState("");

  // Fetch user gallery
  useEffect(() => {
    if (!userId) return;

    async function fetchGallery() {
      try {
        const res = await fetch(`/api/gallery/fetch/?userId=${userId}`);
        const data = await res.json();

        if (!res.ok) throw new Error(data.message || "Failed to load gallery");

        setImages(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchGallery();
  }, [userId]);

  // Delete image
  async function handleDelete() {
    if (!activeImage) return;

    try {
      const res = await fetch("/api/gallery/delete", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          imageId: activeImage._id,
          userId: userId,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Delete failed");

      setImages((prev) =>
        prev.filter((img) => img._id !== activeImage._id)
      );

      setActiveImage(null);
    } catch (err) {
      alert(err.message);
    }
  }

  if (loading) {
    return <p className="text-center text-zinc-400">Loading gallery...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <div>
      <h2 className="text-2xl py-10 font-bold">Your Gallery</h2>

      {images.length === 0 ? (
        <p className="text-zinc-400">No images uploaded yet.</p>
      ) : (
        <div className="grid grid-cols-3 gap-4">
          {images.map((img) => (
            <div
              key={img._id}
              onClick={() => setActiveImage(img)}
              className="cursor-pointer rounded overflow-hidden hover:shadow-lg transition"
            >
              <img
                src={img.imageUrl}
                alt="Gallery"
                className="w-full h-40 object-contain"
              />
            </div>
          ))}
        </div>
      )}

      {/* DELETE MODAL */}
      {activeImage && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-white rounded-xs p-6 w-full relative">
            <h3 className="text-lg font-semibold mb-4">Delete Image?</h3>

            <img
              src={activeImage.imageUrl}
              alt="Preview"
              className="w-full h-48  object-cover rounded mb-4"
            />

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setActiveImage(null)}
                className="px-4 py-2 border-2 rounded"
              >
                Cancel
              </button>

              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-black rounded-xs border-2"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
