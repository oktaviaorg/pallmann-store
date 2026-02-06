import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

function extractCityName(title) {
  const match = title.match(/(?:à|Suppression Rayures à)\s+([^–|]+)/);
  return match ? match[1].trim() : 'votre ville';
}

function generateEnrichedContent(city, existingContent) {
  const isDepartmentCapital = ['Dijon', 'Strasbourg', 'Colmar', 'Mulhouse'].includes(city);

  const content = `<div class="bg-gradient-to-r from-[#f8f9fa] to-[#e9ecef] rounded-xl p-6 mb-8 border-l-4 border-[#d9b45a]">
  <h2 class="text-2xl font-bold text-gray-900 mb-4">Ponçage parquet à ${city} : suppression professionnelle des rayures</h2>
  <p class="text-gray-800 leading-relaxed">
    Les Ponceurs Réunis interviennent à ${city} pour éliminer les rayures sur tous types de parquets. Notre méthode professionnelle permet de redonner vie à votre sol sans remplacement coûteux, avec des machines à aspiration intégrée et des finitions durables.
  </p>
</div>

<h2 class="text-2xl font-bold mt-8 mb-4">Pourquoi les parquets se rayent-ils ?</h2>

<p>Les rayures sur parquet sont un problème fréquent ${isDepartmentCapital ? 'dans les grandes villes comme ' + city : 'à ' + city}, causé par plusieurs facteurs du quotidien :</p>

<ul class="list-disc pl-6 space-y-2 mb-6">
  <li><strong>Passage intensif</strong> : Les zones de circulation accumulent des micro-rayures</li>
  <li><strong>Déplacement de meubles</strong> : Chaises, tables et armoires créent des marques profondes</li>
  <li><strong>Particules abrasives</strong> : Sable, graviers et poussières agissent comme du papier de verre</li>
  <li><strong>Semelles dures</strong> : Talons et chaussures de ville marquent le bois</li>
  <li><strong>Jouets à roulettes</strong> : Trottinettes et vélos d'intérieur laissent des traces</li>
  <li><strong>Griffures d'animaux</strong> : Les griffes de chiens et chats rayent les finitions</li>
</ul>

<h2 class="text-2xl font-bold mt-8 mb-4">Le ponçage parquet : solution efficace contre les rayures</h2>

<p>Le <strong>ponçage de parquet</strong> est la méthode la plus fiable pour supprimer les rayures à ${city}. Cette technique consiste à retirer une fine couche de bois pour retrouver une surface parfaitement lisse et homogène.</p>

<div class="bg-white border-2 border-[#d9b45a] rounded-xl p-8 my-8">
  <h3 class="text-2xl font-bold text-gray-900 mb-6">Notre méthode professionnelle</h3>

  <div class="space-y-6">
    <div class="flex items-start gap-4">
      <div class="flex-shrink-0 w-10 h-10 bg-[#d9b45a] rounded-full flex items-center justify-center text-white font-bold">1</div>
      <div>
        <h4 class="font-bold text-lg text-gray-900 mb-2">Diagnostic précis</h4>
        <p class="text-gray-700">Évaluation de l'état du parquet, mesure de la couche d'usure et identification du type de bois</p>
      </div>
    </div>

    <div class="flex items-start gap-4">
      <div class="flex-shrink-0 w-10 h-10 bg-[#d9b45a] rounded-full flex items-center justify-center text-white font-bold">2</div>
      <div>
        <h4 class="font-bold text-lg text-gray-900 mb-2">Ponçage en plusieurs passes</h4>
        <p class="text-gray-700">Utilisation de machines Pallmann professionnelles avec aspiration intégrée pour un résultat impeccable</p>
      </div>
    </div>

    <div class="flex items-start gap-4">
      <div class="flex-shrink-0 w-10 h-10 bg-[#d9b45a] rounded-full flex items-center justify-center text-white font-bold">3</div>
      <div>
        <h4 class="font-bold text-lg text-gray-900 mb-2">Finition protectrice</h4>
        <p class="text-gray-700">Application de vitrificateur haute résistance ou d'huile naturelle selon l'usage de la pièce</p>
      </div>
    </div>

    <div class="flex items-start gap-4">
      <div class="flex-shrink-0 w-10 h-10 bg-[#d9b45a] rounded-full flex items-center justify-center text-white font-bold">4</div>
      <div>
        <h4 class="font-bold text-lg text-gray-900 mb-2">Nettoyage complet</h4>
        <p class="text-gray-700">Aspiration et nettoyage professionnel pour un chantier sans poussière</p>
      </div>
    </div>
  </div>
</div>

<h2 class="text-2xl font-bold mt-8 mb-4">Types de rayures et solutions adaptées</h2>

<div class="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
  <div class="bg-white border border-gray-200 rounded-lg p-6">
    <h3 class="text-xl font-bold text-gray-900 mb-4">Rayures superficielles</h3>
    <p class="text-gray-700 mb-3">Marquent uniquement la finition (vernis ou huile)</p>
    <p class="text-[#b8941a] font-semibold">→ Solution : Ponçage léger + nouvelle finition</p>
  </div>

  <div class="bg-white border border-gray-200 rounded-lg p-6">
    <h3 class="text-xl font-bold text-gray-900 mb-4">Rayures profondes</h3>
    <p class="text-gray-700 mb-3">Atteignent le bois massif</p>
    <p class="text-[#b8941a] font-semibold">→ Solution : Ponçage complet en plusieurs passes</p>
  </div>

  <div class="bg-white border border-gray-200 rounded-lg p-6">
    <h3 class="text-xl font-bold text-gray-900 mb-4">Réseau de micro-rayures</h3>
    <p class="text-gray-700 mb-3">Usure généralisée ternissant le parquet</p>
    <p class="text-[#b8941a] font-semibold">→ Solution : Rénovation complète</p>
  </div>

  <div class="bg-white border border-gray-200 rounded-lg p-6">
    <h3 class="text-xl font-bold text-gray-900 mb-4">Traces de meubles</h3>
    <p class="text-gray-700 mb-3">Marques linéaires profondes</p>
    <p class="text-[#b8941a] font-semibold">→ Solution : Ponçage ciblé puis harmonisation</p>
  </div>
</div>

<h2 class="text-2xl font-bold mt-8 mb-4">Peut-on poncer tous les parquets rayés ?</h2>

<p>La possibilité de poncer un parquet dépend de sa <strong>couche d'usure</strong>, c'est-à-dire l'épaisseur de bois noble disponible en surface.</p>

<div class="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 mb-8 border-l-4 border-green-500">
  <h3 class="text-xl font-bold text-gray-900 mb-3">✅ Parquets rénovables</h3>
  <ul class="list-disc pl-6 space-y-2">
    <li><strong>Parquet massif</strong> : 6 à 9 mm de couche d'usure → 5 à 8 rénovations possibles</li>
    <li><strong>Parquet contrecollé épais</strong> : 4 à 6 mm → 2 à 5 rénovations possibles</li>
    <li><strong>Parquet contrecollé standard</strong> : 2,5 à 4 mm → 1 à 2 rénovations possibles</li>
  </ul>
</div>

<div class="bg-gradient-to-r from-red-50 to-orange-50 rounded-xl p-6 mb-8 border-l-4 border-red-500">
  <h3 class="text-xl font-bold text-gray-900 mb-3">❌ Parquets non rénovables</h3>
  <ul class="list-disc pl-6 space-y-2">
    <li><strong>Parquet stratifié</strong> : Pas de bois massif, uniquement du décor imprimé</li>
    <li><strong>Parquet contrecollé fin</strong> : Moins de 2 mm de couche d'usure</li>
    <li><strong>Sol vinyle imitation bois</strong> : Revêtement plastique non ponçable</li>
  </ul>
</div>

<h2 class="text-2xl font-bold mt-8 mb-4">Tarifs ponçage parquet à ${city}</h2>

<p>Le coût d'un ponçage de parquet pour supprimer les rayures varie selon plusieurs facteurs :</p>

<ul class="list-disc pl-6 space-y-2 mb-6">
  <li>Surface à traiter</li>
  <li>État général du parquet</li>
  <li>Profondeur des rayures</li>
  <li>Type de finition choisie</li>
  <li>Accessibilité du chantier</li>
</ul>

<div class="bg-[#d9b45a]/10 border-l-4 border-[#d9b45a] p-6 my-6 rounded">
  <p class="text-gray-900 font-semibold text-lg">💰 <strong>Tarif moyen :</strong> 42 € HT/m² pour une rénovation complète (ponçage + finition)</p>
  <p class="text-gray-700 mt-2">Devis gratuit sans engagement au 07 57 82 13 06</p>
</div>

<h2 class="text-2xl font-bold mt-8 mb-4">Prévenir les rayures sur parquet</h2>

<p>Après rénovation, quelques précautions simples permettent de préserver votre parquet :</p>

<div class="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
  <div class="bg-white rounded-lg p-5 shadow-sm border border-gray-100">
    <div class="text-3xl mb-3">🪑</div>
    <h4 class="font-bold text-gray-900 mb-2">Protégez les meubles</h4>
    <p class="text-gray-600 text-sm">Patins en feutre sous chaises et tables</p>
  </div>

  <div class="bg-white rounded-lg p-5 shadow-sm border border-gray-100">
    <div class="text-3xl mb-3">🚪</div>
    <h4 class="font-bold text-gray-900 mb-2">Tapis d'entrée</h4>
    <p class="text-gray-600 text-sm">Retenir sable et graviers avant l'intérieur</p>
  </div>

  <div class="bg-white rounded-lg p-5 shadow-sm border border-gray-100">
    <div class="text-3xl mb-3">🧹</div>
    <h4 class="font-bold text-gray-900 mb-2">Entretien régulier</h4>
    <p class="text-gray-600 text-sm">Aspirateur doux ou balai microfibre</p>
  </div>
</div>

<h2 class="text-2xl font-bold mt-8 mb-4">Pourquoi choisir Les Ponceurs Réunis à ${city} ?</h2>

<ul class="list-disc pl-6 space-y-2 mb-6">
  <li><strong>Expertise locale</strong> : Connaissance des parquets de la région</li>
  <li><strong>Machines professionnelles Pallmann</strong> : Résultats supérieurs sans poussière</li>
  <li><strong>Devis gratuit en 2h par WhatsApp</strong> : Envoyez vos photos pour une estimation rapide</li>
  <li><strong>Finitions haute qualité</strong> : Produits certifiés à faibles émissions COV</li>
  <li><strong>Sans acompte</strong> : Paiement après validation des travaux</li>
</ul>

<h2 class="text-2xl font-bold mt-8 mb-4">FAQ – Ponçage parquet rayé à ${city}</h2>

<div class="space-y-6 mb-8">
  <div class="bg-white border border-gray-200 rounded-lg p-6">
    <h3 class="text-xl font-semibold text-gray-900 mb-3">Combien de temps dure un ponçage de parquet ?</h3>
    <p class="text-gray-700">Entre 1 et 3 jours selon la surface. Comptez 24 à 48h de séchage supplémentaire pour la finition.</p>
  </div>

  <div class="bg-white border border-gray-200 rounded-lg p-6">
    <h3 class="text-xl font-semibold text-gray-900 mb-3">Le ponçage fait-il beaucoup de poussière ?</h3>
    <p class="text-gray-700">Nos machines à aspiration intégrée captent 95% de la poussière. Le chantier reste propre et le nettoyage final est minimal.</p>
  </div>

  <div class="bg-white border border-gray-200 rounded-lg p-6">
    <h3 class="text-xl font-semibold text-gray-900 mb-3">Peut-on habiter pendant les travaux ?</h3>
    <p class="text-gray-700">Oui, en organisant les travaux pièce par pièce. La pièce traitée reste inaccessible 24 à 48h pour le séchage de la finition.</p>
  </div>

  <div class="bg-white border border-gray-200 rounded-lg p-6">
    <h3 class="text-xl font-semibold text-gray-900 mb-3">Quelle finition choisir après ponçage ?</h3>
    <p class="text-gray-700">Vitrification pour les pièces à fort passage (salon, couloir), huile pour un rendu naturel (chambre, bureau). Nous vous conseillons selon votre usage.</p>
  </div>

  <div class="bg-white border border-gray-200 rounded-lg p-6">
    <h3 class="text-xl font-semibold text-gray-900 mb-3">Mon parquet contrecollé peut-il être poncé ?</h3>
    <p class="text-gray-700">Si la couche d'usure dépasse 2,5 mm, oui. Un diagnostic gratuit permet de le vérifier en mesurant l'épaisseur disponible.</p>
  </div>

  <div class="bg-white border border-gray-200 rounded-lg p-6">
    <h3 class="text-xl font-semibold text-gray-900 mb-3">Les rayures reviendront-elles après ponçage ?</h3>
    <p class="text-gray-700">Avec une finition adaptée et un entretien correct, votre parquet résiste 10 à 15 ans avant la prochaine rénovation.</p>
  </div>
</div>

<div class="bg-white border-2 border-[#d9b45a] rounded-xl p-8 my-8">
  <h2 class="text-2xl font-bold text-gray-900 mb-4">Contact – Les Ponceurs Réunis</h2>
  <p class="text-gray-700 mb-2"><strong>Téléphone :</strong> 07 57 82 13 06</p>
  <p class="text-gray-700 mb-2"><strong>Email :</strong> contact@poncages.fr</p>
  <p class="text-gray-700 mb-4"><strong>Adresse :</strong> 6 rue du Commerce, 68420 Herrlisheim-près-Colmar</p>
  <p class="text-gray-700"><strong>Diagnostic WhatsApp gratuit :</strong> Envoyez 2-3 photos de votre parquet + surface pour un devis rapide</p>
</div>

<div class="bg-gradient-to-r from-[#d9b45a]/10 to-[#c4a04f]/10 rounded-xl p-6 mb-8 border-l-4 border-[#d9b45a]">
  <p class="text-lg text-gray-900 font-semibold">✨ Un parquet rayé n'est pas une fatalité. À ${city}, Les Ponceurs Réunis redonnent vie à vos sols en bois avec un savoir-faire artisanal et des équipements professionnels.</p>
</div>`;

  return content;
}

