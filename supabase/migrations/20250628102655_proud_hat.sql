/*
  # Grant anonymous access to images in photos-lpr bucket

  1. Changes
    - Create policies to allow anonymous users to access JPG images in folder 1qwncpu_0
    - Create policies to allow anonymous users to access JPG images in root folder
    - Create policies to allow anonymous users to access all common image formats
    
  2. Security
    - Restrict access to read-only (SELECT)
    - Limit to specific file extensions for security
*/

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
  name NOT LIKE '%/%'
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