# REPSFECO-CI - Site Web Officiel

Site web officiel du **Réseau Paix et Sécurité pour les Femmes de l'Espace CEDEAO — Section Côte d'Ivoire (REPSFECO-CI)**. Une organisation engagée depuis 2010 pour renforcer l'autonomisation, la participation et l'impact des femmes dans la paix et la sécurité en Côte d'Ivoire.

## 🚀 Technologies Utilisées

- **Next.js 16** - Framework React pour applications web avec rendu côté serveur
- **React 19** - Bibliothèque JavaScript pour construire l'interface utilisateur
- **TypeScript** - Langage de programmation typé pour JavaScript
- **Tailwind CSS 4** - Framework CSS utilitaire pour le styling
- **Motion** - Bibliothèque d'animations pour React
- **React Hot Toast** - Bibliothèque de notifications toast élégantes
- **Next Themes** - Gestion du thème sombre/clair
- **ESLint** - Outil de linting pour maintenir la qualité du code

## 📋 Prérequis

Avant de commencer, assurez-vous d'avoir installé sur votre machine :

- **Node.js** (version 20 ou supérieure requise)
- **npm** (généralement inclus avec Node.js) ou **yarn**

Pour vérifier que vous avez Node.js installé, exécutez dans votre terminal :

```bash
node --version
npm --version
```

