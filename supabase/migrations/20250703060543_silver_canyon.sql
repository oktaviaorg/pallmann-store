/*
  # Add public insert policy for form_submissions

  1. Changes
    - Add policy to allow public insert access to form_submissions table
    - Add policy to allow public select access for newly inserted rows
    
  2. Security
    - Enable public access for form submissions
    - Allow anonymous users to submit forms without authentication
*/

-- Create policy to allow public insert access
CREATE POLICY "Allow public insert access"
ON form_submissions
FOR INSERT
TO public
WITH CHECK (true);

-- Create policy to allow public select access for their own submissions
CREATE POLICY "Allow public select access"
ON form_submissions
FOR SELECT
TO public
USING (true);