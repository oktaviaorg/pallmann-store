import { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Download, CheckCircle, AlertTriangle, Phone, Mail, FileText, ArrowRight } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { supabase } from '../lib/supabase';

export default function DegatUrineParquetPage() {
  const [email, setEmail] = useState('');
  const [nom, setNom] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const { error } = await supabase
        .from('form_submissions')
        .insert({
          type: 'guide_urine_parquet',
          email,
          nom,
          message: 'Demande de téléchargement du guide "Preuves à fournir à votre assurance"',
          status: 'new'
        });

      if (error) throw error;

      setSubmitStatus('success');
      setEmail('');
      setNom('');

      setTimeout(() => {
        window.open('/plaquette-parquets-gauthier.pdf', '_blank');
      }, 1000);

    } catch (error) {
      console.error('Erreur lors de la soumission:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Dégâts d'urine de chat sur parquet : solutions et récupération de caution | Parquets Gauthier</title>
        <meta name="description" content="Urine de chat sur votre parquet ? Découvrez les traitements professionnels (350-950€) et téléchargez notre guide gratuit pour récupérer les frais auprès de votre assurance." />
        <meta name="keywords" content="urine chat parquet, dégâts animaux parquet, taches urine parquet, caution locataire, assurance habitation, décapage parquet" />
        <link rel="canonical" href="https://parquets-gauthier.fr/degat-urine-parquet" />

        <meta property="og:title" content="Dégâts d'urine de chat sur parquet : solutions et récupération de caution" />
        <meta property="og:description" content="Traitements professionnels et guide gratuit pour récupérer les frais auprès de votre assurance." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://parquets-gauthier.fr/degat-urine-parquet" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <Header />

        <main className="pt-24 pb-16">
          {/* Hero Section */}
          <section className="container mx-auto px-4 mb-16">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-block bg-orange-100 text-orange-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                🐱 Problème délicat mais courant
              </div>

              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                Dégâts d'urine de chat sur parquet :<br />
                <span className="text-blue-600">Solutions professionnelles et récupération des frais</span>
              </h1>

              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Propriétaire ou locataire, l'urine de chat peut causer des dégâts importants sur le parquet.<br />
                Découvrez nos solutions de traitement et comment faire valoir vos droits.
              </p>

              <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-600 mb-8">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span>Diagnostic gratuit</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-blue-600" />
                  <span>Traitement certifié</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-purple-600" />
                  <span>Devis pour assurance</span>
                </div>
              </div>
            </div>
          </section>

          {/* Guide Gratuit - CTA Principal */}
          <section className="container mx-auto px-4 mb-16">
            <div className="max-w-3xl mx-auto bg-gradient-to-br from-blue-600 to-blue-700 rounded-3xl p-8 md:p-12 shadow-2xl">
              <div className="text-center text-white mb-8">
                <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <FileText className="w-10 h-10 text-blue-600" />
                </div>
                <h2 className="text-3xl font-bold mb-4">
                  📄 Guide gratuit :<br />
                  Comment prouver les dégâts à votre assurance
                </h2>
                <p className="text-blue-100 text-lg">
                  Découvrez les documents à fournir, les photos à prendre, et les étapes pour maximiser votre remboursement
                </p>
              </div>

              {submitStatus === 'success' ? (
                <div className="bg-green-500 text-white p-6 rounded-xl text-center">
                  <CheckCircle className="w-12 h-12 mx-auto mb-4" />
                  <p className="text-xl font-bold mb-2">Merci {nom} !</p>
                  <p>Le guide a été envoyé à {email}</p>
                  <p className="mt-4 text-sm">Le téléchargement va démarrer automatiquement...</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <input
                      type="text"
                      value={nom}
                      onChange={(e) => setNom(e.target.value)}
                      placeholder="Votre nom"
                      required
                      className="w-full px-6 py-4 rounded-xl border-2 border-white/20 bg-white/10 text-white placeholder-white/60 focus:outline-none focus:border-white transition-all text-lg"
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Votre email"
                      required
                      className="w-full px-6 py-4 rounded-xl border-2 border-white/20 bg-white/10 text-white placeholder-white/60 focus:outline-none focus:border-white transition-all text-lg"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-white hover:bg-gray-100 text-blue-600 px-8 py-5 rounded-xl font-bold text-xl transition-all transform hover:scale-105 shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                  >
                    {isSubmitting ? (
                      'Envoi en cours...'
                    ) : (
                      <>
                        <Download className="w-6 h-6" />
                        Recevoir le guide gratuitement
                        <ArrowRight className="w-5 h-5" />
                      </>
                    )}
                  </button>
                  {submitStatus === 'error' && (
                    <p className="text-red-200 text-center">Une erreur est survenue. Veuillez réessayer.</p>
                  )}
                  <p className="text-blue-100 text-sm text-center">
                    🔒 Vos données sont protégées et ne seront jamais partagées
                  </p>
                </form>
              )}
            </div>
          </section>

          {/* Gravité des dégâts */}
          <section className="container mx-auto px-4 mb-16">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                🔍 Évaluer la gravité des dégâts
              </h2>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-yellow-50 p-6 rounded-2xl border-2 border-yellow-200">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center text-white font-bold">
                      1
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">Taches légères</h3>
                  </div>
                  <p className="text-gray-700 mb-4">
                    Taches superficielles récentes, uniquement en surface du vernis
                  </p>
                  <p className="font-bold text-gray-900 text-lg">150 - 350 €</p>
                  <p className="text-sm text-gray-600">Nettoyage + ponçage léger</p>
                </div>

                <div className="bg-orange-50 p-6 rounded-2xl border-2 border-orange-200">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold">
                      2
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">Taches moyennes</h3>
                  </div>
                  <p className="text-gray-700 mb-4">
                    Imprégnation dans le bois, décoloration visible, odeur persistante
                  </p>
                  <p className="font-bold text-gray-900 text-lg">400 - 650 €</p>
                  <p className="text-sm text-gray-600">Ponçage + traitement désinfectant</p>
                </div>

                <div className="bg-red-50 p-6 rounded-2xl border-2 border-red-200">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center text-white font-bold">
                      3
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">Taches profondes</h3>
                  </div>
                  <p className="text-gray-700 mb-4">
                    Imprégnation profonde, déformation du bois, remplacement nécessaire
                  </p>
                  <p className="font-bold text-gray-900 text-lg">700 - 1500 €</p>
                  <p className="text-sm text-gray-600">Remplacement lames + finition</p>
                </div>
              </div>

              <div className="mt-8 bg-blue-50 border-l-4 border-blue-600 p-6 rounded-r-xl">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-bold text-gray-900 mb-2">⚠️ Important :</p>
                    <p className="text-gray-700">
                      Plus vous intervenez rapidement, moins les dégâts seront importants et coûteux.
                      L'urine de chat est très acide et continue de pénétrer dans le bois avec le temps.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Notre Solution */}
          <section className="bg-gray-900 py-16 mb-16">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold text-white mb-12 text-center">
                  🛠️ Notre traitement professionnel en 4 étapes
                </h2>

                <div className="space-y-6">
                  <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/20">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                        1
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white mb-2">Diagnostic et démarcation</h3>
                        <p className="text-gray-300">
                          Nous utilisons une lampe UV pour détecter toutes les zones contaminées, même invisibles à l'œil nu.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/20">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                        2
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white mb-2">Ponçage en profondeur</h3>
                        <p className="text-gray-300">
                          Retrait de la couche contaminée jusqu'à retrouver du bois sain, sans odeur.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/20">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                        3
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white mb-2">Traitement désinfectant</h3>
                        <p className="text-gray-300">
                          Application d'un traitement enzymatique professionnel qui neutralise définitivement les odeurs et bactéries.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/20">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-orange-600 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                        4
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white mb-2">Finition protectrice</h3>
                        <p className="text-gray-300">
                          Application de vernis ou huile 2K pour une protection durable et un rendu esthétique parfait.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-12 text-center">
                  <a
                    href="tel:+33757821306"
                    className="bg-white hover:bg-gray-100 text-gray-900 px-10 py-5 rounded-xl font-bold text-xl transition-all transform hover:scale-105 shadow-xl inline-flex items-center gap-3"
                  >
                    <Phone className="w-6 h-6" />
                    Demander un diagnostic gratuit
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* Qui paie ? */}
          <section className="container mx-auto px-4 mb-16">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                💰 Qui paie la réparation ?
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-blue-50 p-6 rounded-2xl border-2 border-blue-200">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">🏠 Vous êtes propriétaire</h3>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                      <span>Retenue possible sur le dépôt de garantie du locataire</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                      <span>Nécessite un état des lieux d'entrée sans mention d'animaux</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                      <span>Fournir des photos et devis professionnels détaillés</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                      <span>Possibilité de recours en justice si caution insuffisante</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-green-50 p-6 rounded-2xl border-2 border-green-200">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">🔑 Vous êtes locataire</h3>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
                      <span>Votre assurance habitation peut couvrir les dégâts</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
                      <span>Vérifiez la garantie "responsabilité locative"</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
                      <span>Faire réparer AVANT l'état des lieux pour éviter le conflit</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
                      <span>Conserver tous les justificatifs de traitement</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="mt-8 bg-gradient-to-r from-yellow-50 to-orange-50 p-6 rounded-2xl border-2 border-yellow-200">
                <h4 className="font-bold text-lg text-gray-900 mb-3">💡 Astuce pour les locataires :</h4>
                <p className="text-gray-700">
                  Faire réparer le parquet AVANT l'état des lieux de sortie coûte souvent moins cher que la retenue sur caution
                  (qui inclut généralement une marge du propriétaire). De plus, vous choisissez votre artisan et maîtrisez le budget.
                </p>
              </div>
            </div>
          </section>

          {/* CTA Final */}
          <section className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto bg-gradient-to-br from-blue-600 to-purple-700 rounded-3xl p-12 text-center text-white shadow-2xl">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                🎯 Besoin d'un devis ou d'un conseil ?
              </h2>
              <p className="text-xl mb-8 text-blue-100">
                Contactez-nous pour un diagnostic gratuit et des conseils personnalisés
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                <a
                  href="tel:+33757821306"
                  className="bg-white hover:bg-gray-100 text-blue-600 px-10 py-5 rounded-xl font-bold text-xl transition-all transform hover:scale-105 shadow-xl inline-flex items-center justify-center gap-3"
                >
                  <Phone className="w-7 h-7" />
                  07 57 82 13 06
                </a>

                <a
                  href="mailto:contact@parquets-gauthier.fr"
                  className="bg-blue-800 hover:bg-blue-900 text-white px-10 py-5 rounded-xl font-bold text-xl transition-all inline-flex items-center justify-center gap-3"
                >
                  <Mail className="w-7 h-7" />
                  Email
                </a>
              </div>

              <p className="text-blue-100">
                📍 Zone d'intervention : Strasbourg et environs (50 km)<br />
                ⚡ Devis sous 24h — Intervention sous 48h
              </p>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
}
