/*
  # Add updated_at field to articles table
  
  1. Changes
    - Add `updated_at` column to `articles` table
    - Set default value to `now()` for existing records
    - Create trigger to automatically update `updated_at` on record modification
  
  2. Purpose
    - Track when articles are modified (SEO best practice 2025/2026)
    - Enable `dateModified` in Schema.org structured data
    - Improve content freshness signals for search engines
*/

-- Add updated_at column if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'articles' AND column_name = 'updated_at'
  ) THEN
    ALTER TABLE articles ADD COLUMN updated_at timestamptz DEFAULT now();
    
    -- Set updated_at to created_at for existing records
    UPDATE articles SET updated_at = created_at WHERE updated_at IS NULL;
  END IF;
END $$;

-- Create or replace function to automatically update updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Drop trigger if exists and recreate it
DROP TRIGGER IF EXISTS update_articles_updated_at ON articles;

CREATE TRIGGER update_articles_updated_at
  BEFORE UPDATE ON articles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();