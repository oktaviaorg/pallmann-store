-- Articles de blog Pallmann Store
-- Style : simple, accessible, "pour les nuls"
-- À exécuter dans Supabase SQL Editor

DELETE FROM articles;

INSERT INTO articles (title, slug, excerpt, content, published, tags, featured_image, published_at, updated_at) VALUES

-- ============================================
-- FICHES PRODUITS (tag: fiche-produit)
-- ============================================

-- Article 1 : PALL-X 96
(
  'PALL-X 96 : Le vitrificateur star des pros',
  'pall-x-96-vitrificateur-star',
  'Le PALL-X 96 est LE vitrificateur préféré des professionnels. Découvrez pourquoi il est si populaire et comment l''utiliser.',
  '## C''est quoi le PALL-X 96 ?

Le PALL-X 96 est un **vitrificateur mono-composant**. En clair : vous ouvrez le bidon et vous appliquez. Pas de mélange compliqué.

C''est le produit phare de Pallmann, utilisé par la majorité des parqueteurs professionnels.

---

## Pour qui ?

Le PALL-X 96 est fait pour vous si :

- Vous avez un **parquet très sollicité** (couloir, séjour, entrée)
- Vous cherchez une **protection maximale**
- Vous voulez un produit **facile à appliquer**

Il convient aux particuliers comme aux professionnels.

---

## Les chiffres clés

- **Rendement** : environ 10 m² par litre
- **Séchage entre couches** : 4 heures
- **Circulation légère** : après 24 heures
- **Usage normal** : après 7 jours

---

## Les finitions disponibles

Vous pouvez choisir l''aspect final :

- **Mat** : aspect naturel, ne brille pas
- **Satiné** : léger reflet, le plus demandé
- **Brillant** : effet miroir traditionnel

---

## Combien ça coûte ?

À partir de **200 € HT les 5 litres**.

Pour une pièce de 20 m², comptez environ 2 litres, soit moins de 100 € HT de vitrificateur.

---

## Comment l''appliquer ?

1. Poncez votre parquet (jusqu''au grain 120)
2. Dépoussiérez soigneusement
3. Appliquez un fond dur (PALL-X 300 ou 320)
4. Laissez sécher puis égrenez légèrement
5. Appliquez 2 couches de PALL-X 96

**Astuce** : Utilisez un rouleau laqueur pour un résultat impeccable.

---

## Pourquoi les pros l''adorent ?

- Facile à utiliser
- Résultat garanti
- Très résistant
- Certification EC1Plus (peu d''odeur)

C''est le choix sûr pour un parquet qui dure.',
  true,
  ARRAY['fiche-produit'],
  NULL,
  NOW(),
  NOW()
),

-- Article 2 : MAGIC OIL 2K
(
  'MAGIC OIL 2K : L''huile des professionnels',
  'magic-oil-2k-huile-professionnelle',
  'Vous préférez un parquet aspect naturel ? MAGIC OIL 2K est l''huile-cire professionnelle qu''il vous faut.',
  '## C''est quoi MAGIC OIL 2K ?

MAGIC OIL 2K est une **huile-cire bi-composante**. 

Le "2K" signifie qu''il y a 2 composants : l''huile et un durcisseur. Vous les mélangez avant d''appliquer. C''est ce qui rend le produit si résistant.

---

## Pour qui ?

MAGIC OIL 2K est fait pour vous si :

- Vous aimez l''**aspect naturel** du bois
- Vous voulez **sentir le bois** sous vos pieds (pas de film)
- Vous êtes prêt à faire un **entretien régulier**

---

## Huile vs Vitrificateur : la différence

| | Huile | Vitrificateur |
|---|---|---|
| Aspect | Naturel, mat | Filmogène, brillant possible |
| Toucher | On sent le bois | Surface lisse |
| Protection | Dans le bois | Sur le bois |
| Entretien | Régulier | Occasionnel |
| Réparation | Facile, locale | Difficile, totale |

---

## Le gros avantage

Avec une huile, si vous avez une rayure ou une tache :

1. Vous poncez juste la zone abîmée
2. Vous réappliquez un peu d''huile
3. C''est réparé !

Avec un vitrificateur, il faut souvent tout reponcer.

---

## Comment l''appliquer ?

1. Poncez votre parquet (grain 120-150)
2. Mélangez l''huile avec le durcisseur
3. Appliquez à la spatule ou au rouleau
4. Travaillez le produit avec une monobrosse
5. Essuyez l''excédent
6. Laissez sécher 12h
7. Appliquez une 2ème couche (même procédé)

---

## L''entretien

Pour garder un beau parquet huilé, utilisez :

- **MAGIC OIL CARE** pour le nettoyage courant
- **MAGIC OIL CARE** en couche de soin 1-2 fois par an

C''est simple : un seul produit pour tout !

---

## Les teintes disponibles

MAGIC OIL 2K existe en plus de 15 teintes :

- Naturel (incolore)
- Blanc (effet nordique)
- Gris (moderne)
- Et beaucoup d''autres...

Vous pouvez créer le parquet de vos rêves.',
  true,
  ARRAY['fiche-produit'],
  NULL,
  NOW(),
  NOW()
),

