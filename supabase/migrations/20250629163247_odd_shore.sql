/*
  # Update gallery photos with optimized images

  1. Changes
    - Add new high-quality images to gallery
    - Remove problematic images
    - Ensure proper ordering of gallery photos
*/

-- First, delete any problematic images that might still exist
DELETE FROM gallery_photos
WHERE url LIKE '%AF1QipNioIEi-vvdZs2VNRxxVj30I4budtxI-UvYfEHO%'
   OR url LIKE '%AF1QipOm6alF8ghTrqrdDWSCoX1tqBHMz9maqAmYdIQu%'
   OR url LIKE '%AF1QipM-7xmEk8DL7-0q5doOU1uesHedBZmHWLG5kdNr%'
   OR url LIKE '%AF1QipPaoXnwytPcI24r6VTPcC-mXusFxJHp9_YTPuVj%';

-- Add new high-quality images if they don't already exist
INSERT INTO gallery_photos (url, "order")
SELECT 'https://mjuzyqhxifyvebtnlrra.supabase.co/storage/v1/object/public/photos-lpr//IMG_0556.jpg', 
       (SELECT COALESCE(MAX("order"), 0) + 1 FROM gallery_photos)
WHERE NOT EXISTS (
  SELECT 1 FROM gallery_photos 
  WHERE url = 'https://mjuzyqhxifyvebtnlrra.supabase.co/storage/v1/object/public/photos-lpr//IMG_0556.jpg'
);

INSERT INTO gallery_photos (url, "order")
SELECT 'https://mjuzyqhxifyvebtnlrra.supabase.co/storage/v1/object/public/photos-lpr//test%20parquet.jpg', 
       (SELECT COALESCE(MAX("order"), 0) + 1 FROM gallery_photos)
WHERE NOT EXISTS (
  SELECT 1 FROM gallery_photos 
  WHERE url = 'https://mjuzyqhxifyvebtnlrra.supabase.co/storage/v1/object/public/photos-lpr//test%20parquet.jpg'
);

INSERT INTO gallery_photos (url, "order")
SELECT 'https://mjuzyqhxifyvebtnlrra.supabase.co/storage/v1/object/public/lpr//HOTEL%20LPR%20SITE%20%20(1)%20(1).jpg', 
       (SELECT COALESCE(MAX("order"), 0) + 1 FROM gallery_photos)
WHERE NOT EXISTS (
  SELECT 1 FROM gallery_photos 
  WHERE url = 'https://mjuzyqhxifyvebtnlrra.supabase.co/storage/v1/object/public/lpr//HOTEL%20LPR%20SITE%20%20(1)%20(1).jpg'
);

INSERT INTO gallery_photos (url, "order")
SELECT 'https://mjuzyqhxifyvebtnlrra.supabase.co/storage/v1/object/public/photos-lpr//Acceuil%202.jpeg', 
       (SELECT COALESCE(MAX("order"), 0) + 1 FROM gallery_photos)
WHERE NOT EXISTS (
  SELECT 1 FROM gallery_photos 
  WHERE url = 'https://mjuzyqhxifyvebtnlrra.supabase.co/storage/v1/object/public/photos-lpr//Acceuil%202.jpeg'
);

INSERT INTO gallery_photos (url, "order")
SELECT 'https://mjuzyqhxifyvebtnlrra.supabase.co/storage/v1/object/public/photos-lpr//IMG_0292%20-%20Copie.JPEG', 
       (SELECT COALESCE(MAX("order"), 0) + 1 FROM gallery_photos)
WHERE NOT EXISTS (
  SELECT 1 FROM gallery_photos 
  WHERE url = 'https://mjuzyqhxifyvebtnlrra.supabase.co/storage/v1/object/public/photos-lpr//IMG_0292%20-%20Copie.JPEG'
);

-- Reorder all photos to ensure sequential ordering
WITH ordered_photos AS (
  SELECT id, ROW_NUMBER() OVER (ORDER BY "order") AS new_order
  FROM gallery_photos
)
UPDATE gallery_photos
SET "order" = op.new_order
FROM ordered_photos op
WHERE gallery_photos.id = op.id;