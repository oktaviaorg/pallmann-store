/*
  # Final RLS Policy Fix for Form Submissions

  1. Changes
    - Complete reset of RLS policies
    - Enable public insert access
    - Simplify policy structure
    - Remove role-based restrictions for inserts

  2. Security
    - Allow all public inserts without authentication
    - Maintain admin-only read access
    - Clean up any conflicting policies
*/

-- Temporarily disable RLS
ALTER TABLE form_submissions DISABLE ROW LEVEL SECURITY;

-- Drop ALL existing policies to start fresh
DROP POLICY IF EXISTS "Enable insert for anonymous users" ON form_submissions;
DROP POLICY IF EXISTS "Enable read for authenticated admins" ON form_submissions;
DROP POLICY IF EXISTS "Allow anonymous submissions" ON form_submissions;
DROP POLICY IF EXISTS "Allow admin read" ON form_submissions;
DROP POLICY IF EXISTS "Allow all inserts" ON form_submissions;
DROP POLICY IF EXISTS "Admin read only" ON form_submissions;

-- Re-enable RLS
ALTER TABLE form_submissions ENABLE ROW LEVEL SECURITY;

-- Create a single, simple policy for public inserts
CREATE POLICY "Public insert access"
ON form_submissions
FOR INSERT
TO public
WITH CHECK (true);

-- Create a simple read policy for admins
CREATE POLICY "Admin read access"
ON form_submissions
FOR SELECT
TO authenticated
USING (auth.role() = 'admin');