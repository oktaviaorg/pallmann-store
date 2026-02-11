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
        .eq('site', 'pallmann-store')
        .order('updated_at', { ascending: false });

      if (error) throw error;
      setArticles(data || []);
    } catch (error) {
      console.error('Error fetching articles:', error);
    } finally {
      setLoading(false);
    }
  };

  // IDs des catégories Pallmann Store
  const PALLMANN_CATEGORY_IDS = [
    'f9ec8b17-4d33-412f-9629-1b38c0760f0a', // Vitrificateurs
    '948cc153-44e5-40d0-bfff-1ae3d87ae6c8', // Huiles
    'f70b545e-64cc-4fe8-b6db-6da3283a26f0', // Colles
    '83073496-efb3-4f2e-8387-0ec24bb73aef', // Préparation
    'ce9e4d80-6242-498d-b03d-99bc0331ca54', // Machines
    'f97c515b-3c96-49b6-988b-a3b8a9d4ffb1', // DIY
    '1bd4e931-54e4-4536-98f0-a1766afc4d9f', // Pro Tips
  ];

  const fetchCategories = async () => {
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .in('id', PALLMANN_CATEGORY_IDS)
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
        <title>Conseils & Guides Parquet Pro | Pallmann Store</title>
        <meta name="description" content="Conseils d'experts, tutoriels DIY et guides professionnels sur l'entretien, la vitrification et la rénovation de parquet. Techniques pro et astuces terrain." />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://pallmann-store.com/blog" />
        <meta property="og:title" content="Conseils & Guides Parquet Pro | Pallmann Store" />
        <meta property="og:description" content="Conseils d'experts et guides professionnels pour l'entretien et la rénovation de parquet." />
        <meta property="og:url" content="https://pallmann-store.com/blog" />
        <meta property="og:type" content="website" />
      </Helmet>

      <div className="min-h-screen flex flex-col bg-[#F7FAFC]">
        <Header />

        <main className="flex-grow pt-8 pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Hero */}
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-[#1A1A1A] mb-6">
                Conseils & <span className="text-[#FF9900]">Guides Pro</span>
              </h1>
              <p className="text-xl text-[#6B6B6B] max-w-3xl mx-auto leading-relaxed">
                Conseils d'experts, guides pratiques et tutoriels DIY sur l'entretien, la vitrification et la rénovation de parquets. Par des professionnels, pour tous.
              </p>
            </div>

            {/* Filtres catégories */}
            {categories.length > 0 && (
              <div className="flex flex-wrap justify-center gap-3 mb-12">
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`px-6 py-2 rounded-full font-semibold transition-all ${
                    selectedCategory === 'all'
                      ? 'bg-[#FF9900] text-white shadow-lg'
                      : 'bg-white text-[#2D2D2D] hover:bg-[#EBF4FF] border border-gray-200'
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
                        ? 'bg-[#FF9900] text-white shadow-lg'
                        : 'bg-white text-[#2D2D2D] hover:bg-[#EBF4FF] border border-gray-200'
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
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-[#1A1A1A] border-t-transparent"></div>
                <p className="text-[#6B6B6B] mt-4">Chargement des articles...</p>
              </div>
            ) : filteredArticles.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-[#6B6B6B] text-xl">Aucun article disponible pour le moment.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredArticles.map((article) => (
                  <article
                    key={article.id}
                    className="bg-white rounded-xl overflow-hidden shadow-card hover:shadow-medium transition-all duration-300 hover:-translate-y-1 group flex flex-col border border-gray-100"
                  >
                    {/* Image flottante sur fond dégradé orange/doré */}
                    <div className="relative pt-4 pb-0">
                      {/* Fond dégradé orange chaud */}
                      <div className="absolute bottom-0 left-0 right-0 h-2/3 bg-gradient-to-br from-[#FF9900] via-[#F59E0B] to-[#D97706] rounded-t-[2rem]"></div>
                      {/* Motif subtil */}
                      <div className="absolute bottom-0 left-0 right-0 h-2/3 rounded-t-[2rem] opacity-10" style={{backgroundImage: 'radial-gradient(circle at 20% 80%, white 1px, transparent 1px)', backgroundSize: '20px 20px'}}></div>
                      {article.featured_image ? (
                        <img
                          src={article.featured_image}
                          alt={article.title}
                          className="relative z-10 w-full h-52 object-contain group-hover:scale-105 transition-transform duration-500 drop-shadow-2xl"
                          loading="lazy"
                        />
                      ) : (
                        <div className="relative z-10 w-full h-52 flex items-center justify-center">
                          <div className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/30">
                            <span className="text-white text-4xl font-bold">📖</span>
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="p-5 flex flex-col flex-grow">
                      <div className="flex items-center gap-2 text-[#6B6B6B] text-xs mb-1">
                        <Calendar className="w-3 h-3" />
                        <span>{formatDate(article.published_at)}</span>
                      </div>
                      <h2 className="text-lg md:text-xl font-bold text-[#1A1A1A] mb-2 line-clamp-2 group-hover:text-[#FF9900] transition-colors leading-tight">
                        {article.title}
                      </h2>
                      {article.excerpt && (
                        <p className="text-[#2D3748] mb-4 line-clamp-3 flex-grow">
                          {article.excerpt}
                        </p>
                      )}
                      <Link
                        to={`/blog/${article.slug}`}
                        className="inline-flex items-center gap-2 text-[#FF9900] font-semibold hover:gap-3 transition-all mt-auto"
                      >
                        Lire la suite
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            )}

            {/* CTA - Bleu avec accent orange */}
            <div className="mt-16 bg-gradient-to-r from-[#1A1A1A] to-[#2D2D2D] rounded-xl p-8 md:p-12 text-center text-white relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-[#FF9900]"></div>
              <h2 className="text-3xl font-bold mb-4">
                Besoin de produits professionnels ?
              </h2>
              <p className="text-white/80 mb-8 max-w-2xl mx-auto">
                Découvrez notre gamme complète de produits Pallmann pour l'entretien et la finition de vos parquets.
              </p>
              <Link
                to="/"
                className="inline-block bg-[#FF9900] hover:bg-[#F0C300] text-white px-8 py-4 rounded-lg font-bold transition-all shadow-sm hover:shadow-md"
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
