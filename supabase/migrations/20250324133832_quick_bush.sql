/*
  # Add email configuration settings

  1. Changes
    - Add email configuration to app_settings table
    - Set default email sender address
    - Add description for the setting
*/

-- Insert or update email configuration
INSERT INTO app_settings (key, value, description)
VALUES (
  'email_from',
  'LPR Notifications <notifications@ponceur-parquet.fr>',
  'Default sender email address for notifications'
) ON CONFLICT (key) DO UPDATE
SET value = EXCLUDED.value,
    updated_at = now();