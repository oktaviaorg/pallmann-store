/*
  # Add newsletter subscribers table

  1. New Tables
    - `newsletter_subscribers`
      - `id` (uuid, primary key)
      - `email` (text, unique)
      - `created_at` (timestamptz)
      - `confirmed` (boolean)
      - `confirmed_at` (timestamptz)
      - `unsubscribed` (boolean)
      - `unsubscribed_at` (timestamptz)

  2. Security
    - Enable RLS
    - Allow public insert for subscription
    - Allow admin read/write access
*/

CREATE TABLE newsletter_subscribers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL UNIQUE,
  created_at timestamptz DEFAULT now(),
  confirmed boolean DEFAULT false,
  confirmed_at timestamptz,
  unsubscribed boolean DEFAULT false,
  unsubscribed_at timestamptz
);

-- Enable RLS
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- Allow public insert
CREATE POLICY "Allow public subscription"
ON newsletter_subscribers
FOR INSERT
TO public
WITH CHECK (true);

-- Allow admin full access
CREATE POLICY "Allow admin full access"
ON newsletter_subscribers
FOR ALL
TO authenticated
USING (auth.role() = 'admin')
WITH CHECK (auth.role() = 'admin');