-- Article 3 : Colles P4/P5/P6
(
  'Colles Pallmann P4, P5, P6 : laquelle choisir ?',
  'colles-pallmann-p4-p5-p6-laquelle-choisir',
  'P4, P5 ou P6 ? On vous explique simplement les différences pour choisir la bonne colle parquet.',
  '## Les colles Pallmann : 3 niveaux de performance

Pallmann propose plusieurs colles parquet. Plus le numéro est élevé, plus la colle est performante. Simple !

---

## P4 : Le bon rapport qualité-prix

**C''est pour qui ?**
- Parquets en usage courant
- Chambres, bureaux
- Budget maîtrisé

**Caractéristiques :**
- Colle mono-composante (prête à l''emploi)
- Facile à appliquer
- Bon pouvoir collant

**Prix** : Le plus abordable de la gamme

---

## P5 : Le choix sûr

**C''est pour qui ?**
- Parquets en usage intensif
- Séjours, couloirs
- La plupart des chantiers

**Caractéristiques :**
- Temps ouvert plus long (plus de temps pour travailler)
- Meilleure résistance
- Polyvalente

**Prix** : Milieu de gamme

---

## P6 : La premium

**C''est pour qui ?**
- Exigences maximales
- Grands formats de lames
- Chauffage au sol haute température

**Caractéristiques :**
- Performance très haute
- Excellent pour les lames larges
- Résistance exceptionnelle

**Prix** : Haut de gamme, mais ça se justifie

---

## Et la P9 ?

La **P9** est une colle bi-composante. Elle est réservée aux cas spéciaux :

- Parquets sur supports difficiles
- Très grands formats
- Conditions extrêmes

Elle nécessite un mélange avec un durcisseur.

---

## Comment choisir ?

| Votre situation | Notre conseil |
|---|---|
| Chambre, bureau | P4 suffit |
| Séjour, couloir | P5 recommandé |
| Grandes lames + chauffage sol | P6 |
| Support difficile | P9 |

---

## Conseil de pro

En cas de doute, prenez la gamme au-dessus. La différence de prix est faible par rapport au coût total du chantier, et vous aurez l''esprit tranquille.

Une colle qui lâche = parquet à refaire = catastrophe !',
  true,
  ARRAY['fiche-produit'],
  NULL,
  NOW(),
  NOW()
),

