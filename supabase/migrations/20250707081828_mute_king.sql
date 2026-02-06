/*
  # Fix service areas policy conflicts

  1. Changes
    - Drop all existing policies for service_areas table
    - Create new policies with unique timestamped names
    - Ensure no conflicts with existing policies
    
  2. Security
    - Maintain same security rules as before
    - Preserve admin write access
    - Preserve public read access
*/

-- First drop all existing policies to avoid conflicts
DROP POLICY IF EXISTS "Allow admin write access" ON service_areas;
DROP POLICY IF EXISTS "admin_write_access_20250708" ON service_areas;
DROP POLICY IF EXISTS "Allow public read access" ON service_areas;
DROP POLICY IF EXISTS "public_read_access_20250708" ON service_areas;

-- Create the policy with a unique name including timestamp to avoid conflicts
CREATE POLICY "admin_write_access_20250708_123456"
  ON service_areas
  FOR ALL
  TO authenticated
  USING (is_admin())
  WITH CHECK (is_admin());

-- Create public read access policy with unique name
CREATE POLICY "public_read_access_20250708_123456"
  ON service_areas
  FOR SELECT
  TO public
  USING (true);