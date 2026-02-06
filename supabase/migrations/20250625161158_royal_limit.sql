/*
  # Update Mulhouse article title variant

  1. Changes
    - Update existing Mulhouse article with new title
    - Update content header to match
    - Create fallback article if none exists
    - Fix syntax errors with proper PostgreSQL syntax

  2. Security
    - Maintain existing RLS policies
    - Preserve article metadata
*/

-- First, let's update any existing Mulhouse article with the new title variant
UPDATE articles 
SET 
  title = 'Restauration de Parquets d''Époque : L''Art de Rénover les Sols Historiques de Mulhouse',
  meta_title = 'Restauration Parquets Historiques Mulhouse - Experts en Rénovation'
WHERE id = (
  SELECT id FROM articles 
  WHERE title ILIKE '%Mulhouse%' 
    AND title ILIKE '%parquet%' 
    AND published = true
  ORDER BY created_at DESC
  LIMIT 1
);

-- Update the content header to match the new title
UPDATE articles 
SET content = REGEXP_REPLACE(
  content,
  '^# [^\n]+',
  '# Restauration de Parquets d''Époque : L''Art de Rénover les Sols Historiques de Mulhouse',
  'g'
)
WHERE title = 'Restauration de Parquets d''Époque : L''Art de Rénover les Sols Historiques de Mulhouse'
  AND published = true;

-- Create a new article if no existing Mulhouse article was found
INSERT INTO articles (
  title,
  slug,
  content,
  excerpt,
  category_id,
  keywords,
  published,
  published_at,
  featured_image,
  meta_title,
  meta_description
)
SELECT 
  'Restauration de Parquets d''Époque : L''Art de Rénover les Sols Historiques de Mulhouse',
  'restauration-parquets-epoque-art-renover-sols-historiques-mulhouse',
  '# Restauration de Parquets d''Époque : L''Art de Rénover les Sols Historiques de Mulhouse

Les parquets historiques de Mulhouse racontent l''histoire de notre belle cité alsacienne. Dans les immeubles haussmanniens du centre-ville et les demeures bourgeoises des quartiers résidentiels, ces sols d''époque méritent une attention particulière et un savoir-faire artisanal d''exception.

## L''Art de la Restauration de Parquets Anciens

La restauration de parquets historiques nécessite une approche délicate qui respecte l''authenticité du matériau tout en lui redonnant sa splendeur d''origine. Nos artisans spécialisés maîtrisent les techniques traditionnelles adaptées aux spécificités des bois anciens.

### Diagnostic et Évaluation

Chaque parquet ancien est unique et nécessite une évaluation personnalisée :
- Identification de l''essence de bois
- Analyse de l''état de conservation
- Évaluation des techniques de pose d''époque
- Détection des éventuels traitements antérieurs

### Techniques de Restauration Respectueuses

Notre approche privilégie la préservation du caractère authentique :
- Ponçage délicat adapté à l''épaisseur disponible
- Réparation des lames endommagées avec du bois d''époque
- Finitions traditionnelles (cire, huile, vernis naturel)
- Respect des motifs et assemblages d''origine

## Spécificités des Parquets Mulhousiens

Les parquets de Mulhouse présentent des caractéristiques particulières liées à l''histoire industrielle de la ville :

### Parquets des Maisons de Maître
- Chêne massif de forte épaisseur
- Motifs géométriques complexes
- Finitions à la cire traditionnelle

### Sols des Immeubles Bourgeois
- Parquets en point de Hongrie
- Essences nobles (noyer, acajou)
- Marqueterie et incrustation

## Notre Engagement Patrimonial

Restaurer un parquet historique, c''est préserver un patrimoine pour les générations futures. Nous nous engageons à :
- Respecter l''authenticité des matériaux
- Utiliser des techniques traditionnelles
- Conseiller sur l''entretien adapté
- Documenter les interventions

<div class="not-prose my-8 flex flex-col items-center gap-4">
  <a href="/" class="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 dark:bg-primary-500 text-white rounded-lg hover:bg-primary-700 dark:hover:bg-primary-600 transition-all duration-200 font-medium transform hover:-translate-y-1 hover:shadow-lg text-center w-full sm:w-auto min-w-[200px] justify-center">
    Demander un devis gratuit
  </a>
  
  <div class="text-sm text-secondary-600 dark:text-secondary-400 text-center">
    <strong>Téléphone :</strong> <a href="tel:+33757821306" class="text-primary-600 dark:text-primary-400 hover:underline">07 57 82 13 06</a><br>
    <strong>Email :</strong> <a href="mailto:contact@poncages.fr" class="text-primary-600 dark:text-primary-400 hover:underline">contact@poncages.fr</a><br>
    <strong>Spécialité :</strong> Restauration de parquets historiques à Mulhouse
  </div>
</div>

Confiez-nous la restauration de vos parquets d''époque. Notre expertise artisanale redonnera vie à ces témoins de l''histoire mulhousienne.',
  'Spécialistes de la restauration de parquets historiques à Mulhouse. Techniques artisanales respectueuses pour redonner vie aux sols d''époque des immeubles haussmanniens et demeures bourgeoises.',
  (SELECT id FROM categories WHERE slug = 'renovation' LIMIT 1),
  ARRAY['parquet', 'restauration', 'Mulhouse', 'historique', 'époque', 'haussmannien', 'patrimoine', 'artisan', 'rénovation', 'bois ancien', 'point de Hongrie', 'chêne massif'],
  true,
  now(),
  'https://mjuzyqhxifyvebtnlrra.supabase.co/storage/v1/object/public/photos-lpr//test%20parquet.jpg',
  'Restauration Parquets Historiques Mulhouse - Experts en Rénovation',
  'Experts en restauration de parquets historiques à Mulhouse. Techniques artisanales pour immeubles haussmanniens et demeures d''époque. Devis gratuit.'
WHERE NOT EXISTS (
  SELECT 1 FROM articles 
  WHERE slug = 'restauration-parquets-epoque-art-renover-sols-historiques-mulhouse'
);