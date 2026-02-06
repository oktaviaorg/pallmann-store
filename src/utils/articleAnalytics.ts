import { supabase } from '../lib/supabase';

const STORAGE_KEY = 'article_views';
const VIEW_EXPIRY = 24 * 60 * 60 * 1000;

interface ViewRecord {
  articleId: string;
  timestamp: number;
}

const getViewedArticles = (): ViewRecord[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];

    const records: ViewRecord[] = JSON.parse(stored);
    const now = Date.now();

    return records.filter(record => now - record.timestamp < VIEW_EXPIRY);
  } catch {
    return [];
  }
};

const saveViewedArticle = (articleId: string): void => {
  try {
    const records = getViewedArticles();
    records.push({
      articleId,
      timestamp: Date.now()
    });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
  } catch (error) {
    console.error('Error saving view record:', error);
  }
};

const hasViewedArticle = (articleId: string): boolean => {
  const records = getViewedArticles();
  return records.some(record => record.articleId === articleId);
};

export const trackArticleView = async (articleId: string): Promise<void> => {
  if (!articleId || hasViewedArticle(articleId)) {
    return;
  }

  try {
    const { error } = await supabase.rpc('increment_article_view', {
      article_id: articleId
    });

    if (error) {
      console.error('Error tracking article view:', error);
      return;
    }

    saveViewedArticle(articleId);
  } catch (error) {
    console.error('Error tracking article view:', error);
  }
};

export const trackArticleClick = async (articleId: string): Promise<void> => {
  if (!articleId) return;

  try {
    await supabase.rpc('increment_article_click', {
      article_id: articleId
    });
  } catch (error) {
    console.error('Error tracking article click:', error);
  }
};
