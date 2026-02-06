/*
  # Add support for locally hosted videos
  
  1. Changes to youtube_videos table
    - Add `video_type` column to distinguish between YouTube and local videos
    - Add `storage_url` column for Supabase Storage video URLs
    - Make `video_id` nullable for local videos
    - Add `video_url` column for permanent storage URLs
  
  2. Purpose
    - Support both YouTube videos and videos hosted on Supabase Storage
    - Maintain backward compatibility with existing YouTube videos
    - Enable better SEO and engagement with local video content
*/

-- Add new columns to support local videos
DO $$ 
BEGIN
  -- Add video_type column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'youtube_videos' AND column_name = 'video_type'
  ) THEN
    ALTER TABLE youtube_videos 
    ADD COLUMN video_type text NOT NULL DEFAULT 'youtube' CHECK (video_type IN ('youtube', 'local'));
  END IF;

  -- Add storage_url column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'youtube_videos' AND column_name = 'storage_url'
  ) THEN
    ALTER TABLE youtube_videos 
    ADD COLUMN storage_url text;
  END IF;

  -- Add video_url column for permanent URLs if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'youtube_videos' AND column_name = 'video_url'
  ) THEN
    ALTER TABLE youtube_videos 
    ADD COLUMN video_url text;
  END IF;

  -- Add slug column for SEO-friendly URLs if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'youtube_videos' AND column_name = 'slug'
  ) THEN
    ALTER TABLE youtube_videos 
    ADD COLUMN slug text;
  END IF;

  -- Add meta_title for SEO if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'youtube_videos' AND column_name = 'meta_title'
  ) THEN
    ALTER TABLE youtube_videos 
    ADD COLUMN meta_title text;
  END IF;

  -- Add meta_description for SEO if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'youtube_videos' AND column_name = 'meta_description'
  ) THEN
    ALTER TABLE youtube_videos 
    ADD COLUMN meta_description text;
  END IF;

  -- Add keywords for SEO if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'youtube_videos' AND column_name = 'keywords'
  ) THEN
    ALTER TABLE youtube_videos 
    ADD COLUMN keywords text[];
  END IF;
END $$;

-- Make video_id nullable for local videos
ALTER TABLE youtube_videos ALTER COLUMN video_id DROP NOT NULL;

-- Add index for slug for faster lookups
CREATE INDEX IF NOT EXISTS idx_youtube_videos_slug ON youtube_videos(slug);

-- Add index for video_type for filtering
CREATE INDEX IF NOT EXISTS idx_youtube_videos_type ON youtube_videos(video_type);