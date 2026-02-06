/*
  # Update article image URL

  1. Changes
    - Update the featured image URL in the Strasbourg parquet article
    - Replace with the new Google Photos URL
*/

UPDATE articles 
SET featured_image = 'https://lh3.googleusercontent.com/p/AF1QipMn2NQ4faqrokH3jkF0MQIRAtLGu2pGBBW79F5N=s1360-w1360-h1020-rw'
WHERE slug = 'poncage-parquet-ancien-strasbourg-redonnez-charme-sol-bois';

-- Also update the image URL in the content
UPDATE articles 
SET content = REGEXP_REPLACE(
  content,
  'https://images.unsplash.com/photo-1622150162297-1b9076a27561\\?q=80&w=1200&h=630&fit=crop',
  'https://lh3.googleusercontent.com/p/AF1QipMn2NQ4faqrokH3jkF0MQIRAtLGu2pGBBW79F5N=s1360-w1360-h1020-rw',
  'g'
)
WHERE slug = 'poncage-parquet-ancien-strasbourg-redonnez-charme-sol-bois';