import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase credentials');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const escapeXml = (text) => {
  if (!text) return '';
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
};

const stripHtml = (html) => {
  if (!html) return '';
  return html.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
};

const generateRssFeed = async () => {
  try {
    console.log('Fetching published articles from Supabase...');

    const { data: articles, error } = await supabase
      .from('articles')
      .select('*')
      .eq('published', true)
      .not('published_at', 'is', null)
      .order('published_at', { ascending: false })
      .limit(50);

    if (error) {
      throw new Error(`Supabase error: ${error.message}`);
    }

    if (!articles || articles.length === 0) {
      console.warn('No published articles found');
      return;
    }

    console.log(`Found ${articles.length} published articles`);

    const buildDate = new Date().toUTCString();

    const rssItems = articles.map(article => {
      const pubDate = new Date(article.published_at).toUTCString();
      const updatedDate = article.updated_at
        ? new Date(article.updated_at).toUTCString()
        : pubDate;

      const description = escapeXml(
        article.excerpt ||
        stripHtml(article.content).substring(0, 300) + '...'
      );

      const categories = article.keywords?.slice(0, 5).map(keyword =>
        `    <category>${escapeXml(keyword)}</category>`
      ).join('\n') || '';

      return `  <item>
    <title>${escapeXml(article.title)}</title>
    <link>https://ponceur-parquet.fr/blog/${escapeXml(article.slug)}</link>
    <guid isPermaLink="true">https://ponceur-parquet.fr/blog/${escapeXml(article.slug)}</guid>
    <description>${description}</description>
    <pubDate>${pubDate}</pubDate>
    <lastBuildDate>${updatedDate}</lastBuildDate>
    <author>contact@ponceur-parquet.fr (Les Ponceurs Réunis)</author>
${categories}
    ${article.featured_image ? `<enclosure url="${escapeXml(article.featured_image)}" type="image/jpeg" />` : ''}
  </item>`;
    }).join('\n\n');

    const rssFeed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"
     xmlns:atom="http://www.w3.org/2005/Atom"
     xmlns:content="http://purl.org/rss/1.0/modules/content/"
     xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>Blog Les Ponceurs Réunis - Conseils d'Experts en Ponçage de Parquet</title>
    <link>https://ponceur-parquet.fr/blog</link>
    <description>Articles, conseils et astuces d'experts sur le ponçage, la rénovation et l'entretien de parquets en Alsace. Guides pratiques et actualités du secteur.</description>
    <language>fr-FR</language>
    <lastBuildDate>${buildDate}</lastBuildDate>
    <pubDate>${buildDate}</pubDate>
    <ttl>60</ttl>
    <atom:link href="https://ponceur-parquet.fr/rss.xml" rel="self" type="application/rss+xml" />
    <image>
      <url>https://mjuzyqhxifyvebtnlrra.supabase.co/storage/v1/object/public/lpr2/favicone%20ponceur.png</url>
      <title>Les Ponceurs Réunis</title>
      <link>https://ponceur-parquet.fr</link>
    </image>
    <copyright>Copyright ${new Date().getFullYear()} Les Ponceurs Réunis. Tous droits réservés.</copyright>
    <managingEditor>contact@ponceur-parquet.fr (Les Ponceurs Réunis)</managingEditor>
    <webMaster>contact@ponceur-parquet.fr (Les Ponceurs Réunis)</webMaster>
    <category>Rénovation</category>
    <category>Parquet</category>
    <category>Bricolage</category>
    <category>Artisanat</category>

${rssItems}

  </channel>
</rss>`;

    const outputPath = path.join(__dirname, 'public', 'rss.xml');
    fs.writeFileSync(outputPath, rssFeed, 'utf8');

    console.log(`✅ RSS feed generated successfully at ${outputPath}`);
    console.log(`   Articles: ${articles.length}`);
    console.log(`   Last updated: ${buildDate}`);

  } catch (error) {
    console.error('❌ Error generating RSS feed:', error);
    process.exit(1);
  }
};

generateRssFeed();
