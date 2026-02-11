const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_ANON_KEY
);

function getImageForProduct(name) {
  const n = name.toLowerCase();
  
  // Produits avec vraies images
  if (n.includes('pall-x 96')) return '/images/products/pall-x-96.png';
  if (n.includes('pall-x 98')) return '/images/products/pall-x-98.png';
  if (n.includes('pall-x extreme')) return '/images/products/pall-x-extreme.png';
  if (n.includes('pall-x pure')) return '/images/products/pall-x-extreme.png';
  if (n.includes('pall-x 320')) return '/images/products/pall-x-320.png';
  if (n.includes('pall-x 325')) return '/images/products/pall-x-320.png';
  if (n.includes('pall-x 333')) return '/images/products/pall-x-320.png';
  if (n.includes('pall-x zero')) return '/images/products/pall-x-96.png';
  if (n.includes('pall-x color')) return '/images/products/pall-x-96.png';
  if (n.includes('pall-x base')) return '/images/products/pall-x-320.png';
  if (n.includes('pall-x kitt')) return '/images/placeholders/preparation.svg';
  if (n.includes('pall-x filler')) return '/images/placeholders/preparation.svg';
  if (n.includes('pall-x care')) return '/images/placeholders/entretien.svg';
  if (n.includes('magic oil')) return '/images/products/magic-oil-2k.png';
  
  // Machines
  if (n.includes('cobra')) return '/images/machines/cobra.png';
  if (n.includes('spider')) return '/images/machines/spider.png';
  if (n.includes('gecko flex')) return '/images/machines/gecko-flex-20.png';
  if (n.includes('gecko star')) return '/images/machines/gecko-star-20.png';
  if (n.includes('turbo scrubber')) return '/images/machines/turbo-scrubber.png';
  if (n.includes('uno')) return '/images/machines/uno.png';
  
  // Catégories par placeholder
  if (n.includes('clean') || n.includes('care') || n.includes('finish')) return '/images/placeholders/entretien.svg';
  if (n.includes('colle') || n.includes('primaire')) return '/images/placeholders/preparation.svg';
  if (n.includes('huile') || n.includes('oil')) return '/images/placeholders/huile.svg';
  if (n.includes('bande') || n.includes('disque') || n.includes('pad')) return '/images/placeholders/consommable.svg';
  if (n.includes('rouleau') || n.includes('bac') || n.includes('brosse') || n.includes('spatule') || n.includes('manche')) return '/images/placeholders/accessoire.svg';
  if (n.includes('sac') || n.includes('plateau') || n.includes('jupe') || n.includes('kit') || n.includes('segment') || n.includes('valise') || n.includes('lèvre')) return '/images/placeholders/accessoire.svg';
  
  return '/images/placeholders/product.svg';
}

async function fixAllImages() {
  console.log('🖼️  Mise à jour de TOUTES les images...\n');
  
  const { data: products } = await supabase
    .from('products')
    .select('id, name, image_url');
  
  let updated = 0;
  for (const product of products || []) {
    // Mettre à jour seulement si pas d'image ou image inexistante
    if (!product.image_url || product.image_url === '' || product.image_url === 'null') {
      const newImage = getImageForProduct(product.name);
      
      const { error } = await supabase
        .from('products')
        .update({ image_url: newImage })
        .eq('id', product.id);
      
      if (!error) {
        console.log(`✅ ${product.name.substring(0,35).padEnd(37)} → ${newImage}`);
        updated++;
      } else {
        console.log(`❌ ${product.name}: ${error.message}`);
      }
    }
  }
  
  console.log(`\n✨ ${updated} produits mis à jour !`);
}

fixAllImages();
