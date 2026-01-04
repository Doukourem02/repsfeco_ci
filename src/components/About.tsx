"use client";

import Title from "./Title";
import { motion } from "motion/react";

const About = () => {
  const objectives = [
    "Promouvoir la participation active des femmes dans les processus de paix et de sécurité.",
    "Renforcer les capacités des femmes, des jeunes et des communautés vulnérables face aux conflits.",
    "Sensibiliser et mobiliser autour de l'Agenda « Femmes, Paix et Sécurité ».",
    "Contribuer à l'élimination des violences basées sur le genre et à la cohésion sociale.",
  ];

  return (
    <motion.div
      id="about"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="flex flex-col items-center gap-7 px-4 sm:px-12 lg:px-24 xl:px-40 pt-30 text-gray-800 dark:text-white"
    >
      <Title
        title="À propos du REPSFECO-CI"
        desc="REPSFECO-CI sert d'organe de coordination des initiatives des organisations de la société civile Ivoirienne dans le cadre du Plan d'Action de la CEDEAO pour la mise en œuvre des résolutions 1325/2000 et suivantes du Conseil de Sécurité des Nations Unies."
      />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true }}
        className="w-full max-w-4xl"
      >
        <h3 className="text-2xl font-semibold mb-6 text-center">
          Objectifs clés
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          {objectives.map((objective, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              viewport={{ once: true }}
              className="p-5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="flex items-start gap-3">
                <span className="text-primary font-bold text-xl">•</span>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  {objective}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default About;

