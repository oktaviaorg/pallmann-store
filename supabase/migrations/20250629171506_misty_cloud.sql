-- Disable the trigger temporarily to avoid foreign key constraint errors
ALTER TABLE reviews DISABLE TRIGGER log_review_moderation;

-- Supprimer les avis en double (même email et contenu similaire)
DELETE FROM reviews
WHERE id IN (
  SELECT r1.id
  FROM reviews r1
  JOIN reviews r2 ON r1.email = r2.email AND r1.id != r2.id
  WHERE r1.created_at > r2.created_at
);

-- Mettre à jour les avis existants pour mentionner les membres de l'équipe
UPDATE reviews
SET content = 'Nous avons fait appel aux Ponceurs Réunis pour rénover notre parquet ancien. Julien et son équipe ont été très professionnels du début à la fin. Le résultat est magnifique et le chantier s''est déroulé sans aucun problème. La vitrification réalisée par Julien est parfaite et met vraiment en valeur notre parquet. Je recommande vivement !'
WHERE email = 'marie.dupont@example.com';

UPDATE reviews
SET content = 'Ponçage et vitrification de notre parquet en chêne. Erwin a réalisé un travail soigné, avec une attention particulière aux détails. Sa connaissance des parquets anciens nous a beaucoup aidés dans notre choix de finition. L''équipe a été à l''écoute et respectueuse des délais. Le résultat est à la hauteur de nos attentes. Merci !'
WHERE email = 'pierre.martin@example.com';

UPDATE reviews
SET content = 'La qualité du travail est excellente et le rendu final est superbe. Gerard a su nous conseiller sur le choix de la finition parfaite pour notre intérieur. Son expérience de plus de 25 ans se ressent vraiment dans la qualité du travail. Seul bémol : les délais ont été un peu plus longs que prévu. Cela dit, le résultat en valait la peine.'
WHERE email = 'sophie.leclerc@example.com';

UPDATE reviews
SET content = 'Le ponçage a été bien réalisé par Dylan, qui a fait preuve d''un grand professionnalisme. Sa spécialité dans les réparations complexes nous a permis de sauver plusieurs lames que nous pensions devoir remplacer. J''aurais aimé plus de conseils sur l''entretien du parquet, mais l''équipe était néanmoins professionnelle et ponctuelle.'
WHERE email = 'jean.moreau@example.com';

-- Mettre à jour les réponses existantes pour mentionner les membres de l'équipe
UPDATE review_responses
SET response_text = 'Merci pour votre retour Sophie. Nous sommes désolés pour le délai supplémentaire. Gerard et son équipe travaillent constamment à améliorer notre planification pour respecter au mieux les délais annoncés. N''hésitez pas à nous contacter pour tout conseil d''entretien.'
WHERE review_id = (SELECT id FROM reviews WHERE email = 'sophie.leclerc@example.com');

UPDATE review_responses
SET response_text = 'Merci pour votre avis Jean. Dylan et toute l''équipe prennent note de votre remarque concernant les conseils d''entretien. Nous allons renforcer cet aspect de notre service. N''hésitez pas à nous contacter si vous avez des questions sur l''entretien de votre parquet.'
WHERE review_id = (SELECT id FROM reviews WHERE email = 'jean.moreau@example.com');

