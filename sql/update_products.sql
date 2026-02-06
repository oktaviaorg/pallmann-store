-- ============================================
-- PALLMANN STORE - Mise à jour complète des produits
-- Exécuter dans Supabase SQL Editor
-- Date: 2025-02-07
-- ============================================

-- Formule prix: Prix public HT = Prix achat par litre × conditionnement × 2
-- Prix TTC = Prix HT × 1.20

-- ============================================
-- 1. VITRIFICATEURS PALL-X
-- ============================================

-- PALL-X 94 mat (5L)
UPDATE pallmann_products SET
  name = 'PALL-X 94 mat 5L',
  price_achat = 13.80,
  price_public_ht = 138.00,
  unit = '5L',
  description = 'Vitrificateur mono composant pour parquet. Usage domestique léger. Aspect mat.'
WHERE ref = '040983';

-- PALL-X 94 satiné (5L)
INSERT INTO pallmann_products (ref, name, slug, price_achat, price_public_ht, unit, description, subcategory_id, published)
SELECT 
  '013269',
  'PALL-X 94 satiné 5L',
  'pall-x-94-satine-5l',
  13.80,
  138.00,
  '5L',
  'Vitrificateur mono composant pour parquet. Usage domestique léger. Aspect satiné.',
  subcategory_id,
  true
FROM pallmann_products WHERE ref = '040983'
ON CONFLICT (ref) DO UPDATE SET
  name = EXCLUDED.name,
  price_achat = EXCLUDED.price_achat,
  price_public_ht = EXCLUDED.price_public_ht,
  unit = EXCLUDED.unit,
  description = EXCLUDED.description;

-- PALL-X 96 mat (5L)
INSERT INTO pallmann_products (ref, name, slug, price_achat, price_public_ht, unit, description, subcategory_id, published)
SELECT 
  '013697',
  'PALL-X 96 mat 5L',
  'pall-x-96-mat-5l',
  20.05,
  200.50,
  '5L',
  'Vitrificateur premium mono-composant pour parquet. Usage intensif. Aspect mat.',
  subcategory_id,
  true
FROM pallmann_products WHERE ref = '040983'
ON CONFLICT (ref) DO UPDATE SET
  name = EXCLUDED.name,
  price_achat = EXCLUDED.price_achat,
  price_public_ht = EXCLUDED.price_public_ht,
  unit = EXCLUDED.unit;

-- PALL-X 96 ORIGINAL satiné (5L)
UPDATE pallmann_products SET
  name = 'PALL-X 96 ORIGINAL satiné 5L',
  price_achat = 20.05,
  price_public_ht = 200.50,
  unit = '5L',
  description = 'Vitrificateur premium mono-composant pour parquet. Usage intensif. Aspect satiné.'
WHERE ref = '013271';

-- PALL-X 96 POWER mat (5L)
UPDATE pallmann_products SET
  name = 'PALL-X 96 POWER mat 5L',
  price_achat = 22.05,
  price_public_ht = 220.50,
  unit = '5L',
  description = 'Vitrificateur premium mono-composant haute résistance. Usage intensif. Aspect mat.'
WHERE ref = '181845';

-- PALL-X 96 POWER satiné (5L)
INSERT INTO pallmann_products (ref, name, slug, price_achat, price_public_ht, unit, description, subcategory_id, published)
SELECT 
  '181844',
  'PALL-X 96 POWER satiné 5L',
  'pall-x-96-power-satine-5l',
  22.05,
  220.50,
  '5L',
  'Vitrificateur premium mono-composant haute résistance. Usage intensif. Aspect satiné.',
  subcategory_id,
  true
FROM pallmann_products WHERE ref = '181845'
ON CONFLICT (ref) DO UPDATE SET
  name = EXCLUDED.name,
  price_achat = EXCLUDED.price_achat,
  price_public_ht = EXCLUDED.price_public_ht,
  unit = EXCLUDED.unit;

-- PALL-X 96 ZERO mat (5L)
UPDATE pallmann_products SET
  name = 'PALL-X 96 ZERO mat 5L',
  price_achat = 22.58,
  price_public_ht = 225.80,
  unit = '5L',
  description = 'Vitrificateur mono-composant sans solvant pour parquet. Usage intensif. Aspect mat.'
WHERE ref = '169408';

-- PALL-X 96 ZERO satiné (5L)
INSERT INTO pallmann_products (ref, name, slug, price_achat, price_public_ht, unit, description, subcategory_id, published)
SELECT 
  '171590',
  'PALL-X 96 ZERO satiné 5L',
  'pall-x-96-zero-satine-5l',
  22.58,
  225.80,
  '5L',
  'Vitrificateur mono-composant sans solvant pour parquet. Usage intensif. Aspect satiné.',
  subcategory_id,
  true
FROM pallmann_products WHERE ref = '169408'
ON CONFLICT (ref) DO UPDATE SET
  name = EXCLUDED.name,
  price_achat = EXCLUDED.price_achat,
  price_public_ht = EXCLUDED.price_public_ht,
  unit = EXCLUDED.unit;

-- PALL-X 98 2K mat (4.95L)
INSERT INTO pallmann_products (ref, name, slug, price_achat, price_public_ht, unit, description, subcategory_id, published)
SELECT 
  '010094',
  'PALL-X 98 2K mat 4.95L',
  'pall-x-98-2k-mat-4-95l',
  27.25,
  269.78,
  '4.95L',
  'Vitrificateur premium bi-composant pour parquet. Très haute résistance. Aspect mat.',
  subcategory_id,
  true
FROM pallmann_products WHERE ref = '010093'
ON CONFLICT (ref) DO UPDATE SET
  name = EXCLUDED.name,
  price_achat = EXCLUDED.price_achat,
  price_public_ht = EXCLUDED.price_public_ht,
  unit = EXCLUDED.unit;

-- PALL-X 98 2K satiné (4.95L)
UPDATE pallmann_products SET
  name = 'PALL-X 98 2K satiné 4.95L',
  price_achat = 27.25,
  price_public_ht = 269.78,
  unit = '4.95L',
  description = 'Vitrificateur premium bi-composant pour parquet. Très haute résistance. Aspect satiné.'
WHERE ref = '010093';

