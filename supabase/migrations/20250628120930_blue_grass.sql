/*
  # Fix storage policies for public access to images

  1. Changes
    - Drop existing policies if they exist to avoid conflicts
    - Create new policies for public access to images in photos-lpr bucket
    - Allow access to JPG/JPEG images in specific folders
    - Allow access to all common image formats throughout the bucket
    
  2. Security
    - Restrict access to specific file types only
    - Maintain bucket-level security
*/

-- First drop existing policies if they exist
DROP POLICY IF EXISTS "Allow public access to JPG images in 1qwncpu_0" ON storage.objects;
DROP POLICY IF EXISTS "Allow public access to JPG images in root folder" ON storage.objects;
DROP POLICY IF EXISTS "Allow public access to all images in photos-lpr" ON storage.objects;

-- Create a policy to allow anonymous users to read JPG images in folder 1qwncpu_0
CREATE POLICY "Allow public access to JPG images in 1qwncpu_0"
ON storage.objects
FOR SELECT
TO anon
USING (
  bucket_id = 'photos-lpr' AND 
  (LOWER(SPLIT_PART(name, '.', -1)) = 'jpg' OR LOWER(SPLIT_PART(name, '.', -1)) = 'jpeg') AND
  name LIKE '1qwncpu_0/%'
);

-- Create a policy to allow anonymous users to read JPG images in the root folder
CREATE POLICY "Allow public access to JPG images in root folder"
ON storage.objects
FOR SELECT
TO anon
USING (
  bucket_id = 'photos-lpr' AND 
  (LOWER(SPLIT_PART(name, '.', -1)) = 'jpg' OR LOWER(SPLIT_PART(name, '.', -1)) = 'jpeg') AND
  position('/' in name) = 0
);

-- Create a policy to allow anonymous users to read all image types in the photos-lpr bucket
CREATE POLICY "Allow public access to all images in photos-lpr"
ON storage.objects
FOR SELECT
TO anon
USING (
  bucket_id = 'photos-lpr' AND 
  (
    LOWER(SPLIT_PART(name, '.', -1)) = 'jpg' OR 
    LOWER(SPLIT_PART(name, '.', -1)) = 'jpeg' OR
    LOWER(SPLIT_PART(name, '.', -1)) = 'png' OR
    LOWER(SPLIT_PART(name, '.', -1)) = 'gif' OR
    LOWER(SPLIT_PART(name, '.', -1)) = 'webp' OR
    LOWER(SPLIT_PART(name, '.', -1)) = 'svg'
  )
);