-- CORRECTION PRIX COLLES - Pallmann Store
-- Les colles sont vendues au CONDITIONNEMENT, pas au kg
-- Formule : prix/kg × kg × 2 = prix HT
-- À exécuter dans Supabase SQL Editor

-- =============================================
-- P4 poche 3,75kg (nouveau produit)
-- =============================================
INSERT INTO pallmann_products (ref, name, slug, price_achat, price_public_ht, unit, description, subcategory_id, published, display_order)
VALUES (
  '087310', 
  'P4 colle poche 3,75kg', 
  'p4-colle-poche-3-75kg', 
  13.09, 
  26.18, 
  'poche 3,75kg', 
  'Colle à parquet monocomposante STP EC1+. Format pratique en poche pour petits chantiers.',
  (SELECT id FROM pallmann_subcategories WHERE slug = 'colle-parquet' LIMIT 1), 
  true,
  10
)
ON CONFLICT (ref) DO UPDATE SET 
  price_achat = 13.09, 
  price_public_ht = 26.18, 
  unit = 'poche 3,75kg',
  name = 'P4 colle poche 3,75kg';

-- =============================================
-- P4 seau 16kg (mise à jour)
-- =============================================
UPDATE pallmann_products 
SET 
  price_achat = 84.00, 
  price_public_ht = 168.00, 
  unit = 'seau 16kg' 
WHERE ref = '073479';

-- =============================================
-- P5 poche 3,75kg (nouveau produit)
-- =============================================
INSERT INTO pallmann_products (ref, name, slug, price_achat, price_public_ht, unit, description, subcategory_id, published, display_order)
VALUES (
  '169107', 
  'P5 colle poche 3,75kg', 
  'p5-colle-poche-3-75kg', 
  23.40, 
  46.80, 
  'poche 3,75kg', 
  'Colle à parquet monocomposante STP EC1+. Haute performance pour parquets massifs et contrecollés.',
  (SELECT id FROM pallmann_subcategories WHERE slug = 'colle-parquet' LIMIT 1), 
  true,
  20
)
ON CONFLICT (ref) DO UPDATE SET 
  price_achat = 23.40, 
  price_public_ht = 46.80, 
  unit = 'poche 3,75kg',
  name = 'P5 colle poche 3,75kg';

-- =============================================
-- P5 seau 16kg (mise à jour)
-- =============================================
UPDATE pallmann_products 
SET 
  price_achat = 89.28, 
  price_public_ht = 178.56, 
  unit = 'seau 16kg' 
WHERE ref = '059679';

-- =============================================
-- P6 seau 16kg (mise à jour)
-- =============================================
UPDATE pallmann_products 
SET 
  price_achat = 103.84, 
  price_public_ht = 207.68, 
  unit = 'seau 16kg' 
WHERE ref = '067689';

-- =============================================
-- P9 seau 16kg (mise à jour)
-- =============================================
UPDATE pallmann_products 
SET 
  price_achat = 80.96, 
  price_public_ht = 161.92, 
  unit = 'seau 16kg' 
WHERE ref = '069953';

-- =============================================
-- Vérification
-- =============================================
SELECT 
  ref, 
  name, 
  price_achat, 
  price_public_ht, 
  unit,
  ROUND(price_public_ht / price_achat, 2) as marge_ratio
FROM pallmann_products 
WHERE name ILIKE '%colle%' OR name ILIKE '%P4%' OR name ILIKE '%P5%' OR name ILIKE '%P6%' OR name ILIKE '%P9%'
ORDER BY name;