-- PALL-X 98 2K brillant (4.95L)
UPDATE pallmann_products SET
  name = 'PALL-X 98 2K brillant 4.95L',
  price_achat = 27.25,
  price_public_ht = 269.78,
  unit = '4.95L',
  description = 'Vitrificateur premium bi-composant pour parquet. Très haute résistance. Aspect brillant.'
WHERE ref = '010100';

-- PALL-X EXTREME satiné (5L)
INSERT INTO pallmann_products (ref, name, slug, price_achat, price_public_ht, unit, description, subcategory_id, published)
SELECT 
  '069377',
  'PALL-X EXTREME satiné 5L',
  'pall-x-extreme-satine-5l',
  15.23,
  152.30,
  '5L',
  'Vitrificateur mono ou bi composant extra résistant. Aspect satiné.',
  subcategory_id,
  true
FROM pallmann_products WHERE ref = '069379'
ON CONFLICT (ref) DO UPDATE SET
  name = EXCLUDED.name,
  price_achat = EXCLUDED.price_achat,
  price_public_ht = EXCLUDED.price_public_ht,
  unit = EXCLUDED.unit;

-- PALL-X EXTREME mat (5L)
UPDATE pallmann_products SET
  name = 'PALL-X EXTREME mat 5L',
  price_achat = 15.23,
  price_public_ht = 152.30,
  unit = '5L',
  description = 'Vitrificateur mono ou bi composant extra résistant. Aspect mat.'
WHERE ref = '069379';

-- PALL-X TREND 2K mat (4.95L)
UPDATE pallmann_products SET
  name = 'PALL-X TREND 2K mat 4.95L',
  price_achat = 18.70,
  price_public_ht = 185.13,
  unit = '4.95L',
  description = 'Vitrificateur bi-composant pour parquet. Usage professionnel. Aspect mat.'
WHERE ref = '089453';

-- PALL-X TREND 2K satiné (4.95L)
INSERT INTO pallmann_products (ref, name, slug, price_achat, price_public_ht, unit, description, subcategory_id, published)
SELECT 
  '083529',
  'PALL-X TREND 2K satiné 4.95L',
  'pall-x-trend-2k-satine-4-95l',
  18.70,
  185.13,
  '4.95L',
  'Vitrificateur bi-composant pour parquet. Usage professionnel. Aspect satiné.',
  subcategory_id,
  true
FROM pallmann_products WHERE ref = '089453'
ON CONFLICT (ref) DO UPDATE SET
  name = EXCLUDED.name,
  price_achat = EXCLUDED.price_achat,
  price_public_ht = EXCLUDED.price_public_ht,
  unit = EXCLUDED.unit;

-- PALL-X FUTUR mat (5L)
UPDATE pallmann_products SET
  name = 'PALL-X FUTUR mat 5L',
  price_achat = 13.83,
  price_public_ht = 138.30,
  unit = '5L',
  description = 'Vitrificateur mono-composant pour parquet. Usage domestique. Aspect mat.'
WHERE ref = '086268';

-- PALL-X FUTUR satiné (5L)
INSERT INTO pallmann_products (ref, name, slug, price_achat, price_public_ht, unit, description, subcategory_id, published)
SELECT 
  '086375',
  'PALL-X FUTUR satiné 5L',
  'pall-x-futur-satine-5l',
  13.83,
  138.30,
  '5L',
  'Vitrificateur mono-composant pour parquet. Usage domestique. Aspect satiné.',
  subcategory_id,
  true
FROM pallmann_products WHERE ref = '086268'
ON CONFLICT (ref) DO UPDATE SET
  name = EXCLUDED.name,
  price_achat = EXCLUDED.price_achat,
  price_public_ht = EXCLUDED.price_public_ht,
  unit = EXCLUDED.unit;

-- ============================================
-- 2. FONDS DURS
-- ============================================

-- PALL-X 320 fond dur (5L)
UPDATE pallmann_products SET
  name = 'PALL-X 320 fond dur 5L',
  price_achat = 11.50,
  price_public_ht = 115.00,
  unit = '5L',
  description = 'Fond dur pour parquet. Préparation du support avant vitrification.'
WHERE ref = '014289';

-- PALL-X 325 fond dur garnissant (5L)
UPDATE pallmann_products SET
  name = 'PALL-X 325 fond dur garnissant 5L',
  price_achat = 15.48,
  price_public_ht = 154.80,
  unit = '5L',
  description = 'Fond dur premium garnissant pour parquet. Haute qualité de finition.'
WHERE ref = '013952';

-- Ajouter ref 013267 pour PALL-X 325 si différent
INSERT INTO pallmann_products (ref, name, slug, price_achat, price_public_ht, unit, description, subcategory_id, published)
SELECT 
  '013267',
  'PALL-X 325 fond dur garnissant 5L',
  'pall-x-325-fond-dur-5l',
  15.48,
  154.80,
  '5L',
  'Fond dur premium garnissant pour parquet. Haute qualité de finition.',
  subcategory_id,
  true
FROM pallmann_products WHERE ref = '014289'
ON CONFLICT (ref) DO UPDATE SET
  name = EXCLUDED.name,
  price_achat = EXCLUDED.price_achat,
  price_public_ht = EXCLUDED.price_public_ht,
  unit = EXCLUDED.unit;

-- PALL-X 330 PURE fond dur brut (5L)
UPDATE pallmann_products SET
  name = 'PALL-X 330 PURE fond dur brut 5L',
  price_achat = 13.05,
  price_public_ht = 130.50,
  unit = '5L',
  description = 'Fond dur teinté effet brut pour parquet. Aspect naturel.'
WHERE ref = '159665';

-- ============================================
-- 3. HUILES MAGIC OIL
-- ============================================

-- MAGIC OIL 2K Original (2.75L)
UPDATE pallmann_products SET
  name = 'MAGIC OIL 2K Original 2.75L',
  price_achat = 58.73,
  price_public_ht = 323.01,
  unit = '2.75L',
  description = 'Huile bi-composante professionnelle pour parquet. Finition huilée durable.'
WHERE ref = '021283';

