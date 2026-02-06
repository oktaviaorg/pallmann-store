import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import LocalGallery from '../components/LocalGallery';
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
  MessageSquare,
  Play,
  Youtube
} from 'lucide-react';

const LandingNational: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
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

  const regions = [
    { name: 'Strasbourg & Eurométropole', icon: Building2 },
    { name: 'Colmar & Haut-Rhin', icon: Home },
    { name: 'Mulhouse & Sud Alsace', icon: MapPin },
    { name: 'Dijon & Côte-d\'Or', icon: Building2 },
    { name: 'Belfort & Territoire', icon: Home },
    { name: 'Sarrebourg & Moselle', icon: MapPin }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#fafaf8] to-white">
      <Helmet>
        <title>Expert Pose & Rénovation Parquet | Les Ponceurs Réunis | Devis Gratuit</title>
        <meta
          name="description"
          content="⭐ Les Ponceurs Réunis : Expert en pose et rénovation de parquet - ponçage, vitrification, réparation. 15 ans d'expérience. Intervention Grand Est & Bourgogne. Devis gratuit ☎️ 07 57 82 13 06."
        />
        <meta
          name="keywords"
          content="pose parquet, rénovation parquet, ponçage parquet, vitrification parquet, artisan parquet, parqueteur professionnel, ponçage sans poussière, Les Ponceurs Réunis, expert parquet"
        />
        <link rel="canonical" href="https://ponceur-parquet.fr/expert-renovation-parquet" />
        <meta name="robots" content="index, follow" />

        <meta property="og:title" content="Expert Pose & Rénovation Parquet | Les Ponceurs Réunis" />
        <meta property="og:description" content="Expert en pose et rénovation de parquet avec 15 ans d'expérience. Ponçage, vitrification, pose, réparation. Intervention rapide. Devis gratuit." />
        <meta property="og:url" content="https://ponceur-parquet.fr/expert-renovation-parquet" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://mjuzyqhxifyvebtnlrra.supabase.co/storage/v1/object/public/photos-lpr/IMG_0536.jpg" />
        <meta property="og:locale" content="fr_FR" />

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ProfessionalService",
            "name": "Les Ponceurs Réunis - Expert Pose & Rénovation Parquet",
            "description": "Artisan expert en pose et rénovation de parquet : ponçage sans poussière, vitrification, pose de parquet massif et contrecollé, réparation et restauration. Plus de 15 ans d'expérience au service de la qualité.",
            "url": "https://ponceur-parquet.fr/expert-renovation-parquet",
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
            "areaServed": [
              {
                "@type": "State",
                "name": "Grand Est"
              },
              {
                "@type": "State",
                "name": "Bourgogne-Franche-Comté"
              }
            ],
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
                    "name": "Pose de parquet professionnel",
                    "description": "Pose professionnelle de parquet massif, contrecollé, flottant et cloué"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Ponçage de parquet sans poussière",
                    "description": "Ponçage professionnel sans poussière de tous types de parquets"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Vitrification de parquet",
                    "description": "Vitrification et finition de parquet pour une protection durable"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Réparation de parquet",
                    "description": "Réparation et restauration de parquets anciens et abîmés"
                  }
                }
              ]
            },
            "sameAs": [
              "https://www.facebook.com/lesponceursr%C3%A9unis",
              "https://www.youtube.com/@lesponceursr%C3%A9unis"
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
                "name": "Expert Rénovation Parquet",
                "item": "https://ponceur-parquet.fr/expert-renovation-parquet"
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
                "name": "Combien coûte la rénovation d'un parquet ?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Le coût de rénovation d'un parquet varie selon la surface et l'état. En moyenne, comptez 42€/m² pour un ponçage et vitrification. Nous proposons un devis gratuit personnalisé sous 24h pour votre projet."
                }
              },
              {
                "@type": "Question",
                "name": "Dans quelles régions intervenez-vous ?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Nous intervenons principalement dans le Grand Est (Alsace, Moselle) et en Bourgogne-Franche-Comté. Nos zones principales incluent Strasbourg, Colmar, Mulhouse, Dijon, Belfort et leurs environs."
                }
              },
              {
                "@type": "Question",
                "name": "Combien de temps dure la rénovation d'un parquet ?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Pour une pièce standard (20-30m²), comptez 2 à 3 jours : 1 jour pour le ponçage, 1 jour pour la première couche de vitrification, et 1 jour pour les finitions. Le parquet est utilisable après 48h de séchage complet."
                }
              },
              {
                "@type": "Question",
                "name": "Le ponçage de parquet fait-il beaucoup de poussière ?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Non, nous utilisons un système de ponçage sans poussière avec aspiration intégrée. Plus de 99% de la poussière est captée directement, garantissant un chantier propre."
                }
              }
            ]
          })}
        </script>
      </Helmet>

      <Header />

      <main className="flex-grow">
        <section className="relative isolate overflow-hidden pt-20 pb-12 sm:pt-24 md:pt-32 sm:pb-16 overflow-x-hidden">
          <div className="absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-gradient-to-br from-[#0f1b2b] via-[#1a2b3d] to-[#0f1b2b]" />
            <div className="absolute inset-0 opacity-10" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d9b45a' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
            }} />
          </div>

          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <div className="text-white w-full">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-[#d9b45a]/20 border border-[#d9b45a]/30 rounded-full mb-4 sm:mb-6">
                  <Star className="w-3 h-3 sm:w-4 sm:h-4 text-[#d9b45a] flex-shrink-0" />
                  <span className="text-xs sm:text-sm font-medium text-[#d9b45a]">Artisan Expert depuis 2008</span>
                </div>

                <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight break-words">
                  Expert en Pose &
                  <span className="block text-[#d9b45a] mt-1 sm:mt-2">Rénovation de Parquet</span>
                </h1>

                <p className="text-sm sm:text-lg md:text-xl text-gray-300 mb-6 sm:mb-8 leading-relaxed">
                  Plus de 15 ans d'expérience en ponçage, vitrification, pose et réparation de parquet.
                  Artisan de confiance dans le Grand Est et la Bourgogne.
                </p>

                <div className="grid grid-cols-2 gap-2 sm:gap-4 mb-6 sm:mb-8">
                  <div className="flex items-center gap-1.5 sm:gap-3">
                    <div className="flex-shrink-0 w-7 h-7 sm:w-10 sm:h-10 bg-[#d9b45a]/20 rounded-lg flex items-center justify-center">
                      <CheckCircle className="w-3.5 h-3.5 sm:w-5 sm:h-5 text-[#d9b45a]" />
                    </div>
                    <span className="text-xs sm:text-base text-gray-200">Devis gratuit 24h</span>
                  </div>
                  <div className="flex items-center gap-1.5 sm:gap-3">
                    <div className="flex-shrink-0 w-7 h-7 sm:w-10 sm:h-10 bg-[#d9b45a]/20 rounded-lg flex items-center justify-center">
                      <CheckCircle className="w-3.5 h-3.5 sm:w-5 sm:h-5 text-[#d9b45a]" />
                    </div>
                    <span className="text-xs sm:text-base text-gray-200">Sans poussière</span>
                  </div>
                  <div className="flex items-center gap-1.5 sm:gap-3">
                    <div className="flex-shrink-0 w-7 h-7 sm:w-10 sm:h-10 bg-[#d9b45a]/20 rounded-lg flex items-center justify-center">
                      <CheckCircle className="w-3.5 h-3.5 sm:w-5 sm:h-5 text-[#d9b45a]" />
                    </div>
                    <span className="text-xs sm:text-base text-gray-200">15 ans d'expérience</span>
                  </div>
                  <div className="flex items-center gap-1.5 sm:gap-3">
                    <div className="flex-shrink-0 w-7 h-7 sm:w-10 sm:h-10 bg-[#d9b45a]/20 rounded-lg flex items-center justify-center">
                      <CheckCircle className="w-3.5 h-3.5 sm:w-5 sm:h-5 text-[#d9b45a]" />
                    </div>
                    <span className="text-xs sm:text-base text-gray-200">Garantie décennale</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <a
                    href="tel:+33757821306"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 sm:px-8 sm:py-4 bg-gradient-to-r from-[#b8941a] to-[#c7a347] text-white rounded-xl font-bold shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 text-base sm:text-lg border-2 border-[#9a7a15] w-full sm:w-auto"
                  >
                    <Phone className="w-5 h-5 flex-shrink-0" />
                    07 57 82 13 06
                  </a>
                  <a
                    href="#devis"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 sm:px-8 sm:py-4 bg-white/10 text-white border-2 border-white/30 rounded-xl font-bold hover:bg-white/20 transition-all duration-300 text-base sm:text-lg backdrop-blur-sm w-full sm:w-auto"
                  >
                    Devis gratuit
                    <ArrowRight className="w-5 h-5 flex-shrink-0" />
                  </a>
                </div>

                <div className="mt-4 sm:mt-8 flex items-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-300">
                  <Youtube className="w-3.5 h-3.5 sm:w-5 sm:h-5 text-red-500 flex-shrink-0" />
                  <span>Retrouvez-nous sur YouTube</span>
                </div>
              </div>

              <div className="relative flex items-center justify-center lg:justify-end mt-8 lg:mt-0 w-full">
                <div className="relative bg-white rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.15)] hover:shadow-[0_25px_80px_rgba(184,148,26,0.25)] transition-all duration-500 overflow-hidden h-[420px] w-full max-w-[350px] sm:h-[500px] sm:max-w-[416px] lg:h-[650px] lg:max-w-[500px] border-2 sm:border-4 border-[#d9b45a]/30 hover:border-[#b8941a]/50 ring-2 sm:ring-4 ring-[#d9b45a]/10">
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

                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 z-10 w-[90%] max-w-[315px] h-[420px] sm:max-w-[374px] sm:h-[500px] lg:max-w-[436px] lg:h-[562px]">
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

                  <div className="absolute top-3 right-3 sm:top-4 sm:right-4 w-3 h-3 sm:w-4 sm:h-4 bg-green-500 rounded-full border-2 border-white animate-pulse shadow-lg z-20">
                    <div className="absolute inset-0 bg-green-500 rounded-full animate-ping"></div>
                  </div>

                  <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 bg-[#d9b45a] text-[#0f1b2b] px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm font-bold z-20 shadow-lg">
                    Julien - Artisan depuis 2008
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-gradient-to-b from-white to-[#fafaf8]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#d9b45a]/10 rounded-full mb-4">
                <Star className="w-4 h-4 text-[#d9b45a]" />
                <span className="text-sm font-semibold text-[#d9b45a]">Note moyenne 5/5 sur Google</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Pourquoi choisir Les Ponceurs Réunis ?
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Une expertise reconnue et un savoir-faire artisanal au service de vos parquets
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-lg text-center hover:-translate-y-1 transition-all">
                <div className="w-16 h-16 bg-[#d9b45a]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-[#d9b45a]" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">15 Ans d'Expérience</h3>
                <p className="text-gray-600">Plus de 1000 chantiers réalisés avec succès</p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg text-center hover:-translate-y-1 transition-all">
                <div className="w-16 h-16 bg-[#d9b45a]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-[#d9b45a]" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Garanties Pro</h3>
                <p className="text-gray-600">Garantie décennale et assurance responsabilité civile</p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg text-center hover:-translate-y-1 transition-all">
                <div className="w-16 h-16 bg-[#d9b45a]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="w-8 h-8 text-[#d9b45a]" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Sans Poussière</h3>
                <p className="text-gray-600">Système d'aspiration 99% efficace, chantier propre</p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg text-center hover:-translate-y-1 transition-all">
                <div className="w-16 h-16 bg-[#d9b45a]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-8 h-8 text-[#d9b45a]" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Devis Rapide</h3>
                <p className="text-gray-600">Réponse personnalisée sous 24h maximum</p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Nos Services Professionnels
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Une expertise complète pour tous vos travaux de parquet
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-gradient-to-br from-[#eee9df] to-white rounded-2xl p-8 shadow-lg border-2 border-gray-200 hover:border-[#d9b45a] transition-all hover:-translate-y-1">
                <div className="w-16 h-16 bg-gradient-to-br from-[#d9b45a] to-[#b8941a] rounded-xl flex items-center justify-center mb-6">
                  <Sparkles className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Ponçage de Parquet</h3>
                <p className="text-gray-600 mb-4">
                  Ponçage professionnel sans poussière de tous types de parquets : massif, contrecollé, ancien.
                  Système d'aspiration performant pour un chantier propre.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2 text-gray-700">
                    <CheckCircle className="w-5 h-5 text-[#d9b45a] flex-shrink-0 mt-0.5" />
                    <span>Parquet massif, contrecollé</span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-700">
                    <CheckCircle className="w-5 h-5 text-[#d9b45a] flex-shrink-0 mt-0.5" />
                    <span>Point de Hongrie, Versailles</span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-700">
                    <CheckCircle className="w-5 h-5 text-[#d9b45a] flex-shrink-0 mt-0.5" />
                    <span>Ponçage sans poussière 99%</span>
                  </li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-[#eee9df] to-white rounded-2xl p-8 shadow-lg border-2 border-gray-200 hover:border-[#d9b45a] transition-all hover:-translate-y-1">
                <div className="w-16 h-16 bg-gradient-to-br from-[#d9b45a] to-[#b8941a] rounded-xl flex items-center justify-center mb-6">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Vitrification</h3>
                <p className="text-gray-600 mb-4">
                  Application de vernis haute qualité pour une protection durable.
                  Plusieurs finitions disponibles : mat, satiné, brillant.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2 text-gray-700">
                    <CheckCircle className="w-5 h-5 text-[#d9b45a] flex-shrink-0 mt-0.5" />
                    <span>Vernis écologique à l'eau</span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-700">
                    <CheckCircle className="w-5 h-5 text-[#d9b45a] flex-shrink-0 mt-0.5" />
                    <span>Protection haute résistance</span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-700">
                    <CheckCircle className="w-5 h-5 text-[#d9b45a] flex-shrink-0 mt-0.5" />
                    <span>Finitions personnalisées</span>
                  </li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-[#eee9df] to-white rounded-2xl p-8 shadow-lg border-2 border-gray-200 hover:border-[#d9b45a] transition-all hover:-translate-y-1">
                <div className="w-16 h-16 bg-gradient-to-br from-[#d9b45a] to-[#b8941a] rounded-xl flex items-center justify-center mb-6">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Pose & Réparation</h3>
                <p className="text-gray-600 mb-4">
                  Pose de parquet neuf et réparation de parquets anciens ou abîmés.
                  Remplacement de lames, traitement des grincements.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2 text-gray-700">
                    <CheckCircle className="w-5 h-5 text-[#d9b45a] flex-shrink-0 mt-0.5" />
                    <span>Pose massif et contrecollé</span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-700">
                    <CheckCircle className="w-5 h-5 text-[#d9b45a] flex-shrink-0 mt-0.5" />
                    <span>Réparation de lames</span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-700">
                    <CheckCircle className="w-5 h-5 text-[#d9b45a] flex-shrink-0 mt-0.5" />
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
                Nos Zones d'Intervention
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Nous intervenons principalement dans le Grand Est et la Bourgogne-Franche-Comté
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {regions.map((region) => (
                <div
                  key={region.name}
                  className="bg-white rounded-xl p-6 shadow-lg border-2 border-gray-100 hover:border-[#d9b45a] transition-all hover:-translate-y-1"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-[#d9b45a]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <region.icon className="w-6 h-6 text-[#d9b45a]" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900">{region.name}</h3>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 text-center px-3 sm:px-4">
              <p className="text-gray-600 mb-4 text-sm sm:text-base">
                Votre ville n'est pas dans la liste ? Contactez-nous pour vérifier notre disponibilité
              </p>
              <a
                href="tel:+33757821306"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 sm:px-8 sm:py-4 bg-gradient-to-r from-[#b8941a] to-[#c7a347] text-white rounded-xl font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all border-2 border-[#9a7a15] w-full sm:w-auto sm:max-w-xs"
              >
                <Phone className="w-5 h-5 flex-shrink-0" />
                07 57 82 13 06
              </a>
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
                Réponse personnalisée sous 24h pour votre projet de parquet
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

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="city" className="block text-sm font-semibold text-gray-900 mb-2">
                    Ville *
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    required
                    value={formData.city}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-[#d9b45a] focus:ring-2 focus:ring-[#d9b45a]/20 outline-none transition-all"
                    placeholder="Votre ville"
                  />
                </div>

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
              </div>

              <div className="mb-6">
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
                  <option value="poncage">Ponçage seul</option>
                  <option value="vitrification">Vitrification seule</option>
                  <option value="pose">Pose de parquet</option>
                  <option value="reparation">Réparation</option>
                  <option value="autre">Autre service</option>
                </select>
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
                className="w-full px-6 py-3.5 sm:px-8 sm:py-4 bg-gradient-to-r from-[#b8941a] to-[#c7a347] text-white rounded-xl font-bold shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 text-base sm:text-lg flex items-center justify-center gap-2 border-2 border-[#9a7a15]"
              >
                <MessageSquare className="w-5 h-5 flex-shrink-0" />
                Obtenir mon devis gratuit
              </button>

              <p className="text-sm text-gray-500 text-center mt-4">
                Vos données sont sécurisées et ne seront jamais partagées
              </p>
            </form>

            <div className="mt-8 text-center px-0 sm:px-4">
              <p className="text-gray-600 mb-4 text-sm sm:text-base">Ou contactez-nous directement :</p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                <a
                  href="tel:+33757821306"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 sm:px-8 sm:py-4 bg-gradient-to-r from-[#b8941a] to-[#c7a347] text-white rounded-xl font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all border-2 border-[#9a7a15] w-full sm:w-auto"
                >
                  <Phone className="w-5 h-5 flex-shrink-0" />
                  07 57 82 13 06
                </a>
                <a
                  href="mailto:contact@poncages.fr"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 sm:px-8 sm:py-4 border-2 border-[#b8941a] text-[#0f1b2b] rounded-xl font-bold hover:bg-[#b8941a] hover:text-white transition-all w-full sm:w-auto"
                >
                  <Mail className="w-5 h-5 flex-shrink-0" />
                  <span className="truncate">contact@poncages.fr</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-gradient-to-b from-[#fafaf8] to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Suivez-nous sur YouTube
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                Découvrez nos chantiers, nos techniques et nos conseils d'expert en vidéo
              </p>
              <div className="px-3 sm:px-0">
                <Link
                  to="/youtube"
                  className="inline-flex items-center justify-center gap-2 sm:gap-3 px-6 py-3.5 sm:px-8 sm:py-4 bg-red-600 text-white rounded-xl font-bold hover:bg-red-700 transition-all shadow-lg hover:shadow-xl hover:scale-105 w-full sm:w-auto sm:max-w-xs"
                >
                  <Youtube className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0" />
                  Voir nos vidéos
                  <Play className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        <LocalGallery
          cityName=""
          title="Nos Réalisations"
          subtitle="Découvrez quelques-unes de nos réalisations de pose et rénovation de parquet"
          limit={6}
        />
      </main>

      <Footer />
    </div>
  );
};

export default LandingNational;
