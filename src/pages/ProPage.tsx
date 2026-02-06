import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { supabase } from '../lib/supabase';
import { 
  Building2, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  FileText,
  CheckCircle,
  Truck,
  Package,
  Send,
  AlertCircle
} from 'lucide-react';

interface ProFormData {
  company_name: string;
  siret: string;
  contact_name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postal_code: string;
  message: string;
}

const ProPage: React.FC = () => {
  const [formData, setFormData] = useState<ProFormData>({
    company_name: '',
    siret: '',
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

  const validateSiret = (siret: string): boolean => {
    // SIRET = 14 chiffres
    const cleanSiret = siret.replace(/\s/g, '');
    return /^\d{14}$/.test(cleanSiret);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    // Validation
    if (!formData.company_name || !formData.siret || !formData.contact_name || !formData.email || !formData.phone) {
      setError('Veuillez remplir tous les champs obligatoires');
      return;
    }
    
    if (!validateSiret(formData.siret)) {
      setError('Le numéro SIRET doit contenir 14 chiffres');
      return;
    }
    
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError('Veuillez entrer une adresse email valide');
      return;
    }

    setLoading(true);

    try {
      // Enregistrer dans Supabase
      const { error: dbError } = await supabase
        .from('pro_requests')
        .insert({
          company_name: formData.company_name,
          siret: formData.siret.replace(/\s/g, ''),
          contact_name: formData.contact_name,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          city: formData.city,
          postal_code: formData.postal_code,
          message: formData.message,
          status: 'pending',
          created_at: new Date().toISOString(),
        });

      if (dbError) {
        console.error('Supabase error:', dbError);
        throw new Error('Erreur lors de l\'enregistrement');
      }

      // Envoyer email de notification
      await fetch('/api/send-pro-notification', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      setSuccess(true);
      setFormData({
        company_name: '',
        siret: '',
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

  return (
    <>
      <Helmet>
        <title>Espace Professionnel | Pallmann Store</title>
        <meta name="description" content="Demandez votre code réduction professionnel Pallmann. Tarifs préférentiels pour les professionnels du parquet." />
        <link rel="canonical" href="https://pallmann-store.com/pro" />
      </Helmet>

      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />

        <main className="flex-grow">
          {/* Hero Section */}
          <div className="bg-gradient-to-r from-[#FF6600] to-[#ff8c40] py-16">
            <div className="max-w-4xl mx-auto px-4 text-center">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-white text-sm font-semibold mb-6">
                <Building2 className="w-4 h-4" />
                Espace réservé aux professionnels
              </div>
              <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
                Espace Professionnel
              </h1>
              <p className="text-xl text-white/90 max-w-2xl mx-auto">
                Demandez votre code réduction et bénéficiez de tarifs préférentiels sur tous les produits Pallmann
              </p>
            </div>
          </div>

          <div className="max-w-6xl mx-auto px-4 py-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Informations */}
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    Pourquoi devenir client PRO ?
                  </h2>
                  
                  <div className="space-y-4">
                    <div className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-sm">
                      <div className="p-3 bg-[#FF6600]/10 rounded-lg">
                        <Package className="w-6 h-6 text-[#FF6600]" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">Tarifs préférentiels</h3>
                        <p className="text-gray-600 text-sm">Code réduction personnalisé sur l'ensemble du catalogue Pallmann</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-sm">
                      <div className="p-3 bg-[#FF6600]/10 rounded-lg">
                        <Truck className="w-6 h-6 text-[#FF6600]" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">Franco de port dès 630€ HT</h3>
                        <p className="text-gray-600 text-sm">En dessous : 9,90€ par article</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-sm">
                      <div className="p-3 bg-[#FF6600]/10 rounded-lg">
                        <MapPin className="w-6 h-6 text-[#FF6600]" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">Livraison sur toute la France</h3>
                        <p className="text-gray-600 text-sm">Métropole et DOM-TOM (conditions spécifiques)</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Info box */}
                <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 text-white">
                  <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                    <Truck className="w-5 h-5 text-[#FF6600]" />
                    Conditions de livraison
                  </h3>
                  <ul className="space-y-3 text-gray-300">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                      <span><strong className="text-white">Franco de port</strong> à partir de 630€ HT</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                      <span>En dessous : <strong className="text-white">9,90€ par article</strong></span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                      <span>Livraison en <strong className="text-white">48-72h ouvrées</strong></span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Formulaire */}
              <div className="bg-white rounded-2xl shadow-xl p-8">
                {success ? (
                  <div className="text-center py-12">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle className="w-10 h-10 text-green-500" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">
                      Demande envoyée !
                    </h2>
                    <p className="text-gray-600 mb-6">
                      Nous avons bien reçu votre demande d'inscription professionnelle. 
                      Notre équipe reviendra vers vous dans les plus brefs délais avec votre code réduction personnalisé.
                    </p>
                    <button
                      onClick={() => setSuccess(false)}
                      className="text-[#FF6600] hover:text-[#e65c00] font-semibold"
                    >
                      Faire une nouvelle demande
                    </button>
                  </div>
                ) : (
                  <>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                      Demandez votre code réduction
                    </h2>
                    <p className="text-gray-600 mb-6">
                      Remplissez ce formulaire pour recevoir vos identifiants professionnels
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-5">
                      {/* Entreprise */}
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          <Building2 className="w-4 h-4 inline mr-1" />
                          Nom de l'entreprise *
                        </label>
                        <input
                          type="text"
                          name="company_name"
                          value={formData.company_name}
                          onChange={handleChange}
                          placeholder="Ex: Parquets Dupont SARL"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6600] focus:border-transparent transition-all"
                          required
                        />
                      </div>

                      {/* SIRET */}
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          <FileText className="w-4 h-4 inline mr-1" />
                          Numéro SIRET *
                        </label>
                        <input
                          type="text"
                          name="siret"
                          value={formData.siret}
                          onChange={handleChange}
                          placeholder="14 chiffres"
                          maxLength={17}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6600] focus:border-transparent transition-all"
                          required
                        />
                      </div>

                      {/* Contact */}
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          <User className="w-4 h-4 inline mr-1" />
                          Nom du contact *
                        </label>
                        <input
                          type="text"
                          name="contact_name"
                          value={formData.contact_name}
                          onChange={handleChange}
                          placeholder="Prénom Nom"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6600] focus:border-transparent transition-all"
                          required
                        />
                      </div>

                      {/* Email & Phone */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            <Mail className="w-4 h-4 inline mr-1" />
                            Email *
                          </label>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="contact@entreprise.fr"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6600] focus:border-transparent transition-all"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            <Phone className="w-4 h-4 inline mr-1" />
                            Téléphone *
                          </label>
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="06 12 34 56 78"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6600] focus:border-transparent transition-all"
                            required
                          />
                        </div>
                      </div>

                      {/* Adresse */}
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          <MapPin className="w-4 h-4 inline mr-1" />
                          Adresse complète
                        </label>
                        <input
                          type="text"
                          name="address"
                          value={formData.address}
                          onChange={handleChange}
                          placeholder="Numéro et rue"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6600] focus:border-transparent transition-all mb-3"
                        />
                        <div className="grid grid-cols-2 gap-3">
                          <input
                            type="text"
                            name="postal_code"
                            value={formData.postal_code}
                            onChange={handleChange}
                            placeholder="Code postal"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6600] focus:border-transparent transition-all"
                          />
                          <input
                            type="text"
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            placeholder="Ville"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6600] focus:border-transparent transition-all"
                          />
                        </div>
                      </div>

                      {/* Message */}
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Message (optionnel)
                        </label>
                        <textarea
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          placeholder="Précisions sur votre activité, volumes estimés..."
                          rows={3}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6600] focus:border-transparent transition-all resize-none"
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
                        className="w-full bg-[#FF6600] hover:bg-[#e65c00] text-white py-4 rounded-lg font-bold text-lg flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {loading ? (
                          <>
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                            Envoi en cours...
                          </>
                        ) : (
                          <>
                            <Send className="w-5 h-5" />
                            Envoyer ma demande
                          </>
                        )}
                      </button>

                      <p className="text-xs text-gray-500 text-center">
                        En soumettant ce formulaire, vous acceptez d'être contacté par notre équipe commerciale.
                      </p>
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default ProPage;
