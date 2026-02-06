/*
  # Delete specified gallery photos

  1. Changes
    - Delete photos with order numbers 1, 2, 7, and 9 from the gallery_photos table
    - Reorder remaining photos to maintain sequential ordering
*/

-- First, delete the specified photos
DELETE FROM gallery_photos
WHERE "order" IN (1, 2, 7, 9);

-- Then, reorder the remaining photos to maintain sequential ordering
WITH ordered_photos AS (
  SELECT id, ROW_NUMBER() OVER (ORDER BY "order") AS new_order
  FROM gallery_photos
)
UPDATE gallery_photos
SET "order" = op.new_order
FROM ordered_photos op
WHERE gallery_photos.id = op.id;