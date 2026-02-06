/*
  # Create service areas table

  1. New Tables
    - `service_areas`
      - `id` (uuid, primary key)
      - `city` (text, required)
      - `region` (text, required)
      - `postal_code_prefix` (text, required)
      - `is_active` (boolean, default true)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS
    - Add policies for admin and public access
*/

-- Create service areas table if it doesn't exist
CREATE TABLE IF NOT EXISTS service_areas (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  city text NOT NULL,
  region text NOT NULL,
  postal_code_prefix text NOT NULL,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE service_areas ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Allow admin write access"
  ON service_areas
  FOR ALL
  TO authenticated
  USING (is_admin())
  WITH CHECK (is_admin());

CREATE POLICY "Allow public read access"
  ON service_areas
  FOR SELECT
  TO public
  USING (true);

-- Add foreign key to form_submissions if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_schema = 'public' 
    AND table_name = 'form_submissions' 
    AND column_name = 'service_area_id'
  ) THEN
    ALTER TABLE form_submissions ADD COLUMN service_area_id uuid REFERENCES service_areas(id);
  END IF;
END $$;

-- Insert some initial service areas
INSERT INTO service_areas (city, region, postal_code_prefix, is_active)
VALUES 
  ('Colmar', 'Alsace', '68', true),
  ('Strasbourg', 'Alsace', '67', true),
  ('Mulhouse', 'Alsace', '68', true),
  ('Belfort', 'Franche-Comté', '90', true),
  ('Sarrebourg', 'Lorraine', '57', true)
ON CONFLICT DO NOTHING;