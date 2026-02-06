import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { supabase } from '../lib/supabase';
import { generateLocalBusinessSchema, generateBreadcrumbSchema } from '../utils/seoSchemas';
import { Star, Quote, ArrowLeft, Calendar, CheckCircle } from 'lucide-react';

interface Review {
  id: string;
  name: string;
  title: string;
  content: string;
  rating: number;
  image_url?: string;
  created_at: string;
}

const ReviewsPage: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [averageRating, setAverageRating] = useState(0);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const { data, error } = await supabase
        .from('reviews')
        .select('*')
        .eq('status', 'approved')
        .order('created_at', { ascending: false });

      if (error) throw error;

      const reviewsData = data || [];
      setReviews(reviewsData);

      if (reviewsData.length > 0) {
        const avg = reviewsData.reduce((sum, r) => sum + r.rating, 0) / reviewsData.length;
        setAverageRating(avg);
      }
    } catch (error) {
      console.error('Error fetching reviews:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const renderStars = (rating: number, size: string = 'w-5 h-5') => {
    return (
      <div className="flex items-center gap-1">
        {Array.from({ length: 5 }, (_, i) => (
          <Star
            key={i}
            className={`${size} ${
              i < rating
                ? 'fill-[#d9b45a] text-[#d9b45a]'
                : 'fill-gray-300 text-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  const schemaOrgData = generateLocalBusinessSchema({
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": averageRating.toFixed(1),
      "reviewCount": reviews.length,
      "bestRating": "5",
      "worstRating": "1"
    },
    "review": reviews.map(review => ({
      "@type": "Review",
      "author": {
        "@type": "Person",
        "name": review.name
      },
      "datePublished": review.created_at,
      "reviewBody": review.content,
      "name": review.title,
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": review.rating,
        "bestRating": "5",
        "worstRating": "1"
      }
    }))
  });

  return (
    <>
      <Helmet>
        <title>Avis Clients | Les Ponceurs Réunis - Ponçage et Vitrification de Parquet</title>
        <meta
          name="description"
          content={`Découvrez les ${reviews.length} avis de nos clients sur nos services de ponçage et vitrification de parquet. Note moyenne: ${averageRating.toFixed(1)}/5. Artisans experts en Alsace.`}
        />
        <meta name="keywords" content="avis clients, témoignages, ponçage parquet, vitrification parquet, Alsace, Haut-Rhin" />
        <link rel="canonical" href="https://ponceur-parquet.fr/reviews" />

        <meta property="og:title" content="Avis Clients | Les Ponceurs Réunis" />
        <meta property="og:description" content={`${reviews.length} avis clients avec une note moyenne de ${averageRating.toFixed(1)}/5`} />
        <meta property="og:url" content="https://ponceur-parquet.fr/reviews" />
        <meta property="og:type" content="website" />

        <script type="application/ld+json">
          {JSON.stringify(schemaOrgData)}
        </script>

        <script type="application/ld+json">
          {JSON.stringify(generateBreadcrumbSchema([
            { name: "Accueil", url: "https://ponceur-parquet.fr" },
            { name: "Avis Clients", url: "https://ponceur-parquet.fr/reviews" }
          ]))}
        </script>
      </Helmet>

      <div className="min-h-screen bg-gradient-to-b from-[#eee9df] to-white">
        <Header />

        <main className="pt-20">
          <section className="py-12 md:py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              <Link
                to="/"
                className="inline-flex items-center gap-2 text-gray-600 hover:text-[#d9b45a] transition-colors mb-8 group"
              >
                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                Retour à l'accueil
              </Link>

              <div className="text-center mb-16">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                  Avis Clients - <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d9b45a] via-[#b8941a] to-[#d9b45a]">Ponçage et Rénovation de Parquet en Alsace</span>
                </h1>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed">
                  Découvrez les témoignages authentiques de nos clients satisfaits partout en Alsace : Strasbourg, Colmar, Mulhouse et environs. Plus de 15 ans d'expérience et un taux de satisfaction de 4.9/5 sur nos services de ponçage, vitrification et rénovation de parquet.
                </p>

                {reviews.length > 0 && (
                  <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md mx-auto border-2 border-[#d9b45a]/20">
                    <div className="flex flex-col items-center gap-4">
                      <div className="text-6xl font-bold text-[#d9b45a]">
                        {averageRating.toFixed(1)}
                      </div>
                      {renderStars(Math.round(averageRating), 'w-8 h-8')}
                      <p className="text-gray-600 text-lg">
                        Basé sur <span className="font-bold text-gray-900">{reviews.length}</span> avis clients
                      </p>
                      <div className="flex items-center gap-2 text-green-600">
                        <CheckCircle className="w-5 h-5" />
                        <span className="font-semibold">100% vérifiés</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {loading ? (
                <div className="text-center py-20">
                  <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#d9b45a]"></div>
                  <p className="mt-4 text-gray-600">Chargement des avis...</p>
                </div>
              ) : reviews.length === 0 ? (
                <div className="text-center py-20">
                  <Quote className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 text-lg">Aucun avis pour le moment</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {reviews.map((review) => (
                    <article
                      key={review.id}
                      className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border-2 border-gray-100 hover:border-[#d9b45a]/40 hover:-translate-y-1"
                    >
                      <div className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <Quote className="w-10 h-10 text-[#d9b45a]/20 flex-shrink-0" />
                          {renderStars(review.rating)}
                        </div>

                        <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                          {review.title}
                        </h3>

                        <p className="text-gray-700 leading-relaxed mb-6 line-clamp-6">
                          {review.content}
                        </p>

                        <div className="pt-4 border-t border-gray-200">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-semibold text-gray-900">
                                {review.name}
                              </p>
                              <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                                <Calendar className="w-4 h-4" />
                                {formatDate(review.created_at)}
                              </div>
                            </div>
                            {review.image_url && (
                              <a
                                href={review.image_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[#d9b45a] hover:text-[#b8941a] text-sm font-medium"
                              >
                                Voir plus
                              </a>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="bg-gradient-to-r from-[#d9b45a]/10 to-[#b8941a]/10 px-6 py-3">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          <span>Avis vérifié</span>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              )}

              <div className="mt-16 text-center">
                <div className="bg-gradient-to-br from-[#0f1b2b] to-[#1a2b3d] rounded-2xl shadow-2xl p-8 md:p-12">
                  <h2 className="text-3xl font-bold text-white mb-4">
                    Vous avez un projet de ponçage de parquet ?
                  </h2>
                  <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
                    Rejoignez nos clients satisfaits et obtenez un devis gratuit pour votre projet
                  </p>
                  <Link
                    to="/#devis"
                    className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#d9b45a] to-[#b8941a] text-[#0f1b2b] rounded-xl font-bold shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 text-lg"
                  >
                    Demander un devis gratuit
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default ReviewsPage;
