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
        // Assuming API returns single user or array with one user
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

  // Function to format name with dots between letters
  const formatNameWithDots = (name) => {
    if (!name) return "";
    return name.toUpperCase().split("").join(" . ");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white relative overflow-x-hidden overflow-y-auto pb-20">
      {/* Decorative Elements */}
      <div className="absolute top-20 right-20 w-24 h-24 grid grid-cols-6 gap-1">
        {[...Array(36)].map((_, i) => (
          <div key={i} className="w-1 h-1 bg-orange-500 rounded-full"></div>
        ))}
      </div>

      <div className="absolute bottom-32 left-20 w-48 h-48 bg-orange-600 transform rotate-45 opacity-20"></div>
      <div className="absolute bottom-20 left-12 w-32 h-32 grid grid-cols-4 gap-1">
        {[...Array(16)].map((_, i) => (
          <div key={i} className="w-1.5 h-1.5 bg-orange-400 rounded-full"></div>
        ))}
      </div>

      <div className="relative z-10 min-h-screen">
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

        {/* PROFILE CONTENT */}
        {!loading && user && (
          <div className="min-h-screen flex justify-center p-8">
            <div className="w-full max-w-7xl relative">
              {/* Name in Top Left with Dots - Desktop Only */}
              <div className="hidden lg:block absolute top-0 left-0 z-20">
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-wider leading-tight">
                  {formatNameWithDots(user.name || "UNKNOWN")}
                </h1>
              </div>

              {/* Mobile Layout */}
              <div className="lg:hidden flex flex-col items-center space-y-6">
                {/* Name at Top */}
                <h1 className="text-4xl font-bold text-white tracking-wider leading-tight text-center">
                  {formatNameWithDots(user.name || "UNKNOWN")}
                </h1>

                {/* Profile Image */}
                <div className="relative w-80 h-96">
                  <div className="relative w-full h-full overflow-hidden border-8 border-orange-500 shadow-2xl">
                    {isExternal(user.profileImage) ? (
                      <img
                        src={user.profileImage}
                        alt={user.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <Image
                        src={user.profileImage || "/default.png"}
                        alt={user.name}
                        fill
                        className="object-cover"
                      />
                    )}
                  </div>
                </div>

                {/* Info Box */}
                <div className="bg-gradient-to-br from-gray-800 to-gray-900 border-l-4 border-orange-500 p-8 w-full max-w-md shadow-2xl">
                  <h2 className="text-4xl font-bold text-white mb-2">
                    I'm {user.name || "Unknown"}
                  </h2>
                  <p className="text-orange-400 text-lg mb-6">{user.username}</p>
                </div>

                {/* Social Links */}
                <div className="flex gap-4 justify-center">
                  {user?.socialLinks?.instagram && (
                    <button
                      onClick={(e) => openSocial(e, user.socialLinks.instagram)}
                      className="w-12 h-12 bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center hover:scale-110 transition-transform duration-300 cursor-pointer"
                    >
                      <FaInstagram className="text-xl text-white" />
                    </button>
                  )}

                  {user?.socialLinks?.facebook && (
                    <button
                      onClick={(e) => openSocial(e, user.socialLinks.facebook)}
                      className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center hover:scale-110 transition-transform duration-300 cursor-pointer"
                    >
                      <FaFacebook className="text-xl text-white" />
                    </button>
                  )}

                  {user?.socialLinks?.twitter && (
                    <button
                      onClick={(e) => openSocial(e, user.socialLinks.twitter)}
                      className="w-12 h-12 bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center hover:scale-110 transition-transform duration-300 cursor-pointer"
                    >
                      <FaSquareXTwitter className="text-xl text-white" />
                    </button>
                  )}

                  {user?.socialLinks?.linkedin && (
                    <button
                      onClick={(e) => openSocial(e, user.socialLinks.linkedin)}
                      className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center hover:scale-110 transition-transform duration-300 cursor-pointer"
                    >
                      <FaLinkedin className="text-xl text-white" />
                    </button>
                  )}
                </div>
              </div>

              {/* Desktop Layout - Original Grid */}
              <div className="hidden lg:grid grid-cols-2 gap-8 items-center mt-32">
                {/* Left Side - Profile Image */}
                <div className="flex flex-col items-start">
                  <div className="relative w-96 h-[500px]">
                    {/* Image Container */}
                    <div className="relative w-full h-full overflow-hidden border-8 border-orange-500 shadow-2xl">
                      {isExternal(user.profileImage) ? (
                        <img
                          src={user.profileImage}
                          alt={user.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <Image
                          src={user.profileImage || "/default.png"}
                          alt={user.name}
                          fill
                          className="object-cover"
                        />
                      )}
                    </div>

                    {/* Social Links Below Image */}
                    <div className="flex gap-4 mt-10 mb-10 justify-start">
                      {user?.socialLinks?.instagram && (
                        <button
                          onClick={(e) => openSocial(e, user.socialLinks.instagram)}
                          className="w-12 h-12 bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center hover:scale-110 transition-transform duration-300 cursor-pointer"
                        >
                          <FaInstagram className="text-xl text-white" />
                        </button>
                      )}

                      {user?.socialLinks?.facebook && (
                        <button
                          onClick={(e) => openSocial(e, user.socialLinks.facebook)}
                          className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center hover:scale-110 transition-transform duration-300 cursor-pointer"
                        >
                          <FaFacebook className="text-xl text-white" />
                        </button>
                      )}

                      {user?.socialLinks?.twitter && (
                        <button
                          onClick={(e) => openSocial(e, user.socialLinks.twitter)}
                          className="w-12 h-12 bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center hover:scale-110 transition-transform duration-300 cursor-pointer"
                        >
                          <FaSquareXTwitter className="text-xl text-white" />
                        </button>
                      )}

                      {user?.socialLinks?.linkedin && (
                        <button
                          onClick={(e) => openSocial(e, user.socialLinks.linkedin)}
                          className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center hover:scale-110 transition-transform duration-300 cursor-pointer"
                        >
                          <FaLinkedin className="text-xl text-white" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {/* Right Side - Info Box in Bottom Right */}
                <div className="flex items-end justify-end">
                  <div className="bg-gradient-to-br from-gray-800 to-gray-900 border-l-4 border-orange-500 p-8 max-w-md w-full shadow-2xl">
                    {/* I'm [Name] */}
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-2">
                      I'm {user.name || "Unknown"}
                    </h2>

                    {/* Username */}
                    <p className="text-orange-400 text-lg mb-6">{user.username}</p>

                    {/* Short Message */}
                    {user.shortMessage && (
                      <p className="text-gray-300 text-base leading-relaxed">
                        {user.shortMessage}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* EMPTY STATE */}
        {!loading && !user && (
          <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
              <div className="w-32 h-32 mx-auto mb-8 bg-gradient-to-br from-orange-500/10 to-orange-600/10 flex items-center justify-center border-2 border-orange-500/20">
                <div className="w-20 h-20 bg-gradient-to-br from-orange-500/20 to-orange-600/20"></div>
              </div>
              <p className="text-gray-400 text-2xl font-light">No profile found</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}