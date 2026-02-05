"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaUserCircle, FaImages, FaPenNib } from "react-icons/fa";

export default function DashboardPage() {
  const router = useRouter();
  const [activePopup, setActivePopup] = useState(null);

  const cards = [
    {
      title: "Account Details",
      description: "View & update your personal account information",
      icon: <FaUserCircle size={42} />,
      action: () => router.push("/account"),
      color: "from-orange-500 to-orange-700",
    },
    {
      title: "My Gallery",
      description: "Manage and showcase your image gallery",
      icon: <FaImages size={42} />,
      action: () => setActivePopup("gallery"),
      color: "from-blue-100 to-blue-700",
    },
    {
      title: "Post",
      description: "Create and manage your posts",
      icon: <FaPenNib size={42} />,
      action: () => setActivePopup("post"),
      color: "from-purple-500 to-purple-700",
    },
  ];

  function handleUploadNew() {
    if (activePopup === "gallery") router.push("/gallery");
    if (activePopup === "post") router.push("/post");
    setActivePopup(null);
  }

  function handleManage() {
    if (activePopup === "gallery") router.push("/gallery/own");
    if (activePopup === "post") router.push("/post/own");
    setActivePopup(null);
  }

  return (
    <>
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
                onClick={card.action}
                className="cursor-pointer group"
              >
                <div
                  className={`h-full bg-gradient-to-br ${card.color} p-[2px] rounded-2xl transition-transform duration-300 group-hover:scale-105`}
                >
                  <div className="bg-gray-400 rounded-2xl h-full p-8 flex flex-col items-center text-center">
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

          <p className="text-center text-gray-500 pb-20 text-sm">
            Thank you ! Visit Again
          </p>
        </div>
      </div>

      {/* POPUP MODAL */}
      {activePopup && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-white text-black rounded-xl p-6 w-[360px] text-center">
            <h3 className="text-xl font-bold mb-6 capitalize">
              {activePopup} Options
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
                onClick={() => setActivePopup(null)}
                className="text-sm text-gray-500 hover:underline mt-2"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
