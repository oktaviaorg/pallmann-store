/*
  # Format article content

  1. Changes
     - Améliore la mise en forme des articles de blog
     - Ajoute des espaces entre les paragraphes
     - Corrige la mise en forme des titres
     - Ajoute des sauts de ligne appropriés
     - Standardise la présentation des FAQ
  
  2. Motivation
     - Améliorer la lisibilité des articles
     - Créer une présentation cohérente sur l'ensemble du site
*/

-- Fonction pour formater le contenu des articles
CREATE OR REPLACE FUNCTION format_article_content()
RETURNS void AS $$
DECLARE
  article_record RECORD;
BEGIN
  -- Parcourir tous les articles
  FOR article_record IN SELECT id, content FROM articles
  LOOP
    -- Formater le contenu de l'article
    UPDATE articles
    SET content = 
      -- Assurer que les titres ont des espaces appropriés
      regexp_replace(
        -- Assurer que les paragraphes ont des espaces appropriés
        regexp_replace(
          -- Assurer que les listes ont des espaces appropriés
          regexp_replace(
            -- Standardiser les FAQ
            regexp_replace(
              -- Normaliser les sauts de ligne
              regexp_replace(article_record.content, E'\r\n', E'\n', 'g'),
              -- Format FAQ: Question ? -> ## Question ?
              E'(?m)^([^#].*\\?)\\s*$', E'## \\1', 'g'
            ),
            -- Assurer que les listes ont un espace après le tiret
            E'(?m)^(\\s*)-\\s*(.+)$', E'\\1- \\2', 'g'
          ),
          -- Assurer que les paragraphes sont séparés par des lignes vides
          E'(?m)^([^#\\s<>-].+)$\\n^([^#\\s<>-].+)$', E'\\1\n\n\\2', 'g'
        ),
        -- Assurer que les titres ont des espaces avant et après
        E'(?m)^(#+)\\s*(.+)$', E'\\1 \\2\n', 'g'
      )
    WHERE id = article_record.id;
  END LOOP;
END;
$$ LANGUAGE plpgsql;

-- Exécuter la fonction pour formater tous les articles
SELECT format_article_content();

-- Supprimer la fonction après utilisation
DROP FUNCTION format_article_content();