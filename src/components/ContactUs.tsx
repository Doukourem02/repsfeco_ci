"use client";

import assets from "@/config/assets";
import { motion } from "motion/react";
import Image from "next/image";
import { FormEvent } from "react";
import toast from "react-hot-toast";
import emailjs from "@emailjs/browser";
import Title from "./Title";

const ContactUs = () => {
  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const message = formData.get("message") as string;

    // Vérifier que les variables d'environnement sont disponibles
    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      toast.error("Configuration email manquante. Veuillez contacter l'administrateur.");
      return;
    }

    try {
      // Préparer les paramètres pour EmailJS
      const now = new Date();
      const time = now.toLocaleString("fr-FR", {
        dateStyle: "long",
        timeStyle: "short",
      });

      const templateParams = {
        from_name: name,
        from_email: email,
        to_email: "repsfecoci@yahoo.fr",
        message: message,
        reply_to: email,
        time: time,
      };

      // Envoyer l'email via EmailJS (côté client)
      await emailjs.send(serviceId, templateId, templateParams, publicKey);

      toast.success("Merci pour votre message ! Nous vous répondrons bientôt.");
      event.currentTarget.reset();
    } catch (error) {
      console.error("Erreur EmailJS:", error);
      toast.error(
        error instanceof Error
          ? error.message
          : "Une erreur s'est produite lors de l'envoi"
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
        <div className="flex flex-col gap-3 justify-center items-center text-sm">
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <div className="flex items-center gap-2">
            <span>📍</span>
              <span className="text-center">Siège social : Abidjan Cocody Saint Jean Val Doyen 2, Immeuble Ariane, 1er étage, port 9</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span>📮</span>
            <span>06 BP 390 ABIDJAN 06</span>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <div className="flex items-center gap-2">
            <span>📞</span>
              <span>+225 07 57 99 14 90 / 05 04 34 34 24 / 07 08 54 08 78 / 27 22 44 67 08</span>
          </div>
          <div className="flex items-center gap-2">
            <span>✉️</span>
            <a href="mailto:repsfecoci@yahoo.fr" className="hover:text-primary">repsfecoci@yahoo.fr</a>
            </div>
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
