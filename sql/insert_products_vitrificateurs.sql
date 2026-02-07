-- =====================================================
-- PRODUITS PALLMANN - VITRIFICATEURS, HUILES, FONDS DURS
-- À exécuter dans Supabase SQL Editor
-- =====================================================

-- IDs des catégories (vérifier qu'ils correspondent)
-- vitrificateurs: e53b7ac0-1499-42a7-b93d-f52920235993
-- huiles: 709c27e0-880d-4b88-ba95-5ba88c8ea0db
-- preparation: 2f25b0ae-a324-4df8-9704-2efe862e307f
-- entretien: f9bc4b55-d390-42cf-b87d-7cca3cb4f15e

-- =====================================================
-- VITRIFICATEURS
-- =====================================================

INSERT INTO products (name, slug, description, article_number, category_id, price_ht, price_ttc, image_url, specs, features, is_bestseller, is_available)
VALUES 
  (
    'PALL-X 96 Mat 5L',
    'pall-x-96-mat-5l',
    'Vitrificateur mono-composant à base d''eau, pour parquets à usage résidentiel et commercial intense. Finition mate naturelle. Certification EC1Plus.',
    '010396-5',
    'e53b7ac0-1499-42a7-b93d-f52920235993',
    145.00,
    174.00,
    '/images/products/pall-x-96.png',
    '{"contenance": "5 L", "rendement": "8-10 m²/L", "finition": "Mat", "sechage": "4h entre couches"}'::jsonb,
    '["Mono-composant", "Séchage rapide", "EC1Plus", "Usage intensif"]'::jsonb,
    true,
    true
  ),
  (
    'PALL-X 96 Satiné 5L',
    'pall-x-96-satine-5l',
    'Vitrificateur mono-composant à base d''eau, pour parquets à usage résidentiel et commercial intense. Finition satinée élégante.',
    '010397-5',
    'e53b7ac0-1499-42a7-b93d-f52920235993',
    145.00,
    174.00,
    '/images/products/pall-x-96.png',
    '{"contenance": "5 L", "rendement": "8-10 m²/L", "finition": "Satiné", "sechage": "4h entre couches"}'::jsonb,
    '["Mono-composant", "Séchage rapide", "EC1Plus", "Usage intensif"]'::jsonb,
    true,
    true
  ),
  (
    'PALL-X 96 Mat 10L',
    'pall-x-96-mat-10l',
    'Vitrificateur mono-composant professionnel. Format économique 10L pour grands chantiers.',
    '010396-10',
    'e53b7ac0-1499-42a7-b93d-f52920235993',
    275.00,
    330.00,
    '/images/products/pall-x-96.png',
    '{"contenance": "10 L", "rendement": "8-10 m²/L", "finition": "Mat", "sechage": "4h entre couches"}'::jsonb,
    '["Mono-composant", "Format Pro", "EC1Plus", "Économique"]'::jsonb,
    false,
    true
  ),
  (
    'PALL-X 98 2K Gold Mat 4.95L',
    'pall-x-98-2k-gold-mat',
    'Vitrificateur bi-composant premium à haute résistance. Le gold standard des professionnels du parquet.',
    '010398-5',
    'e53b7ac0-1499-42a7-b93d-f52920235993',
    285.00,
    342.00,
    '/images/products/pall-x-98.png',
    '{"contenance": "4.95 L (4.5L + 0.45L durcisseur)", "rendement": "8-10 m²/L", "finition": "Mat", "pot_life": "2h"}'::jsonb,
    '["Bi-composant", "Ultra résistant", "EC1Plus", "Professionnel"]'::jsonb,
    true,
    true
  ),
  (
    'PALL-X 98 2K Gold Satiné 4.95L',
    'pall-x-98-2k-gold-satine',
    'Vitrificateur bi-composant premium finition satinée. Résistance exceptionnelle.',
    '010398-5S',
    'e53b7ac0-1499-42a7-b93d-f52920235993',
    285.00,
    342.00,
    '/images/products/pall-x-98.png',
    '{"contenance": "4.95 L", "rendement": "8-10 m²/L", "finition": "Satiné", "pot_life": "2h"}'::jsonb,
    '["Bi-composant", "Ultra résistant", "EC1Plus", "Professionnel"]'::jsonb,
    false,
    true
  ),
  (
    'PALL-X EXTREME Mat 5L',
    'pall-x-extreme-mat-5l',
    'Vitrificateur haute résistance pour sols très sollicités. Parfait pour commerces, restaurants, écoles.',
    '010399-5',
    'e53b7ac0-1499-42a7-b93d-f52920235993',
    165.00,
    198.00,
    '/images/products/pall-x-extreme.png',
    '{"contenance": "5 L", "rendement": "8-10 m²/L", "finition": "Extra mat", "sechage": "3h entre couches"}'::jsonb,
    '["Mono-composant", "Haute résistance", "EC1Plus", "Commerce"]'::jsonb,
    true,
    true
  ),
  (
    'PALL-X PURE Mat 5L',
    'pall-x-pure-mat-5l',
    'Vitrificateur effet bois brut. Finition invisible qui préserve l''aspect naturel du bois.',
    '010395-5',
    'e53b7ac0-1499-42a7-b93d-f52920235993',
    235.00,
    282.00,
    '/images/products/pall-x-pure.png',
    '{"contenance": "5 L", "rendement": "8-10 m²/L", "finition": "Bois brut", "sechage": "4h entre couches"}'::jsonb,
    '["Effet naturel", "Invisible", "EC1Plus", "Design moderne"]'::jsonb,
    true,
    true
  );

-- =====================================================
-- FONDS DURS (PRÉPARATION)
-- =====================================================

INSERT INTO products (name, slug, description, article_number, category_id, price_ht, price_ttc, image_url, specs, features, is_bestseller, is_available)
VALUES 
  (
    'PALL-X 320 Fond Dur 5L',
    'pall-x-320-fond-dur-5l',
    'Fond dur universel à base d''eau. Première couche indispensable avant vitrification.',
    '010320-5',
    '2f25b0ae-a324-4df8-9704-2efe862e307f',
    115.00,
    138.00,
    '/images/products/pall-x-320.png',
    '{"contenance": "5 L", "rendement": "10-12 m²/L", "sechage": "2-3h"}'::jsonb,
    '["Base eau", "Universel", "EC1Plus", "Séchage rapide"]'::jsonb,
    true,
    true
  ),
  (
    'PALL-X 320 Fond Dur 10L',
    'pall-x-320-fond-dur-10l',
    'Fond dur universel format économique pour grands chantiers.',
    '010320-10',
    '2f25b0ae-a324-4df8-9704-2efe862e307f',
    215.00,
    258.00,
    '/images/products/pall-x-320.png',
    '{"contenance": "10 L", "rendement": "10-12 m²/L", "sechage": "2-3h"}'::jsonb,
    '["Format Pro", "Économique", "EC1Plus"]'::jsonb,
    false,
    true
  ),
  (
    'PALL-X 325 Fond Dur Anti-Tanin 5L',
    'pall-x-325-anti-tanin-5l',
    'Fond dur bloqueur de tanins pour bois exotiques et chêne foncé.',
    '010325-5',
    '2f25b0ae-a324-4df8-9704-2efe862e307f',
    135.00,
    162.00,
    '/images/products/pall-x-325.png',
    '{"contenance": "5 L", "rendement": "8-10 m²/L", "sechage": "3h"}'::jsonb,
    '["Anti-tanin", "Bois exotiques", "EC1Plus"]'::jsonb,
    false,
    true
  ),
  (
    'PALL-X 333 Color Blanc 1L',
    'pall-x-333-color-blanc-1l',
    'Fond dur teinté blanc pour parquets clairs style scandinave.',
    '010333-1W',
    '2f25b0ae-a324-4df8-9704-2efe862e307f',
    45.00,
    54.00,
    '/images/products/pall-x-333.png',
    '{"contenance": "1 L", "rendement": "8-10 m²/L", "couleur": "Blanc"}'::jsonb,
    '["Teinté", "Style nordique", "EC1Plus"]'::jsonb,
    false,
    true
  );

-- =====================================================
-- HUILES
-- =====================================================

INSERT INTO products (name, slug, description, article_number, category_id, price_ht, price_ttc, image_url, specs, features, is_bestseller, is_available)
VALUES 
  (
    'MAGIC OIL 2K Naturel 2.5L',
    'magic-oil-2k-naturel-2-5l',
    'Huile-cire bi-composante professionnelle. Finition naturelle mate qui pénètre dans le bois.',
    '020125-2.5',
    '709c27e0-880d-4b88-ba95-5ba88c8ea0db',
    295.00,
    354.00,
    '/images/products/magic-oil-2k.png',
    '{"contenance": "2.5 L", "rendement": "30-40 m²/L", "teinte": "Naturel", "pot_life": "2h"}'::jsonb,
    '["Bi-composant", "Huile-cire", "Finition mate", "15+ teintes"]'::jsonb,
    true,
    true
  ),
  (
    'MAGIC OIL 2K Blanc 2.5L',
    'magic-oil-2k-blanc-2-5l',
    'Huile-cire teintée blanc pour parquets effet scandinave.',
    '020125-2.5W',
    '709c27e0-880d-4b88-ba95-5ba88c8ea0db',
    315.00,
    378.00,
    '/images/products/magic-oil-2k.png',
    '{"contenance": "2.5 L", "rendement": "30-40 m²/L", "teinte": "Blanc", "pot_life": "2h"}'::jsonb,
    '["Bi-composant", "Teinte blanche", "Style nordique"]'::jsonb,
    false,
    true
  ),
  (
    'MAGIC OIL 2K Gris 2.5L',
    'magic-oil-2k-gris-2-5l',
    'Huile-cire teintée gris moderne pour parquets contemporains.',
    '020125-2.5G',
    '709c27e0-880d-4b88-ba95-5ba88c8ea0db',
    315.00,
    378.00,
    '/images/products/magic-oil-2k.png',
    '{"contenance": "2.5 L", "rendement": "30-40 m²/L", "teinte": "Gris", "pot_life": "2h"}'::jsonb,
    '["Bi-composant", "Teinte grise", "Moderne"]'::jsonb,
    false,
    true
  ),
  (
    'MAGIC OIL ERGO 2K Naturel 1L',
    'magic-oil-ergo-2k-naturel-1l',
    'Huile-cire version ergonomique pour petites surfaces. Mélange automatique.',
    '020130-1',
    '709c27e0-880d-4b88-ba95-5ba88c8ea0db',
    89.00,
    106.80,
    '/images/products/magic-oil-ergo.png',
    '{"contenance": "1 L", "rendement": "12-16 m²/L", "teinte": "Naturel"}'::jsonb,
    '["Format compact", "Mélange auto", "Particuliers"]'::jsonb,
    false,
    true
  );

-- =====================================================
-- ENTRETIEN
-- =====================================================

INSERT INTO products (name, slug, description, article_number, category_id, price_ht, price_ttc, image_url, specs, features, is_bestseller, is_available)
VALUES 
  (
    'MAGIC OIL CARE 1L',
    'magic-oil-care-1l',
    'Produit d''entretien pour parquets huilés. Nettoie et nourrit en une seule étape.',
    '020150-1',
    'f9bc4b55-d390-42cf-b87d-7cca3cb4f15e',
    28.00,
    33.60,
    '/images/products/magic-oil-care.png',
    '{"contenance": "1 L", "dilution": "1:20", "usage": "Entretien courant"}'::jsonb,
    '["Entretien", "Nettoie et nourrit", "Simple d''utilisation"]'::jsonb,
    true,
    true
  ),
  (
    'MAGIC OIL CARE 5L',
    'magic-oil-care-5l',
    'Format professionnel pour entretien régulier des parquets huilés.',
    '020150-5',
    'f9bc4b55-d390-42cf-b87d-7cca3cb4f15e',
    115.00,
    138.00,
    '/images/products/magic-oil-care.png',
    '{"contenance": "5 L", "dilution": "1:20", "usage": "Entretien Pro"}'::jsonb,
    '["Format Pro", "Économique", "Usage intensif"]'::jsonb,
    false,
    true
  ),
  (
    'PALL-X CARE 1L',
    'pall-x-care-1l',
    'Nettoyant d''entretien pour parquets vitrifiés. Préserve la brillance.',
    '010150-1',
    'f9bc4b55-d390-42cf-b87d-7cca3cb4f15e',
    22.00,
    26.40,
    '/images/products/pall-x-care.png',
    '{"contenance": "1 L", "dilution": "1:50", "usage": "Entretien vitrification"}'::jsonb,
    '["Parquets vitrifiés", "Préserve brillance", "Quotidien"]'::jsonb,
    true,
    true
  ),
  (
    'CLEAN & GO Spray 750ml',
    'clean-go-spray-750ml',
    'Spray nettoyant prêt à l''emploi pour parquets. Idéal pour entretien quotidien.',
    '010160-750',
    'f9bc4b55-d390-42cf-b87d-7cca3cb4f15e',
    12.00,
    14.40,
    '/images/products/clean-go.png',
    '{"contenance": "750 ml", "usage": "Prêt à l''emploi", "application": "Spray"}'::jsonb,
    '["Prêt à l''emploi", "Spray pratique", "Quotidien"]'::jsonb,
    false,
    true
  );

-- =====================================================
-- VÉRIFICATION
-- =====================================================

SELECT 
  c.name as categorie,
  COUNT(*) as nb_produits
FROM products p
JOIN categories c ON p.category_id = c.id
GROUP BY c.name
ORDER BY c.name;
