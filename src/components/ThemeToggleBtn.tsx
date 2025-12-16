"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import Image from "next/image";
import assets from "@/config/assets";

const ThemeToggleBtn = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="size-8.5 p-1.5 border border-gray-500 rounded-full" />
    );
  }

  return (
    <button
      type="button"
      aria-label="Toggle theme"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      {theme === "dark" ? (
        <Image
          src={assets.sun_icon}
          className="size-8.5 p-1.5 border border-gray-500 rounded-full"
          alt="Sun icon"
          width={34}
          height={34}
        />
      ) : (
        <Image
          src={assets.moon_icon}
          className="size-8.5 p-1.5 border border-gray-500 rounded-full"
          alt="Moon icon"
          width={34}
          height={34}
        />
      )}
    </button>
  );
};

export default ThemeToggleBtn;

