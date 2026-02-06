/*
  # Amélioration des politiques de sécurité pour les soumissions de formulaire

  1. Modifications
    - Désactivation temporaire de RLS pour un nettoyage propre
    - Suppression de toutes les politiques existantes
    - Création d'une nouvelle politique simple pour les insertions publiques
    - Création d'une politique de lecture pour les administrateurs

  2. Sécurité
    - Autorise les insertions publiques sans authentification
    - Restreint la lecture aux utilisateurs authentifiés avec le rôle admin
*/

-- Désactivation temporaire de RLS
ALTER TABLE form_submissions DISABLE ROW LEVEL SECURITY;

-- Suppression de toutes les politiques existantes
DROP POLICY IF EXISTS "Enable insert for anonymous users" ON form_submissions;
DROP POLICY IF EXISTS "Enable read for authenticated admins" ON form_submissions;
DROP POLICY IF EXISTS "Allow anonymous submissions" ON form_submissions;
DROP POLICY IF EXISTS "Allow admin read" ON form_submissions;
DROP POLICY IF EXISTS "Allow all inserts" ON form_submissions;
DROP POLICY IF EXISTS "Admin read only" ON form_submissions;
DROP POLICY IF EXISTS "Public insert access" ON form_submissions;
DROP POLICY IF EXISTS "Admin read access" ON form_submissions;

-- Réactivation de RLS
ALTER TABLE form_submissions ENABLE ROW LEVEL SECURITY;

-- Création d'une politique d'insertion publique simple et permissive
CREATE POLICY "allow_public_insert"
ON form_submissions
FOR INSERT
TO public
WITH CHECK (true);

-- Création d'une politique de lecture pour les administrateurs
CREATE POLICY "allow_admin_read"
ON form_submissions
FOR SELECT
TO authenticated
USING (auth.role() = 'admin');