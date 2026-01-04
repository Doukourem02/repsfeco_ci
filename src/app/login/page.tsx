"use client";

import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Image from "next/image";
import assets from "@/config/assets";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Réactiver le curseur sur la page de login
  useEffect(() => {
    // Cacher le curseur personnalisé s'il existe
    const customCursors = document.querySelectorAll('[class*="cursor"], [id*="cursor"]');
    customCursors.forEach((el) => {
      if (el instanceof HTMLElement) {
        el.style.display = "none";
      }
    });

    // Réactiver le curseur normal et s'assurer que les boutons sont visibles
    const style = document.createElement("style");
    style.id = "login-cursor-fix";
    style.textContent = `
      * {
        cursor: auto !important;
      }
      button, a, input {
        cursor: pointer !important;
      }
      input[type="text"], input[type="password"] {
        cursor: text !important;
      }
      button[type="submit"] {
        display: block !important;
        visibility: visible !important;
        opacity: 1 !important;
      }
    `;
    document.head.appendChild(style);

    return () => {
      const styleElement = document.getElementById("login-cursor-fix");
      if (styleElement) {
        document.head.removeChild(styleElement);
      }
      customCursors.forEach((el) => {
        if (el instanceof HTMLElement) {
          el.style.display = "";
        }
      });
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      });

      const result = await response.json();

      if (result.success) {
        toast.success("Connexion réussie !");
        router.push("/admin");
        router.refresh();
      } else {
        toast.error(result.error || "Mot de passe incorrect");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Une erreur s'est produite");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
          {/* Logo et titre */}
          <div className="text-center mb-8">
            <Link href="/" className="inline-block mb-4">
              <Image
                src={assets.logo}
                alt="REPSFECO-CI"
                width={120}
                height={40}
                className="dark:hidden"
              />
              <Image
                src={assets.logo_dark}
                alt="REPSFECO-CI"
                width={120}
                height={40}
                className="hidden dark:block"
              />
            </Link>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Connexion Admin
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              Accès réservé aux administrateurs
            </p>
          </div>

          {/* Formulaire */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Mot de passe
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#8B0000] dark:focus:ring-[#A52A2A]"
                placeholder="Entrez votre mot de passe"
                disabled={isLoading}
              />
            </div>

            <div className="mt-4">
              <motion.button
                type="submit"
                disabled={isLoading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full px-6 py-3 bg-[#8B0000] dark:bg-[#A52A2A] text-white rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed font-medium text-base shadow-md hover:shadow-lg"
                style={{ display: 'block', visibility: 'visible', opacity: isLoading ? 0.5 : 1 }}
              >
                {isLoading ? "Connexion..." : "Se connecter"}
              </motion.button>
            </div>
          </form>

          {/* Lien retour */}
          <div className="mt-6 text-center">
            <Link
              href="/"
              className="text-sm text-gray-500 dark:text-gray-400 hover:text-[#8B0000] dark:hover:text-[#A52A2A] transition-colors"
            >
              ← Retour à l'accueil
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

