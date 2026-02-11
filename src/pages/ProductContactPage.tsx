import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Phone, Mail, ShoppingCart, Clock, CheckCircle, AlertCircle, Home, ChevronRight } from 'lucide-react';
import { supabase } from '../lib/supabase';

const ProductContactPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const productName = searchParams.get('produit') || '';

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    product: productName,
    message: ''
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (productName) {
      setFormData(prev => ({ ...prev, product: productName }));
    }
  }, [productName]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { error: insertError } = await supabase
        .from('form_submissions')
        .insert([{
          full_name: formData.name,
          email: formData.email,
          phone: formData.phone,
          service_type: 'Demande produit',
          message: `Produit demandé: ${formData.product}\n\n${formData.message}`,
          surface: 0,
          postal_code: ''
        }]);

      if (insertError) throw insertError;

      setSubmitted(true);

      setTimeout(() => {
        navigate('/boutique');
      }, 4000);
    } catch (err) {
      console.error('Error submitting form:', err);
      setError('Une erreur est survenue. Veuillez réessayer ou nous contacter directement par téléphone.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  if (submitted) {
    return (
      <>
        <Helmet>
          <title>Demande envoyée - Les Ponceurs Réunis</title>
        </Helmet>
        <div className="min-h-screen flex flex-col bg-gray-50">
          <Header />
          <main className="flex-grow flex items-center justify-center pt-24 pb-16 px-4">
            <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Demande envoyée !</h2>
              <p className="text-gray-600 mb-6">
                Nous avons bien reçu votre demande concernant <strong>{formData.product}</strong>.
                Nous vous recontacterons dans les plus brefs délais.
              </p>
              <p className="text-sm text-gray-500">Redirection vers la boutique...</p>
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
        <title>Commander un produit - Boutique Pallmann | Les Ponceurs Réunis</title>
        <meta name="description" content="Contactez-nous pour commander vos produits Pallmann. Paiement en ligne bientôt disponible." />
        <link rel="canonical" href="https://ponceur-parquet.fr/boutique/contact" />
      </Helmet>

      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />

        <main className="flex-grow pt-24 pb-16">
          {/* Breadcrumb Navigation */}
          <div className="bg-white border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
              <nav className="flex items-center space-x-2 text-sm">
                <Link to="/" className="text-gray-500 hover:text-[#C41E3A] transition-colors flex items-center gap-1">
                  <Home className="w-4 h-4" />
                  <span>Accueil</span>
                </Link>
                <ChevronRight className="w-4 h-4 text-gray-400" />
                <Link to="/boutique" className="text-gray-500 hover:text-[#C41E3A] transition-colors">
                  Boutique
                </Link>
                <ChevronRight className="w-4 h-4 text-gray-400" />
                <span className="text-gray-900 font-semibold">Commander</span>
              </nav>
            </div>
          </div>

          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">

            {/* Info Banner */}
            <div className="bg-gradient-to-r from-[#C41E3A] to-[#9B1830] rounded-2xl shadow-xl p-8 mb-8 text-center">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm border border-white/40 text-white px-4 py-2 rounded-full text-sm font-bold mb-4">
                <Clock className="w-4 h-4" />
                Bientôt disponible
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Paiement en ligne prochainement
              </h1>
              <p className="text-lg text-white/90 max-w-2xl mx-auto">
                Nous travaillons actuellement sur la mise en place du paiement en ligne sécurisé.
                En attendant, contactez-nous pour commander vos produits Pallmann.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-12">

              {/* Contact rapide */}
              <div className="bg-white rounded-xl shadow-lg p-8 border-t-4 border-[#C41E3A]">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-[#C41E3A] rounded-full flex items-center justify-center">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">Appelez-nous</h2>
                    <p className="text-sm text-gray-600">Réponse immédiate</p>
                  </div>
                </div>

                <p className="text-gray-700 mb-6">
                  Notre équipe est disponible pour prendre votre commande par téléphone et vous conseiller sur le choix de vos produits.
                </p>

                <a
                  href="tel:+33757821306"
                  className="inline-flex items-center gap-3 bg-[#C41E3A] hover:bg-[#9B1830] text-white px-8 py-4 rounded-lg font-bold text-lg transition-all w-full justify-center shadow-md hover:shadow-lg hover:scale-105"
                >
                  <Phone className="w-5 h-5" />
                  07 57 82 13 06
                </a>

                <div className="mt-4 text-center text-sm text-gray-600">
                  <p>Du lundi au vendredi</p>
                  <p className="font-semibold">8h00 - 18h00</p>
                </div>
              </div>

              {/* Email rapide */}
              <div className="bg-white rounded-xl shadow-lg p-8 border-t-4 border-[#C41E3A]">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-[#C41E3A] rounded-full flex items-center justify-center">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">Envoyez un email</h2>
                    <p className="text-sm text-gray-600">Réponse sous 24h</p>
                  </div>
                </div>

                <p className="text-gray-700 mb-6">
                  Préférez l'écrit ? Envoyez-nous un email avec votre demande et nous vous répondrons rapidement avec un devis personnalisé.
                </p>

                <a
                  href="mailto:contact@poncages.fr"
                  className="inline-flex items-center gap-3 bg-gray-800 hover:bg-gray-700 text-white px-8 py-4 rounded-lg font-bold text-lg transition-all w-full justify-center shadow-md hover:shadow-lg hover:scale-105"
                >
                  <Mail className="w-5 h-5" />
                  contact@poncages.fr
                </a>
              </div>
            </div>

            {/* Formulaire de demande */}
            <div className="bg-white rounded-xl shadow-lg p-8 border-l-4 border-[#C41E3A]">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-[#C41E3A] to-[#9B1830] rounded-full flex items-center justify-center">
                  <ShoppingCart className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Demande d'information produit</h2>
                  <p className="text-sm text-gray-600">Remplissez le formulaire ci-dessous</p>
                </div>
              </div>

              {error && (
                <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                  <p className="text-red-700 text-sm">{error}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="product" className="block text-sm font-semibold text-gray-900 mb-2">
                    Produit concerné *
                  </label>
                  <input
                    type="text"
                    id="product"
                    name="product"
                    value={formData.product}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C41E3A] focus:border-transparent transition-all"
                    placeholder="Nom du produit"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-gray-900 mb-2">
                      Nom complet *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C41E3A] focus:border-transparent transition-all"
                      placeholder="Jean Dupont"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-semibold text-gray-900 mb-2">
                      Téléphone *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C41E3A] focus:border-transparent transition-all"
                      placeholder="06 12 34 56 78"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-900 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C41E3A] focus:border-transparent transition-all"
                    placeholder="jean.dupont@email.com"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-gray-900 mb-2">
                    Votre message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C41E3A] focus:border-transparent transition-all resize-none"
                    placeholder="Précisez la quantité souhaitée, votre délai, ou toute autre information utile..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full inline-flex items-center gap-3 bg-gradient-to-r from-[#C41E3A] to-[#9B1830] hover:from-[#9B1830] hover:to-[#C41E3A] text-white px-8 py-4 rounded-lg font-bold text-lg transition-all shadow-lg hover:shadow-xl hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed justify-center"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      Envoi en cours...
                    </>
                  ) : (
                    <>
                      <Mail className="w-5 h-5" />
                      Envoyer ma demande
                    </>
                  )}
                </button>
              </form>

              <p className="mt-4 text-xs text-gray-500 text-center">
                Vos données sont protégées et ne seront utilisées que pour traiter votre demande.
              </p>
            </div>

            {/* Back to shop */}
            <div className="mt-8 text-center">
              <Link
                to="/boutique"
                className="inline-flex items-center gap-2 text-gray-600 hover:text-[#C41E3A] transition-colors font-semibold"
              >
                <ChevronRight className="w-4 h-4 rotate-180" />
                Retour à la boutique
              </Link>
            </div>

          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default ProductContactPage;
