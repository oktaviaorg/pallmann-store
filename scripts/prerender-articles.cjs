#!/usr/bin/env node
/**
 * Pre-render les articles de blog en HTML statique pour le SEO
 * Usage: node scripts/prerender-articles.cjs
 */

const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

const SUPABASE_URL = process.env.VITE_SUPABASE_URL || 'https://mjuzyqhxifyvebtnlrra.supabase.co';
const SUPABASE_KEY = process.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_qrzC7_zQwhskV7u04n7F5Q_CThWZ2qc';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
const SITE_URL = 'https://www.pallmann-store.com';

function getAssetPaths(distPath) {
  const indexPath = path.join(distPath, 'index.html');
  if (!fs.existsSync(indexPath)) {
    console.error('❌ dist/index.html non trouvé. Lancez "npm run build" d\'abord.');
    process.exit(1);
  }
  
  const html = fs.readFileSync(indexPath, 'utf8');
  const scriptMatch = html.match(/<script type="module" crossorigin src="([^"]+)"/);
  const cssMatch = html.match(/<link rel="stylesheet" crossorigin href="([^"]+)"/);
  
  return {
    mainScript: scriptMatch ? scriptMatch[1] : '/assets/index.js',
    mainCss: cssMatch ? cssMatch[1] : '/assets/index.css'
  };
}

function escapeHtml(text) {
  if (!text) return '';
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function generateArticleHtml(article, assets) {
  const title = escapeHtml(article.title);
  const description = escapeHtml(article.excerpt || article.meta_description || '');
  const content = article.content || '';
  const image = article.featured_image || 'https://www.pallmann-store.com/og-image.jpg';
  const url = `${SITE_URL}/blog/${article.slug}`;
  const publishedDate = article.published_at || article.created_at;

  // Schema.org Article
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": article.title,
    "description": description,
    "image": image,
    "datePublished": publishedDate,
    "dateModified": article.updated_at || publishedDate,
    "author": {
      "@type": "Organization",
      "name": "Pallmann Store"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Pallmann Store",
      "logo": {
        "@type": "ImageObject",
        "url": `${SITE_URL}/logo.png`
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": url
    }
  };

  return `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title} | Pallmann Store Blog</title>
  <meta name="description" content="${description}">
  <meta name="robots" content="index, follow">
  <link rel="canonical" href="${url}">
  
  <!-- Open Graph -->
  <meta property="og:type" content="article">
  <meta property="og:title" content="${title}">
  <meta property="og:description" content="${description}">
  <meta property="og:image" content="${image}">
  <meta property="og:url" content="${url}">
  <meta property="og:site_name" content="Pallmann Store">
  <meta property="article:published_time" content="${publishedDate}">
  
  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${title}">
  <meta name="twitter:description" content="${description}">
  <meta name="twitter:image" content="${image}">
  
  <!-- Schema.org -->
  <script type="application/ld+json">${JSON.stringify(schema)}</script>
  
  <!-- Assets -->
  <link rel="stylesheet" crossorigin href="${assets.mainCss}">
  <link rel="icon" type="image/svg+xml" href="/favicon.svg">
</head>
<body>
  <div id="root">
    <!-- Contenu pré-rendu pour SEO -->
    <article class="seo-prerender" style="max-width:800px;margin:0 auto;padding:20px;">
      <h1>${title}</h1>
      ${image ? `<img src="${image}" alt="${title}" style="max-width:100%;height:auto;">` : ''}
      <div class="article-content">
        ${content}
      </div>
      <p><a href="/blog">← Retour au blog</a></p>
    </article>
  </div>
  <script type="module" crossorigin src="${assets.mainScript}"></script>
</body>
</html>`;
}

async function main() {
  console.log('🚀 Pré-rendu des articles de blog...\n');
  
  const distPath = path.join(__dirname, '..', 'dist');
  const blogDir = path.join(distPath, 'blog');
  
  // Créer le dossier blog
  if (!fs.existsSync(blogDir)) {
    fs.mkdirSync(blogDir, { recursive: true });
  }
  
  // Récupérer les assets
  const assets = getAssetPaths(distPath);
  console.log(`📦 Assets: ${assets.mainScript}, ${assets.mainCss}\n`);
  
  // Récupérer les articles
  const { data: articles, error } = await supabase
    .from('articles')
    .select('*')
    .eq('published', true)
    .order('published_at', { ascending: false });
  
  if (error) {
    console.error('❌ Erreur Supabase:', error);
    process.exit(1);
  }
  
  console.log(`📝 ${articles.length} articles à pré-rendre\n`);
  
  let count = 0;
  for (const article of articles) {
    if (!article.slug) continue;
    
    const html = generateArticleHtml(article, assets);
    
    // Écrire le fichier .html directement
    fs.writeFileSync(path.join(blogDir, `${article.slug}.html`), html);
    count++;
    
    if (count % 100 === 0) {
      console.log(`  ${count} articles générés...`);
    }
  }
  
  console.log(`\n✅ ${count} articles pré-rendus dans dist/blog/`);
}

main().catch(console.error);
