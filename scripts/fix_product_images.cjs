const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_ANON_KEY
);

const imageMap = [
  { pattern: 'PALL-X 96', image: '/images/products/pall-x-96.png' },
  { pattern: 'PALL-X 98', image: '/images/products/pall-x-98.png' },
  { pattern: 'PALL-X EXTREME', image: '/images/products/pall-x-extreme.png' },
  { pattern: 'PALL-X PURE', image: '/images/products/pall-x-extreme.png' }, // fallback
  { pattern: 'PALL-X 320', image: '/images/products/pall-x-320.png' },
  { pattern: 'PALL-X 325', image: '/images/products/pall-x-320.png' }, // fallback
  { pattern: 'PALL-X 333', image: '/images/products/pall-x-320.png' }, // fallback
  { pattern: 'MAGIC OIL', image: '/images/products/magic-oil-2k.png' },
  { pattern: 'CLEAN', image: '/images/placeholders/entretien.svg' },
  { pattern: 'CARE', image: '/images/placeholders/entretien.svg' },
  { pattern: 'Bande Abrasive', image: '/images/placeholders/consommable.svg' },
  { pattern: 'Disque', image: '/images/placeholders/consommable.svg' },
  { pattern: 'Pad', image: '/images/placeholders/consommable.svg' },
  { pattern: 'Bac', image: '/images/placeholders/accessoire.svg' },
  { pattern: 'Rouleau', image: '/images/placeholders/accessoire.svg' },
  { pattern: 'Brosse', image: '/images/placeholders/accessoire.svg' },
  { pattern: 'Colle', image: '/images/placeholders/preparation.svg' },
  { pattern: 'Primaire', image: '/images/placeholders/preparation.svg' },
];

async function fixImages() {
  console.log('🖼️  Correction des images produits...\n');
  
  // Récupérer produits sans image
  const { data: products } = await supabase
    .from('products')
    .select('id, name, image_url')
    .or('image_url.is.null,image_url.eq.');
  
  console.log(`Produits sans image: ${products?.length}\n`);
  
  for (const product of products || []) {
    // Trouver l'image correspondante
    const match = imageMap.find(m => 
      product.name.toLowerCase().includes(m.pattern.toLowerCase())
    );
    
    if (match) {
      const { error } = await supabase
        .from('products')
        .update({ image_url: match.image })
        .eq('id', product.id);
      
      if (!error) {
        console.log(`✅ ${product.name.substring(0,40)} → ${match.image}`);
      } else {
        console.log(`❌ ${product.name}: ${error.message}`);
      }
    } else {
      // Image générique par défaut
      const { error } = await supabase
        .from('products')
        .update({ image_url: '/images/placeholders/product.svg' })
        .eq('id', product.id);
      
      console.log(`📦 ${product.name.substring(0,40)} → placeholder`);
    }
  }
  
  console.log('\n✨ Terminé !');
}

fixImages();
