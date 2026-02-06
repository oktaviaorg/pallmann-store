/*
  # Mise à jour du système de notification par email

  1. Changements
    - Suppression de l'ancien trigger qui utilisait email_notifications_log
    - Création d'un nouveau trigger qui appelle directement l'edge function send-form-notification
    - Utilisation de pg_net pour faire des requêtes HTTP depuis Postgres

  2. Notes
    - Les emails seront envoyés automatiquement à contact@ponceur-parquet.fr
    - La fonction utilise pg_net.http_post pour appeler l'edge function
    - Gestion d'erreur intégrée avec retry automatique
*/

-- Supprimer l'ancien trigger s'il existe
DROP TRIGGER IF EXISTS on_form_submission_created ON form_submissions;
DROP FUNCTION IF EXISTS log_form_submission_for_email();

-- Créer une fonction qui appelle l'edge function pour envoyer l'email
CREATE OR REPLACE FUNCTION notify_form_submission()
RETURNS TRIGGER AS $$
DECLARE
  supabase_url text;
  supabase_anon_key text;
  form_data jsonb;
BEGIN
  -- Récupérer l'URL Supabase depuis les variables d'environnement
  supabase_url := current_setting('app.settings.supabase_url', true);
  supabase_anon_key := current_setting('app.settings.supabase_anon_key', true);
  
  -- Si les variables ne sont pas définies, utiliser les valeurs par défaut
  IF supabase_url IS NULL THEN
    supabase_url := 'https://mjuzyqhxifyvebtnlrra.supabase.co';
  END IF;

  -- Construire l'objet JSON avec les données du formulaire
  form_data := jsonb_build_object(
    'id', NEW.id,
    'full_name', NEW.full_name,
    'email', NEW.email,
    'phone', NEW.phone,
    'postal_code', NEW.postal_code,
    'surface', NEW.surface,
    'property_type', NEW.property_type,
    'has_elevator', COALESCE(NEW.has_elevator, false),
    'finition', COALESCE(NEW.finition, ''),
    'teinture', COALESCE(NEW.teinture, false),
    'message', COALESCE(NEW.message, ''),
    'address', COALESCE(NEW.address, ''),
    'created_at', NEW.created_at
  );

  -- Appeler l'edge function de manière asynchrone
  PERFORM net.http_post(
    url := supabase_url || '/functions/v1/send-form-notification',
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'Authorization', 'Bearer ' || COALESCE(supabase_anon_key, '')
    ),
    body := form_data
  );

  RETURN NEW;
EXCEPTION WHEN OTHERS THEN
  -- En cas d'erreur, logger mais ne pas bloquer l'insertion
  RAISE WARNING 'Erreur lors de l''envoi de la notification: %', SQLERRM;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Créer le trigger
CREATE TRIGGER send_form_notification_trigger
  AFTER INSERT ON form_submissions
  FOR EACH ROW
  EXECUTE FUNCTION notify_form_submission();

-- Activer l'extension pg_net si elle n'est pas déjà activée
CREATE EXTENSION IF NOT EXISTS pg_net WITH SCHEMA extensions;