import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Home, ArrowLeft, ShoppingCart } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Helmet>
        <title>Page non trouvée - 404 | Pallmann Store</title>
        <meta name="description" content="La page que vous recherchez n'existe pas ou a été déplacée." />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <Header />

      <main className="flex-grow flex items-center justify-center px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-lg w-full text-center">
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-[#ff9900] rounded-full mb-6 shadow-xl">
              <span className="text-5xl font-bold text-white">404</span>
            </div>

            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              Page non trouvée
            </h1>

            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Désolé, la page que vous recherchez n'existe pas ou a été déplacée.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link
              to="/"
              className="inline-flex items-center justify-center gap-2 px-6 py-4 bg-[#ff9900] hover:bg-[#e68a00] text-white rounded-lg font-bold shadow-lg transition-all"
            >
              <ShoppingCart className="w-5 h-5" />
              Retour à la boutique
            </Link>

            <Link
              to="/blog"
              className="inline-flex items-center justify-center gap-2 px-6 py-4 bg-white text-gray-900 rounded-lg font-bold shadow-lg hover:bg-gray-100 transition-all border border-gray-200"
            >
              Voir le blog
            </Link>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-md">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Pages utiles
            </h2>

            <div className="space-y-3 text-left">
              <Link
                to="/"
                className="flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-lg hover:bg-[#ff9900]/10 transition-all group"
              >
                <ArrowLeft className="w-4 h-4 text-[#ff9900]" />
                <span className="font-medium text-gray-900">Boutique - Produits Pallmann</span>
              </Link>

              <Link
                to="/blog"
                className="flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-lg hover:bg-[#ff9900]/10 transition-all group"
              >
                <ArrowLeft className="w-4 h-4 text-[#ff9900]" />
                <span className="font-medium text-gray-900">Blog - Conseils parquet</span>
              </Link>

              <Link
                to="/panier"
                className="flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-lg hover:bg-[#ff9900]/10 transition-all group"
              >
                <ArrowLeft className="w-4 h-4 text-[#ff9900]" />
                <span className="font-medium text-gray-900">Mon panier</span>
              </Link>
            </div>
          </div>

          <div className="mt-8 p-6 bg-[#003366] rounded-xl text-white">
            <p className="mb-4">
              Besoin d'aide ?
            </p>
            <a
              href="mailto:contact@pallmann-store.com"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#ff9900] hover:bg-[#e68a00] text-white rounded-lg font-bold transition-all"
            >
              Nous contacter
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
