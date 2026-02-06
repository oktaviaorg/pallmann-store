import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingCart, FileText } from 'lucide-react';
import { useCart } from '../lib/CartContext';
import { useQuote } from '../lib/QuoteContext';

const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { itemCount } = useCart();
  const { itemCount: quoteItemCount } = useQuote();

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-40 bg-white shadow-md border-b-4 border-[#FF6600]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <div className="flex flex-col leading-tight">
              <span className="text-xl font-bold text-[#FF6600]" style={{ fontWeight: '800', letterSpacing: '0.02em' }}>
                Pallmann Store
              </span>
              <span className="text-xs text-gray-500">
                Groupe Renoline
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={`transition-colors font-semibold hover:text-[#FF6600] ${isActive('/') && location.pathname === '/' ? 'text-[#FF6600]' : 'text-gray-700'}`}
            >
              Boutique
            </Link>
            <Link
              to="/blog"
              className={`transition-colors font-semibold hover:text-[#FF6600] ${isActive('/blog') ? 'text-[#FF6600]' : 'text-gray-700'}`}
            >
              Blog
            </Link>
            <Link
              to="/pro"
              className={`transition-colors font-semibold hover:text-[#FF6600] ${isActive('/pro') ? 'text-[#FF6600]' : 'text-gray-700'}`}
            >
              Espace PRO
            </Link>
            <a
              href="mailto:contact@pallmann-store.com"
              className="transition-colors font-semibold hover:text-[#FF6600] text-gray-700"
            >
              Contact
            </a>

            {/* Demande de devis */}
            <Link
              to="/demande-devis"
              className="relative flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-white px-4 py-2.5 rounded-lg font-bold transition-all"
            >
              <FileText className="w-5 h-5" />
              <span className="hidden lg:inline">Devis</span>
              {quoteItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#FF6600] text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                  {quoteItemCount}
                </span>
              )}
            </Link>

            {/* Panier */}
            <Link
              to="/panier"
              className="relative flex items-center gap-2 bg-[#FF6600] hover:bg-[#e65c00] text-white px-5 py-2.5 rounded-lg font-bold transition-all"
            >
              <ShoppingCart className="w-5 h-5" />
              <span className="hidden lg:inline">Panier</span>
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-gray-900 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                  {itemCount}
                </span>
              )}
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 md:hidden">
            <Link
              to="/demande-devis"
              className="relative p-2"
            >
              <FileText className="w-6 h-6 text-gray-700" />
              {quoteItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#FF6600] text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                  {quoteItemCount}
                </span>
              )}
            </Link>
            <Link
              to="/panier"
              className="relative p-2"
            >
              <ShoppingCart className="w-6 h-6 text-[#FF6600]" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-gray-900 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                  {itemCount}
                </span>
              )}
            </Link>
            <button
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-gray-700" />
              ) : (
                <Menu className="w-6 h-6 text-gray-700" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <nav className="md:hidden py-4 border-t border-gray-200">
            <Link
              to="/"
              className={`block px-4 py-3 rounded-lg text-base font-semibold transition-colors ${isActive('/') && location.pathname === '/' ? 'bg-[#FF6600]/10 text-[#FF6600]' : 'text-gray-700 hover:bg-gray-100'}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Boutique
            </Link>
            <Link
              to="/blog"
              className={`block px-4 py-3 rounded-lg text-base font-semibold transition-colors ${isActive('/blog') ? 'bg-[#FF6600]/10 text-[#FF6600]' : 'text-gray-700 hover:bg-gray-100'}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Blog
            </Link>
            <Link
              to="/pro"
              className={`block px-4 py-3 rounded-lg text-base font-semibold transition-colors ${isActive('/pro') ? 'bg-[#FF6600]/10 text-[#FF6600]' : 'text-gray-700 hover:bg-gray-100'}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Espace PRO
            </Link>
            <Link
              to="/demande-devis"
              className={`block px-4 py-3 rounded-lg text-base font-semibold transition-colors ${isActive('/demande-devis') ? 'bg-[#FF6600]/10 text-[#FF6600]' : 'text-gray-700 hover:bg-gray-100'}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Demande de devis
            </Link>
            <a
              href="mailto:contact@pallmann-store.com"
              className="block px-4 py-3 rounded-lg text-base font-semibold text-gray-700 hover:bg-gray-100 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </a>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
