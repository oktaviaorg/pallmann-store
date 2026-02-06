/*
  # Add email notifications for form submissions

  1. Changes
    - Create a function to format submission data
    - Add a trigger to notify on new submissions
    - Store notification data for Edge Function processing

  2. Security
    - Function runs with security definer
    - Only processes new form submissions
*/

-- Create a table to store notification queue
CREATE TABLE IF NOT EXISTS notification_queue (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  submission_id uuid NOT NULL REFERENCES form_submissions(id),
  recipient text NOT NULL,
  subject text NOT NULL,
  body text NOT NULL,
  created_at timestamptz DEFAULT now(),
  processed boolean DEFAULT false
);

-- Enable RLS on notification queue
ALTER TABLE notification_queue ENABLE ROW LEVEL SECURITY;

-- Create function to format email content
CREATE OR REPLACE FUNCTION format_submission_email()
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

  -- Queue email notification
  INSERT INTO notification_queue (
    submission_id,
    recipient,
    subject,
    body
  ) VALUES (
    NEW.id,
    'contact@poncages.fr',
    'Nouvelle demande de devis - ' || NEW.full_name,
    email_body
  );

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for email notifications
DROP TRIGGER IF EXISTS queue_submission_notification ON form_submissions;
CREATE TRIGGER queue_submission_notification
  AFTER INSERT ON form_submissions
  FOR EACH ROW
  EXECUTE FUNCTION format_submission_email();

-- Add policy to allow service role to read notification queue
CREATE POLICY "Service can read notification queue"
  ON notification_queue
  FOR SELECT
  TO service_role
  USING (true);

-- Add policy to allow service role to update notification queue
CREATE POLICY "Service can update notification queue"
  ON notification_queue
  FOR UPDATE
  TO service_role
  USING (true)
  WITH CHECK (true);