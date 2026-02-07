# 🔍 AUDIT COMPLET - pallmann-store.com
**Date**: 7 février 2026  
**Stack**: Vercel + Supabase (znfpdjieowjentvugkbe) + Stripe  

---

## ⚠️ PROBLÈMES CRITIQUES

### 1. 🚨 SITEMAP INCORRECT (SEO CATASTROPHE)
**Le sitemap.xml pointe vers ponceur-parquet.fr au lieu de pallmann-store.com !**

```
Actuel: <loc>https://ponceur-parquet.fr/...</loc>
Attendu: <loc>https://pallmann-store.com/...</loc>
```

**Impact**: Google indexe les mauvaises URLs → 0 positionnement
**Action**: Générer un nouveau sitemap spécifique à Pallmann Store

---

### 2. 🚨 PRODUITS MANQUANTS EN BDD

**Produits actuels dans Supabase (39 au total)**:
- ✅ Ponceuses (COBRA, SPIDER, UNO, GECKO STAR)
- ✅ Bordeuses (GECKO FLEX)
- ✅ Accessoires (sacs, brosses, platines)
- ✅ Entretien (TURBO SCRUBBER)

**MANQUANTS (mentionnés dans llms.txt mais pas en BDD)**:
- ❌ **Vitrificateurs**: PALL-X 96, PALL-X 98, PALL-X PURE, PALL-X EXTREME
- ❌ **Huiles**: MAGIC OIL 2K, MAGIC OIL SPA, ECO OIL
- ❌ **Fonds durs**: PALL-X 320, PALL-X 325, PALL-X 333
- ❌ **Colles**: P4, P5, P6, P9

**Impact**: Le site ne vend que des machines (500-15000€), pas les produits cœur de métier (20-50€/L)

---

### 3. 🚨 STRIPE NON CONFIGURÉ SUR VERCEL

**Variables manquantes**:
- ❌ `STRIPE_SECRET_KEY`
- ❌ `VITE_STRIPE_PUBLIC_KEY`

**Variables présentes**:
- ✅ `VITE_SUPABASE_URL`
- ✅ `VITE_SUPABASE_ANON_KEY`
- ✅ `STRIPE_WEBHOOK_SECRET`
- ✅ `RESEND_API_KEY`

**Impact**: Le checkout Stripe ne fonctionne pas en production !

---

## ✅ POINTS POSITIFS

### SEO Base
- ✅ **robots.txt** : Bien configuré, inclut IA crawlers
- ✅ **llms.txt** : Présent et informatif pour l'IA
- ✅ **Meta tags** : Corrects (title, description, OG, Twitter)
- ✅ **Schema.org Organization** : Présent dans index.html
- ✅ **Canonical** : Défini

### Prix
- ✅ **Calcul TVA correct** : TTC = HT × 1.20 ✓
- ✅ **Franco de port** : 630€ HT (logique)
- ✅ **Frais de port** : 9,90€/article

### Code
- ✅ **Architecture React** : Propre avec React Router
- ✅ **Cart Context** : Bien implémenté
- ✅ **Checkout Stripe** : Code fonctionnel
- ✅ **API Vercel** : Serverless functions présentes

---

## 📊 VÉRIFICATION DES PRIX

| Produit | Prix HT | Prix TTC | Calcul (HT×1.20) | Status |
|---------|---------|----------|------------------|--------|
| COBRA | 13 293€ | 15 951.60€ | 15 951.60€ | ✅ |
| COBRA CLASSIC | 12 189.60€ | 14 627.52€ | 14 627.52€ | ✅ |
| GECKO FLEX 2.0 | 3 479.40€ | 4 175.28€ | 4 175.28€ | ✅ |
| SPIDER | 14 688€ | 17 625.60€ | 17 625.60€ | ✅ |

**Note**: Impossible de vérifier la formule prix_achat × 2 = prix_public_ht car `prix_achat` n'est pas en base.

---

## 🎯 ACTIONS À ENTREPRENDRE

### PRIORITÉ 1 - URGENT (Blocker ventes)

1. **Ajouter variables Stripe sur Vercel**
   ```bash
   # Via Dashboard Vercel ou CLI
   vercel env add STRIPE_SECRET_KEY
   vercel env add VITE_STRIPE_PUBLIC_KEY
   ```
   - Test: sk_test_51SxpWgE8gZqvuoAT...
   - Live: sk_live_51SxpWgE8gZqvuoAT... (quand prêt)

