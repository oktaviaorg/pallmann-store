/*
  # Create YouTube Videos Table

  1. New Tables
    - `youtube_videos`
      - `id` (uuid, primary key)
      - `title` (text) - Video title
      - `description` (text) - Video description
      - `video_id` (text) - YouTube video ID
      - `thumbnail_url` (text) - Video thumbnail URL
      - `duration` (text) - Video duration (e.g., "10:25")
      - `views` (text) - Number of views (e.g., "1.2K")
      - `category` (text) - Category: Tutoriels, Avant/Après, Conseils, Coulisses
      - `playlist_name` (text, nullable) - Optional playlist name
      - `is_featured` (boolean) - Whether video is featured
      - `order_index` (integer) - Display order
      - `published_at` (timestamptz) - Publication date
      - `created_at` (timestamptz) - Record creation date

  2. Security
    - Enable RLS on `youtube_videos` table
    - Add policy for public read access (videos are public content)
    - Add policy for authenticated admin users to manage videos
*/

CREATE TABLE IF NOT EXISTS youtube_videos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text DEFAULT '',
  video_id text NOT NULL UNIQUE,
  thumbnail_url text DEFAULT '',
  duration text DEFAULT '',
  views text DEFAULT '',
  category text NOT NULL CHECK (category IN ('Tutoriels', 'Avant/Après', 'Conseils', 'Coulisses')),
  playlist_name text,
  is_featured boolean DEFAULT false,
  order_index integer DEFAULT 0,
  published_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE youtube_videos ENABLE ROW LEVEL SECURITY;

-- Public read access (everyone can view videos)
CREATE POLICY "Anyone can view youtube videos"
  ON youtube_videos
  FOR SELECT
  TO public
  USING (true);

-- Only authenticated users can insert videos
CREATE POLICY "Authenticated users can insert youtube videos"
  ON youtube_videos
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Only authenticated users can update videos
CREATE POLICY "Authenticated users can update youtube videos"
  ON youtube_videos
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Only authenticated users can delete videos
CREATE POLICY "Authenticated users can delete youtube videos"
  ON youtube_videos
  FOR DELETE
  TO authenticated
  USING (true);

-- Create index for better query performance
CREATE INDEX IF NOT EXISTS idx_youtube_videos_category ON youtube_videos(category);
CREATE INDEX IF NOT EXISTS idx_youtube_videos_featured ON youtube_videos(is_featured);
CREATE INDEX IF NOT EXISTS idx_youtube_videos_order ON youtube_videos(order_index);