import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, ExternalLink, Download, Rss, Youtube, FileText } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-r from-[#0f1b2b] via-[#1a2537] to-[#0f1b2b] text-white relative overflow-hidden mt-auto border-t-4 border-[#d9b45a]">
      <div className="relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">

            <div className="lg:col-span-2">
              <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#d9b45a] via-[#b8941a] to-[#d9b45a] mb-4">
                Les Ponceurs Réunis
              </h3>
              <p className="text-gray-400 text-sm mb-2 font-semibold">
                Les Ponceurs Réunis – L'Artisan du Parquet, à Votre Service Depuis Plus de 20 Ans
              </p>
              <p className="text-gray-400 text-sm mb-4">
                Chez Les Ponceurs Réunis, on ne fait pas que poncer des parquets… On leur redonne une seconde jeunesse ! Depuis plus de 20 ans, on arpente les maisons et les appartements du Grand Est pour sauver, restaurer et sublimer vos sols en bois.
              </p>
              <div className="space-y-3 pt-2">
                <h4 className="text-sm font-semibold text-[#d9b45a]">Contact</h4>
                <a
                  href="tel:+33757821306"
                  className="flex items-center gap-2 text-gray-400 hover:text-[#d9b45a] transition-colors text-sm group"
                >
                  <Phone className="w-4 h-4 flex-shrink-0 group-hover:scale-110 transition-transform" />
                  <span>07 57 82 13 06</span>
                </a>
                <a
                  href="mailto:contact@poncages.fr"
                  className="flex items-center gap-2 text-gray-400 hover:text-[#d9b45a] transition-colors text-sm group"
                >
                  <Mail className="w-4 h-4 flex-shrink-0 group-hover:scale-110 transition-transform" />
                  <span>contact@poncages.fr</span>
                </a>
                <div className="flex items-start gap-2 text-gray-400 text-sm">
                  <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  <span>6 rue du Commerce<br />68420 Herrlisheim-près-Colmar<br />France</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-[#d9b45a] mb-4">Navigation</h4>
              <ul className="space-y-2">
                <li>
                  <Link to="/" className="text-gray-400 hover:text-[#d9b45a] transition-colors text-sm">
                    Accueil
                  </Link>
                </li>
                <li>
                  <Link to="/services" className="text-gray-400 hover:text-[#d9b45a] transition-colors text-sm">
                    Nos Services
                  </Link>
                </li>
                <li>
                  <Link to="/gallery" className="text-gray-400 hover:text-[#d9b45a] transition-colors text-sm">
                    Galerie
                  </Link>
                </li>
                <li>
                  <Link to="/blog" className="text-gray-400 hover:text-[#d9b45a] transition-colors text-sm">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="text-gray-400 hover:text-[#d9b45a] transition-colors text-sm">
                    À propos
                  </Link>
                </li>
                <li>
                  <Link to="/reviews" className="text-gray-400 hover:text-[#d9b45a] transition-colors text-sm">
                    Avis clients
                  </Link>
                </li>
                <li>
                  <Link to="/faq" className="text-gray-400 hover:text-[#d9b45a] transition-colors text-sm">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link
                    to="/youtube"
                    className="flex items-center gap-2 text-gray-400 hover:text-[#d9b45a] transition-colors text-sm group"
                  >
                    <Youtube className="w-4 h-4 flex-shrink-0 group-hover:scale-110 transition-transform" />
                    <span>YouTube</span>
                  </Link>
                </li>
                <li>
                  <a
                    href="/rss.xml"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-gray-400 hover:text-[#d9b45a] transition-colors text-sm group"
                  >
                    <Rss className="w-4 h-4 flex-shrink-0 group-hover:scale-110 transition-transform" />
                    <span>Flux RSS</span>
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-[#d9b45a] mb-4">Services</h4>
              <ul className="space-y-2">
                <li>
                  <Link to="/services/pose-parquet" className="text-gray-400 hover:text-[#d9b45a] transition-colors text-sm">
                    Pose de Parquet
                  </Link>
                </li>
                <li>
                  <Link to="/location-ponceuse" className="text-gray-400 hover:text-[#d9b45a] transition-colors text-sm">
                    Location Ponceuse
                  </Link>
                </li>
                <li>
                  <Link to="/formation" className="text-gray-400 hover:text-[#d9b45a] transition-colors text-sm">
                    Formation Parquet
                  </Link>
                </li>
                <li>
                  <Link to="/boutique" className="text-gray-400 hover:text-[#d9b45a] transition-colors text-sm">
                    Boutique
                  </Link>
                </li>
                <li>
                  <a
                    href="https://mjuzyqhxifyvebtnlrra.supabase.co/storage/v1/object/public/lpr2/ponceurs_reunis_presentation.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-gray-400 hover:text-[#d9b45a] transition-colors text-sm group"
                  >
                    <Download className="w-4 h-4 flex-shrink-0 group-hover:scale-110 transition-transform" />
                    <span>Plaquette PDF</span>
                  </a>
                </li>
              </ul>

              <h4 className="text-lg font-semibold text-[#d9b45a] mb-4 mt-6">Solutions Problèmes</h4>
              <ul className="space-y-2">
                <li>
                  <Link to="/parquet-raye-meuble" className="text-gray-400 hover:text-[#d9b45a] transition-colors text-sm">
                    Parquet Rayé
                  </Link>
                </li>
                <li>
                  <Link to="/degat-urine-parquet" className="text-gray-400 hover:text-[#d9b45a] transition-colors text-sm">
                    Dégât d'Urine
                  </Link>
                </li>
                <li>
                  <Link to="/injection-anti-grincement-parquet" className="text-gray-400 hover:text-[#d9b45a] transition-colors text-sm">
                    Anti-Grincement
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-[#d9b45a] mb-4">Informations</h4>
              <ul className="space-y-2">
                <li>
                  <Link to="/analyse-parquet-gratuite" className="text-gray-400 hover:text-[#d9b45a] transition-colors text-sm">
                    Analyse Gratuite
                  </Link>
                </li>
                <li>
                  <Link
                    to="/formulaire-devis"
                    className="flex items-center gap-2 text-gray-400 hover:text-[#d9b45a] transition-colors text-sm group"
                  >
                    <FileText className="w-4 h-4 flex-shrink-0 group-hover:scale-110 transition-transform" />
                    <span>Demande de Devis</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/franchise"
                    className="text-gray-400 hover:text-[#d9b45a] transition-colors text-sm font-semibold"
                  >
                    Devenir Franchisé
                  </Link>
                </li>
                <li>
                  <a
                    href="https://ponceur-parquet.fr"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-gray-400 hover:text-[#d9b45a] transition-colors text-sm group"
                  >
                    <ExternalLink className="w-4 h-4 flex-shrink-0 group-hover:scale-110 transition-transform" />
                    <span>ponceur-parquet.fr</span>
                  </a>
                </li>
                <li className="text-gray-400 text-sm pt-2">
                  <strong className="text-white">Horaires :</strong><br />
                  Lun - Ven : 8h - 18h<br />
                  Sam : 9h - 12h
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-[#d9b45a] mb-4">Nos Villes</h4>
              <ul className="space-y-2">
                <li>
                  <Link to="/expert-renovation-parquet" className="text-gray-400 hover:text-[#d9b45a] transition-colors text-sm font-semibold">
                    Toutes nos régions
                  </Link>
                </li>
                <li>
                  <Link to="/renovation-parquet-strasbourg" className="text-gray-400 hover:text-[#d9b45a] transition-colors text-sm">
                    Strasbourg
                  </Link>
                </li>
                <li>
                  <Link to="/renovation-parquet-colmar" className="text-gray-400 hover:text-[#d9b45a] transition-colors text-sm">
                    Colmar
                  </Link>
                </li>
                <li>
                  <Link to="/renovation-parquet-mulhouse" className="text-gray-400 hover:text-[#d9b45a] transition-colors text-sm">
                    Mulhouse
                  </Link>
                </li>
                <li>
                  <Link to="/renovation-parquet-belfort" className="text-gray-400 hover:text-[#d9b45a] transition-colors text-sm">
                    Belfort
                  </Link>
                </li>
                <li>
                  <Link to="/renovation-parquet-sarrebourg" className="text-gray-400 hover:text-[#d9b45a] transition-colors text-sm">
                    Sarrebourg
                  </Link>
                </li>
                <li>
                  <Link to="/renovation-parquet-dijon" className="text-gray-400 hover:text-[#d9b45a] transition-colors text-sm">
                    Dijon
                  </Link>
                </li>
                <li>
                  <Link to="/renovation-parquet-lyon" className="text-gray-400 hover:text-[#d9b45a] transition-colors text-sm">
                    Lyon
                  </Link>
                </li>
              </ul>
              <p className="text-gray-400 text-sm pt-4">
                <strong className="text-white">Zone :</strong><br />
                Alsace et régions limitrophes
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 bg-[#0f1b2b]/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-sm text-gray-500 text-center md:text-left">
                © {currentYear} <span className="text-gray-400">Les Ponceurs Réunis</span> - Artisans parqueteurs. Tous droits réservés.
              </p>
              <div className="flex flex-wrap gap-4 text-sm justify-center">
                <Link to="/mentions-legales" className="text-gray-500 hover:text-[#d9b45a] transition-colors">
                  Mentions légales
                </Link>
                <span className="text-gray-700">•</span>
                <Link to="/cgv" className="text-gray-500 hover:text-[#d9b45a] transition-colors">
                  CGV
                </Link>
                <span className="text-gray-700">•</span>
                <Link to="/politique-confidentialite" className="text-gray-500 hover:text-[#d9b45a] transition-colors">
                  Politique de confidentialité
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
