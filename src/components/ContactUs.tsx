"use client";

import assets from "@/config/assets";
import { motion } from "motion/react";
import Image from "next/image";
import { FormEvent } from "react";
import toast from "react-hot-toast";
import Title from "./Title";

const ContactUs = () => {
  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    // ------- Enter your Web3Forms key below -----
    formData.append("access_key", "--- Enter Web3Forms key ---");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        toast.success("Merci pour votre message !");
        event.currentTarget.reset();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Une erreur s'est produite"
      );
    }
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      transition={{ staggerChildren: 0.2 }}
      id="contact-us"
      className="flex flex-col items-center gap-7 px-4 sm:px-12 lg:px-24 xl:px-40 pt-30 text-gray-700 dark:text-white"
    >
      <Title
        title="Contactez-nous"
        desc="REPSFECO-CI — Réseau Paix et Sécurité pour les Femmes de l'Espace CEDEAO — Section Côte d'Ivoire"
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        viewport={{ once: true }}
        className="w-full max-w-2xl mb-6 text-center text-gray-600 dark:text-gray-400"
      >
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center text-sm">
          <div className="flex items-center gap-2">
            <span>📍</span>
            <span>Abidjan – Cocody Saint Jean Val Doyen, Rez de chaussée, Immeuble Charlemagne</span>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-3 text-sm">
          <div className="flex items-center gap-2">
            <span>📞</span>
            <span>+225 57 99 14 90 / 21 35 09 03 / 22 44 67 08</span>
          </div>
          <div className="flex items-center gap-2">
            <span>✉️</span>
            <a href="mailto:repsfecoci@yahoo.fr" className="hover:text-primary">repsfecoci@yahoo.fr</a>
          </div>
        </div>
      </motion.div>

      <motion.form
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        viewport={{ once: true }}
        onSubmit={onSubmit}
        className="grid sm:grid-cols-2 gap-3 sm:gap-5 max-w-2xl w-full"
      >
        <div>
          <p className="mb-2 text-sm font-medium">Votre nom</p>
          <div className="flex pl-3 rounded-lg border border-gray-300 dark:border-gray-600">
            <Image src={assets.person_icon} alt="" width={20} height={20} />
            <input
              name="name"
              type="text"
              placeholder="Entrez votre nom"
              className="w-full p-3 text-sm outline-none"
              required
            />
          </div>
        </div>

        <div>
          <p className="mb-2 text-sm font-medium">Adresse e-mail</p>
          <div className="flex pl-3 rounded-lg border border-gray-300 dark:border-gray-600">
            <Image src={assets.email_icon} alt="" width={20} height={20} />
            <input
              name="email"
              type="email"
              placeholder="Entrez votre e-mail"
              className="w-full p-3 text-sm outline-none"
              required
            />
          </div>
        </div>

        <div className="sm:col-span-2">
          <p className="mb-2 text-sm font-medium">Message</p>
          <textarea
            name="message"
            rows={8}
            placeholder="Entrez votre message"
            className="w-full p-3 text-sm outline-none rounded-lg border border-gray-300 dark:border-gray-600"
            required
          />
        </div>

        <button
          type="submit"
          className="w-max flex gap-2 bg-primary text-white text-sm px-10 py-3 rounded-full cursor-pointer hover:scale-103 transition-all"
        >
          Envoyer{" "}
          <Image
            src={assets.arrow_icon}
            alt=""
            className="w-4"
            width={16}
            height={16}
          />
        </button>
      </motion.form>
    </motion.div>
  );
};

export default ContactUs;
