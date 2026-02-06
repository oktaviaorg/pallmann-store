/*
  # Create Parquet Pro Article

  1. New Content
    - Adds a new article about Parquet Pro services
    - Includes meta title, description, and content
    - Sets proper category and keywords
  2. Security
    - Uses existing RLS policies
*/

-- Insert new article
INSERT INTO articles (
  title,
  slug,
  content,
  excerpt,
  category_id,
  keywords,
  published,
  published_at,
  featured_image,
  meta_title,
  meta_description
)
VALUES (
  'Parquet Pro : pose, rénovation bois & qualité duo parqueteur',
  'parquet-pro-pose-renovation-bois-qualite-duo-parqueteur',
  '# Le parquet, un revêtement de sol indémodable

Matériau chaleureux, esthétique et durable, le parquet reste un revêtement de sol de choix pour les particuliers comme pour les professionnels.

## Pourquoi faire appel à un pro du parquet ?

Un vrai parquet pro, c''est un parquet posé selon les règles de l''art, avec un vrai sens du savoir-faire, de la qualité… et une promesse de durabilité.

## Choisir son parquet : bois, type, couleur

De la teinte au format, du parquet massif au contre-collé, chaque détail compte. Nos prestations sont adaptées à votre projet.

## Les types de parquet proposés par les pros

- **Parquet massif** : noblesse, longévité
- **Parquet contrecollé** : adaptable, moderne
- **Parquet flottant** : pratique et rapide à poser
- **Parquet point de Hongrie** : chic à la française

## Zoom : le parquet point de Hongrie

L''élégance à l''état pur : la pose de parquet bois en chevrons séduit de plus en plus. Disponible en chêne, il apporte un cachet unique à votre loft ou intérieur haussmannien.

## Une pose professionnelle pour un rendu impeccable

Un parquet, même de qualité, mal posé devient un problème. Nous garantissons une mise en œuvre conforme aux normes et adaptée à chaque support.

## Une finition adaptée à chaque usage

Huilage, vitrification, vernis ou brossage : le choix de la finition est crucial pour allier style et résistance au passage.

## Entretien et longévité du parquet

Un bon entretien, ce n''est pas une corvée : c''est un investissement dans le temps. Et les pros vous donnent les bons conseils !

## Le parquet en bois : durable et naturel

Le bois massif, s''il est bien entretenu, traverse les décennies. Il vieillit avec élégance et peut être poncé, rénové, revalorisé.

## Parquet pro : pour quels types de lieux ?

Nous travaillons pour :

- Appartements & maisons
- Commerces, hôtels, restaurants
- Espaces tertiaires, bureaux
- Salles d''exposition et lofts pro

## Vente et pose : un service complet

Nous assurons la vente et pose de produits haut de gamme, avec accompagnement personnalisé.

## PVC et parquet : un mariage possible ?

Oui. Un sol PVC peut cohabiter avec un parquet bien choisi, notamment pour des usages mixtes. Notre équipe propose aussi du revêtement de sol PVC pour les zones techniques.

## Parquet Pro : une entreprise certifiée

Nos équipes sont formées, certifiées Qualibat, et habituées à travailler dans les environnements exigeants.

## Des chantiers dans toute la France

Notre activité s''étend sur plusieurs régions, avec des chantiers à Paris, Lyon, Strasbourg, et partout où le bois a sa place.

## Pourquoi nous faire confiance ?

- Plus de 15 ans d''expérience
- Des prestations garanties
- Des produits sélectionnés pour leur qualité
- Une vraie proximité humaine

## Focus technique : ponçage et huilage

Nos équipes assurent aussi la rénovation avec ponçage, huilage, ou vitrification de vos parquets anciens.

## Parquet pro pour professionnels

Architectes, décorateurs, promoteurs : bénéficiez de solutions adaptées à vos volumes et contraintes.

## Un vaste choix de lames, teintes, largeurs

Le choix est vaste : parquet en bois clair ou foncé, large ou étroit, aspect brut ou brossé. Nous conseillons selon le style recherché.

## Berry, chêne, bambou : des essences au top

Des classiques comme le chêne jusqu''au bambou compressé ou aux lames design Berry, nos produits allient esthétique et technique.

## Notre site web : source d''infos et de devis

Sur notre site, vous trouverez :

- Nos gammes de parquets
- Des photos de réalisations
- Un simulateur de devis
- Un espace actualités contact complet

## Cookies, consentement & expérience utilisateur

Oui, nous utilisons des cookies pour permettre une meilleure navigation. Votre consentement reste libre et éclairé, conformément à la loi.

## En résumé :

✅ Parquet pro, c''est l''alliance du bois, de l''esthétique et du service professionnel
✅ Pose, rénovation, entretien, ponçage : tout est possible
✅ Solutions sur-mesure pour particuliers et professionnels
✅ Demandez un devis rapide sur notre site web',
  'Découvrez nos services de pose et rénovation de parquet professionnel. Parquet massif, contrecollé, point de Hongrie... Nos experts vous accompagnent dans votre projet avec un savoir-faire reconnu et des finitions de qualité.',
  (SELECT id FROM categories WHERE slug = 'services' LIMIT 1),
  ARRAY['parquet pro', 'pose parquet', 'rénovation parquet', 'parquet bois', 'parquet point de hongrie', 'parquet massif', 'parquet contrecollé', 'parquet flottant', 'vitrification', 'huilage'],
  true,
  NOW(),
  'https://mjuzyqhxifyvebtnlrra.supabase.co/storage/v1/object/public/lpr2//Erwin%20et%20julien%20Avatar%20Lesponceurs%20reunis.png',
  'Parquet Pro : pose, rénovation bois & qualité duo parqueteur',
  'Parquet Pro : vente et pose de parquet bois, flottant, contrecollé. Pose pro, finitions haut de gamme. Demandez un devis sur notre site web.'
);