-- Ref correcte 021284
INSERT INTO pallmann_products (ref, name, slug, price_achat, price_public_ht, unit, description, subcategory_id, published)
SELECT 
  '021284',
  'MAGIC OIL 2K Original 2.75L',
  'magic-oil-2k-original-2-75l',
  58.73,
  323.01,
  '2.75L',
  'Huile bi-composante professionnelle pour parquet. Finition huilée durable.',
  subcategory_id,
  true
FROM pallmann_products WHERE ref = '021283'
ON CONFLICT (ref) DO UPDATE SET
  name = EXCLUDED.name,
  price_achat = EXCLUDED.price_achat,
  price_public_ht = EXCLUDED.price_public_ht,
  unit = EXCLUDED.unit;

-- MAGIC OIL 2K ERGO monocouche (2.75L)
UPDATE pallmann_products SET
  name = 'MAGIC OIL 2K ERGO monocouche 2.75L',
  price_achat = 64.03,
  price_public_ht = 352.17,
  unit = '2.75L',
  description = 'Huile bi-composante ergonomique pour parquet. Application monocouche facilitée.'
WHERE ref = '068018';

-- Ref correcte 055895
INSERT INTO pallmann_products (ref, name, slug, price_achat, price_public_ht, unit, description, subcategory_id, published)
SELECT 
  '055895',
  'MAGIC OIL 2K ERGO monocouche 2.75L',
  'magic-oil-2k-ergo-2-75l',
  64.03,
  352.17,
  '2.75L',
  'Huile bi-composante ergonomique pour parquet. Application monocouche facilitée.',
  subcategory_id,
  true
FROM pallmann_products WHERE ref = '068018'
ON CONFLICT (ref) DO UPDATE SET
  name = EXCLUDED.name,
  price_achat = EXCLUDED.price_achat,
  price_public_ht = EXCLUDED.price_public_ht,
  unit = EXCLUDED.unit;

-- MAGIC OIL EASY Huile-cire mono (3L)
INSERT INTO pallmann_products (ref, name, slug, price_achat, price_public_ht, unit, description, subcategory_id, published)
SELECT 
  '079521',
  'MAGIC OIL EASY Huile-cire mono 3L',
  'magic-oil-easy-3l',
  24.55,
  147.30,
  '3L',
  'Huile-cire mono-composante pour parquet. Application facile.',
  subcategory_id,
  true
FROM pallmann_products WHERE ref = '021283'
ON CONFLICT (ref) DO UPDATE SET
  name = EXCLUDED.name,
  price_achat = EXCLUDED.price_achat,
  price_public_ht = EXCLUDED.price_public_ht,
  unit = EXCLUDED.unit;

-- MAGIC OIL CARE (5L)
INSERT INTO pallmann_products (ref, name, slug, price_achat, price_public_ht, unit, description, subcategory_id, published)
SELECT 
  '034053',
  'MAGIC OIL CARE 5L',
  'magic-oil-care-5l',
  24.82,
  248.20,
  '5L',
  'Émulsion de soin ravivante pour parquets huilés. Entretien professionnel.',
  (SELECT id FROM pallmann_subcategories WHERE name LIKE '%huilé%' LIMIT 1),
  true
ON CONFLICT (ref) DO UPDATE SET
  name = EXCLUDED.name,
  price_achat = EXCLUDED.price_achat,
  price_public_ht = EXCLUDED.price_public_ht,
  unit = EXCLUDED.unit;

-- ============================================
-- 4. OUTDOOR OIL
-- ============================================

-- OUTDOOR OIL 1K naturel (3L)
INSERT INTO pallmann_products (ref, name, slug, price_achat, price_public_ht, unit, description, subcategory_id, published)
SELECT 
  '081077',
  'OUTDOOR OIL 1K naturel 3L',
  'outdoor-oil-1k-naturel-3l',
  15.18,
  91.08,
  '3L',
  'Saturateur mono-composant pour terrasse bois. Teinte naturelle.',
  (SELECT id FROM pallmann_subcategories WHERE name LIKE '%Outdoor%' LIMIT 1),
  true
ON CONFLICT (ref) DO UPDATE SET
  name = EXCLUDED.name,
  price_achat = EXCLUDED.price_achat,
  price_public_ht = EXCLUDED.price_public_ht,
  unit = EXCLUDED.unit;

-- OUTDOOR OIL 1K teck (3L)
INSERT INTO pallmann_products (ref, name, slug, price_achat, price_public_ht, unit, description, subcategory_id, published)
SELECT 
  '081081',
  'OUTDOOR OIL 1K teck 3L',
  'outdoor-oil-1k-teck-3l',
  15.18,
  91.08,
  '3L',
  'Saturateur mono-composant pour terrasse bois. Teinte teck.',
  (SELECT id FROM pallmann_subcategories WHERE name LIKE '%Outdoor%' LIMIT 1),
  true
ON CONFLICT (ref) DO UPDATE SET
  name = EXCLUDED.name,
  price_achat = EXCLUDED.price_achat,
  price_public_ht = EXCLUDED.price_public_ht,
  unit = EXCLUDED.unit;

-- OUTDOOR OIL 1K bankirai (3L)
INSERT INTO pallmann_products (ref, name, slug, price_achat, price_public_ht, unit, description, subcategory_id, published)
SELECT 
  '081079',
  'OUTDOOR OIL 1K bankirai 3L',
  'outdoor-oil-1k-bankirai-3l',
  15.18,
  91.08,
  '3L',
  'Saturateur mono-composant pour terrasse bois. Teinte bankirai.',
  (SELECT id FROM pallmann_subcategories WHERE name LIKE '%Outdoor%' LIMIT 1),
  true
ON CONFLICT (ref) DO UPDATE SET
  name = EXCLUDED.name,
  price_achat = EXCLUDED.price_achat,
  price_public_ht = EXCLUDED.price_public_ht,
  unit = EXCLUDED.unit;

-- OUTDOOR OIL 1K naturel (10L)
INSERT INTO pallmann_products (ref, name, slug, price_achat, price_public_ht, unit, description, subcategory_id, published)
SELECT 
  '159652',
  'OUTDOOR OIL 1K naturel 10L',
  'outdoor-oil-1k-naturel-10l',
  11.35,
  227.00,
  '10L',
  'Saturateur mono-composant pour terrasse bois. Teinte naturelle. Format économique.',
  (SELECT id FROM pallmann_subcategories WHERE name LIKE '%Outdoor%' LIMIT 1),
  true
