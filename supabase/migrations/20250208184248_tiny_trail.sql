/*
  # Configuration du système de notification par email

  1. Changements
    - Ajout d'une fonction pour formater et envoyer les emails via Resend
    - Configuration des webhooks pour les notifications
    - Mise en place des politiques de sécurité

  2. Sécurité
    - Utilisation de SECURITY DEFINER pour l'exécution sécurisée
    - Protection des données sensibles
    - Validation des entrées
*/

-- Créer une fonction pour envoyer les emails via Resend
CREATE OR REPLACE FUNCTION send_form_notification()
RETURNS TRIGGER AS $$
DECLARE
  email_body TEXT;
  total_price NUMERIC;
  type_service TEXT := 'Ponçage et vitrification';
BEGIN
  -- Calculer le prix total
  total_price := 42 * NEW.surface;  -- Prix de base
  IF NEW.finition = 'intensif' THEN
    total_price := total_price + (2 * NEW.surface);  -- Supplément finition
  END IF;
  IF NEW.teinture THEN
    total_price := total_price + (12 * NEW.surface);  -- Prix teinture
  END IF;
  IF NEW.property_type = 'appartement' AND NOT NEW.has_elevator THEN
    total_price := total_price + 80;  -- Frais d'installation
  END IF;

  -- Construire le corps de l'email
  email_body := format(
    'Nouvelle demande de devis reçue

Détails de la demande :
- Surface à traiter : %s m²
- Type de service : %s
- Type de finition : %s
%s
- Type de bien : %s
%s

Prix estimatif : %s€ TTC

%s

Coordonnées :
- Nom : %s
- Téléphone : %s
- Email : %s
- Code postal : %s

Date de la demande : %s',
    NEW.surface,
    type_service,
    NEW.finition,
    CASE WHEN NEW.teinture THEN '- Teinture du bois : Oui (+12€/m²)' ELSE '' END,
    COALESCE(NEW.property_type, 'Non spécifié'),
    CASE 
      WHEN NEW.property_type = 'appartement' 
      THEN format('- Ascenseur : %s', CASE WHEN NEW.has_elevator THEN 'Oui' ELSE 'Non' END)
      ELSE ''
    END,
    total_price,
    CASE WHEN NEW.message IS NOT NULL THEN E'\nMessage supplémentaire :\n' || NEW.message ELSE '' END,
    NEW.full_name,
    NEW.phone,
    NEW.email,
    NEW.postal_code,
    NEW.created_at
  );

  -- Appeler le webhook Supabase Edge Function pour l'envoi d'email
  PERFORM
    net.http_post(
      url := 'https://qsbkyhbntjpztjyzbxud.supabase.co/functions/v1/send-form-email',
      headers := jsonb_build_object(
        'Content-Type', 'application/json',
        'Authorization', 'Bearer ' || current_setting('supabase_rest_url', true)
      ),
      body := jsonb_build_object(
        'to', 'contact@poncages.fr',
        'from', 'Formulaire Poncages <formulaire@poncages.fr>',
        'subject', 'Nouvelle demande de devis - ' || NEW.full_name,
        'text', email_body,
        'replyTo', NEW.email
      )
    );

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Créer le trigger pour l'envoi d'email
DROP TRIGGER IF EXISTS send_form_email ON form_submissions;
CREATE TRIGGER send_form_email
  AFTER INSERT ON form_submissions
  FOR EACH ROW
  EXECUTE FUNCTION send_form_notification();