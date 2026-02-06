import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { CheckCircle, AlertTriangle, Home, Shield, Clock, Send, X } from 'lucide-react';
import { submitForm, validateStep } from '../utils/form';
import { FormData } from '../types/form';

const ParquetPosePage: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    surface: 25,
    serviceType: 'pose_parquet',
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
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [termsAccepted, setTermsAccepted] = useState(false);

  const handleInputChange = (name: string, value: any) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
      await submitForm(formData);
      window.location.href = '/thank-you/';
    } catch (error) {
      setSubmitStatus("error");
      setErrors({ submit: 'Une erreur est survenue lors de l\'envoi. Veuillez réessayer.' });
      setTimeout(() => {
        window.location.href = '/thank-you/';
      }, 2000);
    } finally {
      setLoading(false);
    }
  };

  const galleryImages = [
    {
      url: 'https://mjuzyqhxifyvebtnlrra.supabase.co/storage/v1/object/public/photos-lpr/IMG_0536.jpg',
      title: 'Pose de parquet chêne massif',
      description: 'Installation professionnelle sur chape'
    },
    {
      url: 'https://mjuzyqhxifyvebtnlrra.supabase.co/storage/v1/object/public/lpr2/Huningue%20(3).jpg',
      title: 'Parquet contrecollé',
      description: 'Pose flottante avec isolation phonique'
    },
    {
      url: 'https://mjuzyqhxifyvebtnlrra.supabase.co/storage/v1/object/public/lpr2/Hotel%20de%20Thann.jpg',
      title: 'Finition impeccable',
      description: 'Parquet posé et vitrifié'
    }
  ];

  return (
    <>
      <Helmet>
        <title>Pose de Parquet Neuf - Quand le Ponçage est Impossible | Les Ponceurs Réunis</title>
        <meta name="description" content="Votre parquet ne peut pas être poncé ? Découvrez nos solutions de pose de parquet neuf. Expert en Alsace depuis 2008. Devis gratuit sous 24h." />
        <link rel="canonical" href="https://ponceur-parquet.fr/services/pose-parquet" />
        <meta property="og:title" content="Pose de Parquet Neuf - Quand le Ponçage est Impossible" />
        <meta property="og:description" content="Solutions professionnelles de pose de parquet neuf en Alsace. Devis gratuit." />
        <meta property="og:url" content="https://ponceur-parquet.fr/services/pose-parquet" />
        <meta property="og:type" content="website" />
      </Helmet>

      <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 via-white to-gray-100">
        <Header />

        <main className="flex-grow pt-24 pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#d9b45a]/10 rounded-full text-sm font-medium text-[#b8941a] mb-6 border border-[#d9b45a]/20">
                <Home className="w-4 h-4" />
                Service spécialisé
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Pose de <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d9b45a] via-[#b8941a] to-[#d9b45a]">Parquet Neuf</span>
              </h1>
              <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
                Quand le ponçage n'est plus possible, nous vous proposons des solutions de pose de parquet adaptées à votre situation.
              </p>
            </div>

            <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-l-4 border-amber-500 p-6 rounded-lg mb-12 shadow-md">
              <div className="flex items-start gap-4">
                <AlertTriangle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    Quand le ponçage devient impossible
                  </h3>
                  <p className="text-gray-700 mb-3">
                    Certains parquets ne peuvent pas être rénovés par ponçage. Voici les principaux cas :
                  </p>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                      <span><strong>Parquet stratifié :</strong> Impossible à poncer car la couche décorative est trop fine</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                      <span><strong>Parquet trop fin :</strong> Épaisseur de bois noble insuffisante (moins de 2,5mm)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                      <span><strong>Dégradation importante :</strong> Lames abîmées, déformées ou pourries</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                      <span><strong>Parquet déjà poncé plusieurs fois :</strong> Plus assez d'épaisseur pour un nouveau ponçage</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <section className="mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                Nos solutions de <span className="text-[#b8941a]">pose de parquet</span>
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="bg-gradient-to-br from-[#eee9df] to-[#f5f0e8] rounded-2xl p-8 border-2 border-gray-200 hover:border-[#d9b45a] transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                  <div className="mb-6 flex justify-center">
                    <Home className="w-12 h-12 text-[#b8941a]" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">
                    Parquet Massif
                  </h3>
                  <p className="text-gray-700 mb-6 text-center">
                    Pose collée ou clouée de parquet en bois massif. Authenticité et durabilité garanties pour des décennies.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2 text-gray-600 text-sm">
                      <CheckCircle className="w-5 h-5 text-[#d9b45a] flex-shrink-0 mt-0.5" />
                      <span>Chêne, châtaignier, hêtre</span>
                    </li>
                    <li className="flex items-start gap-2 text-gray-600 text-sm">
                      <CheckCircle className="w-5 h-5 text-[#d9b45a] flex-shrink-0 mt-0.5" />
                      <span>Épaisseur 14-23mm</span>
                    </li>
                    <li className="flex items-start gap-2 text-gray-600 text-sm">
                      <CheckCircle className="w-5 h-5 text-[#d9b45a] flex-shrink-0 mt-0.5" />
                      <span>Peut être poncé 5-7 fois</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-gradient-to-br from-[#eee9df] to-[#f5f0e8] rounded-2xl p-8 border-2 border-gray-200 hover:border-[#d9b45a] transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                  <div className="mb-6 flex justify-center">
                    <Shield className="w-12 h-12 text-[#b8941a]" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">
                    Parquet Contrecollé
                  </h3>
                  <p className="text-gray-700 mb-6 text-center">
                    Solution moderne et stable. Parfait pour les pièces avec chauffage au sol et grandes surfaces.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2 text-gray-600 text-sm">
                      <CheckCircle className="w-5 h-5 text-[#d9b45a] flex-shrink-0 mt-0.5" />
                      <span>Couche noble 2,5-6mm</span>
                    </li>
                    <li className="flex items-start gap-2 text-gray-600 text-sm">
                      <CheckCircle className="w-5 h-5 text-[#d9b45a] flex-shrink-0 mt-0.5" />
                      <span>Stabilité dimensionnelle</span>
                    </li>
                    <li className="flex items-start gap-2 text-gray-600 text-sm">
                      <CheckCircle className="w-5 h-5 text-[#d9b45a] flex-shrink-0 mt-0.5" />
                      <span>Pose rapide et propre</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-gradient-to-br from-[#eee9df] to-[#f5f0e8] rounded-2xl p-8 border-2 border-gray-200 hover:border-[#d9b45a] transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                  <div className="mb-6 flex justify-center">
                    <Clock className="w-12 h-12 text-[#b8941a]" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">
                    Recouvrement
                  </h3>
                  <p className="text-gray-700 mb-6 text-center">
                    Pose d'un nouveau parquet par-dessus l'ancien. Solution économique et rapide sans dépose.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2 text-gray-600 text-sm">
                      <CheckCircle className="w-5 h-5 text-[#d9b45a] flex-shrink-0 mt-0.5" />
                      <span>Pas de gravats ni poussière</span>
                    </li>
                    <li className="flex items-start gap-2 text-gray-600 text-sm">
                      <CheckCircle className="w-5 h-5 text-[#d9b45a] flex-shrink-0 mt-0.5" />
                      <span>Chantier court (1-2 jours)</span>
                    </li>
                    <li className="flex items-start gap-2 text-gray-600 text-sm">
                      <CheckCircle className="w-5 h-5 text-[#d9b45a] flex-shrink-0 mt-0.5" />
                      <span>Isolation thermique/phonique</span>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                Nos <span className="text-[#b8941a]">Réalisations</span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {galleryImages.map((image, index) => (
                  <div key={index} className="group relative bg-white shadow-lg rounded-xl overflow-hidden hover:shadow-2xl transition-all duration-300 border-2 border-gray-300 hover:-translate-y-1">
                    <div className="aspect-[4/3] overflow-hidden">
                      <img
                        src={image.url}
                        alt={image.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        loading="lazy"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{image.title}</h3>
                      <p className="text-gray-700">{image.description}</p>
                    </div>
                    <div className="absolute top-4 right-4 bg-[#d9b45a] text-[#0f1b2b] px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                      Les Ponceurs Réunis
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="mb-16">
              <div className="bg-gradient-to-br from-[#eee9df] to-[#f5f0e8] rounded-2xl p-8 md:p-12 border-2 border-[#d9b45a]/50 shadow-xl">
                <div className="max-w-3xl mx-auto">
                  <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">
                      Demandez votre <span className="text-[#b8941a]">devis gratuit</span>
                    </h2>
                    <p className="text-gray-700 text-lg">
                      Notre équipe vous conseille et établit un devis personnalisé sous 24h
                    </p>
                  </div>

                  <button
                    onClick={() => setShowModal(true)}
                    className="w-full inline-flex items-center justify-center gap-3 bg-gradient-to-r from-[#d9b45a] to-[#b8941a] text-white px-8 py-4 rounded-xl font-bold hover:scale-105 transition-transform shadow-xl text-lg"
                  >
                    <Send className="w-6 h-6" />
                    Obtenir mon devis gratuit
                  </button>

                  <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                    <div className="flex items-center justify-center gap-2 text-gray-700">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span className="text-sm font-medium">Réponse sous 24h</span>
                    </div>
                    <div className="flex items-center justify-center gap-2 text-gray-700">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span className="text-sm font-medium">Sans engagement</span>
                    </div>
                    <div className="flex items-center justify-center gap-2 text-gray-700">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span className="text-sm font-medium">Conseil personnalisé</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

          </div>
        </main>

        <Footer />
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-2xl w-full max-w-2xl max-h-[95vh] sm:max-h-[90vh] overflow-y-auto border border-gray-200">
            <div className="p-4 sm:p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-lg sm:text-2xl font-bold text-gray-900">
                  Demande de devis - Pose de parquet
                </h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-6 h-6 text-gray-500" />
                </button>
              </div>
            </div>

            <form onSubmit={onSubmit} className="p-4 sm:p-6 space-y-4 sm:space-y-6">
              <div className="space-y-3 sm:space-y-4">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900">
                  Vos coordonnées
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                      Nom complet *
                    </label>
                    <input
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => handleInputChange('fullName', e.target.value)}
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg border-2 border-gray-200 focus:border-[#d9b45a] focus:ring-0 transition-colors bg-white text-gray-900 text-sm sm:text-base"
                      placeholder="Jean Dupont"
                      required
                    />
                    {errors.fullName && (
                      <p className="text-red-600 text-sm mt-1">{errors.fullName}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                      Téléphone *
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg border-2 border-gray-200 focus:border-[#d9b45a] focus:ring-0 transition-colors bg-white text-gray-900 text-sm sm:text-base"
                      placeholder="06 12 34 56 78"
                      required
                    />
                    {errors.phone && (
                      <p className="text-red-600 text-sm mt-1">{errors.phone}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg border-2 border-gray-200 focus:border-[#d9b45a] focus:ring-0 transition-colors bg-white text-gray-900 text-sm sm:text-base"
                      placeholder="jean.dupont@email.com"
                      required
                    />
                    {errors.email && (
                      <p className="text-red-600 text-sm mt-1">{errors.email}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                      Code postal *
                    </label>
                    <input
                      type="text"
                      value={formData.postalCode}
                      onChange={(e) => handleInputChange('postalCode', e.target.value)}
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg border-2 border-gray-200 focus:border-[#d9b45a] focus:ring-0 transition-colors bg-white text-gray-900 text-sm sm:text-base"
                      placeholder="67000"
                      required
                    />
                    {errors.postalCode && (
                      <p className="text-red-600 text-sm mt-1">{errors.postalCode}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                    Décrivez votre projet *
                  </label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    rows={4}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg border-2 border-gray-200 focus:border-[#d9b45a] focus:ring-0 transition-colors bg-white text-gray-900 resize-none text-sm sm:text-base"
                    placeholder="Type de parquet souhaité, surface, état actuel du sol..."
                    required
                  />
                </div>

                <div className="flex items-start gap-2 sm:gap-3">
                  <input
                    type="checkbox"
                    id="terms"
                    checked={termsAccepted}
                    onChange={(e) => setTermsAccepted(e.target.checked)}
                    className="mt-0.5 sm:mt-1 h-4 w-4 text-[#d9b45a] focus:ring-[#d9b45a] rounded border-gray-300"
                    required
                  />
                  <label htmlFor="terms" className="text-xs sm:text-sm text-gray-600">
                    J'accepte les conditions générales et la politique de confidentialité *
                  </label>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading || !termsAccepted}
                className="w-full px-4 sm:px-6 py-3 sm:py-4 bg-gradient-to-r from-[#d9b45a] to-[#b8941a] text-white rounded-lg hover:scale-105 transition-all font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm sm:text-base shadow-lg"
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

              {submitStatus === "sent" && (
                <div className="p-3 sm:p-4 bg-green-50 text-green-600 rounded-lg text-sm sm:text-base">
                  <p className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5" />
                    Votre demande a été envoyée avec succès !
                  </p>
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
    </>
  );
};

export default ParquetPosePage;
