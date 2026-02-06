/*
  # Add new photo to gallery and adjust transition timing

  1. Changes
    - Insert new photo URL into gallery_photos table in first position
    - Reorder existing photos to maintain sequence
*/

-- First, update the order of existing photos to make room for the new one
UPDATE gallery_photos 
SET "order" = "order" + 1;

-- Add the new photo to the gallery in first position
INSERT INTO gallery_photos (url, "order") 
VALUES (
  'https://lh3.googleusercontent.com/p/AF1QipOm6alF8ghTrqrdDWSCoX1tqBHMz9maqAmYdIQu=s1360-w1360-h1020-rw',
  1
);