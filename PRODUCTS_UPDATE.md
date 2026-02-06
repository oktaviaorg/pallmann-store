# Mise à jour Pallmann Store - 7 Février 2025

## 1. Nouveautés implémentées

### Option Retrait sur place
- **Livraison France** : 9,90€ HT / article (franco à 630€ HT)
- **Retrait sur place** : GRATUIT
- Adresse de retrait : **6 rue du Commerce, 68420 Herrlisheim près Colmar**

### Interface panier
- Sélection radio entre les deux modes de livraison
- Calcul automatique des frais selon le mode choisi
- Mode de livraison sauvegardé dans le localStorage

## 2. Mise à jour des produits Supabase

### Exécuter le SQL
Le fichier `sql/update_products.sql` contient toutes les mises à jour de prix.

**Pour l'exécuter :**
1. Aller sur Supabase → SQL Editor
2. Copier-coller le contenu de `sql/update_products.sql`
3. Exécuter

### Formule de prix utilisée
```
Prix public HT = Prix achat/L × conditionnement × 2
Prix TTC = Prix HT × 1.20
```

### Produits mis à jour

#### Vitrificateurs PALL-X
| Ref | Nom | Prix HT |
|-----|-----|---------|
| 040983 | PALL-X 94 mat 5L | 138,00€ |
| 013269 | PALL-X 94 satiné 5L | 138,00€ |
| 013697 | PALL-X 96 mat 5L | 200,50€ |
| 013271 | PALL-X 96 ORIGINAL satiné 5L | 200,50€ |
| 181845 | PALL-X 96 POWER mat 5L | 220,50€ |
| 181844 | PALL-X 96 POWER satiné 5L | 220,50€ |
| 169408 | PALL-X 96 ZERO mat 5L | 225,80€ |
| 171590 | PALL-X 96 ZERO satiné 5L | 225,80€ |
| 010094 | PALL-X 98 2K mat 4.95L | 269,78€ |
| 010093 | PALL-X 98 2K satiné 4.95L | 269,78€ |
| 010100 | PALL-X 98 2K brillant 4.95L | 269,78€ |
| 069377 | PALL-X EXTREME satiné 5L | 152,30€ |
| 069379 | PALL-X EXTREME mat 5L | 152,30€ |
| 089453 | PALL-X TREND 2K mat 4.95L | 185,13€ |
| 083529 | PALL-X TREND 2K satiné 4.95L | 185,13€ |
| 086268 | PALL-X FUTUR mat 5L | 138,30€ |
| 086375 | PALL-X FUTUR satiné 5L | 138,30€ |

#### Fonds durs
| Ref | Nom | Prix HT |
|-----|-----|---------|
| 014289 | PALL-X 320 fond dur 5L | 115,00€ |
| 013267 | PALL-X 325 fond dur garnissant 5L | 154,80€ |
| 159665 | PALL-X 330 PURE fond dur brut 5L | 130,50€ |

#### Huiles Magic Oil
| Ref | Nom | Prix HT |
|-----|-----|---------|
| 021284 | MAGIC OIL 2K Original 2.75L | 323,01€ |
| 055895 | MAGIC OIL 2K ERGO monocouche 2.75L | 352,17€ |
| 079521 | MAGIC OIL EASY Huile-cire mono 3L | 147,30€ |
| 034053 | MAGIC OIL CARE 5L | 248,20€ |

#### Outdoor Oil
| Ref | Nom | Prix HT |
|-----|-----|---------|
| 081077 | OUTDOOR OIL 1K naturel 3L | 91,08€ |
| 081081 | OUTDOOR OIL 1K teck 3L | 91,08€ |
| 081079 | OUTDOOR OIL 1K bankirai 3L | 91,08€ |
| 159652 | OUTDOOR OIL 1K naturel 10L | 227,00€ |

#### Colles
| Ref | Nom | Prix HT |
|-----|-----|---------|
| 073479 | PALLMANN P4 colle 16kg | 168,00€ |
| 059679 | PALLMANN P5 colle 16kg | 178,56€ |
| 067689 | PALLMANN P6 colle 16kg | 207,68€ |
| 069953 | PALLMANN P9 colle bicomposante 16kg | 161,92€ |

