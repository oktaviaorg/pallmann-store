-- ============================================
-- PALLMANN STORE - Table articles séparée
-- Ne pas toucher à la table 'articles' (utilisée par ponceur-parquet.fr)
-- ============================================

-- Créer la table pallmann_articles
CREATE TABLE IF NOT EXISTS pallmann_articles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT,
  content TEXT,
  image_url TEXT,
  published BOOLEAN DEFAULT false,
  tags TEXT[] DEFAULT '{}',
  meta_title TEXT,
  meta_description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index pour les recherches
CREATE INDEX IF NOT EXISTS idx_pallmann_articles_slug ON pallmann_articles(slug);
CREATE INDEX IF NOT EXISTS idx_pallmann_articles_published ON pallmann_articles(published);
CREATE INDEX IF NOT EXISTS idx_pallmann_articles_tags ON pallmann_articles USING GIN(tags);

-- RLS
ALTER TABLE pallmann_articles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read" ON pallmann_articles
  FOR SELECT USING (published = true);

CREATE POLICY "Allow authenticated insert" ON pallmann_articles
  FOR INSERT TO authenticated WITH CHECK (true);

-- ============================================
-- ARTICLES PALLMANN STORE
-- ============================================

-- FICHES PRODUITS
INSERT INTO pallmann_articles (title, slug, excerpt, content, published, tags) VALUES

-- Article 1 : PALL-X 96
('PALL-X 96 : Le vitrificateur star des professionnels', 
'pall-x-96-vitrificateur-professionnel',
'Découvrez le PALL-X 96, le vitrificateur mono-composant préféré des parqueteurs professionnels.',
'## Qu''est-ce que le PALL-X 96 ?

Le **PALL-X 96** est un vitrificateur mono-composant à base d''eau. C''est le produit phare de Pallmann, utilisé par les professionnels du parquet dans toute l''Europe.

## Pour qui ?

- Parquets à usage **intensif** (couloirs, séjours, commerces)
- Professionnels exigeants
- Chantiers de rénovation

## Caractéristiques

| Propriété | Valeur |
|-----------|--------|
| Type | Mono-composant |
| Base | Aqueuse |
| Rendement | ~10 m²/litre |
| Séchage | 4h entre couches |
| Finitions | Mat, Satiné, Brillant |

## Application

1. **Préparer** le parquet (ponçage grain 100-120)
2. **Appliquer** un fond dur PALL-X 320 ou 325
3. **Égrener** légèrement (grain 150)
4. **Appliquer** 2 couches de PALL-X 96

## Prix

À partir de **200,50€ HT** les 5 litres.

[Commander sur Pallmann Store →](/boutique)',
true, 
ARRAY['fiche-produit', 'vitrificateur', 'pall-x']),

-- Article 2 : MAGIC OIL 2K
('MAGIC OIL 2K : L''huile professionnelle par excellence',
'magic-oil-2k-huile-professionnelle',
'Tout savoir sur MAGIC OIL 2K, l''huile bi-composante pour un rendu naturel et une protection durable.',
'## Qu''est-ce que MAGIC OIL 2K ?

**MAGIC OIL 2K** est une huile-cire bi-composante qui pénètre dans le bois pour le protéger de l''intérieur. Le résultat : un aspect naturel magnifique.

## Avantages

✅ Aspect naturel, toucher bois  
✅ Réparations locales possibles  
✅ Pas de film en surface  
✅ Écologique  

## Versions disponibles

- **Original** : finition classique
- **ERGO** : monocouche, gain de temps
- **PURE** : sans COV
- **WHITE** : effet blanchi

## Application

1. Poncer le parquet (grain 120)
2. Mélanger composant A + B
3. Appliquer généreusement
4. Racler l''excédent après 20 min
5. Polir au pad beige

## Entretien

Utiliser **MAGIC OIL CARE** pour l''entretien régulier (1-2x par an).

## Prix

À partir de **323€ HT** les 2,75 litres.

[Commander sur Pallmann Store →](/boutique)',
true,
ARRAY['fiche-produit', 'huile', 'magic-oil']),

