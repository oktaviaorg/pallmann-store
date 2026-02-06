/*
  # Fix Function Search Path Security Issues
  
  ## Changes
  This migration fixes security vulnerabilities in functions that have mutable search paths.
  
  ### Functions Fixed
  1. **increment_article_view** (both text and uuid versions)
     - Sets search_path to empty string
     - Uses fully qualified table names (public.articles)
     
  2. **increment_article_click** (both text and uuid versions)
     - Sets search_path to empty string
     - Uses fully qualified table names (public.articles)
     
  3. **log_form_submission_for_email**
     - Sets search_path to empty string
     - Uses fully qualified table names (public.email_notifications_log)
  
  ## Security Impact
  - Prevents potential SQL injection through search_path manipulation
  - Ensures functions always reference the correct schema objects
  - Eliminates ambiguity in object resolution
*/

-- Fix increment_article_view (text version)
CREATE OR REPLACE FUNCTION public.increment_article_view(article_slug text)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  UPDATE public.articles
  SET view_count = COALESCE(view_count, 0) + 1
  WHERE slug = article_slug;
END;
$$;

-- Fix increment_article_view (uuid version)
CREATE OR REPLACE FUNCTION public.increment_article_view(article_id uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  UPDATE public.articles
  SET view_count = COALESCE(view_count, 0) + 1
  WHERE id = article_id;
END;
$$;

-- Fix increment_article_click (text version)
CREATE OR REPLACE FUNCTION public.increment_article_click(article_slug text)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  UPDATE public.articles
  SET click_count = COALESCE(click_count, 0) + 1
  WHERE slug = article_slug;
END;
$$;

-- Fix increment_article_click (uuid version)
CREATE OR REPLACE FUNCTION public.increment_article_click(article_id uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  UPDATE public.articles
  SET click_count = COALESCE(click_count, 0) + 1
  WHERE id = article_id;
END;
$$;

-- Fix log_form_submission_for_email
CREATE OR REPLACE FUNCTION public.log_form_submission_for_email()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  -- Create a log entry with pending status
  INSERT INTO public.email_notifications_log (form_submission_id, status)
  VALUES (NEW.id, 'pending');
  
  RETURN NEW;
END;
$$;