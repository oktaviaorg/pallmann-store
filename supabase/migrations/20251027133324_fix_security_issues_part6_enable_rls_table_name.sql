/*
  # Fix Security Issues - Part 6: Enable RLS on table_name

  1. Changes
    - Check if table_name exists and enable RLS
    - Add restrictive RLS policy
    
  2. Security
    - Prevents unauthorized access to table_name
*/

-- Enable RLS on table_name if it exists
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.tables 
    WHERE table_schema = 'public' 
    AND table_name = 'table_name'
  ) THEN
    ALTER TABLE table_name ENABLE ROW LEVEL SECURITY;
    
    -- Add restrictive policy - only admin can access
    CREATE POLICY "Admin only access"
      ON table_name
      FOR ALL
      TO authenticated
      USING (
        EXISTS (
          SELECT 1 FROM auth.users
          WHERE id = (SELECT auth.uid())
          AND raw_app_meta_data->>'role' = 'admin'
        )
      );
  END IF;
END $$;
