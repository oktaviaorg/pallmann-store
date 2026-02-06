/*
  # Fix Form Submissions RLS Policies

  1. Changes
    - Drop and recreate RLS policies for form_submissions table
    - Ensure anonymous users can insert data
    - Maintain admin-only read access
    - Add explicit security policies

  2. Security
    - Maintain RLS on form_submissions table
    - Allow anonymous users to insert data without restrictions
    - Restrict read access to admin users only
*/

-- First disable RLS temporarily to ensure clean policy setup
ALTER TABLE form_submissions DISABLE ROW LEVEL SECURITY;

-- Drop any existing policies
DROP POLICY IF EXISTS "Enable insert for anonymous users" ON form_submissions;
DROP POLICY IF EXISTS "Enable read for authenticated admins" ON form_submissions;
DROP POLICY IF EXISTS "Allow anonymous submissions" ON form_submissions;
DROP POLICY IF EXISTS "Allow admin read" ON form_submissions;

-- Re-enable RLS
ALTER TABLE form_submissions ENABLE ROW LEVEL SECURITY;

-- Create new, more permissive insert policy for anonymous users
CREATE POLICY "Allow all inserts"
ON form_submissions FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Maintain strict read policy for admins
CREATE POLICY "Admin read only"
ON form_submissions FOR SELECT
TO authenticated
USING (auth.role() = 'admin');