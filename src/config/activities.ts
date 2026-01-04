import type { Activity } from "@/types/assets";
import { parseFrenchDate } from "@/utils/dateParser";

/**
 * Configuration des activités REPSFECO-CI
 * Les activités sont triées automatiquement par date (plus récentes en premier)
 * Structure : public/assets/actions /act{id}/img/*.jpg
 */
const activitiesData: Omit<Activity, "dateTimestamp">[] = [
  {
    id: "act1",
    title: "Atelier d'appropriation et de vulgarisation de la Résolution 2250 de l'ONU",
    shortDescription:
      "Les jeunes engagés à la promotion de la R2250 de l'ONU. Atelier organisé dans les locaux de la représentation de la CEDEAO en Côte d'Ivoire.",
    fullDescription: `Paix et Sécurité en Côte d'Ivoire :
Les jeunes engagés à la promotion de la R2250 de l'ONU.
Dans les locaux de la représentation de la CEDEAO en Côte d'Ivoire, s'est tenu un atelier d'appropriation et de vulgarisation de la Résolution 2250 de l'organisation des Nations Unies (ONU), ce mercredi 25 octobre 2023.
L'atelier, organisé par les sections ivoiriennes du Groupe de Travail Femmes, Jeunes, Paix et Sécurité dans l'espace CEDEAO et le Sahel (GTFJPS-AOS) et du Réseau Paix et Sécurité des Femmes dans l'espace CEDEAO (REPSFECO) en collaboration avec la Représentation de la CEDEAO en Côte d'Ivoire, a bénéficié de l'appui technique et financier de l'Ambassade de Canada en Côte d'Ivoire.
Cette rencontre a été présidée par Monsieur Ibrahima Diabaté, Président du Conseil National des Jeunes de Côte d'Ivoire (CNJCI), en présence de son Excellence Madame Cissé Fanta, Représentante résidente de la CEDEAO en Côte d'Ivoire, de son Excellence Monsieur Anderson Leblanc, Ambassadeur de Canada en Côte d'Ivoire et de Madame Yoli-Bi Marguerite, 1ère Vice-présidente de REPSFECO-Côte d'Ivoire. 
Pour aider à la compréhension, à l'appropriation et à la vulgarisation de la R2250 par les participant/e/s composé/e/s des leaders de jeunes et des membres des structures de jeunesse, Monsieur Giscard Kouassi, Expert en Gouvernance au Programme des nations Unies pour le Développement (PNUD), a présenté ladite Résolution, avec un accent mis sur ses cinq piliers. Ces partages d'expériences et ceux des participant/e/s ont également permis de soutenir ces piliers que sont (i) la participation, (ii) la protection, (iii) la prévention, (iv) le partenariat et (v) le développement et la réintégration.
Au sortir dudit atelier, les participant/e/s, dans leur ensemble, se sont engagé/e/s à s'approprier et à vulgariser la Résolution 2250 et à élaborer un plan national d'action de la laite R2250 en s'inspirant du plan national d'action de la R1325.
Le Réseau d'Action Sur les Armes Légères en Afrique de l'Ouest, section Côte d'Ivoire (RASALAO-CI) est membre du GTFJPS-AOS. A cet effet, le Président du RASALAO-CI, Monsieur Victorien Aka N'tayé a participé activement à cette rencontre.
Service Communication du RASALAO-CI`,
    date: "28 octobre 2023",
    images: [
      "/assets/actions /act1/img/476013492_948880923890785_4117210094938910918_n.jpg",
      "/assets/actions /act1/img/476162499_948881083890769_3015818145893526657_n.jpg",
      "/assets/actions /act1/img/476369049_948881167224094_789912006098262608_n.jpg",
      "/assets/actions /act1/img/476381800_948880897224121_6664262831932704110_n.jpg",
    ],
    category: "Formation",
    location: "Représentation de la CEDEAO en Côte d'Ivoire, Abidjan",
  },
  {
    id: "act2",
    title: "Activité REPSFECO-CI - 12 octobre", // À remplacer avec le titre réel
    shortDescription:
      "Description courte de l'activité du 12 octobre 2023.", // À remplacer avec la description courte
    fullDescription: `Description complète de l'activité du 12 octobre 2023.

Veuillez remplacer ce texte avec la description complète de l'activité.`, // À remplacer avec la description complète
    date: "12 octobre 2023",
    images: [
      "/assets/actions /act2/img/558935376_122174560514519210_4695943555237556522_n.jpg",
      "/assets/actions /act2/img/559032902_122174560334519210_541758202480012407_n.jpg",
      "/assets/actions /act2/img/559063267_122174560244519210_503063109883966115_n-2.jpg",
      "/assets/actions /act2/img/559217304_122174560286519210_6656682371533422661_n.jpg",
    ],
    category: "Activité", // À remplacer avec la catégorie appropriée
    location: "Côte d'Ivoire", // À remplacer avec le lieu réel si disponible
  },
  {
    id: "act3",
    title: "Activité REPSFECO-CI - 12 octobre", // À remplacer avec le titre réel
    shortDescription:
      "Description courte de l'activité du 12 octobre 2023.", // À remplacer avec la description courte
    fullDescription: `Description complète de l'activité du 12 octobre 2023.

Veuillez remplacer ce texte avec la description complète de l'activité.`, // À remplacer avec la description complète
    date: "12 octobre 2023",
    images: [
      "/assets/actions /act3/img/558974578_122174520434519210_5767700775355259397_n.jpg",
      "/assets/actions /act3/img/559032902_122174520620519210_744082494332958051_n.jpg",
      "/assets/actions /act3/img/559033205_122174520476519210_1867936293360594718_n.jpg",
      "/assets/actions /act3/img/559580765_122174520536519210_6820345783566193321_n.jpg",
      "/assets/actions /act3/img/562226140_122174520572519210_2344983199831738529_n.jpg",
    ],
    category: "Activité", // À remplacer avec la catégorie appropriée
    location: "Côte d'Ivoire", // À remplacer avec le lieu réel si disponible
  },
  {
    id: "act4",
    title: "VOIX ET LEADERSHIP DES FEMMES ET DES JEUNES POUR UN ENVIRONNEMENT ÉLECTORAL APAISÉ EN 2025 EN CÔTE D'IVOIRE",
    shortDescription:
      "Session de sensibilisation des populations à l'éducation civique et à la citoyenneté à Daoukro. Projet soutenu par l'Organisation internationale de la Francophonie (OIF).",
    fullDescription: `Projet : "VOIX ET LEADERSHIP DES FEMMES ET DES JEUNES POUR UN ENVIRONNEMENT ÉLECTORAL APAISÉ EN 2025 EN CÔTE D'IVOIRE"
    
Avec le soutien de l'Organisation internationale de la Francophonie (OIF)

Étape de Daoukro
Session de sensibilisation des populations à l'éducation civique et à la citoyenneté

Date et lieu : 30 octobre 2025 à la salle de réunion de la Préfecture de Daoukro

Objectifs :
- Sensibiliser et renforcer les capacités des participant.e.s sur la citoyenneté responsable ;
- Informer les participant.e.s (femmes et jeunes) sur leurs droits et devoirs civiques ;
- Stimuler une réflexion collective sur les défis citoyens locaux ;
- Élaborer des pistes d'actions simples pour promouvoir le civisme

Cérémonie de clôture

Toute notre reconnaissance à l'Organisation internationale de la Francophonie (OIF), à travers Mme Artida Minga.`,
    date: "30 octobre 2025",
    images: [
      "/assets/actions /act4/img/558034655_122174152202519210_8029771657613264581_n.jpg",
      "/assets/actions /act4/img/558037243_122174151524519210_4931970163069732487_n.jpg",
      "/assets/actions /act4/img/558097000_122174152172519210_1956109356329736770_n.jpg",
      "/assets/actions /act4/img/558628891_122174151842519210_5962146280502915592_n.jpg",
      "/assets/actions /act4/img/558784561_122174152148519210_4142590617752296829_n.jpg",
    ],
    category: "Sensibilisation",
    location: "Daoukro, salle de réunion de la Préfecture",
  },
];

// Ajouter les timestamps et trier par date (plus récentes en premier)
export const activities: Activity[] = activitiesData
  .map((activity) => ({
    ...activity,
    dateTimestamp: parseFrenchDate(activity.date),
  }))
  .sort((a, b) => b.dateTimestamp - a.dateTimestamp); // Tri décroissant (plus récent en premier)

