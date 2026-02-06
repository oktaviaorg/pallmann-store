import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingCart, FileText, Sparkles } from 'lucide-react';
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
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md shadow-soft border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="flex flex-col leading-tight">
              <span className="text-xl font-extrabold text-[#0F172A] tracking-tight group-hover:text-[#2563EB] transition-colors">
                PALLMANN STORE
              </span>
              <span className="text-xs text-[#64748B] font-medium">
                Groupe Epenon
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={`transition-all font-semibold ${
                isActive('/') && location.pathname === '/' 
                  ? 'text-[#2563EB] border-b-2 border-[#7C3AED] pb-1' 
                  : 'text-[#64748B] hover:text-[#2563EB]'
              }`}
            >
              Boutique
            </Link>
            <Link
              to="/blog"
              className={`transition-all font-semibold ${
                isActive('/blog') 
                  ? 'text-[#2563EB] border-b-2 border-[#7C3AED] pb-1' 
                  : 'text-[#64748B] hover:text-[#2563EB]'
              }`}
            >
              Blog
            </Link>
            <Link
              to="/pro"
              className={`transition-all font-semibold flex items-center gap-1 ${
                isActive('/pro') 
                  ? 'text-[#2563EB] border-b-2 border-[#7C3AED] pb-1' 
                  : 'text-[#64748B] hover:text-[#2563EB]'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              Espace PRO
            </Link>
            <a
              href="mailto:contact@pallmann-store.com"
              className="transition-all font-semibold text-[#64748B] hover:text-[#2563EB]"
            >
              Contact
            </a>

            {/* Demande de devis */}
            <Link
              to="/demande-devis"
              className="relative flex items-center gap-2 bg-[#0F172A] hover:bg-[#1E293B] text-white px-4 py-2.5 rounded-xl font-bold transition-all shadow-sm hover:shadow-md"
            >
              <FileText className="w-5 h-5" />
              <span className="hidden lg:inline">Devis</span>
              {quoteItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#7C3AED] text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold animate-pulse">
                  {quoteItemCount}
                </span>
              )}
            </Link>

            {/* Panier - Dégradé tech */}
            <Link
              to="/panier"
              className="relative flex items-center gap-2 text-white px-5 py-2.5 rounded-xl font-bold transition-all shadow-lg hover:shadow-glow-gradient"
              style={{ background: 'linear-gradient(135deg, #2563EB 0%, #7C3AED 100%)' }}
            >
              <ShoppingCart className="w-5 h-5" />
              <span className="hidden lg:inline">Panier</span>
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#0F172A] text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
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
              <FileText className="w-6 h-6 text-[#0F172A]" />
              {quoteItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#7C3AED] text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                  {quoteItemCount}
                </span>
              )}
            </Link>
            <Link
              to="/panier"
              className="relative p-2"
            >
              <ShoppingCart className="w-6 h-6 text-[#2563EB]" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#7C3AED] text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                  {itemCount}
                </span>
              )}
            </Link>
            <button
              className="p-2 rounded-xl hover:bg-[#F8FAFC] transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-[#0F172A]" />
              ) : (
                <Menu className="w-6 h-6 text-[#0F172A]" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <nav className="md:hidden py-4 border-t border-gray-100 animate-fade-in">
            <Link
              to="/"
              className={`block px-4 py-3 rounded-xl text-base font-semibold transition-colors ${
                isActive('/') && location.pathname === '/' 
                  ? 'bg-[#EFF6FF] text-[#2563EB]' 
                  : 'text-[#64748B] hover:bg-[#F8FAFC]'
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Boutique
            </Link>
            <Link
              to="/blog"
              className={`block px-4 py-3 rounded-xl text-base font-semibold transition-colors ${
                isActive('/blog') 
                  ? 'bg-[#EFF6FF] text-[#2563EB]' 
                  : 'text-[#64748B] hover:bg-[#F8FAFC]'
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Blog
            </Link>
            <Link
              to="/pro"
              className={`block px-4 py-3 rounded-xl text-base font-semibold transition-colors flex items-center gap-2 ${
                isActive('/pro') 
                  ? 'bg-[#EFF6FF] text-[#2563EB]' 
                  : 'text-[#64748B] hover:bg-[#F8FAFC]'
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              <Sparkles className="w-4 h-4" />
              Espace PRO
            </Link>
            <Link
              to="/demande-devis"
              className={`block px-4 py-3 rounded-xl text-base font-semibold transition-colors ${
                isActive('/demande-devis') 
                  ? 'bg-[#EFF6FF] text-[#2563EB]' 
                  : 'text-[#64748B] hover:bg-[#F8FAFC]'
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Demande de devis
            </Link>
            <a
              href="mailto:contact@pallmann-store.com"
              className="block px-4 py-3 rounded-xl text-base font-semibold text-[#64748B] hover:bg-[#F8FAFC] transition-colors"
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
