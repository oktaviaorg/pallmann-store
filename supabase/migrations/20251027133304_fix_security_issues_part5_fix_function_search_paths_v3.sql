/*
  # Fix Security Issues - Part 5: Fix Function Search Paths (v3)

  1. Changes
    - Set immutable search_path for all functions using ALTER FUNCTION
    - Use 'SET search_path = public, pg_temp' for security
    - Avoids dropping functions with dependencies
*/

-- Fix all functions with ALTER FUNCTION SET search_path
ALTER FUNCTION increment_document_download_count(uuid) SET search_path = public, pg_temp;
ALTER FUNCTION update_updated_at_column() SET search_path = public, pg_temp;
ALTER FUNCTION format_address(text, text, text) SET search_path = public, pg_temp;
ALTER FUNCTION generate_full_address(text, text, text) SET search_path = public, pg_temp;
ALTER FUNCTION extract_postal_code(text) SET search_path = public, pg_temp;
ALTER FUNCTION update_postal_code_from_address() SET search_path = public, pg_temp;
ALTER FUNCTION log_moderation_action() SET search_path = public, pg_temp;
ALTER FUNCTION update_videos_updated_at() SET search_path = public, pg_temp;
ALTER FUNCTION queue_form_notification() SET search_path = public, pg_temp;
ALTER FUNCTION handle_new_user() SET search_path = public, pg_temp;
