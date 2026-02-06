import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useParams, Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BlogContactForm from '../components/BlogContactForm';
import PopularArticles from '../components/PopularArticles';
import SocialShare from '../components/SocialShare';
import { supabase } from '../lib/supabase';
import { trackArticleView } from '../utils/articleAnalytics';
import { Calendar, ArrowLeft, Tag, User, Clock, Image as ImageIcon, ArrowRight, Star, CheckCircle } from 'lucide-react';

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
  keywords?: string[];
  author?: string;
  reading_time?: number;
  category_id?: string;
  categories?: {
    name: string;
    slug: string;
  };
}

interface GalleryPhoto {
  id: string;
  url: string;
  title?: string;
  description?: string;
}

const ArticlePage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [galleryPhotos, setGalleryPhotos] = useState<GalleryPhoto[]>([]);

  useEffect(() => {
    if (slug) {
      fetchArticle(slug);
      fetchGalleryPhotos();
    }
  }, [slug]);

  useEffect(() => {
    if (article?.id) {
      trackArticleView(article.id);
    }
  }, [article?.id]);

  const fetchArticle = async (articleSlug: string) => {
    try {
      const { data, error } = await supabase
        .from('articles')
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

  const fetchGalleryPhotos = async () => {
    try {
      const { data, error } = await supabase
        .from('gallery_photos')
        .select('*')
        .order('order')
        .limit(3);

      if (error) throw error;
      setGalleryPhotos(data || []);
    } catch (error) {
      console.error('Error fetching gallery photos:', error);
      setGalleryPhotos([
        { id: '1', url: 'https://mjuzyqhxifyvebtnlrra.supabase.co/storage/v1/object/public/photos-lpr//test%20parquet.jpg', title: 'Rénovation parquet' },
        { id: '2', url: 'https://mjuzyqhxifyvebtnlrra.supabase.co/storage/v1/object/public/lpr2//Huningue%20(3).jpg', title: 'Ponçage parquet' },
        { id: '3', url: 'https://mjuzyqhxifyvebtnlrra.supabase.co/storage/v1/object/public/lpr2//Hotel%20de%20Thann.jpg', title: 'Vitrification' }
      ]);
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

  const formatArticleContent = (content: string): JSX.Element => {
    const lines = content.split('\n');
    const elements: JSX.Element[] = [];
    let currentSection: JSX.Element[] = [];
    let sectionKey = 0;

    const flushSection = () => {
      if (currentSection.length > 0) {
        elements.push(
          <div key={`section-${sectionKey++}`} className="mb-6">
            {currentSection}
          </div>
        );
        currentSection = [];
      }
    };

    const cleanMarkdown = (text: string): string => {
      return text
        .replace(/^#+\s+/g, '')
        .replace(/\*\*/g, '')
        .replace(/\*/g, '')
        .replace(/^>\s+/g, '')
        .replace(/`/g, '')
        .replace(/~~(.*?)~~/g, '$1')
        .trim();
    };

    const processInlineFormatting = (text: string): string => {
      let processed = text;

      const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
      const links: Array<{ text: string; url: string; index: number }> = [];
      let match;

      while ((match = linkRegex.exec(text)) !== null) {
        links.push({
          text: match[1],
          url: match[2],
          index: match.index
        });
      }

      links.reverse().forEach(link => {
        const fullMatch = `[${link.text}](${link.url})`;
        const isInternal = link.url.startsWith('/blog/');
        const linkHtml = isInternal
          ? `<a href="${link.url}" class="text-[#b8941a] font-medium hover:text-[#d9b45a] underline decoration-2 underline-offset-2 transition-colors">${link.text}</a>`
          : `<a href="${link.url}" target="_blank" rel="noopener noreferrer" class="text-[#b8941a] font-medium hover:text-[#d9b45a] underline decoration-2 underline-offset-2 transition-colors">${link.text}</a>`;
        processed = processed.replace(fullMatch, linkHtml);
      });

      const urlRegex = /(https?:\/\/[^\s<\[\]]+[^<.,:;"')\]\s])/g;
      processed = processed.replace(urlRegex, (url) => {
        if (processed.includes(`href="${url}"`)) {
          return url;
        }
        return `<a href="${url}" target="_blank" rel="noopener noreferrer" class="text-[#b8941a] font-medium hover:text-[#d9b45a] underline decoration-2 underline-offset-2 transition-colors">${url}</a>`;
      });

      return processed;
    };

    lines.forEach((line, index) => {
      const trimmedLine = line.trim();

      if (!trimmedLine) {
        flushSection();
        return;
      }

      const cleanedLine = cleanMarkdown(trimmedLine);

      if (!cleanedLine) {
        return;
      }

      if (/^\d+\.\s+/.test(cleanedLine)) {
        flushSection();
        const titleText = cleanedLine.replace(/^\d+\.\s+/, '');
        const titleNumber = cleanedLine.match(/^(\d+)\./)?.[1];

        currentSection.push(
          <div key={`title-${index}`} className="mt-10 mb-5">
            <div className="flex items-start gap-4">
              <span className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-[#d9b45a] to-[#b8941a] text-white rounded-lg flex items-center justify-center text-xl font-bold shadow-md">
                {titleNumber}
              </span>
              <h3 className="flex-1 text-2xl font-bold text-gray-900 pt-2 leading-tight">
                {titleText}
              </h3>
            </div>
          </div>
        );
      } else if (/^[A-ZÀÂÄÉÈÊËÏÎÔÙÛÜŸÇ][A-ZÀÂÄÉÈÊËÏÎÔÙÛÜŸÇ\s:'-]+$/.test(cleanedLine) && cleanedLine.length > 15) {
        flushSection();
        currentSection.push(
          <h2 key={`main-title-${index}`} className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 mt-8">
            {cleanedLine}
          </h2>
        );
      } else if (/^(🚗|🕐|🎟️|🌐|📍|☎️|✉️|📞|🏠|💰|⏰|📧)/.test(cleanedLine)) {
        currentSection.push(
          <p key={`info-${index}`} className="text-gray-800 leading-relaxed mb-2 pl-4 text-[17px] font-medium">
            {cleanedLine}
          </p>
        );
      } else if (/^\d+\s*(visiteurs|€|m|km|ans|siècles|personnes|heures|jours|mois)/.test(cleanedLine)) {
        currentSection.push(
          <div key={`stat-${index}`} className="bg-[#d9b45a]/5 border-l-4 border-[#d9b45a] pl-6 py-3 mb-3">
            <p className="text-gray-900 font-semibold text-[17px]">{cleanedLine}</p>
          </div>
        );
      } else {
        const processedLine = processInlineFormatting(cleanedLine);

        currentSection.push(
          <p
            key={`para-${index}`}
            className="text-gray-700 leading-relaxed mb-4 text-[17px]"
            dangerouslySetInnerHTML={{ __html: processedLine }}
          />
        );
      }
    });

    flushSection();
    return <>{elements}</>;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 via-white to-gray-100">
        <Header />
        <main className="flex-grow pt-24 pb-16 flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-[#d9b45a] border-t-transparent"></div>
            <p className="text-gray-700 mt-4">Chargement de l'article...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (notFound || !article) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 via-white to-gray-100">
        <Header />
        <main className="flex-grow pt-24 pb-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Article non trouvé</h1>
            <p className="text-gray-700 mb-8">L'article que vous recherchez n'existe pas ou n'est plus disponible.</p>
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-[#d9b45a] to-[#b8941a] text-white px-6 py-3 rounded-full font-semibold hover:scale-105 transition-transform"
            >
              <ArrowLeft className="w-4 h-4" />
              Retour au blog
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{article.meta_title || article.title} | Blog Les Ponceurs Réunis</title>
        <meta name="description" content={article.meta_description || article.excerpt || ''} />
        <meta name="robots" content="index, follow" />
        {article.keywords && article.keywords.length > 0 && (
          <meta name="keywords" content={article.keywords.join(', ')} />
        )}
        <meta name="author" content={article.author || 'Les Ponceurs Réunis'} />
        <link rel="canonical" href={`https://ponceur-parquet.fr/blog/${article.slug}`} />

        <meta property="og:type" content="article" />
        <meta property="og:title" content={`${article.meta_title || article.title} | Les Ponceurs Réunis`} />
        <meta property="og:description" content={article.meta_description || article.excerpt || ''} />
        <meta property="og:url" content={`https://ponceur-parquet.fr/blog/${article.slug}`} />
        <meta property="og:site_name" content="Les Ponceurs Réunis" />
        <meta property="og:locale" content="fr_FR" />
        {article.featured_image && (
          <meta property="og:image" content={article.featured_image} />
        )}
        {article.published_at && (
          <meta property="article:published_time" content={article.published_at} />
        )}

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={article.meta_title || article.title} />
        <meta name="twitter:description" content={article.meta_description || article.excerpt || ''} />
        {article.featured_image && (
          <meta name="twitter:image" content={article.featured_image} />
        )}

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "headline": article.title,
            "image": article.featured_image || "https://ponceur-parquet.fr/logo.png",
            "datePublished": article.published_at,
            "dateModified": article.updated_at || article.published_at,
            "author": {
              "@type": "Organization",
              "name": article.author || "Les Ponceurs Réunis",
              "url": "https://ponceur-parquet.fr"
            },
            "publisher": {
              "@type": "Organization",
              "name": "Les Ponceurs Réunis",
              "logo": {
                "@type": "ImageObject",
                "url": "https://mjuzyqhxifyvebtnlrra.supabase.co/storage/v1/object/public/lpr2/favicone%20ponceur.png"
              },
              "url": "https://ponceur-parquet.fr"
            },
            "description": article.excerpt || article.meta_description || "",
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": `https://ponceur-parquet.fr/blog/${article.slug}`
            },
            "keywords": article.keywords?.join(', ') || "",
            "articleBody": article.content,
            "wordCount": article.content.split(/\s+/).length,
            "timeRequired": `PT${article.reading_time || estimateReadingTime(article.content)}M`,
            "inLanguage": "fr-FR",
            "articleSection": article.categories?.name || "Entretien"
          })}
        </script>

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Accueil",
                "item": "https://ponceur-parquet.fr"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Blog",
                "item": "https://ponceur-parquet.fr/blog"
              },
              {
                "@type": "ListItem",
                "position": 3,
                "name": article.title,
                "item": `https://ponceur-parquet.fr/blog/${article.slug}`
              }
            ]
          })}
        </script>
      </Helmet>

      <div className="min-h-screen flex flex-col bg-[#fafaf8]">
        <Header />

        <main className="flex-grow pt-20 pb-16">
          <article className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="mb-6 flex items-center gap-2 text-sm">
              <Link to="/" className="text-gray-500 hover:text-[#b8941a] transition-colors">Accueil</Link>
              <span className="text-gray-400">/</span>
              <Link to="/blog" className="text-gray-500 hover:text-[#b8941a] transition-colors">Blog</Link>
              {article.categories && (
                <>
                  <span className="text-gray-400">/</span>
                  <span className="text-[#b8941a] font-medium">{article.categories.name}</span>
                </>
              )}
            </nav>

            <div className="grid lg:grid-cols-12 gap-8">
              <div className="lg:col-span-8">
                {article.featured_image && (
                  <div className="relative aspect-video rounded-xl overflow-hidden mb-8 shadow-xl">
                    <img
                      src={article.featured_image}
                      alt={article.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                <header className="mb-8">
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-6">
                    {article.title}
                  </h1>

                  <div className="flex flex-wrap items-center gap-4 text-gray-600 text-sm mb-6">
                    {article.categories && (
                      <span className="bg-[#d9b45a]/10 text-[#b8941a] px-3 py-1 rounded-full text-xs font-semibold border border-[#d9b45a]/20">
                        {article.categories.name}
                      </span>
                    )}
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-[#d9b45a]" />
                      <span>{formatDate(article.published_at)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-[#d9b45a]" />
                      <span>{article.reading_time || estimateReadingTime(article.content)} min</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-[#d9b45a]" />
                      <span>{article.author || 'Les Ponceurs Réunis'}</span>
                    </div>
                  </div>

                  {article.excerpt && (
                    <div className="bg-gradient-to-r from-[#d9b45a]/5 to-[#c4a04f]/5 rounded-xl p-6 border-l-4 border-[#d9b45a]">
                      <p className="text-lg text-gray-800 leading-relaxed italic font-medium">
                        {article.excerpt}
                      </p>
                    </div>
                  )}
                </header>

                <BlogContactForm />

                <div className="bg-white rounded-2xl shadow-lg p-8 md:p-10 border border-gray-200 my-8">
                  <div
                    className="prose prose-lg max-w-none
                      prose-headings:text-gray-900 prose-headings:font-bold
                      prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4
                      prose-h3:text-xl prose-h3:font-semibold prose-h3:mt-6 prose-h3:mb-3
                      prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-4 prose-p:text-[17px]
                      prose-ul:list-disc prose-ul:pl-6 prose-ul:space-y-2 prose-ul:mb-6
                      prose-li:text-gray-700 prose-li:text-[17px]
                      prose-strong:text-gray-900 prose-strong:font-semibold
                      prose-img:w-full prose-img:h-auto prose-img:rounded-lg prose-img:my-6"
                    dangerouslySetInnerHTML={{ __html: article.content }}
                  />
                </div>

                <div className="my-8">
                  <SocialShare
                    title={article.title}
                    url={`https://ponceur-parquet.fr/blog/${article.slug}`}
                    description={article.excerpt || article.meta_description}
                  />
                </div>

                {article.keywords && article.keywords.length > 0 && (
                  <div className="bg-white rounded-xl p-6 border border-gray-200 my-8">
                    <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <Tag className="w-5 h-5 text-[#d9b45a]" />
                      Mots-clés
                    </h3>
                    <div className="flex items-center gap-2 flex-wrap">
                      {article.keywords.map((keyword, idx) => (
                        <span key={idx} className="bg-[#d9b45a]/10 text-[#b8941a] px-4 py-2 rounded-full text-sm font-semibold border border-[#d9b45a]/20 hover:bg-[#d9b45a]/20 transition-colors">
                          {keyword}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="bg-white rounded-2xl shadow-lg p-8 border-2 border-[#d9b45a]/20 my-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">
                    Besoin d'un expert pour votre parquet ?
                  </h3>
                  <p className="text-gray-700 mb-6 text-center leading-relaxed">
                    Notre équipe d'artisans est à votre disposition pour tous vos projets de ponçage et rénovation.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <a
                      href="tel:+33757821306"
                      className="inline-flex items-center justify-center gap-2 bg-[#0f1b2b] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#1a2537] transition-all"
                    >
                      Appelez-nous : 07 57 82 13 06
                    </a>
                    <a
                      href="/#formulaire"
                      className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#d9b45a] to-[#b8941a] text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all"
                    >
                      Demander un devis
                      <ArrowRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>

              <aside className="lg:col-span-4 space-y-6">
                <div className="sticky top-24 space-y-6">
                  <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-[#d9b45a]/20">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Navigation rapide</h3>
                    <div className="space-y-3">
                      <Link to="/services" className="flex items-center gap-3 p-3 rounded-lg hover:bg-[#d9b45a]/5 transition-colors group">
                        <CheckCircle className="w-5 h-5 text-[#d9b45a] group-hover:scale-110 transition-transform" />
                        <span className="text-sm font-medium text-gray-700 group-hover:text-[#b8941a]">Nos Services</span>
                      </Link>
                      <Link to="/gallery" className="flex items-center gap-3 p-3 rounded-lg hover:bg-[#d9b45a]/5 transition-colors group">
                        <ImageIcon className="w-5 h-5 text-[#d9b45a] group-hover:scale-110 transition-transform" />
                        <span className="text-sm font-medium text-gray-700 group-hover:text-[#b8941a]">Galerie</span>
                      </Link>
                      <Link to="/reviews" className="flex items-center gap-3 p-3 rounded-lg hover:bg-[#d9b45a]/5 transition-colors group">
                        <Star className="w-5 h-5 text-[#d9b45a] group-hover:scale-110 transition-transform" />
                        <span className="text-sm font-medium text-gray-700 group-hover:text-[#b8941a]">Avis Clients</span>
                      </Link>
                      <Link to="/blog" className="flex items-center gap-3 p-3 rounded-lg hover:bg-[#d9b45a]/5 transition-colors group">
                        <ArrowLeft className="w-5 h-5 text-[#d9b45a] group-hover:scale-110 transition-transform" />
                        <span className="text-sm font-medium text-gray-700 group-hover:text-[#b8941a]">Retour au blog</span>
                      </Link>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-[#d9b45a] to-[#b8941a] rounded-xl shadow-lg p-6 text-white">
                    <h3 className="text-xl font-bold mb-3">Devis Gratuit</h3>
                    <p className="text-sm mb-4 text-white/90">
                      Obtenez une estimation personnalisée pour votre projet
                    </p>
                    <a
                      href="/#formulaire"
                      className="block w-full bg-white text-[#b8941a] px-4 py-3 rounded-lg font-semibold text-center hover:bg-gray-50 transition-all"
                    >
                      Demander un devis
                    </a>
                  </div>

                  {galleryPhotos.length > 0 && (
                    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
                      <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <ImageIcon className="w-5 h-5 text-[#d9b45a]" />
                        Nos Réalisations
                      </h3>
                      <div className="space-y-3">
                        {galleryPhotos.slice(0, 3).map((photo) => (
                          <div key={photo.id} className="group relative aspect-video rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow">
                            <img
                              src={photo.url}
                              alt={photo.title || 'Réalisation'}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                        ))}
                      </div>
                      <Link
                        to="/gallery"
                        className="mt-4 block text-center text-sm text-[#b8941a] hover:text-[#d9b45a] font-semibold transition-colors"
                      >
                        Voir toutes nos réalisations →
                      </Link>
                    </div>
                  )}
                </div>
              </aside>
            </div>

            <div className="mt-12">
              <PopularArticles currentSlug={slug} limit={6} />
            </div>
          </article>

          {/* Bouton WhatsApp flottant */}
          <a
            href="https://wa.me/33757821306?text=Bonjour,%20j'ai%20un%20parquet%20abîmé%20par%20un%20locataire.%20Voici%20ma%20situation%20:"
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-6 right-6 z-50 group"
            aria-label="Contactez-nous sur WhatsApp"
          >
            <div className="flex items-center gap-3 bg-[#25D366] text-white rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 pr-5 pl-4 py-3 group-hover:pr-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-7 h-7 flex-shrink-0"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              <div className="flex flex-col">
                <span className="text-sm font-bold leading-tight">Contactez notre technicien</span>
                <span className="text-xs opacity-90 leading-tight">Diagnostic rapide par WhatsApp</span>
              </div>
            </div>
          </a>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default ArticlePage;
