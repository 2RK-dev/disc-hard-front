# 💬 DiscHard — Clone de Discord en Next.js

DiscHard est une application de messagerie instantanée inspirée de Discord. Elle vise à offrir une expérience fluide, rapide et moderne pour la communication en temps réel, que ce soit entre amis ou dans des communautés. Ce projet est développé avec **Next.js** et a pour objectif d’explorer les meilleures pratiques en matière de design, d'architecture logicielle et de performances frontend.

---

## 🚀 Table des matières

- [📦 Prérequis](#-prérequis)
- [🧩 Technologies utilisées](#-technologies-utilisées)
- [✨ Fonctionnalités](#-fonctionnalités)
- [📁 Structure du projet](#-structure-du-projet)
- [🧠 Idées futures](#-idées-futures)
- [📚 Contribution](#-contribution)
- [🪪 Licence](#-licence)

---

## 📦 Prérequis

Avant de démarrer, assure-toi d’avoir installé les éléments suivants :

- [Node.js](https://nodejs.org/) (v18 ou + recommandé)
- [Yarn](https://yarnpkg.com/) ou npm
- [Git](https://git-scm.com/)

**Commande de démarrage :**

```bash
git clone https://github.com/ton-utilisateur/dischard.git
cd dischard
yarn install
yarn dev
```

---

## 🧩 Technologies utilisées

- **Next.js** — Framework React moderne pour SSR/SSG
- **Tailwind CSS** — Styling rapide et responsive
- **TypeScript** — Typage statique et sécurité accrue
- **Prisma** — ORM pour la gestion de la base de données
- **Socket.IO / Ably / Pusher** _(en discussion)_ — Pour la communication en temps réel
- **NextAuth.js** — Pour l’authentification sécurisée
- **PostgreSQL** — Base de données relationnelle robuste

---

## ✨ Fonctionnalités

Voici la liste des fonctionnalités prévues ou en cours de développement :

- 🔐 Authentification (OAuth2, Email/Password)
- 🗂️ Système de serveurs (guilds) et de salons (channels)
- 💬 Messagerie en temps réel (texte)
- 📸 Envoi de fichiers et images
- 🔔 Notifications en direct
- 🧑‍🤝‍🧑 Gestion des membres (rôles, permissions)
- 🌙 Thème dark mode
- 📱 Responsive design mobile et desktop

---

## 📁 Structure du projet

Voici la structure actuelle (et prévue) du projet, accompagnée d'explications claires :

```
/dischard
├── /app                # Next.js App Router (si utilisé)
│   ├── /api            # API routes (ex: auth, messages)
│   ├── /dashboard      # Vue principale de l’utilisateur connecté
│   ├── /login          # Page de connexion
│   └── /register       # Page d'inscription
│
├── /components         # Composants réutilisables (UI, Layout, etc.)
│   ├── /ui             # Boutons, modals, inputs, etc.
│   ├── Sidebar.tsx     # Barre latérale des serveurs
│   └── MessageBox.tsx  # Zone de discussion
│
├── /lib                # Fichiers utilitaires, helpers, configs
│   ├── prisma.ts       # Client Prisma
│   ├── auth.ts         # Fonctions liées à NextAuth
│   └── socket.ts       # Gestion des websockets
│
├── /prisma             # Schéma et seed de base de données
│   └── schema.prisma
│
├── /public             # Fichiers statiques (icônes, logos, images)
│
├── /styles             # Fichiers Tailwind CSS et globals
│
├── /types              # Types TypeScript globaux
│
├── .env.local          # Variables d’environnement
├── next.config.js      # Configuration Next.js
├── tailwind.config.ts  # Configuration Tailwind
└── tsconfig.json       # Configuration TypeScript
```

### 🔮 Prévision pour la structure future :

- `/hooks` : hooks personnalisés (`useSocket`, `useAuth`, etc.)
- `/context` : pour la gestion du contexte global (utilisateur, thème, notifications)
- `/services` : appels API vers le backend ou vers des services externes (Ably, S3, etc.)
- `/middleware.ts` : vérifications globales de routes (auth, rôle)
- `/constants` : variables constantes (thèmes, rôles, codes)

---

## 🧠 Idées futures

- 📞 Intégration des appels audio/vidéo via WebRTC
- 🧪 Tests unitaires avec Jest + React Testing Library
- 📱 Application mobile via React Native
- 📊 Statistiques d’usage du serveur
- 📈 Système de boosts et abonnements
- 🧵 Threads et réactions aux messages
- 🔐 Chiffrement de bout en bout
- 🏷️ Mentions & Emojis personnalisés

---

## 📚 Contribution

Les contributions sont les bienvenues !  
Tu peux ouvrir une issue, proposer une fonctionnalité ou corriger un bug. Merci d’écrire du code propre, typé et documenté.

```bash
# Crée une branche
git checkout -b feature/ma-fonction

# Fait un commit clair
git commit -m "feat: ajout de la messagerie en temps réel"

# Push ta branche
git push origin feature/ma-fonction
```

---

## 🪪 Licence

Ce projet est sous licence MIT.  
Libre à toi de le cloner, le modifier, ou t’en inspirer pour un usage personnel ou académique.

---

> Fait avec ❤️ par 2RK-dev
