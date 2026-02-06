-- ============================================
-- PALLMANN STORE - Nouveaux articles blog
-- Exécuter dans Supabase SQL Editor
-- Date: 2025-02-07
-- ============================================

-- 1. SUPPRIMER les anciens articles ponceur-parquet
DELETE FROM articles;

-- 2. CRÉER les nouveaux articles Pallmann Store

-- Article 1: Guide vitrificateurs PALL-X
INSERT INTO articles (
  title,
  slug,
  excerpt,
  content,
  published,
  meta_title,
  meta_description,
  keywords,
  created_at,
  updated_at
) VALUES (
  'Comment choisir son vitrificateur PALL-X : guide complet',
  'guide-vitrificateur-pall-x-choisir',
  'Découvrez comment choisir le vitrificateur PALL-X adapté à votre parquet. Comparatif PALL-X 94, 96, 98 et EXTREME pour un résultat professionnel.',
  '# Comment choisir son vitrificateur PALL-X : guide complet

La gamme **PALL-X** de Pallmann est reconnue comme la référence des vitrificateurs professionnels pour parquet. Mais face à la diversité des produits, comment choisir celui qui convient à votre projet ?

## Comprendre les différences entre les vitrificateurs PALL-X

### PALL-X 94 : l''entrée de gamme professionnelle

Le **PALL-X 94** est un vitrificateur mono-composant idéal pour :
- Les parquets à usage domestique léger
- Les chambres et pièces peu fréquentées
- Les budgets maîtrisés

**Prix indicatif** : 138€ HT le bidon de 5L

### PALL-X 96 : le best-seller polyvalent

Le **PALL-X 96** existe en plusieurs versions :

- **PALL-X 96 ORIGINAL** : Le classique, parfait pour un usage intensif
- **PALL-X 96 POWER** : Résistance accrue aux rayures
- **PALL-X 96 ZERO** : Sans solvant, pour une qualité d''air optimale

**Idéal pour** : Séjours, couloirs, escaliers, commerces

**Prix** : De 200€ à 226€ HT selon la version (5L)

### PALL-X 98 2K : la référence haut de gamme

Le **PALL-X 98** est un vitrificateur bi-composant offrant :
- Une résistance maximale à l''usure
- Un rendu brillant, satiné ou mat impeccable
- Une durabilité exceptionnelle (15+ ans)

**Recommandé pour** : Hôtels, restaurants, showrooms, lieux publics

**Prix** : 270€ HT le kit de 4,95L

### PALL-X EXTREME : l''ultra-résistant

Pour les chantiers les plus exigeants, le **PALL-X EXTREME** peut s''utiliser en mono ou bi-composant selon vos besoins.

**Applications** : Gymnases, salles de sport, écoles

**Prix** : 152€ HT (5L)

## Tableau comparatif des vitrificateurs PALL-X

| Produit | Type | Résistance | Usage |
|---------|------|------------|-------|
| PALL-X 94 | 1K | ★★★ | Domestique léger |
| PALL-X 96 | 1K | ★★★★ | Intensif |
| PALL-X 98 | 2K | ★★★★★ | Très intensif |
| PALL-X EXTREME | 1K/2K | ★★★★★ | Professionnel |

## Comment appliquer un vitrificateur PALL-X ?

### Étape 1 : Préparation du support
1. Poncer le parquet jusqu''au grain 120
2. Dépoussiérer soigneusement
3. Appliquer un fond dur PALL-X 320 ou 325

### Étape 2 : Application du vitrificateur
1. Bien homogénéiser le produit
2. Appliquer au rouleau en couches fines
3. Respecter le temps de séchage entre couches
4. Appliquer 2 à 3 couches selon le produit

### Étape 3 : Séchage
- Séchage au toucher : 2-4h
- Circulation légère : 24h
- Mise en service complète : 7 jours

## Où acheter les vitrificateurs PALL-X ?

Sur **Pallmann Store**, retrouvez toute la gamme PALL-X avec livraison en France métropolitaine. Franco de port à partir de 630€ HT ou retrait gratuit à Herrlisheim (68).

[Voir tous les vitrificateurs PALL-X →](/)',
  true,
  'Comment choisir son vitrificateur PALL-X : guide complet | Pallmann Store',
  'Guide pour choisir le bon vitrificateur PALL-X selon votre parquet. Comparatif PALL-X 94, 96, 98 et EXTREME.',
  'vitrificateur parquet, PALL-X 94, PALL-X 96, PALL-X 98, vitrificateur professionnel, Pallmann',
  NOW(),
  NOW()
);