Si vous ne les avez pas, téléchargez Node.js depuis [nodejs.org](https://nodejs.org/)

> **Note :** Si vous utilisez `nvm` (Node Version Manager), vous pouvez exécuter `nvm use` dans le dossier du projet pour utiliser automatiquement la version Node.js 20 spécifiée dans le fichier `.nvmrc`.

## 🛠️ Installation

1. **Cloner ou télécharger le projet** (si vous ne l'avez pas déjà fait)

2. **Ouvrir le terminal** et naviguer vers le dossier du projet :

```bash
cd repsfeco_ci
```

3. **Installer les dépendances** :

```bash
npm install
```

Cette commande va installer toutes les dépendances nécessaires listées dans le fichier `package.json`. Cela peut prendre quelques minutes la première fois.

## ▶️ Lancer le Projet

Une fois l'installation terminée, vous pouvez lancer le projet en mode développement :

```bash
npm run dev
```

Le serveur de développement Next.js va démarrer avec Turbopack et vous verrez une URL dans le terminal (généralement `http://localhost:3000`). Ouvrez cette URL dans votre navigateur pour voir le site.

Le serveur de développement inclut le **Hot Module Replacement (HMR)**, ce qui signifie que les modifications que vous apportez au code seront automatiquement reflétées dans le navigateur sans avoir à recharger la page.

## 📜 Scripts Disponibles

Le projet inclut plusieurs scripts npm que vous pouvez exécuter :

- **`npm run dev`** - Lance le serveur de développement Next.js avec Turbopack
- **`npm run build`** - Crée une version de production optimisée du projet
- **`npm run start`** - Lance le serveur de production (après `npm run build`)
- **`npm run lint`** - Vérifie le code avec ESLint pour détecter les erreurs potentielles

## 📁 Structure du Projet

```
repsfeco_ci/
├── public/                    # Fichiers statiques (images, favicon, etc.)
│   └── assets/              # Ressources multimédias
│       ├── partners/         # Logos des partenaires
│       └── slide/            # Images de présentation
├── src/
│   ├── app/                  # Pages et layouts Next.js
│   │   ├── layout.tsx        # Layout principal avec métadonnées
│   │   ├── page.tsx          # Page d'accueil
│   │   └── globals.css       # Styles globaux et configuration Tailwind
│   ├── components/           # Composants React réutilisables
│   │   ├── Navbar.tsx        # Barre de navigation
│   │   ├── Hero.tsx          # Section héro principale
│   │   ├── About.tsx         # Section "À propos"
│   │   ├── Services.tsx       # Section "Nos missions"
│   │   ├── OurWork.tsx       # Section "Nos actions"
│   │   ├── TrustedBy.tsx     # Section partenaires
│   │   ├── ContactUs.tsx     # Formulaire de contact
│   │   ├── Footer.tsx        # Pied de page
│   │   └── CustomCursor.tsx  # Curseur personnalisé
│   ├── config/               # Fichiers de configuration
│   │   └── assets.ts         # Configuration des assets
│   └── types/                # Définitions TypeScript
├── package.json               # Dépendances et scripts du projet
├── next.config.ts            # Configuration Next.js
├── tsconfig.json             # Configuration TypeScript
└── postcss.config.mjs        # Configuration PostCSS pour Tailwind
```

## ✨ Fonctionnalités

- 🌓 **Mode sombre/clair** - Basculement de thème avec persistance dans le localStorage
- 🎯 **Curseur personnalisé** - Curseur animé personnalisé
- 📱 **Design responsive** - Adapté à tous les écrans (mobile, tablette, desktop)
- 🎨 **Animations fluides** - Utilisation de Motion pour des animations élégantes
- 📧 **Formulaire de contact** - Formulaire avec notifications toast et intégration Web3Forms
- 🌍 **Contenu multilingue** - Site entièrement en français
- 🔍 **SEO optimisé** - Métadonnées et balises Open Graph configurées
- ⚡ **Performance** - Optimisé avec Next.js et Turbopack pour des chargements rapides

## 🏗️ Build pour la Production

Pour créer une version optimisée du projet pour la production :

```bash
npm run build
```

Les fichiers optimisés seront générés dans le dossier `.next/`. Vous pouvez ensuite déployer le projet sur des plateformes comme Vercel, Netlify, ou tout autre hébergeur compatible Next.js.

Pour lancer le serveur de production localement après le build :

```bash
npm run build
npm run start
```

Le site sera accessible sur `http://localhost:3000` en mode production.

## 📝 Notes Importantes

- Le projet utilise **Next.js 16** avec **Turbopack** pour un développement ultra-rapide
- **Tailwind CSS v4** avec la nouvelle syntaxe `@import "tailwindcss"` et directives `@theme` et `@custom-variant`
- Le thème (sombre/clair) est géré par `next-themes` et sauvegardé dans le `localStorage`
- Le curseur personnalisé est désactivé par défaut dans les styles CSS (`cursor: none`)
- Le projet utilise **TypeScript** pour une meilleure sécurité de type
- Les métadonnées SEO sont configurées dans `src/app/layout.tsx`
- Les informations de contact sont affichées dans la section Contact avec l'adresse physique à Abidjan

## 🐛 Résolution de Problèmes

Si vous rencontrez des erreurs lors de l'installation :

1. **Supprimez le dossier `node_modules` et le fichier `package-lock.json`** :

```bash
rm -rf node_modules package-lock.json
```

2. **Réinstallez les dépendances** :

```bash
npm install
```

3. **Vérifiez votre version de Node.js** (doit être >= 20) :

```bash
node --version
```

## 📞 Contact

**REPSFECO-CI**  
📍 **Siège social :** Abidjan Cocody Saint Jean Val Doyen 2, Immeuble Ariane, 1er étage, port 9  
📮 **Adresse postale :** 06 BP 390 ABIDJAN 06  
📞 **Tél. :** +225 07 57 99 14 90 / 05 04 34 34 24 / 07 08 54 08 78 / 27 22 44 67 08  
✉️ **Email :** repsfecoci@yahoo.fr  
🌐 [Facebook](https://www.facebook.com/repsfecociv/)

## 📄 À propos de REPSFECO-CI

REPSFECO-CI sert d'organe de coordination des initiatives des organisations de la société civile Ivoirienne dans le cadre du Plan d'Action de la CEDEAO pour la mise en œuvre des résolutions 1325/2000 et suivantes du Conseil de Sécurité des Nations Unies.

### Objectifs clés :

- Promouvoir la participation active des femmes dans les processus de paix et de sécurité
- Renforcer les capacités des femmes, des jeunes et des communautés vulnérables face aux conflits
- Sensibiliser et mobiliser autour de l'Agenda « Femmes, Paix et Sécurité »
- Contribuer à l'élimination des violences basées sur le genre et à la cohésion sociale

---

**Développé avec ❤️ pour REPSFECO-CI**
# repsfeco_ci
