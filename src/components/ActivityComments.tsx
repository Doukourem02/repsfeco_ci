"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import type { Comment, ActivityWithComments } from "@/types/activity";
import { formatRelativeDate } from "@/utils/dateParser";
import { parseFrenchDate } from "@/utils/dateParser";

interface ActivityCommentsProps {
  activity: ActivityWithComments;
  onAddComment: (activityId: string, comment: Omit<Comment, "id" | "dateTimestamp">) => void;
}

const ActivityComments = ({ activity, onAddComment }: ActivityCommentsProps) => {
  const [newComment, setNewComment] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [showForm, setShowForm] = useState(false);
  const comments = activity.comments || [];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || !authorName.trim()) return;

    onAddComment(activity.id, {
      activityId: activity.id,
      author: authorName,
      content: newComment,
      date: new Date().toLocaleDateString("fr-FR", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
    });

    setNewComment("");
    setAuthorName("");
    setShowForm(false);
  };

  return (
    <div className="mt-6 border-t border-gray-200 dark:border-gray-700 pt-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Commentaires ({comments.length})
        </h3>
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-4 py-2 text-sm font-medium text-[#8B0000] dark:text-[#A52A2A] hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
        >
          {showForm ? "Annuler" : "Commenter"}
        </button>
      </div>

      <AnimatePresence>
        {showForm && (
          <motion.form
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            onSubmit={handleSubmit}
            className="mb-6 space-y-3"
          >
            <input
              type="text"
              placeholder="Votre nom"
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#8B0000] dark:focus:ring-[#A52A2A]"
              required
            />
            <textarea
              placeholder="Écrivez un commentaire..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#8B0000] dark:focus:ring-[#A52A2A] resize-none"
              required
            />
            <button
              type="submit"
              className="w-full px-4 py-2 bg-[#8B0000] dark:bg-[#A52A2A] text-white rounded-lg hover:opacity-90 transition-opacity font-medium"
            >
              Publier
            </button>
          </motion.form>
        )}
      </AnimatePresence>

      <div className="space-y-4">
        <AnimatePresence>
          {comments.length === 0 ? (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center text-gray-500 dark:text-gray-400 py-8"
            >
              Aucun commentaire pour le moment. Soyez le premier à commenter !
            </motion.p>
          ) : (
            comments.map((comment, index) => (
              <motion.div
                key={comment.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
              >
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#8B0000] to-[#2D5016] flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                    {comment.author.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold text-gray-900 dark:text-white text-sm">
                        {comment.author}
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {formatRelativeDate(comment.dateTimestamp)}
                      </span>
                    </div>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      {comment.content}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ActivityComments;

