/*
  # Simplification du système de notification par email

  1. Changements
    - Suppression du trigger complexe avec pg_net
    - Conservation du système simple basé sur email_notifications_log
    - Les emails sont envoyés directement depuis le frontend via l'edge function

  2. Notes
    - Le frontend appelle directement l'edge function send-form-email
    - L'adresse de destination est maintenant contact@ponceur-parquet.fr
    - Système plus simple et plus fiable
*/

-- Supprimer le trigger complexe
DROP TRIGGER IF EXISTS send_form_notification_trigger ON form_submissions;
DROP FUNCTION IF EXISTS notify_form_submission();

-- Recréer le trigger simple qui log les soumissions
CREATE OR REPLACE FUNCTION log_form_submission_for_email()
RETURNS TRIGGER AS $$
BEGIN
  -- Créer une entrée de log avec statut pending
  INSERT INTO email_notifications_log (form_submission_id, status)
  VALUES (NEW.id, 'pending');
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Créer le trigger
DROP TRIGGER IF EXISTS on_form_submission_created ON form_submissions;
CREATE TRIGGER on_form_submission_created
  AFTER INSERT ON form_submissions
  FOR EACH ROW
  EXECUTE FUNCTION log_form_submission_for_email();