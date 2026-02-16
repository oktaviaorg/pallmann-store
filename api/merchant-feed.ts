import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY || '';

const supabase = createClient(supabaseUrl, supabaseKey);

// Échapper les caractères XML
function escapeXml(text: string): string {
  if (!text) return '';
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

// Nettoyer le nom du produit (enlever la partie collée)
function cleanProductName(name: string): string {
  if (!name) return '';
  // Séparer si le nom contient un mot collé en majuscules (ex: "PALL-X 98Vernis")
  const cleaned = name.replace(/([a-zéèàù])([A-Z])/g, '$1 - $2');
  return cleaned.trim();
}

// Nettoyer la description
function cleanDescription(desc: string): string {
  if (!desc) return '';
  // Supprimer le contenu spam/allemand si présent
  return desc
    .replace(/ProduitsGUIDE PRODUITS.*/g, '')
    .replace(/ServicesNewsletter.*/g, '')
    .trim()
    .substring(0, 5000); // Google limite à 5000 caractères
}

export default async function handler(req: any, res: any) {
  try {
    // Récupérer les produits publiés avec prix > 0
    const { data: products, error } = await supabase
      .from('pallmann_products')
      .select('*')
      .eq('published', true)
      .gt('price_public_ht', 0)
      .order('display_order', { ascending: true });

    if (error) {
      console.error('Supabase error:', error);
      return res.status(500).json({ error: 'Database error' });
    }

    // Générer le flux XML Google Merchant
    const baseUrl = 'https://www.pallmann-store.com';
    
    let xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">
  <channel>
    <title>Pallmann Store - Produits professionnels parquet</title>
    <link>${baseUrl}</link>
    <description>Vitrificateurs, huiles, colles et accessoires Pallmann pour parquet</description>
`;

    for (const product of products || []) {
      // Calculer le prix TTC (TVA 20%)
      const priceTTC = (product.price_public_ht * 1.20).toFixed(2);
      
      // URL du produit (page dédiée pour SEO/Merchant)
      const productUrl = `${baseUrl}/produit/${product.slug}`;
      
      // Image URL (utiliser une image par défaut si manquante)
      const imageUrl = product.image_url || `${baseUrl}/images/pallmann-default.png`;
      
      // Référence produit (MPN)
      const mpn = product.ref || product.slug;
      
      xml += `
    <item>
      <g:id>${escapeXml(product.id)}</g:id>
      <g:title>${escapeXml(cleanProductName(product.name))}</g:title>
      <g:description>${escapeXml(cleanDescription(product.description || product.meta_description || ''))}</g:description>
      <g:link>${escapeXml(productUrl)}</g:link>
      <g:image_link>${escapeXml(imageUrl)}</g:image_link>
      <g:price>${priceTTC} EUR</g:price>
      <g:availability>in_stock</g:availability>
      <g:condition>new</g:condition>
      <g:brand>Pallmann</g:brand>
      <g:mpn>${escapeXml(mpn)}</g:mpn>
      <g:identifier_exists>false</g:identifier_exists>
      <g:google_product_category>2047</g:google_product_category>
      <g:product_type>Entretien parquet > Produits professionnels</g:product_type>
      <g:shipping>
        <g:country>FR</g:country>
        <g:service>Standard</g:service>
        <g:price>9.90 EUR</g:price>
      </g:shipping>
    </item>`;
    }

    xml += `
  </channel>
</rss>`;

    // Retourner le XML avec le bon content-type
    res.setHeader('Content-Type', 'application/xml; charset=utf-8');
    res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate');
    return res.status(200).send(xml);

  } catch (err) {
    console.error('Merchant feed error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
