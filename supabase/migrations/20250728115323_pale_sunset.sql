/*
  # Activer RLS sur notification_queue

  1. Sécurité
    - Activer RLS sur la table `notification_queue`
    - Ajouter une politique pour le service role (accès complet)
    - Ajouter une politique pour les utilisateurs authentifiés (lecture limitée)

  2. Modifications
    - Activation de Row Level Security
    - Création de politiques d'accès sécurisées
    - Protection des données de notification

  Cette migration corrige le problème de sécurité détecté où RLS n'était pas activé
  sur une table publique contenant des données sensibles.
*/

-- Activer RLS sur la table notification_queue
ALTER TABLE notification_queue ENABLE ROW LEVEL SECURITY;

-- Politique pour le service role (accès complet pour le système)
CREATE POLICY "Service role can manage notification queue"
  ON notification_queue
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Politique pour les utilisateurs authentifiés (lecture limitée)
CREATE POLICY "Authenticated users can read their own notifications"
  ON notification_queue
  FOR SELECT
  TO authenticated
  USING (
    -- Permettre la lecture seulement si l'utilisateur est admin
    -- ou si la notification concerne une soumission qui lui appartient
    EXISTS (
      SELECT 1 FROM form_submissions 
      WHERE form_submissions.id = notification_queue.submission_id 
      AND form_submissions.email = (auth.jwt() ->> 'email')
    )
    OR 
    (auth.jwt() ->> 'role') = 'admin'
  );

-- Politique pour empêcher l'insertion directe par les utilisateurs
-- Seul le système (service_role) peut insérer des notifications
CREATE POLICY "Only system can insert notifications"
  ON notification_queue
  FOR INSERT
  TO service_role
  WITH CHECK (true);