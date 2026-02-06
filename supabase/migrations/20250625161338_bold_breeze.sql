/*
  # Add new photo to gallery

  1. Changes
    - Insert new photo URL into gallery_photos table
    - Set appropriate order for the new photo
*/

-- Add the new photo to the gallery
INSERT INTO gallery_photos (url, "order") 
VALUES (
  'https://lh3.googleusercontent.com/p/AF1QipM-7xmEk8DL7-0q5doOU1uesHedBZmHWLG5kdNr=s1360-w1360-h1020-rw',
  (SELECT COALESCE(MAX("order"), 0) + 1 FROM gallery_photos)
);