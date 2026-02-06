import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useCart } from '../lib/CartContext';
import { ShoppingCart, Trash2, Plus, Minus, ArrowLeft, CreditCard, Truck, Tag, CheckCircle } from 'lucide-react';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const CartPage: React.FC = () => {
  const { 
    items, 
    companyCode,
    removeItem, 
    updateQuantity, 
    subtotalHT, 
    discountAmount,
    shippingHT, 
    totalHT, 
    totalTTC,
    itemCount,
    clearCart
  } = useCart();

  const [customerInfo, setCustomerInfo] = useState({
    email: '',
    name: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleCheckout = async () => {
    if (!customerInfo.email || !customerInfo.name || !customerInfo.address) {
      setError('Veuillez remplir tous les champs obligatoires');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: items.map(item => ({
            id: item.id,
            name: item.name,
            price_ht: item.price_ht,
            quantity: item.quantity,
          })),
          customerInfo,
          companyCode: companyCode ? {
            id: companyCode.id,
            code: companyCode.code,
            discount_percent: companyCode.discount_percent,
          } : null,
          subtotalHT,
          discountAmount,
          shippingHT,
          totalHT,
          totalTTC,
        }),
      });

      const { sessionId, error: apiError } = await response.json();

      if (apiError) {
        setError(apiError);
        return;
      }

      const stripe = await stripePromise;
      if (stripe) {
        const { error: stripeError } = await stripe.redirectToCheckout({ sessionId });
        if (stripeError) {
          setError(stripeError.message || 'Erreur de paiement');
        }
      }
    } catch (err) {
      setError('Une erreur est survenue. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <>
        <Helmet>
          <title>Panier vide | Pallmann Store</title>
        </Helmet>
        <div className="min-h-screen flex flex-col bg-gray-50">
          <Header />
          <main className="flex-grow pt-24 pb-16">
            <div className="max-w-4xl mx-auto px-4 text-center py-16">
              <ShoppingCart className="w-24 h-24 text-gray-300 mx-auto mb-6" />
              <h1 className="text-3xl font-bold text-gray-900 mb-4">Votre panier est vide</h1>
              <p className="text-gray-600 mb-8">Découvrez nos produits Pallmann professionnels</p>
              <Link
                to="/boutique"
                className="inline-flex items-center gap-2 bg-[#ff9900] hover:bg-[#f0c300] text-white px-8 py-4 rounded-lg font-bold transition-all"
              >
                <ArrowLeft className="w-5 h-5" />
                Retour à la boutique
              </Link>
            </div>
          </main>
          <Footer />
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Panier ({itemCount}) | Pallmann Store</title>
      </Helmet>
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />
        <main className="flex-grow pt-24 pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
              <ShoppingCart className="w-8 h-8 text-[#ff9900]" />
              Votre panier ({itemCount} article{itemCount > 1 ? 's' : ''})
            </h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Liste des produits */}
              <div className="lg:col-span-2 space-y-4">
                {items.map(item => (
                  <div key={item.id} className="bg-white rounded-xl shadow-md p-6 flex gap-4">
                    {item.image_url && (
                      <img src={item.image_url} alt={item.name} className="w-24 h-24 object-contain" />
                    )}
                    <div className="flex-grow">
                      <h3 className="font-bold text-gray-900">{item.name}</h3>
                      <p className="text-[#ff9900] font-bold">{item.price_ht.toFixed(2)}€ HT/{item.unit || 'L'}</p>
                      
                      <div className="flex items-center gap-3 mt-3">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1 rounded bg-gray-100 hover:bg-gray-200"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="font-bold w-8 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1 rounded bg-gray-100 hover:bg-gray-200"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="ml-auto p-2 text-red-500 hover:bg-red-50 rounded"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-lg">{(item.price_ht * item.quantity).toFixed(2)}€ HT</p>
                    </div>
                  </div>
                ))}

                <Link
                  to="/boutique"
                  className="inline-flex items-center gap-2 text-[#ff9900] hover:text-[#f0c300] font-semibold"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Continuer mes achats
                </Link>
              </div>

              {/* Résumé et formulaire */}
              <div className="space-y-6">
                {/* Résumé */}
                <div className="bg-white rounded-xl shadow-md p-6">
                  <h2 className="font-bold text-lg mb-4">Récapitulatif</h2>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Sous-total HT</span>
                      <span>{subtotalHT.toFixed(2)}€</span>
                    </div>
                    
                    {companyCode && (
                      <div className="flex justify-between text-green-600">
                        <span className="flex items-center gap-1">
                          <Tag className="w-4 h-4" />
                          Remise {companyCode.discount_percent}%
                        </span>
                        <span>-{discountAmount.toFixed(2)}€</span>
                      </div>
                    )}
                    
                    <div className="flex justify-between">
                      <span className="flex items-center gap-1">
                        <Truck className="w-4 h-4" />
                        Livraison
                      </span>
                      <span>{shippingHT === 0 ? <span className="text-green-600">Offerte</span> : `${shippingHT.toFixed(2)}€`}</span>
                    </div>
                    
                    {shippingHT > 0 && (
                      <p className="text-xs text-gray-500">Franco de port à partir de 630€ HT</p>
                    )}
                    
                    <div className="border-t pt-2 mt-2">
                      <div className="flex justify-between font-bold">
                        <span>Total HT</span>
                        <span>{totalHT.toFixed(2)}€</span>
                      </div>
                      <div className="flex justify-between text-gray-600">
                        <span>TVA (20%)</span>
                        <span>{(totalTTC - totalHT).toFixed(2)}€</span>
                      </div>
                      <div className="flex justify-between font-bold text-xl text-[#ff9900] mt-2">
                        <span>Total TTC</span>
                        <span>{totalTTC.toFixed(2)}€</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Formulaire client */}
                <div className="bg-white rounded-xl shadow-md p-6">
                  <h2 className="font-bold text-lg mb-4">Vos informations</h2>
                  
                  <div className="space-y-4">
                    <input
                      type="email"
                      placeholder="Email *"
                      value={customerInfo.email}
                      onChange={e => setCustomerInfo({...customerInfo, email: e.target.value})}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#ff9900]"
                      required
                    />
                    <input
                      type="text"
                      placeholder="Nom / Entreprise *"
                      value={customerInfo.name}
                      onChange={e => setCustomerInfo({...customerInfo, name: e.target.value})}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#ff9900]"
                      required
                    />
                    <input
                      type="tel"
                      placeholder="Téléphone"
                      value={customerInfo.phone}
                      onChange={e => setCustomerInfo({...customerInfo, phone: e.target.value})}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#ff9900]"
                    />
                    <input
                      type="text"
                      placeholder="Adresse de livraison *"
                      value={customerInfo.address}
                      onChange={e => setCustomerInfo({...customerInfo, address: e.target.value})}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#ff9900]"
                      required
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="text"
                        placeholder="Code postal"
                        value={customerInfo.postalCode}
                        onChange={e => setCustomerInfo({...customerInfo, postalCode: e.target.value})}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#ff9900]"
                      />
                      <input
                        type="text"
                        placeholder="Ville"
                        value={customerInfo.city}
                        onChange={e => setCustomerInfo({...customerInfo, city: e.target.value})}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#ff9900]"
                      />
                    </div>
                  </div>

                  {error && (
                    <p className="text-red-500 text-sm mt-4">{error}</p>
                  )}

                  <button
                    onClick={handleCheckout}
                    disabled={loading}
                    className="w-full mt-6 bg-[#ff9900] hover:bg-[#f0c300] text-white py-4 rounded-lg font-bold text-lg flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {loading ? (
                      'Chargement...'
                    ) : (
                      <>
                        <CreditCard className="w-5 h-5" />
                        Payer {totalTTC.toFixed(2)}€
                      </>
                    )}
                  </button>
                  
                  <p className="text-xs text-gray-500 text-center mt-3">
                    Paiement sécurisé par Stripe
                  </p>
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

export default CartPage;
