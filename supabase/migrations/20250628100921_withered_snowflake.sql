/*
  # Add new vitrification image to gallery

  1. Changes
    - Insert new vitrification image URL into gallery_photos table
    - Set appropriate order for the new photo
*/

-- Add the new photo to the gallery
INSERT INTO gallery_photos (url, "order") 
VALUES (
  'https://lh3.googleusercontent.com/p/AF1QipOP578ZdpQwbIMINBluxhsNM80JgLlaCVRdtMlo=s1360-w1360-h1020-rw',
  (SELECT COALESCE(MAX("order"), 0) + 1 FROM gallery_photos)
);