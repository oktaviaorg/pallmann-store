/*
  # Fix gallery photos display issues

  1. Changes
    - Remove problematic photos from the gallery
    - Reorder remaining photos to maintain sequential ordering
    - Ensure proper display in the carousel
*/

-- Delete photos that aren't displaying correctly
DELETE FROM gallery_photos
WHERE url LIKE '%AF1QipNioIEi-vvdZs2VNRxxVj30I4budtxI-UvYfEHO%'
   OR url LIKE '%AF1QipOm6alF8ghTrqrdDWSCoX1tqBHMz9maqAmYdIQu%'
   OR url LIKE '%AF1QipM-7xmEk8DL7-0q5doOU1uesHedBZmHWLG5kdNr%'
   OR url LIKE '%AF1QipPaoXnwytPcI24r6VTPcC-mXusFxJHp9_YTPuVj%';

-- Reorder remaining photos to maintain sequential ordering
WITH ordered_photos AS (
  SELECT id, ROW_NUMBER() OVER (ORDER BY "order") AS new_order
  FROM gallery_photos
)
UPDATE gallery_photos
SET "order" = op.new_order
FROM ordered_photos op
WHERE gallery_photos.id = op.id;