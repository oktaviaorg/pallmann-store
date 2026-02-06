import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../components/Header';
import Footer from '../components/Footer';
import {
  CheckCircle,
  Award,
  Clock,
  MapPin,
  Phone,
  Mail,
  Star,
  TrendingUp,
  Shield,
  Users
} from 'lucide-react';

const LandingColmarMulhouse: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    city: '',
    surface: '',
    service: '',
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

  return (
    <div className="min-h-screen flex flex-col bg-[#fafaf8]">
      <Helmet>
        <title>Ponçage Parquet Alsace (67-68) | Les Ponceurs Réunis | Devis 24h</title>
        <meta name="description" content="⭐ Les Ponceurs Réunis : Artisan ponçage parquet dans toute l'Alsace ✓ Bas-Rhin & Haut-Rhin ✓ Devis gratuit 24h ✓ 15 ans d'expérience ✓ Garantie décennale ☎️ 07 57 82 13 06" />
        <link rel="canonical" href="https://ponceur-parquet.fr/landing/colmar-mulhouse" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Ponçage Parquet Alsace (67-68) | Les Ponceurs Réunis | Devis 24h" />
        <meta property="og:description" content="Les Ponceurs Réunis : Artisan expert en ponçage de parquet dans toute l'Alsace. Intervention Bas-Rhin et Haut-Rhin. Devis gratuit sous 24h." />
        <meta property="og:url" content="https://ponceur-parquet.fr/landing/colmar-mulhouse" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://mjuzyqhxifyvebtnlrra.supabase.co/storage/v1/object/public/photos-lpr/IMG_0536.jpg" />
        <meta name="geo.region" content="FR-68" />
        <meta name="geo.placename" content="Alsace, Bas-Rhin, Haut-Rhin" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "Les Ponceurs Réunis - Ponçage Parquet Alsace",
            "description": "Expert en ponçage et rénovation de parquet dans toute l'Alsace (Bas-Rhin et Haut-Rhin)",
            "telephone": "+33757821306",
            "priceRange": "€€",
            "areaServed": ["Strasbourg", "Colmar", "Mulhouse", "Haguenau", "Sélestat", "Saverne", "Obernai", "Bas-Rhin", "Haut-Rhin", "Alsace"],
            "image": "https://mjuzyqhxifyvebtnlrra.supabase.co/storage/v1/object/public/photos-lpr/IMG_0536.jpg",
            "address": {
              "@type": "PostalAddress",
              "addressRegion": "Alsace",
              "addressCountry": "FR"
            },
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.9",
              "reviewCount": "127"
            },
            "openingHoursSpecification": {
              "@type": "OpeningHoursSpecification",
              "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
              "opens": "08:00",
              "closes": "18:00"
            }
          })}
        </script>
      </Helmet>

      <Header />

      {/* Hero Section with Background Pattern */}
      <section className="relative isolate overflow-hidden pt-20 pb-16">
        {/* Background */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-[#f5f5f3] via-[#ede7dc] to-[#f5f5f3]" />
          <div className="absolute inset-0 opacity-5" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23b8941a' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }} />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Hero Content */}
            <div>
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <div className="inline-flex items-center gap-2 bg-[#d9b45a]/10 border border-[#d9b45a]/30 rounded-full px-4 py-2">
                  <MapPin className="w-4 h-4 text-[#b8941a]" />
                  <span className="text-sm font-semibold text-[#b8941a]">Bas-Rhin • Haut-Rhin • Toute l'Alsace</span>
                </div>
                <div className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2 border-2 border-[#d9b45a]/30 shadow-md">
                  <img
                    src="https://mjuzyqhxifyvebtnlrra.supabase.co/storage/v1/object/public/lpr2/marque-alsace%20.jpg"
                    alt="Marque Alsace - Entreprise locale alsacienne"
                    width="64"
                    height="32"
                    className="h-7 w-auto object-contain"
                    loading="eager"
                  />
                  <span className="text-xs font-bold text-gray-900">Entreprise Locale</span>
                </div>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-gray-900">
                Ponçage de Parquet
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#d9b45a] via-[#b8941a] to-[#d9b45a] mt-2">
                  Dans Toute l'Alsace
                </span>
              </h1>

              <p className="text-xl text-gray-700 mb-8 leading-relaxed">
                Expert en rénovation de parquet avec <strong className="text-[#b8941a]">15 ans d'expérience</strong>.
                Intervention dans toute l'Alsace : Bas-Rhin et Haut-Rhin.
              </p>

              {/* Key Benefits */}
              <div className="grid sm:grid-cols-2 gap-4 mb-8">
                <div className="flex items-center gap-3 bg-white backdrop-blur-sm rounded-lg p-4 border border-[#d9b45a]/20 shadow-md">
                  <div className="flex-shrink-0 w-10 h-10 bg-[#d9b45a]/10 rounded-full flex items-center justify-center">
                    <Clock className="w-5 h-5 text-[#b8941a]" />
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">Devis Gratuit</div>
                    <div className="text-sm text-gray-600">Réponse sous 24h</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 bg-white backdrop-blur-sm rounded-lg p-4 border border-[#d9b45a]/20 shadow-md">
                  <div className="flex-shrink-0 w-10 h-10 bg-[#d9b45a]/10 rounded-full flex items-center justify-center">
                    <Award className="w-5 h-5 text-[#b8941a]" />
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">15 ans</div>
                    <div className="text-sm text-gray-600">D'expertise</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 bg-white backdrop-blur-sm rounded-lg p-4 border border-[#d9b45a]/20 shadow-md">
                  <div className="flex-shrink-0 w-10 h-10 bg-[#d9b45a]/10 rounded-full flex items-center justify-center">
                    <Shield className="w-5 h-5 text-[#b8941a]" />
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">Garantie décennale</div>
                    <div className="text-sm text-gray-600">Travaux assurés</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 bg-white backdrop-blur-sm rounded-lg p-4 border border-[#d9b45a]/20 shadow-md">
                  <div className="flex-shrink-0 w-10 h-10 bg-[#d9b45a]/10 rounded-full flex items-center justify-center">
                    <Star className="w-5 h-5 text-[#b8941a]" />
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">4.9/5</div>
                    <div className="text-sm text-gray-600">127 avis clients</div>
                  </div>
                </div>
              </div>

              {/* Contact Buttons */}
              <div className="flex flex-wrap gap-4">
                <a
                  href="tel:+33757821306"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-[#d9b45a] to-[#b8941a] text-white px-8 py-4 rounded-xl font-bold hover:scale-105 transition-transform shadow-xl"
                >
                  <Phone className="w-5 h-5" />
                  07 57 82 13 06
                </a>

                <a
                  href="#devis"
                  className="inline-flex items-center gap-2 bg-[#0f1b2b] text-white px-8 py-4 rounded-xl font-bold hover:scale-105 transition-transform shadow-xl"
                >
                  <Mail className="w-5 h-5" />
                  Devis Gratuit
                </a>
              </div>
            </div>

            {/* Right Column - Image with Professional */}
            <div className="relative flex items-center justify-center lg:justify-end">
              <div className="relative bg-white rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.15)] hover:shadow-[0_25px_80px_rgba(184,148,26,0.25)] transition-all duration-500 overflow-hidden h-[500px] w-[416px] lg:h-[650px] lg:w-[500px] border-4 border-[#d9b45a]/30 hover:border-[#b8941a]/50 ring-4 ring-[#d9b45a]/10">
                {/* Photo de chantier en arrière-plan */}
                <div className="absolute inset-0 rounded-2xl overflow-hidden z-0">
                  <img
                    src="https://mjuzyqhxifyvebtnlrra.supabase.co/storage/v1/object/public/photos-lpr/IMG_0536.jpg"
                    alt="Chantier de ponçage parquet en Alsace"
                    className="w-full h-full object-cover opacity-70"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-white/30 via-white/10 to-transparent"></div>
                </div>

                {/* Personnage au premier plan */}
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 z-10 w-[374px] h-[500px] lg:w-[436px] lg:h-[562px]">
                  <img
                    src="https://mjuzyqhxifyvebtnlrra.supabase.co/storage/v1/object/public/lpr2/moi%20complet.png"
                    alt="Julien DIETEMANN - Expert parquet en Alsace"
                    width="436"
                    height="562"
                    className="w-full h-full object-contain object-bottom"
                    loading="eager"
                    fetchpriority="high"
                  />
                </div>

                {/* Online Indicator */}
                <div className="absolute top-4 right-4 w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-pulse shadow-lg z-20">
                  <div className="absolute inset-0 bg-green-500 rounded-full animate-ping"></div>
                </div>

                {/* Badge expert en bas */}
                <div className="absolute bottom-4 left-4 bg-[#d9b45a] text-[#0f1b2b] px-3 py-1 rounded-full text-sm font-bold z-20 shadow-lg">
                  Julien - Artisan depuis 2008
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-8 bg-white border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <TrendingUp className="w-8 h-8 text-[#b8941a] mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">98%</div>
              <div className="text-sm text-gray-600">Clients satisfaits</div>
            </div>
            <div>
              <Clock className="w-8 h-8 text-[#b8941a] mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">24h</div>
              <div className="text-sm text-gray-600">Réponse garantie</div>
            </div>
            <div>
              <MapPin className="w-8 h-8 text-[#b8941a] mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">30km</div>
              <div className="text-sm text-gray-600">Zone d'intervention</div>
            </div>
            <div>
              <Award className="w-8 h-8 text-[#b8941a] mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">Label</div>
              <div className="text-sm text-gray-600">Artisan qualifié</div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Nos Services en <span className="text-[#b8941a]">Alsace</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Une expertise complète pour tous vos travaux de parquet
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Ponçage de Parquet',
                description: 'Ponçage professionnel de parquet ancien et moderne. Résultat impeccable garanti.',
                features: ['Sans poussière', 'Toutes essences', 'Finition parfaite']
              },
              {
                title: 'Vitrification',
                description: 'Protection durable avec finition mate, satinée ou brillante selon vos préférences.',
                features: ['3 couches minimum', 'Séchage rapide', 'Haute résistance']
              },
              {
                title: 'Huilage Naturel',
                description: 'Finition écologique qui préserve l\'aspect naturel de votre parquet.',
                features: ['Produits bio', 'Entretien facile', 'Aspect authentique']
              },
              {
                title: 'Rénovation Complète',
                description: 'Restauration de parquets anciens avec réparation des lames abîmées.',
                features: ['Expertise patrimoine', 'Respect du cachet', 'Résultat durable']
              },
              {
                title: 'Escaliers',
                description: 'Ponçage et rénovation d\'escaliers en bois pour un résultat harmonieux.',
                features: ['Marches et contremarches', 'Sans démontage', 'Protection adaptée']
              },
              {
                title: 'Devis & Conseil',
                description: 'Visite gratuite avec diagnostic et recommandations personnalisées.',
                features: ['Gratuit & rapide', 'Sans engagement', 'Conseils d\'expert']
              }
            ].map((service, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-center gap-2 text-sm text-gray-700">
                      <CheckCircle className="w-4 h-4 text-[#b8941a] flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Urgency Banner */}
      <section className="py-8 bg-gradient-to-r from-[#d9b45a] to-[#b8941a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">
            <div className="inline-flex items-center gap-2 bg-white/20 rounded-full px-4 py-2 mb-3">
              <Clock className="w-5 h-5" />
              <span className="font-bold">Offre limitée</span>
            </div>
            <h3 className="text-2xl md:text-3xl font-bold mb-2">
              Devis Gratuit + Visite Technique Offerte
            </h3>
            <p className="text-lg">
              Profitez de notre diagnostic expert gratuit - Réponse sous 24h
            </p>
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="py-8 bg-gray-50 border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div className="bg-white rounded-lg p-6 shadow-md">
              <div className="flex items-center justify-center gap-1 mb-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-5 h-5 fill-[#d9b45a] text-[#d9b45a]" />
                ))}
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">4.9/5</div>
              <div className="text-sm text-gray-600">127 avis clients vérifiés</div>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-md">
              <CheckCircle className="w-10 h-10 text-[#b8941a] mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900 mb-1">500+</div>
              <div className="text-sm text-gray-600">Chantiers réalisés avec succès</div>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-md">
              <Shield className="w-10 h-10 text-[#b8941a] mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900 mb-1">100%</div>
              <div className="text-sm text-gray-600">Travaux garantis et assurés</div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="devis" className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Demandez Votre <span className="text-[#b8941a]">Devis Gratuit</span>
            </h2>
            <p className="text-xl text-gray-600 mb-4">
              Réponse personnalisée sous 24h
            </p>
            <div className="inline-flex items-center gap-2 bg-green-50 border border-green-200 rounded-full px-4 py-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-semibold text-green-700">12 demandes cette semaine</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="bg-gray-50 rounded-2xl shadow-xl p-8 border border-gray-200">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nom complet *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#d9b45a] focus:border-transparent"
                  placeholder="Jean Dupont"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Téléphone *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#d9b45a] focus:border-transparent"
                  placeholder="06 12 34 56 78"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#d9b45a] focus:border-transparent"
                  placeholder="jean.dupont@email.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ville *
                </label>
                <select
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#d9b45a] focus:border-transparent"
                >
                  <option value="">Sélectionnez votre ville</option>
                  <option value="Strasbourg">Strasbourg</option>
                  <option value="Colmar">Colmar</option>
                  <option value="Mulhouse">Mulhouse</option>
                  <option value="Haguenau">Haguenau</option>
                  <option value="Sélestat">Sélestat</option>
                  <option value="Saverne">Saverne</option>
                  <option value="Obernai">Obernai</option>
                  <option value="Wissembourg">Wissembourg</option>
                  <option value="Molsheim">Molsheim</option>
                  <option value="Bischwiller">Bischwiller</option>
                  <option value="Autre Alsace">Autre ville d'Alsace</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Surface (m²)
                </label>
                <input
                  type="number"
                  name="surface"
                  value={formData.surface}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#d9b45a] focus:border-transparent"
                  placeholder="50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Service souhaité *
                </label>
                <select
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#d9b45a] focus:border-transparent"
                >
                  <option value="">Sélectionnez</option>
                  <option value="Ponçage et Vitrification">Ponçage et Vitrification</option>
                  <option value="Ponçage et Huilage">Ponçage et Huilage</option>
                  <option value="Réparation de Parquet Ancien">Réparation de Parquet Ancien</option>
                  <option value="Rénovation Escalier">Rénovation Escalier</option>
                  <option value="Autre">Autre</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Détails de votre projet
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#d9b45a] focus:border-transparent"
                  placeholder="Décrivez votre projet..."
                ></textarea>
              </div>
            </div>

            <div className="mt-6">
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-[#d9b45a] to-[#b8941a] text-white px-8 py-4 rounded-xl font-bold hover:scale-[1.02] transition-transform shadow-lg"
              >
                Envoyer ma demande de devis gratuit
              </button>
            </div>

            <p className="text-xs text-gray-500 text-center mt-4">
              Vos données sont protégées et ne seront jamais partagées
            </p>
          </form>
        </div>
      </section>

      {/* Floating CTA Button (Mobile) */}
      <div className="fixed bottom-0 left-0 right-0 lg:hidden bg-white border-t-2 border-[#d9b45a] shadow-2xl z-50 p-4">
        <div className="flex gap-3">
          <a
            href="tel:+33757821306"
            className="flex-1 inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#d9b45a] to-[#b8941a] text-white px-6 py-3 rounded-xl font-bold shadow-lg"
          >
            <Phone className="w-5 h-5" />
            Appeler
          </a>
          <a
            href="#devis"
            className="flex-1 inline-flex items-center justify-center gap-2 bg-[#0f1b2b] text-white px-6 py-3 rounded-xl font-bold shadow-lg"
          >
            <Mail className="w-5 h-5" />
            Devis
          </a>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default LandingColmarMulhouse;
