-- Système de parrainage Pallmann Store
-- "Parrainez un ami : il obtient -10% sur sa 1ère commande, vous recevez 10€ de crédit après son achat."

-- Table des codes de parrainage (un code par parrain)
CREATE TABLE IF NOT EXISTS referral_codes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code VARCHAR(10) UNIQUE NOT NULL,
  owner_email VARCHAR(255) NOT NULL,
  owner_name VARCHAR(255),
  uses_count INTEGER DEFAULT 0,
  total_earned DECIMAL(10,2) DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table des utilisations de parrainage
CREATE TABLE IF NOT EXISTS referral_uses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  referral_code_id UUID REFERENCES referral_codes(id),
  referee_email VARCHAR(255) NOT NULL,
  referee_name VARCHAR(255),
  order_id UUID,
  order_total DECIMAL(10,2),
  discount_percent INTEGER DEFAULT 10,
  discount_applied DECIMAL(10,2),
  credit_to_owner DECIMAL(10,2) DEFAULT 10.00,
  credit_paid BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table des crédits disponibles (pour les parrains)
CREATE TABLE IF NOT EXISTS referral_credits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  remaining DECIMAL(10,2) NOT NULL,
  source_referral_use_id UUID REFERENCES referral_uses(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index pour recherche rapide
CREATE INDEX IF NOT EXISTS idx_referral_codes_code ON referral_codes(code);
CREATE INDEX IF NOT EXISTS idx_referral_codes_email ON referral_codes(owner_email);
CREATE INDEX IF NOT EXISTS idx_referral_credits_email ON referral_credits(email);

-- Activer RLS
ALTER TABLE referral_codes ENABLE ROW LEVEL SECURITY;
ALTER TABLE referral_uses ENABLE ROW LEVEL SECURITY;
ALTER TABLE referral_credits ENABLE ROW LEVEL SECURITY;

-- Policies pour lecture publique des codes
CREATE POLICY "Allow public read referral_codes" ON referral_codes FOR SELECT USING (true);
CREATE POLICY "Allow public insert referral_codes" ON referral_codes FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update referral_codes" ON referral_codes FOR UPDATE USING (true);

CREATE POLICY "Allow public read referral_uses" ON referral_uses FOR SELECT USING (true);
CREATE POLICY "Allow public insert referral_uses" ON referral_uses FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update referral_uses" ON referral_uses FOR UPDATE USING (true);

CREATE POLICY "Allow public read referral_credits" ON referral_credits FOR SELECT USING (true);
CREATE POLICY "Allow public insert referral_credits" ON referral_credits FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update referral_credits" ON referral_credits FOR UPDATE USING (true);
