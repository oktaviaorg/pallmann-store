/*
  # Création de la table leads pour Google Ads Landing Page

  1. Nouvelle table
    - `google_ads_leads`
      - `id` (uuid, clé primaire)
      - `source` (text) - Source du lead (google-ads-landing, etc.)
      - `service` (text) - Type de service demandé
      - `surface` (integer) - Surface en m² ou nombre de marches
      - `city` (text) - Ville du projet
      - `delay` (text) - Délai souhaité
      - `housing` (text) - Type de logement
      - `phone` (text) - Téléphone du contact
      - `email` (text) - Email du contact
      - `message` (text, nullable) - Message optionnel
      - `estimate_min` (numeric) - Estimation minimale
      - `estimate_max` (numeric) - Estimation maximale
      - `utm` (jsonb, nullable) - Paramètres UTM/tracking
      - `page` (text, nullable) - URL de la page
      - `created_at` (timestamp with time zone) - Date de création

  2. Sécurité
    - Activer RLS sur la table `google_ads_leads`
    - Politique pour les utilisateurs authentifiés (admin) pour lire les leads
    - Pas de politique publique (seulement via Edge Function)

  3. Index
    - Index sur `created_at` pour tri et filtrage par date
    - Index sur `source` pour filtrage par source
    - Index sur `city` pour analyse géographique
*/

-- Créer la table des leads Google Ads
CREATE TABLE IF NOT EXISTS google_ads_leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  source text NOT NULL DEFAULT 'google-ads-landing',
  service text NOT NULL,
  surface integer NOT NULL,
  city text NOT NULL,
  delay text NOT NULL,
  housing text NOT NULL,
  phone text,
  email text,
  message text,
  estimate_min numeric NOT NULL,
  estimate_max numeric NOT NULL,
  utm jsonb DEFAULT '{}'::jsonb,
  page text,
  created_at timestamptz DEFAULT now()
);

-- Activer RLS
ALTER TABLE google_ads_leads ENABLE ROW LEVEL SECURITY;

-- Politique pour les administrateurs authentifiés (lecture seule)
CREATE POLICY "Admins can read all leads"
  ON google_ads_leads
  FOR SELECT
  TO authenticated
  USING (
    auth.jwt()->>'email' IN ('contact@poncages.fr', 'julien.dietemann@gmail.com')
  );

-- Index pour améliorer les performances
CREATE INDEX IF NOT EXISTS idx_google_ads_leads_created_at 
  ON google_ads_leads(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_google_ads_leads_source 
  ON google_ads_leads(source);

CREATE INDEX IF NOT EXISTS idx_google_ads_leads_city 
  ON google_ads_leads(city);

-- Commentaire sur la table
COMMENT ON TABLE google_ads_leads IS 'Leads générés depuis les landing pages Google Ads';
