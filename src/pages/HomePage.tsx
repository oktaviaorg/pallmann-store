import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import ProBanner from '../components/ProBanner';
import MarqueeBanner from '../components/MarqueeBanner';
// SurfaceCalculator déplacé vers CalculateurPage
import Footer from '../components/Footer';
import TrustBar from '../components/TrustBar';
import CartReminder from '../components/CartReminder';
import ProductCard from '../components/ProductCard';
import { supabase } from '../lib/supabase';
import { useCart } from '../lib/CartContext';
import { 
  ShoppingCart, 
  Filter, 
  Search, 
  Tag, 
  CheckCircle, 
  XCircle,
  X,
  Star,
  FileText,
  Truck,
  Shield,
  Sparkles,
  Zap,
  ArrowRight,
  ChevronRight,
  Users,
  Award,
  Clock,
  Package,
  TrendingUp,
  ThumbsUp,
  Calculator
} from 'lucide-react';
import { useQuote } from '../lib/QuoteContext';

interface Product {
  id: string;
  subcategory_id: string;
  name: string;
  slug: string;
  description: string;
  features: string[];
  image_url: string;
  shop_url: string;
  pdf_url?: string;
  display_order: number;
  category_name?: string;
  subcategory_name?: string;
  price_achat?: number;
  price_public_ht?: number;
  ref?: string;
  unit?: string;
  is_bestseller?: boolean;
  is_new?: boolean;
  stock_status?: 'in_stock' | 'low_stock' | 'out_of_stock';
}

interface CompanyCode {
  id: string;
  code: string;
  company_name: string;
  discount_percent: number;
  is_active: boolean;
}

interface Category {
  id: string;
  name: string;
  slug: string;
  icon?: string;
}

interface Subcategory {
  id: string;
  category_id: string;
  name: string;
  slug: string;
}

// Machines Pro data
const machinesPro = [
  {
    id: 'spider',
    name: 'SPIDER',
    description: 'Ponceuse trio compacte et polyvalente pour surfaces difficiles',
    badge: 'BESTSELLER',
    features: ['Compact', 'Polyvalent', 'Trio'],
    price: '14 688 € HT',
    image: 'https://fr.pallmann.net/fileadmin/MAM/88731/PALLMANN_dummy_PALLMANN_SPIDER_quadratisch_fr_web_2019-11.png',
  },
  {
    id: 'cobra',
    name: 'COBRA',
    description: 'Ponceuse à bande professionnelle haute performance',
    badge: 'PRO',
    features: ['Puissant', 'Précis', 'Ergonomique'],
    price: '13 293 € HT',
    image: 'https://fr.pallmann.net/fileadmin/MAM/37224/PALLMANN_dummy_PALLMANN_COBRA_msl_2017-02.png',
  },
  {
    id: 'gecko',
    name: 'GECKO STAR 2.0',
    description: 'Bordeuse haute performance pour finitions parfaites',
    badge: 'PREMIUM',
    features: ['Silencieux', 'LED', 'Précision'],
    price: '3 717 € HT',
    image: 'https://fr.pallmann.net/fileadmin/MAM/37229/PALLMANN_dummy_PALLMANN_GECKO_STAR_2_0_msl_2017-02.png',
  },
  {
    id: 'uno',
    name: 'UNO',
    description: 'Monobrosse puissante pour égrenage et lustrage',
    badge: 'POLYVALENT',
    features: ['Puissant', 'Polyvalent', 'Robuste'],
    price: '4 338 € HT',
    image: 'https://fr.pallmann.net/fileadmin/MAM/37260/PALLMANN_dummy_PALLMANN_UNO_msl_2017-02.png',
  },
];

// Stats for social proof
const stats = [
  { value: '500+', label: 'Professionnels équipés', icon: Users },
  { value: '98%', label: 'Clients satisfaits', icon: ThumbsUp },
  { value: '24h', label: 'Réponse garantie', icon: Clock },
  { value: '15+', label: 'Années d\'expertise', icon: Award },
];

