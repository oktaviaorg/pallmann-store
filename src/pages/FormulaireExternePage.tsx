import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate, Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { supabase } from '../lib/supabase';
import { Send, CheckCircle, Home, Package, Clock, Phone, Mail, MessageSquare, Calculator, ArrowLeft, MessageCircle } from 'lucide-react';

const FormulaireExternePage: React.FC = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [formData, setFormData] = useState({
    service: '',
    surface: '',
    city: '',
    delay: '',
    housing: '',
    phone: '',
    email: '',
    message: ''
  });

  const services = [
    { value: 'poncage', label: 'Ponçage de parquet' },
    { value: 'vitrification', label: 'Vitrification' },
    { value: 'huilage', label: 'Huilage' },
    { value: 'renovation-complete', label: 'Rénovation complète' },
    { value: 'pose-parquet', label: 'Pose de parquet' },
    { value: 'reparation', label: 'Réparation de parquet' }
  ];

  const delays = [
    { value: 'urgent', label: 'Urgent (moins de 2 semaines)' },
    { value: '1-mois', label: 'Dans le mois' },
    { value: '1-3-mois', label: '1 à 3 mois' },
    { value: 'flexible', label: 'Flexible' }
  ];

  const housingTypes = [
    { value: 'appartement', label: 'Appartement' },
    { value: 'maison', label: 'Maison' },
    { value: 'commerce', label: 'Commerce' },
    { value: 'bureau', label: 'Bureau' }
  ];

  const calculateEstimate = (service: string, surface: number): { min: number; max: number } => {
    const rates: { [key: string]: { min: number; max: number } } = {
      'poncage': { min: 25, max: 35 },
      'vitrification': { min: 15, max: 25 },
      'huilage': { min: 20, max: 30 },
      'renovation-complete': { min: 42, max: 55 },
      'pose-parquet': { min: 35, max: 50 },
      'reparation': { min: 40, max: 60 }
    };

    const rate = rates[service] || { min: 30, max: 45 };
    return {
      min: Math.round(rate.min * surface),
      max: Math.round(rate.max * surface)
    };
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const surface = parseInt(formData.surface);
      const estimate = formData.service && formData.surface
        ? calculateEstimate(formData.service, surface)
        : { min: 0, max: 0 };

      const leadData = {
        service: formData.service,
        surface: surface,
        city: formData.city,
        delay: formData.delay,
        housing: formData.housing,
        phone: formData.phone || null,
        email: formData.email || null,
        message: formData.message || null,
        estimate_min: estimate.min,
        estimate_max: estimate.max,
        source: 'formulaire-externe',
        page: window.location.pathname,
        utm: {
          utm_source: new URLSearchParams(window.location.search).get('utm_source'),
          utm_medium: new URLSearchParams(window.location.search).get('utm_medium'),
          utm_campaign: new URLSearchParams(window.location.search).get('utm_campaign')
        }
      };

      const { error } = await supabase
        .from('google_ads_leads')
        .insert([leadData]);

      if (error) throw error;

      setSubmitSuccess(true);

      if (typeof window !== 'undefined' && window.dataLayer) {
        window.dataLayer.push({
          event: 'conversion',
          send_to: 'AW-CONVERSION_ID/CONVERSION_LABEL',
          event_category: 'formulaire',
          event_label: 'formulaire-externe'
        });
      }
    } catch (error) {
      console.error('Erreur lors de la soumission:', error);
      alert('Une erreur est survenue. Veuillez réessayer ou nous contacter par téléphone.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWhatsAppContact = () => {
    const whatsappNumber = '33757821306';
    const message = encodeURIComponent(
      "Bonjour, je viens d'envoyer une demande de devis via votre formulaire. Pouvez-vous me confirmer sa réception ?"
    );
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
  };

  const estimate = formData.service && formData.surface
    ? calculateEstimate(formData.service, parseInt(formData.surface) || 0)
    : null;

  return (
    <>
      <Helmet>
        <title>Demande de Devis Parquet - Formulaire Rapide | Les Ponceurs Réunis</title>
        <meta
          name="description"
          content="Demandez votre devis gratuit pour la rénovation ou pose de parquet. Réponse rapide sous 24h. Service professionnel dans le Grand Est."
        />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <Header />

        <main className="flex-grow bg-gradient-to-b from-gray-50 to-white py-12">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

            {!submitSuccess ? (
              <>
                <div className="text-center mb-10">
                  <h1 className="text-4xl font-bold text-gray-900 mb-4">
                    Demande de Devis Gratuit
                  </h1>
                  <p className="text-xl text-gray-600">
                    Remplissez ce formulaire et recevez une estimation sous 24h
                  </p>
                </div>

                <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
                  <form onSubmit={handleSubmit} className="space-y-6">

                    <div>
                      <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                        <Package className="w-5 h-5 text-[#d9b45a]" />
                        Service souhaité *
                      </label>
                      <select
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d9b45a] focus:border-transparent transition-all"
                      >
                        <option value="">Sélectionnez un service</option>
                        {services.map(service => (
                          <option key={service.value} value={service.value}>
                            {service.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                        <Calculator className="w-5 h-5 text-[#d9b45a]" />
                        Surface à traiter (m²) *
                      </label>
                      <input
                        type="number"
                        name="surface"
                        value={formData.surface}
                        onChange={handleChange}
                        required
                        min="1"
                        placeholder="Ex: 45"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d9b45a] focus:border-transparent transition-all"
                      />
                    </div>

                    {estimate && (
                      <div className="bg-gradient-to-r from-[#d9b45a]/10 to-[#c4a04f]/10 rounded-xl p-4 border-l-4 border-[#d9b45a]">
                        <p className="text-sm font-semibold text-gray-700 mb-1">
                          💰 Estimation indicative
                        </p>
                        <p className="text-2xl font-bold text-[#b8941a]">
                          {estimate.min.toLocaleString('fr-FR')} € - {estimate.max.toLocaleString('fr-FR')} €
                        </p>
                        <p className="text-xs text-gray-600 mt-1">
                          Prix estimatif HT. Le devis final sera établi après visite.
                        </p>
                      </div>
                    )}

                    <div>
                      <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                        <Home className="w-5 h-5 text-[#d9b45a]" />
                        Ville *
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        required
                        placeholder="Ex: Strasbourg"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d9b45a] focus:border-transparent transition-all"
                      />
                    </div>

                    <div>
                      <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                        <Clock className="w-5 h-5 text-[#d9b45a]" />
                        Délai souhaité *
                      </label>
                      <select
                        name="delay"
                        value={formData.delay}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d9b45a] focus:border-transparent transition-all"
                      >
                        <option value="">Sélectionnez un délai</option>
                        {delays.map(delay => (
                          <option key={delay.value} value={delay.value}>
                            {delay.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                        <Home className="w-5 h-5 text-[#d9b45a]" />
                        Type de logement *
                      </label>
                      <select
                        name="housing"
                        value={formData.housing}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d9b45a] focus:border-transparent transition-all"
                      >
                        <option value="">Sélectionnez un type</option>
                        {housingTypes.map(type => (
                          <option key={type.value} value={type.value}>
                            {type.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                          <Phone className="w-5 h-5 text-[#d9b45a]" />
                          Téléphone *
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          required
                          placeholder="06 12 34 56 78"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d9b45a] focus:border-transparent transition-all"
                        />
                      </div>

                      <div>
                        <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                          <Mail className="w-5 h-5 text-[#d9b45a]" />
                          Email
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="votre@email.fr"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d9b45a] focus:border-transparent transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                        <MessageSquare className="w-5 h-5 text-[#d9b45a]" />
                        Message complémentaire
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={4}
                        placeholder="Décrivez votre projet, vos contraintes particulières..."
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d9b45a] focus:border-transparent transition-all resize-none"
                      />
                    </div>

                    <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                      <p className="text-sm text-blue-800">
                        <strong>Protection des données :</strong> Vos informations sont sécurisées et ne seront utilisées que pour traiter votre demande.
                        Vous pouvez consulter notre <a href="/politique-confidentialite" className="underline">politique de confidentialité</a>.
                      </p>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-[#d9b45a] to-[#b8941a] text-white py-4 px-6 rounded-lg font-bold text-lg hover:from-[#b8941a] hover:to-[#d9b45a] transform hover:scale-[1.02] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
                          Envoi en cours...
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5" />
                          Envoyer ma demande
                        </>
                      )}
                    </button>
                  </form>
                </div>

                <div className="bg-gradient-to-r from-gray-50 to-white rounded-xl p-6 border border-gray-200">
                  <h3 className="font-bold text-gray-900 mb-3">Pourquoi choisir Les Ponceurs Réunis ?</h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>Réponse sous 24h avec estimation de prix</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>Plus de 20 ans d'expérience dans le Grand Est</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>Machines professionnelles Pallmann</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>Devis gratuit et sans engagement</span>
                    </li>
                  </ul>
                </div>
              </>
            ) : (
              <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-12 h-12 text-green-600" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Demande envoyée avec succès !
                </h2>
                <p className="text-lg text-gray-600 mb-8">
                  Nous avons bien reçu votre demande. Notre équipe vous contactera sous 24h pour établir un devis précis.
                </p>

                <div className="space-y-4 max-w-md mx-auto">
                  <button
                    onClick={handleWhatsAppContact}
                    className="w-full bg-[#25D366] hover:bg-[#20BD5A] text-white py-4 px-6 rounded-lg font-semibold text-lg transition-all transform hover:scale-105 flex items-center justify-center gap-3 shadow-lg"
                  >
                    <MessageCircle className="w-6 h-6" />
                    Contacter via WhatsApp
                  </button>

                  <Link
                    to="/"
                    className="w-full bg-gradient-to-r from-[#d9b45a] to-[#b8941a] hover:from-[#b8941a] hover:to-[#d9b45a] text-white py-4 px-6 rounded-lg font-semibold text-lg transition-all transform hover:scale-105 flex items-center justify-center gap-3 shadow-lg"
                  >
                    <Home className="w-6 h-6" />
                    Retour à l'accueil
                  </Link>

                  <Link
                    to="/services"
                    className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-6 rounded-lg font-medium transition-all flex items-center justify-center gap-2"
                  >
                    <ArrowLeft className="w-5 h-5" />
                    Découvrir nos services
                  </Link>
                </div>

                <div className="mt-8 pt-8 border-t border-gray-200">
                  <p className="text-sm text-gray-600 mb-3">
                    <strong className="text-gray-900">Besoin d'aide immédiate ?</strong>
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center items-center text-sm">
                    <a
                      href="tel:+33757821306"
                      className="flex items-center gap-2 text-[#d9b45a] hover:text-[#b8941a] font-semibold"
                    >
                      <Phone className="w-4 h-4" />
                      07 57 82 13 06
                    </a>
                    <span className="hidden sm:inline text-gray-400">•</span>
                    <a
                      href="mailto:contact@poncages.fr"
                      className="flex items-center gap-2 text-[#d9b45a] hover:text-[#b8941a] font-semibold"
                    >
                      <Mail className="w-4 h-4" />
                      contact@poncages.fr
                    </a>
                  </div>
                </div>
              </div>
            )}

          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default FormulaireExternePage;
