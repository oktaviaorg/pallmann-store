-- Nettoyer et recréer les articles du blog Pallmann Store
-- À exécuter dans Supabase SQL Editor

DELETE FROM articles;

INSERT INTO articles (title, slug, excerpt, content, published, tags, featured_image, published_at, updated_at) VALUES

-- Article 1 : Guide vitrificateurs PALL-X
(
  'Comment choisir son vitrificateur PALL-X : Guide complet',
  'comment-choisir-vitrificateur-pall-x',
  'Guide complet pour choisir le bon vitrificateur Pallmann selon votre usage : PALL-X 94, PALL-X 96 ou PALL-X 98 ?',
  '## Les vitrificateurs PALL-X : la gamme complète

La gamme PALL-X de Pallmann représente ce qui se fait de mieux en matière de vitrification professionnelle. Chaque produit a été conçu pour répondre à des besoins spécifiques.

### PALL-X 94 : Le classique polyvalent

Le **PALL-X 94** est un vitrificateur bi-composant polyuréthane qui offre :
- Excellente résistance à l''abrasion
- Séchage rapide (peut être revernissé après 4h)
- Finition brillante, satinée ou mate
- Idéal pour les habitations et locaux à trafic modéré

**Rendement** : 8-10 m²/L selon le support

### PALL-X 96 : Performance maximale

Le **PALL-X 96** est la référence pour les chantiers exigeants :
- Résistance chimique renforcée
- Durabilité exceptionnelle
- Parfait pour les locaux commerciaux
- Certification EC1Plus (faibles émissions)

**Rendement** : 8-10 m²/L

### PALL-X 98 : L''excellence à l''eau

Le **PALL-X 98** représente le summum de la technologie à l''eau :
- 100% aqueux, sans solvant
- Aspect naturel et chaleureux du bois
- Séchage ultra-rapide
- Idéal pour les environnements sensibles (écoles, hôpitaux)

**Rendement** : 10-12 m²/L

## Comment choisir ?

| Critère | PALL-X 94 | PALL-X 96 | PALL-X 98 |
|---------|-----------|-----------|-----------|
| Trafic modéré | ✅ Optimal | ✅ Très bon | ✅ Très bon |
| Trafic intense | ⚠️ Correct | ✅ Optimal | ✅ Très bon |
| Aspect naturel | ⚠️ Standard | ⚠️ Standard | ✅ Excellent |
| Écologique | ⚠️ Standard | ✅ EC1Plus | ✅ Sans solvant |

## Conseils d''application

1. **Préparation** : Ponçage soigné du parquet jusqu''au grain 120
2. **Primaire** : Toujours appliquer un primaire (PALL-X 300 ou 320)
3. **Application** : Rouleau laqueur ou spatule selon le produit
4. **Entretien** : Utiliser CLEAN & GO pour le nettoyage quotidien

Pour toute question technique, n''hésitez pas à nous contacter !',
  true,
  ARRAY['vitrificateur', 'PALL-X', 'guide', 'professionnel'],
  'https://www.pallmann.net/fileadmin/_processed_/b/4/csm_PALL-X_96_5L_Geb_neu_01_4e8b8a12c8.png',
  NOW() - INTERVAL '5 days',
  NOW() - INTERVAL '5 days'
),

