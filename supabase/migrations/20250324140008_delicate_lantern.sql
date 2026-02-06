/*
  # Add photo gallery management

  1. New Tables
    - `gallery_photos`
      - `id` (uuid, primary key)
      - `url` (text, required)
      - `order` (integer, required)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS
    - Add policies for admin access
*/

-- Create gallery photos table
CREATE TABLE gallery_photos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  url text NOT NULL,
  "order" integer NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE gallery_photos ENABLE ROW LEVEL SECURITY;

-- Add policies
CREATE POLICY "Allow public read access" ON gallery_photos
  FOR SELECT TO public
  USING (true);

CREATE POLICY "Allow admin write access" ON gallery_photos
  FOR ALL TO authenticated
  USING (auth.role() = 'admin')
  WITH CHECK (auth.role() = 'admin');

-- Insert initial photos
INSERT INTO gallery_photos (url, "order") VALUES
  ('https://lh3.googleusercontent.com/p/AF1QipNV_fCrjt20Vck5Sg8LeDOKqUChl0u68D3yOKkH=s1360-w1360-h1020', 1),
  ('https://assets.zyrosite.com/m7VweGeg6kCD8GLq/20230802_134203-mv0D1qqOeWHogpxz.jpg', 2),
  ('https://assets.zyrosite.com/m7VweGeg6kCD8GLq/img_1036-m7V5pJGVMJhoW2ov.jpg', 3),
  ('https://lh3.googleusercontent.com/p/AF1QipOxK30NIClbNXlj8Qxjbdn0Y_VJQSXniir5rM0d=s1360-w1360-h1020', 4);