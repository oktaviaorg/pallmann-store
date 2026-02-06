/*
  # Create article about Parc zoologique de Mulhouse

  1. New Content
    - Add a new article about the Mulhouse Zoo with internal links
    - Include information about parquet renovation in the zoo
    - Add proper SEO metadata and featured images
  2. Categories
    - Ensure 'Patrimoine' category exists
  3. Internal Linking
    - Add links to other articles for better SEO
*/

-- First, make sure the 'Patrimoine' category exists
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM categories WHERE slug = 'patrimoine') THEN
    INSERT INTO categories (name, slug, description)
    VALUES ('Patrimoine', 'patrimoine', 'Articles sur le patrimoine alsacien et les rénovations de parquet dans des lieux historiques');
  END IF;
END
$$;

-- Get the category ID
WITH category_id AS (
  SELECT id FROM categories WHERE slug = 'patrimoine'
)

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
  'Parc zoologique de Mulhouse : nature, savoir et patrimoine',
  'parc-zoologique-mulhouse-nature-savoir-patrimoine',
  '# Parc zoologique de Mulhouse : entre biodiversité, patrimoine et éducation

## 1. Un joyau zoologique au cœur de l''Alsace
Créé en 1868, le Parc zoologique et botanique de Mulhouse est l''un des plus anciens zoos de France. Niché dans un parc de 25 hectares, il allie préservation des espèces, promenade botanique et animations familiales.

## 2. Une histoire centenaire
Ce parc municipal est né de la volonté des autorités mulhousiennes de créer un lieu éducatif et récréatif. Depuis plus de 150 ans, il n''a cessé d''évoluer pour s''adapter aux enjeux du bien-être animal et de la conservation.

## 3. Entre zoo et jardin botanique
Outre ses 1200 animaux, le parc abrite plus de 3000 espèces végétales. Il est à la fois un espace zoologique, un jardin botanique, et un site de sensibilisation à l''environnement.

## 4. Une visite adaptée à tous les publics
Que vous soyez en famille, enseignant, professionnel du tourisme ou simple curieux, le zoo de Mulhouse s''adresse à tous. Il propose des parcours pédagogiques, des animations et une scénographie soignée.

## 5. Un parc engagé dans la conservation
Le zoo est membre de l''EAZA (Association européenne des zoos et aquariums) et participe à plus de 90 programmes d''élevage (EEP) pour les espèces menacées.

## 6. 170 espèces animales à découvrir
Des lions de l''Atlas aux pandas roux, en passant par les manchots, les takins, les lémuriens et les ours blancs, le parc offre une diversité exceptionnelle d''animaux du monde entier.

## 7. Les grands carnivores du parc
Le lion de l''Atlas, disparu à l''état sauvage, est l''un des symboles du zoo. On peut également observer tigres de Sibérie, panthères de l''Amour ou encore loups à crinière.

## 8. L''espace Arctique : immersion dans le Grand Nord
L''enclos des ours polaires, rénové en 2020, est un modèle d''environnement immersif : bassin profond, espace d''ombre, système de régulation thermique…

## 9. Les espèces rares et menacées
Le parc abrite plusieurs espèces en danger critique d''extinction, comme le gibbon à favoris blancs, le tamarin lion doré ou le takin du Sichuan, tous élevés dans des conditions optimales.

## 10. Une pédagogie au cœur du projet
Des panneaux explicatifs, des visites guidées, des ateliers scolaires… Le Parc zoologique de Mulhouse place l''éducation à l''environnement au centre de sa mission.

## 11. Le jardin botanique : un autre voyage
Dans les allées fleuries, vous croiserez cèdres, érables japonais, rosiers anciens et arbustes rares. Le jardin est un lieu apaisant, apprécié des passionnés de botanique comme des flâneurs.

## 12. Une collection végétale labellisée
Le parc détient plusieurs collections végétales reconnues par le CCVS (Conservatoire des collections végétales spécialisées), comme les pivoines, les hêtres tortueux et les hydrangeas.

## 13. Le parc en hiver : magique et vivant
Contrairement à bien des zoos, celui de Mulhouse reste ouvert toute l''année. En hiver, les animaux s''adaptent, les paysages se transforment et les visiteurs profitent d''un cadre calme et féérique.

## 14. Des enclos conçus pour le bien-être animal
Le parc a réaménagé la plupart de ses installations :

- Sols naturels
- Bassins d''eau adaptés
- Zones d''ombre et d''enrichissement

Objectif : répondre aux standards éthiques les plus récents.

## 15. Accessibilité et services pour tous
Le parc est accessible aux personnes à mobilité réduite, propose des espaces de restauration, une boutique, des aires de pique-nique, et même des voitures électriques pour le transport interne.

## 16. Le zoo de Mulhouse, un acteur touristique majeur
Avec plus de 400 000 visiteurs annuels, il est l''un des sites les plus fréquentés du Haut-Rhin. Il participe activement à l''attractivité de Mulhouse et de l''Alsace.

