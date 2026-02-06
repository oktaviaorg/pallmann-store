/*
  # Ajouter une nouvelle image à la galerie

  1. Changes
    - Ajouter la nouvelle image fournie par l'utilisateur à la galerie de photos
    - L'image sera affichée dans le carrousel de la page d'accueil
    - Attribution d'un ordre séquentiel pour l'affichage

  2. Image Details
    - URL: https://lh3.googleusercontent.com/p/AF1QipPaoXnwytPcI24r6VTPcC-mXusFxJHp9_YTPuVj=s1360-w1360-h1020-rw
    - Ordre: Suivant dans la séquence
*/

-- Ajouter la nouvelle image à la galerie
INSERT INTO gallery_photos (url, "order") 
VALUES (
  'https://lh3.googleusercontent.com/p/AF1QipPaoXnwytPcI24r6VTPcC-mXusFxJHp9_YTPuVj=s1360-w1360-h1020-rw',
  (SELECT COALESCE(MAX("order"), 0) + 1 FROM gallery_photos)
);