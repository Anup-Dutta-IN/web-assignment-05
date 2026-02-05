"use client";

import { useEffect, useState } from "react";

export default function GalleryPage() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    async function fetchGallery() {
      try {
        const res = await fetch("/api/mygallery");
        const data = await res.json();
        setImages(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchGallery();
  }, []);

  return (
    <div className="h-screen bg-gradient-to-br from-gray-700 via-black/70 to-gray-500 text-white flex flex-col overflow-hidden">
      {/* Header */}
      <div className="px-6 py-6 flex-shrink-0">
        <h1 className="text-4xl md:text-5xl font-bold tracking-wide text-center">
          MY GALLERY
        </h1>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-400">Loading gallery...</p>
          </div>
        </div>
      )}

      {/* Main Gallery View */}
      {!loading && images.length > 0 && (
        <>
          {/* Large Image Display */}
          <div className="flex-1 flex items-center justify-center px-4 md:px-8 overflow-hidden">
            <div className="relative w-full max-w-10xl h-full max-h-[calc(100vh-200px)] rounded-lg overflow-hidden">
              <img
                src={images[selectedIndex]?.imageUrl}
                alt={`Gallery Image ${selectedIndex + 1}`}
                className="w-full h-full object-contain"
              />
              
              {/* Image Info Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-300">
                    Image {selectedIndex + 1} of {images.length}
                  </p>
                </div>
              </div>

              {/* Navigation Arrows */}
              <button
                onClick={() =>
                  setSelectedIndex((prev) =>
                    prev > 0 ? prev - 1 : images.length - 1
                  )
                }
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white p-3 rounded-full transition-all"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <button
                onClick={() =>
                  setSelectedIndex((prev) =>
                    prev < images.length - 1 ? prev + 1 : 0
                  )
                }
                className="absolute right-4 top-1/2 -translate-y-1/2  text-white p-3 rounded-full transition-all"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Navigation Bar - Fixed at Bottom */}
          <div className="flex-shrink-0 px-10 py-4">
            <div className="flex gap-5 pb-2">
              {images.map((item, index) => (
                <button
                  key={item._id}
                  onClick={() => setSelectedIndex(index)}
                  className={`flex-shrink-0 w-10 h-10 md:w-15 md:h-15 rounded-lg overflow-hidden transition-all duration-300 ${
                    selectedIndex === index
                      ? "ring-4 ring-orange-500 scale-105 shadow-lg shadow-orange-500/50"
                      : "ring-2 ring-gray-600 opacity-60 hover:opacity-100 hover:ring-gray-400"
                  }`}
                >
                  <img
                    src={item.imageUrl}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        </>
      )}

      {/* Empty State */}
      {!loading && images.length === 0 && (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="text-10xl mb-4">📷</div>
            <p className="text-gray-400 text-lg">No images found</p>
            <p className="text-gray-500 text-sm mt-2">
              Upload some images to get started
            </p>
          </div>
        </div>
      )}
    </div>
  );
}