2. **Ajouter les vitrificateurs et huiles en base**
   Produits à créer dans Supabase:
   - PALL-X 96 (5L, 10L) - Vitrificateur mono-composant
   - PALL-X 98 2K (4.95L) - Vitrificateur bi-composant
   - PALL-X EXTREME (5L) - Haute résistance
   - PALL-X PURE (5L) - Effet bois brut
   - PALL-X 320 (5L, 10L) - Fond dur universel
   - MAGIC OIL 2K (1L, 2.5L) - Huile-cire
   - P4, P5, P6 Colles (15kg)

### PRIORITÉ 2 - SEO CRITIQUE

3. **Créer un nouveau sitemap.xml**
   ```xml
   <?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <url>
       <loc>https://pallmann-store.com/</loc>
       <priority>1.0</priority>
     </url>
     <url>
       <loc>https://pallmann-store.com/panier</loc>
       <priority>0.7</priority>
     </url>
     <url>
       <loc>https://pallmann-store.com/pro</loc>
       <priority>0.8</priority>
     </url>
     <url>
       <loc>https://pallmann-store.com/blog</loc>
       <priority>0.8</priority>
     </url>
     <url>
       <loc>https://pallmann-store.com/calculateur-pro</loc>
       <priority>0.7</priority>
     </url>
     <url>
       <loc>https://pallmann-store.com/contact</loc>
       <priority>0.6</priority>
     </url>
     <!-- Ajouter produits dynamiquement -->
   </urlset>
   ```

4. **Soumettre à Google Search Console**

### PRIORITÉ 3 - CONTENU SEO

5. **Créer des pages produits optimisées**
   - URL: `/produit/pall-x-96-vitrificateur`
   - H1 optimisé: "PALL-X 96 - Vitrificateur Parquet Professionnel"
   - Schema.org Product avec prix

6. **Blog avec mots-clés cibles** (suggestion Perplexity):
   - "Comment vitrifier un parquet" (volume élevé)
   - "Vitrificateur parquet mat vs satiné"
   - "Huile parquet vs vitrificateur : que choisir"
   - "PALL-X 96 vs Bona Traffic"
   - "Entretien parquet vitrifié"
   - "Combien de couches vitrificateur"

7. **FAQ structurée** (Schema FAQPage)
   Questions fréquentes à traiter:
   - Quelle finition choisir (mat, satiné, brillant) ?
   - Combien de couches de vitrificateur ?
   - Combien de temps dure une vitrification ?
   - Différence huile vs vitrificateur ?

---

## 📈 RECOMMANDATIONS CONTENU

### Pages à créer
1. `/guide/vitrification-parquet` - Guide complet vitrification
2. `/guide/huile-parquet` - Guide huile vs vitrification
3. `/comparatif/pall-x-96-vs-pall-x-98` - Comparatif produits
4. `/tutoriel/appliquer-vitrificateur` - Tutoriel application

### Articles blog suggérés
- "Prix vitrification parquet 2026 : tarifs et conseils"
- "Pallmann PALL-X 96 : test et avis de professionnels"
- "Les 5 erreurs à éviter lors de la vitrification d'un parquet"
- "Vitrificateur bi-composant vs mono-composant : lequel choisir ?"

---

## 🔧 FICHIERS À MODIFIER

| Fichier | Action |
|---------|--------|
| `public/sitemap.xml` | Remplacer par URLs pallmann-store.com |
| `.env` (Vercel) | Ajouter STRIPE_SECRET_KEY + VITE_STRIPE_PUBLIC_KEY |
| Supabase `products` | Ajouter vitrificateurs, huiles, colles |
| `src/pages/HomePage.tsx` | Vérifier affichage produits |

---

## 📊 RÉSUMÉ

| Catégorie | Score | Commentaire |
|-----------|-------|-------------|
| **Produits** | 🔴 30% | Manque vitrificateurs/huiles |
| **SEO** | 🔴 20% | Sitemap incorrect |
| **Stripe** | 🔴 0% | Non fonctionnel |
| **Code** | 🟢 90% | Bien structuré |
| **UX** | 🟢 80% | Panier et checkout bien faits |

**Score global: 44% - Site non fonctionnel pour la vente**

---

*Rapport généré par Camille - Audit pallmann-store.com*
