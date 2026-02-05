"use client";

import { useEffect, useState } from "react";

export default function IntroPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activePost, setActivePost] = useState(null);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const res = await fetch("/api/body");
        const data = await res.json();
        setPosts(data);
        setActivePost(data[0]);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center text-white bg-black">
        Loading...
      </div>
    );
  }

  return (
    <div className="h-screen w-full bg-black text-white flex overflow-hidden">
      {/* LEFT SECTION – 3 Card Staggered Layout */}
      <div className="relative w-full md:w-1/2 p-8 flex items-center justify-center">
        <div className="relative w-[420px] h-[520px]">
          {/* Top small card */}
          {posts[0] && (
            <div
              onClick={() => setActivePost(posts[0])}
              className="absolute top-0 left-60 w-40 h-50 cursor-pointer rounded-xs overflow-hidden bg-gray-800 hover:scale-105 transition-transform z-20"
            >
              <img
                src={posts[0].imageUrl}
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Center big card */}
          {posts[1] && (
            <div
              onClick={() => setActivePost(posts[1])}
              className="absolute top-10 left-10 w-70 h-100 cursor-pointer rounded-xs overflow-hidden bg-gray-800 hover:scale-105 transition-transform z-10"
            >
              <img
                src={posts[1].imageUrl}
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Bottom small card */}
          {posts[2] && (
            <div
              onClick={() => setActivePost(posts[2])}
              className="absolute bottom-0 left-0 w-50 h-60 cursor-pointer rounded-xs overflow-hidden bg-gray-800 hover:scale-105 transition-transform z-20"
            >
              <img
                src={posts[2].imageUrl}
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
          )}
        </div>
      </div>

      {/* RIGHT SECTION – Intro (unchanged) */}
      <div className="hidden md:flex w-1/2 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-amber-900/60" />

        <div className="relative z-10 p-12 flex flex-col justify-center">
          <h1 className="text-6xl font-extrabold tracking-wide mb-6">
            MY <br /> INTRO
          </h1>

          <p className="text-gray-300 max-w-md leading-relaxed text-lg">
            {activePost?.message ||
              "This is a short introduction about me. I build modern web applications with clean UI, scalable backend, and smooth user experience."}
          </p>
        </div>
      </div>
    </div>
  );
}
