#!/usr/bin/env node
/**
 * Génère le flux Google Merchant Center pour Pallmann Store
 * Usage: node scripts/generate-merchant-feed.js
 */

const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Config Supabase
const SUPABASE_URL = process.env.VITE_SUPABASE_URL || 'https://mjuzyqhxifyvebtnlrra.supabase.co';
const SUPABASE_KEY = process.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_qrzC7_zQwhskV7u04n7F5Q_CThWZ2qc';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// Config boutique
const STORE_NAME = 'Pallmann Store';
const STORE_URL = 'https://pallmann-store.com';
const CURRENCY = 'EUR';
const TVA_RATE = 0.20; // 20% TVA

async function generateFeed() {
  console.log('📦 Génération du flux Google Merchant Center...');

  // Récupérer les produits
  const { data: products, error } = await supabase
    .from('pallmann_products')
    .select('*, categories:category_id(name, slug)')
    .eq('published', true)
    .not('price_public_ht', 'is', null)
    .gt('price_public_ht', 0);

  if (error) {
    console.error('❌ Erreur Supabase:', error);
    process.exit(1);
  }

  console.log(`✓ ${products.length} produits trouvés`);

  // Générer le XML
  const xml = generateXML(products);

  // Sauvegarder
  const outputPath = path.join(__dirname, '../public/google-merchant-feed.xml');
  fs.writeFileSync(outputPath, xml, 'utf8');
  console.log(`✓ Flux sauvegardé: ${outputPath}`);

  // Stats
  const totalValue = products.reduce((sum, p) => sum + (p.price_pack_ht || p.price_public_ht || 0), 0);
  console.log(`📊 Valeur catalogue: ${totalValue.toFixed(2)}€ HT`);
}

function generateXML(products) {
  const now = new Date().toISOString();
  
  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">
  <channel>
    <title>${STORE_NAME}</title>
    <link>${STORE_URL}</link>
    <description>Produits professionnels Pallmann pour parquet - Vitrificateurs, huiles, colles</description>
    <lastBuildDate>${now}</lastBuildDate>
`;

  for (const product of products) {
    const priceHT = product.price_pack_ht || product.price_public_ht;
    const priceTTC = (priceHT * (1 + TVA_RATE)).toFixed(2);
    
    // Formater le conditionnement
    const unit = product.unit || '';
    const packSize = product.pack_size || 1;
    let conditionnement = '';
    if (unit === 'L' || unit === 'l') {
      conditionnement = packSize >= 1 ? `${packSize}L` : `${Math.round(packSize * 1000)}ml`;
    } else if (unit === 'kg' || unit === 'KG') {
      conditionnement = `${packSize}kg`;
    } else if (packSize > 1) {
      conditionnement = `x${packSize}`;
    }
    
    // Nettoyer les données - ajouter conditionnement au titre (éviter doublons)
    const baseName = (product.name || '').replace(/([a-zéèàù])([A-Z])/g, '$1 - $2').trim();
    // Ne pas ajouter si le nom contient déjà le conditionnement
    const nameHasConditionnement = conditionnement && baseName.toLowerCase().includes(conditionnement.toLowerCase());
    const title = escapeXml(conditionnement && !nameHasConditionnement ? `${baseName} (${conditionnement})` : baseName);
    const description = escapeXml(product.description || product.name || '');
    const category = product.categories?.name || 'Produits pour parquet';
    const availability = 'in_stock'; // Par défaut en stock
    const condition = 'new';
    
    // URL produit (page dédiée SEO)
    const productUrl = `${STORE_URL}/produit/${product.slug || product.id}`;
    
    // Image
    const imageUrl = product.image_url || `${STORE_URL}/images/pallmann-default.png`;
    
    // Identifiants
    const gtin = product.ean || product.gtin || ''; // Vrai code EAN uniquement (pas la ref Pallmann!)
    const mpn = product.ref || product.id; // Référence fabricant
    const brand = 'Pallmann';

    // Catégorie Google (Home & Garden > Home Improvement > Flooring)
    const googleCategory = '2047'; // Flooring & Floor Care

    xml += `
    <item>
      <g:id>${escapeXml(product.id)}</g:id>
      <g:title>${title}</g:title>
      <g:description>${description}</g:description>
      <g:link>${productUrl}</g:link>
      <g:image_link>${imageUrl}</g:image_link>
      <g:availability>${availability}</g:availability>
      <g:price>${priceTTC} ${CURRENCY}</g:price>
      <g:brand>${brand}</g:brand>
      <g:condition>${condition}</g:condition>
      <g:google_product_category>${googleCategory}</g:google_product_category>
      <g:product_type>${escapeXml(category)}</g:product_type>
      <g:mpn>${escapeXml(mpn)}</g:mpn>
      ${gtin ? `<g:gtin>${escapeXml(gtin)}</g:gtin>` : '<g:identifier_exists>false</g:identifier_exists>'}
      <g:shipping>
        <g:country>FR</g:country>
        <g:service>Standard</g:service>
        <g:price>15.00 EUR</g:price>
      </g:shipping>
      <g:shipping_weight>${product.pack_size || 1} kg</g:shipping_weight>
    </item>`;
  }

  xml += `
  </channel>
</rss>`;

  return xml;
}

function escapeXml(str) {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

// Exécution
generateFeed().catch(console.error);