-- Article 4 : Les abrasifs
(
  'Abrasifs parquet : comprendre les grains',
  'abrasifs-parquet-comprendre-grains',
  'Grain 40, 80, 120... C''est quoi ces numéros ? On vous explique tout sur les abrasifs pour poncer votre parquet.',
  '## C''est quoi le "grain" ?

Le grain, c''est la **taille des particules abrasives** sur le papier de ponçage.

- **Petit numéro** = gros grains = ponçage agressif
- **Grand numéro** = petits grains = ponçage fin

C''est comme le papier de verre, mais en version pro.

---

## Les différents grains et leurs usages

### Grain 16-24 : Le bulldozer

Utilisation : **Décapage de vieux vernis épais**

C''est le plus agressif. Il enlève beaucoup de matière très vite. À utiliser seulement quand il y a une couche épaisse à retirer.

⚠️ Attention : peut laisser des traces profondes

---

### Grain 36-40 : Le dégrossissage

Utilisation : **Ponçage principal**

C''est le grain standard pour commencer. Il aplanit le parquet et retire les anciennes finitions sans trop creuser.

---

### Grain 60-80 : La finition

Utilisation : **Affiner le ponçage**

On passe après le 36-40 pour effacer les rayures laissées par le grain précédent. Le bois devient lisse.

---

### Grain 100-120 : L''égrenage

Utilisation : **Préparation avant finition**

C''est le dernier passage avant d''appliquer vitrificateur ou huile. Le bois est parfaitement lisse, prêt à recevoir le produit.

---

## Corindon ou Zirconium ?

Il existe 2 types de particules abrasives :

### Corindon (oxyde d''aluminium)
- Couleur : beige/marron
- Prix : moins cher
- Usage : bois tendres, travaux courants

### Zirconium
- Couleur : bleu/violet
- Prix : plus cher
- Usage : bois durs, meilleure durée de vie

**Notre conseil** : Le zirconium coûte plus cher mais dure plus longtemps. Sur un gros chantier, il est souvent plus rentable.

---

## La règle d''or

Ne sautez jamais plus d''un grain à la fois !

✅ **Bon** : 36 → 60 → 100 → 120  
❌ **Mauvais** : 36 → 120

Si vous sautez des étapes, les rayures du grain précédent resteront visibles sous la finition.',
  true,
  ARRAY['fiche-produit'],
  NULL,
  NOW(),
  NOW()
),

-- ============================================
-- CONSEILS (tag: conseil)
-- ============================================

-- Article 5 : Vitrifier en 5 étapes
(
  'Vitrifier son parquet en 5 étapes',
  'vitrifier-parquet-5-etapes',
  'Pas besoin d''être un pro pour vitrifier son parquet. Suivez ces 5 étapes simples pour un résultat impeccable.',
  '## La vitrification en 5 étapes simples

Vitrifier un parquet peut sembler compliqué. En réalité, c''est accessible à tous si vous suivez ces étapes.

---

## Étape 1 : Poncer le parquet

Commencez par poncer votre parquet :

1. **Grain 40** : Premier passage pour décaper l''ancien vernis
2. **Grain 80** : Deuxième passage pour affiner

Poncez toujours dans le sens du bois, jamais en travers.

**Astuce** : Vous pouvez louer une ponceuse en magasin de bricolage.

---

## Étape 2 : Dépoussiérer

Le ponçage génère beaucoup de poussière. Il faut tout enlever :

1. Passez l''aspirateur soigneusement
2. Nettoyez au chiffon humide
3. Laissez sécher complètement

**Important** : La moindre poussière se verra sous le vitrificateur !

---

## Étape 3 : Appliquer le fond dur

Le fond dur (ou primaire) prépare le bois :

- Il bouche les pores du bois
- Il empêche le vitrificateur de trop pénétrer
- Il améliore l''accroche

Appliquez au rouleau, laissez sécher 2-3 heures.

**Produit recommandé** : PALL-X 300 ou PALL-X 320

---

## Étape 4 : Égrener légèrement

Une fois le fond dur sec, passez un léger coup de ponçage :

- Utilisez un grain 120
- Juste un effleurement, pas un vrai ponçage
- Le but : créer une légère accroche

Dépoussiérez à nouveau.

---

## Étape 5 : Appliquer 2 couches de vitrificateur

C''est la touche finale :

1. **Première couche** : Appliquez au rouleau laqueur
2. Laissez sécher 4 heures
3. **Deuxième couche** : Même procédé

**Produit recommandé** : PALL-X 96

---

## Les temps de séchage

- Entre 2 couches : **4 heures**
- Circulation pieds nus : **24 heures**
- Meubles légers : **3 jours**
- Usage normal : **7 jours**

Ne soyez pas impatient ! Un séchage complet garantit une meilleure durabilité.

---

## Erreurs à éviter

❌ Appliquer trop de produit (ça fait des bulles)  
❌ Travailler dans une pièce froide (moins de 15°C)  
❌ Oublier le fond dur  
❌ Marcher dessus trop tôt',
  true,
  ARRAY['conseil'],
  NULL,
  NOW(),
  NOW()
),

