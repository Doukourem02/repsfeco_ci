"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import type { Activity } from "@/types/assets";
import type { ActivityWithComments, Comment } from "@/types/activity";
import ActivityGallery from "./ActivityGallery";
import ActivityComments from "./ActivityComments";
import ActivityShare from "./ActivityShare";
import assets from "@/config/assets";

interface ActivityModalProps {
  activity: Activity | null;
  onClose: () => void;
}

const ActivityModal = ({ activity, onClose }: ActivityModalProps) => {
  const [activityWithComments, setActivityWithComments] = useState<ActivityWithComments | null>(null);

  useEffect(() => {
    if (activity) {
      document.body.style.overflow = "hidden";
      // Charger les commentaires
      fetch(`/api/comments?activityId=${activity.id}`)
        .then((res) => res.json())
        .then((comments: Comment[]) => {
          setActivityWithComments({
            ...activity,
            comments: comments.sort((a, b) => b.dateTimestamp - a.dateTimestamp),
          });
        })
        .catch(() => {
          setActivityWithComments({ ...activity, comments: [] });
        });
    } else {
      document.body.style.overflow = "unset";
      setActivityWithComments(null);
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [activity]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && activity) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [activity, onClose]);

  const handleAddComment = async (activityId: string, comment: Omit<Comment, "id" | "dateTimestamp">) => {
    try {
      const response = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          activityId,
          ...comment,
        }),
      });

      const result = await response.json();
      if (result.success && activityWithComments) {
        setActivityWithComments({
          ...activityWithComments,
          comments: [
            result.comment,
            ...(activityWithComments.comments || []),
          ],
        });
      }
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  if (!activity || !activityWithComments) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ duration: 0.4, type: "spring", damping: 25 }}
          className="relative w-full max-w-4xl max-h-[90vh] bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header avec bouton fermer */}
          <div className="relative p-6 border-b border-gray-200 dark:border-gray-700">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Fermer"
            >
              <Image
                src={assets.close_icon}
                alt="Fermer"
                width={24}
                height={24}
                className="dark:invert"
              />
            </button>
            <h2 className="text-2xl sm:text-3xl font-semibold pr-12 text-gray-800 dark:text-white">
              {activityWithComments.title}
            </h2>
            <div className="flex flex-wrap gap-3 mt-3">
              {activityWithComments.date && (
                <span className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-800 rounded-full text-gray-700 dark:text-gray-300">
                  📅 {activityWithComments.date}
                </span>
              )}
              {activityWithComments.category && (
                <span className="px-3 py-1 text-sm bg-[#8B0000] text-white rounded-full">
                  {activityWithComments.category}
                </span>
              )}
              {activityWithComments.location && (
                <span className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-800 rounded-full text-gray-700 dark:text-gray-300">
                  📍 {activityWithComments.location}
                </span>
              )}
            </div>
          </div>

          {/* Contenu scrollable */}
          <div className="overflow-y-auto max-h-[calc(90vh-200px)] p-6">
            {/* Galerie d'images et vidéos */}
            <ActivityGallery 
              images={activityWithComments.images} 
              videos={activityWithComments.videos}
              title={activityWithComments.title} 
            />

            {/* Description complète */}
            <div className="mt-6 prose prose-sm dark:prose-invert max-w-none">
              <div className="text-gray-700 dark:text-gray-300 whitespace-pre-line leading-relaxed">
                {activityWithComments.fullDescription}
              </div>
            </div>

            {/* Partage */}
            <ActivityShare activity={activityWithComments} />

            {/* Commentaires */}
            <ActivityComments
              activity={activityWithComments}
              onAddComment={handleAddComment}
            />
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ActivityModal;

