import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { supabase } from '../lib/supabase';
import { ShoppingCart, ExternalLink, Filter, Search, Home, ChevronRight, Download, Phone, Tag, CheckCircle, XCircle } from 'lucide-react';

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

const BoutiquePage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
  const [bestSellers, setBestSellers] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Code promo pro
  const [promoCode, setPromoCode] = useState('');
  const [validatedCode, setValidatedCode] = useState<CompanyCode | null>(null);
  const [codeError, setCodeError] = useState('');
  const [checkingCode, setCheckingCode] = useState(false);

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

      const bestSellerSlugs = ['pall-x-extreme-mat-ka', 'pall-x-320', 'magic-oil-2k-change'];
      const bestSellerProducts = enrichedProducts.filter(p => bestSellerSlugs.includes(p.slug));
      setBestSellers(bestSellerProducts);
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
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#d9b45a] mx-auto"></div>
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
        <title>Boutique Produits Pallmann - Vitrificateurs, Huiles, Machines | Les Ponceurs Réunis</title>
        <meta name="description" content="Achetez vos produits Pallmann en ligne : vitrificateurs, huiles, colles, machines et accessoires pour parquet. Livraison rapide et conseils experts." />
        <meta name="keywords" content="acheter Pallmann, boutique parquet, vitrificateur achat, huile parquet, ponceuse Pallmann achat" />
        <meta property="og:title" content="Boutique Produits Pallmann - Vitrificateurs, Huiles, Machines" />
        <meta property="og:description" content="Achetez vos produits Pallmann professionnels en ligne" />
        <link rel="canonical" href="https://ponceur-parquet.fr/boutique" />
      </Helmet>

      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />

        <main className="flex-grow pt-24 pb-16">
          {/* Breadcrumb Navigation */}
          <div className="bg-white border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
              <nav className="flex items-center space-x-2 text-sm">
                <Link to="/" className="text-gray-500 hover:text-[#d9b45a] transition-colors flex items-center gap-1">
                  <Home className="w-4 h-4" />
                  <span>Accueil</span>
                </Link>
                <ChevronRight className="w-4 h-4 text-gray-400" />
                <span className="text-gray-900 font-semibold">Boutique</span>
              </nav>
            </div>
          </div>

          {/* Orange Header Section - Pallmann Style */}
          <div className="bg-gradient-to-r from-[#ff9900] to-[#f0c300] py-12 shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center">
                <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm border border-white/40 text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
                  <ShoppingCart className="w-4 h-4" />
                  Boutique en ligne
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                  Produits Pallmann
                </h1>
                <p className="text-xl text-white/90 max-w-3xl mx-auto">
                  Découvrez et achetez nos produits professionnels. Vitrificateurs, huiles, machines et accessoires de qualité supérieure.
                </p>
              </div>
            </div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">

            {/* Best Sellers Section - Pallmann Style */}
            {bestSellers.length > 0 && (
              <div className="bg-gradient-to-br from-[#ff9900] to-[#f0c300] rounded-2xl shadow-2xl p-8 mb-8 border-4 border-white/30">
                <div className="text-center mb-6">
                  <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm border border-white/40 text-white px-4 py-2 rounded-full text-sm font-bold mb-3">
                    <ShoppingCart className="w-4 h-4" />
                    Les plus vendus
                  </div>
                  <h2 className="text-3xl font-bold text-white mb-2">
                    Nos {bestSellers.length} produits les plus vendus
                  </h2>
                  <p className="text-white/90 text-lg">
                    Les favoris de nos clients professionnels
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {bestSellers.map((product, index) => (
                    <div
                      key={product.id}
                      className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 group flex flex-col h-full relative"
                    >
                      {/* Badge numéro */}
                      <div className="absolute top-4 left-4 z-20">
                        <div className="bg-[#ff9900] text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg shadow-lg">
                          {index + 1}
                        </div>
                      </div>

                      {/* Product Image */}
                      {product.image_url && (
                        <div className="relative bg-gradient-to-br from-gray-50 via-white to-gray-100 p-6 pt-16">
                          <img
                            src={product.image_url}
                            alt={product.name}
                            className="w-full h-40 object-contain group-hover:scale-110 transition-transform duration-500"
                          />
                        </div>
                      )}

                      {/* Card Body */}
                      <div className="p-6 flex-grow flex flex-col">
                        <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-[#ff9900] transition-colors">
                          {product.name}
                          {product.subcategory_name && (
                            <span className="block text-sm font-semibold text-gray-600 mt-1">
                              {product.subcategory_name}
                            </span>
                          )}
                        </h3>

                        {product.description && (
                          <p className="text-gray-700 text-sm mb-4 line-clamp-2 flex-grow">
                            {product.description}
                          </p>
                        )}

                        {/* Features */}
                        {product.features && product.features.length > 0 && (
                          <ul className="space-y-1 mb-4 border-t border-gray-100 pt-3">
                            {product.features.slice(0, 2).map((feature, idx) => (
                              <li key={idx} className="text-xs text-gray-600 flex items-start gap-2">
                                <ChevronRight className="w-3 h-3 text-[#ff9900] mt-0.5 flex-shrink-0" />
                                <span className="line-clamp-1">{feature}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>

                      {/* Card Footer */}
                      <div className="p-6 pt-0">
                        <Link
                          to={`/boutique/contact?produit=${encodeURIComponent(product.name)}`}
                          className="inline-flex items-center gap-2 bg-[#ff9900] hover:bg-[#f0c300] text-white px-6 py-3 rounded-lg font-bold text-sm transition-all w-full justify-center shadow-md hover:shadow-lg group-hover:scale-105"
                        >
                          <ShoppingCart className="w-4 h-4" />
                          Acheter
                          <ChevronRight className="w-4 h-4" />
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Filters Section - Pallmann Style */}
            <div className="bg-white rounded-xl shadow-md p-6 mb-8 border-l-4 border-[#ff9900]">
              <div className="flex items-center gap-2 mb-4">
                <Filter className="w-5 h-5 text-[#ff9900]" />
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
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff9900] focus:border-transparent transition-all"
                  />
                </div>

                {/* Category Filter */}
                <select
                  value={selectedCategory}
                  onChange={(e) => {
                    setSelectedCategory(e.target.value);
                    setSelectedSubcategory('all');
                  }}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff9900] focus:border-transparent transition-all"
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
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff9900] focus:border-transparent transition-all disabled:bg-gray-100"
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
                    className="ml-auto text-[#ff9900] hover:text-[#f0c300] font-semibold transition-colors"
                  >
                    Réinitialiser les filtres
                  </button>
                </div>
              )}
            </div>

            {/* Products Grid - Pallmann Style */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProducts.map(product => (
                  <div
                    key={product.id}
                    className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-2xl transition-all duration-300 group flex flex-col h-full"
                  >
                    {/* Tag Container - Pallmann Style */}
                    <div className="absolute top-0 left-0 right-0 z-10 p-3">
                      {product.category_name && (
                        <span className="inline-block bg-[#ff9900] text-white px-3 py-1 rounded-md text-xs font-bold shadow-lg">
                          {product.category_name}
                        </span>
                      )}
                    </div>

                    {/* Product Image with Gradient Background */}
                    {product.image_url && (
                      <div className="relative bg-gradient-to-br from-gray-50 via-white to-gray-100 p-8 pt-16">
                        <img
                          src={product.image_url}
                          alt={product.name}
                          className="w-full h-48 object-contain group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                    )}

                    {/* Card Body - Pallmann Style */}
                    <div className="p-6 flex-grow flex flex-col">
                      {/* Product Name with Subheader */}
                      <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-[#ff9900] transition-colors">
                        {product.name}
                        {product.subcategory_name && (
                          <span className="block text-sm font-semibold text-gray-600 mt-1">
                            {product.subcategory_name}
                          </span>
                        )}
                      </h3>

                      {/* Description */}
                      {product.description && (
                        <p className="text-gray-700 text-sm mb-4 line-clamp-3 flex-grow">
                          {product.description}
                        </p>
                      )}

                      {/* Features List */}
                      {product.features && product.features.length > 0 && (
                        <ul className="space-y-1 mb-4 border-t border-gray-100 pt-3">
                          {product.features.slice(0, 2).map((feature, idx) => (
                            <li key={idx} className="text-xs text-gray-600 flex items-start gap-2">
                              <ChevronRight className="w-3 h-3 text-[#ff9900] mt-0.5 flex-shrink-0" />
                              <span className="line-clamp-1">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>

                    {/* Card Footer - Pallmann Style */}
                    <div className="p-6 pt-0 bg-gradient-to-t from-gray-50 to-white border-t border-gray-100">
                      {/* Prix */}
                      {product.price_public_ht && (
                        <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                          {validatedCode ? (
                            <div className="flex items-center justify-between">
                              <div>
                                <span className="text-gray-400 line-through text-sm">{product.price_public_ht.toFixed(2)}€</span>
                                <span className="ml-2 text-2xl font-bold text-green-600">
                                  {getDiscountedPrice(product.price_public_ht).toFixed(2)}€
                                </span>
                                <span className="text-sm text-gray-500"> HT/{product.unit || 'L'}</span>
                              </div>
                              <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded">
                                -{validatedCode.discount_percent}%
                              </span>
                            </div>
                          ) : (
                            <div>
                              <span className="text-2xl font-bold text-[#ff9900]">{product.price_public_ht.toFixed(2)}€</span>
                              <span className="text-sm text-gray-500"> HT/{product.unit || 'L'}</span>
                            </div>
                          )}
                          <p className="text-xs text-gray-400 mt-1">TVA 20% en sus • Franco 630€ HT</p>
                        </div>
                      )}

                      {/* Download Link */}
                      {product.pdf_url && (
                        <div className="mb-3">
                          <a
                            href={product.pdf_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-[#ff9900] transition-colors"
                          >
                            <Download className="w-4 h-4" />
                            <span>Fiche technique produit</span>
                          </a>
                        </div>
                      )}

                      {/* Contact Actions */}
                      <div className="flex flex-col gap-3">
                        <Link
                          to={`/boutique/contact?produit=${encodeURIComponent(product.name)}`}
                          className="inline-flex items-center gap-2 bg-[#ff9900] hover:bg-[#f0c300] text-white px-6 py-3 rounded-lg font-bold text-sm transition-all w-full justify-center shadow-md hover:shadow-lg group-hover:scale-105"
                        >
                          <ShoppingCart className="w-4 h-4" />
                          Acheter ce produit
                          <ChevronRight className="w-4 h-4" />
                        </Link>
                        <a
                          href="tel:+33757821306"
                          className="inline-flex items-center gap-2 bg-gray-700 hover:bg-gray-800 text-white px-6 py-3 rounded-lg font-semibold text-sm transition-all w-full justify-center"
                        >
                          <Phone className="w-4 h-4" />
                          07 57 82 13 06
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
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
                  Essayez de modifier vos critères de recherche ou réinitialisez les filtres.
                </p>
                <button
                  onClick={() => {
                    setSelectedCategory('all');
                    setSelectedSubcategory('all');
                    setSearchTerm('');
                  }}
                  className="inline-flex items-center gap-2 bg-[#d9b45a] hover:bg-[#c9a54a] text-slate-900 px-6 py-3 rounded-lg font-bold transition-colors"
                >
                  Réinitialiser les filtres
                </button>
              </div>
            )}

            {/* CTA Section - Pallmann Style */}
            <div className="mt-16 bg-gradient-to-r from-[#ff9900] to-[#f0c300] rounded-2xl p-8 md:p-12 shadow-2xl">
              <div className="text-center">
                <h2 className="text-3xl font-bold text-white mb-4">
                  Besoin de conseils pour vos achats ?
                </h2>
                <p className="text-white/90 mb-8 max-w-2xl mx-auto text-lg">
                  Notre équipe d'experts est disponible pour vous accompagner dans le choix de vos produits Pallmann.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Link
                    to="/#formulaire"
                    className="inline-flex items-center gap-2 bg-white hover:bg-gray-100 text-[#ff9900] px-8 py-4 rounded-lg font-bold text-lg transition-all shadow-lg hover:scale-105"
                  >
                    Demander conseil
                    <ChevronRight className="w-5 h-5" />
                  </Link>
                  <a
                    href="tel:0757821306"
                    className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-8 py-4 rounded-lg font-bold text-lg transition-all shadow-lg hover:scale-105"
                  >
                    07 57 82 13 06
                  </a>
                  <a
                    href="https://www.parquetetsol.fr"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white px-8 py-4 rounded-lg font-bold text-lg transition-all shadow-lg border-2 border-white/30"
                  >
                    Boutique complète
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>

                {/* CGV Link */}
                <div className="mt-6">
                  <Link
                    to="/cgv-boutique"
                    className="text-white/80 hover:text-white underline text-sm transition-colors"
                  >
                    Consulter les Conditions Générales de Vente de la boutique
                  </Link>
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
