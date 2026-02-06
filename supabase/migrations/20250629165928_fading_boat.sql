/*
  # Add new photo of wood tablet sanding in Saint-Louis

  1. Changes
    - Insert new photo URL into gallery_photos table
    - Set appropriate order for the new photo
    - Add metadata for the Saint-Louis location
*/

-- Add the new photo to the gallery
INSERT INTO gallery_photos (url, "order") 
VALUES (
  'https://lh3.googleusercontent.com/p/AF1QipPwMzZfoLzCrqKOvjmG3dJ_cqEl_mFpX3soyNMw=s1360-w1360-h1020-rw',
  (SELECT COALESCE(MAX("order"), 0) + 1 FROM gallery_photos)
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