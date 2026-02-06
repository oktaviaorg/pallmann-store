# Configuration

## Variables d'Environnement

Le projet utilise plusieurs variables d'environnement pour la configuration :

```env
VITE_SUPABASE_URL=votre_url_supabase
VITE_SUPABASE_ANON_KEY=votre_clé_anon
```

## Configuration de Supabase

1. Créez un projet sur [Supabase](https://supabase.com)
2. Copiez les informations de connexion
3. Configurez les tables et les politiques de sécurité

## Configuration du Formulaire

Le formulaire peut être personnalisé dans `src/App.tsx` :

- Prix au m²
- Types de finition
- Options supplémentaires

## Système de Notifications

Les notifications sont gérées par :

1. Triggers Supabase
2. Edge Functions
3. File d'attente d'emails

## Déploiement

Le projet peut être déployé sur :

- Netlify
- Vercel
- GitHub Pages