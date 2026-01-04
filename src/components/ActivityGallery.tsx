"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";

interface ActivityGalleryProps {
  images: string[];
  videos?: string[];
  title: string;
}

const ActivityGallery = ({ images, videos, title }: ActivityGalleryProps) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedVideo, setSelectedVideo] = useState(0);
  const [mediaType, setMediaType] = useState<"images" | "videos">(
    videos && videos.length > 0 ? "videos" : "images"
  );

  const allMedia = [
    ...(videos?.map((v) => ({ type: "video" as const, src: v })) || []),
    ...images.map((i) => ({ type: "image" as const, src: i })),
  ];

  if (allMedia.length === 0) return null;

  return (
    <div className="w-full">
      {/* Onglets Images/Vidéos */}
      {(videos && videos.length > 0 && images.length > 0) && (
        <div className="flex gap-2 mb-4">
          <button
            onClick={() => {
              setMediaType("videos");
              setSelectedVideo(0);
            }}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              mediaType === "videos"
                ? "bg-[#8B0000] text-white"
                : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
            }`}
          >
            Vidéos ({videos.length})
          </button>
          <button
            onClick={() => {
              setMediaType("images");
              setSelectedImage(0);
            }}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              mediaType === "images"
                ? "bg-[#8B0000] text-white"
                : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
            }`}
          >
            Images ({images.length})
          </button>
        </div>
      )}

      {/* Média principal */}
      <div className="relative w-full h-64 sm:h-80 md:h-96 mb-4 rounded-lg overflow-hidden bg-black">
        <AnimatePresence mode="wait">
          {mediaType === "videos" && videos && videos.length > 0 ? (
            <motion.div
              key={`video-${selectedVideo}`}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0"
            >
              <video
                src={videos[selectedVideo]}
                controls
                className="w-full h-full object-contain"
              />
            </motion.div>
          ) : (
            <motion.div
              key={`image-${selectedImage}`}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0"
            >
              <Image
                src={images[selectedImage]}
                alt={`${title} - Image ${selectedImage + 1}`}
                fill
                className="object-cover"
                sizes="100vw"
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation précédent/suivant */}
        {((mediaType === "videos" && videos && videos.length > 1) ||
          (mediaType === "images" && images.length > 1)) && (
          <>
            <button
              onClick={() => {
                if (mediaType === "videos" && videos) {
                  setSelectedVideo((prev) => (prev === 0 ? videos.length - 1 : prev - 1));
                } else {
                  setSelectedImage((prev) => (prev === 0 ? images.length - 1 : prev - 1));
                }
              }}
              className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all backdrop-blur-sm z-10"
              aria-label="Précédent"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <button
              onClick={() => {
                if (mediaType === "videos" && videos) {
                  setSelectedVideo((prev) => (prev === videos.length - 1 ? 0 : prev + 1));
                } else {
                  setSelectedImage((prev) => (prev === images.length - 1 ? 0 : prev + 1));
                }
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all backdrop-blur-sm z-10"
              aria-label="Suivant"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </>
        )}

        {/* Indicateur */}
        {((mediaType === "videos" && videos && videos.length > 1) ||
          (mediaType === "images" && images.length > 1)) && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-xs backdrop-blur-sm">
            {mediaType === "videos" && videos
              ? `${selectedVideo + 1} / ${videos.length}`
              : `${selectedImage + 1} / ${images.length}`}
          </div>
        )}
      </div>

      {/* Miniatures */}
      {mediaType === "videos" && videos && videos.length > 1 ? (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {videos.map((video, index) => (
            <motion.button
              key={index}
              onClick={() => setSelectedVideo(index)}
              className={`relative aspect-video rounded-lg overflow-hidden border-2 transition-all ${
                selectedVideo === index
                  ? "border-[#8B0000] dark:border-[#A52A2A] scale-105"
                  : "border-transparent opacity-60 hover:opacity-100"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <video
                src={video}
                className="w-full h-full object-cover"
                muted
                playsInline
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-8 h-8 rounded-full bg-white/90 flex items-center justify-center">
                  <svg
                    className="w-4 h-4 text-[#8B0000] ml-0.5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      ) : images.length > 1 ? (
        <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
          {images.map((image, index) => (
            <motion.button
              key={index}
              onClick={() => setSelectedImage(index)}
              className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                selectedImage === index
                  ? "border-[#8B0000] dark:border-[#A52A2A] scale-105"
                  : "border-transparent opacity-60 hover:opacity-100"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Image
                src={image}
                alt={`Miniature ${index + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 25vw, 16vw"
              />
            </motion.button>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default ActivityGallery;

