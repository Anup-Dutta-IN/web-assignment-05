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
      <div className="min-h-screen flex items-center justify-center text-white bg-black">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-black/50 text-white flex flex-col md:flex-row overflow-y-auto">
      {/* LEFT SECTION */}
      <div className="relative w-full md:w-1/2 p-6 md:p-8 flex items-start md:items-center justify-center">
        {/* MOBILE: Tall container so cards cross screen */}
        <div className="relative w-full max-w-sm h-[500px] md:w-[420px] md:h-[520px]">
          
          {/* Card 1 */}
          {posts[0] && (
            <div
              onClick={() => setActivePost(posts[0])}
              className="absolute top-0 right-0 w-38 h-40 cursor-pointer rounded-sm overflow-hidden bg-gray-800 hover:scale-105 transition-transform"
            >
              <img
                src={posts[0].imageUrl}
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Card 2 */}
          {posts[1] && (
            <div
              onClick={() => setActivePost(posts[1])}
              className="absolute top-25 left-15 w-50 h-60 cursor-pointer rounded-sm overflow-hidden bg-gray-800 hover:scale-105 transition-transform"
            >
              <img
                src={posts[1].imageUrl}
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Card 3 */}
          {posts[2] && (
            <div
              onClick={() => setActivePost(posts[2])}
              className="absolute top-[250px] left-0 w-30 h-45 cursor-pointer rounded-sm overflow-hidden bg-gray-800 hover:scale-105 transition-transform"
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

      {/* RIGHT SECTION */}
      <div className="w-full md:w-1/2 relative flex min-h-[60vh]">
        <div className="absolute inset-0 bg-gradient-to-br from-black/10 via-gray-900 to-amber-900/60" />

        <div className="relative z-10 p-6 md:p-12 flex flex-col justify-center">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-wide mb-6">
            MY <br /> INTRO
          </h1>

          <p className="text-gray-300 max-w-md leading-relaxed text-base md:text-lg">
            {activePost?.message ||
              "This is a short introduction about me. I build modern web applications with clean UI, scalable backend, and smooth user experience."}
          </p>
        </div>
      </div>
    </div>
  );
}
