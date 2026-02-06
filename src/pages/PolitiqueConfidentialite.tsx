import React from 'react';
import { Helmet } from 'react-helmet';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Shield, Lock, Eye, Database, UserCheck, Cookie } from 'lucide-react';

export default function PolitiqueConfidentialite() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Helmet>
        <title>Politique de Confidentialité | Pallmann Store</title>
        <meta name="description" content="Politique de confidentialité et protection des données personnelles - Pallmann Store" />
        <meta name="robots" content="noindex, follow" />
        <link rel="canonical" href="https://pallmann-store.com/politique-confidentialite" />
      </Helmet>

      <Header />

      <main className="flex-1 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-gray-200">
            <h1 className="text-4xl font-bold text-gray-900 mb-8 pb-4 border-b-4 border-[#ff9900]">
              Politique de Confidentialité
            </h1>

            <div className="space-y-8 text-gray-700">
              <section>
                <div className="bg-[#ff9900]/10 border-l-4 border-[#ff9900] p-4 mb-6">
                  <p className="text-gray-800 font-medium">
                    Pallmann Store (Groupe Renoline SARL) s'engage à protéger la confidentialité de vos
                    données personnelles conformément au Règlement Général sur la Protection des Données
                    (RGPD) et à la loi Informatique et Libertés.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                  <Shield className="w-6 h-6 text-[#ff9900]" />
                  1. Responsable du traitement
                </h2>
                <div className="space-y-3 pl-9">
                  <p>
                    Le responsable du traitement des données personnelles collectées sur le site
                    pallmann-store.com est :
                  </p>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p><strong>Groupe Renoline SARL</strong></p>
                    <p>6 rue du Commerce</p>
                    <p>68420 Herrlisheim près Colmar, France</p>
                    <p>Email : contact@pallmann-store.com</p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                  <Database className="w-6 h-6 text-[#ff9900]" />
                  2. Données collectées
                </h2>
                <div className="space-y-3 pl-9">
                  <p>
                    <strong>2.1 Données collectées lors d'une commande</strong>
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Nom et prénom ou raison sociale</li>
                    <li>Adresse email</li>
                    <li>Numéro de téléphone</li>
                    <li>Adresse de livraison</li>
                    <li>Code postal et ville</li>
                  </ul>

                  <p className="mt-4">
                    <strong>2.2 Données de navigation</strong>
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Adresse IP</li>
                    <li>Type de navigateur</li>
                    <li>Pages visitées</li>
                    <li>Date et heure de connexion</li>
                  </ul>

                  <p className="mt-4">
                    <strong>2.3 Données de paiement</strong>
                  </p>
                  <p className="ml-4">
                    Les données de paiement (numéro de carte bancaire) sont collectées et traitées
                    exclusivement par notre prestataire de paiement Stripe. Nous n'avons pas accès
                    à ces informations.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                  <Eye className="w-6 h-6 text-[#ff9900]" />
                  3. Finalités du traitement
                </h2>
                <div className="space-y-3 pl-9">
                  <p>Vos données personnelles sont collectées pour les finalités suivantes :</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Traitement et suivi de vos commandes</li>
                    <li>Livraison des produits</li>
                    <li>Gestion de la relation client</li>
                    <li>Envoi de communications relatives à vos commandes</li>
                    <li>Amélioration de nos services</li>
                    <li>Respect des obligations légales et réglementaires</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                  <Lock className="w-6 h-6 text-[#ff9900]" />
                  4. Base légale du traitement
                </h2>
                <div className="space-y-3 pl-9">
                  <p>Le traitement de vos données personnelles repose sur :</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li><strong>L'exécution du contrat</strong> : traitement de votre commande</li>
                    <li><strong>L'intérêt légitime</strong> : amélioration de nos services</li>
                    <li><strong>Les obligations légales</strong> : conservation des données comptables</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                  <UserCheck className="w-6 h-6 text-[#ff9900]" />
                  5. Destinataires des données
                </h2>
                <div className="space-y-3 pl-9">
                  <p>Vos données personnelles sont destinées à :</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Groupe Renoline SARL (personnel habilité)</li>
                    <li>Prestataires techniques (Vercel, Supabase)</li>
                    <li>Prestataire de paiement (Stripe)</li>
                    <li>Transporteurs pour la livraison</li>
                  </ul>
                  <p className="mt-3">
                    Vos données ne sont jamais vendues ou louées à des tiers à des fins commerciales.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Durée de conservation</h2>
                <div className="space-y-3 pl-9">
                  <p>Vos données personnelles sont conservées pendant :</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li><strong>Données clients</strong> : durée de la relation commerciale + 3 ans</li>
                    <li><strong>Données comptables</strong> : 10 ans conformément aux obligations légales</li>
                    <li><strong>Cookies</strong> : 13 mois maximum</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Vos droits</h2>
                <div className="space-y-3 pl-9">
                  <p>Conformément au RGPD, vous disposez des droits suivants :</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li><strong>Droit d'accès</strong> : obtenir une copie de vos données</li>
                    <li><strong>Droit de rectification</strong> : corriger des données inexactes</li>
                    <li><strong>Droit à l'effacement</strong> : demander la suppression de vos données</li>
                    <li><strong>Droit à la limitation</strong> : limiter le traitement de vos données</li>
                    <li><strong>Droit à la portabilité</strong> : recevoir vos données dans un format structuré</li>
                    <li><strong>Droit d'opposition</strong> : vous opposer au traitement</li>
                  </ul>
                  <p className="mt-4">
                    Pour exercer ces droits, contactez-nous à :
                    <a href="mailto:contact@pallmann-store.com" className="text-[#ff9900] hover:underline ml-1 font-medium">
                      contact@pallmann-store.com
                    </a>
                  </p>
                  <p>
                    Vous disposez également du droit d'introduire une réclamation auprès de la CNIL :
                    <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer" className="text-[#ff9900] hover:underline ml-1">
                      www.cnil.fr
                    </a>
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                  <Cookie className="w-6 h-6 text-[#ff9900]" />
                  8. Cookies
                </h2>
                <div className="space-y-3 pl-9">
                  <p>
                    <strong>8.1 Types de cookies utilisés</strong>
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li><strong>Cookies nécessaires</strong> : fonctionnement du panier et du site</li>
                    <li><strong>Cookies de performance</strong> : statistiques de visite</li>
                  </ul>
                  <p className="mt-3">
                    <strong>8.2 Gestion des cookies</strong><br />
                    Vous pouvez désactiver les cookies dans les paramètres de votre navigateur.
                    Cela peut limiter certaines fonctionnalités du site.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Sécurité des données</h2>
                <div className="space-y-3 pl-9">
                  <p>
                    Nous mettons en œuvre les mesures techniques et organisationnelles appropriées
                    pour assurer la sécurité de vos données :
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Hébergement sécurisé</li>
                    <li>Protocole HTTPS</li>
                    <li>Accès restreint aux données</li>
                    <li>Paiements sécurisés via Stripe</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Modifications</h2>
                <div className="space-y-3 pl-9">
                  <p>
                    Nous nous réservons le droit de modifier cette politique à tout moment.
                    Les modifications seront publiées sur cette page.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Contact</h2>
                <div className="space-y-3 pl-9">
                  <p>
                    Pour toute question relative à cette politique, contactez-nous :
                  </p>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p><strong>Groupe Renoline SARL</strong></p>
                    <p>Email : <a href="mailto:contact@pallmann-store.com" className="text-[#ff9900] hover:underline">contact@pallmann-store.com</a></p>
                  </div>
                </div>
              </section>

              <section className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                <p className="text-sm text-gray-600">
                  <strong>Dernière mise à jour :</strong> {new Date().toLocaleDateString('fr-FR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
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
