/*
  # Fix Form Submissions RLS Policy

  1. Changes
    - Drop existing RLS policies for form_submissions table
    - Create new policy to allow anonymous submissions
    - Keep admin read policy

  2. Security
    - Enable RLS on form_submissions table
    - Allow anonymous users to insert data
    - Only allow admins to read submissions
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Allow anonymous submissions" ON form_submissions;
DROP POLICY IF EXISTS "Allow admin read" ON form_submissions;

-- Recreate policies with correct permissions
CREATE POLICY "Enable insert for anonymous users" 
ON form_submissions FOR INSERT 
TO anon
WITH CHECK (true);

CREATE POLICY "Enable read for authenticated admins" 
ON form_submissions FOR SELECT 
TO authenticated
USING (auth.role() = 'admin');