import { readFileSync } from 'fs';

const content = readFileSync('new_article_content.txt', 'utf-8');

// Escape single quotes for SQL
const escapedContent = content.replace(/'/g, "''");

// Create the SQL update statement
const sql = `
UPDATE articles
SET
  content = '${escapedContent}',
  updated_at = NOW()
WHERE id = '704a1de1-f384-497c-b797-b6dc9a5766b8';
`;

// Write to file
import { writeFileSync } from 'fs';
writeFileSync('update_article.sql', sql);

console.log('SQL file created: update_article.sql');
console.log('Content length:', content.length, 'characters');
console.log('Escaped content length:', escapedContent.length, 'characters');
