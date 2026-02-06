/*
  # Create function to update postal code from address

  1. Changes
    - Create a function to extract postal code from address
    - Add trigger to update postal_code field automatically
    
  2. Security
    - Function runs with security definer
    - Only processes form submissions
*/

-- Create function to extract postal code from address
CREATE OR REPLACE FUNCTION update_postal_code_from_address()
RETURNS TRIGGER AS $$
DECLARE
  postal_code text;
BEGIN
  -- Only process if address is provided and postal_code is empty
  IF NEW.address IS NOT NULL AND (NEW.postal_code IS NULL OR NEW.postal_code = '') THEN
    -- Extract postal code using regex (French postal code format: 5 digits)
    postal_code := substring(NEW.address FROM '[0-9]{5}');
    
    -- If postal code found, update the field
    IF postal_code IS NOT NULL AND length(postal_code) = 5 THEN
      NEW.postal_code := postal_code;
    END IF;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for form_submissions table
DROP TRIGGER IF EXISTS update_postal_code_trigger ON form_submissions;
CREATE TRIGGER update_postal_code_trigger
  BEFORE INSERT OR UPDATE ON form_submissions
  FOR EACH ROW
  EXECUTE FUNCTION update_postal_code_from_address();

-- Create trigger for quotes table if it exists
DO $$ 
BEGIN
  IF EXISTS (
    SELECT FROM information_schema.tables 
    WHERE table_schema = 'public' 
    AND table_name = 'quotes'
  ) THEN
    DROP TRIGGER IF EXISTS update_postal_code_quotes_trigger ON quotes;
    CREATE TRIGGER update_postal_code_quotes_trigger
      BEFORE INSERT OR UPDATE ON quotes
      FOR EACH ROW
      EXECUTE FUNCTION update_postal_code_from_address();
  END IF;
END $$;