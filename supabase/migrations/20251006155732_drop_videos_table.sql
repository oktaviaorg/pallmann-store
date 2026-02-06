/*
  # Drop videos table

  1. Changes
    - Drop the videos table and all associated data
    - This removes the video content management functionality from the application

  2. Notes
    - This action is irreversible and will delete all video records
    - No data migration needed as feature is being removed
*/

DROP TABLE IF EXISTS videos CASCADE;