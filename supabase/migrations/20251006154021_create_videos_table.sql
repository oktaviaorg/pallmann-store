/*
  # Création de l'espace vidéo pour le référencement

  1. Nouvelle table
    - `videos`
      - `id` (uuid, clé primaire)
      - `title` (text) - Titre de la vidéo
      - `youtube_url` (text) - URL YouTube de la vidéo
      - `youtube_id` (text) - ID YouTube pour l'embed
      - `description` (text) - Description courte pour la liste
      - `article_content` (text) - Contenu de l'article/conseils (supporte Markdown)
      - `slug` (text, unique) - URL-friendly slug pour SEO
      - `meta_description` (text) - Meta description pour SEO
      - `keywords` (text[]) - Mots-clés pour le référencement
      - `views` (integer) - Nombre de vues
      - `published` (boolean) - Statut de publication
      - `published_at` (timestamptz) - Date de publication
      - `order` (integer) - Ordre d'affichage
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
      
  2. Sécurité
    - Activer RLS sur la table `videos`
    - Politique de lecture publique pour les vidéos publiées
    - Politique d'administration pour la gestion (authentifiés uniquement)
    
  3. Index
    - Index sur `slug` pour les requêtes de page individuelle
    - Index sur `published` et `published_at` pour les listes
    - Index sur `order` pour le tri
*/

CREATE TABLE IF NOT EXISTS videos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  youtube_url text NOT NULL,
  youtube_id text NOT NULL,
  description text NOT NULL,
  article_content text NOT NULL,
  slug text UNIQUE NOT NULL,
  meta_description text NOT NULL,
  keywords text[] DEFAULT '{}',
  views integer DEFAULT 0,
  published boolean DEFAULT false,
  published_at timestamptz,
  "order" integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE videos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Videos publiées visibles par tous"
  ON videos
  FOR SELECT
  USING (published = true);

CREATE POLICY "Administrateurs peuvent tout gérer sur videos"
  ON videos
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE INDEX IF NOT EXISTS idx_videos_slug ON videos(slug);
CREATE INDEX IF NOT EXISTS idx_videos_published ON videos(published, published_at DESC);
CREATE INDEX IF NOT EXISTS idx_videos_order ON videos("order" ASC);

-- Trigger pour mettre à jour updated_at
CREATE OR REPLACE FUNCTION update_videos_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER videos_updated_at
  BEFORE UPDATE ON videos
  FOR EACH ROW
  EXECUTE FUNCTION update_videos_updated_at();

-- Insérer quelques vidéos d'exemple
INSERT INTO videos (title, youtube_url, youtube_id, description, article_content, slug, meta_description, keywords, published, published_at, "order") VALUES
(
  'Comment poncer un parquet ancien ?',
  'https://www.youtube.com/watch?v=EXAMPLE1',
  'EXAMPLE1',
  'Découvrez les techniques professionnelles pour poncer un parquet ancien et lui redonner vie.',
  E'# Guide complet pour poncer un parquet ancien\n\n## Introduction\n\nLe ponçage d''un parquet ancien est une étape cruciale pour lui redonner son éclat d''origine. Chez Les Ponceurs Réunis, nous utilisons des techniques éprouvées depuis 15 ans.\n\n## Nos conseils d''experts\n\n### 1. Préparation du chantier\n- Vider complètement la pièce\n- Retirer les plinthes si nécessaire\n- Vérifier l''état du parquet\n\n### 2. Choix du matériel\nNous utilisons des ponceuses professionnelles avec système anti-poussière pour garantir un résultat optimal et un chantier propre.\n\n### 3. Le ponçage en 3 étapes\n- **Grain grossier** : Élimination des anciennes finitions\n- **Grain moyen** : Uniformisation de la surface\n- **Grain fin** : Finition lisse et parfaite\n\n## Pourquoi faire appel à un professionnel ?\n\nLe ponçage de parquet nécessite une expertise technique et un équipement professionnel. Une mauvaise manipulation peut endommager irrémédiablement votre parquet.\n\n**Les Ponceurs Réunis** interviennent dans toute l''Alsace avec un devis gratuit sous 24h.',
  'comment-poncer-parquet-ancien',
  'Découvrez comment poncer un parquet ancien avec Les Ponceurs Réunis. Conseils d''experts, techniques professionnelles et astuces pour un résultat parfait.',
  ARRAY['ponçage parquet', 'parquet ancien', 'rénovation parquet', 'conseils ponçage', 'alsace'],
  true,
  now(),
  1
),
(
  'Vitrification vs Huilage : Quelle finition choisir ?',
  'https://www.youtube.com/watch?v=EXAMPLE2',
  'EXAMPLE2',
  'Comparaison détaillée entre vitrification et huilage pour vous aider à choisir la meilleure finition.',
  E'# Vitrification ou Huilage : Le guide complet\n\n## Comprendre les deux finitions\n\nChoisir entre vitrification et huilage est une décision importante qui impacte l''esthétique et l''entretien de votre parquet.\n\n## La Vitrification\n\n### Avantages\n- Protection durable (10-15 ans)\n- Entretien facile\n- Résistance aux taches et à l''eau\n- Aspect brillant, satiné ou mat selon votre choix\n\n### Idéal pour\n- Pièces à fort passage\n- Familles avec enfants\n- Cuisine et salle à manger\n\n## L''Huilage\n\n### Avantages\n- Aspect naturel et chaleureux\n- Réparations localisées possibles\n- Respiration du bois\n- Toucher agréable\n\n### Idéal pour\n- Chambres\n- Bureaux\n- Style authentique\n\n## Notre recommandation professionnelle\n\nChez **Les Ponceurs Réunis**, nous analysons votre usage et vos préférences pour vous conseiller la meilleure solution. Contactez-nous pour un devis personnalisé gratuit.',
  'vitrification-huilage-quelle-finition-choisir',
  'Vitrification ou huilage pour votre parquet ? Les Ponceurs Réunis vous expliquent les différences et vous aident à choisir la meilleure finition.',
  ARRAY['vitrification parquet', 'huilage parquet', 'finition parquet', 'conseils parquet', 'alsace'],
  true,
  now(),
  2
)
ON CONFLICT (slug) DO NOTHING;