ON CONFLICT (ref) DO UPDATE SET
  name = EXCLUDED.name,
  price_achat = EXCLUDED.price_achat,
  price_public_ht = EXCLUDED.price_public_ht,
  unit = EXCLUDED.unit;

-- ============================================
-- 5. COLLES
-- ============================================

-- P4 colle seau (16kg)
UPDATE pallmann_products SET
  name = 'PALLMANN P4 colle 16kg',
  price_achat = 84.00,
  price_public_ht = 168.00,
  unit = 'seau 16kg',
  description = 'Colle à parquet monocomposante prête à l\'emploi. Excellente adhérence.'
WHERE ref = '073479';

-- P5 colle seau (16kg)
UPDATE pallmann_products SET
  name = 'PALLMANN P5 colle 16kg',
  price_achat = 89.28,
  price_public_ht = 178.56,
  unit = 'seau 16kg',
  description = 'Colle à parquet monocomposante premium. Haute performance.'
WHERE ref = '059679';

-- P6 colle seau (16kg)
UPDATE pallmann_products SET
  name = 'PALLMANN P6 colle 16kg',
  price_achat = 103.84,
  price_public_ht = 207.68,
  unit = 'seau 16kg',
  description = 'Colle à parquet STP monocomposante. Très haute performance.'
WHERE ref = '067689';

-- P9 colle seau bicomposante (16kg)
UPDATE pallmann_products SET
  name = 'PALLMANN P9 colle bicomposante 16kg',
  price_achat = 80.96,
  price_public_ht = 161.92,
  unit = 'seau 16kg',
  description = 'Colle à parquet PU bicomposante. Usage professionnel intensif.'
WHERE ref = '069953';

-- ============================================
-- 6. ABRASIFS - Bandes 750×200 (paquet 10p)
-- ============================================

-- Bandes corindon
INSERT INTO pallmann_products (ref, name, slug, price_achat, price_public_ht, unit, description, subcategory_id, published) VALUES
('012621', 'Bande 750x200 corindon gr16 (10p)', 'bande-750x200-corindon-gr16-10p', 61.04, 122.08, 'paquet 10p', 'Bande abrasive corindon grain 16 pour ponceuse parquet. Lot de 10 pièces.', (SELECT id FROM pallmann_subcategories WHERE name LIKE '%Abrasif%' LIMIT 1), true),
('012622', 'Bande 750x200 corindon gr24 (10p)', 'bande-750x200-corindon-gr24-10p', 51.94, 103.88, 'paquet 10p', 'Bande abrasive corindon grain 24 pour ponceuse parquet. Lot de 10 pièces.', (SELECT id FROM pallmann_subcategories WHERE name LIKE '%Abrasif%' LIMIT 1), true),
('012624', 'Bande 750x200 corindon gr36 (10p)', 'bande-750x200-corindon-gr36-10p', 47.39, 94.78, 'paquet 10p', 'Bande abrasive corindon grain 36 pour ponceuse parquet. Lot de 10 pièces.', (SELECT id FROM pallmann_subcategories WHERE name LIKE '%Abrasif%' LIMIT 1), true),
('012625', 'Bande 750x200 corindon gr40 (10p)', 'bande-750x200-corindon-gr40-10p', 45.57, 91.14, 'paquet 10p', 'Bande abrasive corindon grain 40 pour ponceuse parquet. Lot de 10 pièces.', (SELECT id FROM pallmann_subcategories WHERE name LIKE '%Abrasif%' LIMIT 1), true),
('012627', 'Bande 750x200 corindon gr60 (10p)', 'bande-750x200-corindon-gr60-10p', 43.68, 87.36, 'paquet 10p', 'Bande abrasive corindon grain 60 pour ponceuse parquet. Lot de 10 pièces.', (SELECT id FROM pallmann_subcategories WHERE name LIKE '%Abrasif%' LIMIT 1), true),
('012628', 'Bande 750x200 corindon gr80 (10p)', 'bande-750x200-corindon-gr80-10p', 39.00, 78.00, 'paquet 10p', 'Bande abrasive corindon grain 80 pour ponceuse parquet. Lot de 10 pièces.', (SELECT id FROM pallmann_subcategories WHERE name LIKE '%Abrasif%' LIMIT 1), true),
('012629', 'Bande 750x200 corindon gr100 (10p)', 'bande-750x200-corindon-gr100-10p', 38.25, 76.50, 'paquet 10p', 'Bande abrasive corindon grain 100 pour ponceuse parquet. Lot de 10 pièces.', (SELECT id FROM pallmann_subcategories WHERE name LIKE '%Abrasif%' LIMIT 1), true),
('012630', 'Bande 750x200 corindon gr120 (10p)', 'bande-750x200-corindon-gr120-10p', 38.25, 76.50, 'paquet 10p', 'Bande abrasive corindon grain 120 pour ponceuse parquet. Lot de 10 pièces.', (SELECT id FROM pallmann_subcategories WHERE name LIKE '%Abrasif%' LIMIT 1), true)
ON CONFLICT (ref) DO UPDATE SET
  name = EXCLUDED.name,
  price_achat = EXCLUDED.price_achat,
  price_public_ht = EXCLUDED.price_public_ht,
  unit = EXCLUDED.unit,
  description = EXCLUDED.description;

