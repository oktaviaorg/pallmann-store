/*
  # Correction du système de notification par email

  1. Changements
    - Suppression des références à l'extension net
    - Utilisation d'une table de file d'attente pour les notifications
    - Mise à jour du trigger pour utiliser la nouvelle approche

  2. Sécurité
    - Maintien des politiques de sécurité existantes
    - Protection des données sensibles
*/

-- Supprimer l'ancien trigger et la fonction
DROP TRIGGER IF EXISTS send_form_email ON form_submissions;
DROP FUNCTION IF EXISTS send_form_notification;

-- Créer une table pour la file d'attente des notifications
CREATE TABLE IF NOT EXISTS email_queue (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  submission_id uuid NOT NULL REFERENCES form_submissions(id),
  recipient text NOT NULL,
  sender text NOT NULL,
  reply_to text,
  subject text NOT NULL,
  body text NOT NULL,
  created_at timestamptz DEFAULT now(),
  processed boolean DEFAULT false,
  processed_at timestamptz,
  error text
);

-- Activer RLS sur la table de file d'attente
ALTER TABLE email_queue ENABLE ROW LEVEL SECURITY;

-- Créer une fonction pour formater et mettre en file d'attente les emails
CREATE OR REPLACE FUNCTION queue_form_notification()
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

  -- Mettre l'email en file d'attente
  INSERT INTO email_queue (
    submission_id,
    recipient,
    sender,
    reply_to,
    subject,
    body
  ) VALUES (
    NEW.id,
    'contact@poncages.fr',
    'Formulaire Poncages <formulaire@poncages.fr>',
    NEW.email,
    'Nouvelle demande de devis - ' || NEW.full_name,
    email_body
  );

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Créer le nouveau trigger pour la mise en file d'attente des emails
CREATE TRIGGER queue_form_notification
  AFTER INSERT ON form_submissions
  FOR EACH ROW
  EXECUTE FUNCTION queue_form_notification();

-- Ajouter les politiques de sécurité pour la table email_queue
CREATE POLICY "Service can read email queue"
  ON email_queue
  FOR SELECT
  TO service_role
  USING (true);

CREATE POLICY "Service can update email queue"
  ON email_queue
  FOR UPDATE
  TO service_role
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Service can insert into email queue"
  ON email_queue
  FOR INSERT
  TO service_role
  WITH CHECK (true);