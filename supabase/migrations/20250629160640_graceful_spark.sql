/*
  # Remove specified photos from gallery

  1. Changes
    - Delete photos with IDs 7, 8, 9, 11, and 12 from the gallery_photos table
    - Reorder remaining photos to maintain sequential order
*/

-- Delete the specified photos
DELETE FROM gallery_photos
WHERE id IN (
  SELECT id FROM gallery_photos
  ORDER BY "order"
  OFFSET 6 LIMIT 1 -- ID 7 (7th photo)
);

DELETE FROM gallery_photos
WHERE id IN (
  SELECT id FROM gallery_photos
  ORDER BY "order"
  OFFSET 7 LIMIT 1 -- ID 8 (8th photo)
);

DELETE FROM gallery_photos
WHERE id IN (
  SELECT id FROM gallery_photos
  ORDER BY "order"
  OFFSET 8 LIMIT 1 -- ID 9 (9th photo)
);

DELETE FROM gallery_photos
WHERE id IN (
  SELECT id FROM gallery_photos
  ORDER BY "order"
  OFFSET 10 LIMIT 1 -- ID 11 (11th photo)
);

DELETE FROM gallery_photos
WHERE id IN (
  SELECT id FROM gallery_photos
  ORDER BY "order"
  OFFSET 11 LIMIT 1 -- ID 12 (12th photo)
);

-- Reorder remaining photos to maintain sequential order
WITH ordered_photos AS (
  SELECT id, ROW_NUMBER() OVER (ORDER BY "order") AS new_order
  FROM gallery_photos
)
UPDATE gallery_photos
SET "order" = op.new_order
FROM ordered_photos op
WHERE gallery_photos.id = op.id;