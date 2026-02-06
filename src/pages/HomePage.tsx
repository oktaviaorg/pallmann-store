import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { supabase } from '../lib/supabase';
import { useCart } from '../lib/CartContext';
import { 
  ShoppingCart, 
  Filter, 
  Search, 
  Download, 
  Tag, 
  CheckCircle, 
  XCircle,
  X,
  Plus,
  Star,
  FileText,
  Truck,
  Shield,
  Sparkles,
  Zap,
  ArrowRight,
  ChevronRight
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
    image: '/images/machines/spider.png',
    badge: 'BESTSELLER',
    features: ['Compact', 'Polyvalent', 'Trio'],
  },
  {
    id: 'cobra',
    name: 'COBRA',
    description: 'Ponceuse de chant professionnelle haute performance',
    image: '/images/machines/cobra.png',
    badge: 'PRO',
    features: ['Puissant', 'Précis', 'Ergonomique'],
  },
  {
    id: 'gecko',
    name: 'GECKO',
    description: 'Ponceuse orbitale grande surface pour finitions parfaites',
    image: '/images/machines/gecko.png',
    badge: 'PREMIUM',
    features: ['Grande surface', 'Finition', 'Silencieux'],
  },
  {
    id: 'hummel',
    name: 'HUMMEL',
    description: 'Ponceuse parquet référence mondiale pour professionnels',
    image: '/images/machines/hummel.png',
    badge: 'RÉFÉRENCE',
    features: ['Référence', 'Fiable', 'Performant'],
  },
];

