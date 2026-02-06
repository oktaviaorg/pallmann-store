/*
  # Create article about parquet in castles

  1. New Content
    - Add a new article about parquet and wooden floors in castles
    - Link to existing article about Château Haut-Koenigsbourg
    - Include proper metadata and formatting
*/

-- First, ensure the 'Patrimoine' category exists
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM categories WHERE slug = 'patrimoine') THEN
    INSERT INTO categories (name, slug, description)
    VALUES ('Patrimoine', 'patrimoine', 'Articles sur le patrimoine architectural et historique');
  END IF;
END $$;

-- Insert the new article
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
  'Parquets et planchers bois dans les châteaux',
  'parquets-planchers-bois-chateaux-moyen-age-aujourd-hui',
  'Parquets, planchers bois et traitements du Moyen Âge à aujourd''hui : une histoire de sols vivants

## 1. Introduction : marcher sur l''histoire

Quand on entre dans un château comme le [Haut-Koenigsbourg](https://ponceur-parquet.fr/blog/chateau-haut-koenigsbourg-histoire-fascinante), on lève souvent les yeux vers les poutres ou les voûtes… mais le plancher sous nos pieds mérite tout autant d''attention. Du simple sol en terre battue au parquet point de Hongrie, l''histoire des revêtements de sol bois raconte autant que les pierres.

## 2. Les sols du Moyen Âge : terre, planches et paille

Au XIIe siècle, dans les châteaux comme dans les maisons modestes, on ne parle pas encore de parquet. Le sol est souvent :

- En terre battue dans les zones de passage
- Recouvert de paille, de joncs, parfois changés chaque semaine (d''où l''expression "faire les jonchées")
- En planches de bois brut, posées sur lambourdes dans les pièces nobles

## 3. Premiers planchers médiévaux : du chêne brut

Les seigneurs et hauts dignitaires ont droit à des planchers bois en chêne, taillés sur place. Ces bois sont rustiques, non rabotés, et souvent simplement cloués ou tenus par des chevilles en bois.

## 4. Le rôle des essences locales

Au Moyen Âge, pas de bois exotique. On travaille ce que l''on trouve :

- Chêne : solide, idéal pour les zones de passage
- Hêtre : plus clair, mais moins durable
- Sapin et mélèze : pour les étages ou les greniers
- Châtaignier ou orme : plus rares, mais présents dans certaines régions

## 5. Le parquet Renaissance : l''apparition du décor

À partir du XVe siècle, les châteaux commencent à intégrer des sols bois décoratifs :

- Planchers à motif, point de Hongrie
- Lames polies et clouées
- Apparition de l''entretien à base de cire d''abeille

## 6. Louis XIV, le parquet en majesté

Au château de Versailles, le parquet devient un art. Les boiseries au sol sont en marqueterie, les essences sont choisies pour le contraste, et le ponçage manuel devient une habitude avant encaustiquage.

## 7. Le XIXe siècle : démocratisation du parquet

Avec l''industrialisation, les parquets massifs à rainure et languette se généralisent :

- Pose clouée sur lambourdes
- Utilisation de bois plus variés (noyer, érable)
- Apparition du parquet flottant dans les années 1930 (pose non clouée)

## 8. Les parquets du Haut-Koenigsbourg : entre histoire et reconstitution

Lors de la reconstruction du château par Bodo Ebhardt, les sols bois sont pensés pour ressembler à ceux d''un château médiéval… mais avec des techniques de la Belle Époque :

- Planchers cloués en chêne
- Pose en planches larges, parfois brutes
- Traitement à la cire, sans vitrification moderne

## 9. Le XXe siècle : arrivée du vitrificateur

Dans les années 1950-60, la vitrification remplace peu à peu la cire :

- Application d''un vitrificateur sur bois poncé
- Résistance accrue à l''eau, aux rayures
- Entretien plus facile (mais moins "authentique")

## 10. Et aujourd''hui ? Le grand retour du bois naturel

Les tendances récentes montrent un retour :

- Aux huiles naturelles
- Aux produits biosourcés
- À la restauration de planchers anciens à la main

## 11. Techniques modernes de rénovation

Les maîtres ponceurs d''aujourd''hui utilisent :

- Des machines à poncer sans poussière
- Des huiles à base de lin, tournesol ou carnauba
- Des traitements thermiques (brosse + teinte + huile)

## 12. Comment traiter un parquet ancien dans un château ?

On suit souvent ces étapes :

- Repérage des zones fragiles
- Numérotation éventuelle des lames
- Ponçage doux
- Remplacement des pièces irrécupérables
- Huilage ou encaustique naturel
- Entretien régulier à sec

## 13. Le parquet, patrimoine vivant

À l''image des murs et des toitures, un parquet raconte. Il grince, vit, évolue. En le restaurer, on rend hommage aux gestes des anciens tout en adaptant aux exigences modernes.

## 14. Essences rares et bois oubliés

Dans certains sites classés, on retrouve :

- Orme, aujourd''hui introuvable
- Châtaignier usiné à la main
- Chêne noirci au fil des siècles

Autant de défis pour les restaurateurs du XXIe siècle.

## 15. Le cas des greniers et planchers de service

Dans les parties non décorées, on retrouve souvent des planchers en sapin brut, non rabotés, avec des trous de clous et des marques de fabrication visibles.

## 16. Le parquet flottant : progrès ou régression ?

Certains professionnels le boudent pour sa faible durabilité. Mais bien posé, un revêtement de sol flottant peut être esthétique, économique, et respectueux de l''existant.

## 17. Le bois dans les sites classés : ce que dit la loi

La restauration d''un sol ancien en bois dans un bâtiment classé doit suivre certaines normes :

- Pas de vitrification moderne sans autorisation
- Essence d''origine privilégiée
- Techniques compatibles avec la structure du bâti

## 18. Et demain ? Les tendances 2025

- Revalorisation du parquet point de Hongrie
- Pose de parquet contrecollé haut de gamme
- Traitement à l''huile dure écologique
- Retour du ponçage artisanal pour les planchers anciens

## 19. Pourquoi faire appel à un professionnel du patrimoine ?

Parce que chaque bois ancien a ses secrets, ses fentes, ses cernes. Un bon artisan lit le bois comme un livre. Chez Les Ponceurs Réunis, ce savoir-faire est transmis de génération en génération.

## 20. Envie d''un devis pour restaurer un vieux plancher ?

Retrouvez tous nos services sur lesponceursreunis.fr ou utilisez notre simulateur en ligne sur ponceur-parquet.fr. Pour vos parquets historiques comme vos sols bois modernes, on saura faire la différence.

> 💡 Astuce : Pour entretenir un parquet ancien, privilégiez toujours un balayage régulier et un passage de serpillière légèrement humide avec quelques gouttes de savon noir. Évitez l''eau en abondance qui pourrait faire gonfler le bois.

> ⚠️ Attention : Les parquets des châteaux et bâtiments historiques sont souvent classés. Toute intervention doit être validée par les Monuments Historiques ou les Bâtiments de France.
',
  'De la terre battue aux parquets vitrifiés, découvrez l''évolution fascinante des sols en bois dans les châteaux à travers les siècles, du Moyen Âge à nos jours.',
  (SELECT id FROM categories WHERE slug = 'patrimoine'),
  ARRAY['parquet château', 'plancher bois historique', 'restauration parquet ancien', 'sols médiévaux', 'Haut-Koenigsbourg'],
  true,
  NOW(),
  'https://mjuzyqhxifyvebtnlrra.supabase.co/storage/v1/object/public/lpr2//chateau%20du%20haut-koenisbourg%20parquet%20les%20ponceurs%20reunis.png',
  'Parquet et planchers bois : du Moyen Âge à aujourd''hui',
  'De la terre battue aux parquets vitrifiés, découvrez l''évolution des sols bois dans les châteaux et leur traitement à travers les siècles.'
);