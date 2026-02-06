import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import LocalGallery from '../components/LocalGallery';
import LocalFAQ from '../components/LocalFAQ';
import {
  CheckCircle,
  Award,
  Clock,
  MapPin,
  Phone,
  Mail,
  Star,
  Shield,
  Users,
  TrendingUp,
  Home,
  Building2,
  Sparkles,
  ArrowRight,
  MessageSquare
} from 'lucide-react';

const LandingBelfort: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    surface: '',
    service: 'poncage-vitrification',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const belfortQuarters = [
    'Centre-ville', 'Les Glacis', 'Les Barres', 'Résidences', 'La Pépinière',
    'Arsenal', 'Faubourg des Ancêtres', 'La Miotte', 'Les Forges', 'Bellevue'
  ];

  const nearbyTowns = [
    'Danjoutin', 'Valdoie', 'Essert', 'Chèvremont', 'Vétrigne',
    'Bavilliers', 'Offemont', 'Andelnans', 'Cravanche', 'Sevenans'
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#fafaf8] to-white">
      <Helmet>
        <title>Rénovation Parquet Belfort (90) | Les Ponceurs Réunis | Devis 24h</title>
        <meta
          name="description"
          content="⭐ Les Ponceurs Réunis : Expert rénovation parquet à Belfort 90 - ponçage, vitrification, pose, réparation. Intervention dans tous les quartiers. Devis gratuit sous 24h ☎️ 07 57 82 13 06."
        />
        <meta
          name="keywords"
          content="pose parquet Belfort, rénovation parquet Belfort, ponçage parquet Belfort, vitrification parquet Belfort, artisan parquet Belfort 90, parqueteur Belfort, ponçage sans poussière Belfort, pose parquet massif Belfort, Les Ponceurs Réunis"
        />
        <link rel="canonical" href="https://ponceur-parquet.fr/renovation-parquet-belfort" />
        <meta name="robots" content="index, follow" />

        <meta property="og:title" content="Rénovation Parquet Belfort (90) | Les Ponceurs Réunis | Devis 24h" />
        <meta property="og:description" content="Les Ponceurs Réunis : Expert en rénovation de parquet à Belfort. Ponçage, vitrification, pose. Intervention rapide dans tous les quartiers." />
        <meta property="og:url" content="https://ponceur-parquet.fr/renovation-parquet-belfort" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://mjuzyqhxifyvebtnlrra.supabase.co/storage/v1/object/public/photos-lpr/IMG_0536.jpg" />
        <meta property="og:locale" content="fr_FR" />

        <meta name="geo.region" content="FR-90" />
        <meta name="geo.placename" content="Belfort" />
        <meta name="geo.position" content="47.6380;6.8630" />
        <meta name="ICBM" content="47.6380, 6.8630" />

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "Les Ponceurs Réunis - Pose & Rénovation Parquet Belfort",
            "description": "Expert en pose et rénovation de parquet à Belfort : ponçage, vitrification, pose de parquet massif et contrecollé, réparation. Artisan de confiance avec 15 ans d'expérience. Intervention dans tous les quartiers de Belfort et environs.",
            "url": "https://ponceur-parquet.fr/renovation-parquet-belfort",
            "telephone": "+33757821306",
            "email": "contact@poncages.fr",
            "priceRange": "€€",
            "image": [
              "https://mjuzyqhxifyvebtnlrra.supabase.co/storage/v1/object/public/photos-lpr/IMG_0536.jpg",
              "https://mjuzyqhxifyvebtnlrra.supabase.co/storage/v1/object/public/lpr2/favicone%20ponceur.png"
            ],
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "6 rue du Commerce",
              "addressLocality": "Herrlisheim-près-Colmar",
              "postalCode": "68420",
              "addressRegion": "Grand Est",
              "addressCountry": "FR"
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": "47.6380",
              "longitude": "6.8630"
            },
            "areaServed": {
              "@type": "City",
              "name": "Belfort",
              "containedInPlace": {
                "@type": "AdministrativeArea",
                "name": "Territoire de Belfort"
              }
            },
            "serviceArea": {
              "@type": "GeoCircle",
              "geoMidpoint": {
                "@type": "GeoCoordinates",
                "latitude": "47.6380",
                "longitude": "6.8630"
              },
              "geoRadius": "50000"
            },
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "5.0",
              "reviewCount": "5",
              "bestRating": "5",
              "worstRating": "1"
            },
            "openingHoursSpecification": [
              {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                "opens": "08:00",
                "closes": "18:00"
              }
            ],
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": "Services de pose et rénovation de parquet",
              "itemListElement": [
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Pose de parquet à Belfort",
                    "description": "Pose professionnelle de parquet massif, contrecollé, flottant et cloué"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Ponçage de parquet à Belfort",
                    "description": "Ponçage professionnel sans poussière de tous types de parquets"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Vitrification de parquet à Belfort",
                    "description": "Vitrification et finition de parquet pour une protection durable"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Réparation de parquet à Belfort",
                    "description": "Réparation et restauration de parquets anciens et abîmés"
                  }
                }
              ]
            },
            "sameAs": [
              "https://www.facebook.com/lesponceursr%C3%A9unis"
            ]
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
                "name": "Pose & Rénovation Parquet Belfort",
                "item": "https://ponceur-parquet.fr/renovation-parquet-belfort"
              }
            ]
          })}
        </script>

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "Combien coûte la pose ou rénovation d'un parquet à Belfort ?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Le coût varie selon le type de parquet et le service : pose de parquet massif à partir de 55€/m², ponçage et vitrification à partir de 42€/m². Nous proposons un devis gratuit sous 24h adapté à votre projet à Belfort."
                }
              },
              {
                "@type": "Question",
                "name": "Intervenez-vous dans tous les quartiers de Belfort ?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Oui, nous intervenons dans tous les quartiers de Belfort : Centre-ville, Les Glacis, Les Barres, Résidences, La Pépinière, Arsenal, et toutes les communes limitrophes comme Danjoutin, Valdoie, Essert."
                }
              },
              {
                "@type": "Question",
                "name": "Quels types de parquet posez-vous à Belfort ?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Nous posons tous types de parquets : parquet massif (chêne, hêtre, châtaignier), parquet contrecollé, parquet flottant, parquet cloué. Nous proposons également la pose de parquets spéciaux comme le point de Hongrie ou Versailles."
                }
              },
              {
                "@type": "Question",
                "name": "Le ponçage de parquet fait-il beaucoup de poussière ?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Non, nous utilisons un système de ponçage sans poussière avec aspiration intégrée. Plus de 99% de la poussière est captée directement, garantissant un chantier propre à Belfort."
                }
              }
            ]
          })}
        </script>
      </Helmet>

      <Header />

      <main className="flex-grow">
        <section className="relative isolate overflow-hidden pt-24 pb-16 md:pt-32">
          <div className="absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-gradient-to-br from-[#0f1b2b] via-[#1a2b3d] to-[#0f1b2b]" />
            <div className="absolute inset-0 opacity-10" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d9b45a' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
            }} />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="text-white">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#d9b45a]/20 border border-[#d9b45a]/30 rounded-full mb-6">
                  <MapPin className="w-4 h-4 text-[#d9b45a]" />
                  <span className="text-sm font-medium text-[#d9b45a]">Intervention à Belfort (90)</span>
                </div>

                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                  Pose & Rénovation de Parquet
                  <span className="block text-[#d9b45a] mt-2">à Belfort</span>
                </h1>

                <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                  Artisan expert en pose de parquet, ponçage, vitrification et réparation.
                  Intervention rapide dans tous les quartiers de Belfort et le Territoire de Belfort.
                </p>

                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="flex items-center gap-3">
                    <div className="flex-shrink-0 w-10 h-10 bg-[#d9b45a]/20 rounded-lg flex items-center justify-center">
                      <CheckCircle className="w-5 h-5 text-[#d9b45a]" />
                    </div>
                    <span className="text-gray-200">Devis gratuit 24h</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex-shrink-0 w-10 h-10 bg-[#d9b45a]/20 rounded-lg flex items-center justify-center">
                      <CheckCircle className="w-5 h-5 text-[#d9b45a]" />
                    </div>
                    <span className="text-gray-200">Pose & Rénovation</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex-shrink-0 w-10 h-10 bg-[#d9b45a]/20 rounded-lg flex items-center justify-center">
                      <CheckCircle className="w-5 h-5 text-[#d9b45a]" />
                    </div>
                    <span className="text-gray-200">15 ans d'expérience</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex-shrink-0 w-10 h-10 bg-[#d9b45a]/20 rounded-lg flex items-center justify-center">
                      <CheckCircle className="w-5 h-5 text-[#d9b45a]" />
                    </div>
                    <span className="text-gray-200">Garantie décennale</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    href="tel:+33757821306"
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-[#d9b45a] to-[#b8941a] text-[#0f1b2b] rounded-xl font-bold shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 text-lg"
                  >
                    <Phone className="w-5 h-5" />
                    07 57 82 13 06
                  </a>
                  <a
                    href="#devis"
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 text-white border-2 border-white/30 rounded-xl font-bold hover:bg-white/20 transition-all duration-300 text-lg backdrop-blur-sm"
                  >
                    Devis gratuit
                    <ArrowRight className="w-5 h-5" />
                  </a>
                </div>
              </div>

              <div className="relative flex items-center justify-center lg:justify-end">
                <div className="relative bg-white rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.15)] hover:shadow-[0_25px_80px_rgba(184,148,26,0.25)] transition-all duration-500 overflow-hidden h-[500px] w-[416px] lg:h-[650px] lg:w-[500px] border-4 border-[#d9b45a]/30 hover:border-[#b8941a]/50 ring-4 ring-[#d9b45a]/10">
                  <div className="absolute inset-0 rounded-2xl overflow-hidden z-0">
                    <img
                      src="https://mjuzyqhxifyvebtnlrra.supabase.co/storage/v1/object/public/lpr2/lesponceursreunis.jpg"
                      alt="Chantier de ponçage parquet"
                    width="800"
                    height="600"
                    className="w-full h-full object-cover opacity-70"
                    loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-white/30 via-white/10 to-transparent"></div>
                  </div>

                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 z-10 w-[374px] h-[500px] lg:w-[436px] lg:h-[562px]">
                    <img
                      src="https://mjuzyqhxifyvebtnlrra.supabase.co/storage/v1/object/public/lpr2/moi%20complet.png"
                      alt="Julien DIETEMANN - Expert parquet"
                    width="436"
                    height="562"
                    className="w-full h-full object-contain object-bottom"
                      loading="eager"
                      fetchpriority="high"
                    />
                  </div>

                  <div className="absolute top-4 right-4 w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-pulse shadow-lg z-20">
                    <div className="absolute inset-0 bg-green-500 rounded-full animate-ping"></div>
                  </div>

                  <div className="absolute bottom-4 left-4 bg-[#d9b45a] text-[#0f1b2b] px-3 py-1 rounded-full text-sm font-bold z-20 shadow-lg">
                    Julien - Artisan depuis 2008
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Nos Services à Belfort
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Une expertise complète pour tous vos travaux de parquet
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-gradient-to-br from-[#eee9df] to-white rounded-2xl p-6 shadow-lg border-2 border-gray-200 hover:border-[#d9b45a] transition-all hover:-translate-y-1">
                <div className="w-14 h-14 bg-gradient-to-br from-[#d9b45a] to-[#b8941a] rounded-xl flex items-center justify-center mb-4">
                  <Home className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Pose de Parquet</h3>
                <p className="text-gray-600 text-sm mb-3">
                  Pose professionnelle de parquet massif, contrecollé, flottant. Point de Hongrie, Versailles.
                </p>
                <ul className="space-y-1">
                  <li className="flex items-start gap-2 text-gray-700 text-sm">
                    <CheckCircle className="w-4 h-4 text-[#d9b45a] flex-shrink-0 mt-0.5" />
                    <span>Parquet massif & contrecollé</span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-700 text-sm">
                    <CheckCircle className="w-4 h-4 text-[#d9b45a] flex-shrink-0 mt-0.5" />
                    <span>Pose clouée ou collée</span>
                  </li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-[#eee9df] to-white rounded-2xl p-6 shadow-lg border-2 border-gray-200 hover:border-[#d9b45a] transition-all hover:-translate-y-1">
                <div className="w-14 h-14 bg-gradient-to-br from-[#d9b45a] to-[#b8941a] rounded-xl flex items-center justify-center mb-4">
                  <Sparkles className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Ponçage</h3>
                <p className="text-gray-600 text-sm mb-3">
                  Ponçage professionnel sans poussière de tous types de parquets anciens et modernes.
                </p>
                <ul className="space-y-1">
                  <li className="flex items-start gap-2 text-gray-700 text-sm">
                    <CheckCircle className="w-4 h-4 text-[#d9b45a] flex-shrink-0 mt-0.5" />
                    <span>Sans poussière 99%</span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-700 text-sm">
                    <CheckCircle className="w-4 h-4 text-[#d9b45a] flex-shrink-0 mt-0.5" />
                    <span>Tous types de parquets</span>
                  </li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-[#eee9df] to-white rounded-2xl p-6 shadow-lg border-2 border-gray-200 hover:border-[#d9b45a] transition-all hover:-translate-y-1">
                <div className="w-14 h-14 bg-gradient-to-br from-[#d9b45a] to-[#b8941a] rounded-xl flex items-center justify-center mb-4">
                  <Shield className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Vitrification</h3>
                <p className="text-gray-600 text-sm mb-3">
                  Application de vernis haute qualité pour une protection durable et esthétique.
                </p>
                <ul className="space-y-1">
                  <li className="flex items-start gap-2 text-gray-700 text-sm">
                    <CheckCircle className="w-4 h-4 text-[#d9b45a] flex-shrink-0 mt-0.5" />
                    <span>Vernis écologique</span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-700 text-sm">
                    <CheckCircle className="w-4 h-4 text-[#d9b45a] flex-shrink-0 mt-0.5" />
                    <span>Finitions personnalisées</span>
                  </li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-[#eee9df] to-white rounded-2xl p-6 shadow-lg border-2 border-gray-200 hover:border-[#d9b45a] transition-all hover:-translate-y-1">
                <div className="w-14 h-14 bg-gradient-to-br from-[#d9b45a] to-[#b8941a] rounded-xl flex items-center justify-center mb-4">
                  <Award className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Réparation</h3>
                <p className="text-gray-600 text-sm mb-3">
                  Réparation et restauration de parquets anciens, remplacement de lames.
                </p>
                <ul className="space-y-1">
                  <li className="flex items-start gap-2 text-gray-700 text-sm">
                    <CheckCircle className="w-4 h-4 text-[#d9b45a] flex-shrink-0 mt-0.5" />
                    <span>Remplacement lames</span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-700 text-sm">
                    <CheckCircle className="w-4 h-4 text-[#d9b45a] flex-shrink-0 mt-0.5" />
                    <span>Restauration d'ancien</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-gradient-to-b from-white to-[#fafaf8]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Zones d'intervention à Belfort
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Nous intervenons dans tous les quartiers de Belfort et ses communes limitrophes
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-gray-100 mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Building2 className="w-6 h-6 text-[#d9b45a]" />
                Quartiers de Belfort
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                {belfortQuarters.map((quarter) => (
                  <div key={quarter} className="flex items-center gap-2 text-gray-700">
                    <MapPin className="w-4 h-4 text-[#d9b45a] flex-shrink-0" />
                    <span className="text-sm">{quarter}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-gray-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Home className="w-6 h-6 text-[#d9b45a]" />
                Communes du Territoire de Belfort
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                {nearbyTowns.map((town) => (
                  <div key={town} className="flex items-center gap-2 text-gray-700">
                    <MapPin className="w-4 h-4 text-[#d9b45a] flex-shrink-0" />
                    <span className="text-sm">{town}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-[#fafaf8]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Pourquoi nous choisir à Belfort ?
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-lg text-center">
                <div className="w-16 h-16 bg-[#d9b45a]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-8 h-8 text-[#d9b45a]" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Rapidité</h3>
                <p className="text-gray-600">Devis sous 24h et intervention rapide</p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg text-center">
                <div className="w-16 h-16 bg-[#d9b45a]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-[#d9b45a]" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Proximité</h3>
                <p className="text-gray-600">Artisan local, connaissance du terrain</p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg text-center">
                <div className="w-16 h-16 bg-[#d9b45a]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-[#d9b45a]" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Garanties</h3>
                <p className="text-gray-600">Garantie décennale et assurance pro</p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg text-center">
                <div className="w-16 h-16 bg-[#d9b45a]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-8 h-8 text-[#d9b45a]" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Qualité</h3>
                <p className="text-gray-600">15 ans d'expérience, matériel pro</p>
              </div>
            </div>
          </div>
        </section>

        <section id="devis" className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Demandez votre devis gratuit
              </h2>
              <p className="text-xl text-gray-600">
                Réponse sous 24h pour votre projet de parquet à Belfort
              </p>
            </div>

            <form onSubmit={handleSubmit} className="bg-gradient-to-br from-[#eee9df] to-white rounded-2xl shadow-xl p-8 border-2 border-gray-200">
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-gray-900 mb-2">
                    Nom complet *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-[#d9b45a] focus:ring-2 focus:ring-[#d9b45a]/20 outline-none transition-all"
                    placeholder="Jean Dupont"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold text-gray-900 mb-2">
                    Téléphone *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-[#d9b45a] focus:ring-2 focus:ring-[#d9b45a]/20 outline-none transition-all"
                    placeholder="06 12 34 56 78"
                  />
                </div>
              </div>

              <div className="mb-6">
                <label htmlFor="email" className="block text-sm font-semibold text-gray-900 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-[#d9b45a] focus:ring-2 focus:ring-[#d9b45a]/20 outline-none transition-all"
                  placeholder="jean.dupont@email.com"
                />
              </div>

              <div className="mb-6">
                <label htmlFor="address" className="block text-sm font-semibold text-gray-900 mb-2">
                  Adresse à Belfort *
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  required
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-[#d9b45a] focus:ring-2 focus:ring-[#d9b45a]/20 outline-none transition-all"
                  placeholder="Rue, quartier"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="surface" className="block text-sm font-semibold text-gray-900 mb-2">
                    Surface (m²) *
                  </label>
                  <input
                    type="number"
                    id="surface"
                    name="surface"
                    required
                    min="1"
                    value={formData.surface}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-[#d9b45a] focus:ring-2 focus:ring-[#d9b45a]/20 outline-none transition-all"
                    placeholder="25"
                  />
                </div>

                <div>
                  <label htmlFor="service" className="block text-sm font-semibold text-gray-900 mb-2">
                    Service souhaité *
                  </label>
                  <select
                    id="service"
                    name="service"
                    required
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-[#d9b45a] focus:ring-2 focus:ring-[#d9b45a]/20 outline-none transition-all"
                  >
                    <option value="poncage-vitrification">Ponçage + Vitrification</option>
                    <option value="pose-parquet">Pose de parquet</option>
                    <option value="poncage">Ponçage seul</option>
                    <option value="vitrification">Vitrification seule</option>
                    <option value="reparation">Réparation</option>
                    <option value="autre">Autre service</option>
                  </select>
                </div>
              </div>

              <div className="mb-6">
                <label htmlFor="message" className="block text-sm font-semibold text-gray-900 mb-2">
                  Détails de votre projet
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-[#d9b45a] focus:ring-2 focus:ring-[#d9b45a]/20 outline-none transition-all resize-none"
                  placeholder="Décrivez votre projet, type de parquet, état actuel..."
                />
              </div>

              <button
                type="submit"
                className="w-full px-8 py-4 bg-gradient-to-r from-[#d9b45a] to-[#b8941a] text-[#0f1b2b] rounded-xl font-bold shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 text-lg flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-5 h-5" />
                Obtenir mon devis gratuit
              </button>

              <p className="text-sm text-gray-500 text-center mt-4">
                Vos données sont sécurisées et ne seront jamais partagées
              </p>
            </form>

            <div className="mt-8 text-center">
              <p className="text-gray-600 mb-4">Ou contactez-nous directement :</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="tel:+33757821306"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#0f1b2b] text-white rounded-xl font-bold hover:bg-[#1a2b3d] transition-all"
                >
                  <Phone className="w-5 h-5" />
                  07 57 82 13 06
                </a>
                <a
                  href="mailto:contact@poncages.fr"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 border-2 border-[#0f1b2b] text-[#0f1b2b] rounded-xl font-bold hover:bg-[#0f1b2b] hover:text-white transition-all"
                >
                  <Mail className="w-5 h-5" />
                  contact@poncages.fr
                </a>
              </div>
            </div>
          </div>
        </section>

        <LocalGallery
          cityName="Belfort"
          title="Nos Réalisations à Belfort"
          subtitle="Découvrez quelques-unes de nos réalisations de pose et rénovation de parquet dans la région de Belfort"
          limit={6}
        />

        <LocalFAQ cityName="Belfort" />
      </main>

      <Footer />
    </div>
  );
};

export default LandingBelfort;
