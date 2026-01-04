"use client";

import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Désactiver seulement le curseur personnalisé et forcer la largeur du header
  useEffect(() => {
    // Forcer la largeur du header pour éviter le décalage
    const fixHeaderWidth = () => {
      const navbar = document.querySelector('nav, [class*="Navbar"], header');
      const navbarContainer = document.querySelector('[class*="sticky"]');
      if (navbarContainer instanceof HTMLElement) {
        const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
        navbarContainer.style.width = `${document.documentElement.clientWidth}px`;
        navbarContainer.style.left = '0';
        navbarContainer.style.right = '0';
        navbarContainer.style.margin = '0';
      }
    };

    // Fixer immédiatement et après un court délai
    fixHeaderWidth();
    setTimeout(fixHeaderWidth, 0);
    setTimeout(fixHeaderWidth, 100);

    // Fixer aussi lors du redimensionnement
    window.addEventListener('resize', fixHeaderWidth);

    return () => {
      window.removeEventListener('resize', fixHeaderWidth);
    };
  }, []);

  return (
    <div className="dark:bg-black relative w-full overflow-x-hidden">
      <Navbar />
      {children}
      <Footer />
      <CustomCursor />
    </div>
  );
}