-- Article 2: MAGIC OIL 2K
INSERT INTO articles (
  title,
  slug,
  excerpt,
  content,
  published,
  meta_title,
  meta_description,
  keywords,
  created_at,
  updated_at
) VALUES (
  'MAGIC OIL 2K : l''huile professionnelle pour parquets',
  'magic-oil-2k-huile-professionnelle-parquet',
  'Tout savoir sur MAGIC OIL 2K de Pallmann : application, avantages et entretien. L''huile bi-composante référence des professionnels du parquet.',
  '# MAGIC OIL 2K : l''huile professionnelle pour parquets

L''huile **MAGIC OIL 2K** de Pallmann est devenue la référence incontournable pour les finitions huilées de parquet. Découvrez pourquoi les professionnels la plébiscitent.

## Qu''est-ce que MAGIC OIL 2K ?

MAGIC OIL 2K est une **huile bi-composante** (2K = 2 Komponenten) qui combine :
- Une huile de base naturelle
- Un durcisseur qui accélère le séchage et renforce la protection

Cette technologie permet d''obtenir un parquet huilé **très résistant** tout en conservant l''aspect naturel du bois.

## Les différentes versions de MAGIC OIL

### MAGIC OIL 2K ORIGINAL

La formule classique, parfaite pour :
- Parquets neufs ou rénovés
- Finition satinée naturelle
- Mise en valeur des veines du bois

**Conditionnement** : 2,75L (base + durcisseur)
**Prix** : 323€ HT

### MAGIC OIL 2K ERGO

La version **monocouche ergonomique** :
- Application en une seule couche
- Gain de temps considérable
- Idéal pour les grandes surfaces

**Prix** : 352€ HT (2,75L)

### MAGIC OIL EASY

Pour les particuliers et petits chantiers :
- Huile-cire mono-composante
- Application simple
- Pas de mélange nécessaire

**Prix** : 147€ HT (3L)

## Avantages de MAGIC OIL 2K

### 1. Aspect naturel préservé
L''huile pénètre dans le bois sans former de film en surface, contrairement au vitrificateur. Le parquet conserve son toucher naturel et sa chaleur.

### 2. Réparation facile
Un parquet huilé peut être **réparé localement** sans avoir à poncer toute la pièce. Idéal pour l''entretien à long terme.

### 3. Résistance professionnelle
Grâce à la technologie bi-composante, MAGIC OIL 2K offre une résistance comparable à un vitrificateur tout en gardant les avantages de l''huile.

### 4. Écologique
Formulation à base d''huiles végétales, faibles émissions de COV.

## Application de MAGIC OIL 2K

### Préparation
1. Poncer le parquet jusqu''au grain 120 minimum
2. Dépoussiérer parfaitement (aspirateur + microfibre)
3. Température : 18-25°C, humidité < 65%

### Mélange
1. Verser le durcisseur dans la base
2. Mélanger soigneusement pendant 3 minutes
3. Durée de vie du mélange : 2-3 heures

### Application
1. Appliquer au rouleau ou à la spatule
2. Étaler en couche fine et régulière
3. Essuyer l''excédent après 20-30 minutes
4. 2ème couche après 24h si nécessaire

### Séchage
- Séchage au toucher : 8-12h
- Circulation légère : 24h
- Utilisation normale : 7 jours

## Entretien d''un parquet MAGIC OIL

Pour prolonger la beauté de votre parquet huilé :

- **Nettoyage courant** : CLEAN de Pallmann dilué
- **Ravivage** : MAGIC OIL CARE tous les 6-12 mois
- **Rénovation** : MAINTENANCE OIL pour les zones usées

## Commander MAGIC OIL sur Pallmann Store

Retrouvez toute la gamme MAGIC OIL sur notre boutique avec :
- Livraison France entière
- Franco de port dès 630€ HT
- Retrait gratuit à Herrlisheim (68)

[Découvrir MAGIC OIL →](/)',
  true,
  'MAGIC OIL 2K : huile professionnelle pour parquets | Pallmann Store',
  'Tout savoir sur MAGIC OIL 2K de Pallmann. Application, avantages et entretien de l''huile bi-composante référence.',
  'MAGIC OIL 2K, huile parquet, huile bi-composante, Pallmann, finition parquet huilé',
  NOW(),
  NOW()
);

