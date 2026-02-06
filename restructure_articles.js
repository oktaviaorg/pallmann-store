import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

function convertMarkdownToStructuredHTML(markdown, title, slug) {
  let html = markdown;

  html = html.replace(/^# (.+)$/gm, '');

  html = html.replace(/^## (.+)$/gm, '<h2 class="text-2xl font-bold mt-8 mb-4">$1</h2>');

  html = html.replace(/^### (.+)$/gm, '<h3 class="text-xl font-semibold mt-6 mb-3">$1</h3>');

  html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');

  html = html.replace(/^---$/gm, '<div class="border-t border-gray-300 my-8"></div>');

  let inList = false;
  const lines = html.split('\n');
  const processedLines = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (line.trim().match(/^[-•]\s+(.+)$/)) {
      const content = line.trim().replace(/^[-•]\s+/, '');

      if (!inList) {
        processedLines.push('<ul class="list-disc pl-6 space-y-2 mb-6">');
        inList = true;
      }

      processedLines.push(`  <li>${content}</li>`);
    } else {
      if (inList) {
        processedLines.push('</ul>');
        inList = false;
      }

      if (line.trim() &&
          !line.trim().startsWith('<h2') &&
          !line.trim().startsWith('<h3') &&
          !line.trim().startsWith('<div') &&
          !line.trim().startsWith('<ul') &&
          !line.trim().startsWith('<li') &&
          !line.trim().startsWith('</ul')) {
        processedLines.push(`<p>${line.trim()}</p>`);
      } else if (line.trim()) {
        processedLines.push(line);
      }
    }
  }

  if (inList) {
    processedLines.push('</ul>');
  }

  html = processedLines.join('\n');

  html = html.replace(/(<p>[^<]*?)(Téléphone|Email|Sites)/g, '<p class="font-semibold">$2');

  const firstTitle = html.match(/<h2[^>]*>([^<]+)<\/h2>/);
  if (firstTitle) {
    const intro = `<div class="bg-gradient-to-r from-[#f8f9fa] to-[#e9ecef] rounded-xl p-6 mb-8 border-l-4 border-[#d9b45a]">
  <h2 class="text-2xl font-bold text-gray-900 mb-4">Introduction</h2>
  <p class="text-gray-800 leading-relaxed">
    Les Ponceurs Réunis sont spécialisés dans la rénovation professionnelle de parquets pour les marchés publics, architectes, églises et bâtiments militaires. Nos interventions respectent les normes les plus strictes en matière de qualité et de sécurité.
  </p>
</div>\n\n`;

    const firstH2Position = html.indexOf('<h2');
    if (firstH2Position !== -1) {
      html = intro + html;
    }
  }

  html = html.replace(/(<h2[^>]*>Coordonnées[^<]*<\/h2>)/i,
    '<div class="bg-white border-2 border-[#d9b45a] rounded-xl p-8 my-8">\n$1');

  html = html.replace(/(<h2[^>]*>Boutique[^<]*<\/h2>)/i,
    '</div>\n\n<div class="bg-gradient-to-r from-[#d9b45a]/10 to-[#c4a04f]/10 rounded-xl p-6 mb-8 border-l-4 border-[#d9b45a]">\n$1');

  if (html.includes('Boutique')) {
    html += '\n</div>';
  }

  html = html.replace(/<p><\/p>/g, '');
  html = html.replace(/\n\n+/g, '\n\n');

  return html.trim();
}

async function restructureArticles() {
  console.log('🔍 Recherche des articles à restructurer...\n');

  let allArticles = [];
  let from = 0;
  const limit = 1000;
  let hasMore = true;

  while (hasMore) {
    const { data: articles, error } = await supabase
      .from('articles')
      .select('id, title, slug, content')
      .eq('published', true)
      .order('created_at', { ascending: true })
      .range(from, from + limit - 1);

    if (error) {
      console.error('❌ Erreur lors de la récupération des articles:', error);
      return;
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

  const articlesToUpdate = articles.filter(article => {
    const content = article.content || '';
    const isMarkdown = content.includes('##') && !content.includes('<h2');
    return isMarkdown;
  });

  console.log(`📊 Statistiques:`);
  console.log(`   Total d'articles: ${articles.length}`);
  console.log(`   Articles à restructurer: ${articlesToUpdate.length}\n`);

  if (articlesToUpdate.length === 0) {
    console.log('✅ Tous les articles sont déjà bien structurés!');
    return;
  }

  console.log('🚀 Début de la restructuration...\n');

  let successCount = 0;
  let errorCount = 0;

  for (const article of articlesToUpdate) {
    try {
      const structuredHTML = convertMarkdownToStructuredHTML(
        article.content,
        article.title,
        article.slug
      );

      const { error: updateError } = await supabase
        .from('articles')
        .update({ content: structuredHTML })
        .eq('id', article.id);

      if (updateError) {
        console.error(`❌ Erreur pour "${article.title}":`, updateError.message);
        errorCount++;
      } else {
        console.log(`✅ ${successCount + 1}/${articlesToUpdate.length} - ${article.title}`);
        successCount++;
      }

      await new Promise(resolve => setTimeout(resolve, 100));
    } catch (err) {
      console.error(`❌ Erreur inattendue pour "${article.title}":`, err.message);
      errorCount++;
    }
  }

  console.log('\n📊 Résumé de la restructuration:');
  console.log(`   ✅ Succès: ${successCount}`);
  console.log(`   ❌ Erreurs: ${errorCount}`);
  console.log(`   📈 Taux de réussite: ${((successCount / articlesToUpdate.length) * 100).toFixed(1)}%`);
}

restructureArticles().catch(console.error);
