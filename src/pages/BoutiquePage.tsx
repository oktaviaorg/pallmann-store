import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { supabase } from '../lib/supabase';
import { useCart } from '../lib/CartContext';
import { ShoppingCart, ExternalLink, Filter, Search, Home, ChevronRight, Download, Phone, Tag, CheckCircle, XCircle, Package, AlertTriangle, Plus } from 'lucide-react';

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

const BoutiquePage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const { addItem, items } = useCart();
  
  // Code promo pro
  const [promoCode, setPromoCode] = useState('');
  const [validatedCode, setValidatedCode] = useState<CompanyCode | null>(null);
  const [codeError, setCodeError] = useState('');
  const [checkingCode, setCheckingCode] = useState(false);
  
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
      } else {
        setValidatedCode(data);
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

  // Ajouter au panier avec vérification durcisseur
  const handleAddToCart = async (product: Product) => {
    // Vérifier si le produit nécessite un durcisseur
    const needs2K = product.name.toLowerCase().includes('2k') || 
                    product.name.toLowerCase().includes('bi-composant') ||
                    product.name.toLowerCase().includes('bi composant');
    
    if (needs2K) {
      // Chercher le durcisseur correspondant
      const hardenerName = product.name.includes('Magic Oil') ? 'MAGIC OIL' :
                          product.name.includes('Pall-X 98') ? 'PALL-X 98' :
                          product.name.includes('Pall-X 96') ? 'PALL-X 96' : null;
      
      if (hardenerName) {
        const hardener = products.find(p => 
          p.name.toLowerCase().includes('durcisseur') && 
          p.name.toLowerCase().includes(hardenerName.toLowerCase())
        );
        
        if (hardener) {
          // Ajouter le produit principal
          addItem({
            id: product.id,
            name: product.name,
            price_ht: product.price_pack_ht || product.price_public_ht || 0,
            image_url: product.image_url,
            unit: product.unit || 'unité'
          });
          
          // Afficher alerte pour le durcisseur
          setHardenerAlert({ show: true, product, hardener });
          return;
        }
      }
    }
    
    // Ajouter normalement
    addItem({
      id: product.id,
      name: product.name,
      price_ht: product.price_pack_ht || product.price_public_ht || 0,
      image_url: product.image_url,
      unit: product.unit || 'unité'
    });
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

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'all' || 
      product.category_id === selectedCategory;

    const matchesSearch = searchTerm === '' ||
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description?.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  // Compter les produits par catégorie
  const categoryCounts = categories.map(cat => ({
    ...cat,
    count: products.filter(p => p.category_id === cat.id).length
  })).filter(cat => cat.count > 0);

  // Best sellers (premiers produits populaires)
  const bestSellers = products
    .filter(p => ['pall-x 98', 'magic oil', 'pall-x 96'].some(kw => p.name.toLowerCase().includes(kw)))
    .slice(0, 3);

  // Formater le prix selon le type de produit
  const formatPrice = (product: Product) => {
    const price = product.price_pack_ht || product.price_public_ht;
    if (!price) return null;
    
    const packSize = product.pack_size || 1;
    const unit = product.unit?.toUpperCase();
    
    // Produit liquide (prix au litre)
    if (unit === 'L' || unit === '1 L') {
      return {
        mainPrice: price,
        mainLabel: packSize > 1 ? `bidon ${packSize}L` : 'L',
        subPrice: packSize > 1 ? product.price_public_ht : null,
        subLabel: packSize > 1 ? '/L' : null
      };
    }
    
    // Boîte/pack
    if (packSize > 1) {
      return {
        mainPrice: price,
        mainLabel: `boîte de ${packSize}`,
        subPrice: null,
        subLabel: null
      };
    }
    
    // Unité simple
    return {
      mainPrice: price,
      mainLabel: 'unité',
      subPrice: null,
      subLabel: null
    };
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#ff9900] mx-auto"></div>
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
              <h3 className="text-lg font-bold text-gray-900">Durcisseur recommandé</h3>
            </div>
            
            <p className="text-gray-600 mb-4">
              <strong>{hardenerAlert.product?.name}</strong> est un produit bi-composant qui nécessite un durcisseur pour une application correcte.
            </p>
            
            <div className="bg-gray-50 rounded-xl p-4 mb-4 flex items-center gap-4">
              {hardenerAlert.hardener.image_url && (
                <img src={hardenerAlert.hardener.image_url} alt={hardenerAlert.hardener.name} className="w-16 h-16 object-contain" />
              )}
              <div>
                <p className="font-semibold text-gray-900">{hardenerAlert.hardener.name}</p>
                <p className="text-[#ff9900] font-bold">
                  {(hardenerAlert.hardener.price_pack_ht || hardenerAlert.hardener.price_public_ht)?.toFixed(2)}€ HT
                </p>
              </div>
            </div>
            
            <div className="flex gap-3">
              <button
                onClick={() => setHardenerAlert({ show: false, product: null, hardener: null })}
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Non merci
              </button>
              <button
                onClick={addHardener}
                className="flex-1 px-4 py-3 bg-[#ff9900] hover:bg-[#f0c300] text-white rounded-lg font-bold transition-colors flex items-center justify-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Ajouter
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />

        <main className="flex-grow pt-24 pb-16">
          {/* Breadcrumb Navigation */}
          <div className="bg-white border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
              <nav className="flex items-center space-x-2 text-sm">
                <Link to="/" className="text-gray-500 hover:text-[#ff9900] transition-colors flex items-center gap-1">
                  <Home className="w-4 h-4" />
                  <span>Accueil</span>
                </Link>
                <ChevronRight className="w-4 h-4 text-gray-400" />
                <span className="text-gray-900 font-semibold">Boutique</span>
              </nav>
            </div>
          </div>

          {/* Orange Header Section */}
          <div className="bg-gradient-to-r from-[#ff9900] to-[#f0c300] py-12 shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center">
                <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm border border-white/40 text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
                  <Package className="w-4 h-4" />
                  {products.length} produits disponibles • Livraison France entière
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                  Tous nos produits
                </h1>
                <p className="text-xl text-white/90 max-w-3xl mx-auto">
                  Vitrificateurs, huiles, colles, machines et accessoires de qualité professionnelle Pallmann.
                </p>
              </div>
            </div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">

            {/* Best Sellers Section */}
            {bestSellers.length > 0 && (
              <div className="bg-gradient-to-br from-[#ff9900] to-[#f0c300] rounded-2xl shadow-2xl p-8 mb-8 border-4 border-white/30">
                <div className="text-center mb-6">
                  <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm border border-white/40 text-white px-4 py-2 rounded-full text-sm font-bold mb-3">
                    <ShoppingCart className="w-4 h-4" />
                    Les plus vendus
                  </div>
                  <h2 className="text-3xl font-bold text-white mb-2">
                    Nos produits phares
                  </h2>
                  <p className="text-white/90 text-lg">
                    Les favoris des professionnels du parquet
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {bestSellers.map((product, index) => {
                    const priceInfo = formatPrice(product);
                    return (
                      <div
                        key={product.id}
                        className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 group flex flex-col h-full relative"
                      >
                        <div className="absolute top-4 left-4 z-20">
                          <div className="bg-[#ff9900] text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg shadow-lg">
                            {index + 1}
                          </div>
                        </div>

                        {product.image_url && (
                          <div className="relative bg-gradient-to-br from-gray-50 via-white to-gray-100 p-6 pt-16">
                            <img
                              src={product.image_url}
                              alt={product.name}
                              className="w-full h-40 object-contain group-hover:scale-110 transition-transform duration-500"
                            />
                          </div>
                        )}

                        <div className="p-6 flex-grow flex flex-col">
                          <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-[#ff9900] transition-colors">
                            {product.name}
                          </h3>

                          {product.description && (
                            <p className="text-gray-700 text-sm mb-4 line-clamp-2 flex-grow">
                              {product.description}
                            </p>
                          )}

                          {priceInfo && (
                            <div className="mb-4">
                              <span className="text-2xl font-bold text-[#ff9900]">{priceInfo.mainPrice.toFixed(2)}€</span>
                              <span className="text-sm text-gray-500"> HT/{priceInfo.mainLabel}</span>
                              {priceInfo.subPrice && (
                                <div className="text-xs text-gray-400">
                                  soit {priceInfo.subPrice.toFixed(2)}€{priceInfo.subLabel}
                                </div>
                              )}
                            </div>
                          )}
                        </div>

                        <div className="p-6 pt-0">
                          <button
                            onClick={() => handleAddToCart(product)}
                            className="inline-flex items-center gap-2 bg-[#ff9900] hover:bg-[#f0c300] text-white px-6 py-3 rounded-lg font-bold text-sm transition-all w-full justify-center shadow-md hover:shadow-lg"
                          >
                            <ShoppingCart className="w-4 h-4" />
                            Ajouter au panier
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Filters Section */}
            <div className="bg-white rounded-xl shadow-md p-6 mb-8 border-l-4 border-[#ff9900]">
              <div className="flex items-center gap-2 mb-4">
                <Filter className="w-5 h-5 text-[#ff9900]" />
                <h2 className="text-lg font-bold text-gray-900">Filtrer les produits</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Rechercher un produit..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff9900] focus:border-transparent transition-all"
                  />
                </div>

                {/* Category Filter - utilise les vraies catégories */}
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff9900] focus:border-transparent transition-all"
                >
                  <option value="all">Toutes les catégories ({products.length})</option>
                  {categoryCounts.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.name} ({cat.count})</option>
                  ))}
                </select>
              </div>

              {/* Code promo PRO */}
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex items-center gap-2 mb-2">
                  <Tag className="w-4 h-4 text-[#ff9900]" />
                  <span className="text-sm font-semibold text-gray-700">Code professionnel</span>
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Entrez votre code pro..."
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff9900] focus:border-transparent transition-all uppercase"
                  />
                  <button
                    onClick={validatePromoCode}
                    disabled={checkingCode || !promoCode.trim()}
                    className="px-4 py-2 bg-[#ff9900] hover:bg-[#f0c300] text-white font-semibold rounded-lg transition-all disabled:opacity-50"
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
                <div className="mt-4 flex items-center gap-2 text-sm text-gray-600">
                  <span className="font-semibold">{filteredProducts.length}</span>
                  <span>produit{filteredProducts.length > 1 ? 's' : ''} trouvé{filteredProducts.length > 1 ? 's' : ''}</span>
                  <button
                    onClick={() => {
                      setSelectedCategory('all');
                      setSearchTerm('');
                    }}
                    className="ml-auto text-[#ff9900] hover:text-[#f0c300] font-semibold transition-colors"
                  >
                    Réinitialiser les filtres
                  </button>
                </div>
              )}
            </div>

            {/* Products Grid */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map(product => {
                  const priceInfo = formatPrice(product);
                  const isInCart = items.some(item => item.id === product.id);
                  
                  return (
                    <div
                      key={product.id}
                      className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-2xl transition-all duration-300 group flex flex-col h-full relative"
                    >
                      {/* Badge si dans le panier */}
                      {isInCart && (
                        <div className="absolute top-2 right-2 z-10 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                          ✓ Dans le panier
                        </div>
                      )}
                      
                      {/* Product Image */}
                      {product.image_url && (
                        <div className="relative bg-gradient-to-br from-gray-50 via-white to-gray-100 p-6">
                          <img
                            src={product.image_url}
                            alt={product.name}
                            className="w-full h-40 object-contain group-hover:scale-110 transition-transform duration-500"
                          />
                        </div>
                      )}

                      {/* Card Body */}
                      <div className="p-5 flex-grow flex flex-col">
                        <h3 className="text-base font-bold text-gray-900 mb-2 group-hover:text-[#ff9900] transition-colors line-clamp-2">
                          {product.name}
                        </h3>

                        {product.description && (
                          <p className="text-gray-600 text-sm mb-3 line-clamp-2 flex-grow">
                            {product.description}
                          </p>
                        )}

                        {/* Features */}
                        {product.features && product.features.length > 0 && (
                          <ul className="space-y-1 mb-3 text-xs text-gray-500">
                            {product.features.slice(0, 2).map((feature, idx) => (
                              <li key={idx} className="flex items-start gap-1">
                                <ChevronRight className="w-3 h-3 text-[#ff9900] mt-0.5 flex-shrink-0" />
                                <span className="line-clamp-1">{feature}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>

                      {/* Card Footer */}
                      <div className="p-5 pt-0 border-t border-gray-100 bg-gray-50">
                        {/* Prix */}
                        {priceInfo && (
                          <div className="mb-3">
                            {validatedCode ? (
                              <div className="flex items-center gap-2">
                                <span className="text-gray-400 line-through text-sm">{priceInfo.mainPrice.toFixed(2)}€</span>
                                <span className="text-xl font-bold text-green-600">
                                  {getDiscountedPrice(priceInfo.mainPrice).toFixed(2)}€
                                </span>
                                <span className="text-xs text-gray-500">HT</span>
                              </div>
                            ) : (
                              <div>
                                <span className="text-xl font-bold text-[#ff9900]">{priceInfo.mainPrice.toFixed(2)}€</span>
                                <span className="text-xs text-gray-500"> HT/{priceInfo.mainLabel}</span>
                                {priceInfo.subPrice && (
                                  <div className="text-xs text-gray-400">
                                    soit {priceInfo.subPrice.toFixed(2)}€{priceInfo.subLabel}
                                  </div>
                                )}
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
                            className="inline-flex items-center gap-1 text-xs text-gray-500 hover:text-[#ff9900] transition-colors mb-3"
                          >
                            <Download className="w-3 h-3" />
                            Fiche technique
                          </a>
                        )}

                        {/* CTA - Ajouter au panier */}
                        <button
                          onClick={() => handleAddToCart(product)}
                          className="inline-flex items-center gap-2 bg-[#ff9900] hover:bg-[#f0c300] text-white px-4 py-2 rounded-lg font-bold text-sm transition-all w-full justify-center"
                        >
                          <ShoppingCart className="w-4 h-4" />
                          Ajouter au panier
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
                <div className="text-gray-400 mb-4">
                  <Search className="w-16 h-16 mx-auto" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Aucun produit trouvé
                </h3>
                <p className="text-gray-600 mb-6">
                  Essayez d'autres critères de recherche
                </p>
                <button
                  onClick={() => {
                    setSelectedCategory('all');
                    setSearchTerm('');
                  }}
                  className="inline-flex items-center gap-2 bg-[#ff9900] hover:bg-[#f0c300] text-white px-6 py-3 rounded-lg font-bold transition-colors"
                >
                  Voir tous les produits
                </button>
              </div>
            )}

            {/* CTA Section */}
            <div className="mt-16 bg-gradient-to-r from-[#ff9900] to-[#f0c300] rounded-2xl p-8 md:p-12 shadow-2xl">
              <div className="text-center">
                <h2 className="text-3xl font-bold text-white mb-4">
                  Franco de port dès 630€ HT
                </h2>
                <p className="text-white/90 mb-8 max-w-2xl mx-auto text-lg">
                  Livraison France entière en 48-72h • Produits Pallmann 100% authentiques • Support expert
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-2 bg-white hover:bg-gray-100 text-[#ff9900] px-8 py-4 rounded-lg font-bold text-lg transition-all shadow-lg hover:scale-105"
                  >
                    Demander un devis
                    <ChevronRight className="w-5 h-5" />
                  </Link>
                  <a
                    href="tel:+33604440903"
                    className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-8 py-4 rounded-lg font-bold text-lg transition-all shadow-lg hover:scale-105"
                  >
                    <Phone className="w-5 h-5" />
                    06 04 44 09 03
                  </a>
                </div>
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