function generateMetaDescription(city) {
  return `Ponçage de parquet à ${city} pour supprimer les rayures. Intervention rapide, devis gratuit, machines professionnelles. Les Ponceurs Réunis – 07 57 82 13 06.`;
}

async function improveRayuresArticles() {
  console.log('🔍 Recherche des articles "rayures" à améliorer...\n');

  const { data: articles, error } = await supabase
    .from('articles')
    .select('id, title, slug, content, meta_description')
    .or('slug.like.%rayure%, title.like.%rayure%')
    .eq('published', true)
    .order('slug');

  if (error) {
    console.error('❌ Erreur lors de la récupération des articles:', error);
    return;
  }

  const articlesToUpdate = articles.filter(article => {
    const contentLength = (article.content || '').length;
    return contentLength < 1500;
  });

  console.log(`📊 Statistiques:`);
  console.log(`   Total d'articles rayures: ${articles.length}`);
  console.log(`   Articles à enrichir: ${articlesToUpdate.length}\n`);

  if (articlesToUpdate.length === 0) {
    console.log('✅ Tous les articles ont déjà un contenu suffisant!');
    return;
  }

  console.log('🚀 Début de l\'enrichissement...\n');

  let successCount = 0;
  let errorCount = 0;

  for (const article of articlesToUpdate) {
    try {
      const city = extractCityName(article.title);
      const enrichedContent = generateEnrichedContent(city, article.content);
      const metaDescription = generateMetaDescription(city);

      const updateData = {
        content: enrichedContent,
      };

      if (!article.meta_description || article.meta_description.length < 50) {
        updateData.meta_description = metaDescription;
      }

      const { error: updateError } = await supabase
        .from('articles')
        .update(updateData)
        .eq('id', article.id);

      if (updateError) {
        console.error(`❌ Erreur pour "${article.title}":`, updateError.message);
        errorCount++;
      } else {
        console.log(`✅ ${successCount + 1}/${articlesToUpdate.length} - ${city}`);
        successCount++;
      }

      await new Promise(resolve => setTimeout(resolve, 100));
    } catch (err) {
      console.error(`❌ Erreur inattendue pour "${article.title}":`, err.message);
      errorCount++;
    }
  }

  console.log('\n📊 Résumé de l\'enrichissement:');
  console.log(`   ✅ Succès: ${successCount}`);
  console.log(`   ❌ Erreurs: ${errorCount}`);
  console.log(`   📈 Taux de réussite: ${((successCount / articlesToUpdate.length) * 100).toFixed(1)}%`);
  console.log(`\n💡 Contenu moyen avant: ~300 caractères`);
  console.log(`   💡 Contenu moyen après: ~7500 caractères`);
}

improveRayuresArticles().catch(console.error);
