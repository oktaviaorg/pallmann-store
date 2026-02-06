import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_ANON_KEY
);

async function generateSitemap() {
  let allArticles = [];
  let from = 0;
  const limit = 1000;
  let hasMore = true;

  while (hasMore) {
    const { data: articles, error } = await supabase
      .from('articles')
      .select('slug, created_at, updated_at')
      .eq('published', true)
      .order('slug')
      .range(from, from + limit - 1);

    if (error) {
      console.error('Error fetching articles:', error);
      process.exit(1);
    }

    if (articles && articles.length > 0) {
      allArticles = allArticles.concat(articles);
      from += limit;
      hasMore = articles.length === limit;
    } else {
      hasMore = false;
    }
  }

  const articles = allArticles;

  const today = new Date().toISOString().split('T')[0];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">

  <!-- Page principale -->
  <url>
    <loc>https://ponceur-parquet.fr/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>

  <!-- Services -->
  <url>
    <loc>https://ponceur-parquet.fr/services</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>

  <url>
    <loc>https://ponceur-parquet.fr/analyse-parquet-gratuite</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.95</priority>
  </url>

  <url>
    <loc>https://ponceur-parquet.fr/gallery</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>

  <!-- Pages locales -->
  <url>
    <loc>https://ponceur-parquet.fr/renovation-parquet-strasbourg</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.95</priority>
  </url>

  <url>
    <loc>https://ponceur-parquet.fr/renovation-parquet-belfort</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.95</priority>
  </url>

  <url>
    <loc>https://ponceur-parquet.fr/renovation-parquet-sarrebourg</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.95</priority>
  </url>

  <url>
    <loc>https://ponceur-parquet.fr/renovation-parquet-mulhouse</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.95</priority>
  </url>

  <url>
    <loc>https://ponceur-parquet.fr/renovation-parquet-colmar</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.95</priority>
  </url>

  <url>
    <loc>https://ponceur-parquet.fr/renovation-parquet-colmar-mulhouse</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.95</priority>
  </url>

  <url>
    <loc>https://ponceur-parquet.fr/renovation-parquet-bas-rhin</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.95</priority>
  </url>

  <url>
    <loc>https://ponceur-parquet.fr/renovation-parquet-dijon</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.95</priority>
  </url>

  <url>
    <loc>https://ponceur-parquet.fr/renovation-parquet-beaune</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.95</priority>
  </url>

  <url>
    <loc>https://ponceur-parquet.fr/renovation-parquet-lyon</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.95</priority>
  </url>

  <url>
    <loc>https://ponceur-parquet.fr/expert-renovation-parquet</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>

  <!-- Autres pages -->
  <url>
    <loc>https://ponceur-parquet.fr/about</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>

  <url>
    <loc>https://ponceur-parquet.fr/reviews</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.85</priority>
  </url>

  <url>
    <loc>https://ponceur-parquet.fr/parquet-pose</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.85</priority>
  </url>

  <url>
    <loc>https://ponceur-parquet.fr/location-ponceuse</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.85</priority>
  </url>

  <url>
    <loc>https://ponceur-parquet.fr/formation</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>

  <url>
    <loc>https://ponceur-parquet.fr/boutique</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>

  <url>
    <loc>https://ponceur-parquet.fr/boutique/contact</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>

  <url>
    <loc>https://ponceur-parquet.fr/youtube</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.85</priority>
  </url>

  <!-- Pages de services spécifiques -->
  <url>
    <loc>https://ponceur-parquet.fr/services/pose-parquet</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.85</priority>
  </url>

  <url>
    <loc>https://ponceur-parquet.fr/parquet-raye-meuble</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.85</priority>
  </url>

  <url>
    <loc>https://ponceur-parquet.fr/degat-urine-parquet</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.85</priority>
  </url>

  <url>
    <loc>https://ponceur-parquet.fr/injection-anti-grincement-parquet</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.85</priority>
  </url>

  <url>
    <loc>https://ponceur-parquet.fr/faq</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>

  <url>
    <loc>https://ponceur-parquet.fr/formulaire-devis</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.85</priority>
  </url>

  <url>
    <loc>https://ponceur-parquet.fr/franchise</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.85</priority>
  </url>

  <!-- Blog principal -->
  <url>
    <loc>https://ponceur-parquet.fr/blog</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>

  <!-- Articles de blog (${articles.length}) -->
${articles.map(article => {
    const lastmod = article.updated_at || article.created_at
      ? new Date(article.updated_at || article.created_at).toISOString().split('T')[0]
      : today;
    return `  <url>
    <loc>https://ponceur-parquet.fr/blog/${article.slug}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`;
  }).join('\n')}

  <!-- Pages légales -->
  <url>
    <loc>https://ponceur-parquet.fr/mentions-legales</loc>
    <lastmod>${today}</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.3</priority>
  </url>

  <url>
    <loc>https://ponceur-parquet.fr/cgv</loc>
    <lastmod>${today}</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.3</priority>
  </url>

  <url>
    <loc>https://ponceur-parquet.fr/politique-confidentialite</loc>
    <lastmod>${today}</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.3</priority>
  </url>

</urlset>`;

  fs.writeFileSync('public/sitemap.xml', sitemap);
  console.log(`✅ Sitemap generated with ${articles.length} articles`);
}

generateSitemap().catch(console.error);
