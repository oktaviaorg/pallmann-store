import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Calendar, Clock, Users, Award, CheckCircle, Send, BookOpen, Sparkles } from 'lucide-react';

const FormationPage: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    company: '',
    participants: '1',
    message: '',
    acceptTerms: false
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const formationDetails = [
    { icon: <Calendar className="w-6 h-6" />, title: 'Durée', value: '4 jours (28 heures)' },
    { icon: <Users className="w-6 h-6" />, title: 'Format', value: 'INTRA-ENTREPRISE ou Individuel' },
    { icon: <Award className="w-6 h-6" />, title: 'Niveau', value: 'Débutant à Intermédiaire' },
    { icon: <Clock className="w-6 h-6" />, title: 'Horaires', value: '9h00 - 17h00' }
  ];

  const programmeModules = [
    {
      title: 'Module 1 : Diagnostic et Préparation',
      duration: '7h',
      topics: [
        'Identification des types de parquets',
        'Évaluation de l\'état du parquet',
        'Choix des outils et produits adaptés',
        'Préparation de la surface et protection'
      ]
    },
    {
      title: 'Module 2 : Techniques de Réparation',
      duration: '7h',
      topics: [
        'Remplacement de lames endommagées',
        'Rebouchage de fissures et trous',
        'Techniques de collage et fixation',
        'Mise à niveau et ajustements'
      ]
    },
    {
      title: 'Module 3 : Ponçage Professionnel',
      duration: '7h',
      topics: [
        'Utilisation des ponceuses (bande, orbitale, bordureuse)',
        'Techniques de ponçage sans poussière',
        'Grains de ponçage et progression',
        'Ponçage des zones difficiles'
      ]
    },
    {
      title: 'Module 4 : Vitrification et Finitions',
      duration: '7h',
      topics: [
        'Préparation avant vitrification',
        'Application des produits de finition',
        'Techniques de vitrification (mat, satin, brillant)',
        'Séchage et contrôle qualité final'
      ]
    }
  ];

  const avantages = [
    'Formation pratique avec matériel professionnel',
    'Formateur expert avec plus de 20 ans d\'expérience',
    'Petit groupe pour un suivi personnalisé',
    'Attestation de formation délivrée',
    'Support pédagogique inclus',
    'Possibilité de formation sur site'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const newErrors: Record<string, string> = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Le nom est requis';
    if (!formData.email.trim()) newErrors.email = 'L\'email est requis';
    if (!formData.phone.trim()) newErrors.phone = 'Le téléphone est requis';
    if (!formData.acceptTerms) newErrors.acceptTerms = 'Vous devez accepter les conditions';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-form-notification`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            type: 'formation',
            data: {
              fullName: formData.fullName,
              email: formData.email,
              phone: formData.phone,
              company: formData.company || 'Non spécifiée',
              participants: formData.participants,
              message: formData.message || 'Aucun message'
            }
          })
        }
      );

      if (!response.ok) {
        throw new Error('Erreur lors de l\'envoi');
      }

      setFormSubmitted(true);
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        company: '',
        participants: '1',
        message: '',
        acceptTerms: false
      });
    } catch (error) {
      console.error('Erreur:', error);
      setErrors({ submit: 'Une erreur est survenue. Veuillez réessayer.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;

    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  return (
    <>
      <Helmet>
        <title>Formation Parquet Professionnel 4 Jours (28h) - Réparation, Ponçage, Vitrification | Alsace</title>
        <meta
          name="description"
          content="Formation intensive 4 jours (28h) en réparation, ponçage et vitrification de parquet. INTRA-ENTREPRISE ou individuel. Matériel professionnel fourni. Formateur expert 20+ ans. Alsace et Grand Est."
        />
        <meta name="keywords" content="formation parquet Alsace, formation ponçage professionnel, formation vitrification, formation intra-entreprise parquet, apprendre ponçage, stage parquet, formation artisan, cours ponçage parquet, formation rénovation parquet" />
        <link rel="canonical" href="https://ponceur-parquet.fr/formation" />
        <meta name="robots" content="index, follow" />

        <meta property="og:title" content="Formation Parquet Professionnel 4 Jours - Réparation, Ponçage, Vitrification" />
        <meta property="og:description" content="Formation professionnelle complète pour maîtriser les techniques de réparation, ponçage et vitrification de parquet. Matériel professionnel inclus." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://ponceur-parquet.fr/formation" />
        <meta property="og:image" content="https://mjuzyqhxifyvebtnlrra.supabase.co/storage/v1/object/public/lpr2/location%20spider%20pallmann.jpg" />
        <meta property="og:locale" content="fr_FR" />

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Course",
            "name": "Formation Réparation, Ponçage et Vitrification de Parquet",
            "description": "Formation professionnelle intensive de 4 jours pour maîtriser les techniques de réparation, ponçage et vitrification de parquet. Pratique avec matériel professionnel.",
            "provider": {
              "@type": "Organization",
              "name": "Les Ponceurs Réunis",
              "url": "https://ponceur-parquet.fr",
              "telephone": "+33604440903",
              "address": {
                "@type": "PostalAddress",
                "addressRegion": "Alsace",
                "addressCountry": "FR"
              }
            },
            "image": "https://mjuzyqhxifyvebtnlrra.supabase.co/storage/v1/object/public/lpr2/location%20spider%20pallmann.jpg",
            "educationalLevel": "Débutant à Intermédiaire",
            "inLanguage": "fr-FR",
            "availableLanguage": "French",
            "hasCourseInstance": {
              "@type": "CourseInstance",
              "courseMode": "onsite",
              "courseWorkload": "PT28H",
              "duration": "P4D",
              "instructor": {
                "@type": "Person",
                "name": "Expert Artisan",
                "jobTitle": "Formateur professionnel",
                "description": "Plus de 20 ans d'expérience dans la rénovation de parquet"
              }
            },
            "coursePrerequisites": "Aucun prérequis nécessaire",
            "educationalCredentialAwarded": "Attestation de formation",
            "teaches": [
              "Diagnostic et préparation de parquet",
              "Techniques de réparation de parquet",
              "Ponçage professionnel sans poussière",
              "Application de vitrification et finitions"
            ],
            "timeRequired": "PT28H",
            "totalTime": "P4D",
            "about": [
              {
                "@type": "Thing",
                "name": "Ponçage de parquet"
              },
              {
                "@type": "Thing",
                "name": "Vitrification de parquet"
              },
              {
                "@type": "Thing",
                "name": "Réparation de parquet"
              }
            ],
            "offers": {
              "@type": "Offer",
              "category": "Formation professionnelle",
              "availability": "https://schema.org/InStock",
              "validFrom": "2025-01-01"
            },
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "5",
              "reviewCount": "12"
            }
          })}
        </script>

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "Quelle est la durée de la formation parquet ?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "La formation dure 4 jours complets, soit 28 heures au total (7 heures par jour), de 9h00 à 17h00."
                }
              },
              {
                "@type": "Question",
                "name": "La formation est-elle disponible en INTRA-ENTREPRISE ?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Oui, la formation est disponible en INTRA-ENTREPRISE pour vos équipes ou en format individuel pour les personnes souhaitant apprendre les techniques professionnelles."
                }
              },
              {
                "@type": "Question",
                "name": "Quel matériel est fourni pendant la formation ?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Tout le matériel professionnel est fourni : ponceuses (bande, orbitale, bordureuse), produits de vitrification, équipements de protection, et support pédagogique complet."
                }
              },
              {
                "@type": "Question",
                "name": "Reçoit-on une attestation en fin de formation ?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Oui, une attestation de formation est délivrée à tous les participants ayant suivi l'intégralité du programme."
                }
              }
            ]
          })}
        </script>
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 flex flex-col">
        <Header />

        <main className="flex-grow pt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#d9b45a] to-[#b8941a] text-white px-4 py-2 rounded-full text-sm font-semibold mb-6">
                <BookOpen className="w-4 h-4" />
                Formation Professionnelle
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Formation Réparation, Ponçage et Vitrification de Parquet
              </h1>
              <p className="text-xl text-gray-700 max-w-3xl mx-auto">
                Une formation courte et intensive pour maîtriser les techniques professionnelles de rénovation de parquet
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
              <div className="space-y-6">
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                  <img
                    src="https://mjuzyqhxifyvebtnlrra.supabase.co/storage/v1/object/public/lpr2/location%20spider%20pallmann.jpg"
                    alt="Formation ponçage parquet avec matériel professionnel"
                    className="w-full h-[400px] object-cover"
                  />
                </div>

                <div className="bg-gradient-to-br from-[#0f1b2b] to-[#1a2537] rounded-2xl p-8 text-white">
                  <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                    <Sparkles className="w-6 h-6 text-[#d9b45a]" />
                    Informations Pratiques
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {formationDetails.map((detail, index) => (
                      <div key={index} className="bg-white/10 backdrop-blur rounded-xl p-4">
                        <div className="flex items-center gap-3 mb-2 text-[#d9b45a]">
                          {detail.icon}
                          <span className="font-semibold">{detail.title}</span>
                        </div>
                        <p className="text-white/90 text-sm">{detail.value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-white rounded-2xl shadow-lg p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Programme de Formation</h2>
                  <div className="space-y-6">
                    {programmeModules.map((module, index) => (
                      <div key={index} className="border-l-4 border-[#d9b45a] pl-4">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-bold text-gray-900">{module.title}</h3>
                          <span className="text-sm text-[#b8941a] font-semibold">{module.duration}</span>
                        </div>
                        <ul className="space-y-1">
                          {module.topics.map((topic, idx) => (
                            <li key={idx} className="text-sm text-gray-700 flex items-start gap-2">
                              <CheckCircle className="w-4 h-4 text-[#b8941a] flex-shrink-0 mt-0.5" />
                              <span>{topic}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-[#d9b45a]/10 via-[#b8941a]/10 to-[#d9b45a]/10 rounded-2xl p-8 mb-16">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Avantages de la Formation</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {avantages.map((avantage, index) => (
                  <div key={index} className="flex items-center gap-3 bg-white rounded-xl p-4 shadow-sm">
                    <CheckCircle className="w-5 h-5 text-[#b8941a] flex-shrink-0" />
                    <span className="text-gray-800 font-medium">{avantage}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="max-w-3xl mx-auto">
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">
                    Demande de Renseignements
                  </h2>
                  <p className="text-gray-600">
                    Remplissez ce formulaire pour recevoir plus d'informations sur notre formation
                  </p>
                </div>

                {formSubmitted ? (
                  <div className="text-center py-12">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle className="w-12 h-12 text-green-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Demande envoyée !</h3>
                    <p className="text-gray-600 mb-6">
                      Nous vous contacterons dans les plus brefs délais pour discuter de votre projet de formation.
                    </p>
                    <button
                      onClick={() => setFormSubmitted(false)}
                      className="text-[#b8941a] hover:text-[#d9b45a] font-semibold"
                    >
                      Envoyer une nouvelle demande
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-2">
                          Nom complet *
                        </label>
                        <input
                          type="text"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleChange}
                          className={`w-full px-4 py-3 border-2 ${errors.fullName ? 'border-red-500' : 'border-gray-300'} rounded-xl focus:outline-none focus:border-[#d9b45a] transition-colors`}
                          placeholder="Votre nom"
                        />
                        {errors.fullName && (
                          <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-2">
                          Email *
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className={`w-full px-4 py-3 border-2 ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-xl focus:outline-none focus:border-[#d9b45a] transition-colors`}
                          placeholder="votre@email.com"
                        />
                        {errors.email && (
                          <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-2">
                          Téléphone *
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className={`w-full px-4 py-3 border-2 ${errors.phone ? 'border-red-500' : 'border-gray-300'} rounded-xl focus:outline-none focus:border-[#d9b45a] transition-colors`}
                          placeholder="06 12 34 56 78"
                        />
                        {errors.phone && (
                          <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-2">
                          Entreprise (optionnel)
                        </label>
                        <input
                          type="text"
                          name="company"
                          value={formData.company}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-[#d9b45a] transition-colors"
                          placeholder="Nom de l'entreprise"
                        />
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-sm font-semibold text-gray-900 mb-2">
                          Nombre de participants
                        </label>
                        <select
                          name="participants"
                          value={formData.participants}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-[#d9b45a] transition-colors"
                        >
                          <option value="1">1 personne</option>
                          <option value="2">2 personnes</option>
                          <option value="3">3 personnes</option>
                          <option value="4">4 personnes</option>
                          <option value="5+">5 personnes ou plus</option>
                        </select>
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-sm font-semibold text-gray-900 mb-2">
                          Message (optionnel)
                        </label>
                        <textarea
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          rows={4}
                          className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-[#d9b45a] transition-colors"
                          placeholder="Précisez vos attentes, disponibilités..."
                        />
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <input
                        type="checkbox"
                        name="acceptTerms"
                        checked={formData.acceptTerms}
                        onChange={handleChange}
                        className="mt-1"
                      />
                      <label className="text-sm text-gray-700">
                        J'accepte d'être contacté par Les Ponceurs Réunis concernant cette demande de formation *
                      </label>
                    </div>
                    {errors.acceptTerms && (
                      <p className="text-red-500 text-sm">{errors.acceptTerms}</p>
                    )}

                    {errors.submit && (
                      <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-700 text-sm">
                        {errors.submit}
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-[#d9b45a] to-[#b8941a] text-white py-4 rounded-xl font-bold hover:scale-105 transition-transform shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        'Envoi en cours...'
                      ) : (
                        <>
                          <Send className="w-5 h-5" />
                          Envoyer la demande
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>

            <div className="mt-16 bg-gradient-to-r from-[#0f1b2b] to-[#1a2537] rounded-2xl p-8 text-white text-center">
              <h2 className="text-2xl font-bold mb-4">Questions ? Contactez-nous</h2>
              <p className="text-white/80 mb-6">
                Notre équipe est disponible pour répondre à toutes vos questions sur la formation
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href="tel:+33604440903"
                  className="inline-flex items-center gap-2 bg-white text-[#0f1b2b] px-6 py-3 rounded-xl font-bold hover:scale-105 transition-transform"
                >
                  <Calendar className="w-5 h-5" />
                  06 04 44 09 03
                </a>
                <a
                  href="mailto:contact@ponceur-parquet.fr"
                  className="inline-flex items-center gap-2 bg-[#d9b45a] text-white px-6 py-3 rounded-xl font-bold hover:scale-105 transition-transform"
                >
                  <Send className="w-5 h-5" />
                  Envoyer un email
                </a>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default FormationPage;
