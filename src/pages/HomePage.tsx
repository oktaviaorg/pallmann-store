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
  ChevronRight, 
  Download, 
  Tag, 
  CheckCircle, 
  XCircle,
  X,
  Plus,
  Star,
  FileText
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
    localStorage.removeItem('pallmann-company-code');
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
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF6600] mx-auto"></div>
            <p className="mt-4 text-gray-600">Chargement de la boutique...</p>
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

      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />

        <main className="flex-grow">
          {/* Hero Section */}
          <div className="bg-gradient-to-r from-[#FF6600] to-[#ff8c40] py-12 lg:py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center">
                <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
                  Produits Pallmann
                </h1>
                <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto mb-6">
                  Vitrificateurs, huiles, colles et accessoires professionnels pour sublimer vos parquets
                </p>
                <div className="flex flex-wrap justify-center gap-4 text-sm text-white/90">
                  <span className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-white" />
                    Qualité professionnelle
                  </span>
                  <span className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-white" />
                    Livraison rapide
                  </span>
                  <span className="flex items-center gap-2">
                    <Tag className="w-4 h-4 text-white" />
                    Franco dès 630€ HT
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Filters Section */}
            <div className="bg-white rounded-xl shadow-md p-6 mb-8">
              <div className="flex items-center gap-2 mb-4">
                <Filter className="w-5 h-5 text-[#FF6600]" />
                <h2 className="text-lg font-bold text-gray-900">Filtrer les produits</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Rechercher un produit..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6600] focus:border-transparent transition-all"
                  />
                </div>

                {/* Category Filter */}
                <select
                  value={selectedCategory}
                  onChange={(e) => {
                    setSelectedCategory(e.target.value);
                    setSelectedSubcategory('all');
                  }}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6600] focus:border-transparent transition-all"
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
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6600] focus:border-transparent transition-all disabled:bg-gray-100"
                  disabled={selectedCategory === 'all'}
                >
                  <option value="all">Toutes les sous-catégories</option>
                  {filteredSubcategories.map(sub => (
                    <option key={sub.id} value={sub.id}>{sub.name}</option>
                  ))}
                </select>
              </div>

              {/* Code promo PRO */}
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex items-center gap-2 mb-2">
                  <Tag className="w-4 h-4 text-[#FF6600]" />
                  <span className="text-sm font-semibold text-gray-700">Code professionnel</span>
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Entrez votre code pro..."
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6600] focus:border-transparent transition-all uppercase"
                  />
                  <button
                    onClick={validatePromoCode}
                    disabled={checkingCode || !promoCode.trim()}
                    className="px-4 py-2 bg-[#FF6600] hover:bg-[#e65c00] text-white font-semibold rounded-lg transition-all disabled:opacity-50"
                  >
                    {checkingCode ? '...' : 'Valider'}
                  </button>
                </div>
                {validatedCode && (
                  <div className="mt-2 flex items-center justify-between bg-green-50 p-2 rounded-lg">
                    <div className="flex items-center gap-2 text-green-600 text-sm">
                      <CheckCircle className="w-4 h-4" />
                      <span><strong>{validatedCode.company_name}</strong> - Remise {validatedCode.discount_percent}% appliquée !</span>
                    </div>
                    <button
                      onClick={clearPromoCode}
                      className="p-1 hover:bg-green-100 rounded-full transition-colors text-green-700"
                      title="Supprimer le code"
                    >
                      <X className="w-4 h-4" />
                    </button>
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
                <div className="mt-4 flex items-center gap-2 text-sm text-gray-600">
                  <span className="font-semibold">{filteredProducts.length}</span>
                  <span>produit{filteredProducts.length > 1 ? 's' : ''} trouvé{filteredProducts.length > 1 ? 's' : ''}</span>
                  <button
                    onClick={() => {
                      setSelectedCategory('all');
                      setSelectedSubcategory('all');
                      setSearchTerm('');
                    }}
                    className="ml-auto text-[#FF6600] hover:text-[#e65c00] font-semibold transition-colors"
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
                    className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 group flex flex-col h-full relative"
                  >
                    {/* Category Badge */}
                    {product.category_name && (
                      <div className="absolute top-3 left-3 z-10">
                        <span className="bg-gray-800 text-white px-3 py-1 rounded-md text-xs font-bold">
                          {product.category_name}
                        </span>
                      </div>
                    )}

                    {/* Product Image */}
                    {product.image_url && (
                      <div className="relative bg-gradient-to-br from-gray-50 via-white to-gray-100 p-6 pt-12">
                        <img
                          src={product.image_url}
                          alt={product.name}
                          className="w-full h-40 object-contain group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}

                    {/* Card Body */}
                    <div className="p-5 flex-grow flex flex-col">
                      <h3 className="text-base font-bold text-gray-900 mb-1 group-hover:text-[#FF6600] transition-colors line-clamp-2">
                        {product.name}
                      </h3>
                      {product.subcategory_name && (
                        <p className="text-xs text-gray-500 mb-2">
                          {product.subcategory_name}
                        </p>
                      )}

                      {product.description && (
                        <p className="text-gray-600 text-sm mb-3 line-clamp-2 flex-grow">
                          {product.description}
                        </p>
                      )}

                      {/* Prix */}
                      {product.price_public_ht && (
                        <div className="mb-3 p-3 bg-gray-50 rounded-lg">
                          {validatedCode ? (
                            <div>
                              <span className="text-gray-400 line-through text-sm">{product.price_public_ht.toFixed(2)}€</span>
                              <span className="ml-2 text-xl font-bold text-green-600">
                                {getDiscountedPrice(product.price_public_ht).toFixed(2)}€
                              </span>
                              <span className="text-xs text-gray-500"> HT/{product.unit || 'L'}</span>
                              <span className="ml-2 bg-green-100 text-green-700 text-xs font-bold px-2 py-0.5 rounded">
                                -{validatedCode.discount_percent}%
                              </span>
                            </div>
                          ) : (
                            <div>
                              <span className="text-xl font-bold text-[#FF6600]">{product.price_public_ht.toFixed(2)}€</span>
                              <span className="text-xs text-gray-500"> HT/{product.unit || 'L'}</span>
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
                          className="inline-flex items-center gap-1 text-xs text-gray-500 hover:text-[#FF6600] transition-colors mb-3"
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
                            className={`w-full py-3 rounded-lg font-bold text-sm transition-all flex items-center justify-center gap-2 ${
                              addedToCart === product.id 
                                ? 'bg-green-500 text-white' 
                                : 'bg-[#FF6600] hover:bg-[#e65c00] text-white'
                            }`}
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
                            className={`w-full py-2 rounded-lg font-semibold text-xs transition-all flex items-center justify-center gap-2 ${
                              addedToQuote === product.id 
                                ? 'bg-gray-700 text-white' 
                                : isInQuote(product.id)
                                  ? 'bg-gray-200 text-gray-600'
                                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
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
                          className="w-full py-3 rounded-lg font-bold text-sm bg-gray-800 hover:bg-gray-700 text-white flex items-center justify-center gap-2 transition-all"
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
              <div className="bg-white rounded-xl shadow-md p-12 text-center">
                <Search className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Aucun produit trouvé
                </h3>
                <p className="text-gray-600 mb-6">
                  Essayez de modifier vos critères de recherche ou réinitialisez les filtres.
                </p>
                <button
                  onClick={() => {
                    setSelectedCategory('all');
                    setSelectedSubcategory('all');
                    setSearchTerm('');
                  }}
                  className="inline-flex items-center gap-2 bg-[#FF6600] hover:bg-[#e65c00] text-white px-6 py-3 rounded-lg font-bold transition-colors"
                >
                  Réinitialiser les filtres
                </button>
              </div>
            )}

            {/* Shipping Info */}
            <div className="mt-12 bg-gradient-to-r from-[#FF6600] to-[#ff8c40] rounded-xl p-8 text-center text-white">
              <h2 className="text-2xl font-bold mb-4">Livraison professionnelle</h2>
              <p className="text-white/90 mb-4">
                Franco de port à partir de 630€ HT • Livraison en 48-72h ouvrées
              </p>
              <p className="text-sm text-white/80">
                Pour toute question, contactez-nous : <a href="mailto:contact@pallmann-store.com" className="text-white font-semibold hover:underline">contact@pallmann-store.com</a>
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
