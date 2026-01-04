"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
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
  const router = useRouter();
  const [activityWithComments, setActivityWithComments] = useState<ActivityWithComments | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    // Vérifier l'authentification
    const checkAuth = async () => {
      try {
        const response = await fetch("/api/auth/check");
        const result = await response.json();
        setIsAuthenticated(result.authenticated);
      } catch (error) {
        setIsAuthenticated(false);
      }
    };
    checkAuth();
  }, []);

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
        body: JSON.stringify(comment),
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

  const handleEdit = () => {
    if (activity) {
      router.push(`/admin/edit/${activity.id}`);
      onClose();
    }
  };

  const handleDelete = async () => {
    if (!activity || !isAuthenticated) return;
    
    if (!confirm("Êtes-vous sûr de vouloir supprimer cette activité ? Cette action est irréversible.")) {
      return;
    }

    setIsDeleting(true);
    try {
      const response = await fetch(`/api/activities/${activity.id}`, {
        method: "DELETE",
      });

      const result = await response.json();
      if (result.success) {
        toast.success("Activité supprimée avec succès");
        onClose();
        // Déclencher un événement pour rafraîchir la liste
        window.dispatchEvent(new Event('activityDeleted'));
        router.refresh();
      } else {
        toast.error(result.error || "Erreur lors de la suppression");
      }
    } catch (error) {
      console.error("Error deleting activity:", error);
      toast.error("Une erreur s'est produite");
    } finally {
      setIsDeleting(false);
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
            <div className="flex items-center justify-between">
              <div className="flex-1">
                {isAuthenticated && (
                  <div className="flex gap-2 mb-3">
                    <button
                      onClick={handleEdit}
                      className="px-4 py-2 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center gap-2"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                        />
                      </svg>
                      Modifier
                    </button>
                    <button
                      onClick={handleDelete}
                      disabled={isDeleting}
                      className="px-4 py-2 text-sm bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                      {isDeleting ? "Suppression..." : "Supprimer"}
                    </button>
                  </div>
                )}
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
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
            </div>
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