#### Abrasifs - Bandes 750×200 (paquet 10p)
| Ref | Nom | Prix HT |
|-----|-----|---------|
| 012621 | Bande 750x200 corindon gr16 (10p) | 122,08€ |
| 012622 | Bande 750x200 corindon gr24 (10p) | 103,88€ |
| 012624 | Bande 750x200 corindon gr36 (10p) | 94,78€ |
| 012625 | Bande 750x200 corindon gr40 (10p) | 91,14€ |
| 012627 | Bande 750x200 corindon gr60 (10p) | 87,36€ |
| 012628 | Bande 750x200 corindon gr80 (10p) | 78,00€ |
| 012629 | Bande 750x200 corindon gr100 (10p) | 76,50€ |
| 012630 | Bande 750x200 corindon gr120 (10p) | 76,50€ |
| 011478 | Bande 750x200 zirconium gr24 (10p) | 149,70€ |
| 011479 | Bande 750x200 zirconium gr36 (10p) | 133,70€ |
| 011480 | Bande 750x200 zirconium gr40 (10p) | 119,60€ |
| 011481 | Bande 750x200 zirconium gr60 (10p) | 114,72€ |
| 011482 | Bande 750x200 zirconium gr80 (10p) | 109,40€ |
| 011483 | Bande 750x200 zirconium gr100 (10p) | 109,40€ |

#### Disques Ø150 velcro (paquet 50p)
| Ref | Nom | Prix HT |
|-----|-----|---------|
| 063016 | Disque Ø150 zirco velcro gr40 (50p) | 143,00€ |
| 042171 | Disque Ø150 zirco velcro gr60 (50p) | 111,22€ |
| 041124 | Disque Ø150 zirco velcro gr80 (50p) | 105,82€ |
| 063017 | Disque Ø150 zirco velcro gr100 (50p) | 103,02€ |

## 3. Nouveaux articles du blog

Exécuter `sql/blog_articles.sql` dans Supabase pour :
1. Supprimer les anciens articles ponceur-parquet
2. Créer 4 nouveaux articles orientés Pallmann Store :

| Titre | Slug |
|-------|------|
| Comment choisir son vitrificateur PALL-X | guide-vitrificateur-pall-x-choisir |
| MAGIC OIL 2K : l'huile professionnelle | magic-oil-2k-huile-professionnelle-parquet |
| Entretien parquet vitrifié : FINISH CARE | entretien-parquet-vitrifie-finish-care-pallmann |
| Guide des abrasifs pour ponceuses | guide-abrasifs-ponceuse-parquet-pallmann |

## 4. Page PRO (/pro)

La page PRO est déjà en place avec :
- Formulaire inscription (entreprise, SIRET, email, téléphone)
- Enregistrement dans table `pro_requests`
- Liens dans Header et Footer ✓

## 5. Fonctionnalité Demande de Devis ✅

Déjà implémenté :
- **Bouton "Ajouter au devis"** sur chaque produit (HomePage)
- **Icône Devis** dans le Header avec badge compteur
- **Page /demande-devis** avec formulaire complet
- **QuoteContext** pour gérer le panier de devis (localStorage)
- **Lien dans le Footer**

### Table Supabase `quote_requests`
```sql
-- À exécuter dans Supabase (voir sql/blog_articles.sql)
CREATE TABLE IF NOT EXISTS quote_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  products JSONB NOT NULL,
  company_name TEXT,
  contact_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  address TEXT,
  city TEXT,
  postal_code TEXT,
  message TEXT,
  total_ht DECIMAL(10,2),
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

## 6. Fichiers modifiés

- `src/lib/CartContext.tsx` - Ajout deliveryMode, calcul frais 9.90€/article
- `src/lib/QuoteContext.tsx` - Contexte pour panier devis
- `src/pages/CartPage.tsx` - Interface de sélection livraison/retrait
- `src/pages/QuotePage.tsx` - Page demande de devis
- `src/pages/HomePage.tsx` - Boutons ajout panier + devis
- `src/components/Header.tsx` - Icône devis avec badge
- `src/components/Footer.tsx` - Lien demande de devis
- `sql/update_products.sql` - Mise à jour prix produits
- `sql/blog_articles.sql` - Articles blog + table quote_requests
