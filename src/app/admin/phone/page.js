"use client";

import { useRouter } from "next/navigation";
import { FaUserCircle, FaImages, FaPenNib } from "react-icons/fa";

export default function DashboardPage() {
  const router = useRouter();

  const cards = [
    {
      title: "Account Details",
      description: "View & update your personal account information",
      icon: <FaUserCircle size={42} />,
      path: "/account",
      color: "from-orange-500 to-orange-700",
    },
    {
      title: "My Gallery",
      description: "Manage and showcase your image gallery",
      icon: <FaImages size={42} />,
      path: "/gallery",
      color: "from-blue-100 to-blue-700",
    },
    {
      title: "Post",
      description: "Create and manage your posts",
      icon: <FaPenNib size={42} />,
      path: "/post",
      color: "from-purple-500 to-purple-700",
    },
  ];

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
              onClick={() => router.push(card.path)}
              className="cursor-pointer group"
            >
              <div
                className={`h-full bg-gradient-to-br ${card.color} p-[2px] rounded-2xl transition-transform duration-300 group-hover:scale-105`}
              >
                <div className="bg-gray-400 rounded-2xl h-full p-8 flex flex-col items-center text-center">
                  {/* Icon */}
                  <div className="mb-6 text-orange-400 group-hover:text-white transition-colors">
                    {card.icon}
                  </div>

                  {/* Title */}
                  <h2 className="text-2xl font-semibold mb-3">
                    {card.title}
                  </h2>

                  {/* Description */}
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {card.description}
                  </p>

                  {/* CTA */}
                  <span className="mt-6 text-orange-400 font-medium group-hover:text-white transition">
                    Open →
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Text */}
        <p className="text-center text-gray-500 pb-20 text-sm">
          Thank you ! Visit Again
        </p>
      </div>
    </div>
  );
}
