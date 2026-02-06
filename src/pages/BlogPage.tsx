import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { supabase } from '../lib/supabase';
import { Calendar, ArrowRight } from 'lucide-react';

interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featured_image: string;
  published_at: string;
  category_id: string;
}

interface Category {
  id: string;
  name: string;
  slug: string;
}

const BlogPage: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchArticles();
    fetchCategories();
  }, []);

  const fetchArticles = async () => {
    try {
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .eq('published', true)
        .order('updated_at', { ascending: false });

      if (error) throw error;
      setArticles(data || []);
    } catch (error) {
      console.error('Error fetching articles:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('name');

      if (error) throw error;
      setCategories(data || []);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const filteredArticles = selectedCategory === 'all'
    ? articles
    : articles.filter(article => article.category_id === selectedCategory);

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <>
      <Helmet>
        <title>Blog - Conseils Parquet | Pallmann Store</title>
        <meta name="description" content="Conseils et guides pratiques sur l'entretien, la vitrification et la rénovation de parquet. Découvrez nos astuces professionnelles pour sublimer vos sols." />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://pallmann-store.com/blog" />
        <meta property="og:title" content="Blog - Conseils Parquet | Pallmann Store" />
        <meta property="og:description" content="Conseils et guides pratiques sur l'entretien et la rénovation de parquet." />
        <meta property="og:url" content="https://pallmann-store.com/blog" />
        <meta property="og:type" content="website" />
      </Helmet>

      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />

        <main className="flex-grow pt-8 pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Hero */}
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Blog <span className="text-[#ff9900]">Parquet</span>
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Conseils d'experts, guides pratiques et actualités sur l'entretien, la vitrification et la rénovation de parquets.
              </p>
            </div>

            {/* Filtres catégories */}
            {categories.length > 0 && (
              <div className="flex flex-wrap justify-center gap-3 mb-12">
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`px-6 py-2 rounded-full font-semibold transition-all ${
                    selectedCategory === 'all'
                      ? 'bg-[#ff9900] text-white shadow-lg'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  Tous ({articles.length})
                </button>
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`px-6 py-2 rounded-full font-semibold transition-all ${
                      selectedCategory === category.id
                        ? 'bg-[#ff9900] text-white shadow-lg'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            )}

            {/* Articles */}
            {loading ? (
              <div className="text-center py-16">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-[#ff9900] border-t-transparent"></div>
                <p className="text-gray-600 mt-4">Chargement des articles...</p>
              </div>
            ) : filteredArticles.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-gray-600 text-xl">Aucun article disponible pour le moment.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredArticles.map((article) => (
                  <article
                    key={article.id}
                    className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group flex flex-col"
                  >
                    {article.featured_image && (
                      <div className="relative h-48 overflow-hidden bg-gray-100">
                        <img
                          src={article.featured_image}
                          alt={article.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />
                      </div>
                    )}
                    <div className="p-6 flex flex-col flex-grow">
                      <div className="flex items-center gap-2 text-gray-500 text-sm mb-3">
                        <Calendar className="w-4 h-4" />
                        <span>{formatDate(article.published_at)}</span>
                      </div>
                      <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-[#ff9900] transition-colors">
                        {article.title}
                      </h2>
                      {article.excerpt && (
                        <p className="text-gray-600 mb-4 line-clamp-3 flex-grow">
                          {article.excerpt}
                        </p>
                      )}
                      <Link
                        to={`/blog/${article.slug}`}
                        className="inline-flex items-center gap-2 text-[#ff9900] font-semibold hover:gap-3 transition-all mt-auto"
                      >
                        Lire la suite
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            )}

            {/* CTA */}
            <div className="mt-16 bg-gradient-to-r from-[#003366] to-[#004d99] rounded-xl p-8 md:p-12 text-center text-white">
              <h2 className="text-3xl font-bold mb-4">
                Besoin de produits professionnels ?
              </h2>
              <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
                Découvrez notre gamme complète de produits Pallmann pour l'entretien et la finition de vos parquets.
              </p>
              <Link
                to="/"
                className="inline-block bg-[#ff9900] hover:bg-[#e68a00] text-white px-8 py-4 rounded-lg font-bold transition-all"
              >
                Voir la boutique
              </Link>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default BlogPage;
