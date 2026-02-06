/*
  # Fix authentication system

  1. Changes
    - Drop existing trigger first
    - Drop function with CASCADE to handle dependencies
    - Recreate function with updated logic
    - Create new trigger
    - Add helper functions for role checking

  2. Security
    - Maintain SECURITY DEFINER
    - Set proper search paths
    - Keep role-based access control
*/

-- First drop the trigger
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- Then drop the function with CASCADE to handle dependencies
DROP FUNCTION IF EXISTS handle_new_user() CASCADE;

-- Create function to set user role on sign up
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS trigger AS $$
BEGIN
  -- Set role based on email
  IF NEW.email = 'julien@renoline.fr' THEN
    NEW.raw_user_meta_data = jsonb_set(
      COALESCE(NEW.raw_user_meta_data, '{}'::jsonb),
      '{role}',
      '"admin"'
    );
  ELSE
    NEW.raw_user_meta_data = jsonb_set(
      COALESCE(NEW.raw_user_meta_data, '{}'::jsonb),
      '{role}',
      '"user"'
    );
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create new trigger
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- Ensure get_user_role function exists
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

-- Ensure is_admin function exists
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