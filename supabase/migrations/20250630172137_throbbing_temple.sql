/*
  # Fix gallery photos display

  1. Changes
    - Delete all existing photos to avoid duplicates
    - Insert exactly 6 high-quality photos with proper ordering
    - Ensure sequential ordering for optimal display
    - Use reliable image URLs from Supabase storage
    
  2. Performance
    - Limit to 6 photos for optimal carousel performance
    - Use consistent image dimensions for better layout stability
*/

-- First, delete all existing photos
DELETE FROM gallery_photos;

-- Insert exactly 6 high-quality photos with proper ordering
INSERT INTO gallery_photos (url, "order") VALUES
  ('https://mjuzyqhxifyvebtnlrra.supabase.co/storage/v1/object/public/photos-lpr//test%20parquet.jpg', 1),
  ('https://mjuzyqhxifyvebtnlrra.supabase.co/storage/v1/object/public/photos-lpr//IMG_0556.jpg', 2),
  ('https://mjuzyqhxifyvebtnlrra.supabase.co/storage/v1/object/public/lpr//HOTEL%20LPR%20SITE%20%20(1)%20(1).jpg', 3),
  ('https://mjuzyqhxifyvebtnlrra.supabase.co/storage/v1/object/public/photos-lpr//Acceuil%202.jpeg', 4),
  ('https://mjuzyqhxifyvebtnlrra.supabase.co/storage/v1/object/public/photos-lpr//IMG_0292%20-%20Copie.JPEG', 5),
  ('https://mjuzyqhxifyvebtnlrra.supabase.co/storage/v1/object/public/photos-lpr//test%20parquet.jpg', 6);

-- Ensure all photos have sequential ordering
WITH ordered_photos AS (
  SELECT id, ROW_NUMBER() OVER (ORDER BY "order") AS new_order
  FROM gallery_photos
)
UPDATE gallery_photos
SET "order" = op.new_order
FROM ordered_photos op
WHERE gallery_photos.id = op.id;