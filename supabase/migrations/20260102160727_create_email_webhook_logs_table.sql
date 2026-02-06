/*
  # Create email webhook logs table

  1. New Tables
    - `email_webhook_logs`
      - `id` (uuid, primary key)
      - `event_type` (text) - Type of webhook event (email.sent, email.delivered, etc.)
      - `event_data` (jsonb) - Full event data from Resend
      - `created_at` (timestamptz) - When the event was received
  
  2. Security
    - Enable RLS on `email_webhook_logs` table
    - Add policy for service role to insert webhook logs
    - Add policy for authenticated users to read logs (admin only)
*/

CREATE TABLE IF NOT EXISTS email_webhook_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  event_type text NOT NULL,
  event_data jsonb NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE email_webhook_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service role can insert webhook logs"
  ON email_webhook_logs
  FOR INSERT
  TO service_role
  WITH CHECK (true);

CREATE POLICY "Authenticated users can read webhook logs"
  ON email_webhook_logs
  FOR SELECT
  TO authenticated
  USING (true);

CREATE INDEX IF NOT EXISTS idx_email_webhook_logs_event_type ON email_webhook_logs(event_type);
CREATE INDEX IF NOT EXISTS idx_email_webhook_logs_created_at ON email_webhook_logs(created_at DESC);
