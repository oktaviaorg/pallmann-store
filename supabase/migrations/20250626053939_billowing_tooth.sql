/*
  # Create reviews system tables

  1. New Tables
    - `reviews`
      - `id` (uuid, primary key)
      - `name` (text, required)
      - `email` (text, required)
      - `title` (text, required)
      - `content` (text, required)
      - `rating` (integer, 1-5)
      - `image_url` (text, optional)
      - `status` (text, pending/approved/rejected)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    
    - `review_responses`
      - `id` (uuid, primary key)
      - `review_id` (uuid, foreign key)
      - `admin_id` (uuid, foreign key)
      - `response_text` (text, required)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    
    - `review_images`
      - `id` (uuid, primary key)
      - `review_id` (uuid, foreign key)
      - `image_path` (text, required)
      - `created_at` (timestamptz)
    
    - `moderation_logs`
      - `id` (uuid, primary key)
      - `review_id` (uuid, foreign key)
      - `admin_id` (uuid, foreign key)
      - `action` (text, required)
      - `details` (jsonb)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Add policies for public read access to approved reviews
    - Add policies for admin management
    - Add policies for review authors to read their own reviews
*/

-- Create reviews table if it doesn't exist
CREATE TABLE IF NOT EXISTS reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  title text NOT NULL,
  content text NOT NULL,
  rating integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
  image_url text,
  status text NOT NULL CHECK (status IN ('pending', 'approved', 'rejected')) DEFAULT 'pending',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create review_responses table if it doesn't exist
CREATE TABLE IF NOT EXISTS review_responses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  review_id uuid REFERENCES reviews(id) ON DELETE CASCADE,
  admin_id uuid REFERENCES auth.users(id),
  response_text text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create review_images table if it doesn't exist
CREATE TABLE IF NOT EXISTS review_images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  review_id uuid REFERENCES reviews(id) ON DELETE CASCADE,
  image_path text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create moderation_logs table if it doesn't exist
CREATE TABLE IF NOT EXISTS moderation_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  review_id uuid REFERENCES reviews(id) ON DELETE CASCADE,
  admin_id uuid REFERENCES auth.users(id),
  action text NOT NULL,
  details jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now()
);

-- Create indexes if they don't exist
CREATE INDEX IF NOT EXISTS reviews_status_idx ON reviews(status);
CREATE INDEX IF NOT EXISTS reviews_email_idx ON reviews(email);
CREATE INDEX IF NOT EXISTS review_images_review_id_idx ON review_images(review_id);
CREATE INDEX IF NOT EXISTS review_responses_review_id_idx ON review_responses(review_id);
CREATE INDEX IF NOT EXISTS moderation_logs_review_id_idx ON moderation_logs(review_id);

-- Enable RLS
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE review_responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE review_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE moderation_logs ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist to avoid conflicts
DROP POLICY IF EXISTS "Public can read approved reviews" ON reviews;
DROP POLICY IF EXISTS "Authors can read their own reviews" ON reviews;
DROP POLICY IF EXISTS "Anyone can create reviews" ON reviews;
DROP POLICY IF EXISTS "Admin can manage all reviews" ON reviews;
DROP POLICY IF EXISTS "Public can read responses" ON review_responses;
DROP POLICY IF EXISTS "Admin can manage responses" ON review_responses;
DROP POLICY IF EXISTS "Public can view approved review images" ON review_images;
DROP POLICY IF EXISTS "Admin can manage review images" ON review_images;
DROP POLICY IF EXISTS "Only admin can access logs" ON moderation_logs;

-- Create policies for reviews
CREATE POLICY "Public can read approved reviews" 
  ON reviews FOR SELECT 
  TO public
  USING (status = 'approved');

CREATE POLICY "Authors can read their own reviews" 
  ON reviews FOR SELECT 
  TO public
  USING ((email = CURRENT_USER) OR (status = 'approved'));

CREATE POLICY "Anyone can create reviews" 
  ON reviews FOR INSERT 
  TO public
  WITH CHECK (true);

CREATE POLICY "Admin can manage all reviews" 
  ON reviews FOR ALL 
  TO authenticated
  USING ((auth.jwt() ->> 'role') = 'admin')
  WITH CHECK ((auth.jwt() ->> 'role') = 'admin');

-- Create policies for review_responses
CREATE POLICY "Public can read responses" 
  ON review_responses FOR SELECT 
  TO public
  USING (EXISTS (
    SELECT 1 FROM reviews 
    WHERE reviews.id = review_responses.review_id 
    AND reviews.status = 'approved'
  ));

CREATE POLICY "Admin can manage responses" 
  ON review_responses FOR ALL 
  TO authenticated
  USING (auth.role() = 'admin')
  WITH CHECK (auth.role() = 'admin');

-- Create policies for review_images
CREATE POLICY "Public can view approved review images" 
  ON review_images FOR SELECT 
  TO public
  USING (EXISTS (
    SELECT 1 FROM reviews 
    WHERE reviews.id = review_images.review_id 
    AND reviews.status = 'approved'
  ));

