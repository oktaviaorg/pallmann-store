import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useParams, Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { supabase } from '../lib/supabase';
import { Calendar, ArrowLeft, Clock, Tag } from 'lucide-react';

interface Article {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  featured_image: string;
  published_at: string;
  updated_at?: string;
  meta_title?: string;
  meta_description?: string;
  author?: string;
  reading_time?: number;
  category_id?: string;
  categories?: {
    name: string;
    slug: string;
  };
}

const ArticlePage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (slug) {
      fetchArticle(slug);
    }
  }, [slug]);

  const fetchArticle = async (articleSlug: string) => {
    try {
      const { data, error } = await supabase
        .from('pallmann_articles')
        .select('*, categories(name, slug)')
        .eq('slug', articleSlug)
        .eq('published', true)
        .maybeSingle();

      if (error) throw error;

      if (!data) {
        setNotFound(true);
      } else {
        setArticle(data);
      }
    } catch (error) {
      console.error('Error fetching article:', error);
      setNotFound(true);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const estimateReadingTime = (content: string): number => {
    const wordsPerMinute = 200;
    const wordCount = content.split(/\s+/).length;
    return Math.ceil(wordCount / wordsPerMinute);
  };

  // Formatage simple du contenu markdown
  const formatContent = (content: string): string => {
    return content
      // Headers
      .replace(/^### (.*$)/gim, '<h3 class="text-xl font-bold text-gray-900 mt-8 mb-4">$1</h3>')
      .replace(/^## (.*$)/gim, '<h2 class="text-2xl font-bold text-gray-900 mt-10 mb-4">$1</h2>')
      .replace(/^# (.*$)/gim, '<h1 class="text-3xl font-bold text-gray-900 mt-10 mb-4">$1</h1>')
      // Bold
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      // Italic
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      // Lists
      .replace(/^\- (.*$)/gim, '<li class="ml-4">$1</li>')
      .replace(/^\* (.*$)/gim, '<li class="ml-4">$1</li>')
      // Paragraphs
      .replace(/\n\n/g, '</p><p class="mb-4 text-gray-700 leading-relaxed">')
      // Line breaks
      .replace(/\n/g, '<br />');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#ff9900] border-t-transparent mx-auto"></div>
            <p className="mt-4 text-gray-600">Chargement de l'article...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (notFound || !article) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center max-w-md px-4">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Article non trouvé</h1>
            <p className="text-gray-600 mb-8">L'article que vous recherchez n'existe pas ou a été supprimé.</p>
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 bg-[#ff9900] hover:bg-[#e68a00] text-white px-6 py-3 rounded-lg font-bold transition-all"
            >
              <ArrowLeft className="w-5 h-5" />
              Retour au blog
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const readingTime = article.reading_time || estimateReadingTime(article.content || '');

  return (
    <>
      <Helmet>
        <title>{article.meta_title || article.title} | Pallmann Store</title>
        <meta name="description" content={article.meta_description || article.excerpt || ''} />
        <link rel="canonical" href={`https://pallmann-store.com/blog/${article.slug}`} />
        <meta property="og:title" content={article.title} />
        <meta property="og:description" content={article.excerpt || ''} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://pallmann-store.com/blog/${article.slug}`} />
        {article.featured_image && <meta property="og:image" content={article.featured_image} />}
      </Helmet>

      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />

        <main className="flex-grow">
          {/* Hero Image */}
          {article.featured_image && (
            <div className="w-full h-64 md:h-96 bg-gray-200 relative overflow-hidden">
              <img
                src={article.featured_image}
                alt={article.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            </div>
          )}

          <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            {/* Breadcrumb */}
            <nav className="mb-8">
              <Link
                to="/blog"
                className="inline-flex items-center gap-2 text-[#ff9900] hover:text-[#e68a00] font-semibold transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Retour au blog
              </Link>
            </nav>

            {/* Article Header */}
            <header className="mb-8">
              {article.categories?.name && (
                <span className="inline-flex items-center gap-1 text-sm text-[#ff9900] font-semibold mb-4">
                  <Tag className="w-4 h-4" />
                  {article.categories.name}
                </span>
              )}
              
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                {article.title}
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-gray-500 text-sm">
                <span className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {formatDate(article.published_at)}
                </span>
                <span className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  {readingTime} min de lecture
                </span>
              </div>
            </header>

            {/* Article Content */}
            <div className="bg-white rounded-xl shadow-md p-8 md:p-12">
              {article.excerpt && (
                <p className="text-xl text-gray-600 mb-8 font-medium leading-relaxed border-l-4 border-[#ff9900] pl-6">
                  {article.excerpt}
                </p>
              )}

              <div 
                className="prose prose-lg max-w-none text-gray-700"
                dangerouslySetInnerHTML={{ 
                  __html: `<p class="mb-4 text-gray-700 leading-relaxed">${formatContent(article.content || '')}</p>` 
                }}
              />
            </div>

            {/* CTA */}
            <div className="mt-12 bg-gradient-to-r from-[#003366] to-[#004d99] rounded-xl p-8 text-center text-white">
              <h2 className="text-2xl font-bold mb-4">
                Besoin de produits professionnels ?
              </h2>
              <p className="text-blue-100 mb-6">
                Découvrez notre gamme complète de produits Pallmann pour vos travaux.
              </p>
              <Link
                to="/"
                className="inline-block bg-[#ff9900] hover:bg-[#e68a00] text-white px-8 py-4 rounded-lg font-bold transition-all"
              >
                Voir la boutique
              </Link>
            </div>
          </article>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default ArticlePage;
