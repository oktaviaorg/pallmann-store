/*
  # Update form submissions table and policies

  1. Changes
    - Drop dependent tables first
    - Recreate form_submissions table
    - Set up RLS policies
    
  2. Security
    - Enable RLS
    - Allow anonymous submissions
    - Restrict read access to admins
*/

-- First drop dependent tables
DROP TABLE IF EXISTS notification_queue CASCADE;

-- Drop and recreate form_submissions
DROP TABLE IF EXISTS form_submissions CASCADE;

CREATE TABLE form_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  surface numeric NOT NULL,
  service_type text NOT NULL,
  finish_type text,
  full_name text NOT NULL,
  phone text NOT NULL,
  email text NOT NULL,
  postal_code text NOT NULL,
  message text,
  property_type text,
  has_elevator boolean,
  teinture boolean DEFAULT false,
  finition text,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE form_submissions ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Allow anonymous submissions"
ON form_submissions FOR INSERT
TO anon
WITH CHECK (true);

CREATE POLICY "Allow admin read"
ON form_submissions FOR SELECT
TO authenticated
USING (auth.role() = 'admin');

-- Recreate notification queue table
CREATE TABLE notification_queue (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  submission_id uuid REFERENCES form_submissions(id),
  recipient text NOT NULL,
  sender text NOT NULL DEFAULT 'Formulaire Poncages <formulaire@poncages.fr>',
  reply_to text,
  subject text NOT NULL,
  body text NOT NULL,
  created_at timestamptz DEFAULT now(),
  processed boolean DEFAULT false,
  processed_at timestamptz,
  error text
);