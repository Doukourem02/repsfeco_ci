"use client";

import { useState, useRef } from "react";
import { motion } from "motion/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Image from "next/image";
import assets from "@/config/assets";
import type { ActivityFormData } from "@/types/activity";

const categories = [
  "Formation",
  "Sensibilisation",
  "Panel",
  "Mobilisation",
  "Atelier",
  "Conférence",
  "Autre",
];

export default function AdminPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<ActivityFormData>({
    title: "",
    shortDescription: "",
    fullDescription: "",
    date: "",
    category: "",
    location: "",
    images: [],
    videos: [],
  });
  const [previews, setPreviews] = useState<string[]>([]);
  const [videoPreviews, setVideoPreviews] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    // Limiter à 10 images
    const newFiles = files.slice(0, 10);
    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, ...newFiles].slice(0, 10),
    }));

    // Créer les previews
    newFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviews((prev) => [...prev, reader.result as string]);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    // Limiter à 5 vidéos
    const newFiles = files.slice(0, 5);
    setFormData((prev) => ({
      ...prev,
      videos: [...prev.videos, ...newFiles].slice(0, 5),
    }));

    // Créer les previews vidéo
    newFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setVideoPreviews((prev) => [...prev, reader.result as string]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
    setPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const removeVideo = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      videos: prev.videos.filter((_, i) => i !== index),
    }));
    setVideoPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const submitFormData = new FormData();
      submitFormData.append("title", formData.title);
      submitFormData.append("shortDescription", formData.shortDescription);
      submitFormData.append("fullDescription", formData.fullDescription);
      submitFormData.append("date", formData.date);
      submitFormData.append("category", formData.category);
      submitFormData.append("location", formData.location);

      formData.images.forEach((image) => {
        submitFormData.append("images", image);
      });

      formData.videos.forEach((video) => {
        submitFormData.append("videos", video);
      });

      const response = await fetch("/api/activities", {
        method: "POST",
        body: submitFormData,
      });

      const result = await response.json();

      if (result.success) {
        toast.success("Activité publiée avec succès !");
        // Réinitialiser le formulaire
        setFormData({
          title: "",
          shortDescription: "",
          fullDescription: "",
          date: "",
          category: "",
          location: "",
          images: [],
          videos: [],
        });
        setPreviews([]);
        setVideoPreviews([]);
        router.push("/#our-work");
        router.refresh();
      } else {
        toast.error("Erreur lors de la publication");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Une erreur s'est produite");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Obtenir la date du jour au format français
  const today = new Date().toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-white dark:bg-black w-full">
      <div className="max-w-4xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 sm:p-8"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#8B0000] to-[#2D5016] flex items-center justify-center text-white font-bold text-lg">
              RE
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Publier une nouvelle activité
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Partagez une mission ou un événement de REPSFECO-CI
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Titre */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Titre de l'activité *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#8B0000] dark:focus:ring-[#A52A2A]"
                placeholder="Ex: Atelier de formation sur la Résolution 1325"
              />
            </div>

            {/* Description courte */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Description courte *
              </label>
              <textarea
                name="shortDescription"
                value={formData.shortDescription}
                onChange={handleInputChange}
                required
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#8B0000] dark:focus:ring-[#A52A2A] resize-none"
                placeholder="Une brève description qui apparaîtra dans la carte d'activité..."
              />
            </div>

            {/* Description complète */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Description complète *
              </label>
              <textarea
                name="fullDescription"
                value={formData.fullDescription}
                onChange={handleInputChange}
                required
                rows={8}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#8B0000] dark:focus:ring-[#A52A2A] resize-none"
                placeholder="Décrivez en détail l'activité, les objectifs, les participants, les résultats..."
              />
            </div>

            {/* Date et Catégorie */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Date *
                </label>
                <input
                  type="text"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#8B0000] dark:focus:ring-[#A52A2A]"
                  placeholder={`Ex: ${today}`}
                />
                <p className="mt-1 text-xs text-gray-500">
                  Format: "jour mois année" (ex: 15 novembre 2023)
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Catégorie
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#8B0000] dark:focus:ring-[#A52A2A]"
                >
                  <option value="">Sélectionner une catégorie</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Lieu */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Lieu
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#8B0000] dark:focus:ring-[#A52A2A]"
                placeholder="Ex: Abidjan, Côte d'Ivoire"
              />
            </div>

            {/* Upload d'images */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Images (jusqu'à 10 images)
              </label>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageChange}
                className="hidden"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="w-full px-4 py-3 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg hover:border-[#8B0000] dark:hover:border-[#A52A2A] transition-colors text-gray-600 dark:text-gray-400"
              >
                <div className="flex flex-col items-center gap-2">
                  <svg
                    className="w-8 h-8"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                  <span>Cliquez pour ajouter des images</span>
                </div>
              </button>

              {/* Previews des images */}
              {previews.length > 0 && (
                <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {previews.map((preview, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="relative group"
                    >
                      <div className="relative aspect-square rounded-lg overflow-hidden">
                        <img
                          src={preview}
                          alt={`Preview ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
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
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Upload de vidéos */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Vidéos (jusqu'à 5 vidéos)
              </label>
              <input
                ref={videoInputRef}
                type="file"
                accept="video/*"
                multiple
                onChange={handleVideoChange}
                className="hidden"
              />
              <button
                type="button"
                onClick={() => videoInputRef.current?.click()}
                className="w-full px-4 py-3 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg hover:border-[#8B0000] dark:hover:border-[#A52A2A] transition-colors text-gray-600 dark:text-gray-400"
              >
                <div className="flex flex-col items-center gap-2">
                  <svg
                    className="w-8 h-8"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                    />
                  </svg>
                  <span>Cliquez pour ajouter des vidéos</span>
                </div>
              </button>

              {/* Previews des vidéos */}
              {videoPreviews.length > 0 && (
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {videoPreviews.map((preview, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="relative group"
                    >
                      <div className="relative aspect-video rounded-lg overflow-hidden bg-gray-900">
                        <video
                          src={preview}
                          controls
                          className="w-full h-full"
                        />
                        <button
                          type="button"
                          onClick={() => removeVideo(index)}
                          className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-10"
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
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Boutons */}
            <div className="flex gap-4 pt-4">
              <button
                type="button"
                onClick={() => router.back()}
                className="flex-1 px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                Annuler
              </button>
              <button
                type="submit"
                disabled={isSubmitting || (formData.images.length === 0 && formData.videos.length === 0)}
                className="flex-1 px-6 py-3 bg-[#8B0000] dark:bg-[#A52A2A] text-white rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed font-medium"
              >
                {isSubmitting ? "Publication..." : "Publier l'activité"}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}

