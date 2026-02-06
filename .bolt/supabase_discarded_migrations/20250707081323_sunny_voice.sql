/*
  # Fix service areas policy conflict

  1. Changes
    - Check if policy exists before creating it
    - Use conditional logic to avoid duplicate policy errors
    - Maintain existing functionality
    
  2. Security
    - Preserve admin access control
    - Maintain public read access
*/

-- Drop the policy if it exists to avoid conflicts
DROP POLICY IF EXISTS "Allow admin write access" ON service_areas;

-- Create the policy with a unique name to avoid conflicts
CREATE POLICY "admin_write_access_20250708"
  ON service_areas
  FOR ALL
  TO authenticated
  USING (is_admin())
  WITH CHECK (is_admin());

-- Ensure public read access policy exists
DROP POLICY IF EXISTS "Allow public read access" ON service_areas;
CREATE POLICY "public_read_access_20250708"
  ON service_areas
  FOR SELECT
  TO public
  USING (true);