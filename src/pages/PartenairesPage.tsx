import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { MapPin, Phone, Globe, Mail, Send, CheckCircle, Building2 } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface Partner {
  name: string;
  description: string;
  locations: string[];
  phone?: string;
  email?: string;
  website?: string;
  logo?: string;
  services: string[];
}

const partners: Partner[] = [
  {
    name: 'Les Ponceurs Réunis',
    description: 'Spécialistes du ponçage et de la rénovation de parquets. Intervention rapide et professionnelle sur tout le Grand Est.',
    locations: ['Colmar', 'Belfort', 'Strasbourg', 'Sarrebourg'],
    phone: '06 04 44 09 03',
    email: 'contact@poncages.fr',
    website: 'https://ponceur-parquet.fr',
    logo: 'https://ponceur-parquet.fr/logo-lpr.png',
    services: ['Ponçage parquet', 'Vitrification', 'Huilage', 'Rénovation complète'],
  },
  {
    name: "Parq'line",
    description: 'Expert en pose et rénovation de parquets. Qualité et savoir-faire au service de vos sols.',
    locations: ['Alsace'],
    phone: '',
    email: 'e.nuber@parqline.fr',
    website: '',
    logo: '',
    services: ['Pose de parquet', 'Rénovation', 'Ponçage', 'Finition'],
  },
];

