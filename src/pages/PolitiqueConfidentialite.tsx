import React from 'react';
import { Helmet } from 'react-helmet';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Shield, Lock, Eye, Database, UserCheck, Cookie } from 'lucide-react';

export default function PolitiqueConfidentialite() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <Helmet>
        <title>Politique de Confidentialité | Les Ponceurs Réunis</title>
        <meta name="description" content="Politique de confidentialité et protection des données personnelles - Les Ponceurs Réunis" />
        <meta name="robots" content="noindex, follow" />
        <link rel="canonical" href="https://ponceur-parquet.fr/politique-confidentialite" />
      </Helmet>

      <Header />

      <main className="flex-1 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-gray-200">
            <h1 className="text-4xl font-bold text-gray-900 mb-8 pb-4 border-b-4 border-[#d9b45a]">
              Politique de Confidentialité
            </h1>

            <div className="space-y-8 text-gray-700">
              <section>
                <div className="bg-[#d9b45a]/10 border-l-4 border-[#d9b45a] p-4 mb-6">
                  <p className="text-gray-800 font-medium">
                    Les Ponceurs Réunis s'engage à protéger la confidentialité de vos données personnelles
                    conformément au Règlement Général sur la Protection des Données (RGPD) et à la loi
                    Informatique et Libertés.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                  <Shield className="w-6 h-6 text-[#b8941a]" />
                  1. Responsable du traitement
                </h2>
                <div className="space-y-3 pl-9">
                  <p>
                    Le responsable du traitement des données personnelles collectées sur le site
                    ponceur-parquet.fr est :
                  </p>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p><strong>Les Ponceurs Réunis</strong></p>
                    <p>Alsace, France</p>
                    <p>Email : contact@poncages.fr</p>
                    <p>Téléphone : 07 57 82 13 06</p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                  <Database className="w-6 h-6 text-[#b8941a]" />
                  2. Données collectées
                </h2>
                <div className="space-y-3 pl-9">
                  <p>
                    <strong>2.1 Données collectées via le formulaire de contact</strong>
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Nom et prénom</li>
                    <li>Adresse email</li>
                    <li>Numéro de téléphone</li>
                    <li>Code postal et ville</li>
                    <li>Type de bien (maison/appartement)</li>
                    <li>Surface à traiter</li>
                    <li>Type de service souhaité</li>
                    <li>Message libre (optionnel)</li>
                  </ul>

                  <p className="mt-4">
                    <strong>2.2 Données de navigation</strong>
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Adresse IP</li>
                    <li>Type de navigateur</li>
                    <li>Pages visitées</li>
                    <li>Date et heure de connexion</li>
                    <li>Données d'interaction avec le site (via Google Analytics)</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                  <Eye className="w-6 h-6 text-[#b8941a]" />
                  3. Finalités du traitement
                </h2>
                <div className="space-y-3 pl-9">
                  <p>Vos données personnelles sont collectées pour les finalités suivantes :</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Traitement de votre demande de devis</li>
                    <li>Établissement d'un devis personnalisé</li>
                    <li>Communication relative à votre demande</li>
                    <li>Suivi de la relation client</li>
                    <li>Amélioration de nos services</li>
                    <li>Statistiques et analyses d'audience (données anonymisées)</li>
                    <li>Respect des obligations légales et réglementaires</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                  <Lock className="w-6 h-6 text-[#b8941a]" />
                  4. Base légale du traitement
                </h2>
                <div className="space-y-3 pl-9">
                  <p>Le traitement de vos données personnelles repose sur :</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li><strong>Votre consentement</strong> : lors de la soumission du formulaire de contact</li>
                    <li><strong>L'exécution du contrat</strong> : pour le traitement de votre demande et l'établissement du devis</li>
                    <li><strong>L'intérêt légitime</strong> : pour l'amélioration de nos services et l'analyse statistique</li>
                    <li><strong>Les obligations légales</strong> : conservation des données comptables et fiscales</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                  <UserCheck className="w-6 h-6 text-[#b8941a]" />
                  5. Destinataires des données
                </h2>
                <div className="space-y-3 pl-9">
                  <p>Vos données personnelles sont destinées à :</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Les Ponceurs Réunis (personnel habilité)</li>
                    <li>Prestataires techniques (hébergement : Netlify, base de données : Supabase)</li>
                    <li>Outils d'analyse (Google Analytics) dans le respect de la confidentialité</li>
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
                    <li><strong>Demandes de devis</strong> : 3 ans à compter de la demande</li>
                    <li><strong>Clients</strong> : durée de la relation contractuelle + 10 ans (garantie décennale)</li>
                    <li><strong>Données comptables</strong> : 10 ans conformément aux obligations légales</li>
                    <li><strong>Cookies analytiques</strong> : 13 mois maximum</li>
                  </ul>
                  <p className="mt-3">
                    Au-delà de ces durées, vos données sont supprimées ou anonymisées.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Vos droits</h2>
                <div className="space-y-3 pl-9">
                  <p>Conformément au RGPD, vous disposez des droits suivants :</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li><strong>Droit d'accès</strong> : obtenir la confirmation du traitement de vos données et en obtenir une copie</li>
                    <li><strong>Droit de rectification</strong> : faire corriger des données inexactes ou incomplètes</li>
                    <li><strong>Droit à l'effacement</strong> : demander la suppression de vos données dans certains cas</li>
                    <li><strong>Droit à la limitation</strong> : demander la limitation du traitement de vos données</li>
                    <li><strong>Droit à la portabilité</strong> : recevoir vos données dans un format structuré</li>
                    <li><strong>Droit d'opposition</strong> : vous opposer au traitement de vos données</li>
                    <li><strong>Droit de retirer votre consentement</strong> : à tout moment</li>
                  </ul>
                  <p className="mt-4">
                    Pour exercer ces droits, contactez-nous à :
                    <a href="mailto:contact@poncages.fr" className="text-[#b8941a] hover:underline ml-1 font-medium">
                      contact@poncages.fr
                    </a>
                  </p>
                  <p>
                    Vous disposez également du droit d'introduire une réclamation auprès de la CNIL
                    (Commission Nationale de l'Informatique et des Libertés) :
                    <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer" className="text-[#b8941a] hover:underline ml-1">
                      www.cnil.fr
                    </a>
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                  <Cookie className="w-6 h-6 text-[#b8941a]" />
                  8. Cookies et technologies similaires
                </h2>
                <div className="space-y-3 pl-9">
                  <p>
                    <strong>8.1 Qu'est-ce qu'un cookie ?</strong><br />
                    Un cookie est un petit fichier texte déposé sur votre terminal lors de la visite d'un site.
                    Il permet de collecter des informations relatives à votre navigation.
                  </p>
                  <p>
                    <strong>8.2 Cookies utilisés</strong>
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li><strong>Cookies strictement nécessaires</strong> : fonctionnement du site (pas de consentement requis)</li>
                    <li><strong>Cookies analytiques (Google Analytics)</strong> : statistiques de visite anonymisées</li>
                    <li><strong>Cookies de mesure d'audience (Google Tag Manager)</strong> : suivi des conversions</li>
                  </ul>
                  <p className="mt-3">
                    <strong>8.3 Gestion des cookies</strong><br />
                    Vous pouvez à tout moment désactiver les cookies dans les paramètres de votre navigateur.
                    Attention, la désactivation de certains cookies peut limiter le fonctionnement du site.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Sécurité des données</h2>
                <div className="space-y-3 pl-9">
                  <p>
                    Les Ponceurs Réunis met en œuvre toutes les mesures techniques et organisationnelles
                    appropriées pour assurer la sécurité et la confidentialité de vos données personnelles :
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Hébergement sécurisé (Netlify, Supabase)</li>
                    <li>Chiffrement des données sensibles</li>
                    <li>Accès restreint aux données (personnel habilité uniquement)</li>
                    <li>Sauvegardes régulières</li>
                    <li>Protocole HTTPS pour toutes les communications</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Transferts de données hors UE</h2>
                <div className="space-y-3 pl-9">
                  <p>
                    Certains de nos prestataires techniques (Netlify, Google Analytics) peuvent stocker des
                    données en dehors de l'Union Européenne. Ces transferts sont encadrés par des garanties
                    appropriées (clauses contractuelles types, Privacy Shield pour les États-Unis).
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Modifications de la politique</h2>
                <div className="space-y-3 pl-9">
                  <p>
                    Les Ponceurs Réunis se réserve le droit de modifier la présente politique de confidentialité
                    à tout moment. Toute modification sera publiée sur cette page avec indication de la date
                    de mise à jour.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Contact</h2>
                <div className="space-y-3 pl-9">
                  <p>
                    Pour toute question relative à cette politique de confidentialité ou à la protection de
                    vos données personnelles, vous pouvez nous contacter :
                  </p>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p><strong>Les Ponceurs Réunis</strong></p>
                    <p>Email : <a href="mailto:contact@poncages.fr" className="text-[#b8941a] hover:underline">contact@poncages.fr</a></p>
                    <p>Téléphone : <a href="tel:+33757821306" className="text-[#b8941a] hover:underline">07 57 82 13 06</a></p>
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
