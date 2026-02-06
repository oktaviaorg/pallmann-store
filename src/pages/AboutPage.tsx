import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import {
  Users,
  Award,
  Target,
  Heart,
  CheckCircle,
  Phone,
  Globe,
  MapPin,
  Sparkles,
  Shield,
  Hammer
} from 'lucide-react';

const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#fafaf8] to-white">
      <Helmet>
        <title>À Propos des Ponceurs Réunis | Notre Histoire & Savoir-Faire</title>
        <meta
          name="description"
          content="Découvrez l'histoire des Ponceurs Réunis : entreprise artisanale familiale basée à Herrlisheim-près-Colmar. Équipe d'artisans passionnés spécialisés dans la rénovation de parquet depuis 2004. Savoir-faire d'excellence dans tout le Grand Est."
        />
        <meta
          name="keywords"
          content="Ponceurs Réunis, artisan parquet, rénovation parquet Grand Est, savoir-faire parquet, expertise parquet, formation parquet"
        />
        <link rel="canonical" href="https://ponceur-parquet.fr/about" />
        <meta name="robots" content="index, follow" />

        <meta property="og:title" content="À Propos des Ponceurs Réunis | Notre Histoire" />
        <meta property="og:description" content="Entreprise artisanale familiale d'artisans passionnés, basée à Herrlisheim-près-Colmar, dédiée à la rénovation de parquet dans tout le Grand Est depuis 2004." />
        <meta property="og:url" content="https://ponceur-parquet.fr/about" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://mjuzyqhxifyvebtnlrra.supabase.co/storage/v1/object/public/lpr2/lesponceursreunis.jpg" />
        <meta property="og:locale" content="fr_FR" />

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "AboutPage",
            "name": "À Propos des Ponceurs Réunis",
            "description": "Découvrez l'histoire et les valeurs des Ponceurs Réunis, entreprise artisanale familiale experte en rénovation de parquet dans le Grand Est.",
            "url": "https://ponceur-parquet.fr/about",
            "mainEntity": {
              "@type": "LocalBusiness",
              "name": "Les Ponceurs Réunis",
              "alternateName": "Ponceur Parquet Alsace",
              "url": "https://ponceur-parquet.fr",
              "logo": "https://mjuzyqhxifyvebtnlrra.supabase.co/storage/v1/object/public/lpr2/favicone%20ponceur.png",
              "image": "https://mjuzyqhxifyvebtnlrra.supabase.co/storage/v1/object/public/lpr2/lesponceursreunis.jpg",
              "description": "Entreprise artisanale familiale spécialisée dans la rénovation et la pose de parquet depuis 2004 dans le Grand Est. Équipe d'artisans passionnés basée à Herrlisheim-près-Colmar.",
              "slogan": "L'Artisan du Parquet, à Votre Service Depuis Plus de 20 Ans",
              "telephone": "+33757821306",
              "email": "contact@poncages.fr",
              "foundingDate": "2004",
              "founder": {
                "@type": "Person",
                "name": "Fondateur Les Ponceurs Réunis"
              },
              "numberOfEmployees": {
                "@type": "QuantitativeValue",
                "value": 8
              },
              "priceRange": "€€",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "6 rue du Commerce",
                "addressLocality": "Herrlisheim-près-Colmar",
                "postalCode": "68420",
                "addressRegion": "Alsace",
                "addressCountry": "FR"
              },
              "areaServed": [
                {
                  "@type": "Place",
                  "name": "Alsace"
                },
                {
                  "@type": "Place",
                  "name": "Grand Est"
                },
                {
                  "@type": "Place",
                  "name": "Territoire de Belfort"
                },
                {
                  "@type": "Place",
                  "name": "Moselle"
                },
                {
                  "@type": "Place",
                  "name": "Bas-Rhin"
                },
                {
                  "@type": "Place",
                  "name": "Haut-Rhin"
                }
              ],
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.9",
                "reviewCount": "150",
                "bestRating": "5"
              },
              "knowsAbout": [
                "Ponçage de parquet",
                "Vitrification de parquet",
                "Rénovation de parquet",
                "Pose de parquet",
                "Formation parquet",
                "Artisanat du bois",
                "Rénovation traditionnelle"
              ],
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Services artisanaux de parquet",
                "itemListElement": [
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Ponçage et vitrification de parquet"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Rénovation de parquet ancien"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Pose de parquet massif"
                    }
                  }
                ]
              }
            }
          })}
        </script>
      </Helmet>

      <Header />

      <main className="flex-grow">
        <section className="relative isolate overflow-hidden pt-24 pb-16 md:pt-32 bg-gradient-to-br from-[#0f1b2b] via-[#1a2b3d] to-[#0f1b2b]">
          <div className="absolute inset-0 -z-10 opacity-10" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d9b45a' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }} />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#d9b45a]/20 border border-[#d9b45a]/30 rounded-full mb-6">
                <Heart className="w-4 h-4 text-[#d9b45a]" />
                <span className="text-sm font-medium text-[#d9b45a]">Notre Histoire</span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-white">
                À Propos des
                <span className="block text-[#d9b45a] mt-2">Ponceurs Réunis</span>
              </h1>

              <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                L'Artisanat du Parquet, une Passion Collective
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                  Un Savoir-Faire Rare à Préserver
                </h2>
                <div className="prose prose-lg text-gray-600 space-y-4">
                  <p>
                    Chez Les Ponceurs Réunis, nous ne nous contentons pas de rénover des parquets. Nous perpétuons un savoir-faire rare, celui des artisans qui, depuis des décennies, redonnent vie au bois avec exigence et passion.
                  </p>
                  <p>
                    <strong>Fondée en 2004</strong>, notre entreprise familiale est née de la volonté d'artisans passionnés de préserver un savoir-faire rare. Basés à Herrlisheim-près-Colmar, nous avons formé une équipe soudée de spécialistes dédiés à sauvegarder et transmettre un métier en voie de disparition : celui de la rénovation et de la finition des parquets, où chaque détail compte et chaque essence de bois mérite une attention sur mesure.
                  </p>
                </div>
              </div>

              <div className="relative">
                <div className="absolute -top-4 -left-4 w-full h-full bg-gradient-to-br from-[#d9b45a]/20 to-transparent rounded-2xl blur-2xl"></div>
                <img
                  src="https://mjuzyqhxifyvebtnlrra.supabase.co/storage/v1/object/public/lpr2/lesponceursreunis.jpg"
                  alt="Les artisans des Ponceurs Réunis dans leur atelier à Herrlisheim-près-Colmar - Entreprise familiale alsacienne de rénovation de parquet"
                    width="800"
                    height="600"
                    className="relative rounded-2xl shadow-2xl border-2 border-gray-200 w-full h-auto"
                  loading="eager"
                />
              </div>
            </div>

            <div className="bg-gradient-to-br from-[#eee9df] to-white rounded-2xl p-8 md:p-12 shadow-xl border-2 border-gray-200 mb-16">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-[#d9b45a] to-[#b8941a] rounded-xl flex items-center justify-center flex-shrink-0">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Un Métier d'Excellence, Entre Tradition et Innovation</h3>
                  <p className="text-gray-600">
                    Le ponçage, la vitrification et la restauration des parquets ne s'improvisent pas. C'est un art exigeant, où la précision et la patience sont essentielles. Les outils modernes ont remplacé les méthodes traditionnelles, mais l'expertise, elle, reste indispensable.
                  </p>
                </div>
              </div>
              <p className="text-gray-600">
                Pourtant, ce savoir-faire se raréfie. Les artisans qualifiés se font rares, et les équipes capables de travailler sur des parquets anciens ou massifs sont de plus en plus difficiles à trouver. Face à ce constat, nous avons décidé d'agir en créant une synergie entre professionnels du bois et de la rénovation.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 bg-gradient-to-b from-white to-[#fafaf8]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Une Équipe Polyvalente pour Redonner Vie au Bois
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Notre équipe réunit des artisans complémentaires, formés ensemble aux meilleures techniques
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-gray-100 hover:border-[#d9b45a] transition-all hover:-translate-y-1">
                <div className="w-14 h-14 bg-gradient-to-br from-[#d9b45a] to-[#b8941a] rounded-xl flex items-center justify-center mb-6">
                  <Users className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Spécialistes de la Rénovation</h3>
                <p className="text-gray-600">
                  Des experts de la rénovation de l'habitat, habitués aux chantiers complexes et aux exigences techniques.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-gray-100 hover:border-[#d9b45a] transition-all hover:-translate-y-1">
                <div className="w-14 h-14 bg-gradient-to-br from-[#d9b45a] to-[#b8941a] rounded-xl flex items-center justify-center mb-6">
                  <Hammer className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Artisans du Bois</h3>
                <p className="text-gray-600">
                  Maîtrisant les techniques de pose, de restauration et de finition pour tous types de parquets.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-gray-100 hover:border-[#d9b45a] transition-all hover:-translate-y-1">
                <div className="w-14 h-14 bg-gradient-to-br from-[#d9b45a] to-[#b8941a] rounded-xl flex items-center justify-center mb-6">
                  <Target className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Expertise Technique & Formation</h3>
                <p className="text-gray-600">
                  Formation continue avec les leaders mondiaux des solutions pour parquets, garantissant une expertise à jour.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 md:p-12 shadow-xl border-2 border-gray-200">
              <p className="text-lg text-gray-600 text-center">
                Ensemble, nous avons identifié un besoin crucial : <span className="font-bold text-gray-900">former des équipes polyvalentes</span>, capables de maîtriser toutes les étapes de la rénovation de parquet, de la préparation du support à la finition haut de gamme.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 bg-[#fafaf8]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#d9b45a]/20 border border-[#d9b45a]/30 rounded-full mb-6">
                <Shield className="w-4 h-4 text-[#d9b45a]" />
                <span className="text-sm font-medium text-[#d9b45a]">Formation & Excellence</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Une Formation Exigeante pour des Résultats Parfaits
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Pour garantir une qualité irréprochable, nous avons noué un partenariat avec l'un des leaders mondiaux des solutions pour parquets
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-gray-100">
                <div className="flex items-center gap-3 mb-3">
                  <CheckCircle className="w-6 h-6 text-[#d9b45a] flex-shrink-0" />
                  <h3 className="font-bold text-gray-900">Vitrification haute résistance</h3>
                </div>
                <p className="text-gray-600 text-sm">Pour des sols durables et esthétiques</p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-gray-100">
                <div className="flex items-center gap-3 mb-3">
                  <CheckCircle className="w-6 h-6 text-[#d9b45a] flex-shrink-0" />
                  <h3 className="font-bold text-gray-900">Traitement aux huiles</h3>
                </div>
                <p className="text-gray-600 text-sm">Naturelles et modernes pour un rendu authentique</p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-gray-100">
                <div className="flex items-center gap-3 mb-3">
                  <CheckCircle className="w-6 h-6 text-[#d9b45a] flex-shrink-0" />
                  <h3 className="font-bold text-gray-900">Méthodes adaptées</h3>
                </div>
                <p className="text-gray-600 text-sm">À chaque essence : chêne, pitchpin, bois exotiques</p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-[#0f1b2b] to-[#1a2b3d] rounded-2xl p-8 md:p-12 shadow-2xl text-center">
              <Sparkles className="w-12 h-12 text-[#d9b45a] mx-auto mb-4" />
              <p className="text-xl text-white leading-relaxed">
                Cette expertise nous permet aujourd'hui de garantir des résultats exceptionnels, que ce soit pour restaurer un parquet ancien ou protéger un sol neuf avec des finitions sur mesure.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#d9b45a]/20 border border-[#d9b45a]/30 rounded-full mb-6">
                <Users className="w-4 h-4 text-[#d9b45a]" />
                <span className="text-sm font-medium text-[#d9b45a]">Notre Équipe</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Les Visages Derrière Vos Parquets
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                Une équipe de 8 artisans permanents, passionnés par leur métier et formés aux meilleures techniques
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-16">
              <div className="bg-gradient-to-br from-[#eee9df] to-white rounded-2xl p-8 shadow-xl border-2 border-gray-200 hover:shadow-2xl transition-all">
                <div className="w-24 h-24 bg-gradient-to-br from-[#d9b45a] to-[#b8941a] rounded-full mx-auto mb-6 flex items-center justify-center text-4xl font-bold text-white">
                  JG
                </div>
                <h3 className="text-xl font-bold text-gray-900 text-center mb-2">Jean Gauthier</h3>
                <p className="text-[#d9b45a] text-center font-semibold mb-4">Fondateur & Maître Artisan</p>
                <p className="text-gray-600 text-sm text-center leading-relaxed">
                  Plus de 25 ans d'expérience dans la rénovation de parquet. Jean supervise personnellement chaque projet
                  et garantit la qualité de nos interventions. Formé aux techniques traditionnelles et modernes.
                </p>
              </div>

              <div className="bg-gradient-to-br from-[#eee9df] to-white rounded-2xl p-8 shadow-xl border-2 border-gray-200 hover:shadow-2xl transition-all">
                <div className="w-24 h-24 bg-gradient-to-br from-[#d9b45a] to-[#b8941a] rounded-full mx-auto mb-6 flex items-center justify-center text-4xl font-bold text-white">
                  MB
                </div>
                <h3 className="text-xl font-bold text-gray-900 text-center mb-2">Marc Bernard</h3>
                <p className="text-[#d9b45a] text-center font-semibold mb-4">Artisan Parqueteur Senior</p>
                <p className="text-gray-600 text-sm text-center leading-relaxed">
                  Spécialiste des parquets anciens et des essences rares. Marc excelle dans la restauration
                  des parquets patrimoniaux et les finitions à l'ancienne. 18 ans d'expérience.
                </p>
              </div>

              <div className="bg-gradient-to-br from-[#eee9df] to-white rounded-2xl p-8 shadow-xl border-2 border-gray-200 hover:shadow-2xl transition-all">
                <div className="w-24 h-24 bg-gradient-to-br from-[#d9b45a] to-[#b8941a] rounded-full mx-auto mb-6 flex items-center justify-center text-4xl font-bold text-white">
                  TL
                </div>
                <h3 className="text-xl font-bold text-gray-900 text-center mb-2">Thomas Legrand</h3>
                <p className="text-[#d9b45a] text-center font-semibold mb-4">Artisan Spécialiste Pose</p>
                <p className="text-gray-600 text-sm text-center leading-relaxed">
                  Expert en pose de parquet massif, contrecollé et stratifié. Thomas maîtrise toutes les techniques
                  de pose (clouée, collée, flottante). Formé aux dernières innovations du secteur.
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-[#0f1b2b] to-[#1a2b3d] rounded-2xl p-8 md:p-12 text-center shadow-2xl">
              <CheckCircle className="w-12 h-12 text-[#d9b45a] mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-white mb-4">
                Notre Engagement : Zéro Sous-Traitance
              </h3>
              <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed mb-6">
                Tous vos travaux sont réalisés par nos artisans permanents. Vous avez un interlocuteur unique
                du devis à la livraison. Pas de surprise, pas de sous-traitant inconnu sur votre chantier.
              </p>
              <div className="inline-flex items-center gap-2 px-6 py-3 bg-[#d9b45a] text-[#0f1b2b] rounded-xl font-bold">
                <MapPin className="w-5 h-5" />
                <span>Basés à Herrlisheim-près-Colmar depuis 2004</span>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-gradient-to-b from-white to-[#fafaf8]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Une Entreprise Locale, Une Équipe Engagée
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                Pas de sous-traitance, que nos propres artisans. Notre équipe à taille humaine partage les mêmes valeurs : rigueur, passion et transmission du savoir-faire. Chaque projet bénéficie d'un suivi personnalisé de bout en bout.
              </p>
            </div>

            <div className="bg-gradient-to-br from-[#eee9df] to-white rounded-2xl p-8 md:p-12 shadow-xl border-2 border-gray-200 mb-12">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-[#d9b45a] to-[#b8941a] rounded-xl flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Présent sur Tout le Grand Est</h3>
                  <p className="text-gray-600 mb-4">Aujourd'hui, nous sommes présents sur :</p>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                <div className="flex items-center gap-3 p-4 bg-white rounded-lg border border-gray-200">
                  <CheckCircle className="w-5 h-5 text-[#d9b45a] flex-shrink-0" />
                  <span className="font-semibold text-gray-900">Toute l'Alsace</span>
                </div>
                <div className="flex items-center gap-3 p-4 bg-white rounded-lg border border-gray-200">
                  <CheckCircle className="w-5 h-5 text-[#d9b45a] flex-shrink-0" />
                  <span className="font-semibold text-gray-900">Strasbourg</span>
                </div>
                <div className="flex items-center gap-3 p-4 bg-white rounded-lg border border-gray-200">
                  <CheckCircle className="w-5 h-5 text-[#d9b45a] flex-shrink-0" />
                  <span className="font-semibold text-gray-900">Colmar</span>
                </div>
                <div className="flex items-center gap-3 p-4 bg-white rounded-lg border border-gray-200">
                  <CheckCircle className="w-5 h-5 text-[#d9b45a] flex-shrink-0" />
                  <span className="font-semibold text-gray-900">Mulhouse</span>
                </div>
                <div className="flex items-center gap-3 p-4 bg-white rounded-lg border border-gray-200">
                  <CheckCircle className="w-5 h-5 text-[#d9b45a] flex-shrink-0" />
                  <span className="font-semibold text-gray-900">Territoire de Belfort</span>
                </div>
                <div className="flex items-center gap-3 p-4 bg-white rounded-lg border border-gray-200">
                  <CheckCircle className="w-5 h-5 text-[#d9b45a] flex-shrink-0" />
                  <span className="font-semibold text-gray-900">Moselle</span>
                </div>
              </div>

              <p className="text-gray-600 mt-6 text-center">
                Et pour répondre à des projets d'envergure, nous intervenons également sur d'autres régions, en fonction des besoins.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 bg-gradient-to-br from-[#0f1b2b] via-[#1a2b3d] to-[#0f1b2b] text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Notre Mission : Sublimer Votre Parquet, Préserver Son Âme
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Chez Les Ponceurs Réunis, nous sommes convaincus que :
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border-2 border-white/20">
                <CheckCircle className="w-8 h-8 text-[#d9b45a] mb-4" />
                <p className="text-lg">Un parquet bien entretenu est un investissement pour la vie.</p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border-2 border-white/20">
                <CheckCircle className="w-8 h-8 text-[#d9b45a] mb-4" />
                <p className="text-lg">La rénovation doit allier tradition et innovation.</p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border-2 border-white/20">
                <CheckCircle className="w-8 h-8 text-[#d9b45a] mb-4" />
                <p className="text-lg">Chaque client mérite un accompagnement personnalisé, du diagnostic photo gratuit à la finition parfaite.</p>
              </div>
            </div>

            <div className="text-center">
              <p className="text-2xl font-bold text-[#d9b45a] mb-8">
                Que vous soyez un particulier souhaitant redonner éclat à votre sol ou un professionnel en quête d'un partenaire expert, nous mettons notre passion et notre expertise à votre service.
              </p>

              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border-2 border-[#d9b45a]/30 max-w-2xl mx-auto mb-8">
                <p className="text-2xl font-bold mb-6">Votre parquet mérite le meilleur. Faisons-le rayonner ensemble.</p>

                <div className="space-y-4">
                  <a
                    href="tel:+33757821306"
                    className="flex items-center justify-center gap-3 text-xl font-bold text-white hover:text-[#d9b45a] transition-colors"
                  >
                    <Phone className="w-6 h-6" />
                    07 57 82 13 06
                  </a>

                  <div className="flex items-center justify-center gap-4 text-gray-300">
                    <a
                      href="https://ponceur-parquet.fr"
                      className="flex items-center gap-2 hover:text-[#d9b45a] transition-colors"
                    >
                      <Globe className="w-5 h-5" />
                      ponceur-parquet.fr
                    </a>
                    <span>|</span>
                    <a
                      href="https://poncages.fr"
                      className="flex items-center gap-2 hover:text-[#d9b45a] transition-colors"
                    >
                      <Globe className="w-5 h-5" />
                      poncages.fr
                    </a>
                  </div>
                </div>
              </div>

              <p className="text-xl italic text-gray-300">
                "Parce qu'un parquet, c'est bien plus qu'un sol… C'est une histoire qui se perpétue."
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 bg-gradient-to-b from-white to-[#fafaf8]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
              Prêt à confier votre parquet à des experts passionnés ?
            </h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/services"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-[#d9b45a] to-[#b8941a] text-[#0f1b2b] rounded-xl font-bold shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 text-lg"
              >
                Découvrir nos services
              </Link>
              <a
                href="tel:+33757821306"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#0f1b2b] text-white rounded-xl font-bold shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 text-lg"
              >
                <Phone className="w-5 h-5" />
                Nous contacter
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default AboutPage;
