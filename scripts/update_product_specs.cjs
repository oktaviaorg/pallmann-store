const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_ANON_KEY
);

const productSpecs = [
  {
    namePattern: 'PALL-X 96',
    specs: {
      consommation: '100 ml/m²',
      rendement: '10 m²/L',
      sechage_poncage: '4 heures',
      recouvrable: '4 heures',
      resistance_finale: '7 jours',
      conditions: '18-25°C, 35-65% humidité',
      antiderapance: 'R9',
      type: 'Vitrificateur mono-composant aqueux'
    },
    pdf_url: 'https://fr.pallmann.net/fileadmin/MAM/236033/PALL-X_96_ORIGINAL_FR.pdf'
  },
  {
    namePattern: 'PALL-X 98',
    specs: {
      consommation: '100 ml/m²',
      rendement: '10 m²/L',
      proportion_melange: '10:1',
      vie_melange: '4 heures',
      sechage_poncage: '4 heures',
      recouvrable: '4 heures',
      resistance_finale: '7 jours',
      circulation_intensive: '24 heures',
      resistance_chimique: '72 heures',
      conditions: '18-25°C, 35-65% humidité',
      antiderapance: 'R9 (R10 avec PALL-X GRIP)',
      type: 'Vitrificateur bi-composant aqueux'
    },
    pdf_url: 'https://fr.pallmann.net/fileadmin/MAM/138610/PALL-X_98_satin-mat_FR.pdf'
  },
  {
    namePattern: 'PALL-X EXTREME',
    specs: {
      consommation: '100 ml/m²',
      rendement: '10 m²/L',
      proportion_melange: '10:1 (bi-composant)',
      vie_melange: '3 heures (bi-composant)',
      sechage_poncage: '4 heures',
      recouvrable: '4 heures',
      resistance_finale: '10-12 jours (mono) / 7 jours (bi)',
      conditions: '18-25°C, 35-65% humidité',
      type: 'Vitrificateur mono ou bi-composant aqueux'
    },
    pdf_url: 'https://fr.pallmann.net/fileadmin/MAM/107415/PALL-X_EXTREME_FR.pdf'
  },
  {
    namePattern: 'PALL-X PURE',
    specs: {
      consommation: '100 ml/m²',
      rendement: '10 m²/L',
      proportion_melange: '10:1',
      aspect: 'Mat naturel (effet bois brut)',
      resistance_finale: '7 jours',
      conditions: '18-25°C, 35-65% humidité',
      type: 'Vitrificateur bi-composant aqueux'
    },
    pdf_url: 'https://fr.pallmann.net/fileadmin/MAM/107433/PALL-X_PURE_FR.pdf'
  },
  {
    namePattern: 'MAGIC OIL 2K',
    specs: {
      consommation: '25-50 ml/m²',
      proportion_melange: '10:1',
      application: '1-3 couches à la spatule',
      vie_melange: '2 heures',
      recouvrable: '10-30 minutes',
      sollicitable: '12 heures',
      lavable: '12 heures',
      conditions: '18-25°C, 35-65% humidité',
      antiderapance: 'R10',
      type: 'Huile bi-composante sans solvant'
    },
    pdf_url: 'https://fr.pallmann.net/fileadmin/MAM/106187/MAGIC_OIL_2K_ORIGINAL_FR.pdf'
  },
  {
    namePattern: 'PALL-X 320',
    specs: {
      consommation_rouleau: '100 ml/m²',
      consommation_spatule: '60 ml/m²',
      rendement_rouleau: '10 m²/L',
      rendement_spatule: '17 m²/L',
      recouvrable_rouleau: '2 heures',
      recouvrable_spatule: '1 heure',
      conditions: '18-25°C, 35-65% humidité',
      type: 'Fond dur aqueux mono-composant'
    },
    pdf_url: 'https://fr.pallmann.net/fileadmin/MAM/189838/PALL-X_320_FR.pdf'
  },
  {
    namePattern: 'PALL-X 325',
    specs: {
      consommation: '80-100 ml/m²',
      rendement: '10-12 m²/L',
      recouvrable: '2-3 heures',
      conditions: '18-25°C, 35-65% humidité',
      type: 'Fond dur aqueux mono-composant'
    },
    pdf_url: 'https://fr.pallmann.net/fileadmin/MAM/107409/PALL-X_325_FR.pdf'
  },
  {
    namePattern: 'PALL-X 333',
    specs: {
      consommation: '80-100 ml/m²',
      proportion_melange: '10:1',
      rendement: '10-12 m²/L',
      recouvrable: '4 heures',
      conditions: '18-25°C, 35-65% humidité',
      type: 'Fond dur bi-composant sans solvant'
    },
    pdf_url: 'https://fr.pallmann.net/fileadmin/MAM/107411/PALL-X_333_FR.pdf'
  }
];

async function updateProducts() {
  console.log('🔄 Mise à jour des specs produits...\n');
  
  for (const spec of productSpecs) {
    // Chercher les produits correspondants
    const { data: products, error } = await supabase
      .from('products')
      .select('id, name')
      .ilike('name', `%${spec.namePattern}%`);
    
    if (error) {
      console.error(`❌ Erreur pour ${spec.namePattern}:`, error.message);
      continue;
    }
    
    if (!products?.length) {
      console.log(`⚠️  Aucun produit trouvé pour: ${spec.namePattern}`);
      continue;
    }
    
    // Mettre à jour chaque produit trouvé
    for (const product of products) {
      const { error: updateError } = await supabase
        .from('products')
        .update({ 
          specs: spec.specs
        })
        .eq('id', product.id);
      
      if (updateError) {
        console.error(`❌ Erreur update ${product.name}:`, updateError.message);
      } else {
        console.log(`✅ ${product.name}`);
      }
    }
  }
  
  console.log('\n✨ Terminé !');
}

updateProducts();
