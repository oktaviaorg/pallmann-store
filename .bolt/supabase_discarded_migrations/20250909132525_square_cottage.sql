/*
  # Ajouter la plaquette de présentation de l'entreprise

  1. Nouveau document
    - `title` : Plaquette de présentation Les Ponceurs Réunis
    - `description` : Découvrez notre entreprise, nos services et notre expertise
    - `category` : Présentation entreprise
    - `file_url` : Lien vers le PDF Supabase
    - `file_type` : PDF
    - `file_size` : Estimation 2MB

  2. Sécurité
    - Document accessible en lecture publique
    - Suivi des téléchargements activé
*/

INSERT INTO documents (
  title,
  description,
  category,
  file_url,
  file_size,
  file_type,
  download_count,
  created_at,
  updated_at
) VALUES (
  'Plaquette de présentation Les Ponceurs Réunis',
  'Découvrez notre entreprise familiale, nos services de ponçage et rénovation de parquet, notre équipe d''experts et nos réalisations en Alsace et Territoire de Belfort. Document complet avec photos, témoignages clients et informations pratiques.',
  'Présentation entreprise',
  'https://mjuzyqhxifyvebtnlrra.supabase.co/storage/v1/object/public/lpr2/ponceurs_reunis_presentation.pdf',
  2048000,
  'PDF',
  0,
  now(),
  now()
) ON CONFLICT (file_url) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  updated_at = now();