-- Article 2 : MAGIC OIL 2K
(
  'MAGIC OIL 2K : L''huile professionnelle pour parquets d''exception',
  'magic-oil-2k-huile-professionnelle-parquet',
  'Découvrez MAGIC OIL 2K, l''huile-cire bi-composant de Pallmann qui sublime naturellement vos parquets.',
  '## MAGIC OIL 2K : Le choix des professionnels

Le **MAGIC OIL 2K** est une huile-cire bi-composant révolutionnaire qui offre le meilleur des deux mondes : l''aspect naturel de l''huile et la protection durable d''un vitrificateur.

### Pourquoi choisir MAGIC OIL 2K ?

- **Aspect mat naturel** : Met en valeur la texture du bois
- **Pénétration profonde** : Protège le bois de l''intérieur
- **Durcissement chimique** : Grâce au composant réactif
- **Rénovation facile** : Pas besoin de poncer entièrement
- **Certification EC1Plus** : Faibles émissions COV

### Application professionnelle

#### Matériel recommandé
- Machine monobrosse avec pad blanc ou beige
- Spatule crantée pour l''étalement
- Chiffons non pelucheux pour l''essuyage

#### Étapes d''application

1. **Ponçage** : Finir au grain 120-150
2. **Dépoussiérage** : Aspiration soignée + chiffon humide
3. **Application** : Étaler au rouleau ou spatule (50-60 g/m²)
4. **Travail du produit** : Monobrosse avec pad beige
5. **Essuyage** : Enlever l''excédent avec chiffons propres
6. **Séchage** : 12h avant trafic léger

### Gamme de teintes

MAGIC OIL 2K est disponible en plusieurs teintes :
- **Naturel** : Aspect bois brut
- **Blanc** : Effet blanchi nordique
- **Gris** : Tendance contemporaine
- **Plus de 15 teintes** disponibles sur demande

### Entretien

Pour préserver la beauté de votre parquet huilé :
- Nettoyage courant : **CLEAN & GO**
- Rénovation périodique : **MAGIC OIL CARE**
- Réparations locales : **MAGIC OIL 1K**

Le système MAGIC OIL vous garantit un parquet magnifique pendant des années !',
  true,
  ARRAY['huile', 'MAGIC OIL', 'finition', 'naturel'],
  'https://www.pallmann.net/fileadmin/_processed_/e/e/csm_MAGIC_OIL_2K_2_5L_Geb_neu_01_5c8c8a8c12.png',
  NOW() - INTERVAL '3 days',
  NOW() - INTERVAL '3 days'
),

-- Article 3 : Entretien avec FINISH CARE
(
  'Entretenir son parquet vitrifié avec FINISH CARE',
  'entretien-parquet-vitrifie-finish-care',
  'Guide pratique pour entretenir et raviver l''éclat de votre parquet vitrifié grâce aux produits FINISH CARE de Pallmann.',
  '## L''entretien professionnel de votre parquet vitrifié

Un parquet vitrifié bien entretenu peut durer des décennies. Voici le guide complet pour préserver la beauté de vos sols.

### Le système FINISH CARE

Pallmann a développé une gamme complète pour l''entretien des parquets vitrifiés :

#### 1. CLEAN & GO - Nettoyage quotidien

- Nettoyant doux concentré
- Dilution : 50-100 ml pour 10L d''eau
- Ne laisse pas de film
- pH neutre, respecte le vitrificateur

**Usage** : Serpillière bien essorée, 1-2 fois par semaine

#### 2. FINISH CARE STRONG - Rénovation en profondeur

- Polish protecteur haute performance
- Ravive l''éclat du vitrificateur
- Comble les micro-rayures
- Application à la monobrosse

**Usage** : 2-4 fois par an selon le trafic

#### 3. FINISH CARE MATT - Pour finitions mates

- Polish spécial finitions mates
- Préserve l''aspect satiné/mat
- Sans effet brillant indésirable
- Excellent pouvoir couvrant

**Usage** : Parquets vitrifiés mat ou satiné

### Programme d''entretien recommandé

| Fréquence | Action | Produit |
|-----------|--------|---------|
| Quotidien | Dépoussiérage | Balai microfibre |
| Hebdomadaire | Nettoyage humide | CLEAN & GO |
| Trimestriel | Polish protecteur | FINISH CARE |
| Annuel | Rénovation | FINISH CARE STRONG |

### Erreurs à éviter

❌ **Ne jamais utiliser** :
- Eau de javel
- Détergents agressifs
- Nettoyeurs vapeur
- Serpillières trop mouillées

✅ **Toujours** :
- Bien essorer la serpillière
- Essuyer les liquides renversés rapidement
- Utiliser des patins sous les meubles
- Placer des tapis aux entrées

### Astuce pro

Pour un entretien optimal, investissez dans un **kit professionnel** comprenant :
- Balai microfibre avec réservoir
- CLEAN & GO concentré 1L
- FINISH CARE 1L
- Lingettes microfibre lavables

Votre parquet vous remerciera !',
  true,
  ARRAY['entretien', 'FINISH CARE', 'vitrificateur', 'nettoyage'],
  'https://www.pallmann.net/fileadmin/_processed_/c/7/csm_FINISH_CARE_1L_Geb_neu_01_3d8c8a8c12.png',
  NOW() - INTERVAL '1 day',
  NOW() - INTERVAL '1 day'
),

