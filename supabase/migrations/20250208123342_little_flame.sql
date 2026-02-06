/*
  # Create form submissions table

  1. New Tables
    - `form_submissions`
      - `id` (uuid, primary key)
      - `surface` (numeric)
      - `service_type` (text)
      - `finish_type` (text)
      - `full_name` (text)
      - `phone` (text)
      - `email` (text)
      - `postal_code` (text)
      - `message` (text)
      - `property_type` (text)
      - `has_elevator` (boolean)
      - `contact_preference` (text)
      - `preferred_time` (text)
      - `teinture` (boolean)
      - `finition` (text)
      - `created_at` (timestamptz)
  
  2. Security
    - Enable RLS on `form_submissions` table
    - Add policy for service to insert submissions
*/

CREATE TABLE IF NOT EXISTS form_submissions (
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
  contact_preference text,
  preferred_time text,
  teinture boolean DEFAULT false,
  finition text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE form_submissions ENABLE ROW LEVEL SECURITY;

-- Allow any client to insert submissions
CREATE POLICY "Allow anonymous submissions" ON form_submissions
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Only allow admins to read submissions
CREATE POLICY "Allow admin read" ON form_submissions
  FOR SELECT
  TO authenticated
  USING (auth.role() = 'admin');