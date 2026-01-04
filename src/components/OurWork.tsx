"use client";

import { useState, useEffect } from "react";
import Title from "./Title";
import { motion } from "motion/react";
import { activities as staticActivities } from "@/config/activities";
import type { Activity } from "@/types/assets";
import ActivityCard from "./ActivityCard";
import ActivityModal from "./ActivityModal";
import Link from "next/link";

const OurWork = () => {
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);
  const [allActivities, setAllActivities] = useState<Activity[]>(staticActivities);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Charger les activités depuis l'API
    fetch("/api/activities")
      .then((res) => res.json())
      .then((apiActivities: Activity[]) => {
        // Combiner les activités statiques et dynamiques, trier par date
        const combined = [...staticActivities, ...apiActivities].sort(
          (a, b) => b.dateTimestamp - a.dateTimestamp
        );
        setAllActivities(combined);
        setIsLoading(false);
      })
      .catch(() => {
        setAllActivities(staticActivities);
        setIsLoading(false);
      });
  }, []);

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      transition={{ staggerChildren: 0.15 }}
      id="our-work"
      className="flex flex-col items-center gap-7 px-4 sm:px-12 lg:px-24 xl:px-40 pt-30 text-gray-700 dark:text-white"
    >
      <div className="w-full max-w-6xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
          <div className="flex-1">
            <Title
              title="Nos actions"
              desc="Des initiatives concrètes pour promouvoir la paix, la sécurité et l'autonomisation des femmes en Côte d'Ivoire."
            />
          </div>
          <Link
            href="/admin"
            className="px-6 py-3 bg-[#8B0000] dark:bg-[#A52A2A] text-white rounded-lg hover:opacity-90 transition-opacity font-medium text-sm whitespace-nowrap shadow-lg hover:shadow-xl"
          >
            + Publier une activité
          </Link>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center py-20">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-8 h-8 border-4 border-[#8B0000] border-t-transparent rounded-full"
          />
        </div>
      ) : allActivities.length > 0 ? (
        <div className="grid sm:grid-cols-2 gap-6 w-full max-w-6xl">
          {allActivities.map((activity, index) => (
            <ActivityCard
              key={activity.id}
              activity={activity}
              index={index}
              onOpen={setSelectedActivity}
            />
          ))}
        </div>
      ) : (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-gray-500 dark:text-gray-400 text-center"
        >
          Aucune activité disponible pour le moment.
        </motion.p>
      )}

      {/* Modal pour afficher les détails de l'activité */}
      <ActivityModal
        activity={selectedActivity}
        onClose={() => setSelectedActivity(null)}
      />
    </motion.div>
  );
};

export default OurWork;

