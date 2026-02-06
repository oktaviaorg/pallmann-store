/*
  # Add new image to gallery

  1. Changes
    - Insert new image URL into gallery_photos table
    - Set appropriate order for the new image
*/

-- Add the new image to the gallery
INSERT INTO gallery_photos (url, "order") 
VALUES (
  'https://mjuzyqhxifyvebtnlrra.supabase.co/storage/v1/object/public/photos-lpr//IMG_0556.jpg',
  (SELECT COALESCE(MAX("order"), 0) + 1 FROM gallery_photos)
);