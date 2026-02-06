import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { CartProvider } from './lib/CartContext';
import GTMPageView from './components/GTMPageView';
import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import CartPage from './pages/CartPage';
import CheckoutSuccessPage from './pages/CheckoutSuccessPage';
import ParquetPosePage from './pages/ParquetPosePage';
import AnalyseParquetPage from './pages/AnalyseParquetPage';
import GalleryPage from './pages/GalleryPage';
import BlogPage from './pages/BlogPage';
import ArticlePage from './pages/ArticlePage';
import LocationPonceusePage from './pages/LocationPonceusePage';
import MachineDetailPage from './pages/MachineDetailPage';
import BoutiquePage from './pages/BoutiquePage';
import ProductContactPage from './pages/ProductContactPage';
import ReviewsPage from './pages/ReviewsPage';
import MentionsLegales from './pages/MentionsLegales';
import CGV from './pages/CGV';
import CGVBoutique from './pages/CGVBoutique';
import PolitiqueConfidentialite from './pages/PolitiqueConfidentialite';
import LandingColmarMulhouse from './pages/LandingColmarMulhouse';
import LandingBasRhin from './pages/LandingBasRhin';
import LandingStrasbourg from './pages/LandingStrasbourg';
import LandingBelfort from './pages/LandingBelfort';
import LandingSarrebourg from './pages/LandingSarrebourg';
import LandingMulhouse from './pages/LandingMulhouse';
import LandingColmar from './pages/LandingColmar';
import LandingDijon from './pages/LandingDijon';
import LandingBeaune from './pages/LandingBeaune';
import LandingLyon from './pages/LandingLyon';
import LandingNational from './pages/LandingNational';
import AboutPage from './pages/AboutPage';
import ThankYouPage from './pages/ThankYouPage';
import FormationPage from './pages/FormationPage';
import YouTubePage from './pages/YouTubePage';
import ParquetRayeMeublePage from './pages/ParquetRayeMeublePage';
import DegatUrineParquetPage from './pages/DegatUrineParquetPage';
import FAQPage from './pages/FAQPage';
import InjectionAntiGrincementPage from './pages/InjectionAntiGrincementPage';
import FormulaireExternePage from './pages/FormulaireExternePage';
import FranchisePage from './pages/FranchisePage';
import NotFoundPage from './pages/NotFoundPage';

export default function App() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <CartProvider>
      <GTMPageView />
      <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/services" element={<ServicesPage />} />
      <Route path="/services/" element={<ServicesPage />} />
      <Route path="/services/pose-parquet" element={<ParquetPosePage />} />
      <Route path="/services/pose-parquet/" element={<ParquetPosePage />} />
      <Route path="/analyse-parquet-gratuite" element={<AnalyseParquetPage />} />
      <Route path="/analyse-parquet-gratuite/" element={<AnalyseParquetPage />} />
      <Route path="/gallery" element={<GalleryPage />} />
      <Route path="/gallery/" element={<GalleryPage />} />
      <Route path="/blog" element={<BlogPage />} />
      <Route path="/blog/" element={<BlogPage />} />
      <Route path="/blog/:slug" element={<ArticlePage />} />
      <Route path="/location-ponceuse" element={<LocationPonceusePage />} />
      <Route path="/location-ponceuse/" element={<LocationPonceusePage />} />
      <Route path="/location-ponceuse/:machineId" element={<MachineDetailPage />} />
      <Route path="/boutique" element={<BoutiquePage />} />
      <Route path="/boutique/" element={<BoutiquePage />} />
      <Route path="/boutique/contact" element={<ProductContactPage />} />
      <Route path="/boutique/contact/" element={<ProductContactPage />} />
      <Route path="/panier" element={<CartPage />} />
      <Route path="/panier/" element={<CartPage />} />
      <Route path="/checkout/success" element={<CheckoutSuccessPage />} />
      <Route path="/checkout/success/" element={<CheckoutSuccessPage />} />
      <Route path="/reviews" element={<ReviewsPage />} />
      <Route path="/reviews/" element={<ReviewsPage />} />
      <Route path="/mentions-legales" element={<MentionsLegales />} />
      <Route path="/cgv" element={<CGV />} />
      <Route path="/cgv-boutique" element={<CGVBoutique />} />
      <Route path="/politique-confidentialite" element={<PolitiqueConfidentialite />} />
      <Route path="/landing/colmar-mulhouse" element={<LandingColmarMulhouse />} />
      <Route path="/landing/colmar-mulhouse/" element={<LandingColmarMulhouse />} />
      <Route path="/landing/bas-rhin" element={<LandingBasRhin />} />
      <Route path="/landing/bas-rhin/" element={<LandingBasRhin />} />
      <Route path="/renovation-parquet-strasbourg" element={<LandingStrasbourg />} />
      <Route path="/renovation-parquet-strasbourg/" element={<LandingStrasbourg />} />
      <Route path="/renovation-parquet-belfort" element={<LandingBelfort />} />
      <Route path="/renovation-parquet-belfort/" element={<LandingBelfort />} />
      <Route path="/renovation-parquet-sarrebourg" element={<LandingSarrebourg />} />
      <Route path="/renovation-parquet-sarrebourg/" element={<LandingSarrebourg />} />
      <Route path="/renovation-parquet-mulhouse" element={<LandingMulhouse />} />
      <Route path="/renovation-parquet-mulhouse/" element={<LandingMulhouse />} />
      <Route path="/renovation-parquet-colmar" element={<LandingColmar />} />
      <Route path="/renovation-parquet-colmar/" element={<LandingColmar />} />
      <Route path="/renovation-parquet-dijon" element={<LandingDijon />} />
      <Route path="/renovation-parquet-dijon/" element={<LandingDijon />} />
      <Route path="/renovation-parquet-beaune" element={<LandingBeaune />} />
      <Route path="/renovation-parquet-beaune/" element={<LandingBeaune />} />
      <Route path="/renovation-parquet-lyon" element={<LandingLyon />} />
      <Route path="/renovation-parquet-lyon/" element={<LandingLyon />} />
      <Route path="/expert-renovation-parquet" element={<LandingNational />} />
      <Route path="/expert-renovation-parquet/" element={<LandingNational />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/about/" element={<AboutPage />} />
      <Route path="/formation" element={<FormationPage />} />
      <Route path="/formation/" element={<FormationPage />} />
      <Route path="/youtube" element={<YouTubePage />} />
      <Route path="/youtube/" element={<YouTubePage />} />
      <Route path="/parquet-raye-meuble" element={<ParquetRayeMeublePage />} />
      <Route path="/parquet-raye-meuble/" element={<ParquetRayeMeublePage />} />
      <Route path="/degat-urine-parquet" element={<DegatUrineParquetPage />} />
      <Route path="/degat-urine-parquet/" element={<DegatUrineParquetPage />} />
      <Route path="/thank-you" element={<ThankYouPage />} />
      <Route path="/thank-you/" element={<ThankYouPage />} />
      <Route path="/faq" element={<FAQPage />} />
      <Route path="/faq/" element={<FAQPage />} />
      <Route path="/injection-anti-grincement-parquet" element={<InjectionAntiGrincementPage />} />
      <Route path="/injection-anti-grincement-parquet/" element={<InjectionAntiGrincementPage />} />
      <Route path="/formulaire-devis" element={<FormulaireExternePage />} />
      <Route path="/formulaire-devis/" element={<FormulaireExternePage />} />
      <Route path="/franchise" element={<FranchisePage />} />
      <Route path="/franchise/" element={<FranchisePage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
    </CartProvider>
  );
}
