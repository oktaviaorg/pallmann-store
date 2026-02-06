/*
  # Create documents table for downloadable files

  1. New Tables
    - `documents`
      - `id` (uuid, primary key)
      - `title` (text, not null)
      - `description` (text)
      - `category` (text, not null)
      - `file_url` (text, not null)
      - `file_size` (integer)
      - `file_type` (text)
      - `download_count` (integer, default 0)
      - `created_at` (timestamp with time zone, default now())
      - `updated_at` (timestamp with time zone, default now())
  
  2. Security
    - Enable RLS on `documents` table
    - Add policy for public to read documents
    - Add policy for admins to manage documents
*/

-- Create documents table
CREATE TABLE IF NOT EXISTS documents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  category text NOT NULL,
  file_url text NOT NULL,
  file_size integer,
  file_type text,
  download_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;

-- Create policy for public to read documents
CREATE POLICY "Allow public read access to documents" 
  ON documents
  FOR SELECT
  TO public
  USING (true);

-- Create policy for admins to manage documents
CREATE POLICY "Allow admin write access to documents" 
  ON documents
  USING (is_admin())
  WITH CHECK (is_admin());

-- Create trigger to update updated_at column
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_documents_updated_at
BEFORE UPDATE ON documents
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- Create function to increment download count
CREATE OR REPLACE FUNCTION increment_document_download_count(document_id uuid)
RETURNS void AS $$
BEGIN
  UPDATE documents
  SET download_count = download_count + 1
  WHERE id = document_id;
END;
$$ LANGUAGE plpgsql;