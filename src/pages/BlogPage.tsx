import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AnalysisBanner from '../components/AnalysisBanner';
import PopularArticles from '../components/PopularArticles';
import { supabase } from '../lib/supabase';
import { generateBreadcrumbSchema, blogCollectionSchema } from '../utils/seoSchemas';
import { Calendar, ArrowRight, Eye, Rss } from 'lucide-react';

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

  const getFilteredArticles = () => {
    let filtered = selectedCategory === 'all'
      ? articles
      : selectedCategory === 'sans-categorie'
      ? articles.filter(article => !article.category_id)
      : articles.filter(article => article.category_id === selectedCategory);

    const sortedArticles = [...filtered].sort((a, b) => {
      const dateA = new Date(a.created_at);
      const dateB = new Date(b.created_at);

      const isTargetPeriodA = dateA >= new Date('2025-09-01') && dateA < new Date('2025-12-01');
      const isTargetPeriodB = dateB >= new Date('2025-09-01') && dateB < new Date('2025-12-01');

      if (isTargetPeriodA && !isTargetPeriodB) return -1;
      if (!isTargetPeriodA && isTargetPeriodB) return 1;

      return dateB.getTime() - dateA.getTime();
    });

    const reorderedArticles: Article[] = [];
    const naturaArticles: Article[] = [];
    const otherArticles: Article[] = [];

    sortedArticles.forEach(article => {
      if (article.featured_image?.includes('natura%20parquet.jpg')) {
        naturaArticles.push(article);
      } else {
        otherArticles.push(article);
      }
    });

    let naturaIndex = 0;
    let otherIndex = 0;

    while (otherIndex < otherArticles.length || naturaIndex < naturaArticles.length) {
      if (otherIndex < otherArticles.length) {
        reorderedArticles.push(otherArticles[otherIndex++]);
      }
      if (otherIndex < otherArticles.length) {
        reorderedArticles.push(otherArticles[otherIndex++]);
      }
      if (naturaIndex < naturaArticles.length) {
        reorderedArticles.push(naturaArticles[naturaIndex++]);
      }
    }

    return reorderedArticles;
  };

  const filteredArticles = getFilteredArticles();

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
        <title>Blog Parquet - 1303 Articles d'Experts | Les Ponceurs Réunis</title>
        <meta name="description" content="1303 articles d'experts sur le ponçage, la vitrification et la rénovation de parquet. Guides complets, conseils pratiques et solutions pour tous vos projets de rénovation." />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://ponceur-parquet.fr/blog" />
        <link rel="alternate" type="application/rss+xml" title="Blog Les Ponceurs Réunis - RSS Feed" href="https://ponceur-parquet.fr/rss.xml" />
        <meta property="og:title" content="Blog Parquet - 1303 Articles d'Experts | Les Ponceurs Réunis" />
        <meta property="og:description" content="1303 articles d'experts sur le ponçage, la vitrification et la rénovation de parquet en France." />
        <meta property="og:url" content="https://ponceur-parquet.fr/blog" />
        <meta property="og:type" content="website" />

        <script type="application/ld+json">
          {JSON.stringify(blogCollectionSchema)}
        </script>

        <script type="application/ld+json">
          {JSON.stringify(generateBreadcrumbSchema([
            { name: "Accueil", url: "https://ponceur-parquet.fr" },
            { name: "Blog", url: "https://ponceur-parquet.fr/blog" }
          ]))}
        </script>
      </Helmet>

      <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 via-white to-gray-100">
        <Header />
        <AnalysisBanner />

        <main className="flex-grow pt-24 pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Blog Parquet : <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d9b45a] via-[#b8941a] to-[#d9b45a]">Conseils & Guides d'Entretien</span>
              </h1>
              <p className="text-xl text-gray-700 max-w-3xl mx-auto mb-4 leading-relaxed">
                Conseils d'experts, guides pratiques et actualités sur l'entretien, la rénovation et le ponçage de parquets en Alsace. Découvrez nos astuces professionnelles pour sublimer et préserver vos sols en bois.
              </p>
              <a
                href="/rss.xml"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[#b8941a] hover:text-[#d9b45a] font-semibold transition-colors group"
              >
                <Rss className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span>S'abonner au flux RSS</span>
              </a>
            </div>

            <div className="flex flex-wrap justify-center gap-3 mb-12">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-6 py-2 rounded-full font-semibold transition-all ${
                  selectedCategory === 'all'
                    ? 'bg-gradient-to-r from-[#d9b45a] to-[#b8941a] text-white shadow-lg'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Tous les articles ({articles.length})
              </button>
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-6 py-2 rounded-full font-semibold transition-all ${
                    selectedCategory === category.id
                      ? 'bg-gradient-to-r from-[#d9b45a] to-[#b8941a] text-white shadow-lg'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {category.name}
                </button>
              ))}
              <button
                onClick={() => setSelectedCategory('sans-categorie')}
                className={`px-6 py-2 rounded-full font-semibold transition-all ${
                  selectedCategory === 'sans-categorie'
                    ? 'bg-gradient-to-r from-[#d9b45a] to-[#b8941a] text-white shadow-lg'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Pages locales ({articles.filter(a => !a.category_id).length})
              </button>
            </div>

            <div className="mb-12">
              <PopularArticles limit={6} />
            </div>

            {loading ? (
              <div className="text-center py-16">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-[#d9b45a] border-t-transparent"></div>
                <p className="text-gray-700 mt-4">Chargement des articles...</p>
              </div>
            ) : filteredArticles.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-gray-700 text-xl">Aucun article disponible pour le moment.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredArticles.map((article) => (
                  <article
                    key={article.id}
                    className="bg-gradient-to-br from-[#eee9df] to-[#f5f0e8] rounded-2xl overflow-hidden border-2 border-[#d9b45a] hover:border-[#d9b45a] transition-all duration-300 hover:scale-105 hover:shadow-2xl group"
                  >
                    {article.featured_image && (
                      <div className="relative h-48 overflow-hidden bg-gradient-to-br from-[#fafaf8] to-[#eee9df]">
                        <img
                          src={article.featured_image}
                          alt={article.title}
                          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />
                      </div>
                    )}
                    <div className="p-6">
                      <div className="flex items-center gap-2 text-[#d9b45a] text-sm mb-3">
                        <Calendar className="w-4 h-4" />
                        <span>{formatDate(article.published_at)}</span>
                      </div>
                      <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                        {article.title}
                      </h2>
                      {article.excerpt && (
                        <p className="text-gray-700 mb-4 line-clamp-3">
                          {article.excerpt}
                        </p>
                      )}
                      <Link
                        to={`/blog/${article.slug}`}
                        className="inline-flex items-center gap-2 text-[#d9b45a] font-semibold hover:gap-3 transition-all"
                      >
                        Lire la suite
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            )}

            <div className="mt-16 bg-gradient-to-r from-[#d9b45a]/10 to-[#c4a04f]/5 rounded-2xl p-8 md:p-12 border-2 border-[#d9b45a]/20 text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Besoin de conseils personnalisés ?
              </h2>
              <p className="text-gray-700 mb-8 max-w-2xl mx-auto">
                Notre équipe d'experts est à votre disposition pour répondre à vos questions sur l'entretien et la rénovation de vos parquets.
              </p>
              <a
                href="/#formulaire"
                className="inline-block bg-gradient-to-r from-[#d9b45a] to-[#b8941a] text-white px-8 py-4 rounded-full font-bold hover:scale-105 transition-transform shadow-lg"
              >
                Nous contacter
              </a>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default BlogPage;
