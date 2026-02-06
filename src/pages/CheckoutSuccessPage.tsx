import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useSearchParams } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useCart } from '../lib/CartContext';
import { CheckCircle, Package, Mail, ArrowRight } from 'lucide-react';

const CheckoutSuccessPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const { clearCart } = useCart();

  useEffect(() => {
    // Vider le panier après paiement réussi
    clearCart();
  }, []);

  return (
    <>
      <Helmet>
        <title>Commande confirmée | Pallmann Store</title>
      </Helmet>
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />
        <main className="flex-grow pt-24 pb-16">
          <div className="max-w-2xl mx-auto px-4 text-center py-16">
            <div className="bg-green-100 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-16 h-16 text-green-600" />
            </div>
            
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Merci pour votre commande !
            </h1>
            
            <p className="text-gray-600 mb-8">
              Votre paiement a été accepté. Vous allez recevoir un email de confirmation.
            </p>

            <div className="bg-white rounded-xl shadow-md p-6 mb-8 text-left">
              <div className="flex items-start gap-4 mb-4">
                <Mail className="w-6 h-6 text-[#ff9900] flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold">Confirmation par email</h3>
                  <p className="text-sm text-gray-600">Un récapitulatif de votre commande vous a été envoyé</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <Package className="w-6 h-6 text-[#ff9900] flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold">Livraison</h3>
                  <p className="text-sm text-gray-600">Votre commande sera expédiée sous 24-48h ouvrées</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/boutique"
                className="inline-flex items-center justify-center gap-2 bg-[#ff9900] hover:bg-[#f0c300] text-white px-8 py-4 rounded-lg font-bold transition-all"
              >
                Continuer mes achats
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>

            {sessionId && (
              <p className="text-xs text-gray-400 mt-8">
                Référence : {sessionId.slice(0, 20)}...
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
