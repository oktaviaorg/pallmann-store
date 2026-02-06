/*
  # Ajout du système de notification email automatique
  
  Cette migration ajoute un trigger qui envoie automatiquement un email
  à contact@poncages.fr à chaque nouvelle soumission de formulaire.
  
  1. Nouvelles fonctions
    - `notify_form_submission()` - Fonction trigger qui appelle l'Edge Function
  
  2. Nouveaux triggers
    - `on_form_submission_created` - Se déclenche après chaque INSERT dans form_submissions
  
  3. Sécurité
    - La fonction utilise l'Edge Function qui gère l'authentification Resend
    - Pas de données sensibles exposées
*/

-- Créer la fonction qui sera appelée par le trigger
CREATE OR REPLACE FUNCTION notify_form_submission()
RETURNS TRIGGER
SECURITY DEFINER
SET search_path = public
LANGUAGE plpgsql
AS $$
DECLARE
  request_id bigint;
BEGIN
  -- Appeler l'Edge Function de manière asynchrone via pg_net
  SELECT 
    net.http_post(
      url := current_setting('app.settings.supabase_url') || '/functions/v1/send-form-notification',
      headers := jsonb_build_object(
        'Content-Type', 'application/json',
        'Authorization', 'Bearer ' || current_setting('app.settings.service_role_key')
      ),
      body := jsonb_build_object(
        'id', NEW.id,
        'full_name', NEW.full_name,
        'email', NEW.email,
        'phone', NEW.phone,
        'postal_code', NEW.postal_code,
        'surface', NEW.surface,
        'property_type', NEW.property_type,
        'has_elevator', NEW.has_elevator,
        'finition', NEW.finition,
        'teinture', NEW.teinture,
        'message', NEW.message,
        'address', NEW.address,
        'created_at', NEW.created_at
      )
    ) INTO request_id;
  
  -- Retourner la nouvelle ligne
  RETURN NEW;
END;
$$;

-- Créer le trigger qui s'exécute après chaque insertion
DROP TRIGGER IF EXISTS on_form_submission_created ON form_submissions;

CREATE TRIGGER on_form_submission_created
  AFTER INSERT ON form_submissions
  FOR EACH ROW
  EXECUTE FUNCTION notify_form_submission();

-- Commenter la fonction et le trigger
COMMENT ON FUNCTION notify_form_submission() IS 'Envoie une notification email via Edge Function après chaque soumission de formulaire';
COMMENT ON TRIGGER on_form_submission_created ON form_submissions IS 'Déclenche l''envoi d''email de notification à contact@poncages.fr';