-- Article 3: Entretien parquet vitrifié FINISH CARE
INSERT INTO articles (
  title,
  slug,
  excerpt,
  content,
  published,
  meta_title,
  meta_description,
  keywords,
  created_at,
  updated_at
) VALUES (
  'Entretien parquet vitrifié : les produits FINISH CARE Pallmann',
  'entretien-parquet-vitrifie-finish-care-pallmann',
  'Guide complet pour entretenir votre parquet vitrifié avec les produits FINISH CARE de Pallmann. Nettoyage, protection et rénovation.',
  '# Entretien parquet vitrifié : les produits FINISH CARE Pallmann

Un parquet vitrifié bien entretenu peut durer **des décennies**. Découvrez comment préserver sa beauté avec la gamme FINISH CARE de Pallmann.

## Pourquoi entretenir son parquet vitrifié ?

Même si le vitrificateur forme une couche protectrice durable, le parquet subit quotidiennement :
- Le passage répété (chaussures, pieds nus)
- Les micro-rayures (poussière abrasive)
- Les projections (eau, liquides)
- L''exposition à la lumière

Un entretien régulier permet de :
- **Prolonger la durée de vie** du vitrificateur
- **Conserver l''éclat** du parquet
- **Éviter une rénovation coûteuse** (ponçage + vitrification)

## La gamme FINISH CARE de Pallmann

### CLEAN : Le nettoyant quotidien

**CLEAN** est un nettoyant pH neutre spécialement formulé pour les parquets vitrifiés.

**Utilisation** :
- Diluer 50ml dans 5L d''eau
- Passer la serpillière bien essorée
- Pas de rinçage nécessaire

**Avantages** :
- Ne laisse pas de traces
- Respecte le film de vitrificateur
- Parfum agréable et discret

### CLEAN STRONG : Le nettoyant intensif

Pour les **salissures tenaces** (traces de chaussures, taches grasses), CLEAN STRONG offre un pouvoir dégraissant renforcé.

**Usage** : Occasionnel, en cas de besoin

### FINISH CARE : La protection rénovatrice

**FINISH CARE** est une émulsion de soin qui :
- Ravive l''éclat du parquet
- Dépose une fine couche protectrice
- Masque les micro-rayures

**Application** :
1. Nettoyer le parquet au préalable
2. Appliquer FINISH CARE au balai microfibre
3. Laisser sécher 30 minutes
4. Lustrer si nécessaire

**Fréquence** : 2 à 4 fois par an selon le passage

### FINISH CARE STOP : L''antidérapant

Pour les escaliers ou les zones à risque, **FINISH CARE STOP** ajoute une fonction antidérapante tout en protégeant le parquet.

## Programme d''entretien recommandé

### Entretien quotidien
- Balayage ou aspirateur (brosse parquet)
- Serpillière humide avec CLEAN si nécessaire

### Entretien hebdomadaire
- Nettoyage complet au CLEAN
- Insister sur les zones de passage

### Entretien trimestriel
- Application de FINISH CARE
- Inspection des zones usées

### Entretien annuel
- Nettoyage intensif au CLEAN STRONG
- Application de FINISH CARE renforcée
- Évaluation de l''état général

## Erreurs à éviter

❌ **Eau en excès** : L''eau stagnante peut infiltrer les joints et faire gonfler le bois

❌ **Produits ménagers classiques** : Javel, vinaigre, produits multi-surfaces attaquent le vitrificateur

❌ **Nettoyeur vapeur** : La chaleur et l''humidité peuvent décoller le film protecteur

❌ **Serpillière sale** : Traîne la poussière abrasive et raye le parquet

## Quand refaire la vitrification ?

Malgré un bon entretien, le vitrificateur finit par s''user. Signes qu''il faut rénover :
- Zones mates malgré l''entretien
- Rayures profondes visibles
- Bois à nu par endroits
- Eau qui pénètre dans le bois

Dans ce cas, un ponçage léger (égrenage) suivi d''une nouvelle couche de vitrificateur PALL-X peut suffire.

## Commander les produits FINISH CARE

Retrouvez toute la gamme d''entretien Pallmann sur notre boutique :
- CLEAN, CLEAN STRONG
- FINISH CARE, FINISH CARE STOP
- Accessoires (balais, microfibres)

[Voir les produits d''entretien →](/)',
  true,
  'Entretien parquet vitrifié avec FINISH CARE Pallmann | Guide complet',
  'Guide pour entretenir votre parquet vitrifié avec FINISH CARE de Pallmann. Nettoyage, protection et rénovation.',
  'entretien parquet, FINISH CARE, nettoyant parquet, protection parquet vitrifié, Pallmann CLEAN',
  NOW(),
  NOW()
);

