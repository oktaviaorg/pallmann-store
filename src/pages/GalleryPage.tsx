import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AnalysisBanner from '../components/AnalysisBanner';
import { supabase } from '../lib/supabase';
import { generateBreadcrumbSchema } from '../utils/seoSchemas';
import { Eye, X, CheckCircle } from 'lucide-react';

interface GalleryPhoto {
  id: string;
  url: string;
  order: number;
  title?: string;
  description?: string;
  city?: string;
}

const GalleryPage: React.FC = () => {
  const [galleryPhotos, setGalleryPhotos] = useState<GalleryPhoto[]>([]);
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryPhoto | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGalleryPhotos();
  }, []);

  const fetchGalleryPhotos = async () => {
    try {
      const { data, error } = await supabase
        .from('gallery_photos')
        .select('*')
        .order('order');

      if (error) {
        console.error('Error fetching gallery photos:', error);
        setGalleryPhotos([]);
      } else {
        setGalleryPhotos(data || []);
      }
    } catch (error) {
      console.error('Error fetching gallery photos:', error);
      setGalleryPhotos([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Galerie de Nos Réalisations | Les Ponceurs Réunis</title>
        <meta name="description" content="Les Ponceurs Réunis : Découvrez nos réalisations de ponçage et rénovation de parquet en Alsace. Photos avant/après de nos chantiers." />
        <link rel="canonical" href="https://ponceur-parquet.fr/gallery" />
        <meta property="og:title" content="Galerie de Réalisations | Les Ponceurs Réunis" />
        <meta property="og:description" content="Les Ponceurs Réunis : Photos avant/après de nos chantiers de ponçage et rénovation de parquet en Alsace." />
        <meta property="og:url" content="https://ponceur-parquet.fr/gallery" />
        <meta property="og:type" content="website" />

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ImageGallery",
            "name": "Galerie de réalisations de ponçage et rénovation de parquet",
            "description": "Photos avant/après de nos chantiers de ponçage et rénovation de parquet en Alsace",
            "url": "https://ponceur-parquet.fr/gallery",
            "provider": {
              "@type": "LocalBusiness",
              "name": "Les Ponceurs Réunis",
              "url": "https://ponceur-parquet.fr"
            },
            "image": galleryPhotos.slice(0, 10).map(photo => ({
              "@type": "ImageObject",
              "contentUrl": photo.url,
              "name": photo.title || "Réalisation de ponçage de parquet",
              "description": photo.description || `Réalisation de ponçage et rénovation de parquet${photo.city ? ` à ${photo.city}` : ''}`,
              "caption": photo.title || "Réalisation Les Ponceurs Réunis"
            }))
          })}
        </script>

        <script type="application/ld+json">
          {JSON.stringify(generateBreadcrumbSchema([
            { name: "Accueil", url: "https://ponceur-parquet.fr" },
            { name: "Galerie", url: "https://ponceur-parquet.fr/gallery" }
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
                Nos Réalisations de <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d9b45a] via-[#b8941a] to-[#d9b45a]">Ponçage et Rénovation de Parquet</span>
              </h1>
              <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed mb-8">
                Découvrez nos plus belles rénovations de parquets massifs et contrecollés réalisées en Alsace et régions limitrophes : Strasbourg, Colmar, Mulhouse, Belfort, Dijon et toute la région Grand Est.
              </p>
            </div>

            {/* Content Section - Rich SEO Text */}
            <div className="max-w-4xl mx-auto mb-16 bg-gradient-to-br from-[#f5f5f3] to-white rounded-2xl p-8 shadow-lg border border-[#d9b45a]/20">
              <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
                <p className="text-base leading-relaxed">
                  Cette galerie présente une sélection de nos <strong>projets de rénovation de parquet</strong> réalisés avec passion et savoir-faire dans toute l'Alsace. Chaque chantier est unique et témoigne de notre expertise en <strong>ponçage professionnel</strong>, <strong>vitrification</strong>, <strong>huilage</strong> et <strong>restauration complète</strong> de parquets anciens ou abîmés.
                </p>

                <p className="text-base leading-relaxed">
                  Nos réalisations couvrent une grande variété de projets : appartements en centre-ville de Strasbourg nécessitant une rénovation discrète et rapide, maisons anciennes alsaciennes avec parquets en chêne massif à restaurer, commerces et restaurants à Colmar demandant une finition ultra-résistante au passage intensif, ou encore hôtels de prestige à Mulhouse recherchant un rendu haut de gamme. Chaque projet bénéficie du même niveau d'exigence et d'attention aux détails.
                </p>

                <p className="text-base leading-relaxed">
                  Vous découvrirez des <strong>parquets en point de Hongrie</strong>, <strong>parquets Versailles</strong>, <strong>parquets bâtons rompus</strong>, ainsi que des <strong>lames larges contemporaines</strong> et des <strong>parquets à l'anglaise traditionnels</strong>. Les essences traitées incluent le chêne massif naturel ou teinté, le châtaignier, le hêtre, l'érable, et parfois des bois exotiques comme le teck ou le merbau pour des projets spécifiques.
                </p>

                <div className="bg-white rounded-xl p-6 my-6 border-l-4 border-[#d9b45a]">
                  <h3 className="text-lg font-bold text-gray-900 mb-3">Types de finitions présentées</h3>
                  <ul className="grid md:grid-cols-2 gap-2 text-sm">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-[#d9b45a] flex-shrink-0" />
                      <span>Vitrification mate, satinée et brillante</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-[#d9b45a] flex-shrink-0" />
                      <span>Huilage naturel traditionnel</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-[#d9b45a] flex-shrink-0" />
                      <span>Teintes et lasures sur mesure</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-[#d9b45a] flex-shrink-0" />
                      <span>Finitions écologiques et bio</span>
                    </li>
                  </ul>
                </div>

                <p className="text-base leading-relaxed">
                  Chaque photo illustre notre engagement qualité : surfaces parfaitement planes après ponçage, joints réguliers, finitions impeccables sans coulures ni traces de pinceau, et surtout cette brillance naturelle ou ce veinage sublimé qui révèle toute la beauté du bois. Les avant-après de nos chantiers démontrent notre capacité à transformer radicalement un parquet vieilli, taché ou rayé en une surface comme neuve qui valorise votre intérieur.
                </p>

                <p className="text-sm text-gray-600 italic mt-4">
                  Plus de 500 parquets rénovés depuis 2008 | Intervention dans un rayon de 150 km autour de Colmar | Devis gratuit sous 24h
                </p>
              </div>
            </div>

            {loading ? (
              <div className="text-center py-16">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-[#d9b45a] border-t-transparent"></div>
                <p className="text-gray-700 mt-4">Chargement de la galerie...</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {galleryPhotos.map((photo) => (
                  <div
                    key={photo.id}
                    className="group relative aspect-square rounded-2xl overflow-hidden cursor-pointer border-2 border-gray-200 hover:border-[#d9b45a] transition-all duration-300"
                    onClick={() => setSelectedPhoto(photo)}
                  >
                    <img
                      src={photo.url}
                      alt={photo.title || 'Réalisation'}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      loading="lazy"
                    />
                    {photo.city && (
                      <div className="absolute top-3 right-3 bg-gradient-to-r from-[#d9b45a] to-[#b8941a] text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
                        {photo.city}
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <h3 className="text-white font-semibold mb-2">
                          {photo.title || 'Réalisation'}
                        </h3>
                        {photo.description && (
                          <p className="text-gray-300 text-sm">{photo.description}</p>
                        )}
                      </div>
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <Eye className="w-12 h-12 text-white" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-16 bg-gradient-to-r from-[#d9b45a]/10 to-[#c4a04f]/5 rounded-2xl p-8 md:p-12 border-2 border-[#d9b45a]/20 text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Votre projet de rénovation
              </h2>
              <p className="text-gray-700 mb-8 max-w-2xl mx-auto">
                Envie de donner un nouvel éclat à vos parquets ? Contactez-nous pour un devis gratuit et personnalisé.
              </p>
              <a
                href="/#formulaire"
                className="inline-block bg-gradient-to-r from-[#d9b45a] to-[#b8941a] text-white px-8 py-4 rounded-full font-bold hover:scale-105 transition-transform shadow-lg"
              >
                Demander un devis
              </a>
            </div>
          </div>
        </main>

        <Footer />
      </div>

      {selectedPhoto && (
        <div
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedPhoto(null)}
        >
          <button
            className="absolute top-4 right-4 text-white hover:text-[#d9b45a] transition-colors"
            onClick={() => setSelectedPhoto(null)}
          >
            <X className="w-8 h-8" />
          </button>
          <div className="max-w-5xl max-h-[90vh] relative">
            <img
              src={selectedPhoto.url}
              alt={selectedPhoto.title || 'Réalisation'}
              className="max-w-full max-h-[90vh] object-contain rounded-lg"
            />
            {(selectedPhoto.title || selectedPhoto.city) && (
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-6 rounded-b-lg">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-white text-xl font-semibold mb-2">
                      {selectedPhoto.title || 'Réalisation'}
                    </h3>
                    {selectedPhoto.description && (
                      <p className="text-gray-300">{selectedPhoto.description}</p>
                    )}
                  </div>
                  {selectedPhoto.city && (
                    <div className="bg-gradient-to-r from-[#d9b45a] to-[#b8941a] text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg whitespace-nowrap">
                      {selectedPhoto.city}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default GalleryPage;
