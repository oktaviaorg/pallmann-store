import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Menu, X, ShoppingCart, FileText, Sparkles, Package } from 'lucide-react';
import { useCart } from '../lib/CartContext';
import { useQuote } from '../lib/QuoteContext';
import LanguageSelector from './LanguageSelector';

const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { itemCount, totalHT } = useCart();
  const { itemCount: quoteItemCount } = useQuote();
  const { t } = useTranslation();

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  // Franco progress
  const francoThreshold = 630;
  const francoRemaining = Math.max(0, francoThreshold - totalHT);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-soft border-b border-gray-100">
      {/* Franco banner when close */}
      {itemCount > 0 && francoRemaining > 0 && francoRemaining < 200 && (
        <div 
          className="text-center py-1.5 text-sm font-medium text-white"
          style={{ background: 'linear-gradient(90deg, #E67E22 0%, #D35400 100%)' }}
        >
          <Package className="w-4 h-4 inline mr-1" />
          Plus que <strong>{francoRemaining.toFixed(0)}€</strong> pour la livraison offerte !
        </div>
      )}
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="flex flex-col leading-tight">
              <span className="text-xl font-extrabold text-[#1A2634] tracking-tight group-hover:text-[#E67E22] transition-colors">
                PALLMANN STORE
              </span>
              <span className="text-xs text-[#64748B] font-medium">
                Groupe Epenon
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-4">
            <Link
              to="/"
              className={`transition-all font-semibold ${
                isActive('/') && location.pathname === '/' 
                  ? 'text-[#E67E22] border-b-2 border-[#D35400] pb-1' 
                  : 'text-[#64748B] hover:text-[#E67E22]'
              }`}
            >
              {t('common.shop')}
            </Link>
            <Link
              to="/blog"
              className={`transition-all font-semibold ${
                isActive('/blog') 
                  ? 'text-[#E67E22] border-b-2 border-[#D35400] pb-1' 
                  : 'text-[#64748B] hover:text-[#E67E22]'
              }`}
            >
              {t('common.blog')}
            </Link>
            <Link
              to="/pro"
              className={`transition-all font-semibold flex items-center gap-1 ${
                isActive('/pro') 
                  ? 'text-[#E67E22] border-b-2 border-[#D35400] pb-1' 
                  : 'text-[#64748B] hover:text-[#E67E22]'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              {t('common.pro')}
            </Link>
            <a
              href="mailto:contact@pallmann-store.com"
              className="transition-all font-semibold text-[#64748B] hover:text-[#E67E22]"
            >
              {t('common.contact')}
            </a>

            {/* Language Selector */}
            <LanguageSelector />

            {/* Demande de devis */}
            <Link
              to="/demande-devis"
              className="relative flex items-center gap-2 bg-[#1A2634] hover:bg-[#1E293B] text-white px-4 py-2.5 rounded-xl font-bold transition-all shadow-sm hover:shadow-md"
            >
              <FileText className="w-5 h-5" />
              <span className="hidden lg:inline">{t('common.quote')}</span>
              {quoteItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#D35400] text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold animate-pulse">
                  {quoteItemCount}
                </span>
              )}
            </Link>

            {/* Panier - SUPER VISIBLE */}
            <Link
              to="/panier"
              className="relative flex items-center gap-2 text-white px-5 py-2.5 rounded-xl font-bold transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
              style={{ background: 'linear-gradient(135deg, #E67E22 0%, #D35400 100%)' }}
            >
              <ShoppingCart className="w-5 h-5" />
              <span className="hidden lg:inline">
                {itemCount > 0 ? `${totalHT.toFixed(0)}€` : t('common.cart')}
              </span>
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-amber-500 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center font-bold shadow-md">
                  {itemCount}
                </span>
              )}
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 md:hidden">
            <LanguageSelector />
            <Link
              to="/demande-devis"
              className="relative p-2"
            >
              <FileText className="w-6 h-6 text-[#1A2634]" />
              {quoteItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#D35400] text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                  {quoteItemCount}
                </span>
              )}
            </Link>
            <Link
              to="/panier"
              className="relative p-2.5 rounded-xl"
              style={{ background: 'linear-gradient(135deg, #E67E22 0%, #D35400 100%)' }}
            >
              <ShoppingCart className="w-5 h-5 text-white" />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-amber-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                  {itemCount}
                </span>
              )}
            </Link>
            <button
              className="p-2 rounded-xl hover:bg-[#FFFFFF] transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-[#1A2634]" />
              ) : (
                <Menu className="w-6 h-6 text-[#1A2634]" />
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
                  ? 'bg-[#F8FAFC] text-[#E67E22]' 
                  : 'text-[#64748B] hover:bg-[#FFFFFF]'
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              🛒 {t('common.shop')}
            </Link>
            <Link
              to="/blog"
              className={`block px-4 py-3 rounded-xl text-base font-semibold transition-colors ${
                isActive('/blog') 
                  ? 'bg-[#F8FAFC] text-[#E67E22]' 
                  : 'text-[#64748B] hover:bg-[#FFFFFF]'
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              📝 {t('common.blog')}
            </Link>
            <Link
              to="/pro"
              className={`block px-4 py-3 rounded-xl text-base font-semibold transition-colors ${
                isActive('/pro') 
                  ? 'bg-[#F8FAFC] text-[#E67E22]' 
                  : 'text-[#64748B] hover:bg-[#FFFFFF]'
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              ⭐ {t('common.pro')}
            </Link>
            <Link
              to="/demande-devis"
              className={`block px-4 py-3 rounded-xl text-base font-semibold transition-colors ${
                isActive('/demande-devis') 
                  ? 'bg-[#F8FAFC] text-[#E67E22]' 
                  : 'text-[#64748B] hover:bg-[#FFFFFF]'
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              📋 {t('common.quote')}
            </Link>
            <a
              href="mailto:contact@pallmann-store.com"
              className="block px-4 py-3 rounded-xl text-base font-semibold text-[#64748B] hover:bg-[#FFFFFF] transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              ✉️ {t('common.contact')}
            </a>
            
            {/* Mobile cart summary */}
            {itemCount > 0 && (
              <div className="mt-4 mx-4 p-4 rounded-xl bg-gradient-to-r from-[#F8FAFC] to-[#F0F4F8] border border-blue-100">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-[#1A2634]">{t('common.cart')}</span>
                  <span className="font-bold text-[#E67E22]">{totalHT.toFixed(2)}€ HT</span>
                </div>
                <Link
                  to="/panier"
                  className="block w-full text-center py-2.5 rounded-lg font-bold text-white"
                  style={{ background: 'linear-gradient(135deg, #E67E22 0%, #D35400 100%)' }}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {t('common.checkout')} ({itemCount} article{itemCount > 1 ? 's' : ''})
                </Link>
              </div>
            )}
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
