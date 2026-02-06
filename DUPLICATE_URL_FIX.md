# Correction des Pages en Double - Google Search Console

## Problème Identifié

33 pages signalées comme "Page en double sans URL canonique sélectionnée par l'utilisateur" dans Google Search Console.

## URLs Problématiques

1. **Pages de tags non implémentées** : `/blog/tag/fentes parquet`, `/blog/tag/huilage`, `/blog/tag/rénovation/`, etc.
2. **URL de template de recherche** : `/blog?q={search_term_string}`
3. **Page utilitaire** : `/browser-upgrade.html`
4. **Ancienne URL** : `/confidentialite/`
5. **Slashes finaux** : Potentiels doublons avec/sans slash final

## Solutions Appliquées

### 1. Suppression du Template SearchAction (seoSchemas.ts)

**Problème** : Le schéma Schema.org WebSite contenait un `potentialAction` avec un template d'URL que Google a indexé littéralement.

**Solution** : Suppression de l'action de recherche du schéma `websiteSchema`.

```typescript
// Avant
export const websiteSchema = {
  // ...
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "https://ponceur-parquet.fr/blog?search={search_term_string}"
    },
    "query-input": "required name=search_term_string"
  }
};

// Après
export const websiteSchema = {
  // ... (sans potentialAction)
};
```

### 2. Blocage des Pages de Tags (robots.txt)

**Problème** : Le fichier robots.txt autorisait l'indexation des pages `/blog/tag/*` alors qu'elles n'existent pas dans le routeur React.

**Solution** : Ajout de directives `Disallow` pour bloquer ces pages.

```txt
# Avant
Allow: /blog/tag/*

# Après
Disallow: /blog/tag/
Disallow: /blog?q=
Disallow: /blog?search=
```

### 3. Noindex sur browser-upgrade.html

**Problème** : Page utilitaire sans directive d'indexation.

**Solution** : Ajout de `<meta name="robots" content="noindex, nofollow">`.

### 4. Redirections (_redirects)

**Problème** : Anciennes URLs et pages non implémentées accessibles.

**Solution** : Ajout de redirections 301.

```txt
# Old URL redirects
/confidentialite /politique-confidentialite 301
/confidentialite/ /politique-confidentialite 301

# Block tag pages (not implemented)
/blog/tag/* /blog 301
```

### 5. Canonical sur Politique de Confidentialité

**Problème** : Page sans URL canonique explicite.

**Solution** : Ajout de `<link rel="canonical">`.

```tsx
<link rel="canonical" href="https://ponceur-parquet.fr/politique-confidentialite" />
```

## Vérifications Post-Déploiement

### Actions à Effectuer dans Google Search Console

1. **Demander une réindexation** des pages corrigées
2. **Soumettre le nouveau sitemap.xml**
3. **Vérifier robots.txt** avec l'outil de test Google
4. **Surveiller les erreurs** pendant 2-4 semaines

### Tests à Effectuer

```bash
# Vérifier que robots.txt bloque bien les tags
curl https://ponceur-parquet.fr/robots.txt

# Vérifier les redirections
curl -I https://ponceur-parquet.fr/confidentialite/
# Doit retourner 301 vers /politique-confidentialite

curl -I https://ponceur-parquet.fr/blog/tag/test
# Doit retourner 301 vers /blog
```

### Validation Schema.org

Vérifier les schémas avec l'outil Google Rich Results Test :
- https://search.google.com/test/rich-results

## Résultats Attendus

- **Réduction progressive des pages en double** dans les 2-4 semaines
- **Amélioration du crawl budget** Google
- **Meilleure performance SEO** globale
- **Consolidation du PageRank** sur les vraies pages

## Fichiers Modifiés

1. `/src/utils/seoSchemas.ts` - Suppression SearchAction template
2. `/public/robots.txt` - Blocage pages de tags et recherche
3. `/public/browser-upgrade.html` - Ajout noindex
4. `/public/_redirects` - Redirections 301
5. `/src/pages/PolitiqueConfidentialite.tsx` - Ajout canonical

## Monitoring

Suivre l'évolution dans Google Search Console :
- **Indexation** > **Pages** > "Page en double sans URL canonique"
- Objectif : 0 page en double d'ici 4 semaines

---

Date de correction : 3 janvier 2026
