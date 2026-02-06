/*
  # Update article featured image URL

  1. Changes
    - Update featured_image URL to use Supabase storage URL
    - Ensure proper image URL format
*/

UPDATE articles
SET featured_image = 'https://mjuzyqhxifyvebtnlrra.supabase.co/storage/v1/object/public/photos-lpr//IMG_0292%20-%20Copie.JPEG'
WHERE slug = 'poncer-parquet-huile-guide-complet';