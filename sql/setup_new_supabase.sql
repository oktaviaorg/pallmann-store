-- =====================================================
-- SETUP SUPABASE PALLMANN-STORE
-- Projet: znfpdjieowjentvugkbe
-- =====================================================

-- 1. TABLE CATEGORIES
CREATE TABLE IF NOT EXISTS categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. TABLE ARTICLES
CREATE TABLE IF NOT EXISTS articles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    excerpt TEXT,
    content TEXT,
    featured_image TEXT,
    category_id UUID REFERENCES categories(id),
    published BOOLEAN DEFAULT false,
    published_at TIMESTAMPTZ,
    meta_title VARCHAR(255),
    meta_description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. ACTIVER RLS
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;

-- 4. POLICIES - Lecture publique
CREATE POLICY "Categories are viewable by everyone" ON categories
    FOR SELECT USING (true);

CREATE POLICY "Articles are viewable by everyone" ON articles
    FOR SELECT USING (published = true);

-- 5. POLICIES - Écriture (pour service_role)
CREATE POLICY "Enable insert for service role" ON categories
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Enable update for service role" ON categories
    FOR UPDATE USING (true);

CREATE POLICY "Enable insert for service role" ON articles
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Enable update for service role" ON articles
    FOR UPDATE USING (true);

-- 6. INSÉRER LES CATÉGORIES PALLMANN
INSERT INTO categories (name, slug, description, sort_order) VALUES
    ('Best-sellers', 'best-sellers', 'Nos produits les plus vendus', 1),
    ('Vitrificateurs', 'vitrificateurs', 'Vernis et vitrificateurs pour parquet', 2),
    ('Huiles', 'huiles', 'Huiles naturelles pour parquet', 3),
    ('Ponceuses', 'ponceuses', 'Machines de ponçage professionnel', 4),
    ('Bordeuses', 'bordeuses', 'Ponceuses de bordure', 5),
    ('Consommables', 'consommables', 'Abrasifs, disques et bandes', 6),
    ('Entretien', 'entretien', 'Produits de nettoyage et entretien', 7),
    ('Préparation', 'preparation', 'Primaires et bouche-pores', 8),
    ('Accessoires', 'accessoires', 'Outils et applicateurs', 9)
ON CONFLICT (slug) DO NOTHING;

-- 7. INDEX pour performance
CREATE INDEX IF NOT EXISTS idx_articles_category ON articles(category_id);
CREATE INDEX IF NOT EXISTS idx_articles_published ON articles(published);
CREATE INDEX IF NOT EXISTS idx_articles_slug ON articles(slug);
CREATE INDEX IF NOT EXISTS idx_categories_slug ON categories(slug);
