/*
  # Add email notification for form submissions to contact@renoline.fr

  1. Changes
    - Create a trigger function to send email notifications
    - Add trigger to form_submissions table
    - Ensure emails are sent to contact@renoline.fr
    
  2. Security
    - Use SECURITY DEFINER for proper execution
    - Maintain existing RLS policies
*/

-- Create or replace function to queue email notifications
CREATE OR REPLACE FUNCTION notify_form_submission()
RETURNS TRIGGER AS $$
DECLARE
  email_body TEXT;
  total_price NUMERIC;
  type_service TEXT := 'Ponçage et vitrification';
BEGIN
  -- Calculate total price
  total_price := 42 * NEW.surface;  -- Base price
  IF NEW.finition = 'intensif' THEN
    total_price := total_price + (2 * NEW.surface);  -- Finish extra
  END IF;
  IF NEW.teinture THEN
    total_price := total_price + (12 * NEW.surface);  -- Teinture price
  END IF;
  IF NEW.property_type = 'appartement' AND NOT NEW.has_elevator THEN
    total_price := total_price + 80;  -- Installation fee
  END IF;

  -- Construct email body
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
%s

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
    CASE WHEN NEW.address IS NOT NULL THEN E'\n- Adresse : ' || NEW.address ELSE '' END,
    NEW.created_at
  );

  -- Queue email notification to contact@renoline.fr
  INSERT INTO email_queue (
    recipient,
    reply_to,
    subject,
    body
  ) VALUES (
    'contact@renoline.fr',
    NEW.email,
    'Nouvelle demande de devis - ' || NEW.full_name,
    email_body
  );

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for email notifications if it doesn't exist
DROP TRIGGER IF EXISTS trigger_form_notification ON form_submissions;
CREATE TRIGGER trigger_form_notification
  AFTER INSERT ON form_submissions
  FOR EACH ROW
  EXECUTE FUNCTION notify_form_submission();