CREATE POLICY "Admin can manage review images" 
  ON review_images FOR ALL 
  TO authenticated
  USING (auth.role() = 'admin')
  WITH CHECK (auth.role() = 'admin');

-- Create policies for moderation_logs
CREATE POLICY "Only admin can access logs" 
  ON moderation_logs FOR ALL 
  TO authenticated
  USING (auth.role() = 'admin')
  WITH CHECK (auth.role() = 'admin');

-- Create or replace function for logging moderation actions
CREATE OR REPLACE FUNCTION log_moderation_action()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    -- New review submitted
    INSERT INTO moderation_logs (review_id, action, details)
    VALUES (NEW.id, 'submitted', jsonb_build_object('rating', NEW.rating, 'status', NEW.status));
  ELSIF TG_OP = 'UPDATE' THEN
    -- Status changed
    IF OLD.status <> NEW.status THEN
      INSERT INTO moderation_logs (
        review_id, 
        admin_id, 
        action, 
        details
      )
      VALUES (
        NEW.id, 
        auth.uid(), 
        CASE 
          WHEN NEW.status = 'approved' THEN 'approved'
          WHEN NEW.status = 'rejected' THEN 'rejected'
          ELSE 'status_changed'
        END,
        jsonb_build_object(
          'old_status', OLD.status,
          'new_status', NEW.status
        )
      );
    END IF;
  ELSIF TG_OP = 'DELETE' THEN
    -- Review deleted
    INSERT INTO moderation_logs (
      review_id, 
      admin_id, 
      action, 
      details
    )
    VALUES (
      OLD.id, 
      auth.uid(), 
      'deleted',
      jsonb_build_object('rating', OLD.rating, 'status', OLD.status)
    );
  END IF;
  
  RETURN NULL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create or replace function for updating updated_at column
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Drop existing triggers if they exist
DROP TRIGGER IF EXISTS log_review_moderation ON reviews;
DROP TRIGGER IF EXISTS update_reviews_updated_at ON reviews;
DROP TRIGGER IF EXISTS update_review_responses_updated_at ON review_responses;

-- Create trigger for logging moderation actions
CREATE TRIGGER log_review_moderation
  AFTER INSERT OR UPDATE OR DELETE ON reviews
  FOR EACH ROW
  EXECUTE FUNCTION log_moderation_action();

-- Create triggers for updated_at columns
CREATE TRIGGER update_reviews_updated_at
  BEFORE UPDATE ON reviews
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_review_responses_updated_at
  BEFORE UPDATE ON review_responses
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Insert sample reviews with explicit IDs to avoid subquery issues
DO $$
DECLARE
  review_id_1 uuid := gen_random_uuid();
  review_id_2 uuid := gen_random_uuid();
  review_id_3 uuid := gen_random_uuid();
  review_id_4 uuid := gen_random_uuid();
BEGIN
  -- Insert sample reviews
  INSERT INTO reviews (id, name, email, title, content, rating, status, created_at)
  VALUES 
    (review_id_1, 'Marie Dupont', 'marie.dupont@example.com', 'Travail impeccable', 'Nous avons fait appel aux Ponceurs Réunis pour rénover notre parquet ancien. Le résultat est magnifique, l''équipe a été très professionnelle et le chantier s''est déroulé sans aucun problème. Je recommande vivement !', 5, 'approved', now() - interval '2 days'),
    
    (review_id_2, 'Pierre Martin', 'pierre.martin@example.com', 'Très satisfait de la prestation', 'Ponçage et vitrification de notre parquet en chêne. Travail soigné, équipe à l''écoute et respectueuse des délais. Le résultat est à la hauteur de nos attentes. Merci !', 5, 'approved', now() - interval '5 days'),
    
    (review_id_3, 'Sophie Leclerc', 'sophie.leclerc@example.com', 'Bon travail mais délais un peu longs', 'La qualité du travail est excellente et le rendu final est superbe. Seul bémol : les délais ont été un peu plus longs que prévu. Cela dit, le résultat en valait la peine.', 4, 'approved', now() - interval '10 days'),
    
    (review_id_4, 'Jean Moreau', 'jean.moreau@example.com', 'Prestation correcte', 'Le ponçage a été bien réalisé mais j''aurais aimé plus de conseils sur l''entretien du parquet. L''équipe était néanmoins professionnelle et ponctuelle.', 3, 'approved', now() - interval '15 days');

  -- Insert sample responses using the explicit IDs
  INSERT INTO review_responses (review_id, response_text, created_at)
  VALUES 
    (review_id_3, 'Merci pour votre retour Sophie. Nous sommes désolés pour le délai supplémentaire. Nous travaillons constamment à améliorer notre planification pour respecter au mieux les délais annoncés. N''hésitez pas à nous contacter pour tout conseil d''entretien.', now() - interval '9 days'),
    
    (review_id_4, 'Merci pour votre avis Jean. Nous prenons note de votre remarque concernant les conseils d''entretien. Nous allons renforcer cet aspect de notre service. N''hésitez pas à nous contacter si vous avez des questions sur l''entretien de votre parquet.', now() - interval '14 days');
END $$;