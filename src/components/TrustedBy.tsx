"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { partner_logos } from "@/config/assets";

const TrustedBy = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="flex flex-col items-center px-4 sm:px-12 lg:px-24 xl:px-40 gap-10 text-gray-700 dark:text-white/80"
    >
      <motion.h3
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="font-semibold text-lg sm:text-xl"
      >
        Partenaires et organisations reconnues
      </motion.h3>

      <motion.div
        initial="hidden"
        whileInView="visible"
        transition={{ staggerChildren: 0.1 }}
        viewport={{ once: true }}
        className="flex items-center justify-center flex-wrap gap-8 sm:gap-12 m-4"
      >
        {partner_logos.map((partner, index) => (
          <motion.div
            key={index}
            variants={{
              hidden: { opacity: 0, y: 10 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.4 }}
            className="flex items-center justify-center"
          >
            <Image
              src={partner.src}
              alt={partner.alt}
              className="max-h-12 sm:max-h-16 md:max-h-20 object-contain"
              width={150}
              height={80}
            />
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default TrustedBy;

