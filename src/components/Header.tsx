import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Download } from 'lucide-react';

const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  const getLinkStyle = (path: string) => ({
    fontWeight: isActive(path) ? '700' : '600',
    borderBottom: isActive(path) ? '3px solid #b8941a' : 'none',
    paddingBottom: '6px'
  });

  return (
    <header className="sticky top-0 z-40 bg-gradient-to-r from-[#0f1b2b] via-[#1a2537] to-[#0f1b2b] shadow-md border-b-4 border-[#d9b45a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center">
            <div className="flex flex-col leading-tight">
              <span className="text-lg font-bold text-[#d9b45a]" style={{ fontWeight: '800', letterSpacing: '0.05em' }}>
                Les Ponceurs
              </span>
              <span className="text-lg font-bold text-[#d9b45a]" style={{ fontWeight: '800', letterSpacing: '0.05em', marginTop: '-4px' }}>
                Réunis
              </span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center space-x-6">
            <Link
              to="/"
              className={`transition-colors font-semibold hover:text-[#d9b45a] ${isActive('/') ? 'text-[#d9b45a]' : 'text-white'}`}
              style={getLinkStyle('/')}
            >
              Accueil
            </Link>
            <Link
              to="/services"
              className={`transition-colors font-semibold hover:text-[#d9b45a] ${isActive('/services') ? 'text-[#d9b45a]' : 'text-white'}`}
              style={getLinkStyle('/services')}
            >
              Nos Services
            </Link>
            <Link
              to="/gallery"
              className={`transition-colors font-semibold hover:text-[#d9b45a] ${isActive('/gallery') ? 'text-[#d9b45a]' : 'text-white'}`}
              style={getLinkStyle('/gallery')}
            >
              Galerie
            </Link>
            <Link
              to="/blog"
              className={`transition-colors font-semibold hover:text-[#d9b45a] ${isActive('/blog') ? 'text-[#d9b45a]' : 'text-white'}`}
              style={getLinkStyle('/blog')}
            >
              Blog
            </Link>
            <Link
              to="/faq"
              className={`transition-colors font-semibold hover:text-[#d9b45a] ${isActive('/faq') ? 'text-[#d9b45a]' : 'text-white'}`}
              style={getLinkStyle('/faq')}
            >
              FAQ
            </Link>
            <a
              href="/#avis"
              className="transition-colors font-semibold hover:text-[#d9b45a] text-white"
            >
              Avis clients
            </a>

            <Link
              to="/location-ponceuse"
              className="transition-colors font-semibold hover:text-[#d9b45a] text-white"
            >
              Location
            </Link>

            <Link
              to="/boutique"
              className={`transition-colors font-semibold hover:text-[#d9b45a] ${isActive('/boutique') ? 'text-[#d9b45a]' : 'text-white'}`}
              style={getLinkStyle('/boutique')}
            >
              Boutique
            </Link>

            <a
              href="https://mjuzyqhxifyvebtnlrra.supabase.co/storage/v1/object/public/lpr2/ponceurs_reunis_presentation.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 transition-colors font-semibold hover:text-[#d9b45a] text-white"
              title="Télécharger notre plaquette"
            >
              <Download className="w-4 h-4" />
              <span className="hidden xl:inline">Plaquette</span>
            </a>

            <a
              href="https://wa.me/33757821306"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-[#25D366] hover:bg-[#20BA5A] text-white px-5 py-2.5 rounded-full font-bold hover:scale-105 transition-all shadow-lg"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              <span className="hidden lg:inline">07 57 82 13 06</span>
            </a>
          </nav>

          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-700 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Menu"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6 text-white" />
            ) : (
              <Menu className="w-6 h-6 text-white" />
            )}
          </button>
        </div>

        {mobileMenuOpen && (
          <nav className="md:hidden py-4 border-t border-gray-700">
            <Link
              to="/"
              className={`block px-4 py-3 rounded-lg text-base font-semibold transition-colors ${isActive('/') ? 'bg-[#d9b45a]/20 text-[#d9b45a]' : 'text-white hover:bg-gray-700'}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Accueil
            </Link>
            <Link
              to="/services"
              className={`block px-4 py-3 rounded-lg text-base font-semibold transition-colors ${isActive('/services') ? 'bg-[#d9b45a]/20 text-[#d9b45a]' : 'text-white hover:bg-gray-700'}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Nos Services
            </Link>
            <Link
              to="/gallery"
              className={`block px-4 py-3 rounded-lg text-base font-semibold transition-colors ${isActive('/gallery') ? 'bg-[#d9b45a]/20 text-[#d9b45a]' : 'text-white hover:bg-gray-700'}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Galerie
            </Link>
            <Link
              to="/blog"
              className={`block px-4 py-3 rounded-lg text-base font-semibold transition-colors ${isActive('/blog') ? 'bg-[#d9b45a]/20 text-[#d9b45a]' : 'text-white hover:bg-gray-700'}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Blog
            </Link>
            <Link
              to="/faq"
              className={`block px-4 py-3 rounded-lg text-base font-semibold transition-colors ${isActive('/faq') ? 'bg-[#d9b45a]/20 text-[#d9b45a]' : 'text-white hover:bg-gray-700'}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              FAQ
            </Link>
            <a
              href="/#avis"
              className="block px-4 py-3 rounded-lg text-base font-semibold transition-colors text-white hover:bg-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              Avis clients
            </a>
            <Link
              to="/location-ponceuse"
              className={`block px-4 py-3 rounded-lg text-base font-semibold transition-colors ${isActive('/location-ponceuse') ? 'bg-[#d9b45a]/20 text-[#d9b45a]' : 'text-white hover:bg-gray-700'}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Location
            </Link>
            <Link
              to="/boutique"
              className={`block px-4 py-3 rounded-lg text-base font-semibold transition-colors ${isActive('/boutique') ? 'bg-[#d9b45a]/20 text-[#d9b45a]' : 'text-white hover:bg-gray-700'}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Boutique
            </Link>
            <a
              href="https://mjuzyqhxifyvebtnlrra.supabase.co/storage/v1/object/public/lpr2/ponceurs_reunis_presentation.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-3 rounded-lg text-base font-semibold transition-colors text-white hover:bg-gray-700"
              onClick={() => setMobileMenuOpen(false)}
              title="Télécharger notre plaquette"
            >
              <Download className="w-5 h-5" />
              Télécharger la plaquette
            </a>
            <a
              href="https://wa.me/33757821306"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 mx-4 mt-4 bg-[#25D366] hover:bg-[#20BA5A] text-white px-5 py-3 rounded-full font-bold justify-center"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              07 57 82 13 06
            </a>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
