import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Phone, Mail, MapPin, Send, CheckCircle, Sparkles } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface FormData {
  prenom: string;
  nom: string;
  email: string;
  telephone: string;
  ville: string;
  message: string;
}

const BlogContactForm: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    prenom: '',
    nom: '',
    email: '',
    telephone: '',
    ville: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
            message: formData.message,
            service_type: 'blog_contact',
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
    <div id="contact-form">
      <div className="bg-gradient-to-r from-[#d9b45a] via-[#c4a04f] to-[#b8941a] rounded-xl shadow-lg p-6 mb-6 border-4 border-white animate-pulse-slow">
        <div className="flex items-center justify-center gap-3 text-center">
          <Sparkles className="w-8 h-8 text-white animate-bounce" />
          <h3 className="text-2xl md:text-3xl font-bold text-white">
            Ponçage et Vitrification complète à partir de <span className="text-4xl">42€ HT</span> /m²
          </h3>
          <Sparkles className="w-8 h-8 text-white animate-bounce" />
        </div>
        <p className="text-center text-white/90 mt-3 text-lg font-semibold">
          ⭐ Demandez votre devis gratuit maintenant !
        </p>
      </div>

      <div className="bg-gradient-to-br from-[#0f1b2b] via-[#1a2b3d] to-[#0f1b2b] rounded-2xl shadow-2xl overflow-hidden">
        <div className="grid md:grid-cols-2 gap-0">
        <div className="p-8 md:p-12 bg-gradient-to-br from-[#d9b45a] to-[#b8941a] text-white">
          <h3 className="text-3xl font-bold mb-6">
            Besoin d'un devis pour votre parquet ?
          </h3>
          <p className="text-lg mb-8 text-white/90">
            Nos experts sont à votre écoute pour vous conseiller et établir un devis gratuit adapté à votre projet.
          </p>

          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <p className="font-semibold text-lg mb-1">Téléphone</p>
                <a href="tel:+33757821306" className="text-white/90 hover:text-white transition-colors">
                  07 57 82 13 06
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <p className="font-semibold text-lg mb-1">Email</p>
                <a href="mailto:contact@poncages.fr" className="text-white/90 hover:text-white transition-colors break-all">
                  contact@poncages.fr
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <p className="font-semibold text-lg mb-1">Intervention</p>
                <p className="text-white/90">
                  Grand Est : Alsace, Strasbourg, Colmar, Mulhouse, Belfort, Sarrebourg
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 p-4 bg-white/10 rounded-lg backdrop-blur-sm">
            <p className="text-sm text-white/80">
              ⏱️ <strong>Réponse rapide</strong> : Nous vous contactons sous 24h
            </p>
            <p className="text-sm text-white/80 mt-2">
              💰 <strong>Sans engagement</strong> : Devis gratuit et sans acompte
            </p>
          </div>
        </div>

        <div className="p-8 md:p-12 bg-white">
          {isSuccess ? (
            <div className="h-full flex items-center justify-center">
              <div className="text-center">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-12 h-12 text-green-600" />
                </div>
                <h4 className="text-2xl font-bold text-gray-900 mb-3">Message envoyé !</h4>
                <p className="text-gray-700">
                  Merci pour votre demande. Nous vous recontacterons très rapidement.
                </p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
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

              <div className="grid grid-cols-2 gap-4">
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
                  rows={4}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#d9b45a] focus:ring-2 focus:ring-[#d9b45a]/20 outline-none transition-all resize-none"
                  placeholder="Décrivez brièvement votre projet (type de parquet, surface, état actuel...)"
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
                    Demander un devis gratuit
                  </>
                )}
              </button>

              <p className="text-xs text-gray-600 text-center">
                En soumettant ce formulaire, vous acceptez d'être contacté par Les Ponceurs Réunis concernant votre demande.
              </p>
            </form>
          )}
        </div>
      </div>
      </div>
    </div>
  );
};

export default BlogContactForm;