-- Article 4: Guide abrasifs ponceuse parquet
INSERT INTO articles (
  title,
  slug,
  excerpt,
  content,
  published,
  meta_title,
  meta_description,
  keywords,
  created_at,
  updated_at
) VALUES (
  'Guide des abrasifs pour ponceuses à parquet',
  'guide-abrasifs-ponceuse-parquet-pallmann',
  'Comment choisir ses abrasifs pour ponceuse parquet ? Grains, types (corindon, zirconium), formats. Guide complet pour professionnels.',
  '# Guide des abrasifs pour ponceuses à parquet

Le choix des **abrasifs** est crucial pour réussir un ponçage de parquet. Grain, matériau, format : découvrez comment sélectionner les bons consommables.

## Comprendre les grains d''abrasif

Le **grain** indique la taille des particules abrasives. Plus le chiffre est petit, plus l''abrasif est agressif.

### Grains grossiers (16-40)
- **Grain 16** : Décapage intensif, anciennes finitions épaisses
- **Grain 24** : Égalisation de parquets très abîmés
- **Grain 36-40** : Ponçage de dégrossissage standard

**Usage** : Première passe, enlèvement de matière important

### Grains moyens (60-80)
- **Grain 60** : Ponçage intermédiaire
- **Grain 80** : Affinage après dégrossissage

**Usage** : Passes intermédiaires, préparation à la finition

### Grains fins (100-120)
- **Grain 100** : Ponçage de finition
- **Grain 120** : Super-finition avant vitrification

**Usage** : Dernière passe avant application du fond dur ou vitrificateur

## Types d''abrasifs

### Corindon (oxyde d''aluminium)

L''abrasif **corindon** est le plus courant :
- **Prix économique**
- Bon pouvoir abrasif
- Usure progressive

**Recommandé pour** : Bois tendres, parquets neufs, budgets serrés

### Zirconium

L''abrasif **zirconium** offre des performances supérieures :
- **Durée de vie 2-3× plus longue**
- Coupe plus froide (moins de brûlures)
- Auto-affûtant

**Recommandé pour** : Bois durs (chêne, hêtre), gros chantiers, usage intensif

### Céramique

Le haut de gamme pour les professionnels exigeants :
- **Durée de vie maximale**
- Coupe très agressive et froide
- Prix premium

## Formats d''abrasifs

### Bandes abrasives (750×200 mm)

Pour les **ponceuses à parquet type COBRA** :
- Format standard professionnel
- Conditionnement par 10 pièces
- Disponible en corindon et zirconium

**Prix indicatifs** (paquet de 10) :
| Grain | Corindon | Zirconium |
|-------|----------|-----------|
| 24 | 104€ | 150€ |
| 40 | 91€ | 120€ |
| 60 | 87€ | 115€ |
| 80 | 78€ | 109€ |
| 100 | 77€ | 109€ |

### Disques velcro (Ø150 mm)

Pour les **bordeuses et monodisques** :
- Fixation velcro rapide
- Conditionnement par 50 pièces
- Essentiellement en zirconium

**Prix indicatifs** (paquet de 50) :
- Grain 40 : 143€
- Grain 60 : 111€
- Grain 80 : 106€
- Grain 100 : 103€

### Disques pour monobrosse

Formats Ø406mm et Ø432mm pour les monobrosses de finition.

## Séquence de ponçage recommandée

### Parquet ancien très abîmé
1. **Grain 24** : Décapage complet
2. **Grain 40** : Égalisation
3. **Grain 60** : Affinage
4. **Grain 80** : Préparation
5. **Grain 100/120** : Finition

### Parquet en bon état
1. **Grain 40-60** : Dégrossissage léger
2. **Grain 80** : Préparation
3. **Grain 100/120** : Finition

### Égrenage (rafraîchissement)
1. **Grain 120** uniquement : Dépolissage léger avant nouvelle couche de vitrificateur

## Astuces de pro

💡 **Ne sautez pas de grain** : Passer du 24 au 100 laissera des rayures visibles après vitrification.

💡 **Changez régulièrement** : Un abrasif usé brûle le bois et raye au lieu de poncer.

💡 **Croisez les passes** : Poncer en diagonale puis dans le sens du fil pour un résultat optimal.

💡 **Dépoussiérez entre chaque grain** : Les résidus de ponçage grossier rayent lors du ponçage fin.

## Commander vos abrasifs Pallmann

Sur **Pallmann Store**, retrouvez tous les abrasifs professionnels :
- Bandes 750×200 corindon et zirconium
- Disques Ø150 velcro
- Pads et treillis pour finition

**Livraison France entière** - Franco de port dès 630€ HT

[Voir tous les abrasifs →](/)',
  true,
  'Guide des abrasifs pour ponceuses à parquet | Pallmann Store',
  'Comment choisir ses abrasifs pour ponceuse parquet. Grains, types (corindon, zirconium), formats. Guide professionnel.',
  'abrasifs parquet, bande abrasive, disque velcro, ponceuse parquet, grain abrasif, zirconium, corindon',
  NOW(),
  NOW()
);

-- ============================================
-- 3. TABLE pro_requests (si elle n''existe pas)
-- ============================================

-- Décommenter si la table n''existe pas :
/*
CREATE TABLE IF NOT EXISTS pro_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_name TEXT NOT NULL,
  siret TEXT NOT NULL,
  contact_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  address TEXT,
  city TEXT,
  postal_code TEXT,
  message TEXT,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_pro_requests_email ON pro_requests(email);
CREATE INDEX IF NOT EXISTS idx_pro_requests_status ON pro_requests(status);
*/

-- ============================================
-- 4. TABLE quote_requests (demandes de devis)
-- ============================================

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
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index pour recherche rapide
CREATE INDEX IF NOT EXISTS idx_quote_requests_email ON quote_requests(email);
CREATE INDEX IF NOT EXISTS idx_quote_requests_status ON quote_requests(status);
CREATE INDEX IF NOT EXISTS idx_quote_requests_created ON quote_requests(created_at DESC);

-- Vérification
-- SELECT title, slug FROM articles ORDER BY created_at DESC;
