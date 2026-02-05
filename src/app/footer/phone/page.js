"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

import { FaInstagram, FaFacebook, FaLinkedin } from "react-icons/fa6";
import { FaSquareXTwitter } from "react-icons/fa6";

export default function HomePage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await fetch("/api/home");
        const data = await res.json();
        setUser(Array.isArray(data) ? data[0] : data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, []);

  const isExternal = (src) =>
    src?.startsWith("http://") || src?.startsWith("https://");

  const openSocial = (e, url) => {
    e.preventDefault();
    e.stopPropagation();
    if (url) window.open(url, "_blank");
  };

  const formatNameWithDots = (name) => {
    if (!name) return "";
    return name.toUpperCase().split("").join(" . ");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white overflow-x-hidden pb-20">
      {/* LOADING */}
      {loading && (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="relative w-20 h-20 mx-auto mb-6">
              <div className="absolute inset-0 border-4 border-orange-500/20 rounded-full"></div>
              <div className="absolute inset-0 border-4 border-transparent border-t-orange-500 rounded-full animate-spin"></div>
            </div>
            <p className="text-xl text-gray-300">Loading profile...</p>
          </div>
        </div>
      )}

      {/* CONTENT */}
      {!loading && user && (
        <>
          {/* 🔶 TOP SHORT MESSAGE SECTION */}
          <section className="w-full flex flex-col items-center text-center px-6 pt-20 pb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-widest text-orange-500 mb-6">
              SHORT MESSAGE
            </h2>

            <p className="max-w-2xl text-gray-300 text-lg md:text-xl leading-relaxed mb-6">
              {user.shortMessage || "No short message available."}
            </p>

            <p className="text-orange-400 text-lg font-medium">
              Thank you ! Visit Again
            </p>
          </section>

          {/* 🔶 MAIN PROFILE SECTION */}
          <div className="flex justify-center p-8">
            <div className="w-full max-w-7xl relative">

           

                    {/* Social Links */}
                    <div className="flex gap-4 mt-8 justify-center lg:justify-start">
                      {user?.socialLinks?.instagram && (
                        <button
                          onClick={(e) =>
                            openSocial(e, user.socialLinks.instagram)
                          }
                          className="w-12 h-12 bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center hover:scale-110 transition"
                        >
                          <FaInstagram />
                        </button>
                      )}

                      {user?.socialLinks?.facebook && (
                        <button
                          onClick={(e) =>
                            openSocial(e, user.socialLinks.facebook)
                          }
                          className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center hover:scale-110 transition"
                        >
                          <FaFacebook />
                        </button>
                      )}

                      {user?.socialLinks?.twitter && (
                        <button
                          onClick={(e) =>
                            openSocial(e, user.socialLinks.twitter)
                          }
                          className="w-12 h-12 bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center hover:scale-110 transition"
                        >
                          <FaSquareXTwitter />
                        </button>
                      )}

                      {user?.socialLinks?.linkedin && (
                        <button
                          onClick={(e) =>
                            openSocial(e, user.socialLinks.linkedin)
                          }
                          className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center hover:scale-110 transition"
                        >
                          <FaLinkedin />
                        </button>
                      )}
                    </div>
                </div>
          </div>
        </>
      )}

      {/* EMPTY STATE */}
      {!loading && !user && (
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-gray-400 text-2xl">No profile found</p>
        </div>
      )}
    </div>
  );
}
