-- Script SQL pour corriger les politiques de la galerie
-- À exécuter dans l'éditeur SQL de Supabase

-- 1. Activer RLS sur gallery_photos si pas déjà fait
ALTER TABLE gallery_photos ENABLE ROW LEVEL SECURITY;

-- 2. Supprimer les anciennes politiques si elles existent
DROP POLICY IF EXISTS "Allow public read access" ON gallery_photos;
DROP POLICY IF EXISTS "Allow admin write access" ON gallery_photos;

-- 3. Créer une politique de lecture publique
CREATE POLICY "Allow public read access" ON gallery_photos
  FOR SELECT
  TO public
  USING (true);

-- 4. Créer une politique d'écriture pour les admins/service
CREATE POLICY "Allow admin write access" ON gallery_photos
  FOR ALL
  TO authenticated, service_role
  USING (true)
  WITH CHECK (true);

-- 5. Vérifier les politiques existantes
SELECT schemaname, tablename, policyname, roles, cmd, qual 
FROM pg_policies 
WHERE tablename = 'gallery_photos';

-- 6. Test d'insertion d'une photo de test
INSERT INTO gallery_photos (url, "order") 
VALUES (
  'https://images.pexels.com/photos/5089152/pexels-photo-5089152.jpeg?auto=compress&cs=tinysrgb&w=800',
  (SELECT COALESCE(MAX("order"), 0) + 1 FROM gallery_photos)
)
ON CONFLICT DO NOTHING;

-- 7. Vérifier que la photo a été ajoutée
SELECT id, url, "order", created_at 
FROM gallery_photos 
ORDER BY "order" DESC 
LIMIT 3;