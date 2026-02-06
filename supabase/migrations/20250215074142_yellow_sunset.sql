/*
  # Add form submissions table

  1. New Tables
    - `form_submissions`
      - `id` (uuid, primary key)
      - `surface` (numeric, required)
      - `service_type` (text, required)
      - `finish_type` (text, nullable)
      - `full_name` (text, required)
      - `phone` (text, required)
      - `email` (text, required)
      - `postal_code` (text, required)
      - `message` (text, nullable)
      - `property_type` (text, nullable)
      - `has_elevator` (boolean, nullable)
      - `teinture` (boolean, default false)
      - `finition` (text, nullable)
      - `created_at` (timestamptz, default now())

  2. Security
    - Enable RLS on `form_submissions` table
    - Add policy for anonymous submissions
    - Add policy for admin read access
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
  teinture boolean DEFAULT false,
  finition text,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE form_submissions ENABLE ROW LEVEL SECURITY;

-- Allow anonymous submissions
CREATE POLICY "Allow anonymous submissions"
ON form_submissions FOR INSERT
TO anon
WITH CHECK (true);

-- Only allow admins to read submissions
CREATE POLICY "Allow admin read"
ON form_submissions FOR SELECT
TO authenticated
USING (auth.role() = 'admin');