import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, Home, Phone, Mail, ArrowRight } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Helmet } from 'react-helmet';

export default function ThankYouPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#ffffff] to-[#f8f9fa] flex flex-col">
      <Helmet>
        <title>Merci pour votre demande - Artisan Parquet Alsace</title>
        <meta name="description" content="Votre demande de devis a bien été reçue. Nous vous répondrons dans les 24 heures." />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <Header />

      <main className="flex-grow flex items-center justify-center px-4 py-16">
        <div className="max-w-2xl w-full">
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border-2 border-[#d9b45a]/20">
            <div className="bg-gradient-to-r from-[#d9b45a] to-[#FFD36D] p-8 text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-full mb-4">
                <CheckCircle className="w-12 h-12 text-green-500" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                Demande envoyée avec succès !
              </h1>
              <p className="text-white/90 text-lg">
                Nous avons bien reçu votre demande de devis
              </p>
            </div>

            <div className="p-8 md:p-12">
              <div className="space-y-6">
                <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6">
                  <h2 className="text-xl font-bold text-green-800 mb-3">
                    Demande bien reçue
                  </h2>
                  <p className="text-green-700 leading-relaxed">
                    Nous étudions votre demande et vous répondrons dans les <strong>24 heures</strong>.
                  </p>
                </div>

                <div className="bg-[#f8f9fa] rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">
                    Que se passe-t-il maintenant ?
                  </h3>
                  <div className="space-y-4">
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-8 h-8 bg-[#d9b45a] text-white rounded-full flex items-center justify-center font-bold">
                        1
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">Analyse de votre projet</p>
                        <p className="text-gray-600 text-sm">Notre équipe étudie vos besoins en détail</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-8 h-8 bg-[#d9b45a] text-white rounded-full flex items-center justify-center font-bold">
                        2
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">Devis personnalisé</p>
                        <p className="text-gray-600 text-sm">Vous recevrez un devis détaillé sous 24h</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-8 h-8 bg-[#d9b45a] text-white rounded-full flex items-center justify-center font-bold">
                        3
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">Prise de rendez-vous</p>
                        <p className="text-gray-600 text-sm">Nous planifions ensemble l'intervention</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-2 border-[#d9b45a]/30 rounded-xl p-6 bg-gradient-to-br from-[#fef9f0] to-[#ffffff]">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">
                    Une question urgente ?
                  </h3>
                  <div className="space-y-3">
                    <a
                      href="tel:+33757821306"
                      className="flex items-center gap-3 p-3 bg-white rounded-lg hover:bg-[#d9b45a]/10 transition-colors border border-gray-200"
                    >
                      <Phone className="w-5 h-5 text-[#d9b45a]" />
                      <div>
                        <p className="font-semibold text-gray-900">07 57 82 13 06</p>
                        <p className="text-xs text-gray-600">Lun-Ven 8h-18h, Sam 9h-12h</p>
                      </div>
                    </a>
                    <a
                      href="mailto:contact@poncages.fr"
                      className="flex items-center gap-3 p-3 bg-white rounded-lg hover:bg-[#d9b45a]/10 transition-colors border border-gray-200"
                    >
                      <Mail className="w-5 h-5 text-[#d9b45a]" />
                      <div>
                        <p className="font-semibold text-gray-900">contact@poncages.fr</p>
                        <p className="text-xs text-gray-600">Réponse sous 24h</p>
                      </div>
                    </a>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Link
                    to="/"
                    className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-4 bg-[#0f1b2b] text-white rounded-xl font-semibold hover:bg-[#1a2537] transition-all duration-300 hover:scale-105 shadow-lg"
                  >
                    <Home className="w-5 h-5" />
                    Retour à l'accueil
                  </Link>
                  <Link
                    to="/gallery"
                    className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-4 border-2 border-[#0f1b2b] text-[#0f1b2b] rounded-xl font-semibold hover:bg-[#0f1b2b] hover:text-white transition-all duration-300"
                  >
                    Voir nos réalisations
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-gray-600">
              Merci de votre confiance ! 🙏
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Les Ponceurs Réunis - Artisan parqueteur en Alsace
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
