"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaUserCircle, FaImages, FaPenNib } from "react-icons/fa";

export default function DashboardPage() {
  const router = useRouter();

  const [popupType, setPopupType] = useState(null); // "gallery" | "post" | null

  const cards = [
    {
      title: "Account Details",
      description: "View & update your personal account information",
      icon: <FaUserCircle size={42} />,
      path: "/account",
      color: "from-orange-500 to-orange-700",
      type: "account",
    },
    {
      title: "My Gallery",
      description: "Manage and showcase your image gallery",
      icon: <FaImages size={42} />,
      color: "from-blue-500 to-blue-700",
      type: "gallery",
    },
    {
      title: "Post",
      description: "Create and manage your posts",
      icon: <FaPenNib size={42} />,
      color: "from-purple-500 to-purple-700",
      type: "post",
    },
  ];

  function handleCardClick(card) {
    if (card.type === "account") {
      router.push(card.path);
    } else {
      setPopupType(card.type);
    }
  }

  function handleUploadNew() {
    if (popupType === "gallery") router.push("/gallery");
    if (popupType === "post") router.push("/post");
    setPopupType(null);
  }

  function handleManage() {
    if (popupType === "gallery") router.push("/gallery/own");
    if (popupType === "post") router.push("/post/own");
    setPopupType(null);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white flex items-center justify-center px-6">
      <div className="w-full max-w-6xl">
        {/* Page Title */}
        <h1 className="text-4xl md:text-5xl font-bold text-center py-10 tracking-wide">
          Dashboard
        </h1>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cards.map((card, index) => (
            <div
              key={index}
              onClick={() => handleCardClick(card)}
              className="cursor-pointer group"
            >
              <div
                className={`h-full bg-gradient-to-br ${card.color} p-[2px] rounded-2xl transition-transform duration-300 group-hover:scale-105`}
              >
                <div className="bg-gray-900 rounded-2xl h-full p-8 flex flex-col items-center text-center">
                  <div className="mb-6 text-orange-400 group-hover:text-white transition-colors">
                    {card.icon}
                  </div>

                  <h2 className="text-2xl font-semibold mb-3">
                    {card.title}
                  </h2>

                  <p className="text-gray-400 text-sm leading-relaxed">
                    {card.description}
                  </p>

                  <span className="mt-6 text-orange-400 font-medium group-hover:text-white transition">
                    Open →
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <p className="text-center text-gray-500 pb-20 text-sm mt-16">
          Thank you ! Visit Again
        </p>
      </div>

      {/* POPUP MODAL (DESIGN MATCHED) */}
      {popupType && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-white text-black rounded-xl p-6 w-[360px] text-center shadow-xl">
            <h3 className="text-xl font-bold mb-6 capitalize">
              {popupType} Options
            </h3>

            <div className="flex flex-col gap-4">
              <button
                onClick={handleUploadNew}
                className="w-full py-2 rounded bg-black text-white hover:bg-gray-800 transition"
              >
                UPLOAD NEW
              </button>

              <button
                onClick={handleManage}
                className="w-full py-2 rounded bg-black text-white hover:bg-gray-100 transition"
              >
                MANAGE
              </button>

              <button
                onClick={() => setPopupType(null)}
                className="text-sm text-gray-500 hover:underline mt-2"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
