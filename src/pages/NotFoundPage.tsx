import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Home, ArrowLeft, Search, Phone } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#fafaf8] to-[#f5f0e8]">
      <Helmet>
        <title>Page non trouvée - 404 | Les Ponceurs Réunis</title>
        <meta name="description" content="La page que vous recherchez n'existe pas ou a été déplacée. Retournez à l'accueil pour découvrir nos services de ponçage et rénovation de parquet en Alsace." />
        <meta name="robots" content="noindex, nofollow" />
        <link rel="canonical" href="https://ponceursreunis.com/404" />
      </Helmet>

      <Header />

      <main className="flex-grow flex items-center justify-center px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-2xl w-full text-center">
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-[#d9b45a] to-[#b8941a] rounded-full mb-6 shadow-xl">
              <span className="text-5xl font-bold text-white">404</span>
            </div>

            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              Page non trouvée
            </h1>

            <p className="text-lg text-gray-700 mb-8 leading-relaxed">
              Désolé, la page que vous recherchez n'existe pas ou a été déplacée.
              <br />
              Pas de souci, nous sommes là pour vous aider !
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            <Link
              to="/"
              className="inline-flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-[#d9b45a] to-[#b8941a] text-white rounded-xl font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              <Home className="w-5 h-5" />
              Retour à l'accueil
            </Link>

            <Link
              to="/services"
              className="inline-flex items-center justify-center gap-2 px-6 py-4 bg-white text-gray-900 rounded-xl font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 border-2 border-gray-200"
            >
              <Search className="w-5 h-5" />
              Nos services
            </Link>
          </div>

          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 shadow-xl border-2 border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Pages populaires
            </h2>

            <div className="grid grid-cols-1 gap-3 text-left">
              <Link
                to="/"
                className="flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-[#f5f0e8] to-white rounded-lg hover:from-[#d9b45a]/10 hover:to-[#b8941a]/10 transition-all duration-300 group"
              >
                <ArrowLeft className="w-4 h-4 text-[#b8941a] group-hover:translate-x-1 transition-transform" />
                <span className="font-medium text-gray-900">Accueil - Devis gratuit en ligne</span>
              </Link>

              <Link
                to="/services"
                className="flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-[#f5f0e8] to-white rounded-lg hover:from-[#d9b45a]/10 hover:to-[#b8941a]/10 transition-all duration-300 group"
              >
                <ArrowLeft className="w-4 h-4 text-[#b8941a] group-hover:translate-x-1 transition-transform" />
                <span className="font-medium text-gray-900">Nos services de ponçage et rénovation</span>
              </Link>

              <Link
                to="/gallery"
                className="flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-[#f5f0e8] to-white rounded-lg hover:from-[#d9b45a]/10 hover:to-[#b8941a]/10 transition-all duration-300 group"
              >
                <ArrowLeft className="w-4 h-4 text-[#b8941a] group-hover:translate-x-1 transition-transform" />
                <span className="font-medium text-gray-900">Galerie de nos réalisations</span>
              </Link>

              <Link
                to="/blog"
                className="flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-[#f5f0e8] to-white rounded-lg hover:from-[#d9b45a]/10 hover:to-[#b8941a]/10 transition-all duration-300 group"
              >
                <ArrowLeft className="w-4 h-4 text-[#b8941a] group-hover:translate-x-1 transition-transform" />
                <span className="font-medium text-gray-900">Blog - Conseils et actualités</span>
              </Link>
            </div>
          </div>

          <div className="mt-8 p-6 bg-gradient-to-br from-[#0f1b2b] to-[#1a2942] rounded-2xl shadow-xl border-2 border-[#d9b45a]/20">
            <p className="text-white text-lg mb-4 font-medium">
              Besoin d'aide ? Contactez-nous directement
            </p>
            <a
              href="tel:+33757821306"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#d9b45a] to-[#b8941a] text-white rounded-xl font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              <Phone className="w-5 h-5" />
              07 57 82 13 06
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
