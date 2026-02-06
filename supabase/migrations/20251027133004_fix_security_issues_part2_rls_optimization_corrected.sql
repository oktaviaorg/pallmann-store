/*
  # Fix Security Issues - Part 2: Optimize RLS Policies (Corrected)

  1. Changes
    - Optimize all RLS policies to use (SELECT auth.uid()) instead of auth.uid()
    - This prevents re-evaluation of auth functions for each row
    - Significantly improves query performance at scale
    
  2. Tables Updated
    - form_submissions
    - newsletter_subscribers
    - google_ads_leads
    - reviews
    - review_responses
    - review_images
    - moderation_logs
*/

-- form_submissions: Allow admin read
DROP POLICY IF EXISTS "Allow admin read" ON form_submissions;
CREATE POLICY "Allow admin read"
  ON form_submissions
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE id = (SELECT auth.uid())
      AND raw_app_meta_data->>'role' = 'admin'
    )
  );

-- newsletter_subscribers: Allow admin full access
DROP POLICY IF EXISTS "Allow admin full access" ON newsletter_subscribers;
CREATE POLICY "Allow admin full access"
  ON newsletter_subscribers
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE id = (SELECT auth.uid())
      AND raw_app_meta_data->>'role' = 'admin'
    )
  );

-- google_ads_leads: Admins can read all leads
DROP POLICY IF EXISTS "Admins can read all leads" ON google_ads_leads;
CREATE POLICY "Admins can read all leads"
  ON google_ads_leads
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE id = (SELECT auth.uid())
      AND raw_app_meta_data->>'role' = 'admin'
    )
  );

-- reviews: Admin can manage all reviews
DROP POLICY IF EXISTS "Admin can manage all reviews" ON reviews;
CREATE POLICY "Admin can manage all reviews"
  ON reviews
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE id = (SELECT auth.uid())
      AND raw_app_meta_data->>'role' = 'admin'
    )
  );

-- review_responses: Admin can manage responses
DROP POLICY IF EXISTS "Admin can manage responses" ON review_responses;
CREATE POLICY "Admin can manage responses"
  ON review_responses
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE id = (SELECT auth.uid())
      AND raw_app_meta_data->>'role' = 'admin'
    )
  );

-- review_images: Admin can manage review images
DROP POLICY IF EXISTS "Admin can manage review images" ON review_images;
CREATE POLICY "Admin can manage review images"
  ON review_images
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE id = (SELECT auth.uid())
      AND raw_app_meta_data->>'role' = 'admin'
    )
  );

-- moderation_logs: Only admin can access logs
DROP POLICY IF EXISTS "Only admin can access logs" ON moderation_logs;
CREATE POLICY "Only admin can access logs"
  ON moderation_logs
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE id = (SELECT auth.uid())
      AND raw_app_meta_data->>'role' = 'admin'
    )
  );
