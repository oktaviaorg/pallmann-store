import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useCart, PICKUP_ADDRESS, DeliveryMode } from '../lib/CartContext';
import { ShoppingCart, Trash2, Plus, Minus, ArrowLeft, CreditCard, Truck, Tag, MapPin, Package, X } from 'lucide-react';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const CartPage: React.FC = () => {
  const { 
    items, 
    companyCode,
    deliveryMode,
    removeItem, 
    updateQuantity, 
    subtotalHT, 
    discountAmount,
    shippingHT, 
    totalHT, 
    totalTTC,
    itemCount,
    clearCart,
    setDeliveryMode,
    setCompanyCode
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
          deliveryMode,
          pickupAddress: deliveryMode === 'pickup' ? PICKUP_ADDRESS.full : null,
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
        <div className="min-h-screen flex flex-col bg-[#F7FAFC]">
          <Header />
          <main className="flex-grow pt-24 pb-16">
            <div className="max-w-4xl mx-auto px-4 text-center py-16">
              <div className="bg-[#EBF4FF] w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
                <ShoppingCart className="w-12 h-12 text-[#1E3A5F]" />
              </div>
              <h1 className="text-3xl font-bold text-[#1E3A5F] mb-4">Votre panier est vide</h1>
              <p className="text-[#64748B] mb-8">Découvrez nos produits Pallmann professionnels</p>
              <Link
                to="/"
                className="inline-flex items-center gap-2 bg-[#FBA600] hover:bg-[#E09500] text-white px-8 py-4 rounded-lg font-bold transition-all shadow-sm hover:shadow-md"
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
      <div className="min-h-screen flex flex-col bg-[#F7FAFC]">
        <Header />
        <main className="flex-grow pt-24 pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-[#1E3A5F] mb-4 flex items-center gap-3">
              <ShoppingCart className="w-8 h-8 text-[#FBA600]" />
              Votre panier ({itemCount} article{itemCount > 1 ? 's' : ''})
            </h1>

            {/* Indicateur Franco */}
            {(() => {
              const FRANCO_THRESHOLD = 630;
              const progress = Math.min((subtotalHT / FRANCO_THRESHOLD) * 100, 100);
              const remaining = FRANCO_THRESHOLD - subtotalHT;
              const isFrancoReached = subtotalHT >= FRANCO_THRESHOLD;
              
              return (
                <div className={`mb-8 p-4 rounded-xl border-2 ${isFrancoReached ? 'bg-green-50 border-green-300' : 'bg-amber-50 border-amber-200'}`}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Truck className={`w-5 h-5 ${isFrancoReached ? 'text-green-600' : 'text-amber-600'}`} />
                      <span className={`font-bold ${isFrancoReached ? 'text-green-700' : 'text-amber-700'}`}>
                        {isFrancoReached ? '🎉 Franco atteint ! Livraison gratuite' : `Plus que ${remaining.toFixed(2)}€ HT pour le franco`}
                      </span>
                    </div>
                    <span className="text-sm font-medium text-gray-600">
                      {subtotalHT.toFixed(2)}€ / {FRANCO_THRESHOLD}€ HT
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all duration-500 ${isFrancoReached ? 'bg-green-500' : 'bg-amber-500'}`}
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  {!isFrancoReached && (
                    <p className="text-xs text-gray-500 mt-2">
                      Ajoutez des produits pour bénéficier de la livraison gratuite !
                    </p>
                  )}
                </div>
              );
            })()}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Liste des produits */}
              <div className="lg:col-span-2 space-y-4">
                {items.map(item => (
                  <div key={item.id} className="bg-white rounded-xl shadow-card p-6 flex gap-4 border border-gray-100">
                    {item.image_url && (
                      <div className="bg-[#EBF4FF] rounded-lg p-2">
                        <img src={item.image_url} alt={item.name} className="w-24 h-24 object-contain" />
                      </div>
                    )}
                    <div className="flex-grow">
                      <h3 className="font-bold text-[#1E3A5F]">{item.name}</h3>
                      <p className="text-[#FBA600] font-bold">{item.price_ht.toFixed(2)}€ HT/{item.unit || 'L'}</p>
                      
                      <div className="flex items-center gap-3 mt-3">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1.5 rounded-lg bg-[#EBF4FF] hover:bg-[#C3DAFE] text-[#1E3A5F] transition-colors"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="font-bold w-8 text-center text-[#1E3A5F]">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1.5 rounded-lg bg-[#EBF4FF] hover:bg-[#C3DAFE] text-[#1E3A5F] transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="ml-auto p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-lg text-[#1E3A5F]">{(item.price_ht * item.quantity).toFixed(2)}€ HT</p>
                    </div>
                  </div>
                ))}

                <Link
                  to="/"
                  className="inline-flex items-center gap-2 text-[#2C5282] hover:text-[#FBA600] font-semibold transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Continuer mes achats
                </Link>
              </div>

              {/* Résumé et formulaire */}
              <div className="space-y-6">
                {/* Mode de livraison */}
                <div className="bg-white rounded-xl shadow-card p-6 border border-gray-100">
                  <h2 className="font-bold text-lg text-[#1E3A5F] mb-4 flex items-center gap-2">
                    <Package className="w-5 h-5 text-[#FBA600]" />
                    Mode de livraison
                  </h2>
                  
                  <div className="space-y-3">
                    {/* Option Livraison */}
                    <label className={`flex items-start gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      deliveryMode === 'delivery' 
                        ? 'border-[#FBA600] bg-[#FFFBEB]' 
                        : 'border-gray-200 hover:border-[#C3DAFE]'
                    }`}>
                      <input
                        type="radio"
                        name="deliveryMode"
                        value="delivery"
                        checked={deliveryMode === 'delivery'}
                        onChange={() => setDeliveryMode('delivery')}
                        className="mt-1 accent-[#FBA600]"
                      />
                      <div className="flex-grow">
                        <div className="flex items-center gap-2">
                          <Truck className="w-4 h-4 text-[#1E3A5F]" />
                          <span className="font-semibold text-[#1E3A5F]">Livraison France</span>
                        </div>
                        <p className="text-sm text-[#64748B] mt-1">
                          9,90€ HT / article
                        </p>
                        <p className="text-xs text-green-600 mt-1">
                          ✓ Franco de port à partir de 630€ HT
                        </p>
                      </div>
                      <span className="font-bold text-[#FBA600]">
                        {subtotalHT - discountAmount >= 630 ? 'Offert' : `${(itemCount * 9.90).toFixed(2)}€`}
                      </span>
                    </label>

                    {/* Option Retrait */}
                    <label className={`flex items-start gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      deliveryMode === 'pickup' 
                        ? 'border-[#FBA600] bg-[#FFFBEB]' 
                        : 'border-gray-200 hover:border-[#C3DAFE]'
                    }`}>
                      <input
                        type="radio"
                        name="deliveryMode"
                        value="pickup"
                        checked={deliveryMode === 'pickup'}
                        onChange={() => setDeliveryMode('pickup')}
                        className="mt-1 accent-[#FBA600]"
                      />
                      <div className="flex-grow">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-[#1E3A5F]" />
                          <span className="font-semibold text-[#1E3A5F]">Retrait sur place</span>
                        </div>
                        <p className="text-sm text-[#64748B] mt-1">
                          {PICKUP_ADDRESS.full}
                        </p>
                        <p className="text-xs text-[#64748B] mt-1">
                          Sur rendez-vous uniquement
                        </p>
                      </div>
                      <span className="font-bold text-green-600">GRATUIT</span>
                    </label>
                  </div>
                </div>

                {/* Résumé */}
                <div className="bg-white rounded-xl shadow-card p-6 border border-gray-100">
                  <h2 className="font-bold text-lg text-[#1E3A5F] mb-4">Récapitulatif</h2>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between text-[#2D3748]">
                      <span>Sous-total HT</span>
                      <span>{subtotalHT.toFixed(2)}€</span>
                    </div>
                    
                    {companyCode && (
                      <div className="flex justify-between items-center text-green-600 bg-green-50 -mx-2 px-2 py-1 rounded">
                        <span className="flex items-center gap-1">
                          <Tag className="w-4 h-4" />
                          Remise {companyCode.discount_percent}% ({companyCode.company_name})
                        </span>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold">-{discountAmount.toFixed(2)}€</span>
                          <button
                            onClick={() => {
                              setCompanyCode(null);
                              localStorage.removeItem('pallmann-company-code');
                            }}
                            className="p-1 hover:bg-red-100 rounded text-red-500 transition-colors"
                            title="Supprimer le code promo"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    )}
                    
                    <div className="flex justify-between text-[#2D3748]">
                      <span className="flex items-center gap-1">
                        {deliveryMode === 'pickup' ? (
                          <MapPin className="w-4 h-4 text-[#1E3A5F]" />
                        ) : (
                          <Truck className="w-4 h-4 text-[#1E3A5F]" />
                        )}
                        {deliveryMode === 'pickup' ? 'Retrait' : 'Livraison'}
                      </span>
                      <span>{shippingHT === 0 ? <span className="text-green-600">Offert</span> : `${shippingHT.toFixed(2)}€`}</span>
                    </div>
                    
                    {deliveryMode === 'delivery' && shippingHT > 0 && (
                      <p className="text-xs text-[#64748B]">Franco de port à partir de 630€ HT</p>
                    )}
                    
                    <div className="border-t border-gray-100 pt-2 mt-2">
                      <div className="flex justify-between font-bold text-[#1E3A5F]">
                        <span>Total HT</span>
                        <span>{totalHT.toFixed(2)}€</span>
                      </div>
                      <div className="flex justify-between text-[#64748B]">
                        <span>TVA (20%)</span>
                        <span>{(totalTTC - totalHT).toFixed(2)}€</span>
                      </div>
                      <div className="flex justify-between font-bold text-xl text-[#FBA600] mt-2">
                        <span>Total TTC</span>
                        <span>{totalTTC.toFixed(2)}€</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Formulaire client */}
                <div className="bg-white rounded-xl shadow-card p-6 border border-gray-100">
                  <h2 className="font-bold text-lg text-[#1E3A5F] mb-4">Vos informations</h2>
                  
                  <div className="space-y-4">
                    <input
                      type="email"
                      placeholder="Email *"
                      value={customerInfo.email}
                      onChange={e => setCustomerInfo({...customerInfo, email: e.target.value})}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#FBA600] focus:border-transparent text-[#2D3748]"
                      required
                    />
                    <input
                      type="text"
                      placeholder="Nom / Entreprise *"
                      value={customerInfo.name}
                      onChange={e => setCustomerInfo({...customerInfo, name: e.target.value})}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#FBA600] focus:border-transparent text-[#2D3748]"
                      required
                    />
                    <input
                      type="tel"
                      placeholder="Téléphone"
                      value={customerInfo.phone}
                      onChange={e => setCustomerInfo({...customerInfo, phone: e.target.value})}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#FBA600] focus:border-transparent text-[#2D3748]"
                    />
                    <input
                      type="text"
                      placeholder="Adresse de livraison *"
                      value={customerInfo.address}
                      onChange={e => setCustomerInfo({...customerInfo, address: e.target.value})}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#FBA600] focus:border-transparent text-[#2D3748]"
                      required
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="text"
                        placeholder="Code postal"
                        value={customerInfo.postalCode}
                        onChange={e => setCustomerInfo({...customerInfo, postalCode: e.target.value})}
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#FBA600] focus:border-transparent text-[#2D3748]"
                      />
                      <input
                        type="text"
                        placeholder="Ville"
                        value={customerInfo.city}
                        onChange={e => setCustomerInfo({...customerInfo, city: e.target.value})}
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#FBA600] focus:border-transparent text-[#2D3748]"
                      />
                    </div>
                  </div>

                  {error && (
                    <p className="text-red-500 text-sm mt-4">{error}</p>
                  )}

                  <button
                    onClick={handleCheckout}
                    disabled={loading}
                    className="w-full mt-6 bg-[#FBA600] hover:bg-[#E09500] text-white py-4 rounded-lg font-bold text-lg flex items-center justify-center gap-2 disabled:opacity-50 transition-all shadow-sm hover:shadow-md"
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
                  
                  <p className="text-xs text-[#64748B] text-center mt-3">
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
