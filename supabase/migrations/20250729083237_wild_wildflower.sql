/*
  # Ajouter support des photos de galerie aux articles

  1. Modifications de la table
    - Ajouter la colonne `gallery_photo_ids` à la table `articles`
    - Cette colonne stockera les IDs des photos de galerie associées à chaque article

  2. Sécurité
    - Aucune modification des politiques RLS nécessaire
    - La colonne est optionnelle et peut être null
*/

-- Ajouter la colonne pour stocker les IDs des photos de galerie
ALTER TABLE articles 
ADD COLUMN IF NOT EXISTS gallery_photo_ids uuid[] DEFAULT NULL;

-- Ajouter un commentaire pour documenter la colonne
COMMENT ON COLUMN articles.gallery_photo_ids IS 'IDs des photos de galerie associées à cet article';