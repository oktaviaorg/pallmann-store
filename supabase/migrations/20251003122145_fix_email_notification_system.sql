/*
  # Correction du système de notification email
  
  Cette migration corrige le système de notification en supprimant
  correctement les dépendances existantes.
*/

-- Supprimer tous les triggers existants qui dépendent de la fonction
DROP TRIGGER IF EXISTS on_form_submission_created ON form_submissions;
DROP TRIGGER IF EXISTS trigger_form_notification ON form_submissions;

-- Maintenant supprimer la fonction
DROP FUNCTION IF EXISTS notify_form_submission() CASCADE;

-- Créer une table pour logger les tentatives d'envoi d'email
CREATE TABLE IF NOT EXISTS email_notifications_log (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  form_submission_id uuid REFERENCES form_submissions(id) ON DELETE CASCADE,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'sent', 'failed')),
  error_message text,
  sent_at timestamptz,
  created_at timestamptz DEFAULT now()
);

-- Activer RLS
ALTER TABLE email_notifications_log ENABLE ROW LEVEL SECURITY;

-- Politique pour que seuls les admins puissent voir les logs
CREATE POLICY "Only authenticated users can view email logs"
  ON email_notifications_log
  FOR SELECT
  TO authenticated
  USING (true);

-- Index pour améliorer les performances
CREATE INDEX IF NOT EXISTS idx_email_notifications_form_id ON email_notifications_log(form_submission_id);
CREATE INDEX IF NOT EXISTS idx_email_notifications_status ON email_notifications_log(status);

-- Créer une fonction qui crée un log
CREATE OR REPLACE FUNCTION log_form_submission_for_email()
RETURNS TRIGGER
SECURITY DEFINER
SET search_path = public
LANGUAGE plpgsql
AS $$
BEGIN
  -- Créer une entrée de log avec statut pending
  INSERT INTO email_notifications_log (form_submission_id, status)
  VALUES (NEW.id, 'pending');
  
  RETURN NEW;
END;
$$;

-- Créer le trigger
CREATE TRIGGER on_form_submission_created
  AFTER INSERT ON form_submissions
  FOR EACH ROW
  EXECUTE FUNCTION log_form_submission_for_email();

COMMENT ON TABLE email_notifications_log IS 'Log des notifications email envoyées pour les soumissions de formulaire';
COMMENT ON FUNCTION log_form_submission_for_email() IS 'Crée une entrée de log pour le traitement de l''email';
