"use client";

import { motion } from "motion/react";
import Image from "next/image";
import assets from "@/config/assets";

const Hero = () => {
  return (
    <div
      id="hero"
      className="flex flex-col items-center gap-4 sm:gap-5 py-12 sm:py-16 px-4 sm:px-12 lg:px-24 xl:px-40 text-center w-full overflow-hidden text-gray-700 dark:text-white"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.7 }}
        viewport={{ once: true }}
        className="inline-flex items-center gap-2 border border-gray-300 p-1.5 pr-4 rounded-full"
      >
        <Image
          className="w-20"
          src={assets.group_profile}
          alt="Group profile"
          width={80}
          height={80}
        />
        <p className="text-xs font-medium">Organisation de la société civile depuis 2010</p>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        viewport={{ once: true }}
        className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-medium leading-tight max-w-5xl"
      >
        REPSFECO-CI —{" "}
        <span className="bg-gradient-to-r from-[#8B0000] to-[#2D5016] bg-clip-text text-transparent">
          Paix, Sécurité
        </span>{" "}
        et Leadership des Femmes en Côte d'Ivoire
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1 }}
        viewport={{ once: true }}
        className="text-sm sm:text-base md:text-lg font-medium text-gray-500 dark:text-white/75 max-w-4/5 sm:max-w-2xl"
      >
        Une organisation engagée pour renforcer l'autonomisation, la participation et l'impact des femmes dans la paix et la sécurité.
      </motion.p>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1.2 }}
        viewport={{ once: true }}
        className="text-xs sm:text-sm font-normal text-gray-400 dark:text-white/60 max-w-4/5 sm:max-w-xl mb-4 sm:mb-6"
      >
        Organisation de la société civile dédiée à la promotion de la paix, à la prévention des conflits et à l'engagement des femmes dans les processus de gouvernance nationaux et communautaires.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 1.5 }}
        viewport={{ once: true }}
        className="relative w-full mt-4 sm:mt-6"
      >
        <Image
          src={assets.hero_img}
          alt="Hero image"
          className="w-full max-w-full rounded-lg shadow-xl"
          width={1600}
          height={800}
          priority
        />
        <Image
          src={assets.bgImage1}
          alt=""
          className="absolute -top-40 -right-40 sm:-top-100 sm:-right-70 -z-1 dark:hidden"
          width={600}
          height={600}
        />
      </motion.div>
    </div>
  );
};

export default Hero;

