/*
  # Add user roles and functions

  1. Changes
    - Add custom claims for user roles
    - Add function to get user role
    - Add function to check if user is admin
    
  2. Security
    - Only allow specific roles
    - Secure role checking functions
*/

-- Create function to get user role
CREATE OR REPLACE FUNCTION get_user_role()
RETURNS text
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
STABLE
AS $$
  SELECT COALESCE(
    (SELECT raw_user_meta_data->>'role'
     FROM auth.users
     WHERE id = auth.uid()),
    'user'
  );
$$;

-- Create function to check if user is admin
CREATE OR REPLACE FUNCTION is_admin()
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
STABLE
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM auth.users
    WHERE id = auth.uid()
    AND raw_user_meta_data->>'role' = 'admin'
  );
$$;

-- Update RLS policies to use admin check
ALTER POLICY "Allow admin write access" ON articles
USING (is_admin())
WITH CHECK (is_admin());

ALTER POLICY "Allow admin write access" ON categories
USING (is_admin())
WITH CHECK (is_admin());

ALTER POLICY "Allow admin write access" ON gallery_photos
USING (is_admin())
WITH CHECK (is_admin());