/*
  # Fix Gallery Photos Anonymous Access

  1. Changes
    - Add RLS policy to allow anonymous users to view gallery photos
    - Gallery photos should be public and viewable by everyone
    
  2. Security
    - Allow SELECT for anonymous users (anon role)
    - Keep existing authenticated access
*/

-- Allow anonymous users to view gallery photos
CREATE POLICY "Allow anonymous read access"
  ON gallery_photos
  FOR SELECT
  TO anon
  USING (true);

-- Also allow public role (for unauthenticated access)
CREATE POLICY "Allow public read access"
  ON gallery_photos
  FOR SELECT
  TO public
  USING (true);
