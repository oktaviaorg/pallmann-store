import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, ExternalLink } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface PopularArticle {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  click_count: number;
  view_count: number;
}

interface PopularArticlesProps {
  currentSlug?: string;
  limit?: number;
}

const PopularArticles: React.FC<PopularArticlesProps> = ({ currentSlug, limit = 6 }) => {
  const [articles, setArticles] = useState<PopularArticle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPopularArticles();
  }, [currentSlug]);

  const fetchPopularArticles = async () => {
    try {
      let query = supabase
        .from('articles')
        .select('id, title, slug, excerpt, click_count, view_count')
        .eq('published', true)
        .eq('is_popular', true)
        .order('click_count', { ascending: false })
        .limit(limit + 1);

      const { data, error } = await query;

      if (error) throw error;

      const filteredArticles = (data || [])
        .filter(article => article.slug !== currentSlug)
        .slice(0, limit);

      setArticles(filteredArticles);
    } catch (error) {
      console.error('Error fetching popular articles:', error);
      setArticles([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-gradient-to-br from-[#f8f9fa] to-white rounded-2xl shadow-lg p-8 border-2 border-[#d9b45a]/20">
        <div className="flex items-center gap-3 mb-6">
          <TrendingUp className="w-6 h-6 text-[#d9b45a]" />
          <h3 className="text-2xl font-bold text-gray-900">Articles les plus populaires</h3>
        </div>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse bg-gray-200 h-24 rounded-xl"></div>
          ))}
        </div>
      </div>
    );
  }

  if (articles.length === 0) {
    return null;
  }

  return (
    <div className="bg-gradient-to-br from-[#f8f9fa] to-white rounded-2xl shadow-lg p-8 border-2 border-[#d9b45a]/20">
      <div className="flex items-center gap-3 mb-6">
        <TrendingUp className="w-6 h-6 text-[#d9b45a]" />
        <h3 className="text-2xl font-bold text-gray-900">Articles les plus populaires</h3>
      </div>
      <p className="text-gray-600 mb-6">
        Découvrez nos articles les plus consultés et appréciés par nos lecteurs
      </p>

      <div className="grid md:grid-cols-2 gap-4">
        {articles.map((article, index) => (
          <Link
            key={article.id}
            to={`/blog/${article.slug}`}
            className="group bg-white rounded-xl p-5 border-2 border-gray-100 hover:border-[#d9b45a] transition-all hover:shadow-lg"
          >
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-r from-[#d9b45a] to-[#b8941a] flex items-center justify-center text-white font-bold text-sm">
                {index + 1}
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-gray-900 group-hover:text-[#b8941a] transition-colors line-clamp-2 mb-2">
                  {article.title}
                </h4>
                <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                  {article.excerpt}
                </p>
                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <div className="flex items-center gap-1">
                    <span className="font-semibold">{article.view_count.toLocaleString()}</span>
                    <span>vues</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="font-semibold">{article.click_count}</span>
                    <span>clics</span>
                  </div>
                </div>
              </div>
              <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-[#d9b45a] transition-colors flex-shrink-0 mt-1" />
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-6 text-center">
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-[#b8941a] hover:text-[#d9b45a] font-semibold transition-colors"
        >
          Voir tous les articles
          <ExternalLink className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
};

export default PopularArticles;
