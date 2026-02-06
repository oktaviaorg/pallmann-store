/*
  # Add blog tables

  1. New Tables
    - `categories`
      - `id` (uuid, primary key)
      - `name` (text, required)
      - `slug` (text, required, unique)
      - `description` (text)
      - `created_at` (timestamptz)
    
    - `articles`
      - `id` (uuid, primary key)
      - `title` (text, required)
      - `slug` (text, required, unique)
      - `content` (text, required)
      - `excerpt` (text)
      - `category_id` (uuid, foreign key)
      - `keywords` (text[])
      - `published` (boolean)
      - `published_at` (timestamptz)
      - `featured_image` (text)
      - `meta_title` (text)
      - `meta_description` (text)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on both tables
    - Add policies for public read access
    - Add policies for admin write access
*/

-- Create categories table
CREATE TABLE categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text NOT NULL UNIQUE,
  description text,
  created_at timestamptz DEFAULT now()
);

-- Create articles table
CREATE TABLE articles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text NOT NULL UNIQUE,
  content text NOT NULL,
  excerpt text,
  category_id uuid REFERENCES categories(id),
  keywords text[],
  published boolean DEFAULT false,
  published_at timestamptz,
  featured_image text,
  meta_title text,
  meta_description text,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;

-- Policies for categories
CREATE POLICY "Allow public read access" ON categories
  FOR SELECT TO public
  USING (true);

CREATE POLICY "Allow admin write access" ON categories
  FOR ALL TO authenticated
  USING (auth.role() = 'admin')
  WITH CHECK (auth.role() = 'admin');

-- Policies for articles
CREATE POLICY "Allow public read access to published articles" ON articles
  FOR SELECT TO public
  USING (published = true);

CREATE POLICY "Allow admin write access" ON articles
  FOR ALL TO authenticated
  USING (auth.role() = 'admin')
  WITH CHECK (auth.role() = 'admin');

-- Insert some initial categories
INSERT INTO categories (name, slug, description) VALUES
  ('Conseils', 'conseils', 'Conseils et astuces pour l''entretien de votre parquet'),
  ('Rénovation', 'renovation', 'Tout sur la rénovation de parquet'),
  ('Actualités', 'actualites', 'Les dernières nouvelles du secteur');

-- Insert a sample article
INSERT INTO articles (
  title,
  slug,
  content,
  excerpt,
  category_id,
  keywords,
  published,
  published_at,
  featured_image,
  meta_title,
  meta_description
) VALUES (
  'Comment entretenir son parquet au quotidien',
  'entretien-parquet-quotidien',
  '# Comment entretenir son parquet au quotidien

Un parquet bien entretenu peut durer des décennies. Voici nos conseils pour préserver sa beauté au quotidien.

## 1. Nettoyage régulier

Le nettoyage régulier est essentiel pour maintenir votre parquet en bon état. Voici les étapes à suivre :

- Passez l''aspirateur quotidiennement
- Utilisez un balai microfibre sec
- Évitez l''eau stagnante

## 2. Produits adaptés

Choisissez des produits spécifiquement conçus pour votre type de parquet :

- Parquet vitrifié : nettoyant doux
- Parquet huilé : savon spécial bois
- Évitez les produits agressifs

## 3. Prévention

La prévention est la clé pour éviter les dégâts :

- Placez des patins sous les meubles
- Utilisez des tapis aux entrées
- Essuyez immédiatement les liquides renversés',
  'Découvrez les meilleures pratiques pour l''entretien quotidien de votre parquet et prolongez sa durée de vie.',
  (SELECT id FROM categories WHERE slug = 'conseils'),
  ARRAY['entretien', 'parquet', 'nettoyage', 'conseils'],
  true,
  now(),
  'https://images.unsplash.com/photo-1622150162297-1b9076a27561',
  'Guide complet pour l''entretien quotidien de votre parquet',
  'Apprenez à entretenir votre parquet au quotidien avec nos conseils d''experts pour une longévité maximale.'
);