#!/usr/bin/env node
/**
 * Pre-render les pages produits en HTML statique pour le SEO
 * Génère des fichiers HTML avec contenu visible + meta tags + JSON-LD
 * Usage: node scripts/prerender-products.cjs
 */

const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Config Supabase - utilise les mêmes vars que le build
const SUPABASE_URL = process.env.VITE_SUPABASE_URL || 'https://mjuzyqhxifyvebtnlrra.supabase.co';
const SUPABASE_KEY = process.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_qrzC7_zQwhskV7u04n7F5Q_CThWZ2qc';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const STORE_URL = 'https://www.pallmann-store.com';
const TVA_RATE = 0.20;

// Lire le index.html buildé pour récupérer les assets
function getAssetPaths(distPath) {
  const indexPath = path.join(distPath, 'index.html');
  if (!fs.existsSync(indexPath)) {
    console.error('❌ dist/index.html non trouvé. Lancez "npm run build" d\'abord.');
    process.exit(1);
  }
  
  const html = fs.readFileSync(indexPath, 'utf8');
  
  // Extraire les scripts et styles
  const scriptMatch = html.match(/<script type="module" crossorigin src="([^"]+)"/);
  const cssMatch = html.match(/<link rel="stylesheet" crossorigin href="([^"]+)"/);
  
  return {
    mainScript: scriptMatch ? scriptMatch[1] : '/assets/index.js',
    mainCss: cssMatch ? cssMatch[1] : '/assets/index.css'
  };
}

// Nettoyer le nom du produit
function cleanName(name) {
  return (name || '').replace(/([a-zéèàù])([A-Z])/g, '$1 - $2').trim();
}

// Nettoyer la description
function cleanDescription(desc) {
  return (desc || '').split('ProduitsGUIDE')[0].trim();
}

