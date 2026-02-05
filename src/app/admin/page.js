"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";

// Dynamically load both versions (no SSR to avoid window undefined)
const PhonePage = dynamic(() => import("./phone/page"), { ssr: false });
const DesktopPage = dynamic(() => import("./desktop/page"), { ssr: false });

export default function SpaceMainPage() {
  const [isMobile, setIsMobile] = useState(null);

  useEffect(() => {
    const checkScreen = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreen();
    window.addEventListener("resize", checkScreen);

    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  if (isMobile === null) return null; // prevent flicker

  return isMobile ? <PhonePage /> : <DesktopPage />;
}
