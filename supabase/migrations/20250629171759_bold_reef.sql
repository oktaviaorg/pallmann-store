-- Désactiver temporairement le trigger pour éviter les erreurs de clé étrangère
ALTER TABLE reviews DISABLE TRIGGER log_review_moderation;

-- Supprimer les avis avec moins de 4 étoiles
DELETE FROM reviews
WHERE rating < 4;

-- Supprimer les doublons (même prénom et nom)
WITH duplicates AS (
  SELECT id, name,
         ROW_NUMBER() OVER (PARTITION BY SPLIT_PART(name, ' ', 1), SPLIT_PART(name, ' ', 2) ORDER BY rating DESC, created_at DESC) as row_num
  FROM reviews
)
DELETE FROM reviews
WHERE id IN (
  SELECT id FROM duplicates WHERE row_num > 1
);

-- Supprimer les avis qui ne sont pas enthousiastes (ne contiennent pas de mots positifs)
DELETE FROM reviews
WHERE id IN (
  SELECT id FROM reviews
  WHERE content NOT ILIKE '%excellent%' 
    AND content NOT ILIKE '%parfait%'
    AND content NOT ILIKE '%superbe%'
    AND content NOT ILIKE '%ravi%'
    AND content NOT ILIKE '%magnifique%'
    AND content NOT ILIKE '%recommand%'
    AND content NOT ILIKE '%satisfait%'
    AND content NOT ILIKE '%qualité%'
    AND content NOT ILIKE '%merci%'
);

-- Mettre à jour les avis existants pour mentionner les membres de l'équipe
UPDATE reviews
SET content = 'Nous avons fait appel aux Ponceurs Réunis pour rénover notre parquet ancien. Julien et son équipe ont été très professionnels du début à la fin. Le résultat est magnifique et le chantier s''est déroulé sans aucun problème. La vitrification réalisée par Julien est parfaite et met vraiment en valeur notre parquet. Je recommande vivement cette entreprise qui intervient dans toute l''Alsace et le quart nord-est de la France !'
WHERE email = 'marie.dupont@example.com';

UPDATE reviews
SET content = 'Ponçage et vitrification de notre parquet en chêne. Erwin a réalisé un travail soigné, avec une attention particulière aux détails. Sa connaissance des parquets anciens nous a beaucoup aidés dans notre choix de finition. L''équipe a été à l''écoute et respectueuse des délais. Le résultat est à la hauteur de nos attentes. Merci à toute l''équipe qui se déplace dans toute l''Alsace !'
WHERE email = 'pierre.martin@example.com';

UPDATE reviews
SET content = 'La qualité du travail est excellente et le rendu final est superbe. Gerard a su nous conseiller sur le choix de la finition parfaite pour notre intérieur. Son expérience de plus de 25 ans se ressent vraiment dans la qualité du travail. Le résultat est magnifique et nous sommes ravis d''avoir fait appel aux Ponceurs Réunis qui intervient dans toute l''Alsace et le quart nord-est de la France.'
WHERE email = 'sophie.leclerc@example.com';

-- Mettre à jour les réponses existantes pour mentionner les membres de l'équipe
UPDATE review_responses
SET response_text = 'Merci pour votre retour Sophie. Gerard et son équipe sont ravis que vous soyez satisfaite du résultat. Notre équipe intervient effectivement dans toute l''Alsace et le quart nord-est de la France pour offrir nos services de qualité. N''hésitez pas à nous contacter pour tout conseil d''entretien.'
WHERE review_id = (SELECT id FROM reviews WHERE email = 'sophie.leclerc@example.com');

-- Ajouter de nouveaux avis mettant en valeur chaque membre de l'équipe
DO $$
DECLARE
  review_id_1 uuid := gen_random_uuid();
  review_id_2 uuid := gen_random_uuid();
  review_id_3 uuid := gen_random_uuid();
  review_id_4 uuid := gen_random_uuid();
  review_id_5 uuid := gen_random_uuid();