-- Article 3 : Colles
('Colles P4, P5, P6, P9 : Laquelle choisir ?',
'colles-p4-p5-p6-p9-guide-choix',
'Guide complet pour choisir la bonne colle Pallmann selon votre chantier.',
'## Les colles Pallmann

Pallmann propose 4 colles principales, chacune adaptée à un usage spécifique.

## Comparatif

| Colle | Usage | Temps ouvert | Prix HT (16kg) |
|-------|-------|--------------|----------------|
| **P4** | Courant | 30 min | 168€ |
| **P5** | Intensif | 40 min | 178€ |
| **P6** | Premium | 45 min | 207€ |
| **P9** | Bi-composante | 60 min | 161€ |

## Comment choisir ?

### P4 - Le standard
Pour les chantiers classiques, bon rapport qualité/prix.

### P5 - Le polyvalent  
Temps ouvert plus long, idéal pour grandes surfaces.

### P6 - Le premium
Performance maximale, chantiers exigeants.

### P9 - Le spécialiste
Bi-composante, pour cas particuliers (chauffage au sol haute temp.).

## Conseils d''application

- Support propre, sec, plan
- Température > 15°C
- Humidité résiduelle < 2% CM
- Spatule crantée B3 ou B11

[Commander sur Pallmann Store →](/boutique)',
true,
ARRAY['fiche-produit', 'colle', 'guide']),

-- Article 4 : Abrasifs
('Comprendre les grains d''abrasifs pour le ponçage',
'guide-grains-abrasifs-poncage',
'Grain 40, 80, 120... Quel abrasif utiliser à chaque étape du ponçage ?',
'## Les grains expliqués simplement

Le **grain** indique la taille des particules abrasives. Plus le chiffre est petit, plus c''est agressif.

## Utilisation par grain

| Grain | Utilisation |
|-------|-------------|
| **16-24** | Dégrossissage (vieux vernis épais) |
| **36-40** | Ponçage principal |
| **60-80** | Finition |
| **100-120** | Égrenage entre couches |

## Corindon vs Zirconium

### Corindon (rouge/brun)
- Moins cher
- Usage courant
- Bois tendres à mi-durs

### Zirconium (bleu)
- Plus durable
- Bois durs (chêne, hêtre)
- Meilleur rendement

## Séquence type

1. **Grain 40** : enlever l''ancien vernis
2. **Grain 60** : uniformiser
3. **Grain 100** : finition avant vitrification
4. **Grain 120** : égrenage entre couches

[Commander sur Pallmann Store →](/boutique)',
true,
ARRAY['fiche-produit', 'abrasif', 'guide']),

-- CONSEILS
('Vitrifier son parquet en 5 étapes simples',
'vitrifier-parquet-5-etapes',
'Guide pratique pour vitrifier votre parquet comme un pro.',
'## Vitrifier un parquet : mode d''emploi

La vitrification protège votre parquet avec un film transparent et résistant.

## Les 5 étapes

### 1. Poncer
- Commencer au grain 40 (si ancien vernis)
- Puis grain 60
- Finir au grain 100
- **Dépoussiérer** soigneusement !

### 2. Appliquer le fond dur
- PALL-X 320 (standard) ou PALL-X 325 (garnissant)
- 1 couche au rouleau
- Séchage : 2-3h

### 3. Égrener
- Léger ponçage au grain 120-150
- Enlève les fibres relevées
- Dépoussiérer à nouveau

### 4. Première couche de vitrificateur
- PALL-X 96 recommandé
- Appliquer au rouleau mohair
- Séchage : 4h

### 5. Deuxième couche
- Sans égrener
- Appliquer finement
- Attendre 24h avant circulation légère

## Astuces pro

💡 Travailler à 18-22°C  
💡 Aérer pendant et après  
💡 Ne pas surcharger le rouleau  

[Voir nos vitrificateurs →](/boutique)',
true,
ARRAY['conseil', 'vitrification', 'guide']),