-- Bandes zirconium
INSERT INTO pallmann_products (ref, name, slug, price_achat, price_public_ht, unit, description, subcategory_id, published) VALUES
('011478', 'Bande 750x200 zirconium gr24 (10p)', 'bande-750x200-zirconium-gr24-10p', 74.85, 149.70, 'paquet 10p', 'Bande abrasive zirconium grain 24 pour ponceuse parquet. Lot de 10 pièces. Haute durabilité.', (SELECT id FROM pallmann_subcategories WHERE name LIKE '%Abrasif%' LIMIT 1), true),
('011479', 'Bande 750x200 zirconium gr36 (10p)', 'bande-750x200-zirconium-gr36-10p', 66.85, 133.70, 'paquet 10p', 'Bande abrasive zirconium grain 36 pour ponceuse parquet. Lot de 10 pièces. Haute durabilité.', (SELECT id FROM pallmann_subcategories WHERE name LIKE '%Abrasif%' LIMIT 1), true),
('011480', 'Bande 750x200 zirconium gr40 (10p)', 'bande-750x200-zirconium-gr40-10p', 59.80, 119.60, 'paquet 10p', 'Bande abrasive zirconium grain 40 pour ponceuse parquet. Lot de 10 pièces. Haute durabilité.', (SELECT id FROM pallmann_subcategories WHERE name LIKE '%Abrasif%' LIMIT 1), true),
('011481', 'Bande 750x200 zirconium gr60 (10p)', 'bande-750x200-zirconium-gr60-10p', 57.36, 114.72, 'paquet 10p', 'Bande abrasive zirconium grain 60 pour ponceuse parquet. Lot de 10 pièces. Haute durabilité.', (SELECT id FROM pallmann_subcategories WHERE name LIKE '%Abrasif%' LIMIT 1), true),
('011482', 'Bande 750x200 zirconium gr80 (10p)', 'bande-750x200-zirconium-gr80-10p', 54.70, 109.40, 'paquet 10p', 'Bande abrasive zirconium grain 80 pour ponceuse parquet. Lot de 10 pièces. Haute durabilité.', (SELECT id FROM pallmann_subcategories WHERE name LIKE '%Abrasif%' LIMIT 1), true),
('011483', 'Bande 750x200 zirconium gr100 (10p)', 'bande-750x200-zirconium-gr100-10p', 54.70, 109.40, 'paquet 10p', 'Bande abrasive zirconium grain 100 pour ponceuse parquet. Lot de 10 pièces. Haute durabilité.', (SELECT id FROM pallmann_subcategories WHERE name LIKE '%Abrasif%' LIMIT 1), true)
ON CONFLICT (ref) DO UPDATE SET
  name = EXCLUDED.name,
  price_achat = EXCLUDED.price_achat,
  price_public_ht = EXCLUDED.price_public_ht,
  unit = EXCLUDED.unit,
  description = EXCLUDED.description;

-- ============================================
-- 7. DISQUES Ø150 velcro (50p)
-- ============================================

INSERT INTO pallmann_products (ref, name, slug, price_achat, price_public_ht, unit, description, subcategory_id, published) VALUES
('063016', 'Disque Ø150 zirco velcro gr40 (50p)', 'disque-150-zirco-velcro-gr40-50p', 71.50, 143.00, 'paquet 50p', 'Disque abrasif zirconium Ø150mm velcro grain 40. Lot de 50 pièces.', (SELECT id FROM pallmann_subcategories WHERE name LIKE '%Abrasif%' LIMIT 1), true),
('042171', 'Disque Ø150 zirco velcro gr60 (50p)', 'disque-150-zirco-velcro-gr60-50p', 55.61, 111.22, 'paquet 50p', 'Disque abrasif zirconium Ø150mm velcro grain 60. Lot de 50 pièces.', (SELECT id FROM pallmann_subcategories WHERE name LIKE '%Abrasif%' LIMIT 1), true),
('041124', 'Disque Ø150 zirco velcro gr80 (50p)', 'disque-150-zirco-velcro-gr80-50p', 52.91, 105.82, 'paquet 50p', 'Disque abrasif zirconium Ø150mm velcro grain 80. Lot de 50 pièces.', (SELECT id FROM pallmann_subcategories WHERE name LIKE '%Abrasif%' LIMIT 1), true),
('063017', 'Disque Ø150 zirco velcro gr100 (50p)', 'disque-150-zirco-velcro-gr100-50p', 51.51, 103.02, 'paquet 50p', 'Disque abrasif zirconium Ø150mm velcro grain 100. Lot de 50 pièces.', (SELECT id FROM pallmann_subcategories WHERE name LIKE '%Abrasif%' LIMIT 1), true)
ON CONFLICT (ref) DO UPDATE SET
  name = EXCLUDED.name,
  price_achat = EXCLUDED.price_achat,
  price_public_ht = EXCLUDED.price_public_ht,
  unit = EXCLUDED.unit,
  description = EXCLUDED.description;

-- ============================================
-- 8. MACHINES & ACCESSOIRES
-- ============================================

-- Créer la sous-catégorie si elle n'existe pas
INSERT INTO pallmann_subcategories (name, slug, category_id, display_order)
SELECT 
  'Machines & Accessoires',
  'machines-accessoires',
  (SELECT id FROM pallmann_categories WHERE name LIKE '%Accessoire%' OR name LIKE '%Materiel%' OR name LIKE '%Matériel%' LIMIT 1),
  100
WHERE NOT EXISTS (
  SELECT 1 FROM pallmann_subcategories WHERE slug = 'machines-accessoires'
);

-- Si pas de catégorie parente trouvée, créer une catégorie "Équipement"
INSERT INTO pallmann_categories (name, slug, display_order)
SELECT 'Équipement', 'equipement', 99
WHERE NOT EXISTS (
  SELECT 1 FROM pallmann_categories WHERE slug = 'equipement'
) AND NOT EXISTS (
  SELECT 1 FROM pallmann_subcategories WHERE slug = 'machines-accessoires'
);

-- Associer la sous-catégorie à la catégorie Équipement si créée
UPDATE pallmann_subcategories 
SET category_id = (SELECT id FROM pallmann_categories WHERE slug = 'equipement')
WHERE slug = 'machines-accessoires' AND category_id IS NULL;

-- ============================================
-- 8.1 PONCEUSES À BANDE
-- ============================================

