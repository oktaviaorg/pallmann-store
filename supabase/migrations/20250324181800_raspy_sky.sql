/*
  # Fix contact form styling in blog article

  1. Changes
    - Update article content to properly handle form styling
    - Move form outside of prose container
    - Add proper Tailwind classes for form elements
*/

UPDATE articles
SET content = REGEXP_REPLACE(
  content,
  '<div class="bg-primary-50 dark:bg-primary-900/20 rounded-lg p-6 my-8">(.*?)</div>',
  '</div>

<div class="not-prose bg-primary-50 dark:bg-primary-900/20 rounded-lg p-6 my-8">$1</div>

<div class="prose prose-lg dark:prose-invert max-w-none">',
  'g'
)
WHERE slug = 'poncer-parquet-huile-guide-complet';

-- Update form input classes to use proper styling
UPDATE articles
SET content = REGEXP_REPLACE(
  content,
  'class="w-full px-4 py-2 rounded-lg border-2 border-primary-200 dark:border-primary-700 focus:border-primary-500 dark:focus:border-primary-400 bg-white dark:bg-primary-800"',
  'class="w-full px-4 py-2 rounded-lg border-2 border-secondary-200 dark:border-secondary-700 focus:border-primary-500 dark:focus:border-primary-400 focus:ring-0 transition-colors bg-white dark:bg-secondary-800 text-secondary-900 dark:text-secondary-100"',
  'g'
)
WHERE slug = 'poncer-parquet-huile-guide-complet';

-- Update form labels to use proper styling
UPDATE articles
SET content = REGEXP_REPLACE(
  content,
  'class="block text-sm font-medium text-primary-700 dark:text-primary-300 mb-1"',
  'class="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-1"',
  'g'
)
WHERE slug = 'poncer-parquet-huile-guide-complet';

-- Update form button to use proper styling
UPDATE articles
SET content = REGEXP_REPLACE(
  content,
  'class="w-full px-6 py-3 bg-primary-600 dark:bg-primary-500 text-white rounded-lg hover:bg-primary-700 dark:hover:bg-primary-600 transition-colors font-medium"',
  'class="w-full px-6 py-3 bg-primary-600 dark:bg-primary-500 text-white rounded-lg hover:bg-primary-700 dark:hover:bg-primary-600 transition-all duration-200 font-medium transform hover:-translate-y-1 hover:shadow-lg"',
  'g'
)
WHERE slug = 'poncer-parquet-huile-guide-complet';