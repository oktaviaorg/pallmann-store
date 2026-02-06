/*
  # Set default featured image for articles

  1. Changes
    - Update all articles without a featured image to use the default image
    - Set default value for featured_image column
*/

-- Update existing articles without a featured image
UPDATE articles 
SET featured_image = 'https://mjuzyqhxifyvebtnlrra.supabase.co/storage/v1/object/public/photos-lpr//test%20parquet.jpg'
WHERE featured_image IS NULL 
   OR featured_image = '';

-- Set default value for featured_image column
ALTER TABLE articles 
ALTER COLUMN featured_image 
SET DEFAULT 'https://mjuzyqhxifyvebtnlrra.supabase.co/storage/v1/object/public/photos-lpr//test%20parquet.jpg';