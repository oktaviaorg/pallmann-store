import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, MapPin, Phone } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#003366] text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="md:col-span-2">
            <h3 className="text-xl font-bold text-white mb-4">
              Pallmann Store
            </h3>
            <p className="text-gray-300 text-sm mb-4">
              Votre boutique en ligne de produits professionnels Pallmann pour l'entretien et la finition des parquets. Vitrificateurs, huiles, colles et accessoires de qualité supérieure.
            </p>
            <p className="text-gray-300 text-sm font-semibold">
              Groupe Renoline SARL
            </p>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold text-[#ff9900] mb-4">Contact</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href="mailto:contact@pallmann-store.com"
                  className="flex items-center gap-2 text-gray-300 hover:text-[#ff9900] transition-colors"
                >
                  <Mail className="w-4 h-4 flex-shrink-0" />
                  <span>contact@pallmann-store.com</span>
                </a>
              </li>
              <li>
                <a
                  href="tel:+33389210000"
                  className="flex items-center gap-2 text-gray-300 hover:text-[#ff9900] transition-colors"
                >
                  <Phone className="w-4 h-4 flex-shrink-0" />
                  <span>03 89 21 00 00</span>
                </a>
              </li>
              <li className="flex items-start gap-2 text-gray-300">
                <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <span>
                  6 rue du Commerce<br />
                  68420 Herrlisheim près Colmar<br />
                  France
                </span>
              </li>
            </ul>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-lg font-semibold text-[#ff9900] mb-4">Navigation</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="text-gray-300 hover:text-[#ff9900] transition-colors">
                  Boutique
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-300 hover:text-[#ff9900] transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/panier" className="text-gray-300 hover:text-[#ff9900] transition-colors">
                  Panier
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-400 text-center md:text-left">
              © {currentYear} Pallmann Store - Groupe Renoline SARL. Tous droits réservés.
            </p>
            <div className="flex flex-wrap gap-4 text-sm justify-center">
              <Link to="/mentions-legales" className="text-gray-400 hover:text-[#ff9900] transition-colors">
                Mentions légales
              </Link>
              <span className="text-gray-600">•</span>
              <Link to="/cgv" className="text-gray-400 hover:text-[#ff9900] transition-colors">
                CGV
              </Link>
              <span className="text-gray-600">•</span>
              <Link to="/politique-confidentialite" className="text-gray-400 hover:text-[#ff9900] transition-colors">
                Confidentialité
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
