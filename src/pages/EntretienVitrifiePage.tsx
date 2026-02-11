import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { ShieldCheck, Sparkles, Clock, CheckCircle, Gift, ShoppingCart, Copy, Check } from 'lucide-react';

const EntretienVitrifiePage: React.FC = () => {
  const [codeCopied, setCodeCopied] = useState(false);
  const promoCode = "VITRI10";

  const copyCode = () => {
    navigator.clipboard.writeText(promoCode);
    setCodeCopied(true);
    setTimeout(() => setCodeCopied(false), 2000);
  };

  const products = [
    {
      name: "Clean",
      description: "Nettoyant d'entretien quotidien pour parquets vitrifiés",
      usage: "Diluer 50ml dans 5L d'eau tiède. Passer la serpillière bien essorée.",
      frequency: "1 à 2 fois par semaine",
      image: "https://fr.pallmann.net/fileadmin/_processed_/a/7/csm_PALLMANN_dummy_Clean_1l_msl_2023-07_c7b3c1a3a3.png"
    },
    {
      name: "Finish Care",
      description: "Soin protecteur qui ravive et protège le vitrificateur",
      usage: "Appliquer pur sur sol propre et sec. Laisser sécher 30 min.",
      frequency: "1 fois par mois ou selon passage",
      image: "https://fr.pallmann.net/fileadmin/_processed_/8/8/csm_PALLMANN_dummy_Finish_Care_1l_msl_2023-07_e4c5f1a3a3.png"
    },
    {
      name: "Finish Care Strong",
      description: "Protection renforcée pour zones à fort passage",
      usage: "Appliquer 2 couches fines. Attendre 1h entre les couches.",
      frequency: "2 à 4 fois par an",
      image: "https://fr.pallmann.net/fileadmin/_processed_/c/5/csm_PALLMANN_dummy_Finish_Care_Strong_1l_msl_2023-07_d3a4f2a3a3.png"
    }
  ];

  return (
    <>
      <Helmet>
        <title>Entretien Parquet Vitrifié | Guide & Produits | Pallmann Store</title>
        <meta name="description" content="Guide complet pour entretenir votre parquet vitrifié. Produits professionnels Pallmann + code promo exclusif -10%." />
        <link rel="canonical" href="https://pallmann-store.com/entretien-parquet-vitrifie" />
      </Helmet>

      <div className="min-h-screen flex flex-col bg-[#F7FAFC]">
        <Header />

        <main className="flex-grow">
          {/* Hero */}
          <div className="bg-gradient-to-br from-[#1A1A1A] via-[#2D2D2D] to-[#1A1A1A] text-white py-16">
            <div className="max-w-4xl mx-auto px-4 text-center">
              <div className="inline-flex items-center gap-2 bg-[#FF9900]/20 text-[#FF9900] px-4 py-2 rounded-full mb-6">
                <ShieldCheck className="w-5 h-5" />
                <span className="font-semibold">Parquet Vitrifié</span>
              </div>
              <h1 className="text-3xl md:text-5xl font-bold mb-6">
                Entretien de votre <span className="text-[#FF9900]">Parquet Vitrifié</span>
              </h1>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Félicitations pour votre nouveau parquet ! Voici les produits et conseils pour le garder beau pendant des années.
              </p>
              
              {/* Code Promo */}
              <div className="bg-gradient-to-r from-[#FF9900] to-[#E67E22] rounded-2xl p-6 max-w-md mx-auto">
                <div className="flex items-center justify-center gap-2 mb-3">
                  <Gift className="w-6 h-6" />
                  <span className="font-bold text-lg">Code Promo Exclusif</span>
                </div>
                <div className="bg-white/20 backdrop-blur rounded-xl p-4 mb-3">
                  <span className="text-3xl font-mono font-bold tracking-wider">{promoCode}</span>
                </div>
                <button
                  onClick={copyCode}
                  className="flex items-center justify-center gap-2 bg-white text-[#E67E22] px-6 py-3 rounded-lg font-bold hover:bg-gray-100 transition-all w-full"
                >
                  {codeCopied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                  {codeCopied ? 'Copié !' : 'Copier le code'}
                </button>
                <p className="text-sm mt-3 text-white/80">-10% sur tous les produits d'entretien</p>
              </div>
            </div>
          </div>

          {/* Conseils rapides */}
          <div className="py-12 bg-white">
            <div className="max-w-4xl mx-auto px-4">
              <h2 className="text-2xl font-bold text-center mb-8">Les règles d'or</h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
                  <CheckCircle className="w-10 h-10 text-green-600 mx-auto mb-3" />
                  <h3 className="font-bold text-green-800 mb-2">À faire</h3>
                  <ul className="text-sm text-green-700 text-left space-y-1">
                    <li>✓ Dépoussiérer régulièrement</li>
                    <li>✓ Serpillière bien essorée</li>
                    <li>✓ Produits Pallmann adaptés</li>
                    <li>✓ Patins sous les meubles</li>
                  </ul>
                </div>
                <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
                  <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-red-600 text-xl font-bold">✕</span>
                  </div>
                  <h3 className="font-bold text-red-800 mb-2">À éviter</h3>
                  <ul className="text-sm text-red-700 text-left space-y-1">
                    <li>✕ Eau stagnante</li>
                    <li>✕ Produits agressifs (javel...)</li>
                    <li>✕ Serpillière trop mouillée</li>
                    <li>✕ Cire ou polish</li>
                  </ul>
                </div>
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 text-center">
                  <Clock className="w-10 h-10 text-blue-600 mx-auto mb-3" />
                  <h3 className="font-bold text-blue-800 mb-2">Fréquence</h3>
                  <ul className="text-sm text-blue-700 text-left space-y-1">
                    <li>• Quotidien : balai/aspirateur</li>
                    <li>• Hebdo : Clean dilué</li>
                    <li>• Mensuel : Finish Care</li>
                    <li>• Annuel : Finish Care Strong</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Produits recommandés */}
          <div className="py-12">
            <div className="max-w-4xl mx-auto px-4">
              <h2 className="text-2xl font-bold text-center mb-2">Produits recommandés</h2>
              <p className="text-center text-gray-600 mb-8">Sélectionnés par nos techniciens pour votre parquet vitrifié</p>
              
              <div className="space-y-6">
                {products.map((product, idx) => (
                  <div key={idx} className="bg-white rounded-xl shadow-md overflow-hidden">
                    <div className="md:flex">
                      <div className="md:w-1/3 bg-gradient-to-br from-gray-50 to-gray-100 p-6 flex items-center justify-center">
                        <img src={product.image} alt={product.name} className="h-40 object-contain" />
                      </div>
                      <div className="md:w-2/3 p-6">
                        <h3 className="text-xl font-bold text-[#1A1A1A] mb-2">{product.name}</h3>
                        <p className="text-gray-600 mb-4">{product.description}</p>
                        <div className="grid md:grid-cols-2 gap-4 mb-4">
                          <div>
                            <span className="text-xs font-bold text-gray-500 uppercase">Mode d'emploi</span>
                            <p className="text-sm text-gray-700">{product.usage}</p>
                          </div>
                          <div>
                            <span className="text-xs font-bold text-gray-500 uppercase">Fréquence</span>
                            <p className="text-sm text-gray-700">{product.frequency}</p>
                          </div>
                        </div>
                        <Link
                          to="/boutique"
                          className="inline-flex items-center gap-2 bg-[#FF9900] hover:bg-[#E67E22] text-white px-4 py-2 rounded-lg font-bold text-sm transition-all"
                        >
                          <ShoppingCart className="w-4 h-4" />
                          Commander
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* CTA Final */}
              <div className="mt-12 bg-gradient-to-r from-[#FF9900] to-[#E67E22] rounded-2xl p-8 text-center text-white">
                <h3 className="text-2xl font-bold mb-4">Commandez vos produits d'entretien</h3>
                <p className="mb-6 text-white/90">Livraison rapide • Franco dès 630€ HT • Conseil technique gratuit</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    to="/boutique"
                    className="inline-flex items-center justify-center gap-2 bg-white text-[#E67E22] px-8 py-4 rounded-lg font-bold hover:bg-gray-100 transition-all"
                  >
                    <ShoppingCart className="w-5 h-5" />
                    Voir la boutique
                  </Link>
                  <button
                    onClick={copyCode}
                    className="inline-flex items-center justify-center gap-2 bg-[#1A1A1A] text-white px-8 py-4 rounded-lg font-bold hover:bg-black transition-all"
                  >
                    <Gift className="w-5 h-5" />
                    Code : {promoCode}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default EntretienVitrifiePage;
