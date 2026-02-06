/*
  # Fix email notification system

  1. Changes
    - Remove pgnet dependency
    - Clean up previous email triggers
    - Ensure email queue system is properly configured

  2. Security
    - Maintain existing RLS policies
    - Keep service role access for queue processing
*/

-- Drop previous email sending functions and triggers
DROP TRIGGER IF EXISTS send_form_email ON form_submissions;
DROP FUNCTION IF EXISTS send_form_notification();

-- Clean up any existing notification triggers
DROP TRIGGER IF EXISTS queue_submission_notification ON form_submissions;
DROP FUNCTION IF EXISTS format_submission_email();

-- Ensure email queue table exists and is properly configured
CREATE TABLE IF NOT EXISTS email_queue (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  recipient text NOT NULL,
  sender text NOT NULL DEFAULT 'Formulaire Poncages <formulaire@poncages.fr>',
  reply_to text,
  subject text NOT NULL,
  body text NOT NULL,
  created_at timestamptz DEFAULT now(),
  processed boolean DEFAULT false,
  processed_at timestamptz,
  error text
);

-- Enable RLS
ALTER TABLE email_queue ENABLE ROW LEVEL SECURITY;

-- Create function to format and queue email
CREATE OR REPLACE FUNCTION queue_form_notification()
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
  INSERT INTO email_queue (
    recipient,
    reply_to,
    subject,
    body
  ) VALUES (
    'contact@poncages.fr',
    NEW.email,
    'Nouvelle demande de devis - ' || NEW.full_name,
    email_body
  );

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for email notifications
DROP TRIGGER IF EXISTS queue_form_notification ON form_submissions;
CREATE TRIGGER queue_form_notification
  AFTER INSERT ON form_submissions
  FOR EACH ROW
  EXECUTE FUNCTION queue_form_notification();

-- Add policies for email queue
DROP POLICY IF EXISTS "Service role can manage email queue" ON email_queue;
CREATE POLICY "Service role can manage email queue"
  ON email_queue
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

DROP POLICY IF EXISTS "Anon can insert into email queue" ON email_queue;
CREATE POLICY "Anon can insert into email queue"
  ON email_queue
  FOR INSERT
  TO anon
  WITH CHECK (true);