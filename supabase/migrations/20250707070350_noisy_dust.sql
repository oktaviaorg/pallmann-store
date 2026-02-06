/*
  # Fix duplicate slug issue for parquet decapage article

  1. Changes
    - Update the slug of the duplicate article to make it unique
    - Keep the content and other metadata the same
    - Ensure proper database integrity
*/

-- Update the slug of the article to make it unique
UPDATE articles 
SET slug = 'comment-decaper-parquet-ancien-guide-complet-redonner-vie-sol-2025'
WHERE slug = 'comment-decaper-parquet-ancien-guide-complet-redonner-vie-sol'
AND id = (
  SELECT id FROM articles 
  WHERE slug = 'comment-decaper-parquet-ancien-guide-complet-redonner-vie-sol'
  ORDER BY created_at DESC
  LIMIT 1
);