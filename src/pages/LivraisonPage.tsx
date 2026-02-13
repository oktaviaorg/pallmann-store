import React from 'react';
import { Helmet } from 'react-helmet';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Truck, Package, MapPin, Clock, Euro, CheckCircle } from 'lucide-react';

export default function LivraisonPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <Helmet>
        <title>Livraison & Expédition | Pallmann Store</title>
        <meta name="description" content="Informations sur la livraison de vos produits Pallmann : délais, modes d'expédition, franco de port et retrait sur place." />
      </Helmet>

      <Header />

      <main className="flex-1 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-gray-200">
            <h1 className="text-4xl font-bold text-gray-900 mb-4 pb-4 border-b-4 border-[#d9b45a]">
              Livraison & Expédition
            </h1>
            <p className="text-xl text-gray-700 mb-8">
              Toutes les informations sur la livraison de vos produits Pallmann
            </p>

            <div className="space-y-8">
              {/* Délais */}
              <section className="bg-[#d9b45a]/10 border-l-4 border-[#d9b45a] p-6 rounded-r-lg">
                <div className="flex items-center gap-3 mb-3">
                  <Clock className="w-6 h-6 text-[#b8941a]" />
                  <h2 className="text-2xl font-bold text-gray-900">Délais de livraison</h2>
                </div>
                <p className="text-lg text-gray-800">
                  <strong>Expédition sous 3 jours ouvrés</strong> après validation de votre commande.
                </p>
                <p className="text-gray-600 mt-2">
                  Les commandes passées avant 12h sont généralement expédiées le jour même (sous réserve de disponibilité).
                </p>
              </section>

              {/* Modes de livraison */}
              <section>
                <div className="flex items-center gap-3 mb-4">
                  <Truck className="w-6 h-6 text-[#b8941a]" />
                  <h2 className="text-2xl font-bold text-gray-900">Modes de livraison</h2>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-5 rounded-xl border border-gray-200">
                    <h3 className="font-semibold text-gray-900 mb-2">📦 Mondial Relay</h3>
                    <p className="text-gray-600">Livraison en point relais</p>
                    <p className="text-sm text-gray-500 mt-1">Délai : 3-5 jours ouvrés</p>
                  </div>
                  <div className="bg-gray-50 p-5 rounded-xl border border-gray-200">
                    <h3 className="font-semibold text-gray-900 mb-2">🏠 Colissimo</h3>
                    <p className="text-gray-600">Livraison à domicile</p>
                    <p className="text-sm text-gray-500 mt-1">Délai : 2-4 jours ouvrés</p>
                  </div>
                  <div className="bg-gray-50 p-5 rounded-xl border border-gray-200">
                    <h3 className="font-semibold text-gray-900 mb-2">🚚 Transporteur palette</h3>
                    <p className="text-gray-600">Pour commandes volumineuses ou produits dangereux</p>
                    <p className="text-sm text-gray-500 mt-1">Sur devis</p>
                  </div>
                  <div className="bg-gray-50 p-5 rounded-xl border border-gray-200">
                    <h3 className="font-semibold text-gray-900 mb-2">🏪 Retrait sur place</h3>
                    <p className="text-gray-600">Gratuit - Herrlisheim-près-Colmar</p>
                    <p className="text-sm text-gray-500 mt-1">Sur rendez-vous</p>
                  </div>
                </div>
              </section>

              {/* Frais de port */}
              <section>
                <div className="flex items-center gap-3 mb-4">
                  <Euro className="w-6 h-6 text-[#b8941a]" />
                  <h2 className="text-2xl font-bold text-gray-900">Frais de port</h2>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-4 bg-green-50 rounded-lg border border-green-200">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <p className="text-gray-800">
                      <strong>Franco de port à partir de 630€ HT</strong> — Livraison gratuite !
                    </p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <p className="text-gray-700">
                      <strong>En dessous de 630€ HT :</strong> frais de port calculés selon le poids et la destination.
                    </p>
                    <p className="text-gray-600 mt-1">
                      Tarif indicatif : 9,90€ par article pour les petits colis.
                    </p>
                  </div>
                </div>
              </section>

              {/* Retrait sur place */}
              <section>
                <div className="flex items-center gap-3 mb-4">
                  <MapPin className="w-6 h-6 text-[#b8941a]" />
                  <h2 className="text-2xl font-bold text-gray-900">Retrait sur place</h2>
                </div>
                <div className="bg-gray-50 p-5 rounded-xl border border-gray-200">
                  <p className="font-semibold text-gray-900 mb-2">Adresse de retrait :</p>
                  <p className="text-gray-700">
                    Pallmann Store / Groupe Epenon<br />
                    6 rue du Commerce<br />
                    68420 Herrlisheim-près-Colmar
                  </p>
                  <p className="text-gray-600 mt-3">
                    <strong>Sur rendez-vous uniquement.</strong> Contactez-nous pour convenir d'un créneau.
                  </p>
                </div>
              </section>

              {/* Politique de retour résumée */}
              <section>
                <div className="flex items-center gap-3 mb-4">
                  <Package className="w-6 h-6 text-[#b8941a]" />
                  <h2 className="text-2xl font-bold text-gray-900">Retours</h2>
                </div>
                <div className="bg-gray-50 p-5 rounded-xl border border-gray-200">
                  <ul className="space-y-2 text-gray-700">
                    <li>• <strong>Délai de rétractation :</strong> 14 jours après réception</li>
                    <li>• <strong>Frais de retour :</strong> à la charge de l'acheteur</li>
                    <li>• <strong>Conditions :</strong> produit non ouvert, non utilisé, emballage d'origine</li>
                    <li>• <strong>Remboursement :</strong> sous 14 jours après réception du retour</li>
                  </ul>
                  <p className="text-sm text-gray-500 mt-3">
                    Voir nos <a href="/cgv-boutique" className="text-[#b8941a] hover:underline">Conditions Générales de Vente</a> pour plus de détails.
                  </p>
                </div>
              </section>

              {/* Contact */}
              <section className="bg-[#d9b45a]/10 p-6 rounded-xl border border-[#d9b45a]/30">
                <h2 className="text-xl font-bold text-gray-900 mb-3">Une question sur votre livraison ?</h2>
                <p className="text-gray-700">
                  Contactez-nous par email : <a href="mailto:contact@pallmann-store.com" className="text-[#b8941a] hover:underline font-medium">contact@pallmann-store.com</a>
                </p>
              </section>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
