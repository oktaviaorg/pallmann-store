import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import ProBanner from '../components/ProBanner';
import MarqueeBanner from '../components/MarqueeBanner';
import PromoCodeBanner from '../components/PromoCodeBanner';
import Footer from '../components/Footer';
import TrustBar from '../components/TrustBar';
import CartReminder from '../components/CartReminder';
import ProductCard from '../components/ProductCard';
import ColorVariantCard from '../components/ColorVariantCard';
import { supabase } from '../lib/supabase';
import { useCart } from '../lib/CartContext';
import { useQuote } from '../lib/QuoteContext';
import { ShoppingCart, Filter, Search, Home, ChevronRight, Phone, Tag, CheckCircle, XCircle, Package, AlertTriangle, Plus, ArrowUpDown, SortAsc, SortDesc } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  features: string[];
  image_url: string;
  shop_url?: string;
  pdf_url?: string;
  display_order?: number;
  price_achat?: number;
  price_public_ht?: number;
  price_pack_ht?: number;
  pack_size?: number;
  ref?: string;
  unit?: string;
  published?: boolean;
  category_id?: string;
  subcategory_id?: string;
  requires_hardener?: boolean;
  hardener_id?: string;
}

interface Category {
  id: string;
  name: string;
  slug: string;
  display_order?: number;
}

interface CompanyCode {
  id: string;
  code: string;
  company_name: string;
  discount_percent: number;
  is_active: boolean;
}

// Options de tri
type SortOption = 'name-asc' | 'name-desc' | 'price-asc' | 'price-desc' | 'popular';

