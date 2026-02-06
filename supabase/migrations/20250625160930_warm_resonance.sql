/*
  # Update image URL in blog article

  1. Changes
    - Update the featured image URL in the Mulhouse article
    - Replace with the new Google Photos URL
*/

UPDATE articles 
SET content = REPLACE(
  content,
  'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=1200&h=600&fit=crop',
  'https://lh3.googleusercontent.com/p/AF1QipM-7xmEk8DL7-0q5doOU1uesHedBZmHWLG5kdNr=s1360-w1360-h1020-rw'
)
WHERE slug = 'renovation-poncage-parquets-immeubles-haussmanniens-historiques-mulhouse';

-- Also update the featured_image field
UPDATE articles 
SET featured_image = 'https://lh3.googleusercontent.com/p/AF1QipM-7xmEk8DL7-0q5doOU1uesHedBZmHWLG5kdNr=s1360-w1360-h1020-rw'
WHERE slug = 'renovation-poncage-parquets-immeubles-haussmanniens-historiques-mulhouse';