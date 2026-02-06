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
-- Vérification finale
-- ============================================
-- SELECT ref, name, price_achat, price_public_ht, unit FROM pallmann_products WHERE ref IS NOT NULL ORDER BY ref;
