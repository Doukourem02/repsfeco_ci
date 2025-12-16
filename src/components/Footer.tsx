"use client";

import { useTheme } from "next-themes";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import assets from "@/config/assets";

const Footer = () => {
  const { theme } = useTheme();

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="bg-slate-50 dark:bg-gray-900 pt-10 sm:pt-10 mt-20 sm:mt-40 px-4 sm:px-10 lg:px-24 xl:px-40"
    >
      {/* footer top  */}
      <div className="flex justify-between lg:items-center max-lg:flex-col gap-10">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="space-y-5 text-sm text-gray-700 dark:text-gray-400"
        >
          <Image
            src={theme === "dark" ? assets.logo_dark : assets.logo}
            className="h-10 sm:h-12 w-auto object-contain"
            alt="Logo REPSFECO-CI"
            width={160}
            height={48}
          />
          <p className="max-w-md text-sm leading-relaxed">
            Organisation de la société civile dédiée à la promotion de la paix, à la prévention des conflits et à l'engagement des femmes dans les processus de gouvernance nationaux et communautaires.
          </p>

          <nav>
            <ul className="flex flex-wrap gap-4 sm:gap-6 md:gap-8">
              <li>
                <Link className="hover:text-primary transition-colors" href="#hero">
                  Accueil
                </Link>
              </li>
              <li>
                <Link className="hover:text-primary transition-colors" href="#about">
                  Qui sommes-nous ?
                </Link>
              </li>
              <li>
                <Link className="hover:text-primary transition-colors" href="#services">
                  Nos missions
                </Link>
              </li>
              <li>
                <Link className="hover:text-primary transition-colors" href="#our-work">
                  Nos actions
                </Link>
              </li>
              <li>
                <Link className="hover:text-primary transition-colors" href="#contact-us">
                  Contactez-nous
                </Link>
              </li>
            </ul>
          </nav>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-gray-600 dark:text-gray-400 max-w-md"
        >
          <h3 className="font-semibold text-base mb-3 text-gray-800 dark:text-gray-200">Pourquoi notre action compte</h3>
          <p className="text-sm leading-relaxed">
            La participation des femmes dans les processus de paix est essentielle pour la stabilité durable, la sécurité des communautés et la prévention des violences. REPSFECO-CI travaille pour faire entendre la voix des femmes dans toutes les sphères de décision.
          </p>
        </motion.div>
      </div>
      <hr className="border-gray-300 dark:border-gray-600 my-6" />

      {/* footer bottom */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        viewport={{ once: true }}
        className="pb-6 text-xs sm:text-sm text-gray-500 dark:text-gray-400 flex flex-col sm:flex-row justify-between items-center gap-4"
      >
        <p className="text-center sm:text-left max-w-2xl">
          © 2025 REPSFECO-CI – Réseau Paix et Sécurité pour les Femmes en Côte d'Ivoire.<br className="hidden sm:block" />
          <span className="sm:ml-0"> Engagement pour la paix, la sécurité, l'égalité et l'autonomisation.</span>
        </p>
        <div className="flex items-center gap-4">
          <a
            href="https://www.facebook.com/repsfecociv/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-70 transition-opacity"
            aria-label="Facebook"
          >
            <Image
              src={assets.facebook_icon}
              alt="Facebook"
              width={20}
              height={20}
            />
          </a>
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-70 transition-opacity"
            aria-label="Twitter"
          >
            <Image
              src={assets.twitter_icon}
              alt="Twitter"
              width={20}
              height={20}
            />
          </a>
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-70 transition-opacity"
            aria-label="Instagram"
          >
            <Image
              src={assets.instagram_icon}
              alt="Instagram"
              width={20}
              height={20}
            />
          </a>
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-70 transition-opacity"
            aria-label="LinkedIn"
          >
            <Image
              src={assets.linkedin_icon}
              alt="LinkedIn"
              width={20}
              height={20}
            />
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Footer;

