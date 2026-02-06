import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingCart } from 'lucide-react';
import { useCart } from '../lib/CartContext';

const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { itemCount } = useCart();

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-40 bg-white shadow-md border-b-4 border-[#003366]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <div className="flex flex-col leading-tight">
              <span className="text-xl font-bold text-[#003366]" style={{ fontWeight: '800', letterSpacing: '0.02em' }}>
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
              className={`transition-colors font-semibold hover:text-[#ff9900] ${isActive('/') && location.pathname === '/' ? 'text-[#ff9900]' : 'text-gray-700'}`}
            >
              Boutique
            </Link>
            <Link
              to="/blog"
              className={`transition-colors font-semibold hover:text-[#ff9900] ${isActive('/blog') ? 'text-[#ff9900]' : 'text-gray-700'}`}
            >
              Blog
            </Link>
            <a
              href="mailto:contact@pallmann-store.com"
              className="transition-colors font-semibold hover:text-[#ff9900] text-gray-700"
            >
              Contact
            </a>

            {/* Panier */}
            <Link
              to="/panier"
              className="relative flex items-center gap-2 bg-[#ff9900] hover:bg-[#e68a00] text-white px-5 py-2.5 rounded-lg font-bold transition-all"
            >
              <ShoppingCart className="w-5 h-5" />
              <span className="hidden lg:inline">Panier</span>
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#003366] text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                  {itemCount}
                </span>
              )}
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-3 md:hidden">
            <Link
              to="/panier"
              className="relative p-2"
            >
              <ShoppingCart className="w-6 h-6 text-[#ff9900]" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#003366] text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
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
              className={`block px-4 py-3 rounded-lg text-base font-semibold transition-colors ${isActive('/') && location.pathname === '/' ? 'bg-[#ff9900]/10 text-[#ff9900]' : 'text-gray-700 hover:bg-gray-100'}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Boutique
            </Link>
            <Link
              to="/blog"
              className={`block px-4 py-3 rounded-lg text-base font-semibold transition-colors ${isActive('/blog') ? 'bg-[#ff9900]/10 text-[#ff9900]' : 'text-gray-700 hover:bg-gray-100'}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Blog
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
