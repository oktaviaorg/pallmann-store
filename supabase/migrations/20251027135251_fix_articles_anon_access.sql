/*
  # Fix Articles Anonymous Access

  1. Changes
    - Add RLS policy to allow anonymous users to view published articles
    - Blog articles should be public and viewable by everyone
    
  2. Security
    - Allow SELECT for anonymous users (anon role) on published articles
    - Allow SELECT for public role on published articles
    - Keep existing authenticated access
*/

-- Allow anonymous users to view published articles
CREATE POLICY "Allow anonymous read access to published articles"
  ON articles
  FOR SELECT
  TO anon
  USING (published = true);

-- Also allow public role (for unauthenticated access)
CREATE POLICY "Allow public read access to published articles"
  ON articles
  FOR SELECT
  TO public
  USING (published = true);
