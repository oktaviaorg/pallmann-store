import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

function convertMarkdownImagesToHTML(content) {
  const imageRegex = /<p>!\[(.*?)\]\((.*?)\)<\/p>/g;

  let updatedContent = content.replace(imageRegex, (match, alt, url) => {
    return `<div class="my-8">
  <img src="${url}" alt="${alt}" class="w-full rounded-lg shadow-lg">
  <p class="text-sm text-gray-600 italic mt-2 text-center">${alt}</p>
</div>`;
  });

  const simpleImageRegex = /!\[(.*?)\]\((.*?)\)/g;
  updatedContent = updatedContent.replace(simpleImageRegex, (match, alt, url) => {
    return `<div class="my-8">
  <img src="${url}" alt="${alt}" class="w-full rounded-lg shadow-lg">
  <p class="text-sm text-gray-600 italic mt-2 text-center">${alt}</p>
</div>`;
  });

  return updatedContent;
}

async function fixArticleImages() {
  try {
    console.log('Fetching articles with markdown images...');

    const { data: articles, error } = await supabase
      .from('articles')
      .select('id, title, slug, content')
      .like('content', '%![%');

    if (error) {
      console.error('Error fetching articles:', error);
      return;
    }

    console.log(`Found ${articles.length} articles with markdown images`);

    let updatedCount = 0;

    for (const article of articles) {
      const updatedContent = convertMarkdownImagesToHTML(article.content);

      if (updatedContent !== article.content) {
        const { error: updateError } = await supabase
          .from('articles')
          .update({ content: updatedContent })
          .eq('id', article.id);

        if (updateError) {
          console.error(`Error updating article ${article.slug}:`, updateError);
        } else {
          updatedCount++;
          console.log(`✓ Updated: ${article.title}`);
        }
      }
    }

    console.log(`\n✅ Successfully updated ${updatedCount} articles`);
  } catch (error) {
    console.error('Error:', error);
  }
}

fixArticleImages();