('Huile ou vitrificateur : que choisir pour son parquet ?',
'huile-ou-vitrificateur-parquet',
'Les avantages et inconvénients de chaque finition pour faire le bon choix.',
'## Le grand débat

Huile ou vitrificateur ? Les deux ont leurs avantages.

## Vitrificateur

### ✅ Avantages
- Protection maximale
- Entretien facile (serpillère)
- Dure 10-15 ans
- Résiste aux taches

### ❌ Inconvénients
- Aspect "filmogène"
- Réparation = ponçage total
- Moins naturel au toucher

## Huile

### ✅ Avantages
- Aspect naturel
- Toucher bois authentique
- Réparations locales possibles
- Écologique

### ❌ Inconvénients
- Entretien régulier (1-2x/an)
- Moins résistant aux taches
- Renouvellement plus fréquent

## Comment choisir ?

| Critère | Vitrificateur | Huile |
|---------|--------------|-------|
| Passage intensif | ✅ | ❌ |
| Aspect naturel | ❌ | ✅ |
| Entretien minimal | ✅ | ❌ |
| Enfants/animaux | ✅ | ❌ |
| Réparations faciles | ❌ | ✅ |

## Notre conseil

- **Séjour, couloir, commerce** → Vitrificateur (PALL-X 96)
- **Chambre, bureau, aspect naturel** → Huile (MAGIC OIL 2K)

[Voir tous nos produits →](/boutique)',
true,
ARRAY['conseil', 'guide', 'comparatif']),

('Entretenir son parquet vitrifié : les bons gestes',
'entretenir-parquet-vitrifie',
'Conseils simples pour garder votre parquet vitrifié comme neuf.',
'## Entretien quotidien

### Ce qu''il faut faire
- **Balai** ou **aspirateur** (brosse parquet)
- Serpillère **légèrement** humide
- Nettoyer les taches rapidement

### Ce qu''il ne faut PAS faire
❌ Eau stagnante  
❌ Serpillère détrempée  
❌ Javel, alcool, ammoniaque  
❌ Produits abrasifs  

## Entretien régulier

### Nettoyage (1x/semaine)
- **FINISH CARE** dilué dans l''eau
- 1 bouchon pour 5L d''eau
- Serpillère bien essorée

### Raviver (2-3x/an)
- **FINISH CARE** pur
- Appliquer au balai plat
- Laisse un film protecteur

## Produits recommandés

| Produit | Usage |
|---------|-------|
| FINISH CARE | Nettoyage + protection |
| FINISH CARE MAT | Ravive les finitions mates |
| FINISH CARE STOP | Anti-glisse |

## Quand revitrifier ?

Après 10-15 ans ou si :
- Usure visible dans les passages
- Le vernis ne protège plus
- Rayures profondes

[Voir nos produits d''entretien →](/boutique)',
true,
ARRAY['conseil', 'entretien', 'vitrification']),

('Entretenir son parquet huilé : guide complet',
'entretenir-parquet-huile',
'Tout savoir sur l''entretien d''un parquet huilé pour le garder beau longtemps.',
'## Spécificité du parquet huilé

Un parquet huilé n''a **pas de film** en surface. L''huile pénètre dans le bois. L''entretien est donc différent.

## Entretien quotidien

- Balai ou aspirateur
- Serpillère **très** essorée
- Éviter l''eau stagnante

## Entretien régulier

### Nettoyage (1x/semaine)
- **MAGIC OIL CARE** dilué
- 2-3 bouchons pour 5L d''eau
- Nettoie ET nourrit le bois

### Raviver (1-2x/an)
- **MAGIC OIL CARE** pur
- Appliquer au balai plat
- Laisser sécher 30 min
- Lustrer au chiffon

## Réparer une tache

C''est l''avantage du parquet huilé !

1. Poncer la zone (grain 120)
2. Dépoussiérer
3. Appliquer MAGIC OIL 2K
4. Essuyer l''excédent
5. Laisser sécher 24h

## Produits indispensables

| Produit | Usage |
|---------|-------|
| MAGIC OIL CARE | Entretien courant |
| MAGIC OIL CARE WHITE | Parquets blanchis |
| MAGIC OIL 2K | Réparations locales |

[Voir nos huiles et entretien →](/boutique)',
true,
ARRAY['conseil', 'entretien', 'huile']);