INSERT INTO pallmann_products (ref, name, slug, price_achat, price_public_ht, unit, description, subcategory_id, published) VALUES
('074540', 'COBRA CLASSIC ponceuse à bande', 'cobra-classic-ponceuse-bande', 6094.80, 12189.60, 'unité', 'Ponceuse à bande professionnelle COBRA CLASSIC. Robuste et performante pour le ponçage de parquets.', (SELECT id FROM pallmann_subcategories WHERE slug = 'machines-accessoires' LIMIT 1), true),
('059906', 'COBRA PALLMANN ponceuse à bande', 'cobra-pallmann-ponceuse-bande', 6646.50, 13293.00, 'unité', 'Ponceuse à bande professionnelle COBRA version PALLMANN. Performance optimale pour le ponçage de parquets.', (SELECT id FROM pallmann_subcategories WHERE slug = 'machines-accessoires' LIMIT 1), true)
ON CONFLICT (ref) DO UPDATE SET
  name = EXCLUDED.name,
  price_achat = EXCLUDED.price_achat,
  price_public_ht = EXCLUDED.price_public_ht,
  unit = EXCLUDED.unit,
  description = EXCLUDED.description;

-- ============================================
-- 8.2 BORDEUSES
-- ============================================

INSERT INTO pallmann_products (ref, name, slug, price_achat, price_public_ht, unit, description, subcategory_id, published) VALUES
('082727', 'GECKO STAR 2.0 bordeuse Ø150mm', 'gecko-star-2-bordeuse-150mm', 1858.50, 3717.00, 'unité', 'Bordeuse professionnelle GECKO STAR 2.0 avec disque Ø150mm. Idéale pour les finitions et les bords.', (SELECT id FROM pallmann_subcategories WHERE slug = 'machines-accessoires' LIMIT 1), true),
('082729', 'GECKO STAR 2.0 bordeuse Ø178mm', 'gecko-star-2-bordeuse-178mm', 1858.50, 3717.00, 'unité', 'Bordeuse professionnelle GECKO STAR 2.0 avec disque Ø178mm. Idéale pour les finitions et les bords. Format large.', (SELECT id FROM pallmann_subcategories WHERE slug = 'machines-accessoires' LIMIT 1), true)
ON CONFLICT (ref) DO UPDATE SET
  name = EXCLUDED.name,
  price_achat = EXCLUDED.price_achat,
  price_public_ht = EXCLUDED.price_public_ht,
  unit = EXCLUDED.unit,
  description = EXCLUDED.description;

-- ============================================
-- 8.3 ACCESSOIRES COBRA
-- ============================================

INSERT INTO pallmann_products (ref, name, slug, price_achat, price_public_ht, unit, description, subcategory_id, published) VALUES
('071729', 'COBRA PALLMANN sac standard', 'cobra-pallmann-sac-standard', 56.34, 112.68, 'unité', 'Sac à poussière standard pour ponceuse COBRA PALLMANN. Filtration efficace.', (SELECT id FROM pallmann_subcategories WHERE slug = 'machines-accessoires' LIMIT 1), true),
('013839', 'COBRA sac à poussière', 'cobra-sac-poussiere', 65.21, 130.42, 'unité', 'Sac à poussière pour ponceuse COBRA. Grande capacité et filtration performante.', (SELECT id FROM pallmann_subcategories WHERE slug = 'machines-accessoires' LIMIT 1), true),
('052441', 'COBRA sac à poussière zip', 'cobra-sac-poussiere-zip', 56.34, 112.68, 'unité', 'Sac à poussière avec fermeture zip pour ponceuse COBRA. Vidage facile.', (SELECT id FROM pallmann_subcategories WHERE slug = 'machines-accessoires' LIMIT 1), true),
('052442', 'COBRA sous sac jetable (10p)', 'cobra-sous-sac-jetable-10p', 97.16, 194.32, 'paquet 10p', 'Sous-sacs jetables pour ponceuse COBRA. Lot de 10 pièces. Hygiène optimale.', (SELECT id FROM pallmann_subcategories WHERE slug = 'machines-accessoires' LIMIT 1), true)
ON CONFLICT (ref) DO UPDATE SET
  name = EXCLUDED.name,
  price_achat = EXCLUDED.price_achat,
  price_public_ht = EXCLUDED.price_public_ht,
  unit = EXCLUDED.unit,
  description = EXCLUDED.description;

-- ============================================
-- 8.4 ACCESSOIRES GECKO STAR
-- ============================================

INSERT INTO pallmann_products (ref, name, slug, price_achat, price_public_ht, unit, description, subcategory_id, published) VALUES
('066603', 'GECKO STAR sac à poussières', 'gecko-star-sac-poussieres', 37.08, 74.16, 'unité', 'Sac à poussière pour bordeuse GECKO STAR. Filtration efficace et capacité adaptée.', (SELECT id FROM pallmann_subcategories WHERE slug = 'machines-accessoires' LIMIT 1), true),
('016222', 'GECKO STAR Ø150 autocollant scratch', 'gecko-star-150-autocollant-scratch', 13.73, 27.46, 'unité', 'Plateau autocollant scratch Ø150mm pour bordeuse GECKO STAR. Fixation rapide des disques.', (SELECT id FROM pallmann_subcategories WHERE slug = 'machines-accessoires' LIMIT 1), true),
('065828', 'GECKO STAR Ø150 bras long', 'gecko-star-150-bras-long', 429.75, 859.50, 'unité', 'Bras long Ø150mm pour bordeuse GECKO STAR. Accès facilité aux zones difficiles.', (SELECT id FROM pallmann_subcategories WHERE slug = 'machines-accessoires' LIMIT 1), true),
('073274', 'GECKO STAR Ø150 disque auto-agrippant', 'gecko-star-150-disque-auto-agrippant', 7.38, 14.76, 'unité', 'Disque auto-agrippant Ø150mm pour bordeuse GECKO STAR. Changement rapide des abrasifs.', (SELECT id FROM pallmann_subcategories WHERE slug = 'machines-accessoires' LIMIT 1), true),
('048195', 'GECKO STAR Ø178 autocollant scratch', 'gecko-star-178-autocollant-scratch', 19.62, 39.24, 'unité', 'Plateau autocollant scratch Ø178mm pour bordeuse GECKO STAR. Fixation rapide des disques.', (SELECT id FROM pallmann_subcategories WHERE slug = 'machines-accessoires' LIMIT 1), true),
('065826', 'GECKO STAR Ø178 bras long', 'gecko-star-178-bras-long', 429.75, 859.50, 'unité', 'Bras long Ø178mm pour bordeuse GECKO STAR. Accès facilité aux zones difficiles.', (SELECT id FROM pallmann_subcategories WHERE slug = 'machines-accessoires' LIMIT 1), true),
('073275', 'GECKO STAR Ø178 disque auto-agrippant', 'gecko-star-178-disque-auto-agrippant', 9.54, 19.08, 'unité', 'Disque auto-agrippant Ø178mm pour bordeuse GECKO STAR. Changement rapide des abrasifs.', (SELECT id FROM pallmann_subcategories WHERE slug = 'machines-accessoires' LIMIT 1), true)
ON CONFLICT (ref) DO UPDATE SET
  name = EXCLUDED.name,
  price_achat = EXCLUDED.price_achat,
  price_public_ht = EXCLUDED.price_public_ht,
  unit = EXCLUDED.unit,
  description = EXCLUDED.description;

