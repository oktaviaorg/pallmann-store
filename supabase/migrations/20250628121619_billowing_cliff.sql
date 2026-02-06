/*
  # Fix storage policies for public access to images

  1. Changes
    - Drop all existing policies with a comprehensive list
    - Create a single policy for all image types with a unique timestamp in name
    - Add a separate policy for favicon files with a unique timestamp
    - Use simpler conditions for better performance
*/

-- First drop all potentially conflicting policies
DROP POLICY IF EXISTS "Allow public access to JPG images in 1qwncpu_0" ON storage.objects;
DROP POLICY IF EXISTS "Allow public access to JPG images in folder 1qwncpu_0" ON storage.objects;
DROP POLICY IF EXISTS "Allow public access to JPG images in folder 1qwncpu_0_new" ON storage.objects;
DROP POLICY IF EXISTS "Allow public access to JPG images in root folder" ON storage.objects;
DROP POLICY IF EXISTS "Allow public access to JPG images in root folder_new" ON storage.objects;
DROP POLICY IF EXISTS "Allow public access to all images in photos-lpr" ON storage.objects;
DROP POLICY IF EXISTS "Allow public access to all images in photos-lpr bucket" ON storage.objects;
DROP POLICY IF EXISTS "Allow public access to all images in photos-lpr bucket_new" ON storage.objects;
DROP POLICY IF EXISTS "Allow public access to favicon files" ON storage.objects;
DROP POLICY IF EXISTS "photos_lpr_public_read_20250628" ON storage.objects;
DROP POLICY IF EXISTS "favicon_public_read_20250628" ON storage.objects;

-- Create a single comprehensive policy for all images in the photos-lpr bucket
CREATE POLICY "photos_lpr_public_read_20250628_132145"
ON storage.objects
FOR SELECT
TO anon
USING (
  bucket_id = 'photos-lpr' AND 
  LOWER(SPLIT_PART(name, '.', -1)) IN ('jpg', 'jpeg', 'png', 'gif', 'webp', 'svg', 'ico')
);

-- Create a specific policy for favicon files with a unique name
CREATE POLICY "favicon_public_read_20250628_132145"
ON storage.objects
FOR SELECT
TO anon
USING (
  bucket_id = 'photos-lpr' AND 
  name LIKE 'favicon%'
);