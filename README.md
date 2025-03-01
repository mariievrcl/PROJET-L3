# Projet L3 - Vue 3 & Vite

Ce projet utilise Vue 3 avec Vite pour un développement rapide d'applications web. Le code est organisé pour favoriser une structure simple et claire, idéale pour les débutants et les projets de taille moyenne.

## 🚀 Fonctionnalités

- Vue 3: Utilisation des dernières fonctionnalités de Vue, y compris la Composition API
- Vite: Outil de build ultra-rapide pour un meilleur développement et HMR (Hot Module Replacement)
- Services API: Intégration avec l'API Spotify
- Configuration de base: Prêt à l'emploi avec des composants Vue optimisés
- Gestion d'état: Utilisation de Vuex/Pinia pour la gestion d'état
- Architecture modulaire: Organisation des composants pour une meilleure maintenabilité

## 📋 Prérequis

Avant de commencer, assurez-vous que les outils suivants sont installés sur votre machine:

- Node.js (v14.x ou supérieur)
- npm (v6.x ou supérieur) ou yarn

Vous pouvez vérifier vos versions actuelles avec:

```bash
node -v
npm -v
```

## 🔧 Installation

1. Clonez le dépôt sur votre machine locale :

```bash
git clone https://github.com/Jeremy-Tarlie/projetL3.git
```

2. Accédez au dossier du projet :

```bash
cd projetL3
```

3. Installez les dépendances :

```bash
npm install
```

4. Configurez les variables d'environnement:

Créez un fichier `.env` à la racine du projet et ajoutez les variables nécessaires pour l'API Spotify:

```
VITE_API_KEY_SPOTIFY = "votre_client_id"
VITE_API_SECRET_SPOTIFY = "votre_client_secret"
VITE_REDIRECT_URI_SPOTIFY= "http://localhost:5173/"
```

## 🏃‍♂️ Lancer le serveur de développement

Pour démarrer le serveur de développement avec hot-reloading:

```bash
npm run dev
```

Cela lancera l'application à l'adresse [http://localhost:5173/](http://localhost:5173/).

## 🏗️ Compiler pour la production

Pour construire l'application pour la production:

```bash
npm run build
```

Les fichiers compilés seront disponibles dans le dossier `dist/`.

## 📁 Structure du Projet

```
projetL3/
├── node_modules/        # Dépendances installées
├── public/              # Fichiers statiques servis directement
│   └── vite.svg         # Logo Vite
├── services/            # Services externes
│   └── spotify.js       # Service d'API Spotify
├── src/                 # Code source de l'application
│   ├── assets/          # Ressources (images, styles, fonts)
│   ├── components/      # Composants Vue réutilisables
│   ├── pages/           # Composants de page (routés)
│   ├── router/          # Configuration des routes
│   ├── store/           # État global (Vuex ou Pinia)
│   ├── App.vue          # Composant racine
│   ├── main.js          # Point d'entrée JavaScript
│   └── style.css        # Styles globaux
├── .env                 # Variables d'environnement
├── .gitignore           # Fichiers ignorés par Git
├── index.html           # Page HTML d'entrée
├── package-lock.json    # Versions verrouillées des dépendances
├── package.json         # Dépendances et scripts
├── README.md            # Documentation du projet
└── vite.config.js       # Configuration de Vite
```

## 🛠️ Personnalisation

### Utilisation du service Spotify

Le service Spotify est déjà configuré dans le projet:

```javascript
// Exemple d'utilisation du service Spotify
import spotifyService from '@/services/spotify.js';

// Rechercher des artistes
const searchArtists = async (query) => {
  const result = await spotifyService.searchArtists(query);
  return result;
};
```

### Ajouter des pages

Créez un nouveau fichier `.vue` dans le dossier `pages/` :

```vue
<template>
  <div class="ma-page">
    <!-- Votre HTML ici -->
  </div>
</template>

<script setup>
// Votre logique ici
</script>

<style scoped>
/* Vos styles ici */
</style>
```

### Configurer les routes

Modifiez le fichier dans `router/index.js` pour ajouter de nouvelles routes:

```javascript
const routes = [
  {
    path: '/nouvelle-page',
    name: 'NouvellePage',
    component: () => import('../pages/NouvellePage.vue')
  },
  // Autres routes...
]
```
