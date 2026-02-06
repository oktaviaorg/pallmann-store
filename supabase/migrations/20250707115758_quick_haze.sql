/*
  # Update gallery photos with new images

  1. Changes
    - Update photos at positions 3, 4, and 5 with new URLs
    - Ensure all 6 photos have the correct URLs and ordering
    
  2. Photos
    - Order 3: IMG_5309.jpg
    - Order 4: IMG_5311.jpg
    - Order 5: IMG_7495.jpg
    - Order 6: IMG_0292 - Copie.JPEG
*/

-- First, update the photos at positions 3, 4, and 5 with the new URLs
UPDATE gallery_photos 
SET url = 'https://mjuzyqhxifyvebtnlrra.supabase.co/storage/v1/object/public/photos-lpr//IMG_5309.jpg'
WHERE "order" = 3;

UPDATE gallery_photos 
SET url = 'https://mjuzyqhxifyvebtnlrra.supabase.co/storage/v1/object/public/photos-lpr//IMG_5311.jpg'
WHERE "order" = 4;

UPDATE gallery_photos 
SET url = 'https://mjuzyqhxifyvebtnlrra.supabase.co/storage/v1/object/public/photos-lpr//IMG_7495.jpg'
WHERE "order" = 5;

-- Ensure the photo at position 6 is the correct one
UPDATE gallery_photos 
SET url = 'https://mjuzyqhxifyvebtnlrra.supabase.co/storage/v1/object/public/photos-lpr//IMG_0292%20-%20Copie.JPEG'
WHERE "order" = 6;

-- Reorder all photos to ensure sequential ordering
WITH ordered_photos AS (
  SELECT id, ROW_NUMBER() OVER (ORDER BY "order") AS new_order
  FROM gallery_photos
)
UPDATE gallery_photos
SET "order" = op.new_order
FROM ordered_photos op
WHERE gallery_photos.id = op.id;