-- Article 6 : Huile ou vitrificateur ?
(
  'Huile ou vitrificateur : comment choisir ?',
  'huile-ou-vitrificateur-comment-choisir',
  'C''est LA grande question. On vous aide à choisir entre huile et vitrificateur pour votre parquet.',
  '## Le grand dilemme : huile ou vitrificateur ?

C''est la question que tout le monde se pose. Voici les réponses claires pour faire le bon choix.

---

## L''huile : l''aspect naturel

### Les avantages

- **Aspect mat et naturel** : On voit le bois tel qu''il est
- **Toucher authentique** : On sent le bois sous les pieds
- **Réparation facile** : En cas de rayure, on peut réparer juste la zone abîmée
- **Écologique** : Produits souvent plus naturels

### Les inconvénients

- **Entretien régulier** : Il faut ré-huiler 1 à 2 fois par an
- **Moins de protection** : Les taches pénètrent plus facilement
- **Application plus technique** : Demande un peu de savoir-faire

---

## Le vitrificateur : la protection maximale

### Les avantages

- **Protection totale** : Le bois est sous un film protecteur
- **Entretien facile** : Un simple nettoyage suffit
- **Résistant** : Idéal pour les zones à fort passage
- **Plusieurs aspects** : Mat, satiné ou brillant

### Les inconvénients

- **Aspect filmogène** : Certains trouvent ça moins naturel
- **Rénovation totale** : En cas d''usure, il faut tout reponcer
- **Sensation plastique** : On ne sent plus vraiment le bois

---

## Comment choisir ?

### Choisissez l''HUILE si...

- Vous aimez le bois brut, naturel
- Vous êtes prêt à entretenir régulièrement
- Vous préférez pouvoir réparer localement
- Vous avez une pièce à trafic modéré

### Choisissez le VITRIFICATEUR si...

- Vous voulez une protection maximale
- Vous préférez un entretien minimal
- Vous avez des zones à fort passage (entrée, couloir)
- Vous avez des enfants ou des animaux

---

## Le cas du chauffage au sol

Avec un chauffage au sol, l''huile est souvent recommandée. Pourquoi ?

Le bois "travaille" avec les variations de température. L''huile est plus souple et suit ces mouvements. Le vitrificateur, lui, peut se fissurer.

---

## Notre conseil

**En cas de doute, posez-vous cette question :**

> "Suis-je prêt à huiler mon parquet 1 à 2 fois par an ?"

- Oui → Huile  
- Non → Vitrificateur

Les deux solutions sont excellentes. C''est juste une question de mode de vie !',
  true,
  ARRAY['conseil'],
  NULL,
  NOW(),
  NOW()
),

-- Article 7 : Entretenir parquet vitrifié
(
  'Comment entretenir un parquet vitrifié ?',
  'entretenir-parquet-vitrifie',
  'Votre parquet est vitrifié ? Voici les bons gestes pour le garder beau pendant des années.',
  '## L''entretien d''un parquet vitrifié

Un parquet vitrifié est facile à entretenir. Quelques gestes simples suffisent pour le garder impeccable.

---

## Le nettoyage quotidien

### Ce qu''il faut faire

- **Balai** ou **aspirateur** régulièrement
- Les grains de sable et poussières rayent le vitrificateur

C''est tout pour le quotidien !

---

## Le nettoyage humide (1 fois par semaine)

### La bonne méthode

1. Diluez FINISH CARE dans l''eau tiède
2. Trempez une serpillière microfibre
3. Essorez bien (serpillière humide, pas mouillée !)
4. Passez dans le sens du bois

### Le bon produit

**FINISH CARE** existe en 2 versions :
- **FINISH CARE MAT** : Pour finitions mates et satinées
- **FINISH CARE** classique : Pour finitions brillantes

---

## Raviver l''éclat (2-4 fois par an)

Avec le temps, le vitrificateur peut ternir. Pour lui redonner son éclat :

1. Nettoyez le parquet
2. Appliquez FINISH CARE pur (non dilué)
3. Étalez au balai plat microfibre
4. Laissez sécher 30 minutes

Le parquet retrouve son brillant !

---

## Ce qu''il ne faut JAMAIS faire

### ❌ Produits interdits

- **Javel** : Attaque le vitrificateur
- **Alcool** : Fait des traces blanches
- **Produits abrasifs** : Rayent le film
- **Nettoyant multi-surfaces** : Laisse un film gras

### ❌ Erreurs à éviter

- Serpillière trop mouillée
- Nettoyeur vapeur (la chaleur décolle le vitrificateur)
- Laisser de l''eau stagner

---

## Astuces pratiques

### Contre les rayures

Mettez des patins feutre sous tous vos meubles. C''est la meilleure prévention !

### Contre la saleté

Placez des tapis aux entrées. 80% de la saleté vient de l''extérieur.

### Contre les talons

Les talons aiguilles sont les ennemis du parquet. Demandez à vos invités de les retirer !

---

## Quand faut-il revitrifier ?

Si malgré l''entretien, votre parquet est usé :

- Traces de passage visibles
- Vitrificateur qui pèle
- Bois apparent par endroits

Il est temps de poncer et revitrifier. Comptez environ 10-15 ans avant d''en arriver là si vous entretenez bien.',
  true,
  ARRAY['conseil'],
  NULL,
  NOW(),
  NOW()
),

