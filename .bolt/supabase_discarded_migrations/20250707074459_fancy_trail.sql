/*
  # Add service area relationship to form submissions

  1. Changes
    - Add service_area_id field to form_submissions table if it doesn't exist
    - Create function to automatically determine service area based on postal code
    - Add trigger to update service_area_id field automatically
    
  2. Security
    - Function runs with security definer
    - Only processes form submissions
*/

-- Add service_area_id field to form_submissions if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_schema = 'public' 
    AND table_name = 'form_submissions' 
    AND column_name = 'service_area_id'
  ) THEN
    ALTER TABLE form_submissions ADD COLUMN service_area_id uuid REFERENCES service_areas(id);
  END IF;
END $$;

-- Create function to determine service area based on postal code
CREATE OR REPLACE FUNCTION determine_service_area()
RETURNS TRIGGER AS $$
DECLARE
  prefix text;
  matching_area_id uuid;
BEGIN
  -- Extract the first two digits of the postal code as the prefix
  IF NEW.postal_code IS NOT NULL AND length(NEW.postal_code) >= 2 THEN
    prefix := substring(NEW.postal_code from 1 for 2);
    
    -- Find matching service area
    SELECT id INTO matching_area_id
    FROM service_areas
    WHERE postal_code_prefix = prefix
    AND is_active = true
    LIMIT 1;
    
    -- Update service_area_id if a match is found
    IF matching_area_id IS NOT NULL THEN
      NEW.service_area_id := matching_area_id;
    END IF;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for form_submissions table
DROP TRIGGER IF EXISTS update_service_area_trigger ON form_submissions;
CREATE TRIGGER update_service_area_trigger
  BEFORE INSERT OR UPDATE ON form_submissions
  FOR EACH ROW
  EXECUTE FUNCTION determine_service_area();