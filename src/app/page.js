"use client";

// Import the page components
import Home from "@/app/home/page";
import Body from "@/app/body/page";
import MyGallery from "@/app/mygallery/page";
import Footer from "@/app/footer/page";

export default function EntryPage() {
  return (
    <div>
      {/* Top Section */}
      <Home />

      {/* Body Section */}
      <Body />

      {/* Gallery Section */}
      <MyGallery />

      {/* Footer Section */}
      <Footer />
    </div>
  );
}