-- ============================================
-- 8.5 GECKOFLEX
-- ============================================

INSERT INTO pallmann_products (ref, name, slug, price_achat, price_public_ht, unit, description, subcategory_id, published) VALUES
('184124', 'GECKOFLEX 2.0 bordeuse', 'geckoflex-2-bordeuse', 1739.70, 3479.40, 'unité', 'Bordeuse professionnelle GECKOFLEX 2.0. Machine polyvalente pour finitions de parquet.', (SELECT id FROM pallmann_subcategories WHERE slug = 'machines-accessoires' LIMIT 1), true),
('061128', 'GECKOFLEX brosse', 'geckoflex-brosse', 26.46, 52.92, 'unité', 'Brosse pour bordeuse GECKOFLEX. Nettoyage et préparation des surfaces.', (SELECT id FROM pallmann_subcategories WHERE slug = 'machines-accessoires' LIMIT 1), true),
('061162', 'GECKOFLEX plateau ponçage velcro', 'geckoflex-plateau-poncage-velcro', 67.73, 135.46, 'unité', 'Plateau de ponçage velcro pour bordeuse GECKOFLEX. Fixation rapide des abrasifs.', (SELECT id FROM pallmann_subcategories WHERE slug = 'machines-accessoires' LIMIT 1), true)
ON CONFLICT (ref) DO UPDATE SET
  name = EXCLUDED.name,
  price_achat = EXCLUDED.price_achat,
  price_public_ht = EXCLUDED.price_public_ht,
  unit = EXCLUDED.unit,
  description = EXCLUDED.description;

-- ============================================
-- 8.6 SPIDER - Accessoires
-- ============================================

INSERT INTO pallmann_products (ref, name, slug, price_achat, price_public_ht, unit, description, subcategory_id, published) VALUES
('083566', 'SPIDER Brosse nylon Ø178mm gr46', 'spider-brosse-nylon-178mm-gr46', 124.25, 248.50, 'unité', 'Brosse nylon Ø178mm grain 46 pour monobrosse SPIDER. Brossage agressif pour parquet structuré.', (SELECT id FROM pallmann_subcategories WHERE slug = 'machines-accessoires' LIMIT 1), true),
('083567', 'SPIDER Brosse nylon Ø178mm gr60', 'spider-brosse-nylon-178mm-gr60', 124.43, 248.86, 'unité', 'Brosse nylon Ø178mm grain 60 pour monobrosse SPIDER. Brossage fin pour parquet structuré.', (SELECT id FROM pallmann_subcategories WHERE slug = 'machines-accessoires' LIMIT 1), true),
('072158', 'SPIDER brosse jupe aspiration', 'spider-brosse-jupe-aspiration', 16.83, 33.66, 'unité', 'Brosse jupe d''aspiration pour monobrosse SPIDER. Améliore la captation des poussières.', (SELECT id FROM pallmann_subcategories WHERE slug = 'machines-accessoires' LIMIT 1), true),
('175820', 'SPIDER disque écartement métal (3p)', 'spider-disque-ecartement-metal-3p', 99.05, 198.10, 'paquet 3p', 'Disques d''écartement métal pour monobrosse SPIDER. Lot de 3 pièces.', (SELECT id FROM pallmann_subcategories WHERE slug = 'machines-accessoires' LIMIT 1), true),
('086015', 'SPIDER extension de jupe', 'spider-extension-jupe', 161.60, 323.20, 'unité', 'Extension de jupe pour monobrosse SPIDER. Augmente la zone de travail.', (SELECT id FROM pallmann_subcategories WHERE slug = 'machines-accessoires' LIMIT 1), true),
('175570', 'SPIDER jupe aspi + extension', 'spider-jupe-aspi-extension', 374.63, 749.26, 'unité', 'Kit jupe aspiration avec extension pour monobrosse SPIDER. Solution complète d''aspiration.', (SELECT id FROM pallmann_subcategories WHERE slug = 'machines-accessoires' LIMIT 1), true),
('083338', 'SPIDER kit complet parquet brossé', 'spider-kit-complet-parquet-brosse', 1449.00, 2898.00, 'unité', 'Kit complet pour parquet brossé avec monobrosse SPIDER. Inclut tous les accessoires nécessaires.', (SELECT id FROM pallmann_subcategories WHERE slug = 'machines-accessoires' LIMIT 1), true),
('088477', 'SPIDER Kit segments diamant gr30', 'spider-kit-segments-diamant-gr30', 1085.31, 2170.62, 'unité', 'Kit segments diamant grain 30 pour monobrosse SPIDER. Ponçage agressif béton/chape.', (SELECT id FROM pallmann_subcategories WHERE slug = 'machines-accessoires' LIMIT 1), true),
('088478', 'SPIDER Kit segments diamant gr50', 'spider-kit-segments-diamant-gr50', 1085.31, 2170.62, 'unité', 'Kit segments diamant grain 50 pour monobrosse SPIDER. Ponçage fin béton/chape.', (SELECT id FROM pallmann_subcategories WHERE slug = 'machines-accessoires' LIMIT 1), true),
('175829', 'SPIDER pad éjection (3p)', 'spider-pad-ejection-3p', 52.11, 104.22, 'paquet 3p', 'Pads d''éjection pour monobrosse SPIDER. Lot de 3 pièces.', (SELECT id FROM pallmann_subcategories WHERE slug = 'machines-accessoires' LIMIT 1), true),
('175826', 'SPIDER pad perforé (3p)', 'spider-pad-perfore-3p', 48.38, 96.76, 'paquet 3p', 'Pads perforés pour monobrosse SPIDER. Lot de 3 pièces. Meilleure aspiration.', (SELECT id FROM pallmann_subcategories WHERE slug = 'machines-accessoires' LIMIT 1), true),
('175828', 'SPIDER pad souple (3p)', 'spider-pad-souple-3p', 42.30, 84.60, 'paquet 3p', 'Pads souples pour monobrosse SPIDER. Lot de 3 pièces. Finitions délicates.', (SELECT id FROM pallmann_subcategories WHERE slug = 'machines-accessoires' LIMIT 1), true),
('081696', 'SPIDER Plateau 3 têtes', 'spider-plateau-3-tetes', 2115.00, 4230.00, 'unité', 'Plateau 3 têtes pour monobrosse SPIDER. Ponçage professionnel grandes surfaces.', (SELECT id FROM pallmann_subcategories WHERE slug = 'machines-accessoires' LIMIT 1), true)
ON CONFLICT (ref) DO UPDATE SET
  name = EXCLUDED.name,
  price_achat = EXCLUDED.price_achat,
  price_public_ht = EXCLUDED.price_public_ht,
  unit = EXCLUDED.unit,
  description = EXCLUDED.description;

