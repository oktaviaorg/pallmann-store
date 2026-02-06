/*
  # Update parquet renovation article to use image instead of video

  1. Changes
    - Replace video element with image in the article content
    - Use the provided image URL
    - Keep all other content the same
*/

UPDATE articles
SET content = REPLACE(
  content,
  '<div class="aspect-video w-full rounded-xl overflow-hidden mb-8">
  <video 
    src="https://mjuzyqhxifyvebtnlrra.supabase.co/storage/v1/object/public/lpr2//IMG_2011.MOV" 
    controls 
    class="w-full h-full object-cover"
    poster="https://mjuzyqhxifyvebtnlrra.supabase.co/storage/v1/object/public/photos-lpr//test%20parquet.jpg"
  >
    Votre navigateur ne prend pas en charge la lecture de vidéos.
  </video>
</div>',
  '<div class="aspect-video w-full rounded-xl overflow-hidden mb-8">
  <img 
    src="https://mjuzyqhxifyvebtnlrra.supabase.co/storage/v1/object/public/lpr2//poncage%20bona%20.JPG" 
    alt="Ponçage professionnel d''un parquet avec une ponceuse Bona" 
    class="w-full h-full object-cover"
  />
</div>'
)
WHERE slug = 'refaire-parquet-prix-m2-astuces-finitions-retours-experience';