import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useSearchParams } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { CheckCircle, Package, Mail, ArrowRight, Home } from 'lucide-react';
import { useCart } from '../lib/CartContext';

const CheckoutSuccessPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const { clearCart } = useCart();
  const [cleared, setCleared] = useState(false);

  // Vider le panier une seule fois
  useEffect(() => {
    if (!cleared) {
      clearCart();
      setCleared(true);
    }
  }, [clearCart, cleared]);

  return (
    <>
      <Helmet>
        <title>Commande confirmée | Pallmann Store</title>
        <meta name="robots" content="noindex" />
      </Helmet>
      
      <div className="min-h-screen flex flex-col bg-[#F7FAFC]">
        <Header />
        
        <main className="flex-grow pt-24 pb-16">
          <div className="max-w-2xl mx-auto px-4 text-center">
            {/* Icône succès */}
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
              <CheckCircle className="w-14 h-14 text-green-600" />
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-4">
              🎉 Commande confirmée !
            </h1>
            
            <p className="text-lg text-[#6B6B6B] mb-8">
              Merci pour votre achat. Votre commande a bien été enregistrée.
            </p>

            {/* Infos commande */}
            <div className="bg-white rounded-2xl shadow-card p-6 mb-8 text-left border border-gray-100">
              <h2 className="font-bold text-lg text-[#1A1A1A] mb-4 flex items-center gap-2">
                <Package className="w-5 h-5 text-[#FF9900]" />
                Prochaines étapes
              </h2>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-[#FF9900] text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                    1
                  </div>
                  <div>
                    <p className="font-semibold text-[#1A1A1A]">Email de confirmation</p>
                    <p className="text-sm text-[#6B6B6B]">
                      Vous allez recevoir un email avec le récapitulatif de votre commande.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-[#FF9900] text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                    2
                  </div>
                  <div>
                    <p className="font-semibold text-[#1A1A1A]">Préparation</p>
                    <p className="text-sm text-[#6B6B6B]">
                      Expédition sous 3 jours ouvrés.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-[#FF9900] text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                    3
                  </div>
                  <div>
                    <p className="font-semibold text-[#1A1A1A]">Expédition</p>
                    <p className="text-sm text-[#6B6B6B]">
                      Vous recevrez un email avec le numéro de suivi dès l'expédition.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact */}
            <div className="bg-[#FFF8F0] rounded-xl p-4 mb-8 border border-[#FFE4C4]">
              <p className="text-sm text-[#8B6914]">
                <Mail className="w-4 h-4 inline mr-1" />
                Une question ? Contactez-nous à{' '}
                <a href="mailto:contact@pallmann-store.com" className="font-semibold underline">
                  contact@pallmann-store.com
                </a>
              </p>
            </div>

            {/* Boutons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/"
                className="inline-flex items-center justify-center gap-2 bg-[#FF9900] hover:bg-[#F0C300] text-white px-6 py-3 rounded-lg font-bold transition-all"
              >
                <Home className="w-5 h-5" />
                Retour à l'accueil
              </Link>
              <Link
                to="/boutique"
                className="inline-flex items-center justify-center gap-2 border-2 border-[#FF9900] text-[#FF9900] hover:bg-[#FFF8F0] px-6 py-3 rounded-lg font-bold transition-all"
              >
                Continuer mes achats
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>

            {/* Référence session (debug) */}
            {sessionId && (
              <p className="mt-8 text-xs text-gray-400">
                Réf: {sessionId.substring(0, 20)}...
              </p>
            )}
          </div>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default CheckoutSuccessPage;