const BoutiquePage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('popular');
  const { addItem, items, companyCode, setCompanyCode, totalHT } = useCart();
  const { addItem: addToQuote, removeItem: removeFromQuote, isInQuote } = useQuote();
  
  // Code promo pro
  const [promoCode, setPromoCode] = useState('');
  const [validatedCode, setValidatedCode] = useState<CompanyCode | null>(companyCode);
  const [codeError, setCodeError] = useState('');
  const [checkingCode, setCheckingCode] = useState(false);
  const [addedToCart, setAddedToCart] = useState<string | null>(null);
  const [addedToQuote, setAddedToQuote] = useState<string | null>(null);
  
  // Alerte durcisseur
  const [hardenerAlert, setHardenerAlert] = useState<{show: boolean; product: Product | null; hardener: Product | null}>({
    show: false,
    product: null,
    hardener: null
  });

  const validatePromoCode = async () => {
    if (!promoCode.trim()) return;
    setCheckingCode(true);
    setCodeError('');
    
    try {
      const { data, error } = await supabase
        .from('company_codes')
        .select('*')
        .eq('code', promoCode.toUpperCase())
        .eq('is_active', true)
        .single();
      
      if (error || !data) {
        setCodeError('Code invalide ou expiré');
        setValidatedCode(null);
        setCompanyCode(null);
      } else {
        setValidatedCode(data);
        setCompanyCode(data);
        setCodeError('');
      }
    } catch (err) {
      setCodeError('Erreur de vérification');
    } finally {
      setCheckingCode(false);
    }
  };

  const getDiscountedPrice = (price: number): number => {
    if (!validatedCode) return price;
    return price * (1 - validatedCode.discount_percent / 100);
  };

  const handleAddToCart = (product: Product) => {
    if (!product.price_pack_ht && !product.price_public_ht) return;
    
    addItem({
      id: product.id,
      name: product.name,
      price_ht: getDiscountedPrice(product.price_pack_ht || product.price_public_ht || 0),
      image_url: product.image_url,
      unit: product.unit || 'L',
    });
    
    setAddedToCart(product.id);
    setTimeout(() => setAddedToCart(null), 2000);
  };

  const handleAddToQuote = (product: Product) => {
    addToQuote({
      id: product.id,
      name: product.name,
      price_ht: product.price_pack_ht || product.price_public_ht || 0,
      image_url: product.image_url,
      unit: product.unit || 'unité',
    });
    
    setAddedToQuote(product.id);
    setTimeout(() => setAddedToQuote(null), 2000);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Charger les catégories
      const { data: catData } = await supabase
        .from('pallmann_categories')
        .select('*')
        .order('display_order');
      
      setCategories(catData || []);

      // Charger les produits PUBLIÉS uniquement
      const { data, error } = await supabase
        .from('pallmann_products')
        .select('*')
        .eq('published', true)
        .order('name');

      if (error) throw error;
      setProducts(data || []);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  // Ajouter le durcisseur
  const addHardener = () => {
    if (hardenerAlert.hardener) {
      addItem({
        id: hardenerAlert.hardener.id,
        name: hardenerAlert.hardener.name,
        price_ht: hardenerAlert.hardener.price_pack_ht || hardenerAlert.hardener.price_public_ht || 0,
        image_url: hardenerAlert.hardener.image_url,
        unit: hardenerAlert.hardener.unit || 'unité'
      });
    }
    setHardenerAlert({ show: false, product: null, hardener: null });
  };

  // Filtrer les produits
  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'all' || 
      product.category_id === selectedCategory;

    // Fonction pour enlever les accents
    const normalize = (str: string) => str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
    
    const searchNormalized = normalize(searchTerm);
    const matchesSearch = searchTerm === '' ||
      normalize(product.name).includes(searchNormalized) ||
      normalize(product.description || '').includes(searchNormalized) ||
      (product.ref || '').toLowerCase().includes(searchTerm.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  // Séparer les produits PALL-X 333C (teintes)
  const colorVariants = filteredProducts
    .filter(p => p.name.includes('333C N°'))
    .map(p => {
      const match = p.name.match(/N°(\d+)\s+(.+?)\s+0,2L/);
      return {
        id: p.id,
        name: p.name,
        slug: p.slug,
        price_ht: p.price_pack_ht || p.price_public_ht || 0,
        image_url: p.image_url,
        ref: p.ref || '',
        colorName: match ? match[2] : p.name,
        colorCode: match ? `N°${match[1]}` : '',
      };
    })
    .sort((a, b) => {
      const numA = parseInt(a.colorCode.replace('N°', '')) || 0;
      const numB = parseInt(b.colorCode.replace('N°', '')) || 0;
      return numA - numB;
    });

  // Exclure les 333C de la liste principale
  const regularProducts = filteredProducts.filter(p => !p.name.includes('333C N°'));

  // Trier les produits (sans les 333C)
  const sortedProducts = [...regularProducts].sort((a, b) => {
    const priceA = a.price_pack_ht || a.price_public_ht || 0;
    const priceB = b.price_pack_ht || b.price_public_ht || 0;
    
    switch (sortBy) {
      case 'name-asc':
        return a.name.localeCompare(b.name);
      case 'name-desc':
        return b.name.localeCompare(a.name);
      case 'price-asc':
        return priceA - priceB;
      case 'price-desc':
        return priceB - priceA;
      case 'popular':
      default:
        // Priorité aux bestsellers
        const aPopular = ['pall-x 98', 'magic oil', 'pall-x 96', 'extreme'].some(kw => a.name.toLowerCase().includes(kw)) ? 0 : 1;
        const bPopular = ['pall-x 98', 'magic oil', 'pall-x 96', 'extreme'].some(kw => b.name.toLowerCase().includes(kw)) ? 0 : 1;
        return aPopular - bPopular || a.name.localeCompare(b.name);
    }
  });

  // Compter les produits par catégorie
  const categoryCounts = categories.map(cat => ({
    ...cat,
    count: products.filter(p => p.category_id === cat.id).length
  })).filter(cat => cat.count > 0);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-[#FFFFFF]">
        <Header />
        <ProBanner />
        <MarqueeBanner />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF9900] mx-auto"></div>
            <p className="mt-4 text-[#6B6B6B]">Chargement de la boutique...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Boutique Produits Pallmann - Vitrificateurs, Huiles, Machines | Pallmann Store</title>
        <meta name="description" content="Achetez vos produits Pallmann en ligne : vitrificateurs, huiles, colles, machines et accessoires pour parquet. Livraison rapide France entière." />
        <meta name="keywords" content="acheter Pallmann, boutique parquet, vitrificateur achat, huile parquet, Pallmann prix" />
        <meta property="og:title" content="Boutique Produits Pallmann - Vitrificateurs, Huiles, Machines" />
        <meta property="og:description" content="Achetez vos produits Pallmann professionnels en ligne" />
        <link rel="canonical" href="https://pallmann-store.com/boutique" />
      </Helmet>

      {/* Modal alerte durcisseur */}
      {hardenerAlert.show && hardenerAlert.hardener && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-amber-100 p-2 rounded-full">
                <AlertTriangle className="w-6 h-6 text-amber-600" />
              </div>
              <h3 className="text-lg font-bold text-[#1A1A1A]">Durcisseur recommandé</h3>
            </div>
            
            <p className="text-[#6B6B6B] mb-4">
              <strong>{hardenerAlert.product?.name}</strong> est un produit bi-composant qui nécessite un durcisseur pour une application correcte.
            </p>
            
            <div className="bg-[#F8FAFC] rounded-xl p-4 mb-4 flex items-center gap-4">
              {hardenerAlert.hardener.image_url && (
                <img src={hardenerAlert.hardener.image_url} alt={hardenerAlert.hardener.name} className="w-16 h-16 object-contain" />
              )}
              <div>
                <p className="font-semibold text-[#1A1A1A]">{hardenerAlert.hardener.name}</p>
                <p className="text-[#FF9900] font-bold">
                  {(hardenerAlert.hardener.price_pack_ht || hardenerAlert.hardener.price_public_ht)?.toFixed(2)}€ HT
                </p>
              </div>
            </div>
            
            <div className="flex gap-3">
              <button
                onClick={() => setHardenerAlert({ show: false, product: null, hardener: null })}
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg font-semibold text-[#6B6B6B] hover:bg-gray-50 transition-colors"
              >
                Non merci
              </button>
              <button
                onClick={addHardener}
                className="flex-1 px-4 py-3 text-white rounded-lg font-bold transition-colors flex items-center justify-center gap-2"
                style={{ background: 'linear-gradient(135deg, #FF9900 0%, #F0C300 100%)' }}
              >
                <Plus className="w-4 h-4" />
                Ajouter
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="min-h-screen flex flex-col bg-[#FFFFFF]">
        <Header />
        <PromoCodeBanner />
        <ProBanner />
        <MarqueeBanner />
        <TrustBar />
        <CartReminder />

        <main className="flex-grow">
          {/* Hero Section - Style PRO harmonisé */}
          <div className="relative overflow-hidden">
            <div 
              className="absolute inset-0"
              style={{ 
                background: 'linear-gradient(135deg, #1A1A1A 0%, #2D2D2D 50%, #1A1A1A 100%)'
              }}
            ></div>
            
            <div 
              className="absolute inset-0 opacity-10"
              style={{
                background: 'radial-gradient(circle at 20% 80%, #FF9900 0%, transparent 50%)',
              }}
            ></div>
            
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
              <div className="text-center">
                <nav className="flex items-center justify-center space-x-2 text-sm mb-6">
                  <Link to="/" className="text-white/70 hover:text-white transition-colors flex items-center gap-1">
                    <Home className="w-4 h-4" />
                    <span>Accueil</span>
                  </Link>
                  <ChevronRight className="w-4 h-4 text-white/50" />
                  <span className="text-white font-semibold">Boutique</span>
                </nav>

                <div className="inline-flex items-center gap-2 bg-amber-500/20 backdrop-blur-sm text-amber-300 px-4 py-2 rounded-full text-sm font-bold mb-6 border border-amber-500/30">
                  <Package className="w-4 h-4" />
                  {products.length} produits • Livraison France entière
                </div>
                
                <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
                  Tous nos <span style={{
                    background: 'linear-gradient(135deg, #F0C300 0%, #FF9900 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}>produits</span>
                </h1>
                
                <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-8">
                  Vitrificateurs, huiles, colles, machines et accessoires professionnels Pallmann.
                </p>

                {/* Produits Vedettes */}
                <div className="mt-8 grid md:grid-cols-2 gap-4 max-w-4xl mx-auto">
                  {/* ECO OIL 1K */}
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 border border-white/20 hover:bg-white/15 transition-colors">
                    <div className="flex items-center gap-4">
                      <img 
                        src="https://fr.pallmann.net/fileadmin/_processed_/f/1/csm_PALLMANN_dummy_SPECIAL_APPLICATION_ROLLER_2020-06_9420607ec1.png" 
                        alt="ECO OIL 1K" 
                        className="w-24 h-24 object-contain bg-white rounded-xl p-2"
                      />
                      <div className="text-left flex-1">
                        <div className="inline-flex items-center gap-1 bg-green-500/20 text-green-300 px-2 py-0.5 rounded-full text-xs font-bold mb-1 border border-green-500/30">
                          ⭐ Vedette
                        </div>
                        <h3 className="text-lg font-bold text-white mb-1">ECO OIL 1K</h3>
                        <p className="text-white/70 text-xs mb-2">Huile sans solvant, au rouleau</p>
                        <Link 
                          to="/produit/eco-oil-1k" 
                          className="inline-flex items-center gap-1 bg-gradient-to-r from-[#FF9900] to-[#F0C300] text-white px-3 py-1.5 rounded-lg font-bold text-xs hover:opacity-90 transition-opacity"
                        >
                          Voir →
                        </Link>
                      </div>
                    </div>
                  </div>

                  {/* HARDWAXOIL */}
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 border border-white/20 hover:bg-white/15 transition-colors">
                    <div className="flex items-center gap-4">
                      <img 
                        src="https://fr.pallmann.net/fileadmin/MAM/37206/PALLMANN_dummy_Hardwaxoil_3l_msl_2021-12.png" 
                        alt="HARDWAXOIL" 
                        className="w-24 h-24 object-contain bg-white rounded-xl p-2"
                      />
                      <div className="text-left flex-1">
                        <div className="inline-flex items-center gap-1 bg-green-500/20 text-green-300 px-2 py-0.5 rounded-full text-xs font-bold mb-1 border border-green-500/30">
                          ⭐ Vedette
                        </div>
                        <h3 className="text-lg font-bold text-white mb-1">HARDWAXOIL</h3>
                        <p className="text-white/70 text-xs mb-2">Huile solvantée, au rouleau</p>
                        <Link 
                          to="/produit/hardwaxoil" 
                          className="inline-flex items-center gap-1 bg-gradient-to-r from-[#FF9900] to-[#F0C300] text-white px-3 py-1.5 rounded-lg font-bold text-xs hover:opacity-90 transition-opacity"
                        >
                          Voir →
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="absolute bottom-0 left-0 right-0">
              <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
                <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="#FFFFFF"/>
              </svg>
            </div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Filters Section - Style harmonisé */}
            <div className="bg-white rounded-2xl shadow-card p-4 md:p-6 mb-8 border border-gray-100">
              {/* Search */}
              <div className="relative mb-6">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#6B6B6B]" />
                <input
                  type="text"
                  placeholder="Nom ou référence (ex: 041111, PALL-X 96, Magic Oil...)"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#FF9900] focus:border-transparent transition-all text-[#1A1A1A]"
                />
              </div>

              {/* Category Pills */}
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-3">
                  <Filter className="w-4 h-4 text-[#6B6B6B]" />
                  <span className="text-sm font-semibold text-[#6B6B6B]">Catégories</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setSelectedCategory('all')}
                    className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                      selectedCategory === 'all'
                        ? 'text-white shadow-md'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                    style={selectedCategory === 'all' ? { background: 'linear-gradient(135deg, #FF9900 0%, #F0C300 100%)' } : {}}
                  >
                    Tout voir ({products.length})
                  </button>
                  {categoryCounts.map(cat => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                        selectedCategory === cat.id
                          ? 'text-white shadow-md'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                      style={selectedCategory === cat.id ? { background: 'linear-gradient(135deg, #FF9900 0%, #F0C300 100%)' } : {}}
                    >
                      {cat.name} ({cat.count})
                    </button>
                  ))}
                </div>
              </div>

              {/* Tri des produits */}
              <div className="mb-4 pt-4 border-t border-gray-100">
                <div className="flex items-center gap-2 mb-3">
                  <ArrowUpDown className="w-4 h-4 text-[#6B6B6B]" />
                  <span className="text-sm font-semibold text-[#6B6B6B]">Trier par</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setSortBy('popular')}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                      sortBy === 'popular'
                        ? 'bg-[#FF9900] text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    🔥 Populaires
                  </button>
                  <button
                    onClick={() => setSortBy('name-asc')}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1 ${
                      sortBy === 'name-asc'
                        ? 'bg-[#FF9900] text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    <SortAsc className="w-3 h-3" /> Nom A-Z
                  </button>
                  <button
                    onClick={() => setSortBy('name-desc')}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1 ${
                      sortBy === 'name-desc'
                        ? 'bg-[#FF9900] text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    <SortDesc className="w-3 h-3" /> Nom Z-A
                  </button>
                  <button
                    onClick={() => setSortBy('price-asc')}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                      sortBy === 'price-asc'
                        ? 'bg-[#FF9900] text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    💰 Prix croissant
                  </button>
                  <button
                    onClick={() => setSortBy('price-desc')}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                      sortBy === 'price-desc'
                        ? 'bg-[#FF9900] text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    💎 Prix décroissant
                  </button>
                </div>
              </div>

              {/* Code promo PRO */}
              <div className="pt-4 border-t border-gray-100">
                <div className="flex items-center gap-2 mb-2">
                  <Tag className="w-4 h-4 text-[#FF9900]" />
                  <span className="text-sm font-semibold text-[#6B6B6B]">Code professionnel</span>
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Entrez votre code pro..."
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                    className="flex-1 px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#FF9900] focus:border-transparent transition-all uppercase text-[#1A1A1A]"
                  />
                  <button
                    onClick={validatePromoCode}
                    disabled={checkingCode || !promoCode.trim()}
                    className="px-4 py-2 text-white font-semibold rounded-xl transition-all disabled:opacity-50"
                    style={{ background: 'linear-gradient(135deg, #FF9900 0%, #F0C300 100%)' }}
                  >
                    {checkingCode ? '...' : 'Valider'}
                  </button>
                </div>
                {validatedCode && (
                  <div className="mt-2 flex items-center gap-2 text-green-600 text-sm">
                    <CheckCircle className="w-4 h-4" />
                    <span><strong>{validatedCode.company_name}</strong> - Remise {validatedCode.discount_percent}% appliquée !</span>
                  </div>
                )}
                {codeError && (
                  <div className="mt-2 flex items-center gap-2 text-red-500 text-sm">
                    <XCircle className="w-4 h-4" />
                    <span>{codeError}</span>
                  </div>
                )}
              </div>

              {/* Active filters display */}
              {(selectedCategory !== 'all' || searchTerm) && (
                <div className="mt-4 flex items-center justify-between text-sm">
                  <span className="text-[#6B6B6B]">
                    <span className="font-bold text-[#1A1A1A]">{sortedProducts.length + (colorVariants.length > 0 ? 1 : 0)}</span> produit{(sortedProducts.length + (colorVariants.length > 0 ? 1 : 0)) > 1 ? 's' : ''} trouvé{(sortedProducts.length + (colorVariants.length > 0 ? 1 : 0)) > 1 ? 's' : ''}
                    {colorVariants.length > 0 && <span className="text-purple-600 ml-2">(dont {colorVariants.length} teintes 333C)</span>}
                  </span>
                  <button
                    onClick={() => {
                      setSelectedCategory('all');
                      setSearchTerm('');
                    }}
                    className="text-[#F0C300] font-semibold hover:underline"
                  >
                    Réinitialiser
                  </button>
                </div>
              )}
            </div>

            {/* Products Grid - Utilise ProductCard comme HomePage */}
            {(sortedProducts.length > 0 || colorVariants.length > 0) ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {/* PALL-X 333C Color Card - affiché en premier si présent */}
                {colorVariants.length > 0 && (
                  <ColorVariantCard
                    title="PALL-X 333C COLOR"
                    description="Concentré de teinte premium 0,2L"
                    variants={colorVariants}
                    onAddToCart={(variant) => {
                      addItem({
                        id: variant.id,
                        name: variant.name,
                        price_ht: getDiscountedPrice(variant.price_ht),
                        image_url: variant.image_url || '',
                        unit: 'L',
                      });
                      setAddedToCart(variant.id);
                      setTimeout(() => setAddedToCart(null), 2000);
                    }}
                    addedToCart={addedToCart}
                    validatedCode={validatedCode}
                  />
                )}
                {sortedProducts.map(product => (
                  <ProductCard
                    key={product.id}
                    product={{
                      ...product,
                      price_ht: product.price_pack_ht || product.price_public_ht
                    }}
                    validatedCode={validatedCode}
                    onAddToCart={() => handleAddToCart(product)}
                    onAddToQuote={() => handleAddToQuote(product)}
                    isInQuote={isInQuote(product.id)}
                    addedToCart={addedToCart === product.id}
                    addedToQuote={addedToQuote === product.id}
                  />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-card p-12 text-center border border-gray-100">
                <Search className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                <h3 className="text-xl font-bold text-[#1A1A1A] mb-2">
                  Aucun produit trouvé
                </h3>
                <p className="text-[#6B6B6B] mb-6">
                  Essayez d'autres critères de recherche
                </p>
                <button
                  onClick={() => {
                    setSelectedCategory('all');
                    setSearchTerm('');
                  }}
                  className="inline-flex items-center gap-2 text-white px-6 py-3 rounded-xl font-bold"
                  style={{ background: 'linear-gradient(135deg, #FF9900 0%, #F0C300 100%)' }}
                >
                  Voir tous les produits
                </button>
              </div>
            )}

            {/* Shipping CTA - Style harmonisé */}
            <div 
              className="mt-12 rounded-2xl p-8 text-center text-white relative overflow-hidden"
              style={{ background: 'linear-gradient(135deg, #1A1A1A 0%, #243B53 50%, #FF9900 100%)' }}
            >
              <div 
                className="absolute top-0 left-0 right-0 h-1"
                style={{ background: 'linear-gradient(90deg, #FF9900 0%, #F0C300 100%)' }}
              ></div>
              
              <div className="flex items-center justify-center gap-3 mb-4">
                <Package className="w-8 h-8 text-[#FF9900]" />
                <h2 className="text-2xl font-extrabold">Franco de port dès 630€ HT</h2>
              </div>
              <p className="text-white/80 mb-6 max-w-xl mx-auto">
                Livraison France entière en 48-72h • Produits Pallmann 100% authentiques • Support expert
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  to="/panier"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-[#1A1A1A] bg-white hover:bg-gray-100 transition-all shadow-lg"
                >
                  <ShoppingCart className="w-5 h-5" />
                  Voir mon panier
                  <ChevronRight className="w-5 h-5" />
                </Link>
                <a
                  href="tel:+33604440903"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-white border-2 border-white/30 hover:bg-white/10 transition-all"
                >
                  <Phone className="w-5 h-5" />
                  06 04 44 09 03
                </a>
              </div>
            </div>

          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default BoutiquePage;
