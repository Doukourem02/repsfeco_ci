"use client";

import Title from "./Title";
import { motion } from "motion/react";
import Image from "next/image";
import assets from "@/config/assets";
import type { WorkItem } from "@/types/assets";

const OurWork = () => {
  const workData: WorkItem[] = [
    {
      title: "Panel pour la Journée commémorative de la Résolution 1325",
      description:
        "Organisation d'un panel visant à renforcer l'application des piliers de l'Agenda « Femmes, Paix et Sécurité » en Côte d'Ivoire.",
      image: assets.action_resolution_1325,
    },
    {
      title: "Formation des femmes du Nord",
      description: "Formation des femmes de Ouangolodougou, Niellé et Diawala à la prévention des conflits et à l'entrepreneuriat.",
      image: assets.action_formation_nord,
    },
    {
      title: "Mobilisation pour la paix au Sahel",
      description:
        "Mobilisation des femmes et des jeunes pour la paix au Sahel et en Côte d'Ivoire avec partenaires régionaux.",
      image: assets.action_mobilisation_sahel,
    },
  ];

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      transition={{ staggerChildren: 0.2 }}
      id="our-work"
      className="flex flex-col items-center gap-7 px-4 sm:px-12 lg:px-24 xl:px-40 pt-30 text-gray-700 dark:text-white"
    >
      <Title
        title="Nos actions"
        desc="Des initiatives concrètes pour promouvoir la paix, la sécurité et l'autonomisation des femmes en Côte d'Ivoire."
      />

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl">
        {workData.map((work, index) => (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            viewport={{ once: true }}
            key={index}
            className="hover:scale-102 duration-500 transition-all cursor-pointer"
          >
            <Image
              src={work.image}
              className="w-full rounded-xl"
              alt={work.title}
              width={400}
              height={300}
            />
            <h3 className="mt-3 mb-2 text-lg font-semibold">{work.title}</h3>
            <p className="text-sm opacity-60 w-5/6">{work.description}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default OurWork;

