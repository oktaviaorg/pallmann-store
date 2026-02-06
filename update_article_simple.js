import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY;

console.log('Supabase URL:', supabaseUrl);
console.log('Using service role key:', !!process.env.VITE_SUPABASE_SERVICE_ROLE_KEY);

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase credentials');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: false
  }
});

const newContent = readFileSync(join(__dirname, 'new_article_content.txt'), 'utf-8');
console.log('Content length:', newContent.length, 'characters');

async function updateArticle() {
  try {
    console.log('Updating article...');

    // First, verify the article exists
    const { data: existing, error: checkError } = await supabase
      .from('articles')
      .select('id, title, slug')
      .eq('id', '704a1de1-f384-497c-b797-b6dc9a5766b8')
      .maybeSingle();

    if (checkError) {
      console.error('Error checking article:', checkError);
      process.exit(1);
    }

    if (!existing) {
      console.error('Article not found!');
      process.exit(1);
    }

    console.log('Found article:', existing.title);

    // Update the article
    const { data, error } = await supabase
      .from('articles')
      .update({
        content: newContent,
        updated_at: new Date().toISOString()
      })
      .eq('id', '704a1de1-f384-497c-b797-b6dc9a5766b8')
      .select();

    if (error) {
      console.error('Error updating article:', error);
      process.exit(1);
    }

    console.log('Article updated successfully!');
    console.log('Updated rows:', data?.length || 0);

    if (data && data.length > 0) {
      console.log('Article title:', data[0].title);
      console.log('New content length:', data[0].content.length, 'characters');
    }

  } catch (err) {
    console.error('Unexpected error:', err);
    process.exit(1);
  }
}

updateArticle();
