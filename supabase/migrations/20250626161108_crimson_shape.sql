/*
  # Add quotes table for storing quote requests

  1. New Tables
    - `quotes`
      - `id` (uuid, primary key)
      - `surface` (numeric, required)
      - `property_type` (text, required)
      - `name` (text, required)
      - `email` (text, required)
      - `phone` (text, required)
      - `address` (text, required)
      - `message` (text, optional)
      - `status` (text, default 'pending')
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
      - `service_id` (text, optional)
      - `option_id` (text, optional)
      - `quote_number` (text, unique)
      - `amount` (numeric, default 0)

  2. Security
    - Enable RLS
    - Add policies for admin and user access
*/

-- Check if quotes table exists before creating it
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'quotes') THEN
    -- Create quotes table
    CREATE TABLE quotes (
      id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      surface numeric NOT NULL CHECK (surface > 0),
      property_type text NOT NULL CHECK (property_type IN ('maison', 'appartement')),
      name text NOT NULL,
      email text NOT NULL,
      phone text NOT NULL,
      address text NOT NULL,
      message text,
      status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'sent', 'accepted', 'rejected')),
      created_at timestamptz DEFAULT now(),
      updated_at timestamptz DEFAULT now(),
      service_id text,
      option_id text,
      quote_number text UNIQUE,
      amount numeric NOT NULL DEFAULT 0
    );
  END IF;
END $$;

-- Enable RLS if not already enabled
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_tables 
    WHERE schemaname = 'public' 
    AND tablename = 'quotes' 
    AND rowsecurity = true
  ) THEN
    ALTER TABLE quotes ENABLE ROW LEVEL SECURITY;
  END IF;
END $$;

-- Create trigger for updated_at if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger 
    WHERE tgname = 'update_quotes_updated_at'
  ) THEN
    CREATE TRIGGER update_quotes_updated_at
      BEFORE UPDATE ON quotes
      FOR EACH ROW
      EXECUTE FUNCTION update_updated_at_column();
  END IF;
END $$;

-- Drop existing policies to avoid conflicts
DROP POLICY IF EXISTS "Admin can read all quotes" ON quotes;
DROP POLICY IF EXISTS "Users can read their own quotes" ON quotes;
DROP POLICY IF EXISTS "Users can create quotes" ON quotes;

-- Create policies
CREATE POLICY "Admin can read all quotes"
  ON quotes
  FOR SELECT
  TO authenticated
  USING ((auth.jwt() ->> 'role') = 'admin');

CREATE POLICY "Users can read their own quotes"
  ON quotes
  FOR SELECT
  TO authenticated
  USING (email = (auth.jwt() ->> 'email'));

CREATE POLICY "Users can create quotes"
  ON quotes
  FOR INSERT
  TO authenticated
  WITH CHECK (true);