-- ============================================
-- 8.7 SPIDER - Ponceuse et accessoires
-- ============================================

INSERT INTO pallmann_products (ref, name, slug, price_achat, price_public_ht, unit, description, subcategory_id, published) VALUES
('078319', 'SPIDER ponceuse à parquet', 'spider-ponceuse-parquet', 7344.00, 14688.00, 'unité', 'Monobrosse professionnelle SPIDER pour ponçage de parquet. Machine haute performance pour grandes surfaces.', (SELECT id FROM pallmann_subcategories WHERE slug = 'machines-accessoires' LIMIT 1), true),
('084572', 'SPIDER platine pour segment diamant', 'spider-platine-segment-diamant', 63.63, 127.26, 'unité', 'Platine de fixation pour segments diamant monobrosse SPIDER.', (SELECT id FROM pallmann_subcategories WHERE slug = 'machines-accessoires' LIMIT 1), true),
('088321', 'SPIDER Set segments diamant gr30 (9p)', 'spider-set-segments-diamant-gr30-9p', 896.85, 1793.70, 'paquet 9p', 'Set de 9 segments diamant grain 30 pour monobrosse SPIDER. Ponçage agressif.', (SELECT id FROM pallmann_subcategories WHERE slug = 'machines-accessoires' LIMIT 1), true),
('088322', 'SPIDER Set segments diamant gr50 (9p)', 'spider-set-segments-diamant-gr50-9p', 896.85, 1793.70, 'paquet 9p', 'Set de 9 segments diamant grain 50 pour monobrosse SPIDER. Ponçage fin.', (SELECT id FROM pallmann_subcategories WHERE slug = 'machines-accessoires' LIMIT 1), true),
('089462', 'SPIDER valise transport segments', 'spider-valise-transport-segments', 157.23, 314.46, 'unité', 'Valise de transport pour segments diamant SPIDER. Protection et organisation optimales.', (SELECT id FROM pallmann_subcategories WHERE slug = 'machines-accessoires' LIMIT 1), true)
ON CONFLICT (ref) DO UPDATE SET
  name = EXCLUDED.name,
  price_achat = EXCLUDED.price_achat,
  price_public_ht = EXCLUDED.price_public_ht,
  unit = EXCLUDED.unit,
  description = EXCLUDED.description;

-- ============================================
-- 8.8 TURBO SCRUBBER
-- ============================================

INSERT INTO pallmann_products (ref, name, slug, price_achat, price_public_ht, unit, description, subcategory_id, published) VALUES
('083588', 'TURBO SCRUBBER', 'turbo-scrubber', 2835.00, 5670.00, 'unité', 'Machine TURBO SCRUBBER pour nettoyage et préparation des parquets. Idéale pour le décapage et le nettoyage intensif.', (SELECT id FROM pallmann_subcategories WHERE slug = 'machines-accessoires' LIMIT 1), true),
('088662', 'TURBO SCRUBBER lèvres aspiration (2p)', 'turbo-scrubber-levres-aspiration-2p', 42.66, 85.32, 'paquet 2p', 'Lèvres d''aspiration pour TURBO SCRUBBER. Lot de 2 pièces. Pièce de rechange.', (SELECT id FROM pallmann_subcategories WHERE slug = 'machines-accessoires' LIMIT 1), true)
ON CONFLICT (ref) DO UPDATE SET
  name = EXCLUDED.name,
  price_achat = EXCLUDED.price_achat,
  price_public_ht = EXCLUDED.price_public_ht,
  unit = EXCLUDED.unit,
  description = EXCLUDED.description;

-- ============================================
-- 8.9 UNO
-- ============================================

INSERT INTO pallmann_products (ref, name, slug, price_achat, price_public_ht, unit, description, subcategory_id, published) VALUES
('059629', 'UNO monobrosse', 'uno-monobrosse', 2169.00, 4338.00, 'unité', 'Monobrosse UNO pour entretien et finition de parquets. Machine compacte et maniable.', (SELECT id FROM pallmann_subcategories WHERE slug = 'machines-accessoires' LIMIT 1), true)
ON CONFLICT (ref) DO UPDATE SET
  name = EXCLUDED.name,
  price_achat = EXCLUDED.price_achat,
  price_public_ht = EXCLUDED.price_public_ht,
  unit = EXCLUDED.unit,
  description = EXCLUDED.description;

-- ============================================
-- Vérification finale
-- ============================================
-- SELECT ref, name, price_achat, price_public_ht, unit FROM pallmann_products WHERE ref IS NOT NULL ORDER BY ref;

-- Vérification machines & accessoires
-- SELECT ref, name, price_achat, price_public_ht, ROUND(price_public_ht * 1.20, 2) as prix_ttc, unit 
-- FROM pallmann_products 
-- WHERE subcategory_id = (SELECT id FROM pallmann_subcategories WHERE slug = 'machines-accessoires')
-- ORDER BY price_public_ht DESC;
