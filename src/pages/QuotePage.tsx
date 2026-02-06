import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useQuote } from '../lib/QuoteContext';
import { supabase } from '../lib/supabase';
import { 
  FileText, 
  Trash2, 
  Plus, 
  Minus, 
  Send, 
  CheckCircle, 
  AlertCircle,
  ArrowLeft,
  Building2,
  User,
  Mail,
  Phone,
  MapPin,
  ShoppingBag
} from 'lucide-react';

interface QuoteFormData {
  company_name: string;
  contact_name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postal_code: string;
  message: string;
}

const QuotePage: React.FC = () => {
  const { items, removeItem, updateQuantity, clearQuote, totalHT } = useQuote();
  
  const [formData, setFormData] = useState<QuoteFormData>({
    company_name: '',
    contact_name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postal_code: '',
    message: '',
  });
  
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (items.length === 0) {
      setError('Veuillez ajouter au moins un produit à votre demande de devis');
      return;
    }
    
    if (!formData.contact_name || !formData.email) {
      setError('Veuillez remplir les champs obligatoires');
      return;
    }
    
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError('Veuillez entrer une adresse email valide');
      return;
    }

    setLoading(true);

    try {
      const quoteData = {
        products: items.map(item => ({
          id: item.id,
          name: item.name,
          quantity: item.quantity,
          price_ht: item.price_ht,
          unit: item.unit,
        })),
        company_name: formData.company_name || null,
        contact_name: formData.contact_name,
        email: formData.email,
        phone: formData.phone || null,
        address: formData.address || null,
        city: formData.city || null,
        postal_code: formData.postal_code || null,
        message: formData.message || null,
        total_ht: totalHT,
        status: 'pending',
      };

      const { error: dbError } = await supabase
        .from('quote_requests')
        .insert(quoteData);

      if (dbError) {
        console.error('Supabase error:', dbError);
        throw new Error('Erreur lors de l\'enregistrement');
      }

      // Optionnel : envoyer notification email
      try {
        await fetch('/api/send-quote-notification', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...formData, items, totalHT }),
        });
      } catch (e) {
        // Ignorer l'erreur si l'API n'existe pas
      }

      setSuccess(true);
      clearQuote();
      setFormData({
        company_name: '',
        contact_name: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        postal_code: '',
        message: '',
      });
    } catch (err: any) {
      setError(err.message || 'Une erreur est survenue. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <>
        <Helmet>
          <title>Demande envoyée | Pallmann Store</title>
        </Helmet>
        <div className="min-h-screen flex flex-col bg-gray-50">
          <Header />
          <main className="flex-grow flex items-center justify-center px-4 py-16">
            <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-10 h-10 text-green-500" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-4">
                Demande de devis envoyée !
              </h1>
              <p className="text-gray-600 mb-6">
                Nous avons bien reçu votre demande de devis. Notre équipe commerciale 
                vous contactera dans les plus brefs délais avec une proposition personnalisée.
              </p>
              <div className="space-y-3">
                <Link
                  to="/"
                  className="block w-full bg-[#FF6600] hover:bg-[#e65c00] text-white py-3 rounded-lg font-bold transition-all"
                >
                  Retour à la boutique
                </Link>
                <button
                  onClick={() => setSuccess(false)}
                  className="text-[#FF6600] hover:text-[#e65c00] font-semibold"
                >
                  Faire une nouvelle demande
                </button>
              </div>
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
        <title>Demande de devis | Pallmann Store</title>
        <meta name="description" content="Demandez un devis personnalisé pour vos produits Pallmann. Réponse rapide garantie." />
        <link rel="canonical" href="https://pallmann-store.com/demande-devis" />
      </Helmet>

      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />

        <main className="flex-grow">
          {/* Hero */}
          <div className="bg-gradient-to-r from-gray-800 to-gray-900 py-12">
            <div className="max-w-4xl mx-auto px-4 text-center">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-white text-sm font-semibold mb-4">
                <FileText className="w-4 h-4" />
                Devis personnalisé
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Demande de devis
              </h1>
              <p className="text-lg text-white/80">
                Sélectionnez vos produits et recevez une offre sur mesure
              </p>
            </div>
          </div>

          <div className="max-w-6xl mx-auto px-4 py-8">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-gray-600 hover:text-[#FF6600] mb-6 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Retour à la boutique
            </Link>

            {items.length === 0 ? (
              <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <ShoppingBag className="w-10 h-10 text-gray-400" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Votre demande de devis est vide
                </h2>
                <p className="text-gray-600 mb-6">
                  Parcourez notre catalogue et ajoutez des produits à votre demande de devis 
                  en cliquant sur le bouton "Ajouter au devis".
                </p>
                <Link
                  to="/"
                  className="inline-flex items-center gap-2 bg-[#FF6600] hover:bg-[#e65c00] text-white px-6 py-3 rounded-lg font-bold transition-all"
                >
                  Voir les produits
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Liste des produits */}
                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <ShoppingBag className="w-5 h-5 text-[#FF6600]" />
                    Produits sélectionnés ({items.length})
                  </h2>

                  <div className="space-y-4 mb-6">
                    {items.map(item => (
                      <div key={item.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                        {item.image_url && (
                          <img
                            src={item.image_url}
                            alt={item.name}
                            className="w-16 h-16 object-contain bg-white rounded-lg"
                          />
                        )}
                        <div className="flex-grow">
                          <h3 className="font-semibold text-gray-900 text-sm line-clamp-2">
                            {item.name}
                          </h3>
                          <p className="text-sm text-gray-500">
                            {item.price_ht > 0 
                              ? `${item.price_ht.toFixed(2)}€ HT/${item.unit || 'unité'}`
                              : 'Prix sur devis'}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1 rounded-lg hover:bg-gray-200 transition-colors"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="w-8 text-center font-semibold">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1 rounded-lg hover:bg-gray-200 transition-colors"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex justify-between items-center text-lg font-bold">
                      <span>Total estimé HT</span>
                      <span className="text-[#FF6600]">{totalHT.toFixed(2)}€</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      * Prix indicatif, le devis final pourra différer
                    </p>
                  </div>
                </div>

                {/* Formulaire */}
                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">
                    Vos coordonnées
                  </h2>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">
                        <Building2 className="w-4 h-4 inline mr-1" />
                        Entreprise (optionnel)
                      </label>
                      <input
                        type="text"
                        name="company_name"
                        value={formData.company_name}
                        onChange={handleChange}
                        placeholder="Nom de votre entreprise"
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6600] focus:border-transparent transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">
                        <User className="w-4 h-4 inline mr-1" />
                        Nom du contact *
                      </label>
                      <input
                        type="text"
                        name="contact_name"
                        value={formData.contact_name}
                        onChange={handleChange}
                        placeholder="Prénom Nom"
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6600] focus:border-transparent transition-all"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">
                          <Mail className="w-4 h-4 inline mr-1" />
                          Email *
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="contact@entreprise.fr"
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6600] focus:border-transparent transition-all"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">
                          <Phone className="w-4 h-4 inline mr-1" />
                          Téléphone
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="06 12 34 56 78"
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6600] focus:border-transparent transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">
                        <MapPin className="w-4 h-4 inline mr-1" />
                        Adresse de livraison
                      </label>
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        placeholder="Numéro et rue"
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6600] focus:border-transparent transition-all mb-2"
                      />
                      <div className="grid grid-cols-2 gap-2">
                        <input
                          type="text"
                          name="postal_code"
                          value={formData.postal_code}
                          onChange={handleChange}
                          placeholder="Code postal"
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6600] focus:border-transparent transition-all"
                        />
                        <input
                          type="text"
                          name="city"
                          value={formData.city}
                          onChange={handleChange}
                          placeholder="Ville"
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6600] focus:border-transparent transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">
                        Message (optionnel)
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Précisions sur votre projet, délais souhaités..."
                        rows={3}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6600] focus:border-transparent transition-all resize-none"
                      />
                    </div>

                    {error && (
                      <div className="flex items-center gap-2 text-red-600 bg-red-50 p-3 rounded-lg">
                        <AlertCircle className="w-5 h-5 flex-shrink-0" />
                        <span className="text-sm">{error}</span>
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-[#FF6600] hover:bg-[#e65c00] text-white py-3.5 rounded-lg font-bold flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                          Envoi en cours...
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5" />
                          Envoyer ma demande de devis
                        </>
                      )}
                    </button>

                    <p className="text-xs text-gray-500 text-center">
                      Nous vous répondrons sous 24-48h ouvrées
                    </p>
                  </form>
                </div>
              </div>
            )}
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default QuotePage;
