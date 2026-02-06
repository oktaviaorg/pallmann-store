/*
  # Add article tracking functions
  
  1. New Functions
    - `increment_article_view`: Increments view_count for an article
    - `increment_article_click`: Increments click_count for an article
  
  2. Purpose
    - Track article engagement metrics
    - Enable analytics for popular content
    - Improve content recommendations
*/

-- Function to increment article view count
CREATE OR REPLACE FUNCTION increment_article_view(article_id uuid)
RETURNS void AS $$
BEGIN
  UPDATE articles
  SET view_count = COALESCE(view_count, 0) + 1
  WHERE id = article_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to increment article click count
CREATE OR REPLACE FUNCTION increment_article_click(article_id uuid)
RETURNS void AS $$
BEGIN
  UPDATE articles
  SET click_count = COALESCE(click_count, 0) + 1
  WHERE id = article_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;