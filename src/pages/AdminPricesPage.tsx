import React, { useState, useEffect, useMemo } from 'react';
import { Helmet } from 'react-helmet';
import { supabase } from '../lib/supabase';
import { 
  Search, Lock, Filter, TrendingUp, DollarSign, Package, 
  Percent, Download, RefreshCw, Eye, EyeOff, ChevronDown
} from 'lucide-react';

interface Product {
  id: string;
  name: string;
  ref: string;
  unit: string;
  pack_size: number;
  price_achat: number | null;
  price_public_ht: number;
  category_id: string;
  published: boolean;
}

interface Category {
  id: string;
  name: string;
  display_order: number;
}

export default function AdminPricesPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showMargins, setShowMargins] = useState(true);
  const [sortBy, setSortBy] = useState<'name' | 'margin' | 'price'>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  // Protection anti-scrapping: mot de passe simple
  const ADMIN_PASSWORD = 'Lematoubleu1789';

  // Vérification du rate limiting côté client (basique)
  useEffect(() => {
    const attempts = parseInt(localStorage.getItem('adminLoginAttempts') || '0');
    const lastAttempt = parseInt(localStorage.getItem('adminLastAttempt') || '0');
    const now = Date.now();
    
    // Reset après 15 minutes
    if (now - lastAttempt > 15 * 60 * 1000) {
      localStorage.setItem('adminLoginAttempts', '0');
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    const attempts = parseInt(localStorage.getItem('adminLoginAttempts') || '0');
    if (attempts >= 5) {
      alert('Trop de tentatives. Réessayez dans 15 minutes.');
      return;
    }

    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      localStorage.setItem('adminLoginAttempts', '0');
      loadData();
    } else {
      localStorage.setItem('adminLoginAttempts', String(attempts + 1));
      localStorage.setItem('adminLastAttempt', String(Date.now()));
      alert('Mot de passe incorrect');
    }
  };

  const loadData = async () => {
    setLoading(true);
    try {
      // Charger les catégories
      const { data: catData } = await supabase
        .from('pallmann_categories')
        .select('id, name, display_order')
        .order('display_order');
      
      if (catData) setCategories(catData);

      // Charger les produits
      const { data: prodData } = await supabase
        .from('pallmann_products')
        .select('id, name, ref, unit, pack_size, price_achat, price_public_ht, category_id, published')
        .eq('published', true)
        .order('name');
      
      if (prodData) setProducts(prodData);
    } catch (err) {
      console.error('Erreur chargement:', err);
    }
    setLoading(false);
  };

  // Calcul de la marge
  const calculateMargin = (priceAchat: number | null, priceVente: number) => {
    if (!priceAchat || priceAchat === 0 || !priceVente) return { euros: 0, percent: 0 };
    const euros = priceVente - priceAchat;
    const percent = ((priceVente - priceAchat) / priceVente) * 100;
    return { euros, percent };
  };

  // Filtrage et tri des produits
  const filteredProducts = useMemo(() => {
    let result = products.filter(p => {
      const matchSearch = searchTerm === '' || 
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.ref.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchCategory = selectedCategory === 'all' || p.category_id === selectedCategory;
      
      return matchSearch && matchCategory;
    });

    // Tri
    result.sort((a, b) => {
      let comparison = 0;
      
      if (sortBy === 'name') {
        comparison = a.name.localeCompare(b.name);
      } else if (sortBy === 'price') {
        comparison = a.price_public_ht - b.price_public_ht;
      } else if (sortBy === 'margin') {
        const marginA = calculateMargin(a.price_achat, a.price_public_ht).percent;
        const marginB = calculateMargin(b.price_achat, b.price_public_ht).percent;
        comparison = marginA - marginB;
      }
      
      return sortOrder === 'asc' ? comparison : -comparison;
    });

    return result;
  }, [products, searchTerm, selectedCategory, sortBy, sortOrder]);

  // Export CSV
  const exportCSV = () => {
    const headers = ['Réf', 'Produit', 'Unité', 'Cond.', 'Prix Achat HT', 'Prix Vente HT', 'Marge €', 'Marge %'];
    const rows = filteredProducts.map(p => {
      const margin = calculateMargin(p.price_achat, p.price_public_ht);
      return [
        p.ref,
        `"${p.name}"`,
        p.unit,
        p.pack_size,
        p.price_achat?.toFixed(2) || '',
        p.price_public_ht.toFixed(2),
        margin.euros.toFixed(2),
        margin.percent.toFixed(1) + '%'
      ].join(';');
    });
    
    const csv = [headers.join(';'), ...rows].join('\n');
    const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `tarif-pallmann-${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  };

  // Statistiques globales
  const stats = useMemo(() => {
    const withMargin = filteredProducts.filter(p => p.price_achat && p.price_achat > 0);
    const totalMargin = withMargin.reduce((sum, p) => {
      return sum + calculateMargin(p.price_achat, p.price_public_ht).percent;
    }, 0);
    const avgMargin = withMargin.length > 0 ? totalMargin / withMargin.length : 0;
    
    return {
      totalProducts: filteredProducts.length,
      avgMargin: avgMargin.toFixed(1),
      withPriceAchat: withMargin.length
    };
  }, [filteredProducts]);

  // Écran de connexion
  if (!isAuthenticated) {
    return (
      <>
        <Helmet>
          <title>Administration - Accès restreint</title>
          <meta name="robots" content="noindex, nofollow, noarchive, nosnippet" />
          <meta name="googlebot" content="noindex, nofollow" />
        </Helmet>
        
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Lock className="w-8 h-8 text-amber-600" />
              </div>
              <h1 className="text-2xl font-bold text-gray-800">Accès Administration</h1>
              <p className="text-gray-500 mt-2">Tarifs & Marges - Zone restreinte</p>
            </div>
            
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Mot de passe
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  placeholder="••••••••"
                  autoComplete="current-password"
                />
              </div>
              
              <button
                type="submit"
                className="w-full bg-amber-600 hover:bg-amber-700 text-white font-semibold py-3 rounded-lg transition-colors"
              >
                Accéder aux tarifs
              </button>
            </form>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Tarifs & Marges - Admin Pallmann</title>
        <meta name="robots" content="noindex, nofollow, noarchive, nosnippet" />
        <meta name="googlebot" content="noindex, nofollow" />
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-800">📊 Tarifs & Marges</h1>
                <p className="text-sm text-gray-500">pallmann-store.com - Administration</p>
              </div>
              
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setShowMargins(!showMargins)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors ${
                    showMargins ? 'bg-green-50 border-green-200 text-green-700' : 'bg-gray-50 border-gray-200 text-gray-600'
                  }`}
                >
                  {showMargins ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                  {showMargins ? 'Marges visibles' : 'Marges masquées'}
                </button>
                
                <button
                  onClick={exportCSV}
                  className="flex items-center gap-2 px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg transition-colors"
                >
                  <Download className="w-4 h-4" />
                  Exporter CSV
                </button>
                
                <button
                  onClick={loadData}
                  disabled={loading}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
                >
                  <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                </button>
              </div>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-4 py-6">
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-white rounded-xl p-4 border border-gray-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Package className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Produits affichés</p>
                  <p className="text-xl font-bold text-gray-800">{stats.totalProducts}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl p-4 border border-gray-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Marge moyenne</p>
                  <p className="text-xl font-bold text-gray-800">{stats.avgMargin}%</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl p-4 border border-gray-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Avec prix d'achat</p>
                  <p className="text-xl font-bold text-gray-800">{stats.withPriceAchat}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Filtres */}
          <div className="bg-white rounded-xl p-4 border border-gray-200 mb-6">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex-1 min-w-[250px]">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Rechercher par nom ou référence..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  />
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-gray-500" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                >
                  <option value="all">Toutes catégories</option>
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </div>
              
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">Trier:</span>
                <select
                  value={`${sortBy}-${sortOrder}`}
                  onChange={(e) => {
                    const [by, order] = e.target.value.split('-');
                    setSortBy(by as 'name' | 'margin' | 'price');
                    setSortOrder(order as 'asc' | 'desc');
                  }}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                >
                  <option value="name-asc">Nom A-Z</option>
                  <option value="name-desc">Nom Z-A</option>
                  <option value="price-asc">Prix ↑</option>
                  <option value="price-desc">Prix ↓</option>
                  <option value="margin-desc">Marge ↓</option>
                  <option value="margin-asc">Marge ↑</option>
                </select>
              </div>
            </div>
          </div>

          {/* Tableau */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Réf.</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Produit</th>
                    <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase">Cond.</th>
                    {showMargins && (
                      <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 uppercase">Prix Achat</th>
                    )}
                    <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 uppercase">Prix Vente HT</th>
                    {showMargins && (
                      <>
                        <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 uppercase">Marge €</th>
                        <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 uppercase">Marge %</th>
                      </>
                    )}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {loading ? (
                    <tr>
                      <td colSpan={7} className="px-4 py-8 text-center text-gray-500">
                        <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2" />
                        Chargement...
                      </td>
                    </tr>
                  ) : filteredProducts.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="px-4 py-8 text-center text-gray-500">
                        Aucun produit trouvé
                      </td>
                    </tr>
                  ) : (
                    filteredProducts.map((product, index) => {
                      const margin = calculateMargin(product.price_achat, product.price_public_ht);
                      const marginColor = margin.percent >= 50 ? 'text-green-600' : 
                                         margin.percent >= 30 ? 'text-amber-600' : 
                                         margin.percent > 0 ? 'text-orange-600' : 'text-gray-400';
                      
                      return (
                        <tr key={product.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}>
                          <td className="px-4 py-3 font-mono text-sm text-gray-600">{product.ref}</td>
                          <td className="px-4 py-3">
                            <span className="font-medium text-gray-800">{product.name}</span>
                          </td>
                          <td className="px-4 py-3 text-center text-sm text-gray-600">
                            {product.pack_size > 1 ? `${product.pack_size}${product.unit}` : product.unit}
                          </td>
                          {showMargins && (
                            <td className="px-4 py-3 text-right font-medium text-gray-600">
                              {product.price_achat ? `${product.price_achat.toFixed(2)} €` : '-'}
                            </td>
                          )}
                          <td className="px-4 py-3 text-right font-semibold text-gray-800">
                            {product.price_public_ht.toFixed(2)} €
                          </td>
                          {showMargins && (
                            <>
                              <td className={`px-4 py-3 text-right font-medium ${marginColor}`}>
                                {margin.euros > 0 ? `+${margin.euros.toFixed(2)} €` : '-'}
                              </td>
                              <td className={`px-4 py-3 text-right font-bold ${marginColor}`}>
                                {margin.percent > 0 ? (
                                  <span className="inline-flex items-center gap-1">
                                    {margin.percent.toFixed(1)}%
                                    {margin.percent >= 50 && <TrendingUp className="w-3 h-3" />}
                                  </span>
                                ) : '-'}
                              </td>
                            </>
                          )}
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-6 text-center text-sm text-gray-500">
            <p>Les Ponceurs Réunis - pallmann-store.com</p>
            <p className="mt-1">Document confidentiel - Ne pas diffuser</p>
          </div>
        </div>
      </div>
    </>
  );
}
