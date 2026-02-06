/*
  # Add new hotel photo to gallery

  1. Changes
    - Insert new hotel photo URL into gallery_photos table
    - Set appropriate order for the new photo
*/

-- Add the new photo to the gallery
INSERT INTO gallery_photos (url, "order") 
VALUES (
  'https://mjuzyqhxifyvebtnlrra.supabase.co/storage/v1/object/public/lpr//HOTEL%20LPR%20SITE%20%20(1)%20(1).jpg',
  (SELECT COALESCE(MAX("order"), 0) + 1 FROM gallery_photos)
);