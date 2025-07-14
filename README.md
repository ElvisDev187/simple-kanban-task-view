# 📋 Kanban Task View

Une application moderne de gestion de tâches de type Kanban construite avec React, TypeScript et Vite. Cette application permet de visualiser et organiser vos tâches dans un tableau Kanban intuitif avec trois colonnes : TO DO, DOING et DONE.

## ✨ Fonctionnalités

- 📊 **Interface Kanban** : Visualisation claire des tâches en colonnes
- 🎯 **Gestion des tâches** : Création, modification et suppression de tâches
- 🏷️ **Système de tags** : Organisation avec des étiquettes personnalisées
- ✅ **Sous-tâches** : Décomposition des tâches complexes
- 🔗 **Liens et images** : Attachement de ressources aux tâches
- 📱 **Design responsive** : Interface adaptée mobile et desktop
- 🎨 **Interface moderne** : Design épuré avec Tailwind CSS

## 🛠️ Technologies utilisées

### Frontend
- **React 19.1.0** - Bibliothèque UI moderne
- **TypeScript 5.8.3** - Typage statique pour JavaScript
- **Vite 7.0.4** - Build tool ultra-rapide avec HMR
- **Tailwind CSS 4.1.11** - Framework CSS utility-first

### Gestion d'état et interactions
- **Zustand 5.0.6** - Gestion d'état légère et performante
- **@dnd-kit/core 6.3.1** - Bibliothèque drag & drop accessible

### Outils de développement
- **ESLint 9.30.1** - Linting et qualité de code
- **TypeScript ESLint** - Règles ESLint spécifiques à TypeScript
- **React Hooks ESLint** - Règles pour les hooks React

## 🚀 Installation et démarrage

### Prérequis
- Node.js (version 18 ou supérieure)
- pnpm (recommandé) ou npm/yarn

### Installation
```bash
# Cloner le repository
git clone <url-du-repo>
cd kanban-task-view

# Installer les dépendances
pnpm install
# ou
npm install
```

### Démarrage en développement
```bash
# Lancer le serveur de développement
pnpm dev
# ou
npm run dev
```

L'application sera accessible sur `http://localhost:5173`

### Build de production
```bash
# Construire l'application
pnpm build
# ou
npm run build

# Prévisualiser le build
pnpm preview
# ou
npm run preview
```

## 📁 Structure du projet

```
kanban-task-view/
├── src/
│   ├── components/          # Composants React
│   │   ├── layout/         # Composants de mise en page
│   │   │   ├── nav-bar.tsx
│   │   │   └── side-bar.tsx
│   │   └── main/           # Composants principaux
│   │       └── column-title.tsx
│   ├── store/              # Gestion d'état Zustand
│   │   └── task.ts
│   ├── types/              # Définitions TypeScript
│   │   ├── index.ts
│   │   └── task.ts
│   ├── assets/             # Ressources statiques
│   │   └── fonts/
│   ├── App.tsx             # Composant principal
│   ├── main.tsx            # Point d'entrée
│   └── index.css           # Styles globaux
├── public/                 # Fichiers publics
├── package.json            # Dépendances et scripts
├── vite.config.ts          # Configuration Vite
├── tsconfig.json           # Configuration TypeScript
└── eslint.config.js        # Configuration ESLint
```

## 🎯 Types de données

### Task
```typescript
type Task = {
  id: string;
  title: string;
  description: string | undefined;
  tags: string[] | undefined;
  subtasks: Subtask[] | undefined;
  links: string[] | undefined;
  images: string[] | undefined;
  status: "todo" | "inProgress" | "done";
};
```

### Subtask
```typescript
type Subtask = {
  id: string;
  title: string;
  isCompleted: boolean;
};
```

## 🔧 Scripts disponibles

- `pnpm dev` - Lance le serveur de développement
- `pnpm build` - Construit l'application pour la production
- `pnpm preview` - Prévisualise le build de production
- `pnpm lint` - Vérifie la qualité du code avec ESLint

## 🎨 Personnalisation

Le projet utilise Tailwind CSS pour le styling. Vous pouvez personnaliser :
- Les couleurs dans la configuration Tailwind
- Les polices (Inter est utilisée par défaut)
- Les breakpoints responsive
- Les composants UI

## 🤝 Contribution

1. Fork le projet
2. Créez votre branche feature (`git checkout -b feature/AmazingFeature`)
3. Committez vos changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrez une Pull Request

## 📝 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 🚧 Roadmap future

- [ ] Implémentation du drag & drop avec @dnd-kit
- [ ] Persistance des données (localStorage/API)
- [ ] Système d'authentification
- [ ] Collaboration en temps réel
- [ ] Notifications et rappels
- [ ] Export/Import des données
- [ ] Mode sombre
- [ ] Filtres et recherche avancée
