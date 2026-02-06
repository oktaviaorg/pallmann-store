/*
  # Fix Storage Policies for Photos and Favicons

  1. Changes
    - Drop existing conflicting policies
    - Create new policies with unique names
    - Add specific policy for favicon files
    - Simplify policy conditions for better performance
    
  2. Security
    - Maintain public read access to image files
    - Ensure favicons are accessible
*/

-- First drop existing policies if they exist
DROP POLICY IF EXISTS "Allow public access to JPG images in 1qwncpu_0" ON storage.objects;
DROP POLICY IF EXISTS "Allow public access to JPG images in folder 1qwncpu_0" ON storage.objects;
DROP POLICY IF EXISTS "Allow public access to JPG images in folder 1qwncpu_0_new" ON storage.objects;
DROP POLICY IF EXISTS "Allow public access to JPG images in root folder" ON storage.objects;
DROP POLICY IF EXISTS "Allow public access to JPG images in root folder_new" ON storage.objects;
DROP POLICY IF EXISTS "Allow public access to all images in photos-lpr" ON storage.objects;
DROP POLICY IF EXISTS "Allow public access to all images in photos-lpr bucket" ON storage.objects;
DROP POLICY IF EXISTS "Allow public access to all images in photos-lpr bucket_new" ON storage.objects;
DROP POLICY IF EXISTS "Allow public access to favicon files" ON storage.objects;

-- Create a single comprehensive policy for all images in the photos-lpr bucket
CREATE POLICY "photos_lpr_public_read_20250628"
ON storage.objects
FOR SELECT
TO anon
USING (
  bucket_id = 'photos-lpr' AND 
  (
    LOWER(SPLIT_PART(name, '.', -1)) IN ('jpg', 'jpeg', 'png', 'gif', 'webp', 'svg', 'ico')
  )
);

-- Create a specific policy for favicon files with a unique name
CREATE POLICY "favicon_public_read_20250628"
ON storage.objects
FOR SELECT
TO anon
USING (
  bucket_id = 'photos-lpr' AND 
  (
    name LIKE 'favicon%'
  )
);