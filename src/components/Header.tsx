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
    <header className="sticky top-0 z-40 bg-white shadow-soft border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <div className="flex flex-col leading-tight">
              <span className="text-xl font-bold text-[#1E3A5F]" style={{ fontWeight: '800', letterSpacing: '0.02em' }}>
                PALLMANN STORE
              </span>
              <span className="text-xs text-[#64748B]">
                Groupe Epenon
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={`transition-colors font-semibold hover:text-[#FBA600] ${
                isActive('/') && location.pathname === '/' 
                  ? 'text-[#1E3A5F] border-b-2 border-[#FBA600] pb-1' 
                  : 'text-[#2C5282]'
              }`}
            >
              Boutique
            </Link>
            <Link
              to="/blog"
              className={`transition-colors font-semibold hover:text-[#FBA600] ${
                isActive('/blog') 
                  ? 'text-[#1E3A5F] border-b-2 border-[#FBA600] pb-1' 
                  : 'text-[#2C5282]'
              }`}
            >
              Blog
            </Link>
            <Link
              to="/pro"
              className={`transition-colors font-semibold hover:text-[#FBA600] ${
                isActive('/pro') 
                  ? 'text-[#1E3A5F] border-b-2 border-[#FBA600] pb-1' 
                  : 'text-[#2C5282]'
              }`}
            >
              Espace PRO
            </Link>
            <a
              href="mailto:contact@pallmann-store.com"
              className="transition-colors font-semibold hover:text-[#FBA600] text-[#2C5282]"
            >
              Contact
            </a>

            {/* Demande de devis - Style bleu */}
            <Link
              to="/demande-devis"
              className="relative flex items-center gap-2 bg-[#1E3A5F] hover:bg-[#2C5282] text-white px-4 py-2.5 rounded-lg font-bold transition-all"
            >
              <FileText className="w-5 h-5" />
              <span className="hidden lg:inline">Devis</span>
              {quoteItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#FBA600] text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                  {quoteItemCount}
                </span>
              )}
            </Link>

            {/* Panier - Style orange accent */}
            <Link
              to="/panier"
              className="relative flex items-center gap-2 bg-[#FBA600] hover:bg-[#E09500] text-white px-5 py-2.5 rounded-lg font-bold transition-all shadow-sm hover:shadow-md"
            >
              <ShoppingCart className="w-5 h-5" />
              <span className="hidden lg:inline">Panier</span>
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#1E3A5F] text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
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
              <FileText className="w-6 h-6 text-[#1E3A5F]" />
              {quoteItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#FBA600] text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                  {quoteItemCount}
                </span>
              )}
            </Link>
            <Link
              to="/panier"
              className="relative p-2"
            >
              <ShoppingCart className="w-6 h-6 text-[#1E3A5F]" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#FBA600] text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                  {itemCount}
                </span>
              )}
            </Link>
            <button
              className="p-2 rounded-lg hover:bg-[#EBF4FF] transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-[#1E3A5F]" />
              ) : (
                <Menu className="w-6 h-6 text-[#1E3A5F]" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <nav className="md:hidden py-4 border-t border-gray-100">
            <Link
              to="/"
              className={`block px-4 py-3 rounded-lg text-base font-semibold transition-colors ${
                isActive('/') && location.pathname === '/' 
                  ? 'bg-[#EBF4FF] text-[#1E3A5F]' 
                  : 'text-[#2C5282] hover:bg-[#F7FAFC]'
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Boutique
            </Link>
            <Link
              to="/blog"
              className={`block px-4 py-3 rounded-lg text-base font-semibold transition-colors ${
                isActive('/blog') 
                  ? 'bg-[#EBF4FF] text-[#1E3A5F]' 
                  : 'text-[#2C5282] hover:bg-[#F7FAFC]'
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Blog
            </Link>
            <Link
              to="/pro"
              className={`block px-4 py-3 rounded-lg text-base font-semibold transition-colors ${
                isActive('/pro') 
                  ? 'bg-[#EBF4FF] text-[#1E3A5F]' 
                  : 'text-[#2C5282] hover:bg-[#F7FAFC]'
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Espace PRO
            </Link>
            <Link
              to="/demande-devis"
              className={`block px-4 py-3 rounded-lg text-base font-semibold transition-colors ${
                isActive('/demande-devis') 
                  ? 'bg-[#EBF4FF] text-[#1E3A5F]' 
                  : 'text-[#2C5282] hover:bg-[#F7FAFC]'
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Demande de devis
            </Link>
            <a
              href="mailto:contact@pallmann-store.com"
              className="block px-4 py-3 rounded-lg text-base font-semibold text-[#2C5282] hover:bg-[#F7FAFC] transition-colors"
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
