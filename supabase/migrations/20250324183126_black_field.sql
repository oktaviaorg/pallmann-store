/*
  # Update blog articles to remove contact forms and add contact buttons

  1. Changes
    - Remove embedded contact forms from article content
    - Add consistent contact button at the end of articles
    - Update article styling for better readability
*/

-- First, remove the contact form section from the article
UPDATE articles
SET content = REGEXP_REPLACE(
  content,
  '<div class="bg-primary-50 dark:bg-primary-900/20 rounded-lg p-6 my-8">.*?</div>(\n\nPour plus d''informations)',
  E'\n## Besoin d''aide pour votre projet ?\n\nNos experts sont à votre disposition pour vous conseiller et vous accompagner dans vos travaux de ponçage.\n\n<div class="not-prose my-8 flex flex-col items-center gap-4">\n  <a href="/" class="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 dark:bg-primary-500 text-white rounded-lg hover:bg-primary-700 dark:hover:bg-primary-600 transition-all duration-200 font-medium transform hover:-translate-y-1 hover:shadow-lg text-center w-full sm:w-auto min-w-[200px] justify-center">\n    Demander un devis\n  </a>\n  \n  <div class="text-sm text-secondary-600 dark:text-secondary-400">\n    ou appelez-nous au <a href="tel:+33757821306" class="text-primary-600 dark:text-primary-400 hover:underline">07 57 82 13 06</a>\n  </div>\n</div>\n\nPour plus d''informations',
  'g'
)
WHERE slug = 'poncer-parquet-huile-guide-complet';

-- Update article content to improve readability
UPDATE articles
SET content = REGEXP_REPLACE(
  content,
  '## Contactez Les Ponceurs Réunis.*$',
  E'## Contactez Les Ponceurs Réunis\n\nBesoin d''un conseil personnalisé ou d''un devis pour vos travaux de ponçage ? Nos experts sont là pour vous aider.\n\n<div class="not-prose my-8 flex flex-col items-center gap-4">\n  <a href="/" class="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 dark:bg-primary-500 text-white rounded-lg hover:bg-primary-700 dark:hover:bg-primary-600 transition-all duration-200 font-medium transform hover:-translate-y-1 hover:shadow-lg text-center w-full sm:w-auto min-w-[200px] justify-center">\n    Nous contacter\n  </a>\n  \n  <div class="text-sm text-secondary-600 dark:text-secondary-400">\n    <strong>Téléphone :</strong> <a href="tel:+33757821306" class="text-primary-600 dark:text-primary-400 hover:underline">07 57 82 13 06</a><br>\n    <strong>Email :</strong> <a href="mailto:contact@poncages.fr" class="text-primary-600 dark:text-primary-400 hover:underline">contact@poncages.fr</a><br>\n    <strong>Zones d''intervention :</strong> Colmar, Strasbourg et environs\n  </div>\n</div>',
  'g'
)
WHERE slug = 'poncer-parquet-huile-guide-complet';

-- Add spacing between sections for better readability
UPDATE articles
SET content = REGEXP_REPLACE(
  content,
  '\n##',
  '\n\n##',
  'g'
)
WHERE slug = 'poncer-parquet-huile-guide-complet';