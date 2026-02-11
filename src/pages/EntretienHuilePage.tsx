import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Droplets, Sparkles, Clock, CheckCircle, Gift, ShoppingCart, Copy, Check } from 'lucide-react';

const EntretienHuilePage: React.FC = () => {
  const [codeCopied, setCodeCopied] = useState(false);
  const promoCode = "HUILE10";

  const copyCode = () => {
    navigator.clipboard.writeText(promoCode);
    setCodeCopied(true);
    setTimeout(() => setCodeCopied(false), 2000);
  };

  const products = [
    {
      name: "Clean",
      description: "Nettoyant doux pour parquets huilés - préserve la finition",
      usage: "Diluer 50ml dans 5L d'eau tiède. Passer la serpillière bien essorée.",
      frequency: "1 à 2 fois par semaine",
      image: "https://fr.pallmann.net/fileadmin/_processed_/a/7/csm_PALLMANN_dummy_Clean_1l_msl_2023-07_c7b3c1a3a3.png"
    },
    {
      name: "Magic Oil Care",
      description: "Soin nourrissant qui ravive et protège l'huile",
      usage: "Appliquer pur sur sol propre. Étaler au balai microfibre. Laisser sécher 1h.",
      frequency: "Tous les 1 à 3 mois selon passage",
      image: "https://fr.pallmann.net/fileadmin/_processed_/f/1/csm_PALLMANN_dummy_Magic_Oil_Care_1l_msl_2023-07_a2b4c1a3a3.png"
    },
    {
      name: "Magic Oil Refresher",
      description: "Rénovation express pour parquet huilé terne ou usé",
      usage: "Nettoyer au Clean, laisser sécher, appliquer le Refresher en couche fine.",
      frequency: "1 à 2 fois par an ou selon besoin",
      image: "https://fr.pallmann.net/fileadmin/_processed_/d/3/csm_PALLMANN_dummy_Magic_Oil_Refresher_1l_msl_2023-07_b3c5d1a3a3.png"
    },
    {
      name: "Eco Oil Care",
      description: "Entretien écologique à base d'huiles naturelles",
      usage: "Diluer 100ml dans 5L d'eau. Passer au balai microfibre.",
      frequency: "Entretien régulier hebdomadaire",
      image: "https://fr.pallmann.net/fileadmin/_processed_/e/4/csm_PALLMANN_dummy_Eco_Oil_Care_1l_msl_2023-07_c4d6e1a3a3.png"
    }
  ];

  return (
    <>
      <Helmet>
        <title>Entretien Parquet Huilé | Guide & Produits | Pallmann Store</title>
        <meta name="description" content="Guide complet pour entretenir votre parquet huilé. Produits professionnels Pallmann + code promo exclusif -10%." />
        <link rel="canonical" href="https://pallmann-store.com/entretien-parquet-huile" />
      </Helmet>

      <div className="min-h-screen flex flex-col bg-[#F7FAFC]">
        <Header />

        <main className="flex-grow">
          {/* Hero */}
          <div className="bg-gradient-to-br from-[#8B4513] via-[#A0522D] to-[#6B3E26] text-white py-16">
            <div className="max-w-4xl mx-auto px-4 text-center">
              <div className="inline-flex items-center gap-2 bg-white/20 text-white px-4 py-2 rounded-full mb-6">
                <Droplets className="w-5 h-5" />
                <span className="font-semibold">Parquet Huilé</span>
              </div>
              <h1 className="text-3xl md:text-5xl font-bold mb-6">
                Entretien de votre <span className="text-[#FFD700]">Parquet Huilé</span>
              </h1>
              <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                Votre parquet huilé mérite un soin adapté ! Découvrez les produits qui nourrissent et protègent le bois naturellement.
              </p>
              
              {/* Code Promo */}
              <div className="bg-gradient-to-r from-[#FFD700] to-[#FFA500] rounded-2xl p-6 max-w-md mx-auto text-[#4A3728]">
                <div className="flex items-center justify-center gap-2 mb-3">
                  <Gift className="w-6 h-6" />
                  <span className="font-bold text-lg">Code Promo Exclusif</span>
                </div>
                <div className="bg-white/40 backdrop-blur rounded-xl p-4 mb-3">
                  <span className="text-3xl font-mono font-bold tracking-wider">{promoCode}</span>
                </div>
                <button
                  onClick={copyCode}
                  className="flex items-center justify-center gap-2 bg-[#4A3728] text-white px-6 py-3 rounded-lg font-bold hover:bg-[#3A2718] transition-all w-full"
                >
                  {codeCopied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                  {codeCopied ? 'Copié !' : 'Copier le code'}
                </button>
                <p className="text-sm mt-3">-10% sur tous les produits d'entretien huile</p>
              </div>
            </div>
          </div>

          {/* Conseils rapides */}
          <div className="py-12 bg-white">
            <div className="max-w-4xl mx-auto px-4">
              <h2 className="text-2xl font-bold text-center mb-8">Les règles d'or du parquet huilé</h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
                  <CheckCircle className="w-10 h-10 text-green-600 mx-auto mb-3" />
                  <h3 className="font-bold text-green-800 mb-2">À faire</h3>
                  <ul className="text-sm text-green-700 text-left space-y-1">
                    <li>✓ Dépoussiérer souvent</li>
                    <li>✓ Nourrir régulièrement</li>
                    <li>✓ Produits Pallmann Magic Oil</li>
                    <li>✓ Serpillière micro-fibre</li>
                  </ul>
                </div>
                <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
                  <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-red-600 text-xl font-bold">✕</span>
                  </div>
                  <h3 className="font-bold text-red-800 mb-2">À éviter</h3>
                  <ul className="text-sm text-red-700 text-left space-y-1">
                    <li>✕ Eau stagnante (encore plus sensible !)</li>
                    <li>✕ Savon noir / Marseille</li>
                    <li>✕ Produits pour vitrifiés</li>
                    <li>✕ Cire classique</li>
                  </ul>
                </div>
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 text-center">
                  <Clock className="w-10 h-10 text-amber-600 mx-auto mb-3" />
                  <h3 className="font-bold text-amber-800 mb-2">Fréquence</h3>
                  <ul className="text-sm text-amber-700 text-left space-y-1">
                    <li>• Quotidien : balai/aspirateur</li>
                    <li>• Hebdo : Clean dilué</li>
                    <li>• 1-3 mois : Magic Oil Care</li>
                    <li>• Annuel : Refresher si besoin</li>
                  </ul>
                </div>
              </div>
              
              {/* Note spéciale huilé */}
              <div className="mt-8 bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-lg">
                <p className="text-amber-800">
                  <strong>💡 Bon à savoir :</strong> Un parquet huilé "vit" avec le temps. Contrairement au vitrifié, 
                  il peut être rénové localement (une lame abîmée) sans refaire tout le sol. L'entretien régulier 
                  avec Magic Oil Care nourrit le bois et prolonge considérablement sa durée de vie.
                </p>
              </div>
            </div>
          </div>

          {/* Produits recommandés */}
          <div className="py-12 bg-gradient-to-b from-[#F7FAFC] to-[#FFF8F0]">
            <div className="max-w-4xl mx-auto px-4">
              <h2 className="text-2xl font-bold text-center mb-2">Produits recommandés</h2>
              <p className="text-center text-gray-600 mb-8">La gamme Magic Oil spécialement conçue pour les parquets huilés</p>
              
              <div className="space-y-6">
                {products.map((product, idx) => (
                  <div key={idx} className="bg-white rounded-xl shadow-md overflow-hidden">
                    <div className="md:flex">
                      <div className="md:w-1/3 bg-gradient-to-br from-amber-50 to-orange-50 p-6 flex items-center justify-center">
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
                          className="inline-flex items-center gap-2 bg-[#8B4513] hover:bg-[#6B3E26] text-white px-4 py-2 rounded-lg font-bold text-sm transition-all"
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
              <div className="mt-12 bg-gradient-to-r from-[#8B4513] to-[#A0522D] rounded-2xl p-8 text-center text-white">
                <h3 className="text-2xl font-bold mb-4">Prenez soin de votre parquet huilé</h3>
                <p className="mb-6 text-white/90">Livraison rapide • Franco dès 630€ HT • Conseil technique gratuit</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    to="/boutique"
                    className="inline-flex items-center justify-center gap-2 bg-[#FFD700] text-[#4A3728] px-8 py-4 rounded-lg font-bold hover:bg-[#FFA500] transition-all"
                  >
                    <ShoppingCart className="w-5 h-5" />
                    Voir la boutique
                  </Link>
                  <button
                    onClick={copyCode}
                    className="inline-flex items-center justify-center gap-2 bg-white/20 text-white border-2 border-white px-8 py-4 rounded-lg font-bold hover:bg-white/30 transition-all"
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

export default EntretienHuilePage;
