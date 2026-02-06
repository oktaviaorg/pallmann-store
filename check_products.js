require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.VITE_SUPABASE_ANON_KEY);

async function main() {
  // Check categories
  const { data: cats } = await supabase.from('pallmann_categories').select('*');
  console.log('=== Catégories ===');
  cats?.forEach(c => console.log(`- ${c.name} (id: ${c.id})`));
  
  // Check if colle category exists
  const colles = cats?.find(c => c.name.toLowerCase().includes('colle'));
  console.log('\nCatégorie colles:', colles ? 'existe' : 'à créer');
}
main();