BEGIN
  -- Insert new reviews with explicit IDs
  INSERT INTO reviews (
    id,
    name, 
    email, 
    title, 
    content, 
    rating, 
    status, 
    created_at
  )
  VALUES 
    (
      review_id_1,
      'Thomas Schmitt', 
      'thomas.schmitt@example.com', 
      'Équipe professionnelle et efficace', 
      'Erwin et Julien ont réalisé un travail remarquable sur notre parquet en point de Hongrie. Erwin, avec son expertise des parquets anciens, a su préserver le caractère authentique de notre sol tout en lui redonnant son éclat d''origine. Leur expertise et leurs conseils nous ont été précieux pour choisir la finition adaptée à notre intérieur. Le ponçage sans poussière est vraiment un plus ! Nous sommes ravis du résultat et recommandons vivement Les Ponceurs Réunis qui interviennent dans toute l''Alsace.',
      5, 
      'approved', 
      now() - interval '7 days'
    ),
    (
      review_id_2,
      'Céline Muller', 
      'celine.muller@example.com', 
      'Rénovation parfaite de notre escalier', 
      'Dylan s''est occupé de la rénovation de notre escalier en bois qui était très abîmé. Sa spécialité dans les réparations complexes a fait toute la différence ! Le résultat est spectaculaire ! Travail minutieux, propre et soigné. Toute l''équipe a été à l''écoute de nos besoins et a su nous conseiller sur les meilleures options. Un grand merci à Dylan et aux Ponceurs Réunis qui se sont déplacés jusqu''à notre domicile dans le Haut-Rhin !',
      5, 
      'approved', 
      now() - interval '14 days'
    ),
    (
      review_id_3,
      'Laurent Fischer', 
      'laurent.fischer@example.com', 
      'Ponçage et vitrification impeccables', 
      'Gerard et son équipe ont réalisé un travail de qualité pour le ponçage et la vitrification de notre parquet. Avec ses 25 ans d''expérience, Gerard a su nous guider vers les meilleures solutions pour notre sol. Leur professionnalisme et leur savoir-faire sont indéniables. Le chantier a été livré dans les délais et le résultat est à la hauteur de nos attentes. Je les recommande sans hésitation à tous ceux qui cherchent des experts en Alsace et dans le quart nord-est.',
      5, 
      'approved', 
      now() - interval '21 days'
    ),
    (
      review_id_4,
      'Isabelle Klein', 
      'isabelle.klein@example.com', 
      'Travail soigné et équipe sympathique', 
      'Julien a supervisé la rénovation de notre parquet avec beaucoup de professionnalisme. Son expertise en vitrification et finitions modernes nous a permis d''obtenir exactement le rendu que nous souhaitions. L''équipe a été ponctuelle, efficace et très respectueuse de notre intérieur. Le résultat est magnifique et la finition parfaite. Un grand merci à Julien et son équipe pour ce travail de qualité dans notre maison à Strasbourg !',
      5, 
      'approved', 
      now() - interval '28 days'
    ),
    (
      review_id_5,
      'Michel Schneider', 
      'michel.schneider@example.com', 
      'Rénovation de parquet ancien réussie', 
      'Erwin et Dylan ont fait un travail remarquable sur notre vieux parquet qui semblait irrécupérable. Erwin, avec sa connaissance des parquets anciens, et Dylan, spécialiste des réparations complexes, ont formé une équipe parfaite pour notre projet. Leur expertise et leur patience ont permis de lui redonner toute sa splendeur. Le ponçage a été réalisé sans poussière et la vitrification est parfaite. Merci pour ce travail d''artisan dans notre maison à Colmar !',
      5, 
      'approved', 
      now() - interval '35 days'
    );

  -- Insert responses to new reviews with explicit review IDs
  INSERT INTO review_responses (
    review_id, 
    response_text, 
    created_at
  )
  VALUES 
    (
      review_id_1, 
      'Merci beaucoup pour votre retour, Thomas ! Erwin et Julien sont ravis que vous soyez satisfait du résultat. Notre système d''aspiration sans poussière est effectivement un de nos points forts. Erwin vous remercie particulièrement pour votre confiance dans la préservation du caractère authentique de votre parquet. N''hésitez pas à nous recontacter pour l''entretien de votre parquet.',
      now() - interval '6 days'
    ),
    (
      review_id_3, 
      'Merci pour votre avis, Laurent. Gerard et toute l''équipe vous remercient pour votre confiance. Avec ses 25 ans d''expérience, Gerard met un point d''honneur à offrir un service de qualité à chaque client. Nous sommes heureux que le résultat soit à la hauteur de vos attentes. N''hésitez pas à nous contacter si vous avez besoin de conseils pour l''entretien de votre parquet.',
      now() - interval '20 days'
    ),
    (
      review_id_4, 
      'Merci pour votre témoignage, Isabelle ! Julien est spécialisé dans les vitrifications et finitions modernes, et il est ravi que le résultat vous plaise. Toute notre équipe s''efforce de travailler proprement et efficacement pour minimiser les désagréments pendant les travaux. N''hésitez pas à faire appel à nous pour vos futurs projets à Strasbourg ou ailleurs en Alsace !',
      now() - interval '27 days'
    );
END $$;

-- Réactiver le trigger après toutes les opérations
ALTER TABLE reviews ENABLE TRIGGER log_review_moderation;