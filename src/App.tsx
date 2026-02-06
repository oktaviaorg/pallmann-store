import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { CartProvider } from './lib/CartContext';
import { QuoteProvider } from './lib/QuoteContext';

// Pages principales
import HomePage from './pages/HomePage';
import CartPage from './pages/CartPage';
import CheckoutSuccessPage from './pages/CheckoutSuccessPage';

// Blog
import BlogPage from './pages/BlogPage';
import ArticlePage from './pages/ArticlePage';

// Pages légales
import MentionsLegales from './pages/MentionsLegales';
import CGV from './pages/CGV';
import PolitiqueConfidentialite from './pages/PolitiqueConfidentialite';

// Page PRO
import ProPage from './pages/ProPage';

// Page Demande de devis
import QuotePage from './pages/QuotePage';

// Calculateur
import CalculateurPage from './pages/CalculateurPage';

// 404
import NotFoundPage from './pages/NotFoundPage';

export default function App() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <CartProvider>
      <QuoteProvider>
        <Routes>
          {/* Boutique (Homepage) */}
          <Route path="/" element={<HomePage />} />
          
          {/* Panier & Checkout */}
          <Route path="/panier" element={<CartPage />} />
          <Route path="/checkout/success" element={<CheckoutSuccessPage />} />
          
          {/* Demande de devis */}
          <Route path="/demande-devis" element={<QuotePage />} />
          
          {/* Calculateur */}
          <Route path="/calculateur" element={<CalculateurPage />} />
          
          {/* Blog */}
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<ArticlePage />} />
          
          {/* Page PRO */}
          <Route path="/pro" element={<ProPage />} />
          
          {/* Pages légales */}
          <Route path="/mentions-legales" element={<MentionsLegales />} />
          <Route path="/cgv" element={<CGV />} />
          <Route path="/politique-confidentialite" element={<PolitiqueConfidentialite />} />
          
          {/* 404 */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </QuoteProvider>
    </CartProvider>
  );
}
