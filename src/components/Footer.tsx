import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Mail, MapPin, Phone, Sparkles } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const { t } = useTranslation();

  return (
    <footer className="bg-[#0F172A] text-white mt-auto">
      {/* Gradient accent bar */}
      <div className="h-1" style={{ background: 'linear-gradient(90deg, #2563EB 0%, #7C3AED 100%)' }}></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="md:col-span-2">
            <h3 className="text-xl font-extrabold text-white mb-4 tracking-tight">
              PALLMANN STORE
            </h3>
            <p className="text-gray-400 text-sm mb-4 leading-relaxed">
              Votre boutique en ligne de produits professionnels Pallmann pour l'entretien et la finition des parquets. Vitrificateurs, huiles, colles et accessoires de qualité supérieure.
            </p>
            <p className="text-gray-300 text-sm font-semibold">
              {t('footer.company')}
            </p>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <span className="w-8 h-0.5 bg-gradient-to-r from-[#2563EB] to-[#7C3AED]"></span>
              {t('footer.contact')}
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href="mailto:contact@pallmann-store.com"
                  className="flex items-center gap-2 text-gray-400 hover:text-[#7C3AED] transition-colors"
                >
                  <Mail className="w-4 h-4 flex-shrink-0 text-[#2563EB]" />
                  <span>contact@pallmann-store.com</span>
                </a>
              </li>
              <li>
                <a
                  href="tel:+33389210000"
                  className="flex items-center gap-2 text-gray-400 hover:text-[#7C3AED] transition-colors"
                >
                  <Phone className="w-4 h-4 flex-shrink-0 text-[#2563EB]" />
                  <span>03 89 21 00 00</span>
                </a>
              </li>
              <li className="flex items-start gap-2 text-gray-400">
                <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5 text-[#2563EB]" />
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
            <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <span className="w-8 h-0.5 bg-gradient-to-r from-[#2563EB] to-[#7C3AED]"></span>
              Navigation
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="text-gray-400 hover:text-[#7C3AED] transition-colors">
                  {t('common.shop')}
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-400 hover:text-[#7C3AED] transition-colors">
                  {t('common.blog')}
                </Link>
              </li>
              <li>
                <Link to="/pro" className="text-gray-400 hover:text-[#7C3AED] transition-colors flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  {t('common.pro')}
                </Link>
              </li>
              <li>
                <Link to="/demande-devis" className="text-gray-400 hover:text-[#7C3AED] transition-colors">
                  {t('common.quote')}
                </Link>
              </li>
              <li>
                <Link to="/panier" className="text-gray-400 hover:text-[#7C3AED] transition-colors">
                  {t('common.cart')}
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[#1E293B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-500 text-center md:text-left">
              © {currentYear} Pallmann Store - {t('footer.company')}. Tous droits réservés.
            </p>
            <div className="flex flex-wrap gap-4 text-sm justify-center">
              <Link to="/mentions-legales" className="text-gray-500 hover:text-[#7C3AED] transition-colors">
                {t('footer.legal')}
              </Link>
              <span className="text-[#1E293B]">•</span>
              <Link to="/cgv" className="text-gray-500 hover:text-[#7C3AED] transition-colors">
                {t('footer.cgv')}
              </Link>
              <span className="text-[#1E293B]">•</span>
              <Link to="/politique-confidentialite" className="text-gray-500 hover:text-[#7C3AED] transition-colors">
                {t('footer.privacy')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