-- Article 4 : Guide abrasifs ponceuses
(
  'Guide complet des abrasifs pour ponceuses à parquet',
  'guide-abrasifs-ponceuses-parquet',
  'Comment choisir les bons abrasifs pour votre ponceuse à parquet ? Grains, types et techniques expliqués par les pros.',
  '## Les abrasifs pour ponceuse à parquet : le guide ultime

Le ponçage est l''étape cruciale avant toute finition. Un mauvais choix d''abrasif peut compromettre le résultat final.

### Comprendre les grains

Les grains d''abrasif sont classés par leur taille, du plus grossier au plus fin :

| Grain | Usage |
|-------|-------|
| 16-24 | Décapage agressif, anciennes finitions épaisses |
| 36-40 | Dégrossissage, planéité |
| 60 | Ponçage intermédiaire |
| 80-100 | Préparation finition |
| 120 | Finition vitrificateur |
| 150-180 | Finition huile/cire |

### Types d''abrasifs

#### Bandes pour ponceuse à bande
- Format standard : largeur 200-250mm
- Longueur selon machine
- Grains 16 à 120 disponibles

#### Disques pour bordureuse
- Diamètres : 150mm, 178mm, 200mm
- Système velcro ou papier
- Tous grains disponibles

#### Disques pour monobrosse
- Grands diamètres : 400-430mm
- Grains 60 à 150
- Pour finition et égrenage

### Séquence de ponçage recommandée

**Pour un parquet ancien vernis :**
1. **Grain 36** : Décapage du vernis (diagonale)
2. **Grain 60** : Élimination des rayures (sens du bois)
3. **Grain 100** : Préparation
4. **Grain 120** : Finition (avant vitrificateur)

**Pour un parquet neuf :**
1. **Grain 60** : Planéité
2. **Grain 100** : Préparation
3. **Grain 120-150** : Finition selon produit

### Conseils professionnels

#### Vitesse et pression
- Vitesse constante : évite les creux
- Pression uniforme : pas de marques
- Chevauchement : 1/3 de la bande

#### Entretien des abrasifs
- Nettoyer régulièrement (gomme à crêper)
- Changer dès que le grain ne coupe plus
- Stocker à plat, au sec

#### Calcul des besoins

**Estimation pour 100m²** :
- Bandes grain 36 : 3-4 unités
- Bandes grain 60 : 4-5 unités
- Bandes grain 100 : 5-6 unités
- Bandes grain 120 : 6-8 unités

### Marques recommandées

Pallmann propose une gamme complète d''abrasifs haute qualité :
- **Durabilité supérieure** : Coupe plus longtemps
- **Grain régulier** : Finition impeccable
- **Anti-encrassement** : Pour bois résineux

Retrouvez tous nos abrasifs sur la boutique !',
  true,
  ARRAY['abrasif', 'ponçage', 'ponceuse', 'technique'],
  'https://www.pallmann.net/fileadmin/_processed_/f/2/csm_Schleifmittel_Uebersicht_01_8c8c8a8c12.jpg',
  NOW(),
  NOW()
);

-- Vérification
SELECT id, title, slug, published FROM articles ORDER BY updated_at DESC;
