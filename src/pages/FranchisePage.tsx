import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SEOEnhancer from '../components/SEOEnhancer';
import { Building2, TrendingUp, Users, Award, MapPin, Send, CheckCircle, Briefcase, Target, Sparkles } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface FormData {
  prenom: string;
  nom: string;
  email: string;
  telephone: string;
  ville: string;
  departement: string;
  statut: string;
  message: string;
}

const FranchisePage: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    prenom: '',
    nom: '',
    email: '',
    telephone: '',
    ville: '',
    departement: '',
    statut: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const { error: submitError } = await supabase
        .from('form_submissions')
        .insert([
          {
            full_name: `${formData.prenom} ${formData.nom}`,
            email: formData.email,
            phone: formData.telephone,
            postal_code: formData.ville,
            message: `DEMANDE DE FRANCHISE - Département: ${formData.departement} - Statut: ${formData.statut}\n\n${formData.message}`,
            service_type: 'franchise_request',
            surface: 0
          }
        ]);

      if (submitError) {
        console.error('Supabase error:', submitError);
        throw submitError;
      }

      navigate('/thank-you');
    } catch (err) {
      console.error('Error submitting form:', err);
      setError('Une erreur est survenue. Veuillez réessayer ou nous contacter directement au 07 57 82 13 06.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-white">
      <SEOEnhancer
        title="Devenir Franchisé - Opportunité d'Investissement | Les Ponceurs Réunis"
        description="Rejoignez le réseau Les Ponceurs Réunis et développez votre agence départementale. Opportunité d'investissement dans la rénovation de parquet avec un leader du secteur."
        canonical="https://poncages.fr/franchise"
      />

      <Header />

      <main className="flex-1">
        <section className="relative bg-gradient-to-r from-[#0f1b2b] via-[#1a2537] to-[#0f1b2b] text-white py-20 overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
              backgroundSize: '40px 40px'
            }} />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center">
              <div className="flex items-center justify-center gap-3 mb-6">
                <Building2 className="w-12 h-12 text-[#d9b45a]" />
                <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#d9b45a] via-white to-[#d9b45a]">
                  Devenez Franchisé
                </h1>
              </div>
              <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
                Rejoignez le réseau Les Ponceurs Réunis et développez votre agence départementale dans la rénovation de parquet
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Pourquoi Rejoindre Notre Réseau ?
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Bénéficiez de plus de 20 ans d'expertise et d'une marque reconnue dans le Grand Est
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-gradient-to-br from-[#f8f9fa] to-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all">
                <div className="w-14 h-14 bg-gradient-to-r from-[#d9b45a] to-[#b8941a] rounded-lg flex items-center justify-center mb-4">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Expertise Reconnue
                </h3>
                <p className="text-gray-600">
                  Plus de 20 ans d'expérience dans la rénovation de parquet et une réputation établie
                </p>
              </div>

              <div className="bg-gradient-to-br from-[#f8f9fa] to-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all">
                <div className="w-14 h-14 bg-gradient-to-r from-[#d9b45a] to-[#b8941a] rounded-lg flex items-center justify-center mb-4">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Formation Complète
                </h3>
                <p className="text-gray-600">
                  Accompagnement personnalisé et formation technique pour maîtriser tous nos services
                </p>
              </div>

              <div className="bg-gradient-to-br from-[#f8f9fa] to-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all">
                <div className="w-14 h-14 bg-gradient-to-r from-[#d9b45a] to-[#b8941a] rounded-lg flex items-center justify-center mb-4">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Marché Porteur
                </h3>
                <p className="text-gray-600">
                  Secteur en croissance avec une demande constante de rénovation de parquet
                </p>
              </div>

              <div className="bg-gradient-to-br from-[#f8f9fa] to-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all">
                <div className="w-14 h-14 bg-gradient-to-r from-[#d9b45a] to-[#b8941a] rounded-lg flex items-center justify-center mb-4">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Support Marketing
                </h3>
                <p className="text-gray-600">
                  Outils marketing, site web, référencement local et génération de leads
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Profil Recherché
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Nous recherchons des entrepreneurs motivés souhaitant développer une activité pérenne
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              <div className="bg-white p-8 rounded-xl shadow-lg border-2 border-[#d9b45a]/20">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-[#d9b45a] to-[#b8941a] rounded-lg flex items-center justify-center">
                    <Briefcase className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      Investisseurs
                    </h3>
                    <ul className="space-y-2 text-gray-600">
                      <li className="flex items-start gap-2">
                        <span className="text-[#d9b45a] mt-1">•</span>
                        <span>Capacité d'investissement pour développer une agence</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[#d9b45a] mt-1">•</span>
                        <span>Vision entrepreneuriale et gestion d'équipe</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[#d9b45a] mt-1">•</span>
                        <span>Intérêt pour le secteur de la rénovation</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-white p-8 rounded-xl shadow-lg border-2 border-[#d9b45a]/20">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-[#d9b45a] to-[#b8941a] rounded-lg flex items-center justify-center">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      Professionnels du Secteur
                    </h3>
                    <ul className="space-y-2 text-gray-600">
                      <li className="flex items-start gap-2">
                        <span className="text-[#d9b45a] mt-1">•</span>
                        <span>Artisans souhaitant développer leur activité</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[#d9b45a] mt-1">•</span>
                        <span>Expérience dans le bâtiment ou la rénovation</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[#d9b45a] mt-1">•</span>
                        <span>Volonté de rejoindre un réseau structuré</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Zones Disponibles
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Développez votre agence dans une zone stratégique du Grand Est et des régions limitrophes
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {[
                { region: 'Alsace', departements: ['Bas-Rhin (67)', 'Haut-Rhin (68)'] },
                { region: 'Lorraine', departements: ['Moselle (57)', 'Meurthe-et-Moselle (54)', 'Vosges (88)'] },
                { region: 'Franche-Comté', departements: ['Doubs (25)', 'Territoire de Belfort (90)', 'Haute-Saône (70)'] },
                { region: 'Bourgogne', departements: ['Côte-d\'Or (21)', 'Saône-et-Loire (71)'] },
                { region: 'Auvergne-Rhône-Alpes', departements: ['Rhône (69)', 'Ain (01)'] }
              ].map((zone, index) => (
                <div key={index} className="bg-gradient-to-br from-[#f8f9fa] to-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all border-2 border-[#d9b45a]/10 hover:border-[#d9b45a]/30">
                  <div className="flex items-center gap-3 mb-4">
                    <MapPin className="w-6 h-6 text-[#d9b45a]" />
                    <h3 className="text-xl font-bold text-gray-900">{zone.region}</h3>
                  </div>
                  <ul className="space-y-2">
                    {zone.departements.map((dept, i) => (
                      <li key={i} className="text-gray-600 text-sm flex items-start gap-2">
                        <span className="text-[#d9b45a] mt-1">•</span>
                        <span>{dept}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-gradient-to-b from-gray-50 to-white" id="contact-form">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Sparkles className="w-8 h-8 text-[#d9b45a]" />
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                  Demandez Votre Dossier de Franchise
                </h2>
                <Sparkles className="w-8 h-8 text-[#d9b45a]" />
              </div>
              <p className="text-lg text-gray-600">
                Remplissez le formulaire ci-dessous et recevez toutes les informations sur notre réseau
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border-2 border-[#d9b45a]/20">
              <div className="p-8 md:p-12">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="prenom" className="block text-sm font-semibold text-gray-900 mb-2">
                        Prénom *
                      </label>
                      <input
                        type="text"
                        id="prenom"
                        name="prenom"
                        value={formData.prenom}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#d9b45a] focus:ring-2 focus:ring-[#d9b45a]/20 outline-none transition-all"
                        placeholder="Jean"
                      />
                    </div>

                    <div>
                      <label htmlFor="nom" className="block text-sm font-semibold text-gray-900 mb-2">
                        Nom *
                      </label>
                      <input
                        type="text"
                        id="nom"
                        name="nom"
                        value={formData.nom}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#d9b45a] focus:ring-2 focus:ring-[#d9b45a]/20 outline-none transition-all"
                        placeholder="Dupont"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
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
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#d9b45a] focus:ring-2 focus:ring-[#d9b45a]/20 outline-none transition-all"
                        placeholder="jean.dupont@email.fr"
                      />
                    </div>

                    <div>
                      <label htmlFor="telephone" className="block text-sm font-semibold text-gray-900 mb-2">
                        Téléphone *
                      </label>
                      <input
                        type="tel"
                        id="telephone"
                        name="telephone"
                        value={formData.telephone}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#d9b45a] focus:ring-2 focus:ring-[#d9b45a]/20 outline-none transition-all"
                        placeholder="06 12 34 56 78"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="ville" className="block text-sm font-semibold text-gray-900 mb-2">
                        Ville *
                      </label>
                      <input
                        type="text"
                        id="ville"
                        name="ville"
                        value={formData.ville}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#d9b45a] focus:ring-2 focus:ring-[#d9b45a]/20 outline-none transition-all"
                        placeholder="Strasbourg"
                      />
                    </div>

                    <div>
                      <label htmlFor="departement" className="block text-sm font-semibold text-gray-900 mb-2">
                        Département d'intérêt *
                      </label>
                      <input
                        type="text"
                        id="departement"
                        name="departement"
                        value={formData.departement}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#d9b45a] focus:ring-2 focus:ring-[#d9b45a]/20 outline-none transition-all"
                        placeholder="Ex: Bas-Rhin (67)"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="statut" className="block text-sm font-semibold text-gray-900 mb-2">
                      Votre statut *
                    </label>
                    <select
                      id="statut"
                      name="statut"
                      value={formData.statut}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#d9b45a] focus:ring-2 focus:ring-[#d9b45a]/20 outline-none transition-all"
                    >
                      <option value="">Sélectionnez votre statut</option>
                      <option value="investisseur">Investisseur</option>
                      <option value="artisan">Artisan du bâtiment</option>
                      <option value="entrepreneur">Entrepreneur</option>
                      <option value="reconversion">En reconversion professionnelle</option>
                      <option value="autre">Autre</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-semibold text-gray-900 mb-2">
                      Votre projet *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#d9b45a] focus:ring-2 focus:ring-[#d9b45a]/20 outline-none transition-all resize-none"
                      placeholder="Décrivez votre projet, votre expérience et vos motivations pour rejoindre notre réseau..."
                    />
                  </div>

                  {error && (
                    <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                      <p className="text-red-700 text-sm">{error}</p>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-[#d9b45a] to-[#b8941a] text-white py-4 rounded-lg font-bold text-lg hover:shadow-xl hover:scale-[1.02] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Envoi en cours...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        Recevoir le dossier de franchise
                      </>
                    )}
                  </button>

                  <p className="text-xs text-gray-600 text-center">
                    En soumettant ce formulaire, vous acceptez d'être contacté par Les Ponceurs Réunis concernant votre demande de franchise. Vos données sont confidentielles.
                  </p>
                </form>
              </div>
            </div>

            <div className="mt-12 text-center">
              <div className="bg-gradient-to-r from-[#d9b45a]/10 to-[#b8941a]/10 rounded-xl p-6 border-2 border-[#d9b45a]/20">
                <p className="text-gray-700 font-semibold mb-2">
                  Vous avez des questions ?
                </p>
                <p className="text-gray-600 mb-4">
                  Notre équipe est disponible pour répondre à toutes vos questions
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href="tel:+33757821306"
                    className="inline-flex items-center justify-center gap-2 bg-white text-[#b8941a] px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all border-2 border-[#d9b45a]"
                  >
                    <CheckCircle className="w-5 h-5" />
                    07 57 82 13 06
                  </a>
                  <a
                    href="mailto:contact@poncages.fr"
                    className="inline-flex items-center justify-center gap-2 bg-white text-[#b8941a] px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all border-2 border-[#d9b45a]"
                  >
                    <CheckCircle className="w-5 h-5" />
                    contact@poncages.fr
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default FranchisePage;
