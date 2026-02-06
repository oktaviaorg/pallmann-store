/*
  # Fix Security Issues - Part 3: Remove Unused Indexes

  1. Changes
    - Remove idx_email_notifications_status (unused)
    - Remove idx_google_ads_leads_source (unused)
    - Remove idx_google_ads_leads_city (unused)
    
  2. Purpose
    - Reduce database maintenance overhead
    - Free up storage space
    - Improve INSERT/UPDATE performance
*/

-- Remove unused index on email_notifications_log.status
DROP INDEX IF EXISTS idx_email_notifications_status;

-- Remove unused index on google_ads_leads.source
DROP INDEX IF EXISTS idx_google_ads_leads_source;

-- Remove unused index on google_ads_leads.city
DROP INDEX IF EXISTS idx_google_ads_leads_city;
