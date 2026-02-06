/*
  # Fix Security Issues - Part 4: Consolidate Multiple Permissive Policies (v3)

  1. Changes
    - Consolidate duplicate permissive policies into single policies
    - Use correct column names (email not author_email)
    - Use OR conditions instead of multiple policies
    - Improves policy evaluation performance
*/

-- articles: Consolidate SELECT policies
DROP POLICY IF EXISTS "Allow admin write access" ON articles;
DROP POLICY IF EXISTS "Allow public read access to published articles" ON articles;
CREATE POLICY "Consolidated read access"
  ON articles
  FOR SELECT
  TO authenticated
  USING (
    published = true
    OR EXISTS (
      SELECT 1 FROM auth.users
      WHERE id = (SELECT auth.uid())
      AND raw_app_meta_data->>'role' = 'admin'
    )
  );

-- categories: Consolidate SELECT policies
DROP POLICY IF EXISTS "Allow admin write access" ON categories;
DROP POLICY IF EXISTS "Allow public read access" ON categories;
CREATE POLICY "Consolidated read access"
  ON categories
  FOR SELECT
  TO authenticated
  USING (true);

-- documents: Consolidate SELECT policies
DROP POLICY IF EXISTS "Allow admin write access to documents" ON documents;
DROP POLICY IF EXISTS "Allow public read access to documents" ON documents;
CREATE POLICY "Consolidated read access"
  ON documents
  FOR SELECT
  USING (true);

-- gallery_photos: Consolidate SELECT policies
DROP POLICY IF EXISTS "Allow admin write access" ON gallery_photos;
DROP POLICY IF EXISTS "Allow public read access" ON gallery_photos;
CREATE POLICY "Consolidated read access"
  ON gallery_photos
  FOR SELECT
  TO authenticated
  USING (true);

-- newsletter_subscribers: Consolidate INSERT policies
DROP POLICY IF EXISTS "Allow public subscription" ON newsletter_subscribers;
CREATE POLICY "Consolidated insert access"
  ON newsletter_subscribers
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- review_images: Consolidate SELECT policies
DROP POLICY IF EXISTS "Public can view approved review images" ON review_images;
CREATE POLICY "Consolidated read access"
  ON review_images
  FOR SELECT
  TO authenticated
  USING (true);

-- review_responses: Consolidate SELECT policies
DROP POLICY IF EXISTS "Public can read responses" ON review_responses;
CREATE POLICY "Consolidated read access"
  ON review_responses
  FOR SELECT
  TO authenticated
  USING (true);

-- reviews: Consolidate SELECT policies (using 'email' column)
DROP POLICY IF EXISTS "Authors can read their own reviews" ON reviews;
DROP POLICY IF EXISTS "Public can read approved reviews" ON reviews;
CREATE POLICY "Consolidated read access"
  ON reviews
  FOR SELECT
  USING (
    status = 'approved'
    OR email = current_setting('request.jwt.claims', true)::json->>'email'
    OR EXISTS (
      SELECT 1 FROM auth.users
      WHERE id = (SELECT auth.uid())
      AND raw_app_meta_data->>'role' = 'admin'
    )
  );

-- reviews: Consolidate INSERT policies
DROP POLICY IF EXISTS "Anyone can create reviews" ON reviews;
CREATE POLICY "Consolidated insert access"
  ON reviews
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- service_areas: Consolidate SELECT policies
DROP POLICY IF EXISTS admin_write_access_20250708_123456 ON service_areas;
DROP POLICY IF EXISTS public_read_access_20250708_123456 ON service_areas;
CREATE POLICY "Consolidated read access"
  ON service_areas
  FOR SELECT
  TO authenticated
  USING (true);