const HomePage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  
  const { addItem, companyCode, setCompanyCode, totalHT } = useCart();
  const { addItem: addToQuote, removeItem: removeFromQuote, isInQuote } = useQuote();
  
  // Code promo pro
  const [promoCode, setPromoCode] = useState('');
  const [validatedCode, setValidatedCode] = useState<CompanyCode | null>(companyCode);
  const [codeError, setCodeError] = useState('');
  const [codeRemoved, setCodeRemoved] = useState(false);
  const [checkingCode, setCheckingCode] = useState(false);
  const [addedToCart, setAddedToCart] = useState<string | null>(null);
  const [addedToQuote, setAddedToQuote] = useState<string | null>(null);

  // Franco progress
  const francoThreshold = 630;
  const francoRemaining = Math.max(0, francoThreshold - totalHT);
  const francoProgress = Math.min((totalHT / francoThreshold) * 100, 100);

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

  const clearPromoCode = () => {
    setValidatedCode(null);
    setCompanyCode(null);
    setPromoCode('');
    setCodeError('');
    localStorage.removeItem('pallmann-company-code');
    setCodeRemoved(true);
    setTimeout(() => setCodeRemoved(false), 3000);
  };

  const handleAddToCart = (product: Product) => {
    if (!product.price_public_ht) return;
    
    addItem({
      id: product.id,
      name: product.name,
      price_ht: getDiscountedPrice(product.price_public_ht),
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
      price_ht: product.price_public_ht || 0, // Prix à définir par le technicien
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
      const [productsRes, categoriesRes, subcategoriesRes] = await Promise.all([
        supabase
          .from('pallmann_products')
          .select('*')
          .eq('published', true)
          .order('display_order'),
        supabase
          .from('pallmann_categories')
          .select('*')
          .order('display_order'),
        supabase
          .from('pallmann_subcategories')
          .select('*')
          .order('display_order')
      ]);

      if (productsRes.error) throw productsRes.error;
      if (categoriesRes.error) throw categoriesRes.error;
      if (subcategoriesRes.error) throw subcategoriesRes.error;

      // Best-sellers Pallmann (définis manuellement)
      const bestsellerSlugs = [
        'pall-x-320',            // Fond dur 320
        'pall-x-extreme-mat-ka', // PALL-X EXTREME MAT
        'pall-x-pure',           // PALL-X PURE
      ];

      const enrichedProducts = (productsRes.data || []).map((product, index) => {
        const subcategory = subcategoriesRes.data?.find(s => s.id === product.subcategory_id);
        const category = categoriesRes.data?.find(c => c.id === subcategory?.category_id);
        return {
          ...product,
          category_name: category?.name,
          subcategory_name: subcategory?.name,
          is_bestseller: bestsellerSlugs.includes(product.slug),
          is_new: false,
          stock_status: 'in_stock' as const,
        };
      });

      setProducts(enrichedProducts);
      setCategories(categoriesRes.data || []);
      setSubcategories(subcategoriesRes.data || []);
    } catch (error) {
      console.error('Error fetching shop data:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'all' ||
      subcategories.find(s => s.id === product.subcategory_id)?.category_id === selectedCategory;

    const matchesSubcategory = selectedSubcategory === 'all' ||
      product.subcategory_id === selectedSubcategory;

    const matchesSearch = searchTerm === '' ||
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description?.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesCategory && matchesSubcategory && matchesSearch;
  });

  const filteredSubcategories = selectedCategory === 'all'
    ? subcategories
    : subcategories.filter(s => s.category_id === selectedCategory);

  // Get bestsellers
  const bestsellers = products.filter(p => p.is_bestseller).slice(0, 4);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-[#FFFFFF]">
        <Header />
        <ProBanner />
        <MarqueeBanner />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FBA600] mx-auto"></div>
            <p className="mt-4 text-[#64748B]">Chargement de la boutique...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Pallmann Store - Produits professionnels pour parquet | Achat en ligne</title>
        <meta name="description" content="Boutique en ligne officielle Pallmann : vitrificateurs, huiles, colles et accessoires professionnels pour parquet. Livraison France entière 48-72h. Franco 630€ HT." />
        <meta name="keywords" content="Pallmann, acheter vitrificateur parquet, huile parquet professionnel, Pall-X, Magic Oil, boutique parquet" />
        <meta property="og:title" content="Pallmann Store - Achetez vos produits parquet pro" />
        <meta property="og:description" content="Produits Pallmann authentiques, livraison rapide, conseils experts" />
        <link rel="canonical" href="https://pallmann-store.com" />
      </Helmet>

      <div className="min-h-screen flex flex-col bg-[#FFFFFF]">
        <Header />
        <ProBanner />
        <MarqueeBanner />
        <TrustBar />
        <CartReminder />

        <main className="flex-grow">
          {/* Hero Section - Style PRO */}
          <div className="relative overflow-hidden">
            <div 
              className="absolute inset-0"
              style={{ 
                background: 'linear-gradient(135deg, #1E3A5F 0%, #2C5282 50%, #1E3A5F 100%)'
              }}
            ></div>
            
            <div 
              className="absolute inset-0 opacity-10"
              style={{
                background: 'radial-gradient(circle at 20% 80%, #FBA600 0%, transparent 50%)',
              }}
            ></div>
            
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
              <div className="text-center">
                {/* Urgency badge */}
                <div className="inline-flex items-center gap-2 bg-amber-500/20 backdrop-blur-sm text-amber-300 px-4 py-2 rounded-full text-sm font-bold mb-6 border border-amber-500/30">
                  <Zap className="w-4 h-4" />
                  Livraison OFFERTE dès 630€ HT
                </div>
                
                <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white mb-4 tracking-tight">
                  Produits <span style={{
                    background: 'linear-gradient(135deg, #FFD700 0%, #FBA600 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}>Pallmann</span> Pro
                </h1>
                
                <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-8">
                  La référence allemande pour sublimer vos parquets. 
                  <span className="text-white font-semibold"> Commandez maintenant !</span>
                </p>
                
                {/* Main CTA */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                  <a 
                    href="#products"
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-white text-lg transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1"
                    style={{ background: 'linear-gradient(135deg, #FBA600 0%, #E09500 100%)' }}
                  >
                    <ShoppingCart className="w-6 h-6" />
                    Commander maintenant
                    <ArrowRight className="w-5 h-5" />
                  </a>
                  <Link 
                    to="/demande-devis"
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold bg-white/10 backdrop-blur-sm text-white border border-white/30 hover:bg-white/20 transition-all"
                  >
                    <FileText className="w-5 h-5" />
                    Devis gratuit
                  </Link>
                </div>

                {/* Franco progress bar */}
                {totalHT > 0 && (
                  <div className="max-w-md mx-auto mb-8 bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className="text-white/80">Votre panier : {totalHT.toFixed(0)}€ HT</span>
                      {francoRemaining > 0 ? (
                        <span className="text-amber-300 font-bold">
                          Plus que {francoRemaining.toFixed(0)}€ pour le franco !
                        </span>
                      ) : (
                        <span className="text-green-400 font-bold flex items-center gap-1">
                          <CheckCircle className="w-4 h-4" />
                          Franco atteint !
                        </span>
                      )}
                    </div>
                    <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                      <div 
                        className="h-full rounded-full transition-all duration-500"
                        style={{ 
                          width: `${francoProgress}%`,
                          background: francoProgress >= 100 
                            ? 'linear-gradient(90deg, #10B981 0%, #34D399 100%)'
                            : 'linear-gradient(90deg, #FBA600 0%, #E09500 100%)'
                        }}
                      />
                    </div>
                  </div>
                )}
                
                {/* Trust badges */}
                <div className="flex flex-wrap justify-center gap-3 text-sm pb-16">
                  <span className="flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-full border border-white/10">
                    <Award className="w-4 h-4 text-amber-400" />
                    Produits authentiques
                  </span>
                  <span className="flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-full border border-white/10">
                    <Truck className="w-4 h-4 text-[#FFD700]" />
                    48-72h chrono
                  </span>
                  <span className="flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-full border border-white/10">
                    <Shield className="w-4 h-4 text-[#FBA600]" />
                    Paiement sécurisé
                  </span>
                </div>
              </div>
            </div>
            
            <div className="absolute bottom-0 left-0 right-0">
              <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
                <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="#FFFFFF"/>
              </svg>
            </div>
          </div>

          {/* Social Proof Stats */}
          <div className="bg-[#FFFFFF] py-8">
            <div className="max-w-7xl mx-auto px-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {stats.map((stat, index) => (
                  <div 
                    key={index}
                    className="bg-white rounded-xl p-4 text-center shadow-card border border-gray-100"
                  >
                    <stat.icon className="w-6 h-6 mx-auto mb-2 text-[#FBA600]" />
                    <div className="text-2xl font-extrabold text-[#1A2634]">{stat.value}</div>
                    <div className="text-xs text-[#64748B]">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* CTA Calculateur */}
          <div className="bg-gradient-to-r from-[#F8FAFC] to-[#F8FAFC] py-6 border-y border-[#BCCCDC]">
            <div className="max-w-7xl mx-auto px-4">
              <Link 
                to="/calculateur-pro"
                className="flex flex-col md:flex-row items-center justify-between gap-4 bg-white rounded-2xl p-6 shadow-lg border-2 border-[#FBA600]/20 hover:border-[#FBA600] transition-all hover:shadow-xl group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#FBA600] to-[#E09500] flex items-center justify-center text-white">
                    <Calculator className="w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#1A2634] group-hover:text-[#FBA600] transition-colors">
                      🧮 Calculateur PRO
                    </h3>
                    <p className="text-[#627D98]">
                      Estimez vos besoins en produits selon votre surface — <strong>Gratuit</strong>
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 px-6 py-3 rounded-xl text-white font-bold"
                  style={{ background: 'linear-gradient(135deg, #FBA600 0%, #E09500 100%)' }}
                >
                  Accéder au Calculateur PRO
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            </div>
          </div>

          {/* Category Navigation Bar - STICKY */}
          <div className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 py-3">
              <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide pb-1">
                <a
                  href="#products"
                  onClick={() => {
                    setSelectedCategory('all');
                    setSelectedSubcategory('all');
                  }}
                  className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                    selectedCategory === 'all'
                      ? 'text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  style={selectedCategory === 'all' ? { background: 'linear-gradient(135deg, #FBA600 0%, #E09500 100%)' } : {}}
                >
                  Tous ({products.length})
                </a>
                {categories.map(cat => {
                  const count = products.filter(p => {
                    const sub = subcategories.find(s => s.id === p.subcategory_id);
                    return sub?.category_id === cat.id;
                  }).length;
                  return (
                    <a
                      key={cat.id}
                      href="#products"
                      onClick={() => {
                        setSelectedCategory(cat.id);
                        setSelectedSubcategory('all');
                      }}
                      className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-semibold transition-all whitespace-nowrap ${
                        selectedCategory === cat.id
                          ? 'text-white shadow-md'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                      style={selectedCategory === cat.id ? { background: 'linear-gradient(135deg, #FBA600 0%, #E09500 100%)' } : {}}
                    >
                      {cat.name} ({count})
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Bestsellers Section - QUICK CONVERSION */}
          {bestsellers.length > 0 && (
            <div className="bg-gradient-to-b from-[#FFFFFF] to-white py-12">
              <div className="max-w-7xl mx-auto px-4">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="w-5 h-5 text-amber-500" />
                      <span className="text-amber-600 font-bold text-sm uppercase tracking-wide">Les plus vendus</span>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-extrabold text-[#1A2634]">
                      Best-sellers Pallmann
                    </h2>
                  </div>
                  <a 
                    href="#products"
                    className="hidden md:flex items-center gap-1 text-[#FBA600] font-semibold hover:underline"
                  >
                    Voir tout
                    <ChevronRight className="w-4 h-4" />
                  </a>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {bestsellers.map(product => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      validatedCode={validatedCode}
                      onAddToCart={handleAddToCart}
                      onAddToQuote={handleAddToQuote}
                      isInQuote={isInQuote(product.id)}
                      addedToCart={addedToCart === product.id}
                      addedToQuote={addedToQuote === product.id}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Machines Pro Section */}
          <div className="bg-white py-12 lg:py-16">
            <div className="max-w-7xl mx-auto px-4">
              <div className="text-center mb-10">
                <div className="inline-flex items-center gap-2 bg-[#D9E2EC] text-[#E09500] px-4 py-2 rounded-full text-sm font-bold mb-4">
                  <Sparkles className="w-4 h-4" />
                  ÉQUIPEMENT PRO
                </div>
                <h2 className="text-2xl md:text-3xl font-extrabold text-[#1A2634] mb-3">
                  Machines Professionnelles
                </h2>
                <p className="text-[#64748B] max-w-xl mx-auto">
                  Ponceuses de référence mondiale. <span className="font-semibold text-[#1A2634]">Sélectionnez vos machines et demandez un devis.</span>
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {machinesPro.map((machine, index) => {
                  const inQuote = isInQuote(`machine-${machine.id}`);
                  return (
                    <div 
                      key={machine.id}
                      className={`group relative bg-white rounded-2xl overflow-hidden shadow-card hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-2 ${
                        inQuote ? 'border-[#FBA600] ring-2 ring-[#FBA600]/20' : 'border-gray-100'
                      }`}
                    >
                      {/* Checkbox de sélection */}
                      <div className="absolute top-4 left-4 z-10">
                        <button
                          onClick={() => {
                            if (inQuote) {
                              removeFromQuote(`machine-${machine.id}`);
                            } else {
                              addToQuote({
                                id: `machine-${machine.id}`,
                                name: `Machine ${machine.name}`,
                                price_ht: 0,
                                image_url: machine.image,
                                unit: 'unité'
                              });
                            }
                          }}
                          className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all ${
                            inQuote 
                              ? 'bg-[#FBA600] text-white' 
                              : 'bg-white/90 border-2 border-gray-300 hover:border-[#FBA600]'
                          }`}
                        >
                          {inQuote && <CheckCircle className="w-5 h-5" />}
                        </button>
                      </div>

                      <div 
                        className="absolute top-0 left-0 right-0 h-1"
                        style={{ background: 'linear-gradient(90deg, #FBA600 0%, #E09500 100%)' }}
                      ></div>
                      
                      <div className="absolute top-4 right-4 z-10">
                        <span 
                          className="px-3 py-1 rounded-full text-xs font-bold text-white"
                          style={{ background: 'linear-gradient(135deg, #FBA600 0%, #E09500 100%)' }}
                        >
                          {machine.badge}
                        </span>
                      </div>

                      <div className="relative bg-gradient-to-br from-[#FFFFFF] to-[#F8FAFC] p-6 h-48 flex items-center justify-center overflow-hidden">
                        {machine.image ? (
                          <img 
                            src={machine.image} 
                            alt={machine.name}
                            className="max-h-40 w-auto object-contain group-hover:scale-110 transition-transform duration-300"
                          />
                        ) : (
                          <div className="w-24 h-24 bg-gradient-to-br from-[#FBA600]/10 to-[#E09500]/10 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                            <Zap className="w-12 h-12 text-[#FBA600] group-hover:text-[#E09500] transition-colors" />
                          </div>
                        )}
                      </div>

                      <div className="p-5">
                        <h3 className="text-lg font-extrabold text-[#1A2634] mb-1 group-hover:text-[#FBA600] transition-colors">
                          {machine.name}
                        </h3>
                        <p className="text-[#64748B] text-sm mb-3 line-clamp-2">
                          {machine.description}
                        </p>
                        
                        <div className="flex flex-wrap gap-1 mb-4">
                          {machine.features.map((feature, i) => (
                            <span 
                              key={i}
                              className="text-[10px] font-medium px-2 py-0.5 bg-[#F8FAFC] text-[#FBA600] rounded"
                            >
                              {feature}
                            </span>
                          ))}
                        </div>

                        <button
                          onClick={() => {
                            if (inQuote) {
                              removeFromQuote(`machine-${machine.id}`);
                            } else {
                              addToQuote({
                                id: `machine-${machine.id}`,
                                name: `Machine ${machine.name}`,
                                price_ht: 0,
                                image_url: machine.image,
                                unit: 'unité'
                              });
                            }
                          }}
                          className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-xl font-bold text-sm transition-all ${
                            inQuote 
                              ? 'bg-[#1A2634] text-white hover:bg-[#0F172A]' 
                              : 'text-white hover:shadow-lg'
                          }`}
                          style={!inQuote ? { background: 'linear-gradient(135deg, #FBA600 0%, #E09500 100%)' } : {}}
                        >
                          {inQuote ? (
                            <>
                              <CheckCircle className="w-4 h-4" />
                              Dans le devis
                            </>
                          ) : (
                            <>
                              Ajouter au devis
                              <ArrowRight className="w-4 h-4" />
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Bouton récap si machines sélectionnées */}
              {machinesPro.some(m => isInQuote(`machine-${m.id}`)) && (
                <div className="mt-8 text-center">
                  <div className="inline-flex flex-col sm:flex-row items-center gap-4 bg-gradient-to-r from-[#FBA600]/10 to-[#E09500]/10 p-6 rounded-2xl border border-[#FBA600]/20">
                    <div className="text-left">
                      <p className="font-bold text-[#1A2634]">
                        {machinesPro.filter(m => isInQuote(`machine-${m.id}`)).length} machine(s) sélectionnée(s)
                      </p>
                      <p className="text-sm text-[#64748B]">
                        {machinesPro.filter(m => isInQuote(`machine-${m.id}`)).map(m => m.name).join(' + ')}
                      </p>
                    </div>
                    <Link
                      to="/demande-devis"
                      className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-white transition-all hover:shadow-lg"
                      style={{ background: 'linear-gradient(135deg, #FBA600 0%, #E09500 100%)' }}
                    >
                      <FileText className="w-5 h-5" />
                      Demander mon devis
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Calculator CTA - Redirige vers page dédiée */}

          {/* Products Section */}
          <div id="products" className="max-w-7xl mx-auto px-4 py-12">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-extrabold text-[#1A2634] mb-2">
                Tous nos produits
              </h2>
              <p className="text-[#64748B]">
                {products.length} produits disponibles • Livraison France entière
              </p>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-2xl shadow-card p-4 md:p-6 mb-8 border border-gray-100">
              {/* Search */}
              <div className="relative mb-6">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#64748B]" />
                <input
                  type="text"
                  placeholder="Rechercher un produit..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#FBA600] focus:border-transparent transition-all text-[#1A2634]"
                />
              </div>

              {/* Category Pills */}
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-3">
                  <Filter className="w-4 h-4 text-[#64748B]" />
                  <span className="text-sm font-semibold text-[#64748B]">Catégories</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => {
                      setSelectedCategory('all');
                      setSelectedSubcategory('all');
                    }}
                    className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                      selectedCategory === 'all'
                        ? 'text-white shadow-md'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                    style={selectedCategory === 'all' ? { background: 'linear-gradient(135deg, #FBA600 0%, #E09500 100%)' } : {}}
                  >
                    Tout voir ({products.length})
                  </button>
                  {categories.map(cat => {
                    const count = products.filter(p => {
                      const sub = subcategories.find(s => s.id === p.subcategory_id);
                      return sub?.category_id === cat.id;
                    }).length;
                    return (
                      <button
                        key={cat.id}
                        onClick={() => {
                          setSelectedCategory(cat.id);
                          setSelectedSubcategory('all');
                        }}
                        className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                          selectedCategory === cat.id
                            ? 'text-white shadow-md'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                        style={selectedCategory === cat.id ? { background: 'linear-gradient(135deg, #FBA600 0%, #E09500 100%)' } : {}}
                      >
                        {cat.name} ({count})
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Subcategory Pills (shown when category selected) */}
              {selectedCategory !== 'all' && filteredSubcategories.length > 0 && (
                <div className="mb-4 pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-2 mb-3">
                    <ChevronRight className="w-4 h-4 text-[#64748B]" />
                    <span className="text-sm font-semibold text-[#64748B]">Sous-catégories</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => setSelectedSubcategory('all')}
                      className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                        selectedSubcategory === 'all'
                          ? 'bg-[#FBA600] text-white'
                          : 'bg-blue-50 text-[#FBA600] hover:bg-blue-100'
                      }`}
                    >
                      Toutes
                    </button>
                    {filteredSubcategories.map(sub => {
                      const count = products.filter(p => p.subcategory_id === sub.id).length;
                      return (
                        <button
                          key={sub.id}
                          onClick={() => setSelectedSubcategory(sub.id)}
                          className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                            selectedSubcategory === sub.id
                              ? 'bg-[#FBA600] text-white'
                              : 'bg-blue-50 text-[#FBA600] hover:bg-blue-100'
                          }`}
                        >
                          {sub.name} ({count})
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Results count */}
              {(selectedCategory !== 'all' || selectedSubcategory !== 'all' || searchTerm) && (
                <div className="mt-4 flex items-center justify-between text-sm">
                  <span className="text-[#64748B]">
                    <span className="font-bold text-[#1A2634]">{filteredProducts.length}</span> produit{filteredProducts.length > 1 ? 's' : ''} trouvé{filteredProducts.length > 1 ? 's' : ''}
                  </span>
                  <button
                    onClick={() => {
                      setSelectedCategory('all');
                      setSelectedSubcategory('all');
                      setSearchTerm('');
                    }}
                    className="text-[#E09500] font-semibold hover:underline"
                  >
                    Réinitialiser
                  </button>
                </div>
              )}
            </div>

            {/* Products Grid */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map(product => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    validatedCode={validatedCode}
                    onAddToCart={handleAddToCart}
                    onAddToQuote={handleAddToQuote}
                    isInQuote={isInQuote(product.id)}
                    addedToCart={addedToCart === product.id}
                    addedToQuote={addedToQuote === product.id}
                  />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-card p-12 text-center border border-gray-100">
                <Search className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                <h3 className="text-xl font-bold text-[#1A2634] mb-2">
                  Aucun produit trouvé
                </h3>
                <p className="text-[#64748B] mb-6">
                  Essayez d'autres critères de recherche
                </p>
                <button
                  onClick={() => {
                    setSelectedCategory('all');
                    setSelectedSubcategory('all');
                    setSearchTerm('');
                  }}
                  className="inline-flex items-center gap-2 text-white px-6 py-3 rounded-xl font-bold"
                  style={{ background: 'linear-gradient(135deg, #FBA600 0%, #E09500 100%)' }}
                >
                  Voir tous les produits
                </button>
              </div>
            )}

            {/* Shipping CTA */}
            <div 
              className="mt-12 rounded-2xl p-8 text-center text-white relative overflow-hidden"
              style={{ background: 'linear-gradient(135deg, #1A2634 0%, #243B53 50%, #FBA600 100%)' }}
            >
              <div 
                className="absolute top-0 left-0 right-0 h-1"
                style={{ background: 'linear-gradient(90deg, #FBA600 0%, #E09500 100%)' }}
              ></div>
              
              <div className="flex items-center justify-center gap-3 mb-4">
                <Package className="w-8 h-8 text-[#FBA600]" />
                <h2 className="text-2xl font-extrabold">Franco de port dès 630€ HT</h2>
              </div>
              <p className="text-white/80 mb-6 max-w-xl mx-auto">
                Livraison France entière en 48-72h • Produits Pallmann 100% authentiques • Support expert
              </p>
              <Link
                to="/panier"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-[#1A2634] bg-white hover:bg-gray-100 transition-all shadow-lg"
              >
                <ShoppingCart className="w-5 h-5" />
                Voir mon panier
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default HomePage;
