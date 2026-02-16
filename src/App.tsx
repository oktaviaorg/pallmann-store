import React, { useEffect } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { ThemeProvider } from './lib/ThemeProvider';
import { AuthProvider } from './lib/AuthProvider';
import { CartProvider } from './lib/CartContext';
import { QuoteProvider } from './lib/QuoteContext';
import { CompareProvider } from './lib/CompareContext';
import CompareBar from './components/CompareBar';
import MobileCartButton from './components/MobileCartButton';
import TechnicianPopup from './components/TechnicianPopup';

// Pages principales
import HomePage from './pages/HomePage';
import BoutiquePage from './pages/BoutiquePage';
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

// Contact
import ContactPage from './pages/ContactPage';

// Parrainage
import ParrainagePage from './pages/ParrainagePage';

// Partenaires / Annuaire
import PartenairesPage from './pages/PartenairesPage';

// Comparateur
import ComparePage from './pages/ComparePage';

// Entretien
import EntretienVitrifiePage from './pages/EntretienVitrifiePage';
import EntretienHuilePage from './pages/EntretienHuilePage';

// Livraison
import LivraisonPage from './pages/LivraisonPage';

// Page produit individuel
import ProductPage from './pages/ProductPage';

// Admin
import AdminQuotePage from './pages/AdminQuotePage';
import AdminPricesPage from './pages/AdminPricesPage';

// 404
import NotFoundPage from './pages/NotFoundPage';

export default function App() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <ThemeProvider>
      <AuthProvider>
        <CartProvider>
          <QuoteProvider>
            <CompareProvider>
            <Routes>
          {/* Boutique (Homepage) */}
          <Route path="/" element={<HomePage />} />
          <Route path="/boutique" element={<BoutiquePage />} />
          
          {/* Panier & Checkout */}
          <Route path="/panier" element={<CartPage />} />
          <Route path="/checkout/success" element={<CheckoutSuccessPage />} />
          <Route path="/commande-confirmee" element={<CheckoutSuccessPage />} />
          
          {/* Demande de devis */}
          <Route path="/demande-devis" element={<QuotePage />} />
          
          {/* Calculateur */}
          <Route path="/calculateur-pro" element={<CalculateurPage />} />
          
          {/* Blog */}
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<ArticlePage />} />
          
          {/* Page PRO */}
          <Route path="/pro" element={<ProPage />} />
          
          {/* Contact */}
          <Route path="/contact" element={<ContactPage />} />
          
          {/* Parrainage */}
          <Route path="/parrainage" element={<ParrainagePage />} />
          
          {/* Partenaires / Annuaire */}
          <Route path="/partenaires" element={<PartenairesPage />} />
          
          {/* Comparateur */}
          <Route path="/comparer" element={<ComparePage />} />
          
          {/* Entretien (pages clients avec codes promo) */}
          <Route path="/entretien-parquet-vitrifie" element={<EntretienVitrifiePage />} />
          <Route path="/entretien-parquet-huile" element={<EntretienHuilePage />} />
          
          {/* Pages légales */}
          <Route path="/mentions-legales" element={<MentionsLegales />} />
          <Route path="/cgv" element={<CGV />} />
          <Route path="/politique-confidentialite" element={<PolitiqueConfidentialite />} />
          <Route path="/livraison" element={<LivraisonPage />} />
          
          {/* Page produit */}
          <Route path="/produit/:slug" element={<ProductPage />} />
          
          {/* Admin */}
          <Route path="/admin/devis" element={<AdminQuotePage />} />
          <Route path="/admin/tarifs" element={<AdminPricesPage />} />
          
          {/* Redirections */}
          <Route path="/compte" element={<Navigate to="/boutique" replace />} />
          <Route path="/produits/:slug" element={<Navigate to="/produit/:slug" replace />} />
          
          {/* 404 */}
          <Route path="*" element={<NotFoundPage />} />
            </Routes>
            <MobileCartButton />
            <TechnicianPopup />
            <CompareBar />
            </CompareProvider>
          </QuoteProvider>
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
// Force rebuild 1770821188
