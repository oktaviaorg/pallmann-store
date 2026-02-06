# Démarrage

## Introduction

Bienvenue dans la documentation de Poncages.fr. Ce guide vous aidera à comprendre et à utiliser notre plateforme de devis en ligne.

## Prérequis

- Node.js 16 ou supérieur
- npm ou yarn
- Compte Supabase

## Installation

1. Clonez le dépôt :
```bash
git clone https://github.com/yourusername/poncages
cd poncages
```

2. Installez les dépendances :
```bash
npm install
```

3. Configurez les variables d'environnement :
```bash
cp .env.example .env
```

4. Lancez le serveur de développement :
```bash
npm run dev
```

## Structure du Projet

```
poncages/
├── src/
│   ├── components/    # Composants React
│   ├── lib/          # Utilitaires et configuration
│   ├── types/        # Types TypeScript
│   └── utils/        # Fonctions utilitaires
├── docs/             # Documentation
└── supabase/         # Configuration Supabase
```

## Prochaines Étapes

- [Configuration détaillée](/guide/configuration)
- [Guide du formulaire](/guide/form)
- [Système de notifications](/guide/notifications)