## 17. Un outil de développement pour la ville
Le parc est géré par la Ville de Mulhouse. Il est soutenu par des partenariats publics et privés, et contribue à la notoriété de la ville dans le tourisme vert et éducatif.

## 18. Des événements toute l''année
Spectacles, visites nocturnes, fêtes de la nature, Halloween au zoo, Noël féerique… Chaque saison apporte son lot d''animations pour petits et grands.

## 19. Une politique tarifaire attractive
Le tarif adulte est d''environ 16 €, l''enfant entre 10 et 12 €, avec des formules famille et des abonnements annuels avantageux.

## 20. Comment venir au zoo de Mulhouse ?
📍 Adresse : 111 avenue de la 1ère Division Blindée
🚗 Accès facile depuis l''A36 ou le centre-ville
🚊 Tram ligne 1 – arrêt « Zoo »
🅿️ Parking gratuit à proximité

## 21. En conclusion : un zoo pour apprendre, s''émerveiller et agir
Le Parc zoologique et botanique de Mulhouse n''est pas qu''un lieu de loisir : c''est un site vivant, porteur de sens, au croisement de la science, du patrimoine, et de la sensibilisation écologique. Un incontournable alsacien.

## Une rénovation discrète mais remarquable dans le parc

> 💡 Astuce : Si vous êtes intéressé par le patrimoine alsacien, découvrez également notre article sur [l''histoire fascinante du Château du Haut-Koenigsbourg](https://ponceur-parquet.fr/blog/chateau-haut-koenigsbourg-histoire-fascinante), un autre joyau de notre région.

Le Parc zoologique de Mulhouse, c''est aussi un site patrimonial vivant où certains bâtiments historiques sont régulièrement rénovés. L''un de ces chantiers a récemment concerné un pavillon situé à côté de l''Auberge du Zoo, autrefois utilisé comme logement de service.

Notre équipe a eu le plaisir d''intervenir pour rénover un magnifique parquet ancien en chêne, posé en pointe de Hongrie. Ce sol, fortement usé par le temps et les passages, a fait l''objet d''un ponçage soigné, suivi d''un huilage traditionnel pour lui redonner toute sa chaleur et sa noblesse.

> ⚠️ Attention : La rénovation de parquets dans des bâtiments historiques nécessite une expertise particulière. Comme nous l''expliquons dans notre article sur [les parquets et planchers bois dans les châteaux](https://ponceur-parquet.fr/blog/parquets-planchers-bois-chateaux-moyen-age-aujourd-hui), il est essentiel de respecter les techniques traditionnelles tout en apportant les améliorations modernes nécessaires.

Ce type de chantier mêle savoir-faire technique et respect du caractère du lieu, avec pour objectif de préserver l''âme des bâtiments tout en les rendant fonctionnels pour leur usage futur — ici, un espace de réception pour les événements du parc.

Si vous êtes responsable d''un établissement recevant du public et que vous souhaitez rénover vos parquets, n''hésitez pas à consulter notre article sur [la rénovation de parquet au Casino de Ribeauvillé](https://ponceur-parquet.fr/blog/parquet-renovation-casino-ribeauville-elegance-durabilite-silence), qui présente des solutions adaptées aux lieux de prestige à fort passage.

![Rénovation de parquet au Parc zoologique de Mulhouse](https://mjuzyqhxifyvebtnlrra.supabase.co/storage/v1/object/public/lpr2//parc%20zoologique%20de%20mulhouse%20renovation%20parquet.png)

*Rénovation du parquet en pointe de Hongrie dans un pavillon historique du zoo*

![Auberge du Zoo de Mulhouse après rénovation](https://mjuzyqhxifyvebtnlrra.supabase.co/storage/v1/object/public/lpr2//renovation%20auberge%20du%20zoo%20mulhouse%20parquet%20.png)

*Le résultat final après ponçage et huilage du parquet à l''Auberge du Zoo*',
  'Découvrez le Parc zoologique de Mulhouse, sa riche biodiversité, son histoire et la rénovation d''un magnifique parquet en chêne en pointe de Hongrie dans l''un de ses bâtiments historiques.',
  (SELECT id FROM category_id),
  ARRAY['zoo mulhouse', 'parquet historique', 'rénovation parquet', 'patrimoine alsacien', 'pointe de Hongrie', 'huilage parquet', 'bâtiment historique'],
  true,
  NOW(),
  'https://mjuzyqhxifyvebtnlrra.supabase.co/storage/v1/object/public/lpr2//parc%20zoologique%20de%20mulhouse%20renovation%20parquet.png',
  'Parc zoologique de Mulhouse : nature, savoir et patrimoine',
  'Découvrez le zoo de Mulhouse, sa biodiversité, son histoire… et la rénovation d''un parquet en chêne en pointe de Hongrie dans un bâtiment du parc.'
);