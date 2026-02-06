import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import {
  Calculator, Phone, CheckCircle, Send, Star, Award, Users, Home, Building, X,
  ArrowRight, MapPin, Calendar, Quote, Eye, ChevronRight, ChevronDown, Mail, Facebook,
  Instagram, Linkedin, ExternalLink, Sparkles, Shield, Clock, Heart, Droplet, Download, PlayCircle, Headphones
} from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AnalysisBanner from '../components/AnalysisBanner';
import { generateLocalBusinessSchema, generateBreadcrumbSchema, websiteSchema } from '../utils/seoSchemas';
import { Helmet } from 'react-helmet';
import { supabase } from '../lib/supabase';
import { submitForm, validateStep, calculatePrice } from '../utils/form';
import { FormData } from '../types/form';
import { trackFormSubmission, trackPhoneClick } from '../utils/gtmEvents';


interface GalleryPhoto {
  id: string;
  url: string;
  order: number;
}

interface Review {
  id: string;
  name: string;
  title: string;
  content: string;
  rating: number;
  created_at: string;
}

export default function HomePage() {
  const [formData, setFormData] = useState<FormData>({
    surface: 25,
    serviceType: 'poncage_vitrification',
    finishType: 'mat',
    fullName: '',
    phone: '',
    phoneCountry: 'FR',
    email: '',
    postalCode: '',
    message: '',
    propertyType: 'maison',
    city: 'Ville',
    finition: 'poncageVitrification',
    sendCopy: false
  });
  
  const [loading, setLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<null | "sent" | "error">(null);
  const [showModal, setShowModal] = useState(false);
  const [galleryPhotos, setGalleryPhotos] = useState<GalleryPhoto[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

  // Fetch gallery photos and reviews
  useEffect(() => {
    fetchGalleryPhotos();
    fetchReviews();
  }, []);

  const fetchGalleryPhotos = async () => {
    try {
      const { data, error } = await supabase
        .from('gallery_photos')
        .select('*')
        .order('order')
        .limit(6);

      if (error) throw error;
      setGalleryPhotos(data || []);
    } catch (error) {
      console.error('Error fetching gallery photos:', error);
      // Fallback photos
      setGalleryPhotos([
        { id: '1', url: 'https://mjuzyqhxifyvebtnlrra.supabase.co/storage/v1/object/public/photos-lpr//test%20parquet.jpg', order: 1 },
        { id: '2', url: 'https://mjuzyqhxifyvebtnlrra.supabase.co/storage/v1/object/public/lpr2//Huningue%20(3).jpg', order: 2 },
        { id: '3', url: 'https://mjuzyqhxifyvebtnlrra.supabase.co/storage/v1/object/public/lpr2//Hotel%20de%20Thann.jpg', order: 3 }
      ]);
    }
  };

  const fetchReviews = async () => {
    try {
      const { data, error } = await supabase
        .from('reviews')
        .select('*')
        .eq('status', 'approved')
        .order('created_at', { ascending: false })
        .limit(3);

      if (error) throw error;
      setReviews(data || []);
    } catch (error) {
      console.error('Error fetching reviews:', error);
      // Fallback reviews
      setReviews([
        {
          id: '1',
          name: 'Marie D.',
          title: 'Travail impeccable !',
          content: 'Rénovation complète de notre parquet ancien. L\'équipe a été très professionnelle et le résultat est magnifique. Je recommande vivement !',
          rating: 5,
          created_at: '2024-12-15'
        },
        {
          id: '2',
          name: 'Pierre M.',
          title: 'Excellent service',
          content: 'Ponçage et vitrification de notre parquet en chêne. Travail soigné, équipe à l\'écoute et respectueuse des délais.',
          rating: 5,
          created_at: '2024-11-28'
        },
        {
          id: '3',
          name: 'Sophie L.',
          title: 'Très satisfaite',
          content: 'Excellente prestation pour la rénovation de notre escalier en bois. Travail minutieux et résultat impeccable.',
          rating: 5,
          created_at: '2024-11-10'
        }
      ]);
    }
  };

  const handleInputChange = (name: string, value: any) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear errors for this field
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };
  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();

    // Validation
    const formErrors = validateStep(3, formData);
    if (!termsAccepted) {
      formErrors.terms = 'Vous devez accepter les conditions générales';
    }

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      setSubmitStatus("error");
      return;
    }

    setLoading(true);
    setErrors({});

    try {
      // GTM/analytics
      trackFormSubmission({
        surface: formData.surface,
        serviceType: formData.serviceType,
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        postalCode: formData.postalCode,
        estimatedValue: calculatePrice(formData)
      });

      // Soumission réelle du formulaire
      const result = await submitForm(formData);

      // Toujours rediriger vers la page de remerciement
      window.location.href = '/thank-you/';
    } catch (error) {
      if (import.meta.env.DEV) {
        console.error('Form submission error:', error);
      }
      setSubmitStatus("error");
      setErrors({ submit: 'Une erreur est survenue lors de l\'envoi. Veuillez réessayer.' });

      // Rediriger vers la page de remerciement après 2 secondes même en cas d'erreur
      setTimeout(() => {
        window.location.href = '/thank-you/';
      }, 2000);
    } finally {
      setLoading(false);
    }
  }

  const renderStars = (rating: number) => {
    return (
      <div className="flex">
        {Array.from({ length: 5 }, (_, i) => i + 1).map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${
              star <= rating
                ? 'text-amber-400 fill-amber-400'
                : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#fafaf8] transition-colors duration-300">
      <Helmet>
        <title>Ponçage et Rénovation de Parquet en Alsace | Les Ponceurs Réunis</title>
        <meta name="author" content="Les Ponceurs Réunis" />
        <meta name="description" content="Experts en ponçage et rénovation de parquets. Découvrez le savoir-faire des Ponceurs Réunis." />
        <meta name="keywords" content="ponçage parquet, vitrification,ténovation d'escalier bois, pose de parquet, devis gratuit, rénovation parquet, Alsace, Strasbourg, Colmar, Mulhouse" />
        <link rel="canonical" href="https://ponceur-parquet.fr/" />

        {/* Open Graph */}
        <meta property="og:title" content="Les Ponceurs Réunis - Experts en Ponçage" />
        <meta property="og:description" content="Experts en ponçage et rénovation de parquets. Découvrez le savoir-faire des Ponceurs Réunis." />
        <meta property="og:url" content="https://ponceur-parquet.fr/" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Les Ponceurs Réunis" />
        <meta property="og:image" content="https://mjuzyqhxifyvebtnlrra.supabase.co/storage/v1/object/public/photos-lpr/IMG_0536.jpg" />
        
        <script type="application/ld+json">
          {JSON.stringify(websiteSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(generateLocalBusinessSchema({
            aggregateRating: { "@type": "AggregateRating", "ratingValue": "4.9", "reviewCount": "150" }
          }))}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(generateBreadcrumbSchema([
            { name: "Accueil", url: "https://ponceur-parquet.fr/" }
          ]))}
        </script>
      </Helmet>

      <Header />

      {/* Bandeau défilant des villes */}
      <div className="relative overflow-hidden bg-gradient-to-r from-[#f1f5f9] to-[#e2e8f0] border-b border-[#d9b45a]/20">
        <div className="flex animate-marquee whitespace-nowrap py-3">
          <div className="flex items-center space-x-8 text-sm font-medium text-gray-900">
            {/* Villes alsaciennes prioritaires */}
            <span className="flex items-center gap-2">
              <div className="w-2 h-2 bg-[#d9b45a] rounded-full"></div>
              <span className="text-[#b8941a] font-semibold">STRASBOURG</span>
            </span>
            <span className="flex items-center gap-2">
              <div className="w-2 h-2 bg-[#d9b45a] rounded-full"></div>
              <span className="text-[#b8941a] font-semibold">MULHOUSE</span>
            </span>
            <span className="flex items-center gap-2">
              <div className="w-2 h-2 bg-[#d9b45a] rounded-full"></div>
              <span className="text-[#b8941a] font-semibold">COLMAR</span>
            </span>
            <span className="flex items-center gap-2">
              <div className="w-2 h-2 bg-[#d9b45a] rounded-full"></div>
              <span className="text-[#b8941a] font-semibold">HAGUENAU</span>
            </span>
            <span className="flex items-center gap-2">
              <div className="w-2 h-2 bg-[#d9b45a] rounded-full"></div>
              <span className="text-[#b8941a] font-semibold">SAINT-LOUIS</span>
            </span>
            <span className="flex items-center gap-2">
              <div className="w-2 h-2 bg-[#d9b45a] rounded-full"></div>
              <span className="text-[#b8941a] font-semibold">LYON</span>
            </span>
            <span className="flex items-center gap-2">
              <div className="w-2 h-2 bg-[#d9b45a] rounded-full"></div>
              <span className="text-[#b8941a] font-semibold">BESANÇON</span>
            </span>
            <span className="flex items-center gap-2">
              <div className="w-2 h-2 bg-[#d9b45a] rounded-full"></div>
              <span className="text-[#b8941a] font-semibold">BEAUNE</span>
            </span>

            {/* Séparateur */}
            <span className="text-gray-900 mx-4">•</span>

            {/* Territoire de Belfort */}
            <span className="text-gray-900">BELFORT</span>

            {/* Moselle */}
            <span className="text-gray-900">METZ</span>
            <span className="text-gray-900">THIONVILLE</span>
            <span className="text-gray-900">FORBACH</span>
            <span className="text-gray-900">SARREGUEMINES</span>
            <span className="text-gray-900">SAINT-AVOLD</span>

            {/* Autres grandes villes Grand Est */}
            <span className="text-gray-900">NANCY</span>
            <span className="text-gray-900">DIJON</span>

            {/* Répétition pour effet continu */}
            <span className="text-gray-900 mx-8">•</span>
            
            {/* Villes alsaciennes (répétition) */}
            <span className="flex items-center gap-2">
              <div className="w-2 h-2 bg-[#d9b45a] rounded-full"></div>
              <span className="text-[#b8941a] font-semibold">STRASBOURG</span>
            </span>
            <span className="flex items-center gap-2">
              <div className="w-2 h-2 bg-[#d9b45a] rounded-full"></div>
              <span className="text-[#b8941a] font-semibold">MULHOUSE</span>
            </span>
            <span className="flex items-center gap-2">
              <div className="w-2 h-2 bg-[#d9b45a] rounded-full"></div>
              <span className="text-[#b8941a] font-semibold">COLMAR</span>
            </span>
            <span className="flex items-center gap-2">
              <div className="w-2 h-2 bg-[#d9b45a] rounded-full"></div>
              <span className="text-[#b8941a] font-semibold">HAGUENAU</span>
            </span>
            <span className="flex items-center gap-2">
              <div className="w-2 h-2 bg-[#d9b45a] rounded-full"></div>
              <span className="text-[#b8941a] font-semibold">SAINT-LOUIS</span>
            </span>
            <span className="flex items-center gap-2">
              <div className="w-2 h-2 bg-[#d9b45a] rounded-full"></div>
              <span className="text-[#b8941a] font-semibold">LYON</span>
            </span>
            <span className="flex items-center gap-2">
              <div className="w-2 h-2 bg-[#d9b45a] rounded-full"></div>
              <span className="text-[#b8941a] font-semibold">BESANÇON</span>
            </span>
            <span className="flex items-center gap-2">
              <div className="w-2 h-2 bg-[#d9b45a] rounded-full"></div>
              <span className="text-[#b8941a] font-semibold">BEAUNE</span>
            </span>
          </div>
        </div>
      </div>

      <AnalysisBanner />

      {/* Hero Section */}
      <section className="relative isolate overflow-hidden flex-1">
        {/* Background */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-[#f5f5f3] via-[#ede7dc] to-[#f5f5f3]" />
          <div className="absolute inset-0 opacity-[0.03] md:opacity-5" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill='%23d9b45a' fill-opacity='0.1' d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/svg%3E")`,
            backgroundSize: '40px 40px',
          }} />
        </div>
        
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-20 min-h-[85vh] sm:min-h-[80vh] flex items-center">
          <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12 w-full overflow-hidden">
            
            {/* Text Content - Left Side */}
            <div className="space-y-4 sm:space-y-6 md:space-y-8 text-center lg:text-left overflow-hidden">

              {/* Main Headline - MOBILE FIRST */}
              <h1 className="max-w-2xl mx-auto lg:mx-0 px-2 sm:px-0">
                <span className="block mb-2 sm:mb-4">
                  <span className="inline text-2xl/tight xs:text-3xl/tight sm:text-4xl/tight md:text-5xl/tight lg:text-6xl/tight font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#b8941a] via-[#d9b45a] to-[#c7a347]" style={{textShadow: '0 2px 10px rgba(217, 180, 90, 0.3)'}}>
                    Les Ponceurs Réunis
                  </span>
                </span>
                <span className="block text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-gray-600 via-gray-800 to-gray-600 leading-tight" style={{textShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'}}>
                  Experts parquet & escaliers bois
                </span>
              </h1>

              {/* Numéros de téléphone - MOBILE PRIORITAIRE */}
              <div className="flex flex-col gap-3 w-full max-w-full overflow-hidden">
                <a
                  href="tel:+33757821306"
                  onClick={() => trackPhoneClick('+33757821306', 'hero_top')}
                  className="w-full inline-flex items-center justify-center gap-2 sm:gap-3 rounded-xl bg-gradient-to-r from-[#b8941a] to-[#c7a347] px-3 sm:px-6 py-4 text-base sm:text-lg font-bold text-white shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 group border-2 border-[#9a7a15]"
                >
                  <Phone className="w-5 h-5 sm:w-6 sm:h-6 group-hover:scale-110 transition-transform flex-shrink-0" />
                  <span className="text-base sm:text-lg md:text-xl whitespace-nowrap">07 57 82 13 06</span>
                </a>
                <a
                  href="https://wa.me/33604440903?text=Bonjour%2C%20j%27aimerais%20un%20diagnostic%20pour%20mon%20parquet"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 sm:gap-3 rounded-xl bg-gradient-to-r from-green-500 to-green-600 px-3 sm:px-6 py-4 text-base sm:text-lg font-bold text-white shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 group border-2 border-green-700"
                >
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 group-hover:scale-110 transition-transform flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                  <span className="text-base sm:text-lg md:text-xl whitespace-nowrap">06 04 44 09 03</span>
                </a>
              </div>

              {/* Bouton Simulateur - MOBILE */}
              <div className="w-full">
                <button
                  onClick={() => setShowModal(true)}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-xl border-2 border-[#d9b45a] bg-white/90 px-3 sm:px-6 py-4 text-base font-bold text-[#b8941a] hover:bg-[#d9b45a]/10 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  <Calculator className="w-5 h-5 flex-shrink-0" />
                  <span className="whitespace-nowrap">Simuler un devis</span>
                </button>
              </div>

              {/* Badge avec logo Marque Alsace */}
              <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 justify-center lg:justify-start flex-wrap">
                <div className="inline-flex items-center gap-2 rounded-full bg-[#d9b45a]/15 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold text-[#a67c1a] backdrop-blur-sm border-2 border-[#d9b45a]/50 shadow-md">
                  <Award className="w-3 h-3 sm:w-4 sm:h-4" />
                  Expert depuis 15 ans
                </div>
                <div className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-sm rounded-lg px-2 sm:px-3 py-1.5 sm:py-2 border-2 border-[#d9b45a]/30 shadow-md">
                  <img
                    src="https://mjuzyqhxifyvebtnlrra.supabase.co/storage/v1/object/public/lpr2/marque-alsace%20.jpg"
                    alt="Marque Alsace - Entreprise locale alsacienne"
                    width="64"
                    height="32"
                    className="h-6 sm:h-8 w-auto object-contain"
                    loading="eager"
                  />
                  <span className="text-[10px] sm:text-xs font-bold text-gray-900 leading-tight">Entreprise<br/>Locale</span>
                </div>

                {/* Lien vers Vidéos & Podcast */}
                <Link
                  to="/youtube"
                  className="group inline-flex items-center gap-2 bg-gradient-to-r from-red-50 to-amber-50 hover:from-red-100 hover:to-amber-100 backdrop-blur-sm rounded-lg px-3 sm:px-4 py-1.5 sm:py-2 border-2 border-red-200 hover:border-red-400 shadow-md hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex items-center gap-1">
                    <PlayCircle className="w-3 h-3 sm:w-4 sm:h-4 text-red-600 group-hover:text-red-700 group-hover:scale-110 transition-transform" />
                    <Headphones className="w-3 h-3 sm:w-4 sm:h-4 text-amber-600 group-hover:text-amber-700 group-hover:scale-110 transition-transform" />
                  </div>
                  <div className="text-left">
                    <span className="text-[10px] sm:text-xs font-bold text-gray-900 leading-tight block">
                      Vidéos & Podcast
                    </span>
                    <span className="text-[8px] sm:text-[10px] text-gray-600 leading-tight block">
                      Conseils d'experts
                    </span>
                  </div>
                  <ChevronRight className="w-3 h-3 text-red-600 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>

              {/* Description */}
              <div className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-800 max-w-2xl mx-auto lg:mx-0 leading-relaxed text-center lg:text-left font-medium px-2 sm:px-0">
                <p>
                  Artisan spécialiste du ponçage et de la rénovation de parquet en Alsace depuis 2008.
                  Notre entreprise familiale basée à Herrlisheim-près-Colmar vous accompagne dans tous vos projets de rénovation :{' '}
                  <span className={`${!isDescriptionExpanded ? 'inline' : 'hidden'}`}>
                    <button
                      onClick={() => setIsDescriptionExpanded(true)}
                      className="text-[#b8941a] hover:text-[#9a7a15] font-semibold inline-flex items-center gap-1 transition-colors"
                      aria-label="Lire la suite"
                    >
                      lire plus
                      <ChevronDown className="w-4 h-4" />
                    </button>
                  </span>
                </p>
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isDescriptionExpanded ? 'max-h-[500px] opacity-100 mt-2' : 'max-h-0 opacity-0'
                  }`}
                >
                  <p>
                    ponçage de parquet massif ou contrecollé, vitrification haute résistance, huilage naturel, traitement des grincements et réparation des dégâts des eaux. Nous intervenons rapidement sur Strasbourg, Colmar, Mulhouse, Sélestat et dans toute l'Alsace dans un rayon de 150 km. Devis gratuit sous 24h, travail soigné et garantie satisfaction.
                  </p>
                  <button
                    onClick={() => setIsDescriptionExpanded(false)}
                    className="text-[#b8941a] hover:text-[#9a7a15] font-semibold inline-flex items-center gap-1 transition-colors mt-2"
                    aria-label="Réduire"
                  >
                    lire moins
                    <ChevronDown className="w-4 h-4 transform rotate-180" />
                  </button>
                </div>
              </div>

              {/* Local Badge */}
              <div className="flex justify-center lg:justify-start px-2 sm:px-0">
                <div className="inline-flex items-center gap-3 px-5 py-3 bg-gradient-to-br from-[#d9b45a]/10 to-transparent border-2 border-[#d9b45a]/30 rounded-xl hover:border-[#d9b45a]/50 transition-all">
                  <MapPin className="w-5 h-5 text-[#d9b45a] flex-shrink-0" />
                  <div className="text-left">
                    <p className="font-bold text-gray-900 text-sm">Entreprise locale artisanale</p>
                    <p className="text-xs text-gray-600">Basée à Herrlisheim-près-Colmar • Intervention 150km</p>
                  </div>
                </div>
              </div>

              {/* Trust Points */}
              <div className="space-y-2 text-center lg:text-left px-2 sm:px-0">
                <div className="flex items-center gap-2 text-gray-800 justify-center lg:justify-start">
                  <div className="w-5 h-5 bg-green-500/20 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-3 h-3 text-green-400" />
                  </div>
                  <span className="text-xs sm:text-sm font-medium">Devis gratuit et sans engagement</span>
                </div>
                <div className="flex items-center gap-2 text-gray-800 justify-center lg:justify-start">
                  <div className="w-5 h-5 bg-green-500/20 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-3 h-3 text-green-400" />
                  </div>
                  <span className="text-xs sm:text-sm font-medium">Réponse sous 24h maximum</span>
                </div>
                <div className="flex items-center gap-2 text-gray-800 justify-center lg:justify-start">
                  <div className="w-5 h-5 bg-green-500/20 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-3 h-3 text-green-400" />
                  </div>
                  <span className="text-xs sm:text-sm font-medium">Savoir-faire artisanal traditionnel</span>
                </div>
              </div>

              {/* Stats */}
              <div className="flex flex-wrap gap-4 sm:gap-6 justify-center lg:justify-start text-xs sm:text-sm px-2 sm:px-0">
                <div className="flex items-center gap-2 text-gray-800">
                  <Star className="w-4 h-4 text-[#b8941a]" />
                  <span>4.9/5 satisfaction</span>
                </div>
                <div className="flex items-center gap-2 text-gray-800">
                  <Users className="w-4 h-4 text-[#b8941a]" />
                  <span>500+ parquets rénovés</span>
                </div>
              </div>

              {/* Team */}
              <div className="flex items-center gap-3 sm:gap-4 justify-center lg:justify-start px-2 sm:px-0">
                <div className="flex -space-x-2">
                  <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-sm border-2 border-[#0f1b2b]">
                    E
                  </div>
                  <div className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center text-white font-bold text-sm border-2 border-[#0f1b2b]">
                    J
                  </div>
                  <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center text-white font-bold text-sm border-2 border-[#0f1b2b]">
                    G
                  </div>
                  <div className="w-10 h-10 rounded-full bg-amber-600 flex items-center justify-center text-white font-bold text-sm border-2 border-[#0f1b2b]">
                    D
                  </div>
                </div>
                <span className="text-gray-800 text-xs sm:text-sm">
                  Notre équipe d'artisans à votre service
                </span>
              </div>
            </div>

            {/* Hero Image - Right Side */}
            <div className="relative flex items-center justify-center lg:justify-end">
              <div className="relative bg-white rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.15)] hover:shadow-[0_25px_80px_rgba(184,148,26,0.25)] transition-all duration-500 overflow-hidden h-[500px] w-full max-w-[416px] lg:h-[650px] lg:max-w-[500px] border-4 border-[#d9b45a]/30 hover:border-[#b8941a]/50 ring-4 ring-[#d9b45a]/10">
                {/* Photo de chantier en arrière-plan */}
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

                {/* Personnage au premier plan */}
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

      {/* Plaquette Download Banner */}
      <section className="py-8 bg-gradient-to-r from-[#d9b45a] via-[#b8941a] to-[#d9b45a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4 text-white">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center flex-shrink-0">
                <Download className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="text-xl md:text-2xl font-bold mb-1">Découvrez notre plaquette commerciale</h3>
                <p className="text-white/90 text-sm md:text-base">Tous nos services et réalisations en un document</p>
              </div>
            </div>
            <a
              href="https://mjuzyqhxifyvebtnlrra.supabase.co/storage/v1/object/public/lpr2/ponceurs_reunis_presentation.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-white text-[#b8941a] px-6 py-3 rounded-xl font-bold hover:scale-105 transition-transform shadow-xl hover:shadow-2xl whitespace-nowrap"
            >
              <Download className="w-5 h-5" />
              Télécharger gratuitement
            </a>
          </div>
        </div>
      </section>

      {/* Expertise Section - Rich Content for SEO */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Votre Expert en Rénovation de Parquet en Alsace
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                Depuis 2008, Les Ponceurs Réunis sont spécialisés dans la rénovation complète de tous types de parquets en Alsace
              </p>
            </div>

            <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
              <p className="text-base leading-relaxed">
                <strong>Les Ponceurs Réunis</strong>, c'est avant tout une <strong>entreprise familiale alsacienne</strong> établie à Herrlisheim-près-Colmar depuis plus de 15 ans. Notre équipe d'artisans qualifiés maîtrise parfaitement l'art de la rénovation de parquet, du simple ponçage à la restauration complète de parquets anciens de caractère.
              </p>

              <p className="text-base leading-relaxed">
                Nous intervenons sur l'ensemble du territoire alsacien : <strong>Strasbourg</strong> et le Bas-Rhin, <strong>Colmar</strong>, <strong>Mulhouse</strong>, <strong>Sélestat</strong>, <strong>Thann</strong>, <strong>Guebwiller</strong> et le Haut-Rhin, mais également à <strong>Belfort</strong> et dans les Vosges. Notre rayon d'intervention de 150 km nous permet d'être réactifs et disponibles rapidement pour tous vos projets de rénovation.
              </p>

              <div className="bg-gradient-to-br from-[#f5f5f3] to-[#ede7dc] rounded-2xl p-8 my-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <Award className="w-7 h-7 text-[#d9b45a]" />
                  Nos Services Professionnels
                </h3>
                <div className="grid md:grid-cols-2 gap-4 text-base">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-[#d9b45a] flex-shrink-0 mt-1" />
                    <div>
                      <strong>Ponçage de parquet massif et contrecollé</strong> : restauration complète avec machines professionnelles de dernière génération
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-[#d9b45a] flex-shrink-0 mt-1" />
                    <div>
                      <strong>Vitrification haute résistance</strong> : finition mate, satinée ou brillante selon vos préférences, pour une protection durable
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-[#d9b45a] flex-shrink-0 mt-1" />
                    <div>
                      <strong>Huilage traditionnel</strong> : traitement naturel à l'huile végétale pour un rendu authentique et écologique
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-[#d9b45a] flex-shrink-0 mt-1" />
                    <div>
                      <strong>Traitement des grincements</strong> : injection spéciale anti-grincement pour un confort acoustique optimal
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-[#d9b45a] flex-shrink-0 mt-1" />
                    <div>
                      <strong>Réparation après dégâts des eaux</strong> : remplacement de lames endommagées et rénovation complète
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-[#d9b45a] flex-shrink-0 mt-1" />
                    <div>
                      <strong>Ponçage d'escalier en bois</strong> : rénovation soignée de vos escaliers avec traitement adapté
                    </div>
                  </div>
                </div>
              </div>

              <p className="text-base leading-relaxed">
                Notre <strong>savoir-faire artisanal traditionnel</strong> combiné à l'utilisation de <strong>matériel professionnel de pointe</strong> nous permet de garantir des résultats d'une qualité exceptionnelle. Chaque chantier est unique et mérite une attention particulière : nous prenons le temps d'analyser votre parquet, de vous conseiller sur la meilleure finition adaptée à votre usage, et de réaliser les travaux dans les règles de l'art.
              </p>

              <p className="text-base leading-relaxed">
                Que vous soyez <strong>particulier</strong> souhaitant rénover le parquet de votre maison ou appartement, <strong>professionnel</strong> gérant un hôtel, restaurant, ou commerce, ou encore <strong>syndic de copropriété</strong>, nous adaptons nos interventions à vos contraintes et à votre budget. Nous intervenons aussi bien pour les <strong>parquets anciens</strong> nécessitant une restauration complète que pour l'<strong>entretien régulier</strong> de parquets récents.
              </p>

              <div className="bg-[#d9b45a]/10 border-l-4 border-[#d9b45a] rounded-r-lg p-6 my-8">
                <p className="text-base leading-relaxed font-medium text-gray-900">
                  <strong>Engagement qualité</strong> : Devis gratuit et détaillé sous 24h maximum, respect strict des délais annoncés, chantier propre et soigné, garantie satisfaction sur tous nos travaux. Notre réputation s'est construite sur plus de 500 parquets rénovés et un taux de satisfaction client de 4.9/5.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quote Form Section - Now Below Hero */}
      <section className="py-16 bg-gradient-to-br from-[#f8f9fa] to-[#e9ecef]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto">
            {/* Quote Form */}
            <div className="bg-white backdrop-blur-xl rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.1)] p-4 sm:p-6 lg:p-8 border border-[#d9b45a]/30 hover:shadow-[0_25px_80px_rgba(217,180,90,0.15)] transition-all duration-500">
              <div className="text-center mb-8">
                <div className="flex items-center justify-center gap-2 sm:gap-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-[#d9b45a] to-[#c4a04f] rounded-xl flex items-center justify-center shadow-lg">
                    <Calculator className="w-6 h-6 text-[#0f1b2b]" />
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
                    Demande de devis gratuit
                  </h2>
                </div>
                <p className="text-gray-800 text-sm sm:text-base font-medium">
                  Estimation personnalisée par un artisan
                </p>
              </div>

              <div className="space-y-4 sm:space-y-6">
                {/* Surface */}
                <div className="space-y-2 sm:space-y-3">
                  <label className="block text-sm sm:text-base font-semibold text-gray-900 mb-2 sm:mb-3 tracking-wide">
                    Surface à traiter (m²) *
                  </label>
                  
                  {/* Simulateur de surface interactif */}
                  <div className="bg-gray-100 rounded-xl sm:rounded-2xl p-4 sm:p-6 border-2 border-gray-400 shadow-md">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm text-gray-600">10 m²</span>
                      <div className="text-center">
                        <div className="text-2xl sm:text-3xl font-bold text-[#b8941a] mb-1">
                          {formData.surface} m²
                        </div>
                        <div className="text-xs text-gray-600">
                          {formData.surface < 30 ? 'Petite pièce' : 
                           formData.surface < 60 ? 'Pièce moyenne' : 
                           formData.surface < 100 ? 'Grande pièce' : 'Maison complète'}
                        </div>
                      </div>
                      <span className="text-sm text-gray-600">200 m²</span>
                    </div>
                    
                    {/* Curseur de réglage */}
                    <div className="relative">
                      <input
                        type="range"
                        min="10"
                        max="200"
                        step="5"
                        value={formData.surface}
                        onChange={(e) => handleInputChange('surface', parseInt(e.target.value))}
                        className="w-full h-3 bg-[#1e293b] rounded-lg appearance-none cursor-pointer slider"
                        style={{
                          background: `linear-gradient(to right, #d9b45a 0%, #d9b45a ${((formData.surface - 10) / (200 - 10)) * 100}%, #1e293b ${((formData.surface - 10) / (200 - 10)) * 100}%, #1e293b 100%)`
                        }}
                      />
                      
                      {/* Graduations */}
                      <div className="flex justify-between text-xs text-gray-600 mt-2">
                        <span>Salon</span>
                        <span>Appartement</span>
                        <span>Maison</span>
                      </div>
                    </div>
                    
                    {/* Input manuel en complément */}
                    <div className="mt-4 flex items-center gap-3">
                      <span className="text-sm text-gray-800">Ou saisissez directement :</span>
                      <input
                        type="number"
                        name="surface"
                        value={formData.surface}
                        onChange={(e) => handleInputChange('surface', e.target.value)}
                        min="10"
                        max="200"
                        className="w-20 px-3 py-2 rounded-lg bg-white border-2 border-gray-400 text-gray-900 text-center focus:border-[#d9b45a] focus:ring-2 focus:ring-[#d9b45a]/30 transition-all shadow-sm"
                      />
                      <span className="text-sm text-gray-800">m²</span>
                    </div>
                  </div>
                  
                </div>

                {/* Property Type */}
                <div className="space-y-3 sm:space-y-4">
                  <label className="block text-sm sm:text-base font-semibold text-gray-900 mb-3 sm:mb-4 tracking-wide">
                    Type de bien *
                  </label>
                  <div className="grid grid-cols-2 gap-2 sm:gap-3">
                    <button
                      type="button"
                      onClick={() => handleInputChange('propertyType', 'maison')}
                      className={`p-3 sm:p-4 rounded-xl sm:rounded-2xl border-2 transition-all duration-300 group hover:scale-105 hover:shadow-lg ${
                        formData.propertyType === 'maison'
                          ? 'border-[#d9b45a] bg-gradient-to-br from-[#d9b45a]/25 to-[#c4a04f]/15 shadow-[0_0_20px_rgba(217,180,90,0.4)]'
                          : 'border-white/20 hover:border-[#d9b45a]/60 bg-[#0f1b2b]/60'
                      }`}
                    >
                      <Home className={`w-6 h-6 sm:w-7 sm:h-7 mx-auto mb-1 sm:mb-2 transition-all duration-300 group-hover:scale-110 ${
                        formData.propertyType === 'maison' ? 'text-[#b8941a]' : 'text-white/70'
                      }`} />
                      <span className={`block text-xs sm:text-sm font-semibold tracking-wide ${
                        formData.propertyType === 'maison' ? 'text-[#b8941a]' : 'text-white/90'
                      }`}>
                        Maison
                      </span>
                    </button>
                    
                    <button
                      type="button"
                      onClick={() => handleInputChange('propertyType', 'appartement')}
                      className={`p-3 sm:p-4 rounded-xl sm:rounded-2xl border-2 transition-all duration-300 group hover:scale-105 hover:shadow-lg ${
                        formData.propertyType === 'appartement'
                          ? 'border-[#d9b45a] bg-gradient-to-br from-[#d9b45a]/25 to-[#c4a04f]/15 shadow-[0_0_20px_rgba(217,180,90,0.4)]'
                          : 'border-white/20 hover:border-[#d9b45a]/60 bg-[#0f1b2b]/60'
                      }`}
                    >
                      <Building className={`w-6 h-6 sm:w-7 sm:h-7 mx-auto mb-1 sm:mb-2 transition-all duration-300 group-hover:scale-110 ${
                        formData.propertyType === 'appartement' ? 'text-[#b8941a]' : 'text-white/70'
                      }`} />
                      <span className={`block text-xs sm:text-sm font-semibold tracking-wide ${
                        formData.propertyType === 'appartement' ? 'text-[#b8941a]' : 'text-white/90'
                      }`}>
                        Appartement
                      </span>
                    </button>
                  </div>
                  {errors.propertyType && (
                    <p className="text-red-400 text-sm">{errors.propertyType}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bouton pour continuer */}
        <div className="mt-6 sm:mt-8 text-center px-4">
          <button
            onClick={() => {
              console.log('Bouton continuer cliqué');
              setShowModal(true);
            }}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-[#0f1b2b] dark:bg-gradient-to-r dark:from-[#d9b45a] dark:to-[#FFD36D] px-6 sm:px-8 py-3 sm:py-4 font-bold text-white dark:text-[#0f1b2b] shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 text-base sm:text-lg border-2 border-[#0f1b2b] dark:border-transparent"
          >
            <Send className="w-5 h-5" />
            Obtenir mon devis gratuit
          </button>
        </div>
      </section>

      {/* Galerie de Chantiers */}
      <section className="py-16 bg-gradient-to-br from-[#ffffff] to-[#f8f9fa]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#d9b45a]/10 rounded-full text-sm font-medium text-[#b8941a] mb-6 border border-[#d9b45a]/20">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Nos chantiers en cours
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Découvrez nos{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d9b45a] via-[#FFD36D] to-[#d9b45a]">
                Réalisations
              </span>
            </h2>
            <p className="text-xl text-gray-800 max-w-3xl mx-auto leading-relaxed">
              Chaque chantier est unique. Découvrez la qualité de notre travail à travers nos dernières interventions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {galleryPhotos.slice(0, 4).map((photo, index) => {
              const titles = [
                'Rénovation Parquet Chêne',
                'Ponçage Sans Poussière', 
                'Escalier Traditionnel',
                'Finition Écologique'
              ];
              const locations = ['Strasbourg', 'Colmar', 'Mulhouse', 'Belfort'];
              const types = ['Rénovation', 'Ponçage', 'Escalier', 'Finition'];
              
              return (
                <div key={index} className="group relative bg-white shadow-lg rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-gray-300 hover:-translate-y-1">
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={photo.url}
                      alt={`${titles[index]} - ${locations[index]}`}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      loading="lazy"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="px-2 py-1 bg-[#d9b45a] text-[#0f1b2b] rounded-full text-xs font-bold">
                          {types[index]}
                        </span>
                        <span className="text-white/80 text-xs">
                          {locations[index]}
                        </span>
                      </div>
                      <h3 className="text-white font-bold text-sm">
                        {titles[index]}
                      </h3>
                      <p className="text-white/80 text-xs mt-1">
                        Les Ponceurs Réunis
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Stats de confiance */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            <div className="text-center p-4 bg-gradient-to-br from-[#eee9df] to-[#f5f0e8] shadow-lg rounded-xl border-2 border-gray-300">
              <div className="text-2xl font-bold text-[#b8941a] mb-1">500+</div>
              <div className="text-sm text-gray-800">Parquets rénovés</div>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-[#eee9df] to-[#f5f0e8] shadow-lg rounded-xl border-2 border-gray-300">
              <div className="text-2xl font-bold text-[#b8941a] mb-1">150+</div>
              <div className="text-sm text-gray-800">Escaliers rénovés</div>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-[#eee9df] to-[#f5f0e8] shadow-lg rounded-xl border-2 border-gray-300">
              <div className="text-2xl font-bold text-[#b8941a] mb-1">98%</div>
              <div className="text-sm text-gray-800">Satisfaction client</div>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-[#eee9df] to-[#f5f0e8] shadow-lg rounded-xl border-2 border-gray-300">
              <div className="text-2xl font-bold text-[#b8941a] mb-1">24h</div>
              <div className="text-sm text-gray-800">Délai de réponse</div>
            </div>
          </div>
        </div>
      </section>

      {/* Section Comparaison Prix */}
      <section className="py-16 bg-gradient-to-br from-[#f8f9fa] to-[#e9ecef]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#d9b45a]/10 rounded-full text-sm font-medium text-[#b8941a] mb-6 border border-[#d9b45a]/20">
              <Calculator className="w-4 h-4" />
              Tarifs transparents
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Rénover coûte{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d9b45a] via-[#FFD36D] to-[#d9b45a]">
                4x moins cher
              </span>
              {' '}que remplacer
            </h2>
            <p className="text-xl text-gray-800 max-w-3xl mx-auto leading-relaxed">
              Économisez jusqu'à 75% en rénovant plutôt qu'en changeant votre parquet
            </p>
          </div>

          {/* Comparaison Rénovation vs Remplacement */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {/* Rénovation */}
            <div className="relative bg-gradient-to-br from-[#d9b45a]/20 to-[#d9b45a]/5 rounded-2xl p-8 border-2 border-[#d9b45a] overflow-hidden">
              <div className="absolute top-4 right-4 bg-[#d9b45a] text-[#0f1b2b] px-3 py-1 rounded-full text-xs font-bold">
                RECOMMANDÉ
              </div>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-[#d9b45a]/20 rounded-xl">
                  <Sparkles className="w-6 h-6 text-[#b8941a]" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Rénovation</h3>
              </div>

              <div className="mb-6">
                <div className="text-4xl font-bold text-[#b8941a] mb-2">42€/m²</div>
                <div className="text-gray-800 font-semibold">Ponçage + Vitrification</div>
              </div>

              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-2 text-gray-900 font-medium">
                  <CheckCircle className="w-5 h-5 text-[#b8941a] mt-0.5 flex-shrink-0" />
                  <span>Conservation de votre parquet authentique</span>
                </li>
                <li className="flex items-start gap-2 text-gray-900 font-medium">
                  <CheckCircle className="w-5 h-5 text-[#b8941a] mt-0.5 flex-shrink-0" />
                  <span>Travaux rapides (1-2 jours pour 50m²)</span>
                </li>
                <li className="flex items-start gap-2 text-gray-900 font-medium">
                  <CheckCircle className="w-5 h-5 text-[#b8941a] mt-0.5 flex-shrink-0" />
                  <span>Pas de dépose ni de gravats</span>
                </li>
                <li className="flex items-start gap-2 text-gray-900 font-medium">
                  <CheckCircle className="w-5 h-5 text-[#b8941a] mt-0.5 flex-shrink-0" />
                  <span>Résultat comme neuf garanti</span>
                </li>
              </ul>

              <div className="bg-gray-100 rounded-xl p-4 border-2 border-gray-300">
                <div className="text-sm text-gray-700 mb-1 font-medium">Exemple pour 50m²</div>
                <div className="text-2xl font-bold text-[#b8941a]">2 100€</div>
              </div>
            </div>

            {/* Remplacement */}
            <div className="relative bg-white/90 rounded-2xl p-8 border border-red-500/30 shadow-lg">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-red-500/20 rounded-xl">
                  <X className="w-6 h-6 text-red-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Remplacement</h3>
              </div>

              <div className="mb-6">
                <div className="text-4xl font-bold text-red-600 mb-2">180€/m²</div>
                <div className="text-gray-700">Parquet neuf + Pose</div>
              </div>

              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-2 text-gray-700">
                  <X className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                  <span>Perte du parquet d'origine</span>
                </li>
                <li className="flex items-start gap-2 text-gray-700">
                  <ChevronRight className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                  <span>Chantier long (4-7 jours pour 50m²)</span>
                </li>
                <li className="flex items-start gap-2 text-gray-700">
                  <ChevronRight className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                  <span>Dépose + évacuation des gravats</span>
                </li>
                <li className="flex items-start gap-2 text-gray-700">
                  <ChevronRight className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                  <span>Coût des matériaux neufs élevé</span>
                </li>
              </ul>

              <div className="bg-red-50 rounded-xl p-4 border border-red-300">
                <div className="text-sm text-gray-700 mb-1">Exemple pour 50m²</div>
                <div className="text-2xl font-bold text-red-600">9 000€</div>
                <div className="text-xs text-red-600 mt-1">+320% par rapport à la rénovation</div>
              </div>
            </div>
          </div>

          {/* Grille tarifaire détaillée */}
          <div className="bg-white/90 rounded-2xl p-8 border border-[#d9b45a]/30 shadow-lg">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Nos tarifs par service
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Ponçage + Vitrification */}
              <div className="bg-gradient-to-br from-[#eee9df] to-[#f5f0e8] rounded-xl p-6 border-2 border-[#d9b45a] hover:border-[#d9b45a] hover:shadow-xl transition-all">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-[#d9b45a]/20 rounded-lg">
                    <Sparkles className="w-5 h-5 text-[#b8941a]" />
                  </div>
                  <h4 className="font-bold text-gray-900">Ponçage + Vitrification</h4>
                </div>
                <div className="text-3xl font-bold text-[#b8941a] mb-2">42€<span className="text-lg">/m²</span></div>
                <p className="text-sm text-gray-700 mb-4">Finition brillante, satinée ou mate</p>
                <div className="space-y-2 text-sm text-gray-800">
                  <div className="flex justify-between">
                    <span>25m²</span>
                    <span className="font-semibold text-[#b8941a]">1 050€</span>
                  </div>
                  <div className="flex justify-between">
                    <span>50m²</span>
                    <span className="font-semibold text-[#b8941a]">2 100€</span>
                  </div>
                  <div className="flex justify-between">
                    <span>100m²</span>
                    <span className="font-semibold text-[#b8941a]">4 200€</span>
                  </div>
                </div>
              </div>

              {/* Ponçage + Huilage */}
              <div className="bg-gradient-to-br from-[#eee9df] to-[#f5f0e8] rounded-xl p-6 border-2 border-[#d9b45a] hover:border-[#d9b45a] hover:shadow-xl transition-all">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-[#d9b45a]/20 rounded-lg">
                    <Droplet className="w-5 h-5 text-[#b8941a]" />
                  </div>
                  <h4 className="font-bold text-gray-900">Ponçage + Huilage</h4>
                </div>
                <div className="text-3xl font-bold text-[#b8941a] mb-2">48€<span className="text-lg">/m²</span></div>
                <p className="text-sm text-gray-700 mb-4">Aspect naturel et chaleureux</p>
                <div className="space-y-2 text-sm text-gray-800">
                  <div className="flex justify-between">
                    <span>25m²</span>
                    <span className="font-semibold text-[#b8941a]">1 200€</span>
                  </div>
                  <div className="flex justify-between">
                    <span>50m²</span>
                    <span className="font-semibold text-[#b8941a]">2 400€</span>
                  </div>
                  <div className="flex justify-between">
                    <span>100m²</span>
                    <span className="font-semibold text-[#b8941a]">4 800€</span>
                  </div>
                </div>
              </div>

              {/* Escaliers */}
              <div className="bg-gradient-to-br from-[#eee9df] to-[#f5f0e8] rounded-xl p-6 border-2 border-[#d9b45a] hover:border-[#d9b45a] hover:shadow-xl transition-all">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-[#d9b45a]/20 rounded-lg">
                    <Home className="w-5 h-5 text-[#b8941a]" />
                  </div>
                  <h4 className="font-bold text-gray-900">Escaliers</h4>
                </div>
                <div className="text-3xl font-bold text-[#b8941a] mb-2">65€<span className="text-lg">/marche</span></div>
                <p className="text-sm text-gray-700 mb-4">Ponçage + finition au choix</p>
                <div className="space-y-2 text-sm text-gray-800">
                  <div className="flex justify-between">
                    <span>10 marches</span>
                    <span className="font-semibold text-[#b8941a]">650€</span>
                  </div>
                  <div className="flex justify-between">
                    <span>15 marches</span>
                    <span className="font-semibold text-[#b8941a]">975€</span>
                  </div>
                  <div className="flex justify-between">
                    <span>20 marches</span>
                    <span className="font-semibold text-[#b8941a]">1 300€</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 text-center">
              <p className="text-sm text-[#9bb0c3] mb-4">
                Prix indicatifs HT sans prise en compte de l'accessibilité. Devis personnalisé gratuit sous 24h.
              </p>
              <div className="flex flex-wrap justify-center gap-3 text-xs text-[#c7d3df]">
                <span className="flex items-center gap-1">
                  <Shield className="w-4 h-4 text-[#b8941a]" />
                  Garantie satisfaction
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4 text-[#b8941a]" />
                  Devis en 24h
                </span>
                <span className="flex items-center gap-1">
                  <CheckCircle className="w-4 h-4 text-[#b8941a]" />
                  Sans engagement
                </span>
              </div>
            </div>
          </div>

          {/* Exemples de projets réels */}
          <div className="mt-12 bg-white/90 rounded-2xl p-8 border border-[#d9b45a]/30 shadow-lg">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Exemples de projets réalisés
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-[#eee9df] to-[#f5f0e8] rounded-xl p-6 border-2 border-[#d9b45a] hover:border-[#d9b45a] hover:shadow-xl transition-all">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[#b8941a] font-semibold">Studio 35m²</span>
                  <span className="text-gray-600 text-sm">Strasbourg</span>
                </div>
                <div className="text-gray-700 text-sm mb-4">
                  Ponçage + Vitrification mat
                </div>
                <div className="text-2xl font-bold text-[#b8941a]">1 470€</div>
                <div className="text-xs text-gray-600 mt-1">Durée: 1 jour</div>
              </div>

              <div className="bg-gradient-to-br from-[#eee9df] to-[#f5f0e8] rounded-xl p-6 border-2 border-[#d9b45a] hover:border-[#d9b45a] hover:shadow-xl transition-all">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[#b8941a] font-semibold">Appartement 75m²</span>
                  <span className="text-gray-600 text-sm">Colmar</span>
                </div>
                <div className="text-gray-700 text-sm mb-4">
                  Ponçage + Huilage + Escalier 12 marches
                </div>
                <div className="text-2xl font-bold text-[#b8941a]">4 380€</div>
                <div className="text-xs text-gray-600 mt-1">Durée: 3 jours</div>
              </div>

              <div className="bg-gradient-to-br from-[#eee9df] to-[#f5f0e8] rounded-xl p-6 border-2 border-[#d9b45a] hover:border-[#d9b45a] hover:shadow-xl transition-all">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[#b8941a] font-semibold">Maison 120m²</span>
                  <span className="text-gray-600 text-sm">Mulhouse</span>
                </div>
                <div className="text-gray-700 text-sm mb-4">
                  Ponçage + Vitrification satiné + Escalier 15 marches
                </div>
                <div className="text-2xl font-bold text-[#b8941a]">6 015€</div>
                <div className="text-xs text-gray-600 mt-1">Durée: 4 jours</div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center mt-12">
            <button
              onClick={() => setShowModal(true)}
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#0f1b2b] dark:bg-[#d9b45a] text-white dark:text-[#0f1b2b] rounded-xl font-semibold text-lg hover:bg-[#1a2537] dark:hover:bg-[#c7a347] transition-all duration-300 hover:scale-105 shadow-xl border-2 border-[#0f1b2b] dark:border-transparent"
            >
              <Calculator className="w-5 h-5" />
              Obtenir mon devis gratuit
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Analyse Gratuite Section */}
      <section className="py-16 bg-gradient-to-br from-green-50 to-emerald-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border-2 border-green-200">
            <div className="grid md:grid-cols-2 gap-0">
              <div className="bg-gradient-to-br from-green-500 to-emerald-600 text-white p-8 md:p-12 flex flex-col justify-center">
                <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-bold mb-6 self-start">
                  <Sparkles className="w-4 h-4" />
                  Nouveau Service
                </div>

                <h2 className="text-3xl md:text-5xl font-bold mb-6">
                  Diagnostic Gratuit de Votre Parquet par Photo
                </h2>

                <p className="text-xl mb-8 opacity-95 leading-relaxed">
                  Vous ne savez pas si votre parquet peut être rénové ? Envoyez-nous 2 photos sur WhatsApp et recevez un diagnostic professionnel gratuit en 2 heures.
                </p>

                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-6 h-6 flex-shrink-0" />
                    <span className="text-lg">État général du parquet</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-6 h-6 flex-shrink-0" />
                    <span className="text-lg">Faisabilité du ponçage</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-6 h-6 flex-shrink-0" />
                    <span className="text-lg">Estimation de prix indicatif</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="w-6 h-6 flex-shrink-0" />
                    <span className="text-lg font-bold">Réponse sous 2h</span>
                  </div>
                </div>

                <Link
                  to="/analyse-parquet-gratuite"
                  className="inline-flex items-center gap-3 bg-white text-green-600 px-8 py-4 rounded-xl font-bold text-lg shadow-2xl hover:scale-105 transition-all duration-300 group self-start"
                >
                  En savoir plus
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>

              <div className="bg-gray-50 p-8 md:p-12 flex items-center justify-center">
                <div className="text-center max-w-md">
                  <div className="bg-white rounded-2xl p-8 shadow-xl mb-6">
                    <div className="w-24 h-24 bg-gradient-to-br from-green-100 to-emerald-200 rounded-full flex items-center justify-center mx-auto mb-6">
                      <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Simple et Rapide</h3>
                    <p className="text-gray-600 leading-relaxed mb-6">
                      Prenez 2 photos de votre parquet avec votre smartphone et envoyez-les sur WhatsApp. Notre expert vous répond rapidement avec un diagnostic complet.
                    </p>
                    <div className="inline-flex items-center gap-2 text-green-600 font-semibold">
                      <Award className="w-5 h-5" />
                      100% Gratuit & Sans Engagement
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div className="bg-white rounded-xl p-4 shadow">
                      <div className="text-3xl font-bold text-green-600 mb-1">1</div>
                      <div className="text-xs text-gray-600">Photo</div>
                    </div>
                    <div className="bg-white rounded-xl p-4 shadow">
                      <div className="text-3xl font-bold text-green-600 mb-1">2h</div>
                      <div className="text-xs text-gray-600">Réponse</div>
                    </div>
                    <div className="bg-white rounded-xl p-4 shadow">
                      <div className="text-3xl font-bold text-green-600 mb-1">0€</div>
                      <div className="text-xs text-gray-600">Gratuit</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Témoignages Clients */}
      <section id="avis" className="py-16 bg-gradient-to-br from-[#ffffff] to-[#f8f9fa]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#d9b45a]/10 rounded-full text-sm font-medium text-[#b8941a] mb-6 border border-[#d9b45a]/20">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              Témoignages clients
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Ce que disent nos{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d9b45a] via-[#FFD36D] to-[#d9b45a]">
                Clients
              </span>
            </h2>
            <p className="text-xl text-gray-800 max-w-3xl mx-auto leading-relaxed">
              Découvrez les retours d'expérience de nos clients satisfaits
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {reviews.map((review, index) => (
              <div key={review.id} className="bg-gradient-to-br from-[#eee9df] to-[#f5f0e8] shadow-lg backdrop-blur-lg rounded-xl p-6 border-2 border-gray-300 hover:border-[#d9b45a]/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                <div className="flex items-center gap-1 mb-4">
                  {Array.from({ length: 5 }, (_, i) => i + 1).map((star) => (
                    <svg
                      key={star}
                      className={`w-5 h-5 ${
                        star <= review.rating
                          ? 'text-[#b8941a] fill-[#b8941a]'
                          : 'text-gray-600'
                      }`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {review.title}
                </h3>
                
                <p className="text-gray-800 mb-4 leading-relaxed">
                  {review.content}
                </p>
                
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-[#b8941a]">
                      {review.name}
                    </div>
                    <div className="text-sm text-gray-600">
                      {new Date(review.created_at).toLocaleDateString('fr-FR', { 
                        month: 'long', 
                        year: 'numeric' 
                      })}
                    </div>
                  </div>
                  
                  {/* Badge équipe si mentionnée */}
                  {review.content.includes('Julien') && (
                    <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded-full text-xs font-medium border border-green-500/30">
                      Équipe Julien
                    </span>
                  )}
                  {review.content.includes('Gerard') && (
                    <span className="px-2 py-1 bg-purple-500/20 text-purple-400 rounded-full text-xs font-medium border border-purple-500/30">
                      Équipe Gerard
                    </span>
                  )}
                  {review.content.includes('Dylan') && (
                    <span className="px-2 py-1 bg-amber-500/20 text-amber-400 rounded-full text-xs font-medium border border-amber-500/30">
                      Équipe Dylan
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* CTA vers page avis */}
          <div className="text-center mt-12">
            <Link
              to="/reviews"
              className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-[#0f1b2b] dark:bg-gradient-to-r dark:from-[#d9b45a] dark:to-[#FFD36D] text-white dark:text-[#0f1b2b] rounded-xl font-bold shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 text-base sm:text-lg border-2 border-[#0f1b2b] dark:border-transparent"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              Voir tous les avis clients
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      <Footer />

      {/* Modal de devis */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-2xl w-full max-w-2xl max-h-[95vh] sm:max-h-[90vh] overflow-y-auto border border-secondary-200">
            <div className="p-4 sm:p-6 border-b border-secondary-200">
              <div className="flex items-center justify-between">
                <h2 className="text-lg sm:text-2xl font-bold text-secondary-900">
                  Finaliser ma demande de devis
                </h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="p-2 hover:bg-secondary-100 rounded-full transition-colors"
                >
                  <X className="w-6 h-6 text-secondary-500" />
                </button>
              </div>
            </div>
            
            <form onSubmit={onSubmit} className="p-4 sm:p-6 space-y-4 sm:space-y-6">
              {/* Détails du projet */}
              <div className="bg-secondary-50 rounded-lg p-3 sm:p-4">
                <h3 className="font-semibold text-secondary-900 mb-3 text-sm sm:text-base">
                  Détails de votre projet
                </h3>

                <div className="space-y-4">
                  {/* Surface à traiter */}
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-secondary-700 mb-2">
                      Surface à traiter (m²) *
                    </label>
                    <div className="flex items-center gap-3">
                      <input
                        type="number"
                        value={formData.surface}
                        onChange={(e) => handleInputChange('surface', parseInt(e.target.value) || 25)}
                        min="10"
                        max="500"
                        className="w-32 px-3 sm:px-4 py-2 sm:py-3 rounded-lg border-2 border-secondary-300 focus:border-primary-500 focus:ring-0 transition-colors bg-white text-secondary-900 text-sm sm:text-base font-semibold"
                        required
                      />
                      <span className="text-sm text-secondary-600">m²</span>
                      <span className="text-xs text-secondary-500 ml-auto">
                        {formData.surface < 30 ? 'Petite pièce' :
                         formData.surface < 60 ? 'Pièce moyenne' :
                         formData.surface < 100 ? 'Grande pièce' : 'Maison complète'}
                      </span>
                    </div>
                  </div>

                  {/* Type de prestation */}
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-secondary-700 mb-2">
                      Type de prestation (facultatif)
                    </label>
                    <select
                      value={formData.serviceType}
                      onChange={(e) => handleInputChange('serviceType', e.target.value)}
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg border-2 border-secondary-300 focus:border-primary-500 focus:ring-0 transition-colors bg-white text-secondary-900 text-sm sm:text-base"
                    >
                      <option value="poncage_vitrification">Ponçage et vitrification</option>
                      <option value="poncage_huilage">Ponçage et huilage</option>
                      <option value="vitrification_seule">Vitrification seule</option>
                      <option value="huilage_seul">Huilage seul</option>
                      <option value="renovation_complete">Rénovation complète</option>
                      <option value="entretien">Entretien</option>
                      <option value="reparation">Réparation</option>
                      <option value="autre">Autre</option>
                    </select>
                  </div>

                  {/* Prix estimé */}
                  <div className="pt-3 border-t border-secondary-200">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-secondary-600">Prix estimé :</span>
                      <span className={`font-bold text-lg sm:text-xl text-primary-600 ${formSubmitted ? '' : 'blur-sm'}`}>
                        {calculatePrice(formData)} €
                      </span>
                    </div>
                    <p className="text-xs text-secondary-500 mt-1">
                      Type de bien : {formData.propertyType === 'maison' ? 'Maison' : 'Appartement'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Coordonnées */}
              <div className="space-y-3 sm:space-y-4">
                <h3 className="text-base sm:text-lg font-semibold text-secondary-900">
                  Vos coordonnées
                </h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-secondary-700 mb-1 sm:mb-2">
                      Nom complet *
                    </label>
                    <input
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => handleInputChange('fullName', e.target.value)}
                     className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg border-2 border-secondary-200 focus:border-primary-500 focus:ring-0 transition-colors bg-white text-secondary-900 text-sm sm:text-base"
                      placeholder="Jean Dupont"
                      required
                    />
                   {errors.fullName && (
                     <p className="text-red-400 text-sm mt-1">{errors.fullName}</p>
                   )}
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-secondary-700 mb-1 sm:mb-2">
                      Téléphone *
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                     className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg border-2 border-secondary-200 focus:border-primary-500 focus:ring-0 transition-colors bg-white text-secondary-900 text-sm sm:text-base"
                      placeholder="06 12 34 56 78"
                      required
                    />
                   {errors.phone && (
                     <p className="text-red-400 text-sm mt-1">{errors.phone}</p>
                   )}
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-secondary-700 mb-1 sm:mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                     className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg border-2 border-secondary-200 focus:border-primary-500 focus:ring-0 transition-colors bg-white text-secondary-900 text-sm sm:text-base"
                      placeholder="jean.dupont@email.com"
                      required
                    />
                   {errors.email && (
                     <p className="text-red-400 text-sm mt-1">{errors.email}</p>
                   )}
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-secondary-700 mb-1 sm:mb-2">
                      Code postal *
                    </label>
                    <input
                      type="text"
                      value={formData.postalCode}
                      onChange={(e) => handleInputChange('postalCode', e.target.value)}
                     className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg border-2 border-secondary-200 focus:border-primary-500 focus:ring-0 transition-colors bg-white text-secondary-900 text-sm sm:text-base"
                      placeholder="75001"
                      required
                    />
                   {errors.postalCode && (
                     <p className="text-red-400 text-sm mt-1">{errors.postalCode}</p>
                   )}
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-secondary-700 mb-1 sm:mb-2">
                      Numéro de rue
                    </label>
                    <input
                      type="text"
                      value={formData.streetNumber || ''}
                      onChange={(e) => handleInputChange('streetNumber', e.target.value)}
                     className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg border-2 border-secondary-200 focus:border-primary-500 focus:ring-0 transition-colors bg-white text-secondary-900 text-sm sm:text-base"
                      placeholder="123"
                    />
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-secondary-700 mb-1 sm:mb-2">
                      Nom de rue
                    </label>
                    <input
                      type="text"
                      value={formData.streetName || ''}
                      onChange={(e) => handleInputChange('streetName', e.target.value)}
                     className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg border-2 border-secondary-200 focus:border-primary-500 focus:ring-0 transition-colors bg-white text-secondary-900 text-sm sm:text-base"
                      placeholder="Rue des Artisans"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs sm:text-sm font-medium text-secondary-700 mb-1 sm:mb-2">
                      Commune
                    </label>
                    <input
                      type="text"
                      value={formData.city || ''}
                      onChange={(e) => handleInputChange('city', e.target.value)}
                     className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg border-2 border-secondary-200 focus:border-primary-500 focus:ring-0 transition-colors bg-secondary-50 text-secondary-900 text-sm sm:text-base"
                      placeholder="Strasbourg"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-medium text-secondary-700 mb-1 sm:mb-2">
                    Message (optionnel)
                  </label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    rows={4}
                   className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg border-2 border-secondary-200 focus:border-primary-500 focus:ring-0 transition-colors bg-white text-secondary-900 resize-none text-sm sm:text-base"
                    placeholder="Décrivez votre projet..."
                  />
                </div>

                {/* Conditions générales */}
                <div className="flex items-start gap-2 sm:gap-3">
                  <input
                    type="checkbox"
                    id="terms"
                    checked={termsAccepted}
                    onChange={(e) => setTermsAccepted(e.target.checked)}
                    className="mt-0.5 sm:mt-1 h-4 w-4 text-primary-600 focus:ring-primary-500 rounded border-secondary-300"
                    required
                  />
                  <label htmlFor="terms" className="text-xs sm:text-sm text-secondary-600">
                    J'accepte les conditions générales et la politique de confidentialité *
                  </label>
                </div>
              </div>

              {/* Bouton de soumission */}
              <button
                type="submit"
                disabled={loading || !termsAccepted}
                className="w-full px-4 sm:px-6 py-3 sm:py-4 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm sm:text-base"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Envoi en cours...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Envoyer ma demande
                  </>
                )}
              </button>

              {/* Messages de statut */}
              {submitStatus === "sent" && (
                <div className="space-y-4">
                  <div className="p-3 sm:p-4 bg-green-50 text-green-600 rounded-lg text-sm sm:text-base">
                    <p className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5" />
                      Votre demande a été envoyée avec succès !
                    </p>
                  </div>
                  <div className="p-4 bg-gradient-to-r from-[#d9b45a]/10 to-[#b8941a]/10 border-2 border-[#d9b45a] rounded-lg">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-[#d9b45a] to-[#b8941a] rounded-lg flex items-center justify-center">
                        <Download className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-gray-900 mb-1">En attendant notre réponse...</h4>
                        <p className="text-sm text-gray-700 mb-3">
                          Découvrez notre plaquette commerciale avec tous nos services et réalisations.
                        </p>
                        <a
                          href="https://mjuzyqhxifyvebtnlrra.supabase.co/storage/v1/object/public/lpr2/ponceurs_reunis_presentation.pdf"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 bg-gradient-to-r from-[#d9b45a] to-[#b8941a] text-white px-5 py-2.5 rounded-lg font-semibold hover:scale-105 transition-transform shadow-md"
                        >
                          <Download className="w-5 h-5" />
                          Télécharger la plaquette PDF
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {submitStatus === "error" && (
                <div className="p-3 sm:p-4 bg-red-50 text-red-600 rounded-lg text-sm sm:text-base">
                  <p>Une erreur est survenue. Veuillez réessayer.</p>
                </div>
              )}
            </form>
          </div>
        </div>
      )}
    </div>
  );
}