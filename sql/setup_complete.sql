-- =====================================================
-- SETUP COMPLET SUPABASE PALLMANN-STORE
-- Projet: znfpdjieowjentvugkbe
-- =====================================================

-- CATEGORIES (déjà créée mais on s'assure)
CREATE TABLE IF NOT EXISTS categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- SUBCATEGORIES
CREATE TABLE IF NOT EXISTS subcategories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(100) NOT NULL,
    category_id UUID REFERENCES categories(id),
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- PRODUCTS
CREATE TABLE IF NOT EXISTS products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    description TEXT,
    article_number VARCHAR(50),
    category_id UUID REFERENCES categories(id),
    subcategory_id UUID REFERENCES subcategories(id),
    price_ht DECIMAL(10,2),
    price_ttc DECIMAL(10,2),
    price_achat DECIMAL(10,2),
    tva DECIMAL(5,2) DEFAULT 20,
    image_url TEXT,
    specs JSONB,
    features TEXT[],
    included TEXT,
    application TEXT,
    is_bestseller BOOLEAN DEFAULT false,
    is_available BOOLEAN DEFAULT true,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ARTICLES (blog)
CREATE TABLE IF NOT EXISTS articles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    excerpt TEXT,
    content TEXT,
    featured_image TEXT,
    category_id UUID REFERENCES categories(id),
    keywords TEXT[],
    published BOOLEAN DEFAULT false,
    published_at TIMESTAMPTZ,
    meta_title VARCHAR(255),
    meta_description TEXT,
    view_count INTEGER DEFAULT 0,
    is_popular BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- FORM SUBMISSIONS (formulaires contact)
CREATE TABLE IF NOT EXISTS form_submissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    form_type VARCHAR(50),
    name VARCHAR(255),
    email VARCHAR(255),
    phone VARCHAR(50),
    company VARCHAR(255),
    message TEXT,
    data JSONB,
    source VARCHAR(100),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- QUOTE REQUESTS (demandes de devis)
CREATE TABLE IF NOT EXISTS quote_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255),
    email VARCHAR(255),
    phone VARCHAR(50),
    company VARCHAR(255),
    product_id UUID REFERENCES products(id),
    product_name VARCHAR(255),
    message TEXT,
    surface_m2 DECIMAL(10,2),
    status VARCHAR(50) DEFAULT 'pending',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- PRO REQUESTS (demandes pro)
CREATE TABLE IF NOT EXISTS pro_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255),
    email VARCHAR(255),
    phone VARCHAR(50),
    company VARCHAR(255),
    siret VARCHAR(20),
    activity VARCHAR(255),
    message TEXT,
    status VARCHAR(50) DEFAULT 'pending',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- GALLERY PHOTOS
CREATE TABLE IF NOT EXISTS gallery_photos (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255),
    description TEXT,
    image_url TEXT NOT NULL,
    category VARCHAR(100),
    location VARCHAR(255),
    is_featured BOOLEAN DEFAULT false,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- REVIEWS (avis clients)
CREATE TABLE IF NOT EXISTS reviews (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    author_name VARCHAR(255),
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    location VARCHAR(255),
    is_verified BOOLEAN DEFAULT false,
    is_featured BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- YOUTUBE VIDEOS
CREATE TABLE IF NOT EXISTS youtube_videos (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255),
    video_id VARCHAR(50),
    description TEXT,
    category VARCHAR(100),
    is_featured BOOLEAN DEFAULT false,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- GOOGLE ADS LEADS
CREATE TABLE IF NOT EXISTS google_ads_leads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    gclid VARCHAR(255),
    campaign VARCHAR(255),
    source VARCHAR(100),
    form_type VARCHAR(50),
    data JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- COMPANY CODES (codes pro)
CREATE TABLE IF NOT EXISTS company_codes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    code VARCHAR(50) UNIQUE,
    company_name VARCHAR(255),
    discount_percent INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- RLS (Row Level Security)
-- =====================================================
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE subcategories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE form_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE quote_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE pro_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery_photos ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE youtube_videos ENABLE ROW LEVEL SECURITY;
ALTER TABLE google_ads_leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE company_codes ENABLE ROW LEVEL SECURITY;

-- =====================================================
-- POLICIES - Lecture publique
-- =====================================================
CREATE POLICY "public_read" ON categories FOR SELECT USING (true);
CREATE POLICY "public_read" ON subcategories FOR SELECT USING (true);
CREATE POLICY "public_read" ON products FOR SELECT USING (is_available = true);
CREATE POLICY "public_read" ON articles FOR SELECT USING (published = true);
CREATE POLICY "public_read" ON gallery_photos FOR SELECT USING (true);
CREATE POLICY "public_read" ON reviews FOR SELECT USING (true);
CREATE POLICY "public_read" ON youtube_videos FOR SELECT USING (true);
CREATE POLICY "public_read" ON company_codes FOR SELECT USING (is_active = true);

-- POLICIES - Écriture publique pour formulaires
CREATE POLICY "public_insert" ON form_submissions FOR INSERT WITH CHECK (true);
CREATE POLICY "public_insert" ON quote_requests FOR INSERT WITH CHECK (true);
CREATE POLICY "public_insert" ON pro_requests FOR INSERT WITH CHECK (true);
CREATE POLICY "public_insert" ON google_ads_leads FOR INSERT WITH CHECK (true);

-- =====================================================
-- CATÉGORIES PALLMANN + SOUS-CATÉGORIES
-- =====================================================

-- Ajouter les catégories manquantes
INSERT INTO categories (name, slug, description, sort_order) VALUES
    ('Ponceuses à parquet', 'ponceuses-parquet', 'Ponceuses professionnelles à bande', 10),
    ('Monodisques', 'monodisques', 'Ponceuses monodisque', 11),
    ('Autolaveuses', 'autolaveuses', 'Machines de nettoyage pro', 12)
ON CONFLICT (slug) DO NOTHING;

-- =====================================================
-- INDEX pour performance
-- =====================================================
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category_id);
CREATE INDEX IF NOT EXISTS idx_products_slug ON products(slug);
CREATE INDEX IF NOT EXISTS idx_articles_category ON articles(category_id);
CREATE INDEX IF NOT EXISTS idx_articles_slug ON articles(slug);
CREATE INDEX IF NOT EXISTS idx_articles_published ON articles(published);
