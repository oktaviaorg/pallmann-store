/*
  # Fix Categories Anonymous Access

  1. Changes
    - Add RLS policy to allow anonymous users to view categories
    - Blog categories should be public and viewable by everyone
    
  2. Security
    - Allow SELECT for anonymous users (anon role)
    - Allow SELECT for public role
    - Keep existing authenticated access
*/

-- Allow anonymous users to view categories
CREATE POLICY "Allow anonymous read access to categories"
  ON categories
  FOR SELECT
  TO anon
  USING (true);

-- Also allow public role (for unauthenticated access)
CREATE POLICY "Allow public read access to categories"
  ON categories
  FOR SELECT
  TO public
  USING (true);
