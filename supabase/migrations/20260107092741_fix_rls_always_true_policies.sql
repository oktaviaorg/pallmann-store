/*
  # Fix RLS "Always True" Policies
  
  ## Security Issues Fixed
  
  This migration addresses critical security vulnerabilities where RLS policies
  use `true` conditions, effectively disabling security for certain operations.
  
  ### Tables & Issues Fixed
  
  1. **email_queue**
     - REMOVED: Anon can insert unlimited emails (spam risk)
     - NEW: Only service_role can manage the queue (secure backend only)
  
  2. **form_submissions**
     - KEPT: Public insert access (intentional for contact forms)
     - No changes needed - this is expected behavior for public forms
  
  3. **google_ads_leads**
     - KEPT: Public insert access (intentional for lead generation)
     - No changes needed - this is expected behavior for lead forms
  
  4. **parquet_analysis_requests**
     - KEPT: Anon insert for tracking (intentional for analytics)
     - No changes needed - this is expected behavior for tracking
  
  5. **quotes**
     - FIXED: Authenticated users can only create quotes with their own email
     - Prevents users from creating quotes impersonating others
  
  6. **youtube_videos**
     - FIXED: Only admins can INSERT/UPDATE/DELETE videos
     - Regular authenticated users removed from write operations
     - Public SELECT access maintained (read-only for everyone)
  
  ## Impact
  - Eliminates ability for authenticated users to manipulate others' data
  - Prevents spam/abuse on email queue
  - Maintains legitimate public form submission functionality
  - Restricts video management to administrators only
*/

-- ============================================================
-- 1. EMAIL_QUEUE: Remove anon insert, keep service_role only
-- ============================================================

DROP POLICY IF EXISTS "Anon can insert into email queue" ON public.email_queue;

-- Service role policy already exists and is correct
-- "Service role can manage email queue" with true is OK because service_role is trusted

-- ============================================================
-- 2. FORM_SUBMISSIONS: Keep as-is (public forms are intentional)
-- ============================================================

-- No changes - public insert is expected for contact forms

-- ============================================================
-- 3. GOOGLE_ADS_LEADS: Keep as-is (lead forms are intentional)
-- ============================================================

-- No changes - public insert is expected for lead generation

-- ============================================================
-- 4. PARQUET_ANALYSIS_REQUESTS: Keep as-is (tracking is intentional)
-- ============================================================

-- No changes - anon insert is expected for analytics tracking

-- ============================================================
-- 5. QUOTES: Fix to restrict email to authenticated user's email
-- ============================================================

DROP POLICY IF EXISTS "Users can create quotes" ON public.quotes;

CREATE POLICY "Users can create quotes with their own email"
  ON public.quotes
  FOR INSERT
  TO authenticated
  WITH CHECK (
    email = (
      SELECT (auth.jwt() ->> 'email'::text)
    )
  );

-- ============================================================
-- 6. YOUTUBE_VIDEOS: Restrict write operations to admins only
-- ============================================================

-- Drop all existing permissive authenticated policies
DROP POLICY IF EXISTS "Authenticated users can insert youtube videos" ON public.youtube_videos;
DROP POLICY IF EXISTS "Authenticated users can update youtube videos" ON public.youtube_videos;
DROP POLICY IF EXISTS "Authenticated users can delete youtube videos" ON public.youtube_videos;

-- Create admin-only policies for write operations
CREATE POLICY "Admins can insert youtube videos"
  ON public.youtube_videos
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1
      FROM auth.users
      WHERE users.id = auth.uid()
        AND (users.raw_app_meta_data ->> 'role'::text) = 'admin'::text
    )
  );

CREATE POLICY "Admins can update youtube videos"
  ON public.youtube_videos
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1
      FROM auth.users
      WHERE users.id = auth.uid()
        AND (users.raw_app_meta_data ->> 'role'::text) = 'admin'::text
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1
      FROM auth.users
      WHERE users.id = auth.uid()
        AND (users.raw_app_meta_data ->> 'role'::text) = 'admin'::text
    )
  );

CREATE POLICY "Admins can delete youtube videos"
  ON public.youtube_videos
  FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1
      FROM auth.users
      WHERE users.id = auth.uid()
        AND (users.raw_app_meta_data ->> 'role'::text) = 'admin'::text
    )
  );

-- Public SELECT policy already exists and is correct for read-only access