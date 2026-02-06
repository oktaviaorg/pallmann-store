/*
  # Add analytics fields to articles table

  1. Changes
    - Add `view_count` column to track page impressions
    - Add `click_count` column to track clicks from search results
    - Add `is_popular` boolean to manually mark popular articles
    - Add index on view_count for performance
  
  2. Notes
    - These fields will help track article popularity
    - view_count represents impressions
    - click_count represents clicks from external sources
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'articles' AND column_name = 'view_count'
  ) THEN
    ALTER TABLE articles ADD COLUMN view_count integer DEFAULT 0;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'articles' AND column_name = 'click_count'
  ) THEN
    ALTER TABLE articles ADD COLUMN click_count integer DEFAULT 0;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'articles' AND column_name = 'is_popular'
  ) THEN
    ALTER TABLE articles ADD COLUMN is_popular boolean DEFAULT false;
  END IF;
END $$;

CREATE INDEX IF NOT EXISTS idx_articles_view_count ON articles(view_count DESC);
CREATE INDEX IF NOT EXISTS idx_articles_is_popular ON articles(is_popular) WHERE is_popular = true;