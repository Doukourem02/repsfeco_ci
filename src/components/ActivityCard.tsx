"use client";

import { useState, useRef } from "react";
import { motion } from "motion/react";
import Image from "next/image";
import type { Activity } from "@/types/assets";
import { formatRelativeDate } from "@/utils/dateParser";
import assets from "@/config/assets";

interface ActivityCardProps {
  activity: Activity;
  index: number;
  onOpen: (activity: Activity) => void;
}

const ActivityCard = ({ activity, index, onOpen }: ActivityCardProps) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);
  const divRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;
    const bounds = divRef.current.getBoundingClientRect();
    setPosition({
      x: e.clientX - bounds.left,
      y: e.clientY - bounds.top,
    });
  };

  const relativeDate = formatRelativeDate(activity.dateTimestamp);

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.15, ease: "easeOut" }}
      viewport={{ once: true, margin: "-50px" }}
      className="relative overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-md hover:shadow-xl transition-all duration-300"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      ref={divRef}
      onMouseMove={handleMouseMove}
    >
      {/* Gradient animé au survol */}
      <div
        className={`pointer-events-none blur-2xl rounded-full bg-gradient-to-r from-[#8B0000] via-[#A52A2A] to-[#2D5016] w-[300px] h-[300px] absolute z-0 transition-opacity duration-500 mix-blend-lighten ${
          visible ? "opacity-40" : "opacity-0"
        }`}
        style={{
          top: position.y - 150,
          left: position.x - 150,
        }}
      />

      {/* Header style Facebook */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: index * 0.15 + 0.1 }}
        viewport={{ once: true }}
        className="p-4 pb-3 border-b border-gray-200 dark:border-gray-700 relative z-10"
      >
        <div className="flex items-center gap-3">
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.15 + 0.2, type: "spring" }}
            viewport={{ once: true }}
            className="w-10 h-10 rounded-full bg-gradient-to-r from-[#8B0000] to-[#2D5016] flex items-center justify-center text-white font-bold"
          >
            RE
          </motion.div>
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900 dark:text-white">
              REPSFECO-CI
            </h3>
            <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
              <span>{relativeDate}</span>
              {activity.location && (
                <>
                  <span>•</span>
                  <span>{activity.location}</span>
                </>
              )}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Contenu */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: index * 0.15 + 0.2 }}
        viewport={{ once: true }}
        className="p-4 relative z-10"
      >
        <h4
          className="text-lg font-semibold mb-2 text-gray-900 dark:text-white cursor-pointer hover:text-[#8B0000] dark:hover:text-[#A52A2A] transition-colors"
          onClick={() => onOpen(activity)}
        >
          {activity.title}
        </h4>
        <p className="text-sm text-gray-700 dark:text-gray-300 mb-4 line-clamp-3">
          {activity.shortDescription}
        </p>

        {/* Vidéos (priorité sur les images) */}
        {activity.videos && activity.videos.length > 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.15 + 0.3 }}
            viewport={{ once: true }}
            className="relative rounded-lg overflow-hidden mb-4 cursor-pointer group"
            onClick={() => onOpen(activity)}
          >
            <div className="relative w-full h-64 sm:h-96 bg-black">
              <video
                src={activity.videos[0]}
                className="w-full h-full object-cover"
                controls={false}
                muted
                playsInline
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/10 transition-colors">
                <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center">
                  <svg
                    className="w-8 h-8 text-[#8B0000] ml-1"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
              {activity.videos.length > 1 && (
                <div className="absolute top-2 right-2 px-2 py-1 bg-black/60 text-white text-xs rounded">
                  +{activity.videos.length - 1} vidéo{activity.videos.length > 2 ? "s" : ""}
                </div>
              )}
            </div>
          </motion.div>
        ) : activity.images.length > 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.15 + 0.3 }}
            viewport={{ once: true }}
            className="relative rounded-lg overflow-hidden mb-4 cursor-pointer group"
            onClick={() => onOpen(activity)}
          >
            {activity.images.length === 1 ? (
              <div className="relative w-full h-64 sm:h-96">
                <Image
                  src={activity.images[0]}
                  alt={activity.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 768px"
                />
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-1">
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.15 + 0.4 }}
                  viewport={{ once: true }}
                  className="relative h-48 sm:h-64"
                >
                  <Image
                    src={activity.images[0]}
                    alt={activity.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 50vw, 384px"
                  />
                </motion.div>
                {activity.images.length > 1 && (
                  <motion.div
                    initial={{ opacity: 0, x: 10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.15 + 0.45 }}
                    viewport={{ once: true }}
                    className="relative h-48 sm:h-64"
                  >
                    <Image
                      src={activity.images[1]}
                      alt={activity.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 50vw, 384px"
                    />
                    {activity.images.length > 2 && (
                      <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                        <span className="text-white text-2xl font-bold">
                          +{activity.images.length - 2}
                        </span>
                      </div>
                    )}
                  </motion.div>
                )}
              </div>
            )}
          </motion.div>
        ) : null}

        {/* Footer avec catégorie et bouton */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: index * 0.15 + 0.4 }}
          viewport={{ once: true }}
          className="flex items-center justify-between pt-3 border-t border-gray-200 dark:border-gray-700"
        >
          {activity.category && (
            <motion.span
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.15 + 0.5, type: "spring" }}
              viewport={{ once: true }}
              className="px-3 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full"
            >
              {activity.category}
            </motion.span>
          )}
          <motion.button
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: index * 0.15 + 0.5 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onOpen(activity)}
            className="px-4 py-2 text-sm font-medium text-[#8B0000] dark:text-[#A52A2A] hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
          >
            Voir plus
          </motion.button>
        </motion.div>
      </motion.div>
    </motion.article>
  );
};

export default ActivityCard;

