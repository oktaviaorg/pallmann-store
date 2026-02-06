import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { Youtube, Play, Users, Eye, Clock, Home, ChevronRight } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface YouTubeVideo {
  id: string;
  title: string;
  description: string;
  video_id: string | null;
  thumbnail_url: string;
  duration: string;
  views: string;
  category: 'Tutoriels' | 'Avant/Après' | 'Conseils' | 'Coulisses';
  playlist_name: string | null;
  is_featured: boolean;
  order_index: number;
  published_at: string;
  video_type?: 'youtube' | 'local';
  storage_url?: string;
  video_url?: string;
  slug?: string;
  meta_title?: string;
  meta_description?: string;
  keywords?: string[];
}

const CHANNEL_URL = 'https://www.youtube.com/channel/UC93X6uiciFsRNw_Cr_YPY7g';
const CHANNEL_ID = 'UC93X6uiciFsRNw_Cr_YPY7g';

const categoryIcons: Record<string, string> = {
  'Tutoriels': '🛠️',
  'Avant/Après': '🎨',
  'Conseils': '💡',
  'Coulisses': '📹'
};

export default function YouTubePage() {
  const [videos, setVideos] = useState<YouTubeVideo[]>([]);
  const [featuredVideos, setFeaturedVideos] = useState<YouTubeVideo[]>([]);
  const [videosByCategory, setVideosByCategory] = useState<Record<string, YouTubeVideo[]>>({});
  const [playlists, setPlaylists] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      const { data, error } = await supabase
        .from('youtube_videos')
        .select('*')
        .order('order_index', { ascending: true });

      if (error) throw error;

      if (data) {
        setVideos(data);
        setFeaturedVideos(data.filter(v => v.is_featured).slice(0, 4));

        const grouped = data.reduce((acc, video) => {
          if (!acc[video.category]) {
            acc[video.category] = [];
          }
          acc[video.category].push(video);
          return acc;
        }, {} as Record<string, YouTubeVideo[]>);
        setVideosByCategory(grouped);

        const uniquePlaylists = [...new Set(data.filter(v => v.playlist_name).map(v => v.playlist_name))];
        setPlaylists(uniquePlaylists as string[]);
      }
    } catch (error) {
      console.error('Error fetching videos:', error);
    } finally {
      setLoading(false);
    }
  };

  const VideoCard = ({ video }: { video: YouTubeVideo }) => {
    const isLocalVideo = video.video_type === 'local';
    const videoUrl = isLocalVideo
      ? (video.storage_url || video.video_url)
      : `https://www.youtube.com/watch?v=${video.video_id}`;
    const thumbnailUrl = video.thumbnail_url ||
      (isLocalVideo
        ? 'https://mjuzyqhxifyvebtnlrra.supabase.co/storage/v1/object/public/lpr2/test%20parquet.jpg'
        : `https://img.youtube.com/vi/${video.video_id}/maxresdefault.jpg`);

    const [showPlayer, setShowPlayer] = useState(false);

    if (isLocalVideo && showPlayer) {
      return (
        <div className="bg-white rounded-lg overflow-hidden shadow-md">
          <div className="relative">
            <video
              controls
              className="w-full"
              poster={thumbnailUrl}
              preload="metadata"
            >
              <source src={videoUrl} type="video/mp4" />
              Votre navigateur ne supporte pas la lecture de vidéos.
            </video>
            <button
              onClick={() => setShowPlayer(false)}
              className="absolute top-2 right-2 bg-black bg-opacity-70 hover:bg-opacity-90 text-white p-2 rounded-full transition-all"
            >
              ✕
            </button>
          </div>
          <div className="p-4">
            <h3 className="font-semibold text-gray-900 mb-2">
              {video.title}
            </h3>
            {video.description && (
              <p className="text-sm text-gray-600 mb-3 line-clamp-3">
                {video.description}
              </p>
            )}
            <div className="flex items-center justify-between text-xs text-gray-500">
              {video.duration && (
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {video.duration}
                </span>
              )}
              <span className="bg-amber-100 text-amber-800 px-2 py-1 rounded-full">
                {categoryIcons[video.category]} {video.category}
              </span>
            </div>
          </div>
        </div>
      );
    }

    const CardWrapper = isLocalVideo ? 'button' : 'a';
    const cardProps = isLocalVideo
      ? {
          onClick: () => setShowPlayer(true),
          type: 'button' as const,
          className: "w-full text-left group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
        }
      : {
          href: videoUrl,
          target: '_blank' as const,
          rel: 'noopener noreferrer',
          className: "group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
        };

    return (
      <CardWrapper {...cardProps}>
        <div className="relative overflow-hidden">
          <img
            src={thumbnailUrl}
            alt={video.title}
            className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
            <div className="bg-red-600 rounded-full p-4 transform scale-0 group-hover:scale-100 transition-transform duration-300">
              <Play className="h-8 w-8 text-white fill-white" />
            </div>
          </div>
          {video.duration && (
            <div className="absolute bottom-2 right-2 bg-black bg-opacity-80 text-white text-xs px-2 py-1 rounded">
              {video.duration}
            </div>
          )}
          {isLocalVideo && (
            <div className="absolute top-2 left-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs px-3 py-1 rounded-full font-semibold shadow-lg">
              Exclusif
            </div>
          )}
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-amber-600 transition-colors">
            {video.title}
          </h3>
          {video.description && (
            <p className="text-sm text-gray-600 mb-3 line-clamp-2">
              {video.description}
            </p>
          )}
          <div className="flex items-center justify-between text-xs text-gray-500">
            {video.views && (
              <span className="flex items-center gap-1">
                <Eye className="h-3 w-3" />
                {video.views}
              </span>
            )}
            <span className="bg-amber-100 text-amber-800 px-2 py-1 rounded-full">
              {categoryIcons[video.category]} {video.category}
            </span>
          </div>
        </div>
      </CardWrapper>
    );
  };

  return (
    <>
      <Helmet>
        <title>Vidéos & Podcast Experts Parquet | Les Ponceurs Réunis | Formation Rénovation Parquet Alsace & Grand Est</title>
        <meta name="description" content="Découvrez nos vidéos exclusives et podcast expert sur la rénovation de parquet : techniques professionnelles de ponçage, vitrification, pose. Transformations spectaculaires avant/après, diagnostics, conseils d'entretien. 20+ ans d'expérience Strasbourg, Colmar, Mulhouse, Dijon, Belfort. Application WhatsApp pour devis instantané." />
        <meta property="og:title" content="Vidéos & Podcast Experts Parquet | Les Ponceurs Réunis | Rénovation Professionnelle" />
        <meta property="og:description" content="Vidéos exclusives et podcast expert sur la rénovation de parquet : techniques pro, transformations avant/après, diagnostics, valorisation immobilière. 20+ ans d'expérience Grand Est." />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://parquetsgauthier.fr/image.png" />
        <meta property="og:url" content="https://parquetsgauthier.fr/youtube" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Vidéos & Podcast Experts Parquet | Les Ponceurs Réunis" />
        <meta name="twitter:description" content="Vidéos exclusives et podcast expert sur la rénovation de parquet. Techniques professionnelles, transformations spectaculaires, conseils d'experts." />
        <link rel="canonical" href="https://parquetsgauthier.fr/youtube" />
        <meta name="keywords" content="vidéo rénovation parquet, podcast parquet, expert parqueteur, tutoriel ponçage parquet, vitrification parquet vidéo, transformation parquet avant après, diagnostic parquet, valorisation parquet, rénovation sol bois, parquet ancien restauration, techniques professionnelles parquet, les ponceurs réunis, parquet alsace grand est, formation parquet, conseils entretien parquet, application devis parquet whatsapp, parquet strasbourg colmar mulhouse dijon belfort" />

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Vidéos & Podcast Experts Parquet - Les Ponceurs Réunis",
            "description": "Vidéos exclusives et podcast expert sur la rénovation de parquet : techniques professionnelles, transformations spectaculaires, diagnostics et conseils d'entretien",
            "url": "https://parquetsgauthier.fr/youtube",
            "breadcrumb": {
              "@type": "BreadcrumbList",
              "itemListElement": [
                {
                  "@type": "ListItem",
                  "position": 1,
                  "name": "Accueil",
                  "item": "https://parquetsgauthier.fr"
                },
                {
                  "@type": "ListItem",
                  "position": 2,
                  "name": "Vidéos & Podcast",
                  "item": "https://parquetsgauthier.fr/youtube"
                }
              ]
            },
            "publisher": {
              "@type": "Organization",
              "name": "Les Ponceurs Réunis",
              "url": "https://parquetsgauthier.fr",
              "logo": {
                "@type": "ImageObject",
                "url": "https://parquetsgauthier.fr/image.png"
              }
            }
          })}
        </script>

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "VideoObject",
            "name": "Le Secret des Parquets",
            "description": "Découvrez les coulisses de notre métier et les secrets d'une rénovation de parquet réussie. Plus de 20 ans d'expérience condensés pour vous révéler les techniques qui font la différence.",
            "thumbnailUrl": "https://images.unsplash.com/photo-1615875474908-f403540c3f0f?w=800&h=450&fit=crop",
            "uploadDate": "2024-01-01",
            "contentUrl": "https://mjuzyqhxifyvebtnlrra.supabase.co/storage/v1/object/sign/video%20et%20reportage/Le_Secret_des_Parquets.mp4",
            "embedUrl": "https://parquetsgauthier.fr/youtube",
            "publisher": {
              "@type": "Organization",
              "name": "Les Ponceurs Réunis",
              "logo": {
                "@type": "ImageObject",
                "url": "https://parquetsgauthier.fr/image.png"
              }
            }
          })}
        </script>

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "VideoObject",
            "name": "La Rédemption d'un Sol Parquet",
            "description": "Assistez à la transformation spectaculaire d'un parquet abîmé en un sol magnifique. Une véritable renaissance qui illustre tout le potentiel d'une rénovation professionnelle.",
            "thumbnailUrl": "https://images.unsplash.com/photo-1581858726788-75bc0f1a4403?w=800&h=450&fit=crop",
            "uploadDate": "2024-01-01",
            "contentUrl": "https://mjuzyqhxifyvebtnlrra.supabase.co/storage/v1/object/sign/video%20et%20reportage/La_Redemption_d_un_Sol_parquet.mp4",
            "embedUrl": "https://parquetsgauthier.fr/youtube",
            "publisher": {
              "@type": "Organization",
              "name": "Les Ponceurs Réunis",
              "logo": {
                "@type": "ImageObject",
                "url": "https://parquetsgauthier.fr/image.png"
              }
            }
          })}
        </script>

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "VideoObject",
            "name": "L'Illusion du Parquet Pas Cher - Par Les Experts du Parquet",
            "description": "Découvrez pourquoi le parquet bon marché peut vous coûter beaucoup plus cher à long terme. Dans cette vidéo, nos experts vous expliquent les pièges du parquet pas cher, les différences de qualité entre les essences de bois, les finitions industrielles versus artisanales, et pourquoi investir dans un parquet de qualité et une pose professionnelle est plus rentable. Apprenez à éviter les erreurs coûteuses et à faire le bon choix pour votre sol en bois.",
            "thumbnailUrl": "https://mjuzyqhxifyvebtnlrra.supabase.co/storage/v1/object/public/video%20et%20reportage/illusion_du_parquet_pas_cher_epaisseur_compte_vraiment.png",
            "uploadDate": "2026-01-06",
            "contentUrl": "https://mjuzyqhxifyvebtnlrra.supabase.co/storage/v1/object/public/video%20et%20reportage/L_Illusion_du_Parquet_Pas_Cher_Par_Les_Experts_du_Parquet.mp4",
            "embedUrl": "https://parquetsgauthier.fr/youtube",
            "duration": "PT8M24S",
            "publisher": {
              "@type": "Organization",
              "name": "Les Ponceurs Réunis",
              "logo": {
                "@type": "ImageObject",
                "url": "https://parquetsgauthier.fr/image.png"
              }
            }
          })}
        </script>

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "PodcastEpisode",
            "name": "Le Parquet : du diagnostic à la plus-value",
            "description": "Plus de 20 ans d'expérience dans la rénovation de parquet condensés en un épisode captivant. Découvrez les techniques pour diagnostiquer, sauver et rénover des parquets anciens, maximiser la valorisation immobilière, et notre application WhatsApp pour devis instantanés.",
            "datePublished": "2024-01-01",
            "url": "https://parquetsgauthier.fr/youtube",
            "audio": {
              "@type": "AudioObject",
              "contentUrl": "https://mjuzyqhxifyvebtnlrra.supabase.co/storage/v1/object/sign/video%20et%20reportage/Le_parquet_diagnostic_a_la_plus-value.m4a",
              "encodingFormat": "audio/mp4"
            },
            "partOfSeries": {
              "@type": "PodcastSeries",
              "name": "Le Podcast des Experts Parqueteurs",
              "description": "Conseils professionnels sur la rénovation, le diagnostic et la valorisation du parquet"
            },
            "publisher": {
              "@type": "Organization",
              "name": "Les Ponceurs Réunis",
              "url": "https://parquetsgauthier.fr",
              "logo": {
                "@type": "ImageObject",
                "url": "https://parquetsgauthier.fr/image.png"
              }
            }
          })}
        </script>

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            "name": "Vidéos de rénovation de parquet",
            "description": "Collection de vidéos professionnelles sur la rénovation de parquet par Les Ponceurs Réunis",
            "numberOfItems": 3,
            "itemListElement": [
              {
                "@type": "VideoObject",
                "position": 1,
                "name": "L'Illusion du Parquet Pas Cher - Par Les Experts du Parquet",
                "url": "https://parquetsgauthier.fr/youtube"
              },
              {
                "@type": "VideoObject",
                "position": 2,
                "name": "Le Secret des Parquets",
                "url": "https://parquetsgauthier.fr/youtube"
              },
              {
                "@type": "VideoObject",
                "position": 3,
                "name": "La Rédemption d'un Sol Parquet",
                "url": "https://parquetsgauthier.fr/youtube"
              }
            ]
          })}
        </script>
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        {/* Breadcrumb Navigation */}
        <nav className="bg-white border-b border-gray-200 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <div className="flex items-center space-x-2 text-sm">
              <Link
                to="/"
                className="flex items-center text-gray-600 hover:text-amber-600 transition-colors"
              >
                <Home className="h-4 w-4 mr-1" />
                Accueil
              </Link>
              <ChevronRight className="h-4 w-4 text-gray-400" />
              <span className="flex items-center text-gray-900 font-medium">
                <Youtube className="h-4 w-4 mr-1 text-red-600" />
                Chaîne YouTube
              </span>
            </div>
          </div>
        </nav>
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white py-20 overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-20"></div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-red-600 to-red-700 rounded-full mb-6 shadow-2xl">
                <Youtube className="h-10 w-10 text-white" />
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-amber-200 to-amber-500">
                Vidéos & Podcast Experts en Rénovation de Parquet
              </h1>

              <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
                Techniques professionnelles de ponçage, vitrification et restauration de parquet. Transformations spectaculaires avant/après, diagnostics experts et conseils d'entretien. Plus de 20 ans d'expérience au service de vos sols en bois.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
                <div className="flex items-center gap-2 bg-white bg-opacity-10 backdrop-blur-sm px-6 py-3 rounded-full">
                  <Users className="h-5 w-5 text-amber-400" />
                  <span className="font-semibold">Abonnez-vous</span>
                </div>
                <div className="flex items-center gap-2 bg-white bg-opacity-10 backdrop-blur-sm px-6 py-3 rounded-full">
                  <Play className="h-5 w-5 text-amber-400" />
                  <span className="font-semibold">Nouvelles vidéos chaque semaine</span>
                </div>
              </div>

              <div className="flex flex-wrap justify-center gap-4">
                <a
                  href={CHANNEL_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 bg-gradient-to-r from-red-600 to-red-700 text-white px-8 py-4 rounded-full font-bold text-lg hover:from-red-700 hover:to-red-800 transition-all duration-300 shadow-2xl hover:shadow-red-500/50 transform hover:scale-105"
                >
                  <Youtube className="h-6 w-6" />
                  S'abonner à la chaîne
                </a>
                <a
                  href={`https://www.youtube.com/channel/${CHANNEL_ID}/videos`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 bg-white bg-opacity-10 backdrop-blur-sm text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-opacity-20 transition-all duration-300 border-2 border-white border-opacity-30"
                >
                  Voir toutes les vidéos
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Expert Videos Section */}
        <section className="bg-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center gap-3 mb-4">
                <div className="h-1 w-12 bg-gradient-to-r from-transparent to-amber-500 rounded"></div>
                <span className="text-amber-600 font-bold text-sm uppercase tracking-wider">Vidéos Exclusives</span>
                <div className="h-1 w-12 bg-gradient-to-l from-transparent to-amber-500 rounded"></div>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Les Secrets des Experts Parqueteurs
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Plongez dans l'univers de la rénovation de parquet avec nos vidéos exclusives. Découvrez les techniques professionnelles et les transformations spectaculaires réalisées par nos artisans.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              {/* Video 1: Le Secret des Parquets */}
              <div className="group">
                <div className="bg-gray-900 rounded-2xl shadow-2xl overflow-hidden mb-4 transform transition-all duration-300 hover:scale-105">
                  <video
                    controls
                    className="w-full"
                    poster="https://images.unsplash.com/photo-1615875474908-f403540c3f0f?w=800&h=450&fit=crop"
                  >
                    <source
                      src="https://mjuzyqhxifyvebtnlrra.supabase.co/storage/v1/object/sign/video%20et%20reportage/Le_Secret_des_Parquets.mp4?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9hZDYyZmJmOC1hZDg3LTRmOGUtOTUxZS0wZDgxMGQ2ZTQ1ZDUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ2aWRlbyBldCByZXBvcnRhZ2UvTGVfU2VjcmV0X2Rlc19QYXJxdWV0cy5tcDQiLCJpYXQiOjE3Njc2MzM3NzIsImV4cCI6MTkyNTMxMzc3Mn0.uiwllVL38JKU717PKXqe95duAvaqlayPHf2i7iIYcL0"
                      type="video/mp4"
                    />
                    Votre navigateur ne supporte pas la lecture de vidéos HTML5.
                  </video>
                </div>
                <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl p-6 shadow-lg">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <Play className="h-5 w-5 text-amber-600" />
                    Le Secret des Parquets
                  </h3>
                  <p className="text-gray-700 mb-4">
                    Découvrez les coulisses de notre métier et les secrets d'une rénovation de parquet réussie. Plus de 20 ans d'expérience condensés pour vous révéler les techniques qui font la différence.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs bg-white px-3 py-1 rounded-full text-gray-700 border border-amber-200">Techniques Pro</span>
                    <span className="text-xs bg-white px-3 py-1 rounded-full text-gray-700 border border-amber-200">Savoir-faire</span>
                    <span className="text-xs bg-white px-3 py-1 rounded-full text-gray-700 border border-amber-200">Rénovation</span>
                  </div>
                </div>
              </div>

              {/* Video 2: La Rédemption d'un Sol */}
              <div className="group">
                <div className="bg-gray-900 rounded-2xl shadow-2xl overflow-hidden mb-4 transform transition-all duration-300 hover:scale-105">
                  <video
                    controls
                    className="w-full"
                    poster="https://images.unsplash.com/photo-1581858726788-75bc0f1a4403?w=800&h=450&fit=crop"
                  >
                    <source
                      src="https://mjuzyqhxifyvebtnlrra.supabase.co/storage/v1/object/sign/video%20et%20reportage/La_Redemption_d_un_Sol_parquet.mp4?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9hZDYyZmJmOC1hZDg3LTRmOGUtOTUxZS0wZDgxMGQ2ZTQ1ZDUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ2aWRlbyBldCByZXBvcnRhZ2UvTGFfUmVkZW1wdGlvbl9kX3VuX1NvbF9wYXJxdWV0Lm1wNCIsImlhdCI6MTc2NzcwNjI2MSwiZXhwIjoxOTI1Mzg2MjYxfQ.Bs_llxV4yuSqR5OI8V5md8VmdIf1ivsCsIuhM8PjLhg"
                      type="video/mp4"
                    />
                    Votre navigateur ne supporte pas la lecture de vidéos HTML5.
                  </video>
                </div>
                <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl p-6 shadow-lg">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <Play className="h-5 w-5 text-amber-600" />
                    La Rédemption d'un Sol Parquet
                  </h3>
                  <p className="text-gray-700 mb-4">
                    Assistez à la transformation spectaculaire d'un parquet abîmé en un sol magnifique. Une véritable renaissance qui illustre tout le potentiel d'une rénovation professionnelle.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs bg-white px-3 py-1 rounded-full text-gray-700 border border-amber-200">Avant/Après</span>
                    <span className="text-xs bg-white px-3 py-1 rounded-full text-gray-700 border border-amber-200">Transformation</span>
                    <span className="text-xs bg-white px-3 py-1 rounded-full text-gray-700 border border-amber-200">Restauration</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="max-w-4xl mx-auto bg-gradient-to-br from-gray-50 to-white rounded-xl p-8 shadow-lg border border-gray-100">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-amber-500 to-amber-600 rounded-full flex items-center justify-center shadow-lg">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    L'expertise Les Ponceurs Réunis
                  </h3>
                  <p className="text-gray-700 mb-4">
                    Ces vidéos exclusives illustrent notre approche unique de la rénovation de parquet. Chaque projet est une opportunité de redonner vie à des sols qui méritent une seconde chance. Avec plus de 20 ans d'expérience, nous maîtrisons toutes les techniques pour sublimer vos parquets.
                  </p>
                  <div className="grid md:grid-cols-3 gap-4 mt-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                        <span className="text-2xl">🏆</span>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900">20+ ans</p>
                        <p className="text-xs text-gray-600">d'expérience</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                        <span className="text-2xl">✨</span>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900">Expertise</p>
                        <p className="text-xs text-gray-600">technique unique</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                        <span className="text-2xl">💎</span>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900">Qualité</p>
                        <p className="text-xs text-gray-600">professionnelle</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Podcast Section */}
        <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-black py-16 relative overflow-hidden">
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-20"></div>
          </div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center gap-3 mb-4">
                <div className="h-1 w-12 bg-gradient-to-r from-transparent to-amber-500 rounded"></div>
                <span className="text-amber-400 font-bold text-sm uppercase tracking-wider">Podcast Expert</span>
                <div className="h-1 w-12 bg-gradient-to-l from-transparent to-amber-500 rounded"></div>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Le Podcast des Experts Parqueteurs
              </h2>
              <p className="text-lg text-gray-300 max-w-3xl mx-auto">
                Écoutez nos experts parler de rénovation, diagnostic et valorisation du parquet. Des conseils précieux pour transformer vos sols.
              </p>
            </div>

            <div className="max-w-5xl mx-auto">
              <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border-4 border-amber-500">
                <div className="relative bg-gradient-to-br from-amber-500 via-amber-600 to-amber-700 p-8 text-white">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -mr-32 -mt-32"></div>
                  <div className="absolute bottom-0 left-0 w-48 h-48 bg-white opacity-5 rounded-full -ml-24 -mb-24"></div>

                  <div className="relative z-10">
                    <div className="flex items-start gap-6 mb-6">
                      <div className="flex-shrink-0 w-20 h-20 bg-white bg-opacity-20 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-2xl">
                        <Play className="h-10 w-10 text-white fill-white" />
                      </div>
                      <div className="flex-1">
                        <div className="inline-block bg-white bg-opacity-20 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold mb-3">
                          Épisode #1
                        </div>
                        <h3 className="text-2xl md:text-3xl font-bold mb-2">
                          Le Parquet : du diagnostic à la plus-value
                        </h3>
                        <p className="text-amber-100 text-lg">
                          Avec Les Ponceurs Réunis - Experts en rénovation
                        </p>
                      </div>
                    </div>

                    <audio
                      controls
                      className="w-full mt-6"
                      style={{
                        filter: 'invert(1) grayscale(1) contrast(0.9)',
                        borderRadius: '12px'
                      }}
                    >
                      <source
                        src="https://mjuzyqhxifyvebtnlrra.supabase.co/storage/v1/object/sign/video%20et%20reportage/Le_parquet_diagnostic_a_la_plus-value.m4a?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9hZDYyZmJmOC1hZDg3LTRmOGUtOTUxZS0wZDgxMGQ2ZTQ1ZDUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ2aWRlbyBldCByZXBvcnRhZ2UvTGVfcGFycXVldF9kaWFnbm9zdGljX2FfbGFfcGx1cy12YWx1ZS5tNGEiLCJpYXQiOjE3Njc3MDU5MTksImV4cCI6MTkyNTM4NTkxOX0.CSiB4LFMmlVT0daziU0XMOq2pZibobY_KjepvBrB11M"
                        type="audio/mp4"
                      />
                      Votre navigateur ne supporte pas la lecture audio HTML5.
                    </audio>
                  </div>
                </div>

                <div className="p-8 bg-gradient-to-br from-gray-50 to-white">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      <div>
                        <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2 text-lg">
                          <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                            <span className="text-xl">🎯</span>
                          </div>
                          Au programme
                        </h4>
                        <ul className="space-y-3 text-gray-700">
                          <li className="flex items-start gap-3 bg-white p-3 rounded-lg shadow-sm border border-gray-100">
                            <span className="flex-shrink-0 w-6 h-6 bg-amber-500 text-white rounded-full flex items-center justify-center text-xs font-bold mt-0.5">1</span>
                            <span>Diagnostic professionnel de l'état de votre parquet</span>
                          </li>
                          <li className="flex items-start gap-3 bg-white p-3 rounded-lg shadow-sm border border-gray-100">
                            <span className="flex-shrink-0 w-6 h-6 bg-amber-500 text-white rounded-full flex items-center justify-center text-xs font-bold mt-0.5">2</span>
                            <span>Critères qui impactent la valorisation de votre bien immobilier</span>
                          </li>
                          <li className="flex items-start gap-3 bg-white p-3 rounded-lg shadow-sm border border-gray-100">
                            <span className="flex-shrink-0 w-6 h-6 bg-amber-500 text-white rounded-full flex items-center justify-center text-xs font-bold mt-0.5">3</span>
                            <span>Techniques exclusives pour maximiser votre retour sur investissement</span>
                          </li>
                          <li className="flex items-start gap-3 bg-white p-3 rounded-lg shadow-sm border border-gray-100">
                            <span className="flex-shrink-0 w-6 h-6 bg-amber-500 text-white rounded-full flex items-center justify-center text-xs font-bold mt-0.5">4</span>
                            <span>Application WhatsApp pour devis en ligne et diagnostics instantanés</span>
                          </li>
                          <li className="flex items-start gap-3 bg-white p-3 rounded-lg shadow-sm border border-gray-100">
                            <span className="flex-shrink-0 w-6 h-6 bg-amber-500 text-white rounded-full flex items-center justify-center text-xs font-bold mt-0.5">5</span>
                            <span>Secrets pour sauver et entretenir vos parquets anciens</span>
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div>
                        <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2 text-lg">
                          <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                            <span className="text-xl">💡</span>
                          </div>
                          L'expertise partagée
                        </h4>
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                          <p className="text-gray-700 mb-6 leading-relaxed">
                            Plus de 20 ans d'expérience dans la rénovation de parquet, condensés en un épisode captivant. Découvrez les différentes techniques des Ponceurs Réunis pour sauver et rénover des anciens parquets, ainsi que notre application innovante développée sur WhatsApp pour les devis en ligne et diagnostics de vieux parquets.
                          </p>

                          <div className="grid grid-cols-2 gap-3 mb-6">
                            <div className="bg-amber-50 p-3 rounded-lg text-center">
                              <p className="text-2xl font-bold text-amber-600">20+</p>
                              <p className="text-xs text-gray-600">ans d'expérience</p>
                            </div>
                            <div className="bg-amber-50 p-3 rounded-lg text-center">
                              <p className="text-2xl font-bold text-amber-600">100%</p>
                              <p className="text-xs text-gray-600">techniques pro</p>
                            </div>
                          </div>

                          <div className="bg-gradient-to-br from-amber-50 to-amber-100 border-2 border-amber-200 rounded-lg p-4">
                            <p className="text-sm text-amber-900 font-semibold text-center">
                              Idéal pour propriétaires, investisseurs immobiliers et passionnés de rénovation
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 pt-8 border-t border-gray-200">
                    <div className="flex flex-wrap items-center justify-center gap-4">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Clock className="h-5 w-5 text-amber-600" />
                        <span className="text-sm font-medium">Durée idéale pour un café</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Users className="h-5 w-5 text-amber-600" />
                        <span className="text-sm font-medium">Conseils d'experts certifiés</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Play className="h-5 w-5 text-amber-600" />
                        <span className="text-sm font-medium">Accessible partout</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Videos Section */}
        {!loading && featuredVideos.length > 0 && (
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Vidéos à la une
              </h2>
              <p className="text-lg text-gray-600">
                Nos contenus les plus populaires et instructifs
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredVideos.map(video => (
                <VideoCard key={video.id} video={video} />
              ))}
            </div>
          </section>
        )}

        {/* Videos by Category */}
        {!loading && Object.keys(videosByCategory).length > 0 && (
          <section className="bg-white py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {Object.entries(videosByCategory).map(([category, categoryVideos]) => (
                <div key={category} className="mb-16 last:mb-0">
                  <div className="flex items-center gap-3 mb-8">
                    <span className="text-4xl">{categoryIcons[category]}</span>
                    <h2 className="text-3xl font-bold text-gray-900">{category}</h2>
                    <div className="h-1 flex-1 bg-gradient-to-r from-amber-500 to-transparent rounded"></div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {categoryVideos.slice(0, 6).map(video => (
                      <VideoCard key={video.id} video={video} />
                    ))}
                  </div>

                  {categoryVideos.length > 6 && (
                    <div className="text-center mt-8">
                      <a
                        href={CHANNEL_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-amber-600 hover:text-amber-700 font-semibold"
                      >
                        Voir plus de {category.toLowerCase()}
                        <Play className="h-4 w-4" />
                      </a>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Playlists Section */}
        {!loading && playlists.length > 0 && (
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Nos séries de vidéos
              </h2>
              <p className="text-lg text-gray-600">
                Des playlists complètes pour approfondir vos connaissances
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {playlists.map(playlist => {
                const playlistVideos = videos.filter(v => v.playlist_name === playlist);
                const firstVideo = playlistVideos[0];

                return firstVideo ? (
                  <a
                    key={playlist}
                    href={CHANNEL_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group bg-gradient-to-br from-amber-50 to-amber-100 rounded-lg p-6 shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
                  >
                    <div className="flex items-start gap-4 mb-4">
                      <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-amber-500 to-amber-600 rounded-lg flex items-center justify-center shadow-lg">
                        <Play className="h-8 w-8 text-white fill-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-900 mb-2 group-hover:text-amber-600 transition-colors">
                          {playlist}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {playlistVideos.length} vidéo{playlistVideos.length > 1 ? 's' : ''}
                        </p>
                      </div>
                    </div>
                    <div className="aspect-video rounded-lg overflow-hidden">
                      <img
                        src={firstVideo.thumbnail_url || `https://img.youtube.com/vi/${firstVideo.video_id}/maxresdefault.jpg`}
                        alt={playlist}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        loading="lazy"
                      />
                    </div>
                  </a>
                ) : null;
              })}
            </div>
          </section>
        )}

        {/* Empty State */}
        {!loading && videos.length === 0 && (
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center bg-white rounded-lg shadow-lg p-12">
              <Youtube className="h-20 w-20 text-gray-300 mx-auto mb-6" />
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Nos vidéos arrivent bientôt !
              </h2>
              <p className="text-gray-600 mb-8">
                Nous préparons du contenu exclusif pour vous. En attendant, abonnez-vous pour ne rien manquer.
              </p>
              <a
                href={CHANNEL_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-gradient-to-r from-red-600 to-red-700 text-white px-8 py-4 rounded-full font-bold text-lg hover:from-red-700 hover:to-red-800 transition-all duration-300 shadow-xl"
              >
                <Youtube className="h-6 w-6" />
                Visiter notre chaîne
              </a>
            </div>
          </section>
        )}

        {/* Loading State */}
        {loading && (
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white rounded-lg overflow-hidden shadow-md animate-pulse">
                  <div className="w-full h-48 bg-gray-200"></div>
                  <div className="p-4">
                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* SEO Content Section */}
        <section className="bg-white py-16 border-t border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="prose prose-lg max-w-none">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Formation et Expertise en Rénovation de Parquet : Vidéos & Podcast Professionnels
                </h2>

                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl p-6 border border-amber-200">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">
                      Pourquoi choisir nos vidéos de formation ?
                    </h3>
                    <p className="text-gray-700 mb-4">
                      Nos vidéos exclusives de rénovation de parquet vous offrent un accès privilégié aux techniques professionnelles développées au fil de plus de 20 ans d'expérience. Chaque vidéo est conçue pour vous transmettre des savoir-faire concrets en ponçage, vitrification, pose et restauration de parquet.
                    </p>
                    <p className="text-gray-700">
                      Que vous soyez propriétaire, investisseur immobilier, artisan ou passionné de rénovation, nos contenus vidéo vous guident pas à pas dans vos projets de rénovation de sols en bois.
                    </p>
                  </div>

                  <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 border border-gray-200">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">
                      Notre podcast expert parqueteur
                    </h3>
                    <p className="text-gray-700 mb-4">
                      Le podcast "Le Parquet : du diagnostic à la plus-value" est une ressource incontournable pour comprendre comment diagnostiquer l'état d'un parquet ancien, évaluer les critères de valorisation immobilière et maximiser votre retour sur investissement.
                    </p>
                    <p className="text-gray-700">
                      Découvrez notre application innovante WhatsApp pour obtenir des devis en ligne et des diagnostics instantanés de vos parquets, où que vous soyez en Alsace et dans le Grand Est.
                    </p>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-gray-50 to-white rounded-xl p-8 border border-gray-200 mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">
                    Nos domaines d'expertise en vidéo
                  </h3>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div>
                      <h4 className="font-bold text-amber-600 mb-3 flex items-center gap-2">
                        <span className="text-2xl">🎥</span>
                        Techniques de Ponçage
                      </h4>
                      <ul className="space-y-2 text-gray-700 text-sm">
                        <li>Ponçage parquet ancien massif</li>
                        <li>Rénovation parquet stratifié</li>
                        <li>Ponçage parquet contrecollé</li>
                        <li>Traitement rayures et impacts</li>
                        <li>Techniques de finition professionnelle</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-bold text-amber-600 mb-3 flex items-center gap-2">
                        <span className="text-2xl">✨</span>
                        Vitrification & Finitions
                      </h4>
                      <ul className="space-y-2 text-gray-700 text-sm">
                        <li>Application vernis professionnel</li>
                        <li>Vitrification sans poussière</li>
                        <li>Huiles et cires naturelles</li>
                        <li>Teintes et patines personnalisées</li>
                        <li>Protection anti-grincement</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-bold text-amber-600 mb-3 flex items-center gap-2">
                        <span className="text-2xl">🔧</span>
                        Restauration & Réparation
                      </h4>
                      <ul className="space-y-2 text-gray-700 text-sm">
                        <li>Diagnostic état parquet</li>
                        <li>Réparation lames abîmées</li>
                        <li>Traitement dégâts des eaux</li>
                        <li>Restauration parquet ancien</li>
                        <li>Valorisation immobilière</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl p-8 text-white mb-8">
                  <h3 className="text-2xl font-bold mb-4">
                    Couverture géographique : Alsace & Grand Est
                  </h3>
                  <p className="text-amber-50 mb-4">
                    Nos vidéos et podcasts vous accompagnent sur tous vos projets de rénovation de parquet dans le Grand Est, avec une expertise reconnue dans les villes suivantes :
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <p className="font-semibold mb-2">Bas-Rhin (67)</p>
                      <p className="text-sm text-amber-50">
                        Strasbourg, Haguenau, Schiltigheim, Illkirch-Graffenstaden, Sélestat, Saverne, Obernai, Bischwiller
                      </p>
                    </div>
                    <div>
                      <p className="font-semibold mb-2">Haut-Rhin (68)</p>
                      <p className="text-sm text-amber-50">
                        Mulhouse, Colmar, Saint-Louis, Wittenheim, Illzach, Riedisheim, Kingersheim, Rixheim
                      </p>
                    </div>
                    <div>
                      <p className="font-semibold mb-2">Territoire de Belfort (90)</p>
                      <p className="text-sm text-amber-50">
                        Belfort, Delle, Valdoie, Beaucourt, Danjoutin, Bavilliers
                      </p>
                    </div>
                    <div>
                      <p className="font-semibold mb-2">Côte-d'Or (21)</p>
                      <p className="text-sm text-amber-50">
                        Dijon, Beaune, Chenôve, Talant, Quétigny, Chevigny-Saint-Sauveur, Longvic
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    Apprenez avec les meilleurs artisans parqueteurs
                  </h3>
                  <p className="text-gray-700 mb-4">
                    <strong>Les Ponceurs Réunis</strong> est une entreprise familiale spécialisée dans la rénovation de parquet depuis plus de deux décennies. Notre mission est de transmettre notre savoir-faire à travers des contenus vidéo et audio de haute qualité, accessibles à tous.
                  </p>
                  <p className="text-gray-700 mb-4">
                    Nos vidéos couvrent l'ensemble du processus de rénovation : du diagnostic initial à la finition finale, en passant par le ponçage, le traitement des problèmes spécifiques (rayures, taches, grincements, dégâts des eaux) et l'application des finitions (vernis, huiles, cires).
                  </p>
                  <p className="text-gray-700">
                    Notre podcast expert aborde également les aspects business de la rénovation de parquet : valorisation immobilière, retour sur investissement, critères de choix pour les propriétaires et investisseurs, et présentation de nos outils innovants comme l'application WhatsApp pour devis et diagnostics à distance.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="bg-gradient-to-r from-gray-900 via-black to-gray-900 text-white py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Youtube className="h-16 w-16 text-red-500 mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ne manquez aucune de nos vidéos
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Abonnez-vous à notre chaîne et activez les notifications pour être averti de chaque nouvelle publication
            </p>

            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <a
                href={CHANNEL_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-gradient-to-r from-red-600 to-red-700 text-white px-8 py-4 rounded-full font-bold text-lg hover:from-red-700 hover:to-red-800 transition-all duration-300 shadow-2xl hover:shadow-red-500/50 transform hover:scale-105"
              >
                <Youtube className="h-6 w-6" />
                S'abonner maintenant
              </a>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-400">
              <span className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Nouvelles vidéos chaque semaine
              </span>
              <span className="flex items-center gap-2">
                <Play className="h-4 w-4" />
                Tutoriels détaillés
              </span>
              <span className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                Rejoignez notre communauté
              </span>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
