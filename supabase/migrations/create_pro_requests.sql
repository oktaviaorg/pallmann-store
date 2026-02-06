-- Create pro_requests table
CREATE TABLE IF NOT EXISTS pro_requests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  company_name TEXT NOT NULL,
  siret TEXT NOT NULL,
  contact_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  address TEXT,
  city TEXT,
  postal_code TEXT,
  message TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  discount_code TEXT,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_pro_requests_email ON pro_requests(email);
CREATE INDEX IF NOT EXISTS idx_pro_requests_siret ON pro_requests(siret);
CREATE INDEX IF NOT EXISTS idx_pro_requests_status ON pro_requests(status);

-- Enable RLS
ALTER TABLE pro_requests ENABLE ROW LEVEL SECURITY;

-- Allow inserts from anon (for public form submissions)
CREATE POLICY "Allow public inserts" ON pro_requests
  FOR INSERT TO anon
  WITH CHECK (true);

-- Allow service role full access
CREATE POLICY "Service role full access" ON pro_requests
  FOR ALL TO service_role
  USING (true)
  WITH CHECK (true);

-- Update updated_at on row update
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_pro_requests_updated_at
  BEFORE UPDATE ON pro_requests
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
