import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Mail, MapPin, Phone, Sparkles, ShoppingBag, FileText, BookOpen, Users, Truck, HelpCircle } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const { t } = useTranslation();

  return (
    <footer className="bg-[#1A1A1A] text-white mt-auto">
      {/* Gradient accent bar */}
      <div className="h-1" style={{ background: 'linear-gradient(90deg, #E67E22 0%, #D35400 100%)' }}></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Logo & Description */}
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-extrabold text-white mb-4 tracking-tight">
              PALLMANN STORE
            </h3>
            <p className="text-gray-400 text-sm mb-6 leading-relaxed">
              Votre boutique en ligne de produits professionnels Pallmann pour l'entretien et la finition des parquets. Vitrificateurs, huiles, colles et accessoires de qualité supérieure.
            </p>
            <p className="text-gray-300 text-sm font-semibold mb-4">
              {t('footer.company')}
            </p>
            
            {/* Contact rapide */}
            <div className="space-y-2">
              <a
                href="tel:+33756971137"
                className="flex items-center gap-3 text-white hover:text-[#E67E22] transition-colors font-semibold"
              >
                <Phone className="w-5 h-5 text-[#E67E22]" />
                07 56 97 11 37
              </a>
              <a
                href="mailto:contact@ponceur-parquet.fr"
                className="flex items-center gap-3 text-gray-400 hover:text-[#E67E22] transition-colors"
              >
                <Mail className="w-5 h-5 text-[#E67E22]" />
                contact@ponceur-parquet.fr
              </a>
              <div className="flex items-start gap-3 text-gray-400">
                <MapPin className="w-5 h-5 text-[#E67E22] flex-shrink-0 mt-0.5" />
                <span className="text-sm">
                  6 rue du Commerce<br />
                  68420 Herrlisheim près Colmar
                </span>
              </div>
            </div>
          </div>

          {/* Boutique */}
          <div>
            <h4 className="text-base font-bold text-white mb-4 flex items-center gap-2">
              <ShoppingBag className="w-4 h-4 text-[#E67E22]" />
              Boutique
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/" className="text-gray-400 hover:text-[#E67E22] transition-colors">
                  Tous les produits
                </Link>
              </li>
              <li>
                <Link to="/?category=Vitrificateurs" className="text-gray-400 hover:text-[#E67E22] transition-colors">
                  Vitrificateurs & Huiles
                </Link>
              </li>
              <li>
                <Link to="/?category=Colles" className="text-gray-400 hover:text-[#E67E22] transition-colors">
                  Colles
                </Link>
              </li>
              <li>
                <Link to="/?category=Entretien" className="text-gray-400 hover:text-[#E67E22] transition-colors">
                  Entretien
                </Link>
              </li>
              <li>
                <Link to="/?category=Abrasifs" className="text-gray-400 hover:text-[#E67E22] transition-colors">
                  Abrasifs & Outils
                </Link>
              </li>
              <li>
                <Link to="/?category=Machines" className="text-gray-400 hover:text-[#E67E22] transition-colors">
                  Machines
                </Link>
              </li>
              <li>
                <Link to="/?category=Outdoor" className="text-gray-400 hover:text-[#E67E22] transition-colors">
                  Outdoor
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-base font-bold text-white mb-4 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#E67E22]" />
              Services
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/pro" className="text-gray-400 hover:text-[#E67E22] transition-colors">
                  Espace Pro
                </Link>
              </li>
              <li>
                <Link to="/demande-devis" className="text-gray-400 hover:text-[#E67E22] transition-colors">
                  Demande de devis
                </Link>
              </li>
              <li>
                <Link to="/partenaires" className="text-gray-400 hover:text-[#E67E22] transition-colors">
                  Nos partenaires
                </Link>
              </li>
              <li>
                <Link to="/parrainage" className="text-gray-400 hover:text-[#E67E22] transition-colors">
                  🎁 Parrainage
                </Link>
              </li>
              <li>
                <Link to="/calculateur-pro" className="text-gray-400 hover:text-[#E67E22] transition-colors">
                  Calculateur surface
                </Link>
              </li>
              <li>
                <Link to="/livraison" className="text-gray-400 hover:text-[#E67E22] transition-colors">
                  Livraison & Franco
                </Link>
              </li>
            </ul>
          </div>

          {/* Informations */}
          <div>
            <h4 className="text-base font-bold text-white mb-4 flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-[#E67E22]" />
              Informations
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/blog" className="text-gray-400 hover:text-[#E67E22] transition-colors">
                  Blog & Conseils
                </Link>
              </li>
              <li>
                <Link to="/entretien-parquet-vitrifie" className="text-gray-400 hover:text-[#E67E22] transition-colors">
                  Entretien parquet vitrifié
                </Link>
              </li>
              <li>
                <Link to="/entretien-parquet-huile" className="text-gray-400 hover:text-[#E67E22] transition-colors">
                  Entretien parquet huilé
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-[#E67E22] transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/mentions-legales" className="text-gray-400 hover:text-[#E67E22] transition-colors">
                  Mentions légales
                </Link>
              </li>
              <li>
                <Link to="/cgv" className="text-gray-400 hover:text-[#E67E22] transition-colors">
                  CGV
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-500 text-center md:text-left">
              © {currentYear} Pallmann Store - {t('footer.company')}. Tous droits réservés.
            </p>
            <div className="flex flex-wrap gap-6 text-sm justify-center">
              <Link to="/mentions-legales" className="text-gray-500 hover:text-[#E67E22] transition-colors">
                Mentions légales
              </Link>
              <Link to="/cgv" className="text-gray-500 hover:text-[#E67E22] transition-colors">
                CGV
              </Link>
              <Link to="/politique-confidentialite" className="text-gray-500 hover:text-[#E67E22] transition-colors">
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
