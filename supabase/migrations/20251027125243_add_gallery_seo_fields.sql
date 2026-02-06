/*
  # Add SEO fields to gallery_photos table

  1. Changes
    - Add `title` column for image title
    - Add `description` column for SEO-optimized description
    - Add `city` column for Alsace city name (Strasbourg, Colmar, Mulhouse, etc.)
    
  2. Purpose
    - Improve local SEO by adding city-specific information
    - Add detailed descriptions for better search engine visibility
    - Enable structured data for images
*/

-- Add new columns to gallery_photos table
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'gallery_photos' AND column_name = 'title'
  ) THEN
    ALTER TABLE gallery_photos ADD COLUMN title text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'gallery_photos' AND column_name = 'description'
  ) THEN
    ALTER TABLE gallery_photos ADD COLUMN description text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'gallery_photos' AND column_name = 'city'
  ) THEN
    ALTER TABLE gallery_photos ADD COLUMN city text;
  END IF;
END $$;
