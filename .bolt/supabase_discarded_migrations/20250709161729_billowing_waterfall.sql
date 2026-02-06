/*
  # Add contact section to articles

  1. Changes
    - Update all articles to include a standardized contact section
    - Add the contact section before the closing div if it exists
    - Add the contact section at the end of the content if no closing div exists
    
  2. Content
    - Add a standardized contact section with CTA button
    - Include phone number and email
    - Maintain consistent styling across all articles
*/

-- Update all articles to include the contact section
UPDATE articles
SET content = REGEXP_REPLACE(
  content,
  '</div>$',
  '<div class="not-prose my-8 flex flex-col items-center gap-4">
  <a href="/" class="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 dark:bg-primary-500 text-white rounded-lg hover:bg-primary-700 dark:hover:bg-primary-600 transition-all duration-200 font-medium transform hover:-translate-y-1 hover:shadow-lg text-center w-full sm:w-auto min-w-[200px] justify-center">
    Demander un devis gratuit
  </a>
  
  <div class="text-sm text-secondary-600 dark:text-secondary-400 text-center">
    <strong>Téléphone :</strong> <a href="tel:+33757821306" class="text-primary-600 dark:text-primary-400 hover:underline">07 57 82 13 06</a><br>
    <strong>Email :</strong> <a href="mailto:contact@poncages.fr" class="text-primary-600 dark:text-primary-400 hover:underline">contact@poncages.fr</a><br>
    <strong>Experts en rénovation de parquet</strong> dans tout le Grand Est
  </div>
</div></div>',
  'g'
)
WHERE content NOT LIKE '%<div class="not-prose my-8 flex flex-col items-center gap-4">%';

-- For articles that don't end with </div>, add the contact section at the end
UPDATE articles
SET content = content || '

<div class="not-prose my-8 flex flex-col items-center gap-4">
  <a href="/" class="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 dark:bg-primary-500 text-white rounded-lg hover:bg-primary-700 dark:hover:bg-primary-600 transition-all duration-200 font-medium transform hover:-translate-y-1 hover:shadow-lg text-center w-full sm:w-auto min-w-[200px] justify-center">
    Demander un devis gratuit
  </a>
  
  <div class="text-sm text-secondary-600 dark:text-secondary-400 text-center">
    <strong>Téléphone :</strong> <a href="tel:+33757821306" class="text-primary-600 dark:text-primary-400 hover:underline">07 57 82 13 06</a><br>
    <strong>Email :</strong> <a href="mailto:contact@poncages.fr" class="text-primary-600 dark:text-primary-400 hover:underline">contact@poncages.fr</a><br>
    <strong>Experts en rénovation de parquet</strong> dans tout le Grand Est
  </div>
</div>'
WHERE content NOT LIKE '%<div class="not-prose my-8 flex flex-col items-center gap-4">%' 
  AND content NOT LIKE '%</div>$%';