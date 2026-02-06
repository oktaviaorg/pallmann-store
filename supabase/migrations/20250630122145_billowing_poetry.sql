/*
  # Update gallery photos to keep only 6 high-quality images

  1. Changes
    - Delete all existing photos from gallery_photos table
    - Insert 6 high-quality photos with proper ordering
    - Ensure consistent image quality and aspect ratios
    
  2. Security
    - Maintain existing RLS policies
*/

-- First, delete all existing photos
DELETE FROM gallery_photos;

-- Insert 6 high-quality photos with proper ordering
INSERT INTO gallery_photos (url, "order") VALUES
  ('https://mjuzyqhxifyvebtnlrra.supabase.co/storage/v1/object/public/photos-lpr//test%20parquet.jpg', 1),
  ('https://mjuzyqhxifyvebtnlrra.supabase.co/storage/v1/object/public/photos-lpr//IMG_0556.jpg', 2),
  ('https://mjuzyqhxifyvebtnlrra.supabase.co/storage/v1/object/public/lpr//HOTEL%20LPR%20SITE%20%20(1)%20(1).jpg', 3),
  ('https://mjuzyqhxifyvebtnlrra.supabase.co/storage/v1/object/public/photos-lpr//Acceuil%202.jpeg', 4),
  ('https://mjuzyqhxifyvebtnlrra.supabase.co/storage/v1/object/public/photos-lpr//IMG_0292%20-%20Copie.JPEG', 5),
  ('https://lh3.googleusercontent.com/p/AF1QipPwMzZfoLzCrqKOvjmG3dJ_cqEl_mFpX3soyNMw=s1360-w1360-h1020-rw', 6);