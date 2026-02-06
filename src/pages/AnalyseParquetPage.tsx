import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Camera, MessageCircle, CheckCircle, Clock, Award, Sparkles, ArrowRight, Image, Send } from 'lucide-react';

const AnalyseParquetPage: React.FC = () => {
  const whatsappNumber = '33604440903';
  const whatsappMessage = encodeURIComponent(
    "Bonjour, je souhaite bénéficier d'une analyse gratuite de mon parquet. Voici les photos :"
  );

  const handleWhatsAppClick = () => {
    window.open(`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`, '_blank');
  };

  const analysisExamples = [
    {
      problem: 'Parquet très abîmé',
      solution: 'Ponçage complet + vitrification',
      time: '2-3 jours',
      image: 'Rayures profondes, usure importante'
    },
    {
      problem: 'Taches et décoloration',
      solution: 'Ponçage léger + finition sur mesure',
      time: '1-2 jours',
      image: 'Taches d\'eau, décoloration solaire'
    },
    {
      problem: 'Parquet stratifié',
      solution: 'Pose de parquet neuf recommandée',
      time: '2-4 jours',
      image: 'Non ponçable, remplacement nécessaire'
    }
  ];

  const faqItems = [
    {
      question: 'Quelles photos dois-je envoyer ?',
      answer: 'Idéalement 2-3 photos : une vue d\'ensemble de la pièce, un gros plan des zones abîmées, et une photo de l\'épaisseur du parquet (si visible sur les bords).'
    },
    {
      question: 'Combien de temps pour recevoir l\'analyse ?',
      answer: 'Vous recevrez une première réponse dans les 2 heures pendant nos heures ouvrables (du lundi au samedi, 8h-19h). Le diagnostic complet suit généralement dans la journée.'
    },
    {
      question: 'L\'analyse est-elle vraiment gratuite ?',
      answer: 'Oui, totalement gratuite et sans engagement ! C\'est notre façon de vous aider à prendre la bonne décision pour votre parquet.'
    },
    {
      question: 'Que contient l\'analyse ?',
      answer: 'Notre diagnostic inclut : l\'état général du parquet, la faisabilité du ponçage, les traitements recommandés, une estimation du temps de travail et un ordre de prix indicatif.'
    },
    {
      question: 'Je n\'ai pas WhatsApp, que faire ?',
      answer: 'Pas de problème ! Vous pouvez nous contacter via le formulaire de la page d\'accueil ou par téléphone au 06 04 44 09 03.'
    }
  ];

  return (
    <>
      <Helmet>
        <title>Analyse Gratuite de Votre Parquet par Photo | Diagnostic Expert en Ligne</title>
        <meta
          name="description"
          content="Envoyez une photo de votre parquet sur WhatsApp et recevez un diagnostic professionnel gratuit en 2h. Découvrez si votre parquet peut être rénové ou doit être remplacé."
        />
        <meta name="keywords" content="analyse parquet photo, diagnostic parquet gratuit, état parquet, expertise parquet, peut-on poncer mon parquet, évaluation parquet, inspection parquet, devis parquet photo" />
        <link rel="canonical" href="https://ponceur-parquet.fr/analyse-parquet-gratuite" />

        <meta property="og:title" content="Analyse Gratuite de Votre Parquet par Photo | Diagnostic Expert" />
        <meta property="og:description" content="Service innovant : envoyez une photo de votre parquet et recevez un diagnostic professionnel gratuit en 2h par WhatsApp." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://ponceur-parquet.fr/analyse-parquet-gratuite" />

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "Analyse Gratuite de Parquet par Photo",
            "description": "Diagnostic professionnel de l'état de votre parquet à partir de photos envoyées sur WhatsApp",
            "provider": {
              "@type": "LocalBusiness",
              "name": "Laurent Parquet Rénovation",
              "telephone": "+33604440903",
              "address": {
                "@type": "PostalAddress",
                "addressRegion": "Alsace",
                "addressCountry": "FR"
              }
            },
            "areaServed": "Alsace",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "EUR"
            }
          })}
        </script>
      </Helmet>

      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <Header />

        <main className="pt-24 pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 px-4 py-2 rounded-full font-semibold mb-6 shadow-sm">
                <Sparkles className="w-5 h-5" />
                <span>Service Innovant 100% Gratuit</span>
              </div>

              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                Diagnostic Gratuit de Votre Parquet
                <span className="block text-[#d9b45a] mt-2">en 2 Heures par Photo</span>
              </h1>

              <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                Vous hésitez sur l'état de votre parquet ? Envoyez-nous 2 photos sur WhatsApp et recevez un diagnostic professionnel gratuit. Notre expert analyse votre parquet et vous conseille la meilleure solution.
              </p>

              <button
                onClick={handleWhatsAppClick}
                className="inline-flex items-center gap-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-8 py-5 rounded-xl font-bold text-lg shadow-2xl hover:scale-105 transition-all duration-300 group"
              >
                <MessageCircle className="w-7 h-7 group-hover:rotate-12 transition-transform" />
                Envoyer mes photos sur WhatsApp
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              <p className="text-sm text-gray-500 mt-4">
                <Clock className="w-4 h-4 inline mr-1" />
                Réponse sous 2h pendant les heures ouvrables
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-20">
              <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-gray-100 hover:border-[#d9b45a] transition-all hover:shadow-xl">
                <div className="bg-gradient-to-br from-blue-100 to-blue-200 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                  <Camera className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">1. Prenez 2 Photos</h3>
                <p className="text-gray-600 leading-relaxed">
                  Une vue d'ensemble de votre parquet et un gros plan des zones abîmées. Plus les photos sont nettes, plus notre diagnostic sera précis.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-gray-100 hover:border-[#d9b45a] transition-all hover:shadow-xl">
                <div className="bg-gradient-to-br from-green-100 to-green-200 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                  <Send className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">2. Envoyez sur WhatsApp</h3>
                <p className="text-gray-600 leading-relaxed">
                  Cliquez sur le bouton, envoyez vos photos et décrivez rapidement votre situation. C'est simple et rapide !
                </p>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-gray-100 hover:border-[#d9b45a] transition-all hover:shadow-xl">
                <div className="bg-gradient-to-br from-amber-100 to-amber-200 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                  <Award className="w-8 h-8 text-amber-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">3. Recevez Votre Diagnostic</h3>
                <p className="text-gray-600 leading-relaxed">
                  Notre expert analyse votre parquet et vous envoie un diagnostic détaillé avec nos recommandations et un ordre de prix.
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-[#d9b45a]/10 to-amber-50 rounded-3xl p-8 md:p-12 mb-20 border-2 border-[#d9b45a]/30">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                    Ce Que Contient Votre Diagnostic Gratuit
                  </h2>
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                      <div>
                        <h4 className="font-bold text-gray-900 mb-1">État général du parquet</h4>
                        <p className="text-gray-600">Évaluation précise de l'usure et des dommages</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                      <div>
                        <h4 className="font-bold text-gray-900 mb-1">Faisabilité du ponçage</h4>
                        <p className="text-gray-600">Votre parquet peut-il être rénové ou doit-il être remplacé ?</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                      <div>
                        <h4 className="font-bold text-gray-900 mb-1">Traitements recommandés</h4>
                        <p className="text-gray-600">Ponçage, vitrification, huilage ou pose de parquet neuf</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                      <div>
                        <h4 className="font-bold text-gray-900 mb-1">Estimation de prix</h4>
                        <p className="text-gray-600">Ordre de prix indicatif pour votre projet</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                      <div>
                        <h4 className="font-bold text-gray-900 mb-1">Durée des travaux</h4>
                        <p className="text-gray-600">Estimation du temps nécessaire</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="relative">
                  <div className="bg-white rounded-2xl p-6 shadow-2xl">
                    <div className="flex items-center gap-3 mb-4 pb-4 border-b">
                      <div className="w-12 h-12 bg-gradient-to-br from-[#d9b45a] to-[#b8941a] rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-xl">LPR</span>
                      </div>
                      <div>
                        <p className="font-bold text-gray-900">Laurent Parquet Rénovation</p>
                        <p className="text-sm text-gray-500">Expert parqueteur</p>
                      </div>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-4 mb-4">
                      <p className="text-sm text-gray-600 mb-2">
                        <strong>Diagnostic de votre parquet :</strong>
                      </p>
                      <p className="text-sm text-gray-700 leading-relaxed">
                        Votre parquet en chêne massif est en bon état général. Les rayures sont superficielles et peuvent être éliminées par un ponçage. Je recommande un ponçage complet + vitrification mat. Durée : 2 jours. Budget estimé : 35-40€/m².
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <div className="w-20 h-20 bg-gray-200 rounded-lg"></div>
                      <div className="w-20 h-20 bg-gray-200 rounded-lg"></div>
                    </div>
                  </div>
                  <div className="absolute -top-4 -right-4 bg-green-500 text-white px-4 py-2 rounded-full font-bold text-sm shadow-lg">
                    Exemple de diagnostic
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-20">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-4">
                Exemples de Diagnostics Réalisés
              </h2>
              <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
                Découvrez comment nous analysons différents types de parquets et recommandons les solutions adaptées
              </p>

              <div className="grid md:grid-cols-3 gap-8">
                {analysisExamples.map((example, index) => (
                  <div key={index} className="bg-white rounded-2xl overflow-hidden shadow-lg border-2 border-gray-100 hover:border-[#d9b45a] transition-all hover:shadow-xl">
                    <div className="h-48 bg-gradient-to-br from-amber-100 to-amber-200 flex items-center justify-center p-6 relative overflow-hidden">
                      {index === 0 ? (
                        <img
                          src="https://mjuzyqhxifyvebtnlrra.supabase.co/storage/v1/object/public/lpr2/ponceurs%20reunis%2068%20sierentz%20(5).jpg"
                          alt="Parquet très abîmé - rayures profondes"
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                      ) : index === 1 ? (
                        <img
                          src="https://mjuzyqhxifyvebtnlrra.supabase.co/storage/v1/object/public/lpr2/tache_parquet.jpg"
                          alt="Parquet avec taches et décoloration"
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                      ) : (
                        <img
                          src="https://mjuzyqhxifyvebtnlrra.supabase.co/storage/v1/object/public/lpr2/stratt.jpg"
                          alt="Parquet stratifié non ponçable"
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                      )}
                    </div>
                    <div className="p-6">
                      <h3 className="font-bold text-xl text-gray-900 mb-3">{example.problem}</h3>
                      <div className="space-y-2 text-sm text-gray-600">
                        <p><strong className="text-gray-900">Solution :</strong> {example.solution}</p>
                        <p><strong className="text-gray-900">Durée :</strong> {example.time}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border-2 border-gray-100 mb-20">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">
                Questions Fréquentes
              </h2>

              <div className="max-w-3xl mx-auto space-y-6">
                {faqItems.map((item, index) => (
                  <div key={index} className="border-b border-gray-200 last:border-0 pb-6 last:pb-0">
                    <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-start gap-3">
                      <span className="text-[#d9b45a] text-2xl flex-shrink-0">Q.</span>
                      {item.question}
                    </h3>
                    <p className="text-gray-600 leading-relaxed pl-9">{item.answer}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-r from-[#d9b45a] to-[#b8941a] rounded-3xl p-8 md:p-16 text-center text-white shadow-2xl">
              <h2 className="text-3xl md:text-5xl font-bold mb-6">
                Prêt à Découvrir l'État de Votre Parquet ?
              </h2>
              <p className="text-xl mb-8 opacity-95 max-w-2xl mx-auto">
                Ne restez plus dans le doute. Envoyez vos photos maintenant et recevez votre diagnostic professionnel gratuit dans les 2 heures.
              </p>

              <button
                onClick={handleWhatsAppClick}
                className="inline-flex items-center gap-3 bg-white text-[#b8941a] px-10 py-6 rounded-xl font-bold text-lg shadow-2xl hover:scale-105 transition-all duration-300 group"
              >
                <MessageCircle className="w-7 h-7 group-hover:rotate-12 transition-transform" />
                Lancer Mon Diagnostic Gratuit
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              <p className="text-sm mt-6 opacity-90">
                📱 06 04 44 09 03 • Réponse rapide garantie
              </p>
            </div>

            <div className="mt-16 text-center">
              <p className="text-gray-600 mb-4">
                Vous préférez un devis complet en visite ?
              </p>
              <Link
                to="/"
                className="text-[#b8941a] hover:text-[#d9b45a] font-semibold underline"
              >
                Demander une visite gratuite à domicile
              </Link>
            </div>

          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default AnalyseParquetPage;
