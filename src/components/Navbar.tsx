"use client";

import assets from "@/config/assets";
import { motion } from "motion/react";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import ThemeToggleBtn from "./ThemeToggleBtn";

const Navbar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { theme } = useTheme();

  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="navbar-container flex justify-between items-center px-4 sm:px-8 lg:px-20 xl:px-32 py-4 fixed top-0 z-20 backdrop-blur-xl font-medium bg-white/50 dark:bg-gray-900/70 w-full"
      style={{ left: 0, right: 0, margin: 0 }}
    >
      <Link href="/" className="cursor-pointer">
        <Image
          src={theme === "dark" ? assets.logo_dark : assets.logo}
          className="h-12 sm:h-14 w-auto object-contain"
          alt="Logo REPSFECO-CI"
          width={180}
          height={56}
          priority
        />
      </Link>

      <div
        className={`text-gray-700 dark:text-white sm:text-sm ${
          !sidebarOpen
            ? "max-sm:w-0 overflow-hidden"
            : "max-sm:w-60 max-sm:pl-10"
        } max-sm:fixed top-0 bottom-0 right-0 max-sm:min-h-screen max-sm:h-full max-sm:flex-col max-sm:bg-primary max-sm:text-white max-sm:pt-20 flex sm:items-center gap-5 transition-all`}
      >
        <Image
          src={assets.close_icon}
          alt=""
          className="w-5 absolute right-4 top-4 sm:hidden cursor-pointer"
          onClick={() => setSidebarOpen(false)}
          width={20}
          height={20}
        />

        <Link
          onClick={() => setSidebarOpen(false)}
          href="/#hero"
          className="sm:hover:border-b"
        >
          Accueil
        </Link>
        <Link
          onClick={() => setSidebarOpen(false)}
          href="/#about"
          className="sm:hover:border-b"
        >
          Qui sommes-nous ?
        </Link>
        <Link
          onClick={() => setSidebarOpen(false)}
          href="/#services"
          className="sm:hover:border-b"
        >
          Nos missions
        </Link>
        <Link
          onClick={() => setSidebarOpen(false)}
          href="/#our-work"
          className="sm:hover:border-b"
        >
          Nos actions
        </Link>
        <Link
          onClick={() => setSidebarOpen(false)}
          href="/#contact-us"
          className="sm:hover:border-b"
        >
          Contactez-nous
        </Link>
        <Link
          onClick={() => setSidebarOpen(false)}
          href="/admin"
          className="sm:hover:border-b text-[#8B0000] dark:text-[#A52A2A] font-semibold"
        >
          Publier
        </Link>
      </div>

      <div className="flex items-center gap-2 sm:gap-4">
        <ThemeToggleBtn />

        <Image
          src={theme === "dark" ? assets.menu_icon_dark : assets.menu_icon}
          alt=""
          onClick={() => setSidebarOpen(true)}
          className="w-8 sm:hidden cursor-pointer"
          width={32}
          height={32}
        />

        <Link
          href="/#contact-us"
          className="text-sm max-sm:hidden flex items-center gap-2 bg-primary text-white px-6 py-2 rounded-full cursor-pointer hover:scale-103 transition-all"
        >
          Contactez-nous{" "}
          <Image src={assets.arrow_icon} width={14} height={14} alt="" />
        </Link>
      </div>
    </motion.div>
  );
};

export default Navbar;
