/*
  # Create Château Haut-Koenigsbourg Article

  1. New Content
    - Add a new article about Château Haut-Koenigsbourg to the articles table
    - Set proper metadata, category, and keywords
*/

-- First, let's make sure we have a category for historical sites
INSERT INTO categories (name, slug, description)
SELECT 'Patrimoine', 'patrimoine', 'Articles sur le patrimoine alsacien et les sites historiques'
WHERE NOT EXISTS (
  SELECT 1 FROM categories WHERE slug = 'patrimoine'
);

-- Now insert the article
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
  'Château Haut-Koenigsbourg : son histoire fascinante',
  'chateau-haut-koenigsbourg-histoire-fascinante',
  'Château du Haut-Koenigsbourg : histoire d''une forteresse alsacienne

1. Une silhouette emblématique dans le paysage alsacien
Perché à plus de 750 mètres d''altitude, le château du Haut-Koenigsbourg domine la plaine d''Alsace. Visible à des kilomètres à la ronde, il attire chaque année près de 500 000 visiteurs, curieux de découvrir son histoire et son architecture imposante.

2. Un site stratégique depuis le Moyen Âge
Dès le XIIe siècle, la colline du Staufen servait de poste de guet. Les empereurs Hohenstaufen y voient une position idéale pour contrôler les routes du vin, du blé et du sel. En 1147, le premier château est construit : c''est la naissance du Haut-Koenigsbourg.

3. Les origines impériales du château
Appartenant aux Hohenstaufen, le château devient rapidement un symbole de puissance impériale. Il subit déjà plusieurs attaques mais reste debout… jusqu''à la guerre des Rustauds.

4. Les multiples destructions et reconstructions
Incendié, abandonné, pillé… Le Haut-Koenigsbourg a connu bien des vies. Il est rasé en 1462, reconstruit au XVe siècle, puis détruit à nouveau par les Suédois pendant la guerre de Trente Ans, en 1633.

5. Trois siècles d''abandon
De 1633 à la fin du XIXe siècle, le château tombe en ruine. Seuls quelques murs subsistent, perdus dans la forêt. Les pierres sont même réutilisées par les habitants des villages alentour.

6. L''intervention de l''empereur Guillaume II
En 1899, le château est offert à l''empereur allemand Guillaume II par la ville de Sélestat. Il décide de le reconstruire à l''identique pour affirmer la puissance allemande en Alsace annexée.

7. L''architecte Bodo Ebhardt, un visionnaire
Guillaume II confie la reconstruction à Bodo Ebhardt, historien passionné de châteaux médiévaux. Celui-ci s''appuie sur des plans d''archives, fouilles et gravures pour recréer le château dans l''esprit du XVe siècle.

8. Une restauration aussi fidèle que controversée
Si le travail d''Ebhardt est salué pour sa précision, certains historiens lui reprochent une vision « idéalisée » du Moyen Âge. Le Haut-Koenigsbourg devient ainsi un mélange d''histoire et de représentation impériale.

9. Un chantier titanesque
Les travaux durent près de 8 ans. Des centaines d''ouvriers, tailleurs de pierre, charpentiers, forgerons redonnent vie au château. La restauration s''achève en 1908.

10. Un château témoin de l''histoire franco-allemande
De la querelle impériale médiévale à la propagande allemande du XXe siècle, le Haut-Koenigsbourg cristallise l''histoire mouvementée de l''Alsace.

11. Le Haut-Koenigsbourg pendant les guerres mondiales
Sous administration allemande jusqu''en 1919, le château devient français après la Première Guerre mondiale. Il est classé monument historique en 1993, après avoir été géré par l''État pendant des décennies.

12. Une gestion départementale exemplaire
Depuis 2007, c''est le département du Bas-Rhin qui assure la gestion du site. Il y développe une politique culturelle ambitieuse mêlant conservation, médiation et valorisation du patrimoine.

13. Une visite immersive dans le temps
Le parcours de visite vous transporte dans l''univers d''un château fort du XVe siècle : pont-levis, herse, chemin de ronde, salle d''armes, donjon… Rien n''est oublié.

14. Une scénographie historique soignée
Chaque pièce est meublée avec soin : coffres, bancs, tapisseries et armes anciennes vous plongent dans l''ambiance médiévale. La reconstitution s''appuie sur les usages réels du château à la fin du Moyen Âge.

15. Le donjon : vue imprenable sur la plaine d''Alsace
Du haut du donjon, la vue s''étend jusqu''à la Forêt-Noire et les Vosges. C''est ici que l''on comprend le choix stratégique du site.

16. Le Haut-Koenigsbourg et le cinéma
Le château a servi de décor à de nombreux films historiques et documentaires. Sa silhouette iconique est parfois utilisée comme inspiration dans les jeux vidéo et films d''animation.

17. Un lieu de mémoire mais aussi d''animation
Aujourd''hui, le château accueille des expositions temporaires, des spectacles de fauconnerie, des visites nocturnes et même des concerts. Il s''adresse autant aux familles qu''aux passionnés d''histoire.

18. Un moteur pour le tourisme local
Le Haut-Koenigsbourg est l''un des monuments les plus visités du Grand Est. Il soutient l''économie des villages alentours (Kintzheim, Orschwiller, Sélestat) en générant hébergement, restauration et activités culturelles.

19. Le château en chiffres
270 000 pierres taillées lors de la restauration

100+ armes médiévales exposées

2 km de remparts

500 000 visiteurs/an

757 m d''altitude

20. Comment visiter le château du Haut-Koenigsbourg ?
Le site est ouvert presque toute l''année, sauf en janvier. Des visites guidées sont proposées, et l''audioguide permet une découverte autonome.

21. Informations pratiques et accès
🚗 Accès : à 25 min de Sélestat, par la D159
🕐 Durée moyenne de visite : 1h30
🎟️ Tarifs : 9 € adulte / 5 € enfant / Gratuit -6 ans
🌐 Site officiel : www.haut-koenigsbourg.fr',
  'Découvrez l''histoire fascinante du château du Haut-Koenigsbourg en Alsace, de ses origines médiévales à sa restauration par l''empereur Guillaume II. Un voyage à travers les siècles dans l''une des forteresses les plus emblématiques de France.',
  (SELECT id FROM categories WHERE slug = 'patrimoine'),
  ARRAY['château Haut-Koenigsbourg', 'Alsace', 'patrimoine', 'tourisme', 'architecture', 'Guillaume II', 'Bodo Ebhardt', 'restauration', 'Moyen Âge', 'monument historique', 'visites guidées', 'Sélestat', 'Orschwiller', 'Kintzheim'],
  true,
  NOW(),
  'https://mjuzyqhxifyvebtnlrra.supabase.co/storage/v1/object/public/lpr2//Chateau%20du%20Haut-Koenigsbourg%20histoire.png',
  'Château Haut-Koenigsbourg : son histoire fascinante à travers les siècles',
  'Découvrez l''histoire complète du château du Haut-Koenigsbourg en Alsace : des origines médiévales à sa restauration impériale par Guillaume II.'
);