import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function addInternalLinks() {
  console.log('🔗 Adding internal links to recently published articles...\n');

  const { data: categories, error: catError } = await supabase
    .from('categories')
    .select('id, name, slug');

  if (catError) {
    console.error('Error fetching categories:', catError);
    return;
  }

  const categoryMap = {};
  categories.forEach(cat => {
    categoryMap[cat.id] = cat;
  });

  const { data: articles, error: articlesError } = await supabase
    .from('articles')
    .select('id, title, slug, content, category_id')
    .eq('published', true)
    .order('created_at', { ascending: false })
    .limit(100);

  if (articlesError) {
    console.error('Error fetching articles:', articlesError);
    return;
  }

  console.log(`Found ${articles.length} articles to process\n`);

  for (const article of articles) {
    if (!article.category_id) continue;

    const relatedArticles = articles.filter(a =>
      a.category_id === article.category_id &&
      a.id !== article.id &&
      a.slug !== article.slug
    ).slice(0, 4);

    if (relatedArticles.length === 0) continue;

    let internalLinksSection = `\n\n<h3>Articles connexes dans le département</h3>\n<ul class="related-articles">`;

    for (const related of relatedArticles) {
      internalLinksSection += `\n<li><a href="/blog/${related.slug}" title="${related.title}">${related.title}</a></li>`;
    }

    internalLinksSection += `\n</ul>`;

    if (!article.content.includes('Articles connexes dans le département')) {
      const updatedContent = article.content + internalLinksSection;

      const { error: updateError } = await supabase
        .from('articles')
        .update({
          content: updatedContent,
          updated_at: new Date().toISOString()
        })
        .eq('id', article.id);

      if (updateError) {
        console.error(`❌ Error updating article ${article.slug}:`, updateError);
      } else {
        const category = categoryMap[article.category_id];
        console.log(`✅ Added ${relatedArticles.length} internal links to: ${article.title} (${category?.name || 'Unknown'})`);
      }
    } else {
      console.log(`⏭️  Skipped (already has internal links): ${article.title}`);
    }
  }

  console.log('\n✨ Internal linking completed!');
}

addInternalLinks().catch(console.error);
