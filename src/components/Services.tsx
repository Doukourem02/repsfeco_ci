"use client";

import Title from "./Title";
import ServiceCard from "./ServiceCard";
import { motion } from "motion/react";
import Image from "next/image";
import assets from "@/config/assets";
import type { Service } from "@/types/assets";

const Services = () => {
  const servicesData: Service[] = [
    {
      title: "Paix et Sécurité",
      description:
        "Sensibilisation communautaire et promotion d'un environnement pacifique pour renforcer la participation des femmes dans les processus de paix.",
      icon: assets.peace_security_icon,
    },
    {
      title: "Autonomisation économique des femmes",
      description: "Ateliers de formation et appui à l'autonomie pour renforcer la résilience des femmes face aux défis économiques.",
      icon: assets.empowerment_icon,
    },
    {
      title: "Prévention des conflits et lutte contre l'extrémisme",
      description:
        "Programmes et formations pour impliquer les femmes comme actrices de paix et prévenir l'extrémisme violent.",
      icon: assets.conflict_prevention_icon,
    },
    {
      title: "Renforcement des capacités",
      description:
        "Éducation, formations et panels sur les résolutions internationales concernant les femmes, la paix et la sécurité.",
      icon: assets.capacity_building_icon,
    },
  ];

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      transition={{ staggerChildren: 0.2 }}
      id="services"
      className="relative flex flex-col items-center gap-7 px-4 sm:px-12 lg:px-24 xl:px-40 pt-30 text-gray-700 dark:text-white"
    >
      <Image
        src={assets.bgImage2}
        alt=""
        className="absolute -top-110 -left-70 -z-1 dark:hidden"
        width={800}
        height={800}
      />

      <Title
        title="Nos domaines d'intervention"
        desc="REPSFECO-CI œuvre pour l'intégration des femmes dans les mécanismes de paix, de sécurité et de prévention des conflits en Côte d'Ivoire."
      />

      <div className="flex flex-col md:grid grid-cols-2">
        {servicesData.map((service, index) => (
          <ServiceCard key={index} service={service} index={index} />
        ))}
      </div>
    </motion.div>
  );
};

export default Services;

