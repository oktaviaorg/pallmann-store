import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { supabase } from '../lib/supabase';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  CheckCircle, 
  User, 
  MessageSquare,
  Clock,
  Wrench
} from 'lucide-react';

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'general',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { error: submitError } = await supabase
        .from('contact_messages')
        .insert([{
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          subject: formData.subject,
          message: formData.message,
          created_at: new Date().toISOString()
        }]);

      if (submitError) throw submitError;

      setSuccess(true);
      setFormData({ name: '', email: '', phone: '', subject: 'general', message: '' });
    } catch (err) {
      console.error('Error submitting form:', err);
      setError('Une erreur est survenue. Veuillez réessayer ou nous contacter par téléphone.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Contact | Pallmann Store - Conseils techniques parquet</title>
        <meta name="description" content="Contactez notre équipe technique pour tous vos conseils sur les produits Pallmann. Formulaire, téléphone, email - réponse rapide garantie." />
      </Helmet>

      <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
        <Header />

        <main className="flex-grow">
          {/* Hero */}
          <div 
            className="py-16 text-white relative overflow-hidden"
            style={{ background: 'linear-gradient(135deg, #1A2634 0%, #243B53 50%, #E67E22 100%)' }}
          >
            <div className="max-w-4xl mx-auto px-4 text-center relative">
              <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
                Contactez-nous
              </h1>
              <p className="text-xl text-white/80 max-w-2xl mx-auto">
                Notre équipe technique est à votre disposition pour vous conseiller
              </p>
            </div>
          </div>

          <div className="max-w-6xl mx-auto px-4 py-12">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* Contact Cards */}
              <div className="lg:col-span-1 space-y-6">
                {/* Technicien */}
                <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 bg-gradient-to-br from-[#E67E22] to-[#D35400] rounded-xl">
                      <Wrench className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-[#1A2634]">Conseils Techniques</h3>
                      <p className="text-sm text-[#64748B]">Parlez à un expert</p>
                    </div>
                  </div>
                  <a 
                    href="tel:+33757821306"
                    className="flex items-center gap-3 p-4 bg-[#F8FAFC] rounded-xl hover:bg-[#E67E22]/10 transition-colors group"
                  >
                    <Phone className="w-5 h-5 text-[#E67E22]" />
                    <div>
                      <div className="font-bold text-[#1A2634] group-hover:text-[#E67E22] transition-colors">
                        07 57 82 13 06
                      </div>
                      <div className="text-xs text-[#64748B]">Technicien parquet</div>
                    </div>
                  </a>
                </div>

                {/* Standard */}
                <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 bg-[#1A2634] rounded-xl">
                      <Phone className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-[#1A2634]">Standard</h3>
                      <p className="text-sm text-[#64748B]">Commandes & suivi</p>
                    </div>
                  </div>
                  <a 
                    href="tel:+33389210000"
                    className="flex items-center gap-3 p-4 bg-[#F8FAFC] rounded-xl hover:bg-[#1A2634]/10 transition-colors group"
                  >
                    <Phone className="w-5 h-5 text-[#1A2634]" />
                    <div>
                      <div className="font-bold text-[#1A2634]">03 89 21 00 00</div>
                      <div className="text-xs text-[#64748B]">Lun-Ven 8h-17h</div>
                    </div>
                  </a>
                </div>

                {/* Email */}
                <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 bg-blue-500 rounded-xl">
                      <Mail className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-[#1A2634]">Email</h3>
                      <p className="text-sm text-[#64748B]">Réponse sous 24h</p>
                    </div>
                  </div>
                  <a 
                    href="mailto:contact@pallmann-store.com"
                    className="flex items-center gap-3 p-4 bg-[#F8FAFC] rounded-xl hover:bg-blue-50 transition-colors group"
                  >
                    <Mail className="w-5 h-5 text-blue-500" />
                    <div>
                      <div className="font-bold text-[#1A2634] group-hover:text-blue-500 transition-colors text-sm">
                        contact@pallmann-store.com
                      </div>
                    </div>
                  </a>
                </div>

                {/* Adresse */}
                <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 bg-green-500 rounded-xl">
                      <MapPin className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-[#1A2634]">Retrait sur place</h3>
                      <p className="text-sm text-[#64748B]">Sur rendez-vous</p>
                    </div>
                  </div>
                  <div className="p-4 bg-[#F8FAFC] rounded-xl">
                    <p className="text-sm text-[#1A2634] font-medium">
                      6 rue du Commerce<br />
                      68420 Herrlisheim près Colmar
                    </p>
                  </div>
                </div>

                {/* Horaires */}
                <div className="bg-gradient-to-br from-[#1A2634] to-[#243B53] rounded-2xl p-6 text-white">
                  <div className="flex items-center gap-2 mb-4">
                    <Clock className="w-5 h-5 text-[#E67E22]" />
                    <h3 className="font-bold">Horaires</h3>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-300">Lundi - Vendredi</span>
                      <span className="font-semibold">8h00 - 17h00</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Samedi - Dimanche</span>
                      <span className="text-gray-400">Fermé</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Formulaire */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                  <h2 className="text-2xl font-bold text-[#1A2634] mb-6 flex items-center gap-2">
                    <MessageSquare className="w-6 h-6 text-[#E67E22]" />
                    Envoyez-nous un message
                  </h2>

                  {success ? (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <CheckCircle className="w-8 h-8 text-green-500" />
                      </div>
                      <h3 className="text-xl font-bold text-[#1A2634] mb-2">Message envoyé !</h3>
                      <p className="text-[#64748B]">Nous vous répondrons dans les plus brefs délais.</p>
                      <button
                        onClick={() => setSuccess(false)}
                        className="mt-6 px-6 py-2 bg-[#F8FAFC] rounded-xl font-semibold text-[#64748B] hover:bg-gray-100 transition-colors"
                      >
                        Envoyer un autre message
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-semibold text-[#1A2634] mb-2">
                            Nom complet *
                          </label>
                          <div className="relative">
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#64748B]" />
                            <input
                              type="text"
                              required
                              value={formData.name}
                              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                              className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#E67E22] focus:border-transparent transition-all"
                              placeholder="Votre nom"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-[#1A2634] mb-2">
                            Email *
                          </label>
                          <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#64748B]" />
                            <input
                              type="email"
                              required
                              value={formData.email}
                              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                              className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#E67E22] focus:border-transparent transition-all"
                              placeholder="votre@email.com"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-semibold text-[#1A2634] mb-2">
                            Téléphone
                          </label>
                          <div className="relative">
                            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#64748B]" />
                            <input
                              type="tel"
                              value={formData.phone}
                              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                              className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#E67E22] focus:border-transparent transition-all"
                              placeholder="06 00 00 00 00"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-[#1A2634] mb-2">
                            Sujet
                          </label>
                          <select
                            value={formData.subject}
                            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#E67E22] focus:border-transparent transition-all bg-white"
                          >
                            <option value="general">Question générale</option>
                            <option value="technique">Conseil technique</option>
                            <option value="commande">Suivi de commande</option>
                            <option value="devis">Demande de devis</option>
                            <option value="partenariat">Partenariat PRO</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-[#1A2634] mb-2">
                          Message *
                        </label>
                        <textarea
                          required
                          rows={5}
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#E67E22] focus:border-transparent transition-all resize-none"
                          placeholder="Décrivez votre demande..."
                        />
                      </div>

                      {error && (
                        <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
                          {error}
                        </div>
                      )}

                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-4 rounded-xl font-bold text-lg text-white flex items-center justify-center gap-2 transition-all hover:shadow-lg disabled:opacity-50"
                        style={{ background: 'linear-gradient(135deg, #E67E22 0%, #D35400 100%)' }}
                      >
                        {loading ? (
                          <span className="animate-pulse">Envoi en cours...</span>
                        ) : (
                          <>
                            <Send className="w-5 h-5" />
                            Envoyer le message
                          </>
                        )}
                      </button>
                    </form>
                  )}
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

export default ContactPage;
