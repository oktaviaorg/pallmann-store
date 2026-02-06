/*
  # Add email settings table

  1. Changes
    - Create settings table for email configuration
    - Add default email sender setting
    
  2. Security
    - Enable RLS
    - Only allow service role to manage settings
*/

-- Create settings table
CREATE TABLE IF NOT EXISTS app_settings (
  key text PRIMARY KEY,
  value text NOT NULL,
  description text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE app_settings ENABLE ROW LEVEL SECURITY;

-- Add policy for service role
CREATE POLICY "Service role can manage settings"
  ON app_settings
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Insert default email settings
INSERT INTO app_settings (key, value, description)
VALUES (
  'email_from',
  'LPR Notifications <notifications@ponceur-parquet.fr>',
  'Default sender email address for notifications'
) ON CONFLICT (key) DO UPDATE
SET value = EXCLUDED.value,
    updated_at = now();