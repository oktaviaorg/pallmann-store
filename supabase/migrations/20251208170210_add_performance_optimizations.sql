/*
  # Optimisations de Performance de la Base de Données

  1. Nouveaux Index
    - Index sur `email_queue.processed` pour filtrer rapidement les emails non traités
    - Index sur `notification_queue.processed` pour filtrer rapidement les notifications non traitées
    - Index composite sur `articles(published, created_at)` pour les requêtes d'articles publiés triés par date
    - Index sur `form_submissions.created_at` pour les filtres par date
    - Index sur `email_notifications_log.status` pour filtrer par statut

  2. Corrections de Sécurité RLS
    - Suppression de la politique trop permissive "Allow public select access" sur `form_submissions`
    - Ajout d'une politique permettant aux anonymes d'insérer des leads dans `google_ads_leads`

  3. Nettoyage
    - Suppression de la table de test inutilisée `table_name`

  ## Notes Importantes
  - Ces optimisations amélioreront les performances des requêtes les plus fréquentes
  - Les corrections RLS renforcent la sécurité en limitant l'accès aux données sensibles
*/

-- ============================================================
-- SECTION 1: Ajout d'index pour améliorer les performances
-- ============================================================

-- Index pour filtrer les emails non traités dans email_queue
CREATE INDEX IF NOT EXISTS idx_email_queue_processed 
ON email_queue (processed) 
WHERE processed = false;

-- Index pour filtrer les notifications non traitées dans notification_queue
CREATE INDEX IF NOT EXISTS idx_notification_queue_processed 
ON notification_queue (processed) 
WHERE processed = false;

-- Index composite pour les requêtes d'articles publiés triés par date
CREATE INDEX IF NOT EXISTS idx_articles_published_created 
ON articles (published, created_at DESC) 
WHERE published = true;

-- Index pour les filtres par date sur form_submissions
CREATE INDEX IF NOT EXISTS idx_form_submissions_created_at 
ON form_submissions (created_at DESC);

-- Index pour filtrer par statut dans email_notifications_log
CREATE INDEX IF NOT EXISTS idx_email_notifications_status 
ON email_notifications_log (status);

-- ============================================================
-- SECTION 2: Corrections de sécurité RLS
-- ============================================================

-- Supprimer la politique trop permissive sur form_submissions
-- Cette politique permettait à tout le monde de lire toutes les soumissions
DROP POLICY IF EXISTS "Allow public select access" ON form_submissions;

-- Ajouter une politique pour permettre aux anonymes d'insérer des leads Google Ads
CREATE POLICY "Allow anonymous to insert leads"
  ON google_ads_leads
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Ajouter une politique pour permettre au public d'insérer des leads Google Ads
CREATE POLICY "Allow public to insert leads"
  ON google_ads_leads
  FOR INSERT
  TO public
  WITH CHECK (true);

-- ============================================================
-- SECTION 3: Nettoyage - Suppression de tables inutilisées
-- ============================================================

-- Supprimer la table de test inutilisée
DROP TABLE IF EXISTS table_name CASCADE;