-- Ajouter de nouveaux avis mettant en valeur chaque membre de l'équipe
DO $$
DECLARE
  review_id_1 uuid := gen_random_uuid();
  review_id_2 uuid := gen_random_uuid();
  review_id_3 uuid := gen_random_uuid();
  review_id_4 uuid := gen_random_uuid();
  review_id_5 uuid := gen_random_uuid();
  review_id_6 uuid := gen_random_uuid();
  review_id_7 uuid := gen_random_uuid();
  review_id_8 uuid := gen_random_uuid();
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
      'Erwin et Julien ont réalisé un travail remarquable sur notre parquet en point de Hongrie. Erwin, avec son expertise des parquets anciens, a su préserver le caractère authentique de notre sol tout en lui redonnant son éclat d''origine. Leur expertise et leurs conseils nous ont été précieux pour choisir la finition adaptée à notre intérieur. Le ponçage sans poussière est vraiment un plus ! Nous sommes ravis du résultat et recommandons vivement Les Ponceurs Réunis.',
      5, 
      'approved', 
      now() - interval '7 days'
    ),
    (
      review_id_2,
      'Céline Muller', 
      'celine.muller@example.com', 
      'Rénovation parfaite de notre escalier', 
      'Dylan s''est occupé de la rénovation de notre escalier en bois qui était très abîmé. Sa spécialité dans les réparations complexes a fait toute la différence ! Le résultat est spectaculaire ! Travail minutieux, propre et soigné. Toute l''équipe a été à l''écoute de nos besoins et a su nous conseiller sur les meilleures options. Un grand merci à Dylan et aux Ponceurs Réunis !',
      5, 
      'approved', 
      now() - interval '14 days'
    ),
    (
      review_id_3,
      'Laurent Fischer', 
      'laurent.fischer@example.com', 
      'Ponçage et vitrification impeccables', 
      'Gerard et son équipe ont réalisé un travail de qualité pour le ponçage et la vitrification de notre parquet. Avec ses 25 ans d''expérience, Gerard a su nous guider vers les meilleures solutions pour notre sol. Leur professionnalisme et leur savoir-faire sont indéniables. Le chantier a été livré dans les délais et le résultat est à la hauteur de nos attentes. Je les recommande sans hésitation.',
      4, 
      'approved', 
      now() - interval '21 days'
    ),
    (
      review_id_4,
      'Isabelle Klein', 
      'isabelle.klein@example.com', 
      'Travail soigné et équipe sympathique', 
      'Julien a supervisé la rénovation de notre parquet avec beaucoup de professionnalisme. Son expertise en vitrification et finitions modernes nous a permis d''obtenir exactement le rendu que nous souhaitions. L''équipe a été ponctuelle, efficace et très respectueuse de notre intérieur. Le résultat est magnifique et la finition parfaite. Un grand merci à Julien et son équipe pour ce travail de qualité !',
      5, 
      'approved', 
      now() - interval '28 days'
    ),
    (
      review_id_5,
      'Michel Schneider', 
      'michel.schneider@example.com', 
      'Rénovation de parquet ancien réussie', 
      'Erwin et Dylan ont fait un travail remarquable sur notre vieux parquet qui semblait irrécupérable. Erwin, avec sa connaissance des parquets anciens, et Dylan, spécialiste des réparations complexes, ont formé une équipe parfaite pour notre projet. Leur expertise et leur patience ont permis de lui redonner toute sa splendeur. Le ponçage a été réalisé sans poussière et la vitrification est parfaite. Merci pour ce travail d''artisan !',
      5, 
      'approved', 
      now() - interval '35 days'
    ),
    (
      review_id_6,
      'Anne Hoffmann', 
      'anne.hoffmann@example.com', 
      'Rénovation complète de notre appartement', 
      'Nous avons fait appel aux Ponceurs Réunis pour la rénovation complète des parquets de notre appartement. Gerard, avec sa grande expérience, a coordonné l''ensemble du chantier avec une efficacité remarquable. Son équipe a su s''adapter aux contraintes de notre immeuble ancien et le résultat dépasse nos espérances. Un travail d''artisan de grande qualité, merci à Gerard et toute l''équipe !',
      5, 
      'approved', 
      now() - interval '42 days'
    ),
    (
      review_id_7,
      'François Meyer', 
      'francois.meyer@example.com', 
      'Ponçage et huilage de qualité', 
      'Julien nous a conseillé un huilage plutôt qu''une vitrification pour notre parquet en chêne, et nous ne regrettons pas ce choix ! Son expertise en matière de finitions modernes nous a permis d''obtenir un résultat naturel et chaleureux. Le travail a été réalisé dans les délais, avec un grand professionnalisme. Merci à Julien et à toute l''équipe des Ponceurs Réunis.',
      5, 
      'approved', 
      now() - interval '49 days'
    ),
    (
      review_id_8,
      'Hélène Walter', 
      'helene.walter@example.com', 
      'Réparation et ponçage d''un parquet très abîmé', 
      'Notre parquet avait subi des dégâts des eaux et plusieurs lames étaient à remplacer. Dylan, spécialiste des réparations complexes, a réalisé un travail exceptionnel. Les réparations sont invisibles et le ponçage parfait. Toute l''équipe a été professionnelle et à l''écoute. Un grand merci à Dylan pour son expertise et sa patience !',
      5, 
      'approved', 
      now() - interval '56 days'
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
      'Merci pour votre témoignage, Isabelle ! Julien est spécialisé dans les vitrifications et finitions modernes, et il est ravi que le résultat vous plaise. Toute notre équipe s''efforce de travailler proprement et efficacement pour minimiser les désagréments pendant les travaux. N''hésitez pas à faire appel à nous pour vos futurs projets !',
      now() - interval '27 days'
    ),
    (
      review_id_8, 
      'Merci pour votre retour, Hélène ! Dylan est notre spécialiste des réparations complexes et il est toujours satisfait quand les clients ne peuvent plus distinguer les parties réparées. C''est le signe d''un travail bien fait ! Nous sommes heureux d''avoir pu sauver votre parquet après ces dégâts des eaux. N''hésitez pas à nous contacter pour tout conseil d''entretien.',
      now() - interval '55 days'
    );
END $$;

-- Re-enable the trigger after all operations are complete
ALTER TABLE reviews ENABLE TRIGGER log_review_moderation;

-- Add information about service area to existing reviews
UPDATE reviews
SET content = content || ' Nous sommes ravis d''avoir fait appel à cette entreprise qui intervient dans toute l''Alsace et le quart nord-est de la France.'
WHERE id IN (
  SELECT id FROM reviews 
  ORDER BY created_at ASC
  LIMIT 3
);