// Échapper HTML
function escapeHtml(str) {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// Générer des mots-clés SEO pertinents
function generateKeywords(product, name) {
  const keywords = ['Pallmann', name];
  
  if (name.toLowerCase().includes('pall-x')) {
    keywords.push('vitrificateur', 'vitrificateur parquet', 'vernis parquet', 'protection parquet');
  }
  if (name.toLowerCase().includes('magic oil') || name.toLowerCase().includes('huile')) {
    keywords.push('huile parquet', 'huile naturelle bois', 'finition huile', 'huilage parquet');
  }
  if (name.toLowerCase().includes('grain') || name.toLowerCase().includes('disque') || name.toLowerCase().includes('bande')) {
    keywords.push('abrasif', 'ponçage parquet', 'disque abrasif', 'bande abrasive');
  }
  if (name.toLowerCase().includes('clean') || name.toLowerCase().includes('care')) {
    keywords.push('entretien parquet', 'nettoyant parquet', 'produit entretien bois');
  }
  if (name.toLowerCase().includes('colle') || name.toLowerCase().includes('adhesif')) {
    keywords.push('colle parquet', 'adhésif parquet', 'collage bois');
  }
  if (name.toLowerCase().includes('joint') || name.toLowerCase().includes('kitt')) {
    keywords.push('joint parquet', 'mastic bois', 'rebouchage parquet');
  }
  if (name.toLowerCase().includes('rouleau') || name.toLowerCase().includes('manchon')) {
    keywords.push('rouleau vitrificateur', 'manchon application', 'outil parquet');
  }
  
  keywords.push('parquet', 'bois', 'professionnel', 'qualité allemande');
  
  return [...new Set(keywords)].join(', ');
}

// Générer une description SEO enrichie
function generateSeoDescription(product, name) {
  const baseName = name.split(' - ')[0];
  let desc = product.description || product.meta_description || '';
  
  // Si pas de description, en créer une
  if (!desc || desc.length < 50) {
    if (name.toLowerCase().includes('pall-x')) {
      desc = `${baseName} - Vitrificateur professionnel Pallmann pour parquet. Protection durable et finition haute qualité. Produit allemand utilisé par les professionnels du parquet.`;
    } else if (name.toLowerCase().includes('magic oil')) {
      desc = `${baseName} - Huile naturelle Pallmann pour parquet. Finition aspect bois brut, protection invisible. Qualité professionnelle allemande.`;
    } else if (name.toLowerCase().includes('grain') || name.toLowerCase().includes('disque')) {
      desc = `${baseName} - Abrasif professionnel Pallmann pour ponçage de parquet. Haute qualité et durabilité. Compatible ponceuses professionnelles.`;
    } else if (name.toLowerCase().includes('clean') || name.toLowerCase().includes('care')) {
      desc = `${baseName} - Produit d'entretien Pallmann pour parquet. Nettoyage et protection de votre sol en bois. Formule professionnelle.`;
    } else {
      desc = `${baseName} - Produit professionnel Pallmann pour parquet. Qualité allemande, utilisé par les artisans du parquet.`;
    }
  }
  
  return cleanDescription(desc);
}

// Formater le conditionnement
function formatConditionnement(product) {
  const unit = product.unit || '';
  const packSize = product.pack_size || 1;
  
  // Mapping des unités vers un format lisible
  const unitLabels = {
    'L': 'Litre',
    'l': 'Litre',
    'kg': 'kg',
    'KG': 'kg',
    'm²': 'm²',
    'pièce': 'pièce',
    'piece': 'pièce',
    'unité': 'unité',
    'unite': 'unité',
    'carton': 'carton',
    'lot': 'lot',
    'ml': 'ml',
    'ML': 'ml'
  };
  
  const unitLabel = unitLabels[unit] || unit || 'unité';
  
  // Cas spéciaux pour les liquides
  if (unit === 'L' || unit === 'l') {
    if (packSize >= 1) {
      return {
        short: `${packSize}L`,
        full: `Bidon de ${packSize} litre${packSize > 1 ? 's' : ''}`,
        perUnit: packSize > 1 ? `(${(product.price_public_ht / packSize).toFixed(2)}€ HT/L)` : ''
      };
    } else {
      const ml = Math.round(packSize * 1000);
      return {
        short: `${ml}ml`,
        full: `Flacon de ${ml}ml`,
        perUnit: ''
      };
    }
  }
  
  // Cas pour les lots/packs
  if (packSize > 1 && (unit === 'pièce' || unit === 'piece' || unit === 'unité' || !unit)) {
    return {
      short: `x${packSize}`,
      full: `Lot de ${packSize} pièces`,
      perUnit: `(${(product.price_public_ht / packSize).toFixed(2)}€ HT/pièce)`
    };
  }
  
  // Cas pour kg
  if (unit === 'kg' || unit === 'KG') {
    return {
      short: `${packSize}kg`,
      full: `${packSize}kg`,
      perUnit: packSize > 1 ? `(${(product.price_public_ht / packSize).toFixed(2)}€ HT/kg)` : ''
    };
  }
  
  // Par défaut
  if (packSize > 1) {
    return {
      short: `${packSize} ${unitLabel}`,
      full: `${packSize} ${unitLabel}${packSize > 1 ? 's' : ''}`,
      perUnit: ''
    };
  }
  
  return { short: '', full: '', perUnit: '' };
}

// Générer le HTML d'une page produit
function generateProductHtml(product, assets) {
  const name = cleanName(product.name);
  const description = generateSeoDescription(product, name);
  const descShort = description.substring(0, 160);
  const keywords = generateKeywords(product, name);
  const priceTTC = (product.price_public_ht * (1 + TVA_RATE)).toFixed(2);
  const priceHT = product.price_public_ht.toFixed(2);
  const imageUrl = product.image_url || '/images/pallmann-default.png';
  const productUrl = `${STORE_URL}/produit/${product.slug}`;
  const pdfUrl = product.pdf_url || null;
  const conditionnement = formatConditionnement(product);
  
  // Date de validité du prix (30 jours)
  const priceValidDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
  
  // Schema.org Product
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": name,
    "description": description,
    "image": imageUrl,
    "sku": product.ref || product.slug,
    "mpn": product.ref || product.slug,
    "brand": {
      "@type": "Brand",
      "name": "Pallmann"
    },
    "offers": {
      "@type": "Offer",
      "url": productUrl,
      "priceCurrency": "EUR",
      "price": priceTTC,
      "priceValidUntil": priceValidDate,
      "availability": "https://schema.org/InStock",
      "seller": {
        "@type": "Organization",
        "name": "Pallmann Store"
      }
    }
  };

  // BreadcrumbList schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Accueil",
        "item": STORE_URL
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Boutique",
        "item": `${STORE_URL}/boutique`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": name,
        "item": productUrl
      }
    ]
  };

  // Organization schema
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Pallmann Store",
    "url": STORE_URL,
    "logo": `${STORE_URL}/favicon.svg`,
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+33-7-57-82-13-06",
      "contactType": "customer service",
      "availableLanguage": "French"
    }
  };

  // FAQ schema pour le SEO
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": `Comment utiliser ${name.split(' - ')[0]} ?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `${name.split(' - ')[0]} est un produit professionnel Pallmann. Consultez la fiche technique pour les instructions détaillées d'application. Pour tout conseil, contactez notre équipe au 07 57 82 13 06.`
        }
      },
      {
        "@type": "Question",
        "name": "Quelle est la livraison ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Livraison France entière en 48-72h. Franco de port dès 630€ HT d'achat."
        }
      }
    ]
  };

  return `<!doctype html>
<html lang="fr">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="theme-color" content="#FF9900" />
    
    <!-- SEO Meta Tags -->
    <title>${escapeHtml(name)} | Pallmann Store</title>
    <meta name="description" content="${escapeHtml(descShort)}" />
    <meta name="keywords" content="${escapeHtml(keywords)}" />
    <meta name="author" content="Pallmann Store" />
    <meta name="robots" content="index, follow" />
    <link rel="canonical" href="${productUrl}" />
    
    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="product" />
    <meta property="og:url" content="${productUrl}" />
    <meta property="og:title" content="${escapeHtml(name)} | Pallmann Store" />
    <meta property="og:description" content="${escapeHtml(descShort)}" />
    <meta property="og:image" content="${imageUrl}" />
    <meta property="og:site_name" content="Pallmann Store" />
    <meta property="product:price:amount" content="${priceTTC}" />
    <meta property="product:price:currency" content="EUR" />
    <meta property="product:availability" content="in stock" />
    <meta property="product:brand" content="Pallmann" />
    
    <!-- Twitter -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:url" content="${productUrl}" />
    <meta name="twitter:title" content="${escapeHtml(name)} | Pallmann Store" />
    <meta name="twitter:description" content="${escapeHtml(descShort)}" />
    <meta name="twitter:image" content="${imageUrl}" />
    
    <!-- Preconnect -->
    <link rel="dns-prefetch" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link rel="preconnect" href="https://mjuzyqhxifyvebtnlrra.supabase.co" crossorigin>
    
    <!-- Fonts -->
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" crossorigin>
    
    <!-- Favicon -->
    <link rel="icon" type="image/svg+xml" href="/favicon.svg">
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
    
    <!-- Main CSS -->
    <link rel="stylesheet" crossorigin href="${assets.mainCss}">
    
    <!-- Schema.org JSON-LD -->
    <script type="application/ld+json">
${JSON.stringify(productSchema, null, 2)}
    </script>
    <script type="application/ld+json">
${JSON.stringify(breadcrumbSchema, null, 2)}
    </script>
    <script type="application/ld+json">
${JSON.stringify(organizationSchema, null, 2)}
    </script>
    <script type="application/ld+json">
${JSON.stringify(faqSchema, null, 2)}
    </script>
    
    <!-- Critical CSS for pre-rendered content -->
    <style>
      * { box-sizing: border-box; margin: 0; padding: 0; }
      body { font-family: 'Inter', system-ui, sans-serif; line-height: 1.5; background: #F7FAFC; }
      .prerender-product { max-width: 1200px; margin: 0 auto; padding: 100px 20px 40px; }
      .prerender-product h1 { font-size: 2rem; font-weight: 700; color: #1a202c; margin-bottom: 1rem; }
      .prerender-product .price { font-size: 2.5rem; font-weight: 700; color: #FF9900; margin-bottom: 1rem; }
      .prerender-product .price-ht { font-size: 0.875rem; color: #718096; }
      .prerender-product img { max-width: 100%; height: auto; border-radius: 1rem; margin-bottom: 1.5rem; }
      .prerender-product .description { color: #4a5568; margin-bottom: 1.5rem; }
      .prerender-product .ref { font-size: 0.875rem; color: #a0aec0; margin-bottom: 0.5rem; }
      .prerender-product .brand { color: #FF9900; font-weight: 600; font-size: 0.875rem; margin-bottom: 0.5rem; }
      .prerender-product .cta { display: inline-block; background: #FF9900; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600; margin-top: 1rem; margin-right: 0.5rem; transition: all 0.2s; }
      .prerender-product .cta:hover { background: #E68A00; transform: translateY(-2px); }
      .prerender-product .cta-pdf { background: #2563EB; }
      .prerender-product .cta-pdf:hover { background: #1D4ED8; }
      .prerender-features { margin-top: 1.5rem; padding: 1rem; background: #EDF2F7; border-radius: 0.5rem; }
      .prerender-features h3 { font-size: 1rem; font-weight: 600; color: #2D3748; margin-bottom: 0.5rem; }
      .prerender-features ul { list-style: none; padding: 0; }
      .prerender-features li { padding: 0.25rem 0; color: #4A5568; font-size: 0.875rem; }
      .prerender-features li::before { content: "✓ "; color: #48BB78; font-weight: bold; }
      .prerender-trust { display: flex; gap: 1rem; flex-wrap: wrap; margin-top: 1.5rem; font-size: 0.75rem; color: #718096; }
      .prerender-trust span { display: flex; align-items: center; gap: 0.25rem; }
      .prerender-breadcrumb { font-size: 0.875rem; color: #718096; margin-bottom: 1.5rem; }
      .prerender-breadcrumb a { color: #718096; text-decoration: none; }
      .prerender-breadcrumb a:hover { color: #FF9900; }
      @media (min-width: 768px) {
        .prerender-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 3rem; }
      }
    </style>
  </head>
  <body>
    <div id="root">
      <!-- Pre-rendered content for SEO - React will hydrate over this -->
      <article class="prerender-product" itemscope itemtype="https://schema.org/Product">
        <nav class="prerender-breadcrumb" aria-label="Fil d'Ariane">
          <a href="/">Accueil</a> / 
          <a href="/boutique">Boutique</a> / 
          <span>${escapeHtml(name)}</span>
        </nav>
        
        <div class="prerender-grid">
          <div>
            <img src="${imageUrl}" alt="${escapeHtml(name)}" itemprop="image" loading="eager" />
          </div>
          <div>
            <p class="brand" itemprop="brand">PALLMANN</p>
            <h1 itemprop="name">${escapeHtml(name)}</h1>
            ${product.ref ? `<p class="ref">Réf: <span itemprop="sku">${escapeHtml(product.ref)}</span></p>` : ''}
            ${conditionnement.full ? `<p class="conditionnement" style="background:#FEF3C7;padding:8px 12px;border-radius:6px;font-weight:600;color:#92400E;margin:0.75rem 0;display:inline-block;">📦 ${escapeHtml(conditionnement.full)}</p>` : ''}
            
            <div itemprop="offers" itemscope itemtype="https://schema.org/Offer">
              <p class="price">
                <span itemprop="price" content="${priceTTC}">${priceTTC}</span>€
                <span itemprop="priceCurrency" content="EUR">TTC</span>
                ${conditionnement.short ? `<span style="font-size:0.875rem;color:#718096;font-weight:normal;margin-left:0.5rem;">/ ${escapeHtml(conditionnement.short)}</span>` : ''}
              </p>
              <p class="price-ht">${priceHT}€ HT ${conditionnement.perUnit ? `<span style="color:#059669;">${escapeHtml(conditionnement.perUnit)}</span>` : ''}</p>
              <link itemprop="availability" href="https://schema.org/InStock" />
              <meta itemprop="priceValidUntil" content="${priceValidDate}" />
            </div>
            
            <div class="description" itemprop="description">
              <p>${escapeHtml(description)}</p>
            </div>
            
            <a href="/boutique" class="cta">🛒 Ajouter au panier</a>
            ${pdfUrl ? `<a href="${pdfUrl}" target="_blank" rel="noopener" class="cta cta-pdf" download>📄 Fiche technique PDF</a>` : ''}
            
            <div class="prerender-features">
              <h3>✨ Avantages Pallmann</h3>
              <ul>
                <li>Qualité professionnelle allemande</li>
                <li>Utilisé par les artisans du parquet</li>
                <li>Livraison France entière 48-72h</li>
                ${pdfUrl ? '<li>Fiche technique disponible</li>' : ''}
                <li>Conseil expert par téléphone</li>
              </ul>
            </div>
            
            <div class="prerender-trust">
              <span>🚚 Livraison rapide</span>
              <span>🔒 Paiement sécurisé</span>
              <span>📞 07 57 82 13 06</span>
              <span>⭐ Produit authentique</span>
            </div>
          </div>
        </div>
      </article>
    </div>
    
    <!-- React app will hydrate and take over -->
    <script type="module" crossorigin src="${assets.mainScript}"></script>
  </body>
</html>`;
}

