/*
  # Ajout de la catégorie Côte-d'Or

  1. Nouvelle catégorie
    - Côte-d'Or (21) pour les articles sur Dijon et région
  
  2. Sécurité
    - La catégorie est publique (lecture seule)
*/

INSERT INTO categories (id, name, slug, description, created_at)
VALUES (
  gen_random_uuid(),
  'Côte-d''Or',
  'cote-dor',
  'Articles sur les villes et services dans le département de la Côte-d''Or (21)',
  NOW()
)
ON CONFLICT (slug) DO NOTHING;