/*
  # Create Parquet Analysis Requests Tracking Table

  1. New Tables
    - `parquet_analysis_requests`
      - `id` (uuid, primary key) - Unique identifier
      - `created_at` (timestamptz) - Request timestamp
      - `whatsapp_clicked` (boolean) - Whether WhatsApp button was clicked
      - `page_views` (integer) - Number of times the page was viewed
      - `referrer` (text) - Where the visitor came from
      - `user_agent` (text) - Browser/device info
      
  2. Security
    - Enable RLS on `parquet_analysis_requests` table
    - Add policy for service role to manage data
    - Anon users can insert tracking data
    
  3. Notes
    - This table tracks engagement with the analysis page
    - Helps measure conversion and optimize marketing
*/

CREATE TABLE IF NOT EXISTS parquet_analysis_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now(),
  whatsapp_clicked boolean DEFAULT false,
  page_views integer DEFAULT 1,
  referrer text,
  user_agent text
);

ALTER TABLE parquet_analysis_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow anon to insert tracking data"
  ON parquet_analysis_requests
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Allow service role to read all"
  ON parquet_analysis_requests
  FOR SELECT
  TO service_role
  USING (true);

CREATE INDEX IF NOT EXISTS idx_analysis_requests_created_at ON parquet_analysis_requests(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_analysis_requests_whatsapp ON parquet_analysis_requests(whatsapp_clicked) WHERE whatsapp_clicked = true;
