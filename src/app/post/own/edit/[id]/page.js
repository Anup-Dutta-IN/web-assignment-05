"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function PostViewPage() {
  const { id: userId } = useParams(); // ✅ FIX HERE

  const [posts, setPosts] = useState([]);
  const [activePost, setActivePost] = useState(null);
  const [editPost, setEditPost] = useState(null);
  const [message, setMessage] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(true);

  /* Fetch posts */
  useEffect(() => {
    if (!userId) return;

    async function fetchPosts() {
      try {
        const res = await fetch(`/api/post/fetch?userId=${userId}`);
        const data = await res.json();
        setPosts(data);
      } catch (err) {
        console.error("Failed to fetch posts", err);
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, [userId]);

  /* Delete post */
  async function handleDelete() {
    await fetch("/api/post/delete", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        postId: activePost._id,
        userId,
      }),
    });

    setPosts((prev) => prev.filter((p) => p._id !== activePost._id));
    setActivePost(null);
  }

  /* Open edit modal */
  function openEdit(post) {
    setEditPost(post);
    setMessage(post.message);
    setImageUrl(post.imageUrl || "");
    setActivePost(null);
  }

  /* Update post */
  async function handleUpdate() {
    const res = await fetch("/api/post/edit", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        postId: editPost._id,
        userId,
        message,
        imageUrl,
      }),
    });

    const data = await res.json();

    setPosts((prev) =>
      prev.map((p) => (p._id === editPost._id ? data.post : p))
    );

    setEditPost(null);
  }

  if (loading) return <p className="text-zinc-400">Loading posts...</p>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Your Posts</h2>

      <div className="grid grid-cols-3 gap-4">
        {posts.map((post) => (
          <div
            key={post._id}
            onClick={() => setActivePost(post)}
            className="border rounded p-3 cursor-pointer hover:shadow"
          >
            {post.imageUrl && (
              <img
                src={post.imageUrl}
                alt=""
                className="w-full h-40 object-cover rounded mb-2"
              />
            )}
            <p className="text-sm">{post.message}</p>
          </div>
        ))}
      </div>

      {/* VIEW MODAL */}
      {activePost && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded w-[400px]">
            {activePost.imageUrl && (
              <img
                src={activePost.imageUrl}
                alt=""
                className="w-full h-48 object-cover rounded mb-4"
              />
            )}
            <p className="mb-4">{activePost.message}</p>

            <div className="flex justify-end gap-3">
              <button onClick={() => setActivePost(null)}>Cancel</button>
              <button
                className="text-blue-600"
                onClick={() => openEdit(activePost)}
              >
                Edit
              </button>
              <button
                className="text-red-600"
                onClick={handleDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* EDIT MODAL */}
      {editPost && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded w-[420px]">
            <h3 className="font-bold mb-4">Edit Post</h3>

            <textarea
              className="w-full border p-2 mb-3"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />

            <input
              className="w-full border p-2 mb-4"
              placeholder="Image URL (optional)"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
            />

            <div className="flex justify-end gap-3">
              <button onClick={() => setEditPost(null)}>Cancel</button>
              <button
                className="bg-black text-white px-4 py-2 rounded"
                onClick={handleUpdate}
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