-- Article 8 : Entretenir parquet huilé
(
  'Comment entretenir un parquet huilé ?',
  'entretenir-parquet-huile',
  'Votre parquet est huilé ? L''entretien est différent d''un parquet vitrifié. Voici le guide complet.',
  '## L''entretien d''un parquet huilé

Un parquet huilé demande un peu plus d''attention qu''un parquet vitrifié. Mais pas de panique, c''est simple !

---

## La différence avec le vitrifié

Un parquet huilé n''a pas de film protecteur sur le bois. L''huile pénètre dans les fibres. Ça veut dire :

- Le bois est plus "vivant"
- Il peut absorber les taches
- Il faut le nourrir régulièrement

---

## Le nettoyage quotidien

Comme pour un vitrifié :
- Balai ou aspirateur
- Enlever les poussières et grains qui rayent

---

## Le nettoyage humide

### Le bon produit : MAGIC OIL CARE

C''est un 2-en-1 génial :
- Il **nettoie** le parquet
- Il **nourrit** l''huile en même temps

### Comment l''utiliser ?

1. Diluez dans l''eau tiède selon les indications
2. Serpillière bien essorée
3. Passez dans le sens du bois

**Fréquence** : 1 fois par semaine

---

## Le soin annuel (1-2 fois par an)

C''est LE moment important pour un parquet huilé.

### Pourquoi ?

L''huile s''use avec le temps. Il faut la "recharger" pour que le bois reste protégé.

### Comment faire ?

1. Nettoyez bien le parquet
2. Appliquez MAGIC OIL CARE **pur** (non dilué)
3. Étalez au balai microfibre
4. Lustrez avec un chiffon sec
5. Laissez sécher 1 heure

C''est fait ! Votre parquet est nourri pour 6 mois.

---

## Réparer une tache ou une rayure

C''est le gros avantage de l''huile !

### Marche à suivre

1. **Poncez** localement (grain 120)
2. **Dépoussiérez** bien
3. **Appliquez** un peu d''huile (MAGIC OIL 1K ou 2K)
4. **Essuyez** l''excédent
5. **Laissez** sécher

La réparation est invisible !

### Pour les taches tenaces

- Tache d''eau : elle part souvent toute seule en séchant
- Tache grasse : poncer légèrement puis ré-huiler
- Tache noire (métal) : acide oxalique puis ré-huiler

---

## Ce qu''il ne faut JAMAIS faire

❌ **Cires et encaustiques** : Incompatibles avec l''huile  
❌ **Nettoyants classiques** : Décapent l''huile  
❌ **Trop d''eau** : Le bois gonfle  
❌ **Négliger l''entretien** : Le bois grise

---

## Récapitulatif simple

| Quand | Quoi | Avec quoi |
|---|---|---|
| Chaque jour | Dépoussiérer | Balai/aspirateur |
| Chaque semaine | Nettoyer | MAGIC OIL CARE dilué |
| 1-2 fois/an | Nourrir | MAGIC OIL CARE pur |
| Si besoin | Réparer | Ponçage local + huile |

C''est aussi simple que ça !',
  true,
  ARRAY['conseil'],
  NULL,
  NOW(),
  NOW()
);

-- Vérification
SELECT id, title, slug, tags, published FROM articles ORDER BY id;