export default function PartenairesPage() {
  const [formData, setFormData] = useState({
    company: '',
    contact: '',
    email: '',
    phone: '',
    city: '',
    services: '',
    siret: '',
    promoCode: '',
    message: '',
  });
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setLogoFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    
    try {
      let logoUrl = '';
      
      // Upload logo si présent
      if (logoFile) {
        const fileExt = logoFile.name.split('.').pop();
        const fileName = `partenaire-${Date.now()}.${fileExt}`;
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('photos-lpr')
          .upload(`logos-partenaires/${fileName}`, logoFile);
        
        if (!uploadError && uploadData) {
          const { data: urlData } = supabase.storage
            .from('photos-lpr')
            .getPublicUrl(`logos-partenaires/${fileName}`);
          logoUrl = urlData.publicUrl;
        }
      }

      await supabase.from('form_submissions').insert({
        form_type: 'partenaire',
        data: { ...formData, logoUrl },
        created_at: new Date().toISOString(),
      });
      setSubmitted(true);
    } catch (error) {
      console.error('Erreur:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Nos Partenaires Applicateurs | Pallmann Store</title>
        <meta name="description" content="Trouvez un applicateur professionnel Pallmann près de chez vous. Réseau de partenaires certifiés pour la pose et rénovation de parquet." />
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        <Header />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Hero */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
              Nos Partenaires Applicateurs
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Des professionnels certifiés Pallmann pour vos projets de parquet. 
              Trouvez un expert près de chez vous.
            </p>
          </div>

          {/* Partners Grid */}
          <div className="grid md:grid-cols-2 gap-8">
            {partners.map((partner, index) => (
              <div 
                key={index}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                {/* Header with Logo */}
                <div className="bg-gradient-to-r from-[#1e3a5f] to-[#2c5282] p-6 text-white">
                  <div className="flex items-center gap-4 mb-3">
                    {partner.logo ? (
                      <img 
                        src={partner.logo} 
                        alt={partner.name}
                        className="w-16 h-16 object-contain bg-white rounded-lg p-2"
                      />
                    ) : (
                      <div className="w-16 h-16 bg-white/20 rounded-lg flex items-center justify-center">
                        <Building2 className="w-8 h-8" />
                      </div>
                    )}
                    <h2 className="text-2xl font-bold">{partner.name}</h2>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {partner.locations.map((loc, i) => (
                      <span 
                        key={i}
                        className="inline-flex items-center gap-1 bg-white/20 px-3 py-1 rounded-full text-sm"
                      >
                        <MapPin className="w-3 h-3" />
                        {loc}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <p className="text-gray-600 mb-4">{partner.description}</p>

                  {/* Services */}
                  <div className="mb-4">
                    <h3 className="font-semibold text-gray-900 mb-2">Services :</h3>
                    <div className="flex flex-wrap gap-2">
                      {partner.services.map((service, i) => (
                        <span 
                          key={i}
                          className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm"
                        >
                          {service}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Contact */}
                  <div className="border-t pt-4 space-y-2">
                    {partner.phone && (
                      <a 
                        href={`tel:${partner.phone.replace(/\s/g, '')}`}
                        className="flex items-center gap-2 text-gray-700 hover:text-[#E67E22]"
                      >
                        <Phone className="w-4 h-4" />
                        {partner.phone}
                      </a>
                    )}
                    {partner.email && (
                      <a 
                        href={`mailto:${partner.email}`}
                        className="flex items-center gap-2 text-gray-700 hover:text-[#E67E22]"
                      >
                        <Mail className="w-4 h-4" />
                        {partner.email}
                      </a>
                    )}
                    {partner.website && (
                      <a 
                        href={partner.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-gray-700 hover:text-[#E67E22]"
                      >
                        <Globe className="w-4 h-4" />
                        Voir le site web
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Formulaire d'inscription */}
          <div id="inscription" className="mt-12 bg-white rounded-2xl shadow-lg p-8">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold text-center text-gray-900 mb-2">
                Devenir Partenaire
              </h2>
              <p className="text-center text-gray-600 mb-8">
                Rejoignez notre réseau et bénéficiez de tarifs préférentiels + visibilité sur notre site.
              </p>

              {submitted ? (
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-10 h-10 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Demande envoyée !</h3>
                  <p className="text-gray-600">
                    Nous vous recontacterons rapidement pour finaliser votre inscription.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Nom de l'entreprise *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.company}
                        onChange={(e) => setFormData({...formData, company: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        placeholder="Votre entreprise"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Nom du contact *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.contact}
                        onChange={(e) => setFormData({...formData, contact: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        placeholder="Prénom Nom"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        placeholder="email@entreprise.fr"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Téléphone *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        placeholder="06 XX XX XX XX"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        N° SIRET *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.siret}
                        onChange={(e) => setFormData({...formData, siret: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        placeholder="XXX XXX XXX XXXXX"
                        pattern="[0-9\s]{14,17}"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Code Promo Pallmann
                      </label>
                      <input
                        type="text"
                        value={formData.promoCode}
                        onChange={(e) => setFormData({...formData, promoCode: e.target.value.toUpperCase()})}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        placeholder="Si vous en avez un"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Ville(s) d'intervention *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.city}
                        onChange={(e) => setFormData({...formData, city: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        placeholder="Colmar, Strasbourg..."
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Services proposés
                      </label>
                      <input
                        type="text"
                        value={formData.services}
                        onChange={(e) => setFormData({...formData, services: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        placeholder="Ponçage, pose, rénovation..."
                      />
                    </div>
                  </div>

                  {/* Upload Logo */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Logo de votre entreprise *
                    </label>
                    <div className="flex items-center gap-4">
                      <div className="flex-1">
                        <input
                          type="file"
                          accept="image/*"
                          required
                          onChange={handleLogoChange}
                          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-orange-100 file:text-orange-700 file:font-semibold"
                        />
                      </div>
                      {logoPreview && (
                        <div className="w-20 h-20 border-2 border-gray-200 rounded-lg overflow-hidden bg-white p-1">
                          <img 
                            src={logoPreview} 
                            alt="Aperçu logo" 
                            className="w-full h-full object-contain"
                          />
                        </div>
                      )}
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      Format accepté : PNG, JPG. Taille recommandée : 200x200px minimum
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Message / Présentation
                    </label>
                    <textarea
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="Présentez brièvement votre entreprise et votre expérience..."
                    />
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <p className="text-sm text-blue-800">
                      🏢 <strong>Professionnels uniquement</strong> — Le SIRET et le logo sont obligatoires pour valider votre inscription.
                    </p>
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {submitting ? (
                      'Envoi en cours...'
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        Envoyer ma demande
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}
