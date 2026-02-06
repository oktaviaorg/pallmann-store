import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

function cleanupDuplicateCaptions(content) {
  const captionRegex = /<p>\*([^*]+)\*<\/p>/g;
  return content.replace(captionRegex, '');
}

async function cleanupArticles() {
  try {
    console.log('Fetching articles with duplicate captions...');

    const { data: articles, error } = await supabase
      .from('articles')
      .select('id, title, slug, content')
      .like('content', '%<p>*%*</p>%');

    if (error) {
      console.error('Error fetching articles:', error);
      return;
    }

    console.log(`Found ${articles.length} articles with potential duplicate captions`);

    let updatedCount = 0;

    for (const article of articles) {
      const updatedContent = cleanupDuplicateCaptions(article.content);

      if (updatedContent !== article.content) {
        const { error: updateError } = await supabase
          .from('articles')
          .update({ content: updatedContent })
          .eq('id', article.id);

        if (updateError) {
          console.error(`Error updating article ${article.slug}:`, updateError);
        } else {
          updatedCount++;
          console.log(`✓ Cleaned: ${article.title}`);
        }
      }
    }

    console.log(`\n✅ Successfully cleaned ${updatedCount} articles`);
  } catch (error) {
    console.error('Error:', error);
  }
}

cleanupArticles();
