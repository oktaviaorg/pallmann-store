-- Tables Supabase pour Pallmann Store
-- À exécuter dans Supabase SQL Editor

-- =============================================
-- Table : pro_requests (demandes inscription PRO)
-- =============================================
CREATE TABLE IF NOT EXISTS pro_requests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  company_name TEXT NOT NULL,
  siret VARCHAR(14) NOT NULL,
  contact_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  address TEXT,
  city TEXT,
  postal_code VARCHAR(10),
  message TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  notes TEXT, -- Notes internes
  approved_at TIMESTAMP WITH TIME ZONE,
  approved_by TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index pour recherches fréquentes
CREATE INDEX IF NOT EXISTS idx_pro_requests_status ON pro_requests(status);
CREATE INDEX IF NOT EXISTS idx_pro_requests_email ON pro_requests(email);
CREATE INDEX IF NOT EXISTS idx_pro_requests_siret ON pro_requests(siret);
CREATE INDEX IF NOT EXISTS idx_pro_requests_created_at ON pro_requests(created_at DESC);

-- RLS (Row Level Security)
ALTER TABLE pro_requests ENABLE ROW LEVEL SECURITY;

-- Politique : insertion publique (formulaire)
CREATE POLICY "Allow public insert on pro_requests" ON pro_requests
  FOR INSERT WITH CHECK (true);

-- Politique : lecture admin seulement (à adapter selon votre auth)
CREATE POLICY "Allow authenticated read on pro_requests" ON pro_requests
  FOR SELECT USING (auth.role() = 'authenticated');

-- =============================================
-- Table : quote_requests (demandes de devis)
-- =============================================
CREATE TABLE IF NOT EXISTS quote_requests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  products JSONB NOT NULL, -- Liste des produits [{id, name, quantity, price_ht}]
  company_name TEXT,
  contact_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  address TEXT,
  city TEXT,
  postal_code VARCHAR(10),
  message TEXT,
  total_ht DECIMAL(10,2), -- Total estimé HT
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'quoted', 'accepted', 'rejected', 'expired')),
  quote_number VARCHAR(50), -- Numéro de devis attribué
  quoted_at TIMESTAMP WITH TIME ZONE,
  quoted_by TEXT,
  notes TEXT, -- Notes internes
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index pour recherches fréquentes
CREATE INDEX IF NOT EXISTS idx_quote_requests_status ON quote_requests(status);
CREATE INDEX IF NOT EXISTS idx_quote_requests_email ON quote_requests(email);
CREATE INDEX IF NOT EXISTS idx_quote_requests_created_at ON quote_requests(created_at DESC);

-- RLS (Row Level Security)
ALTER TABLE quote_requests ENABLE ROW LEVEL SECURITY;

-- Politique : insertion publique (formulaire)
CREATE POLICY "Allow public insert on quote_requests" ON quote_requests
  FOR INSERT WITH CHECK (true);

-- Politique : lecture admin seulement
CREATE POLICY "Allow authenticated read on quote_requests" ON quote_requests
  FOR SELECT USING (auth.role() = 'authenticated');

-- =============================================
-- Table : company_codes (codes promo PRO) - si pas déjà existante
-- =============================================
CREATE TABLE IF NOT EXISTS company_codes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  code VARCHAR(50) UNIQUE NOT NULL,
  company_name TEXT NOT NULL,
  discount_percent DECIMAL(5,2) NOT NULL CHECK (discount_percent >= 0 AND discount_percent <= 100),
  is_active BOOLEAN DEFAULT true,
  contact_email TEXT,
  contact_phone TEXT,
  notes TEXT,
  usage_count INTEGER DEFAULT 0,
  last_used_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  expires_at TIMESTAMP WITH TIME ZONE
);

CREATE INDEX IF NOT EXISTS idx_company_codes_code ON company_codes(code);
CREATE INDEX IF NOT EXISTS idx_company_codes_active ON company_codes(is_active);

-- RLS
ALTER TABLE company_codes ENABLE ROW LEVEL SECURITY;

-- Politique : lecture publique des codes actifs (pour validation)
CREATE POLICY "Allow public read active company_codes" ON company_codes
  FOR SELECT USING (is_active = true);

-- =============================================
-- Fonction : mise à jour automatique updated_at
-- =============================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers pour updated_at
DROP TRIGGER IF EXISTS update_pro_requests_updated_at ON pro_requests;
CREATE TRIGGER update_pro_requests_updated_at
  BEFORE UPDATE ON pro_requests
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_quote_requests_updated_at ON quote_requests;
CREATE TRIGGER update_quote_requests_updated_at
  BEFORE UPDATE ON quote_requests
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =============================================
-- Vérification
-- =============================================
SELECT 
  table_name, 
  (SELECT COUNT(*) FROM information_schema.columns WHERE table_name = t.table_name) as columns_count
FROM information_schema.tables t
WHERE table_schema = 'public' 
  AND table_name IN ('pro_requests', 'quote_requests', 'company_codes')
ORDER BY table_name;
