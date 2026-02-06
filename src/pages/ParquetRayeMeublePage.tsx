import { Helmet } from 'react-helmet';
import { Phone, MessageCircle, CheckCircle, Clock, Euro, ArrowRight } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function ParquetRayeMeublePage() {
  const handleWhatsAppClick = () => {
    window.open('https://wa.me/33757821306?text=Bonjour,%20j\'ai%20des%20rayures%20sur%20mon%20parquet%20et%20je%20souhaiterais%20un%20devis', '_blank');
  };

  return (
    <>
      <Helmet>
        <title>Parquet rayé par un meuble ? Solution express avant l'état des lieux | Parquets Gauthier</title>
        <meta name="description" content="Rayures sur votre parquet avant de rendre les clés ? Réparation express en 1 journée avec ponçage léger + Magic Oil 2K. Devis en 2h par WhatsApp. 32-40€/m²." />
        <meta name="keywords" content="parquet rayé meuble, réparation parquet locataire, ponçage léger, état des lieux, rayures parquet, Magic Oil 2K" />
        <link rel="canonical" href="https://parquets-gauthier.fr/parquet-raye-meuble" />

        <meta property="og:title" content="Parquet rayé par un meuble ? Solution express avant l'état des lieux" />
        <meta property="og:description" content="Réparation express en 1 journée. Devis en 2h par WhatsApp. 32-40€/m²." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://parquets-gauthier.fr/parquet-raye-meuble" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <Header />

        <main className="pt-24 pb-16">
          {/* Hero Section */}
          <section className="container mx-auto px-4 mb-16">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-block bg-red-100 text-red-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                🚨 État des lieux dans moins de 15 jours ?
              </div>

              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                🛋️ Parquet rayé par un meuble ?<br />
                <span className="text-blue-600">Réparation express avant de rendre les clés</span>
              </h1>

              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Évitez la retenue sur caution avec notre solution professionnelle.<br />
                <strong>Ponçage léger + Magic Oil 2K</strong> — Résultat invisible en 1 journée.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
                <button
                  onClick={handleWhatsAppClick}
                  className="group bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center gap-3"
                >
                  <MessageCircle className="w-6 h-6" />
                  Envoyez une photo → Devis en 2h
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>

                <a
                  href="tel:+33757821306"
                  className="bg-white hover:bg-gray-50 text-gray-900 px-8 py-4 rounded-xl font-bold text-lg transition-all border-2 border-gray-300 hover:border-blue-500 flex items-center gap-3"
                >
                  <Phone className="w-6 h-6" />
                  07 57 82 13 06
                </a>
              </div>

              <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span>Devis en 2h</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-blue-600" />
                  <span>Réalisé en 1 journée</span>
                </div>
                <div className="flex items-center gap-2">
                  <Euro className="w-5 h-5 text-purple-600" />
                  <span>32-40€/m²</span>
                </div>
              </div>
            </div>
          </section>

          {/* Avant/Après Section */}
          <section className="bg-gray-900 py-16 mb-16">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-white text-center mb-12">
                ✨ Résultats avant/après
              </h2>

              <div className="max-w-5xl mx-auto">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="group relative overflow-hidden rounded-2xl shadow-2xl">
                    <div className="absolute top-4 left-4 bg-red-600 text-white px-4 py-2 rounded-lg font-bold text-sm z-10">
                      ❌ AVANT
                    </div>
                    <img
                      src="https://mjuzyqhxifyvebtnlrra.supabase.co/storage/v1/object/public/lpr2/tache_parquet.jpg"
                      alt="Parquet avec rayures profondes causées par un meuble"
                      className="w-full h-80 object-cover transform group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                      <p className="text-white font-semibold">Rayures profondes par déplacement de meuble</p>
                    </div>
                  </div>

                  <div className="group relative overflow-hidden rounded-2xl shadow-2xl">
                    <div className="absolute top-4 left-4 bg-green-600 text-white px-4 py-2 rounded-lg font-bold text-sm z-10">
                      ✅ APRÈS
                    </div>
                    <img
                      src="https://mjuzyqhxifyvebtnlrra.supabase.co/storage/v1/object/public/lpr2/vitrificateur%20pallx%20zero2k.png"
                      alt="Parquet rénové après ponçage et application Magic Oil 2K"
                      className="w-full h-80 object-cover transform group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                      <p className="text-white font-semibold">Après ponçage léger + Magic Oil 2K</p>
                    </div>
                  </div>
                </div>

                <div className="mt-12 text-center">
                  <p className="text-white text-lg mb-6">
                    <strong>Résultat :</strong> Les rayures sont totalement invisibles, le parquet retrouve son aspect d'origine.
                  </p>
                  <button
                    onClick={handleWhatsAppClick}
                    className="bg-white hover:bg-gray-100 text-gray-900 px-8 py-4 rounded-xl font-bold text-lg transition-all transform hover:scale-105 shadow-xl inline-flex items-center gap-3"
                  >
                    <MessageCircle className="w-6 h-6" />
                    Envoyez vos photos pour un diagnostic gratuit
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Notre Solution Section */}
          <section className="container mx-auto px-4 mb-16">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                🔧 Notre solution express en 3 étapes
              </h2>

              <div className="grid md:grid-cols-3 gap-6 mb-12">
                <div className="bg-blue-50 p-6 rounded-2xl border-2 border-blue-200">
                  <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-xl mb-4">
                    1
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Ponçage ciblé</h3>
                  <p className="text-gray-700">
                    Ponçage léger uniquement sur les zones rayées pour retirer les dégâts superficiels sans abîmer le reste du parquet.
                  </p>
                </div>

                <div className="bg-green-50 p-6 rounded-2xl border-2 border-green-200">
                  <div className="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-xl mb-4">
                    2
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Magic Oil 2K</h3>
                  <p className="text-gray-700">
                    Application de notre huile professionnelle 2 composants pour une protection durable et un aspect satiné naturel.
                  </p>
                </div>

                <div className="bg-purple-50 p-6 rounded-2xl border-2 border-purple-200">
                  <div className="w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold text-xl mb-4">
                    3
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Résultat invisible</h3>
                  <p className="text-gray-700">
                    Séchage en quelques heures. Le parquet est prêt pour l'état des lieux, aucune trace visible des anciennes rayures.
                  </p>
                </div>
              </div>

              <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 text-white shadow-2xl">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                  <div>
                    <h3 className="text-2xl font-bold mb-2">Tarif transparent</h3>
                    <p className="text-blue-100 text-lg">
                      <strong className="text-3xl">32 à 40 €/m²</strong> selon l'étendue des rayures
                    </p>
                    <ul className="mt-4 space-y-2 text-blue-100">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-5 h-5" />
                        Déplacement inclus (rayon 50 km autour de Strasbourg)
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-5 h-5" />
                        Matériel professionnel
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-5 h-5" />
                        Garantie résultat
                      </li>
                    </ul>
                  </div>
                  <div className="flex-shrink-0">
                    <button
                      onClick={handleWhatsAppClick}
                      className="bg-white hover:bg-gray-100 text-blue-600 px-8 py-4 rounded-xl font-bold text-lg transition-all transform hover:scale-105 shadow-xl"
                    >
                      Demander un devis
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Témoignages Section */}
          <section className="bg-gray-50 py-16 mb-16">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
                💬 Ce que disent nos clients locataires
              </h2>

              <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-2xl shadow-lg">
                  <div className="flex items-center gap-2 mb-4 text-yellow-500">
                    {'⭐'.repeat(5)}
                  </div>
                  <p className="text-gray-700 mb-4 italic">
                    "J'avais de grosses rayures à cause du déménagement. Christophe est intervenu 3 jours avant mon état des lieux. Le propriétaire n'a rien remarqué, j'ai récupéré toute ma caution !"
                  </p>
                  <p className="font-semibold text-gray-900">Sarah M. - Strasbourg</p>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-lg">
                  <div className="flex items-center gap-2 mb-4 text-yellow-500">
                    {'⭐'.repeat(5)}
                  </div>
                  <p className="text-gray-700 mb-4 italic">
                    "Service ultra-rapide ! J'ai envoyé les photos le lundi, devis le jour même, intervention le mercredi. 350€ investis pour récupérer 1200€ de caution. Le calcul est vite fait !"
                  </p>
                  <p className="font-semibold text-gray-900">Thomas B. - Schiltigheim</p>
                </div>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="container mx-auto px-4 mb-16">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                ❓ Questions fréquentes
              </h2>

              <div className="space-y-4">
                <details className="bg-white p-6 rounded-xl shadow-md">
                  <summary className="font-bold text-lg text-gray-900 cursor-pointer">
                    Combien de temps prend la réparation ?
                  </summary>
                  <p className="mt-4 text-gray-700">
                    L'intervention complète dure généralement 4 à 6 heures pour une pièce standard (15-20m²). Le séchage de l'huile prend 6 heures, vous pouvez marcher dessus dès le lendemain.
                  </p>
                </details>

                <details className="bg-white p-6 rounded-xl shadow-md">
                  <summary className="font-bold text-lg text-gray-900 cursor-pointer">
                    Est-ce que ça fonctionne sur tous les types de parquet ?
                  </summary>
                  <p className="mt-4 text-gray-700">
                    Oui, pour les parquets massifs et contrecollés d'épaisseur suffisante (minimum 2,5mm de couche d'usure). Envoyez-nous une photo par WhatsApp pour un diagnostic gratuit.
                  </p>
                </details>

                <details className="bg-white p-6 rounded-xl shadow-md">
                  <summary className="font-bold text-lg text-gray-900 cursor-pointer">
                    Mon état des lieux est dans 5 jours, est-ce possible ?
                  </summary>
                  <p className="mt-4 text-gray-700">
                    Oui ! Nous traitons les urgences en priorité. Contactez-nous immédiatement par WhatsApp ou téléphone pour une intervention express.
                  </p>
                </details>

                <details className="bg-white p-6 rounded-xl shadow-md">
                  <summary className="font-bold text-lg text-gray-900 cursor-pointer">
                    Le résultat est-il vraiment invisible ?
                  </summary>
                  <p className="mt-4 text-gray-700">
                    Oui, avec notre technique de ponçage ciblé et Magic Oil 2K, les rayures disparaissent complètement. Le parquet retrouve son aspect d'origine, uniforme et sans différence de teinte.
                  </p>
                </details>
              </div>
            </div>
          </section>

          {/* CTA Final */}
          <section className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto bg-gradient-to-br from-green-600 to-green-700 rounded-3xl p-12 text-center text-white shadow-2xl">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                🚀 Ne perdez pas votre caution !
              </h2>
              <p className="text-xl mb-8 text-green-100">
                Envoyez-nous une photo de vos rayures maintenant,<br />
                recevez un devis détaillé en moins de 2 heures.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={handleWhatsAppClick}
                  className="bg-white hover:bg-gray-100 text-green-600 px-10 py-5 rounded-xl font-bold text-xl transition-all transform hover:scale-105 shadow-xl inline-flex items-center justify-center gap-3"
                >
                  <MessageCircle className="w-7 h-7" />
                  Envoyer une photo WhatsApp
                </button>

                <a
                  href="tel:+33757821306"
                  className="bg-green-800 hover:bg-green-900 text-white px-10 py-5 rounded-xl font-bold text-xl transition-all inline-flex items-center justify-center gap-3"
                >
                  <Phone className="w-7 h-7" />
                  Appeler maintenant
                </a>
              </div>

              <p className="mt-6 text-green-100 text-sm">
                ⚡ Intervention possible dans les 48h — Zone Strasbourg et environs (50 km)
              </p>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
}