const HomePage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  
  const { addItem, companyCode, setCompanyCode } = useCart();
  const { addItem: addToQuote, isInQuote } = useQuote();
  
  // Code promo pro
  const [promoCode, setPromoCode] = useState('');
  const [validatedCode, setValidatedCode] = useState<CompanyCode | null>(companyCode);
  const [codeError, setCodeError] = useState('');
  const [codeRemoved, setCodeRemoved] = useState(false);
  const [checkingCode, setCheckingCode] = useState(false);
  const [addedToCart, setAddedToCart] = useState<string | null>(null);
  const [addedToQuote, setAddedToQuote] = useState<string | null>(null);

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
    if (!product.price_public_ht) return;
    
    addToQuote({
      id: product.id,
      name: product.name,
      price_ht: product.price_public_ht,
      image_url: product.image_url,
      unit: product.unit || 'L',
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

      const enrichedProducts = (productsRes.data || []).map(product => {
        const subcategory = subcategoriesRes.data?.find(s => s.id === product.subcategory_id);
        const category = categoriesRes.data?.find(c => c.id === subcategory?.category_id);
        return {
          ...product,
          category_name: category?.name,
          subcategory_name: subcategory?.name
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

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2563EB] mx-auto"></div>
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
        <title>Pallmann Store - Produits professionnels pour parquet</title>
        <meta name="description" content="Boutique en ligne de produits Pallmann : vitrificateurs, huiles, colles et accessoires professionnels pour parquet. Livraison rapide en France." />
        <meta name="keywords" content="Pallmann, vitrificateur parquet, huile parquet, produits professionnels parquet, Pall-X, Magic Oil" />
        <meta property="og:title" content="Pallmann Store - Produits professionnels pour parquet" />
        <meta property="og:description" content="Achetez vos produits Pallmann professionnels en ligne" />
        <link rel="canonical" href="https://pallmann-store.com" />
      </Helmet>

      <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
        <Header />

        <main className="flex-grow">
          {/* Hero Section - Dégradé Bleu-Violet Tech */}
          <div className="relative overflow-hidden">
            {/* Gradient background */}
            <div 
              className="absolute inset-0"
              style={{ 
                background: 'linear-gradient(135deg, #0F172A 0%, #1E3A8A 40%, #2563EB 70%, #7C3AED 100%)'
              }}
            ></div>
            
            {/* Animated gradient overlay */}
            <div 
              className="absolute inset-0 opacity-30 animate-gradient"
              style={{
                background: 'linear-gradient(45deg, transparent 0%, #7C3AED 50%, transparent 100%)',
                backgroundSize: '400% 400%',
              }}
            ></div>
            
            {/* Grid pattern overlay */}
            <div className="absolute inset-0 opacity-10" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
            }}></div>
            
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
              <div className="text-center">
                <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
                  <Sparkles className="w-4 h-4 text-[#7C3AED]" />
                  Qualité professionnelle Allemande
                </div>
                
                <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 tracking-tight">
                  Produits <span className="text-gradient-tech" style={{
                    background: 'linear-gradient(135deg, #60A5FA 0%, #A78BFA 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}>Pallmann</span>
                </h1>
                
                <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto mb-10">
                  Vitrificateurs, huiles, colles et accessoires professionnels pour sublimer vos parquets
                </p>
                
                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                  <a 
                    href="#products"
                    className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-white transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
                    style={{ background: 'linear-gradient(135deg, #2563EB 0%, #7C3AED 100%)' }}
                  >
                    <ShoppingCart className="w-5 h-5" />
                    Découvrir les produits
                    <ArrowRight className="w-5 h-5" />
                  </a>
                  <Link 
                    to="/demande-devis"
                    className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold bg-white/10 backdrop-blur-sm text-white border border-white/20 hover:bg-white/20 transition-all"
                  >
                    <FileText className="w-5 h-5" />
                    Demander un devis
                  </Link>
                </div>
                
                {/* Trust badges */}
                <div className="flex flex-wrap justify-center gap-4 text-sm">
                  <span className="flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white px-5 py-2.5 rounded-full">
                    <Star className="w-4 h-4 text-yellow-400" />
                    Qualité professionnelle
                  </span>
                  <span className="flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white px-5 py-2.5 rounded-full">
                    <Truck className="w-4 h-4 text-[#60A5FA]" />
                    Livraison 48-72h
                  </span>
                  <span className="flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white px-5 py-2.5 rounded-full">
                    <Shield className="w-4 h-4 text-[#A78BFA]" />
                    Franco dès 630€ HT
                  </span>
                </div>
              </div>
            </div>
            
            {/* Bottom wave */}
            <div className="absolute bottom-0 left-0 right-0">
              <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
                <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="#F8FAFC"/>
              </svg>
            </div>
          </div>

          {/* Machines Pro Section */}
          <div className="bg-[#F8FAFC] py-16 lg:py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 bg-[#EDE9FE] text-[#7C3AED] px-4 py-2 rounded-full text-sm font-bold mb-4">
                  <Zap className="w-4 h-4" />
                  ÉQUIPEMENT PRO
                </div>
                <h2 className="text-3xl md:text-4xl font-extrabold text-[#0F172A] mb-4">
                  Machines <span className="text-gradient-tech" style={{
                    background: 'linear-gradient(135deg, #2563EB 0%, #7C3AED 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}>Professionnelles</span>
                </h2>
                <p className="text-[#64748B] text-lg max-w-2xl mx-auto">
                  Ponceuses et équipements de référence pour les professionnels du parquet
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {machinesPro.map((machine, index) => (
                  <div 
                    key={machine.id}
                    className="group relative bg-white rounded-2xl overflow-hidden shadow-card hover:shadow-glow-gradient transition-all duration-500 hover:-translate-y-2"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    {/* Top gradient bar */}
                    <div 
                      className="absolute top-0 left-0 right-0 h-1"
                      style={{ background: 'linear-gradient(90deg, #2563EB 0%, #7C3AED 100%)' }}
                    ></div>
                    
                    {/* Badge */}
                    <div className="absolute top-4 right-4 z-10">
                      <span 
                        className="px-3 py-1 rounded-full text-xs font-bold text-white"
                        style={{ background: 'linear-gradient(135deg, #2563EB 0%, #7C3AED 100%)' }}
                      >
                        {machine.badge}
                      </span>
                    </div>

                    {/* Image */}
                    <div className="relative bg-gradient-to-br from-[#F8FAFC] to-[#EFF6FF] p-8 h-48 flex items-center justify-center">
                      <div className="w-32 h-32 bg-gradient-to-br from-[#2563EB]/10 to-[#7C3AED]/10 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                        <Zap className="w-16 h-16 text-[#2563EB] group-hover:text-[#7C3AED] transition-colors" />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <h3 className="text-xl font-extrabold text-[#0F172A] mb-2 group-hover:text-[#2563EB] transition-colors">
                        {machine.name}
                      </h3>
                      <p className="text-[#64748B] text-sm mb-4 line-clamp-2">
                        {machine.description}
                      </p>
                      
                      {/* Features */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {machine.features.map((feature, i) => (
                          <span 
                            key={i}
                            className="text-xs font-medium px-2 py-1 bg-[#EFF6FF] text-[#2563EB] rounded-md"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>

                      {/* CTA */}
                      <Link
                        to="/demande-devis"
                        className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-white transition-all hover:shadow-lg"
                        style={{ background: 'linear-gradient(135deg, #2563EB 0%, #7C3AED 100%)' }}
                      >
                        Demander un devis
                        <ChevronRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>

              {/* CTA Section */}
              <div className="mt-12 text-center">
                <Link
                  to="/pro"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-[#0F172A] bg-white border-2 border-[#0F172A] hover:bg-[#0F172A] hover:text-white transition-all"
                >
                  <Sparkles className="w-5 h-5" />
                  Voir tout l'équipement PRO
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>

          {/* Products Section */}
          <div id="products" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            {/* Section Header */}
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-extrabold text-[#0F172A] mb-4">
                Nos Produits
              </h2>
              <p className="text-[#64748B] text-lg max-w-2xl mx-auto">
                Découvrez notre gamme complète de produits Pallmann
              </p>
            </div>

            {/* Filters Section */}
            <div className="bg-white rounded-2xl shadow-card p-6 mb-8 border border-gray-100">
              <div className="flex items-center gap-2 mb-4">
                <Filter className="w-5 h-5 text-[#2563EB]" />
                <h3 className="text-lg font-bold text-[#0F172A]">Filtrer les produits</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#64748B]" />
                  <input
                    type="text"
                    placeholder="Rechercher un produit..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#2563EB] focus:border-transparent transition-all text-[#0F172A]"
                  />
                </div>

                {/* Category Filter */}
                <select
                  value={selectedCategory}
                  onChange={(e) => {
                    setSelectedCategory(e.target.value);
                    setSelectedSubcategory('all');
                  }}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#2563EB] focus:border-transparent transition-all text-[#0F172A]"
                >
                  <option value="all">Toutes les catégories</option>
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>

                {/* Subcategory Filter */}
                <select
                  value={selectedSubcategory}
                  onChange={(e) => setSelectedSubcategory(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#2563EB] focus:border-transparent transition-all disabled:bg-gray-50 disabled:text-gray-400 text-[#0F172A]"
                  disabled={selectedCategory === 'all'}
                >
                  <option value="all">Toutes les sous-catégories</option>
                  {filteredSubcategories.map(sub => (
                    <option key={sub.id} value={sub.id}>{sub.name}</option>
                  ))}
                </select>
              </div>

              {/* Code promo PRO */}
              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="flex items-center gap-2 mb-2">
                  <Tag className="w-4 h-4 text-[#7C3AED]" />
                  <span className="text-sm font-semibold text-[#0F172A]">Code professionnel</span>
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Entrez votre code pro..."
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                    className="flex-1 px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#2563EB] focus:border-transparent transition-all uppercase text-[#0F172A]"
                  />
                  <button
                    onClick={validatePromoCode}
                    disabled={checkingCode || !promoCode.trim()}
                    className="px-5 py-2 text-white font-semibold rounded-xl transition-all disabled:opacity-50"
                    style={{ background: 'linear-gradient(135deg, #2563EB 0%, #7C3AED 100%)' }}
                  >
                    {checkingCode ? '...' : 'Valider'}
                  </button>
                </div>
                {validatedCode && (
                  <div className="mt-2 flex items-center justify-between bg-green-50 p-3 rounded-xl border border-green-200">
                    <div className="flex items-center gap-2 text-green-600 text-sm">
                      <CheckCircle className="w-4 h-4" />
                      <span><strong>{validatedCode.company_name}</strong> - Remise {validatedCode.discount_percent}% appliquée !</span>
                    </div>
                    <button
                      onClick={clearPromoCode}
                      className="flex items-center gap-1 px-2 py-1 bg-red-100 hover:bg-red-200 text-red-600 rounded-md transition-colors text-xs font-semibold"
                      title="Supprimer le code promo"
                    >
                      <X className="w-3 h-3" />
                      Supprimer
                    </button>
                  </div>
                )}
                {codeRemoved && (
                  <div className="mt-2 flex items-center gap-2 text-[#2563EB] bg-[#EFF6FF] p-2 rounded-xl text-sm">
                    <CheckCircle className="w-4 h-4" />
                    <span>Code promo supprimé - Prix publics rétablis</span>
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
              {(selectedCategory !== 'all' || selectedSubcategory !== 'all' || searchTerm) && (
                <div className="mt-4 flex items-center gap-2 text-sm text-[#64748B]">
                  <span className="font-semibold text-[#0F172A]">{filteredProducts.length}</span>
                  <span>produit{filteredProducts.length > 1 ? 's' : ''} trouvé{filteredProducts.length > 1 ? 's' : ''}</span>
                  <button
                    onClick={() => {
                      setSelectedCategory('all');
                      setSelectedSubcategory('all');
                      setSearchTerm('');
                    }}
                    className="ml-auto text-[#7C3AED] hover:text-[#6D28D9] font-semibold transition-colors"
                  >
                    Réinitialiser les filtres
                  </button>
                </div>
              )}
            </div>

            {/* Products Grid */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map(product => (
                  <div
                    key={product.id}
                    className="bg-white rounded-2xl shadow-card overflow-hidden hover:shadow-card-hover transition-all duration-300 group flex flex-col h-full relative border border-gray-100"
                  >
                    {/* Category Badge */}
                    {product.category_name && (
                      <div className="absolute top-3 left-3 z-10">
                        <span className="bg-[#0F172A] text-white px-3 py-1 rounded-lg text-xs font-bold">
                          {product.category_name}
                        </span>
                      </div>
                    )}

                    {/* Product Image */}
                    {product.image_url && (
                      <div className="relative bg-gradient-to-br from-[#F8FAFC] via-white to-[#EFF6FF] p-6 pt-12">
                        <img
                          src={product.image_url}
                          alt={product.name}
                          className="w-full h-40 object-contain group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}

                    {/* Card Body */}
                    <div className="p-5 flex-grow flex flex-col">
                      <h3 className="text-base font-bold text-[#0F172A] mb-1 group-hover:text-[#2563EB] transition-colors line-clamp-2">
                        {product.name}
                      </h3>
                      {product.subcategory_name && (
                        <p className="text-xs text-[#64748B] mb-2">
                          {product.subcategory_name}
                        </p>
                      )}

                      {product.description && (
                        <p className="text-[#64748B] text-sm mb-3 line-clamp-2 flex-grow">
                          {product.description}
                        </p>
                      )}

                      {/* Prix */}
                      {product.price_public_ht && (
                        <div className="mb-3 p-3 bg-gradient-to-r from-[#EFF6FF] to-[#F5F3FF] rounded-xl">
                          {validatedCode ? (
                            <div>
                              <span className="text-[#64748B] line-through text-sm">{product.price_public_ht.toFixed(2)}€</span>
                              <span className="ml-2 text-xl font-bold text-[#10B981]">
                                {getDiscountedPrice(product.price_public_ht).toFixed(2)}€
                              </span>
                              <span className="text-xs text-[#64748B]"> HT/{product.unit || 'L'}</span>
                              <span className="ml-2 bg-[#10B981] text-white text-xs font-bold px-2 py-0.5 rounded">
                                -{validatedCode.discount_percent}%
                              </span>
                            </div>
                          ) : (
                            <div>
                              <span className="text-xl font-extrabold text-[#0F172A]">{product.price_public_ht.toFixed(2)}€</span>
                              <span className="text-xs text-[#64748B]"> HT/{product.unit || 'L'}</span>
                            </div>
                          )}
                        </div>
                      )}

                      {/* PDF Link */}
                      {product.pdf_url && (
                        <a
                          href={product.pdf_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-xs text-[#64748B] hover:text-[#7C3AED] transition-colors mb-3"
                        >
                          <Download className="w-3 h-3" />
                          <span>Fiche technique</span>
                        </a>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="p-5 pt-0 space-y-2">
                      {product.price_public_ht ? (
                        <>
                          <button
                            onClick={() => handleAddToCart(product)}
                            className={`w-full py-3 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 ${
                              addedToCart === product.id 
                                ? 'bg-[#10B981] text-white' 
                                : 'text-white shadow-md hover:shadow-lg'
                            }`}
                            style={addedToCart !== product.id ? { background: 'linear-gradient(135deg, #2563EB 0%, #7C3AED 100%)' } : {}}
                          >
                            {addedToCart === product.id ? (
                              <>
                                <CheckCircle className="w-4 h-4" />
                                Ajouté !
                              </>
                            ) : (
                              <>
                                <Plus className="w-4 h-4" />
                                Ajouter au panier
                              </>
                            )}
                          </button>
                          <button
                            onClick={() => handleAddToQuote(product)}
                            className={`w-full py-2 rounded-xl font-semibold text-xs transition-all flex items-center justify-center gap-2 ${
                              addedToQuote === product.id 
                                ? 'bg-[#0F172A] text-white' 
                                : isInQuote(product.id)
                                  ? 'bg-[#EDE9FE] text-[#7C3AED]'
                                  : 'bg-[#F8FAFC] hover:bg-[#EFF6FF] text-[#64748B]'
                            }`}
                          >
                            {addedToQuote === product.id ? (
                              <>
                                <CheckCircle className="w-3 h-3" />
                                Ajouté au devis
                              </>
                            ) : isInQuote(product.id) ? (
                              <>
                                <FileText className="w-3 h-3" />
                                Dans le devis
                              </>
                            ) : (
                              <>
                                <FileText className="w-3 h-3" />
                                Ajouter au devis
                              </>
                            )}
                          </button>
                        </>
                      ) : (
                        <Link
                          to="/demande-devis"
                          className="w-full py-3 rounded-xl font-bold text-sm text-white flex items-center justify-center gap-2 transition-all"
                          style={{ background: 'linear-gradient(135deg, #2563EB 0%, #7C3AED 100%)' }}
                        >
                          <FileText className="w-4 h-4" />
                          Demander un devis
                        </Link>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-card p-12 text-center border border-gray-100">
                <Search className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                <h3 className="text-xl font-bold text-[#0F172A] mb-2">
                  Aucun produit trouvé
                </h3>
                <p className="text-[#64748B] mb-6">
                  Essayez de modifier vos critères de recherche ou réinitialisez les filtres.
                </p>
                <button
                  onClick={() => {
                    setSelectedCategory('all');
                    setSelectedSubcategory('all');
                    setSearchTerm('');
                  }}
                  className="inline-flex items-center gap-2 text-white px-6 py-3 rounded-xl font-bold transition-all"
                  style={{ background: 'linear-gradient(135deg, #2563EB 0%, #7C3AED 100%)' }}
                >
                  Réinitialiser les filtres
                </button>
              </div>
            )}

            {/* Shipping Info Banner */}
            <div 
              className="mt-12 rounded-2xl p-8 text-center text-white relative overflow-hidden"
              style={{ background: 'linear-gradient(135deg, #0F172A 0%, #1E3A8A 50%, #2563EB 100%)' }}
            >
              {/* Accent gradient bar */}
              <div 
                className="absolute top-0 left-0 right-0 h-1"
                style={{ background: 'linear-gradient(90deg, #2563EB 0%, #7C3AED 100%)' }}
              ></div>
              
              <h2 className="text-2xl font-extrabold mb-4">Livraison professionnelle</h2>
              <p className="text-white/90 mb-4">
                Franco de port à partir de 630€ HT • Livraison en 48-72h ouvrées
              </p>
              <p className="text-sm text-white/70">
                Pour toute question, contactez-nous : <a href="mailto:contact@pallmann-store.com" className="text-[#A78BFA] font-semibold hover:underline">contact@pallmann-store.com</a>
              </p>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default HomePage;