async function prerenderProducts() {
  console.log('🚀 Pre-rendering des pages produits...\n');
  
  const distPath = path.join(__dirname, '../dist');
  
  // Vérifier que dist existe
  if (!fs.existsSync(distPath)) {
    console.error('❌ Le dossier dist/ n\'existe pas. Lancez "npm run build" d\'abord.');
    process.exit(1);
  }
  
  // Récupérer les chemins des assets
  const assets = getAssetPaths(distPath);
  console.log(`📦 Assets trouvés:`);
  console.log(`   CSS: ${assets.mainCss}`);
  console.log(`   JS: ${assets.mainScript}\n`);
  
  // Récupérer tous les produits publiés
  const { data: products, error } = await supabase
    .from('pallmann_products')
    .select('*')
    .eq('published', true)
    .not('price_public_ht', 'is', null)
    .gt('price_public_ht', 0);
  
  if (error) {
    console.error('❌ Erreur Supabase:', error);
    process.exit(1);
  }
  
  console.log(`✓ ${products.length} produits trouvés dans Supabase\n`);
  
  // Créer le dossier dist/produit
  const outputDir = path.join(distPath, 'produit');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  let successCount = 0;
  let errorCount = 0;
  
  // Générer une page HTML pour chaque produit
  for (const product of products) {
    if (!product.slug) {
      console.warn(`⚠️ Produit sans slug ignoré: ${product.name || product.id}`);
      errorCount++;
      continue;
    }
    
    try {
      const html = generateProductHtml(product, assets);
      const outputPath = path.join(outputDir, `${product.slug}.html`);
      fs.writeFileSync(outputPath, html, 'utf8');
      successCount++;
    } catch (err) {
      console.error(`❌ Erreur pour ${product.slug}:`, err.message);
      errorCount++;
    }
  }
  
  console.log(`\n✅ Pre-rendering terminé!`);
  console.log(`   📄 ${successCount} pages générées`);
  if (errorCount > 0) {
    console.log(`   ⚠️ ${errorCount} erreurs`);
  }
  console.log(`   📁 Output: ${outputDir}/`);
  
  // Générer aussi un sitemap des produits
  await generateProductSitemap(products, distPath);
  
  return { success: successCount, errors: errorCount };
}

async function generateProductSitemap(products, distPath) {
  const today = new Date().toISOString().split('T')[0];
  
  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`;
  
  for (const product of products) {
    if (!product.slug) continue;
    xml += `  <url>
    <loc>${STORE_URL}/produit/${product.slug}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
`;
  }
  
  xml += `</urlset>`;
  
  const sitemapPath = path.join(distPath, 'sitemap-products.xml');
  fs.writeFileSync(sitemapPath, xml, 'utf8');
  console.log(`   🗺️ Sitemap produits: ${sitemapPath}`);
}

// Exécution
prerenderProducts()
  .then(({ success }) => {
    console.log(`\n🎉 ${success} pages prêtes pour le crawl Google!`);
    process.exit(0);
  })
  .catch(err => {
    console.error('❌ Erreur fatale:', err);
    process.exit(1);
  });
