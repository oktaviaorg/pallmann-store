import React, { useState, useEffect, useMemo } from 'react';
import { Helmet } from 'react-helmet';
import { supabase } from '../lib/supabase';
import { Search, Plus, Minus, Trash2, Send, FileText, Percent, User, Mail, Phone, Lock, Calculator, Lightbulb, ShoppingBag, Package } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  slug: string;
  price_public_ht: number;
  image_url: string;
  ref: string;
}

interface QuoteItem {
  product: Product;
  quantity: number;
}

export default function AdminQuotePage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [quoteItems, setQuoteItems] = useState<QuoteItem[]>([]);
  const [discountPercent, setDiscountPercent] = useState(0);
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    phone: '',
    notes: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [surfaceM2, setSurfaceM2] = useState(0);
  const [showCalculator, setShowCalculator] = useState(false);
  const [suggestedProducts, setSuggestedProducts] = useState<Product[]>([]);

  // Produits suggérés basés sur le panier
  const suggestions = useMemo(() => {
    const hasVitrificateur = quoteItems.some(i => 
      i.product.name.toLowerCase().includes('pall-x') || 
      i.product.name.toLowerCase().includes('vitrificateur')
    );
    const hasHuile = quoteItems.some(i => 
      i.product.name.toLowerCase().includes('magic oil') || 
      i.product.name.toLowerCase().includes('huile') ||
      i.product.name.toLowerCase().includes('hardwaxoil')
    );
    const hasFondDur = quoteItems.some(i => 
      i.product.name.toLowerCase().includes('base') || 
      i.product.name.toLowerCase().includes('fond dur')
    );
    const hasRouleau = quoteItems.some(i => 
      i.product.name.toLowerCase().includes('rouleau')
    );
    const hasAbrasif = quoteItems.some(i => 
      i.product.name.toLowerCase().includes('disque') || 
      i.product.name.toLowerCase().includes('bande') ||
      i.product.name.toLowerCase().includes('abrasif')
    );

    const tips: string[] = [];
    
    if (hasVitrificateur && !hasFondDur) {
      tips.push("💡 Proposer un FOND DUR (PALL-X BASE ou PALL-X ZERO BASE) pour meilleure accroche");
    }
    if (hasVitrificateur && !hasRouleau) {
      tips.push("🖌️ Proposer un ROULEAU adapté (Aqua SP 8mm pour vitrificateur)");
    }
    if (hasHuile && !hasRouleau) {
      tips.push("🖌️ Proposer un ROULEAU pour huile (Mohair Aqua 11mm)");
    }
    if ((hasVitrificateur || hasHuile) && !hasAbrasif) {
      tips.push("⚙️ Proposer des ABRASIFS pour la préparation (grains 60, 80, 120)");
    }
    if (hasVitrificateur) {
      tips.push("🧴 Proposer CLEAN & GO ou FINISH CARE pour l'entretien");
    }
    if (hasHuile) {
      tips.push("🧴 Proposer MAGIC OIL CARE pour l'entretien des parquets huilés");
    }
    if (quoteItems.length > 0 && !quoteItems.some(i => i.product.name.toLowerCase().includes('joint'))) {
      tips.push("🔧 Proposer du JOINT À PARQUET si rénovation complète");
    }

    return tips;
  }, [quoteItems]);

  // Calculateur de rendement
  const calculatedQuantities = useMemo(() => {
    if (surfaceM2 <= 0) return null;
    
    return {
      vitrificateur_5L: Math.ceil(surfaceM2 / 50), // ~10m²/L, 2 couches
      vitrificateur_10L: Math.ceil(surfaceM2 / 100),
      huile_2_5L: Math.ceil(surfaceM2 / 30), // ~12m²/L
      huile_5L: Math.ceil(surfaceM2 / 60),
      fondDur_5L: Math.ceil(surfaceM2 / 60), // ~12m²/L
      fondDur_10L: Math.ceil(surfaceM2 / 120),
    };
  }, [surfaceM2]);

  // Simple auth (à améliorer avec un vrai système)
  const ADMIN_PASSWORD = 'Lematoubleu1789'; // À changer en variable d'env

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      localStorage.setItem('admin_auth', 'true');
    } else {
      setError('Mot de passe incorrect');
    }
  };

  useEffect(() => {
    if (localStorage.getItem('admin_auth') === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  // Recherche de produits
  useEffect(() => {
    const searchProducts = async () => {
      if (searchTerm.length < 2) {
        setSearchResults([]);
        return;
      }

      const { data } = await supabase
        .from('pallmann_products')
        .select('id, name, slug, price_public_ht, image_url, ref')
        .eq('published', true)
        .gt('price_public_ht', 0)
        .or(`name.ilike.%${searchTerm}%,ref.ilike.%${searchTerm}%`)
        .limit(10);

      setSearchResults(data || []);
    };

    const debounce = setTimeout(searchProducts, 300);
    return () => clearTimeout(debounce);
  }, [searchTerm]);

  const addProduct = (product: Product) => {
    const existing = quoteItems.find(item => item.product.id === product.id);
    if (existing) {
      setQuoteItems(quoteItems.map(item =>
        item.product.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setQuoteItems([...quoteItems, { product, quantity: 1 }]);
    }
    setSearchTerm('');
    setSearchResults([]);
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      setQuoteItems(quoteItems.filter(item => item.product.id !== productId));
    } else {
      setQuoteItems(quoteItems.map(item =>
        item.product.id === productId ? { ...item, quantity } : item
      ));
    }
  };

  const removeItem = (productId: string) => {
    setQuoteItems(quoteItems.filter(item => item.product.id !== productId));
  };

  // Calculs
  const subtotalHT = quoteItems.reduce((sum, item) => sum + item.product.price_public_ht * item.quantity, 0);
  const discountAmount = subtotalHT * (discountPercent / 100);
  const totalHT = subtotalHT - discountAmount;
  const totalTTC = totalHT * 1.20;

  const handleSendQuote = async () => {
    if (!customerInfo.email || !customerInfo.name || quoteItems.length === 0) {
      setError('Veuillez remplir le nom, email et ajouter au moins un produit');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await fetch('/api/create-admin-quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: quoteItems.map(item => ({
            id: item.product.id,
            name: item.product.name,
            price_ht: item.product.price_public_ht,
            quantity: item.quantity,
            ref: item.product.ref,
          })),
          customerInfo,
          discountPercent,
          subtotalHT,
          discountAmount,
          totalHT,
          totalTTC,
        }),
      });

      const data = await response.json();

      if (data.error) {
        setError(data.error);
      } else {
        setSuccess(`✅ Devis envoyé à ${customerInfo.email} ! Lien de paiement: ${data.paymentUrl}`);
        // Reset form
        setQuoteItems([]);
        setCustomerInfo({ name: '', email: '', phone: '', notes: '' });
        setDiscountPercent(0);
      }
    } catch (err: any) {
      setError('Erreur lors de l\'envoi du devis');
    } finally {
      setLoading(false);
    }
  };

  // Page de login
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full">
          <div className="text-center mb-6">
            <Lock className="w-12 h-12 text-[#FF9900] mx-auto mb-3" />
            <h1 className="text-2xl font-bold text-gray-900">Admin Devis</h1>
            <p className="text-gray-600">Pallmann Store</p>
          </div>
          <form onSubmit={handleLogin}>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Mot de passe admin"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg mb-4 focus:ring-2 focus:ring-[#FF9900]"
            />
            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
            <button
              type="submit"
              className="w-full bg-[#FF9900] hover:bg-[#E68A00] text-white py-3 rounded-lg font-bold"
            >
              Connexion
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Helmet>
        <title>Admin - Créer un devis | Pallmann Store</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      {/* Header */}
      <header className="bg-[#1a1a1a] text-white py-4 px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <FileText className="w-6 h-6 text-[#FF9900]" />
            <h1 className="text-xl font-bold">Créer un devis</h1>
          </div>
          <button
            onClick={() => {
              localStorage.removeItem('admin_auth');
              setIsAuthenticated(false);
            }}
            className="text-gray-400 hover:text-white text-sm"
          >
            Déconnexion
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-6">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Colonne gauche: Recherche + Produits */}
          <div className="lg:col-span-2 space-y-6">
            {/* Recherche */}
            <div className="bg-white rounded-xl shadow p-6">
              <h2 className="font-bold text-lg mb-4 flex items-center gap-2">
                <Search className="w-5 h-5 text-[#FF9900]" />
                Ajouter des produits
              </h2>
              <div className="relative">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Rechercher par nom ou référence..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF9900]"
                />
                {searchResults.length > 0 && (
                  <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg mt-1 max-h-80 overflow-y-auto z-10">
                    {searchResults.map(product => (
                      <button
                        key={product.id}
                        onClick={() => addProduct(product)}
                        className="w-full flex items-center gap-3 p-3 hover:bg-gray-50 border-b border-gray-100 text-left"
                      >
                        {product.image_url && (
                          <img src={product.image_url} alt="" className="w-12 h-12 object-contain" />
                        )}
                        <div className="flex-grow">
                          <p className="font-medium text-gray-900 text-sm">{product.name}</p>
                          <p className="text-xs text-gray-500">Réf: {product.ref}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-[#FF9900]">{product.price_public_ht.toFixed(2)}€ HT</p>
                        </div>
                        <Plus className="w-5 h-5 text-green-500" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {{/* Calculateur de surface */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl shadow p-6 border border-blue-200">
              <button 
                onClick={() => setShowCalculator(!showCalculator)}
                className="w-full flex items-center justify-between"
              >
                <h2 className="font-bold text-lg flex items-center gap-2 text-blue-800">
                  <Calculator className="w-5 h-5" />
                  Calculateur de quantités
                </h2>
                <span className="text-blue-600">{showCalculator ? '▲' : '▼'}</span>
              </button>
              
              {showCalculator && (
                <div className="mt-4 space-y-4">
                  <div className="flex items-center gap-4">
                    <label className="font-medium text-gray-700">Surface à traiter :</label>
                    <input
                      type="number"
                      value={surfaceM2 || ''}
                      onChange={(e) => setSurfaceM2(parseInt(e.target.value) || 0)}
                      placeholder="m²"
                      className="w-24 px-3 py-2 border border-gray-300 rounded-lg text-center"
                    />
                    <span className="text-gray-600">m²</span>
                  </div>
                  
                  {calculatedQuantities && (
                    <div className="grid grid-cols-2 gap-3 mt-4">
                      <div className="bg-white p-3 rounded-lg border">
                        <p className="text-sm text-gray-600">Vitrificateur (2 couches)</p>
                        <p className="font-bold text-lg">{calculatedQuantities.vitrificateur_5L} × 5L <span className="text-gray-400 text-sm">ou</span> {calculatedQuantities.vitrificateur_10L} × 10L</p>
                      </div>
                      <div className="bg-white p-3 rounded-lg border">
                        <p className="text-sm text-gray-600">Huile (1 couche)</p>
                        <p className="font-bold text-lg">{calculatedQuantities.huile_2_5L} × 2.5L <span className="text-gray-400 text-sm">ou</span> {calculatedQuantities.huile_5L} × 5L</p>
                      </div>
                      <div className="bg-white p-3 rounded-lg border">
                        <p className="text-sm text-gray-600">Fond dur (1 couche)</p>
                        <p className="font-bold text-lg">{calculatedQuantities.fondDur_5L} × 5L <span className="text-gray-400 text-sm">ou</span> {calculatedQuantities.fondDur_10L} × 10L</p>
                      </div>
                      <div className="bg-white p-3 rounded-lg border">
                        <p className="text-sm text-gray-600">Conseil</p>
                        <p className="text-sm text-blue-600">Prévoir +10% pour pertes/retouches</p>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Suggestions intelligentes */}
            {suggestions.length > 0 && (
              <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl shadow p-6 border border-amber-200">
                <h2 className="font-bold text-lg flex items-center gap-2 text-amber-800 mb-3">
                  <Lightbulb className="w-5 h-5" />
                  Suggestions de vente
                </h2>
                <ul className="space-y-2">
                  {suggestions.map((tip, index) => (
                    <li key={index} className="text-gray-700 bg-white px-3 py-2 rounded-lg border border-amber-100">
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Liste des produits du devis */}
            <div className="bg-white rounded-xl shadow p-6">
              <h2 className="font-bold text-lg mb-4">Produits du devis ({quoteItems.length})</h2>
              
              {quoteItems.length === 0 ? (
                <p className="text-gray-500 text-center py-8">Aucun produit ajouté</p>
              ) : (
                <div className="space-y-3">
                  {quoteItems.map(item => (
                    <div key={item.product.id} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                      {item.product.image_url && (
                        <img src={item.product.image_url} alt="" className="w-16 h-16 object-contain" />
                      )}
                      <div className="flex-grow">
                        <p className="font-medium text-gray-900">{item.product.name}</p>
                        <p className="text-sm text-gray-500">Réf: {item.product.ref} • {item.product.price_public_ht.toFixed(2)}€ HT/u</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="p-1 rounded bg-gray-200 hover:bg-gray-300"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-10 text-center font-bold">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="p-1 rounded bg-gray-200 hover:bg-gray-300"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="font-bold text-gray-900 w-24 text-right">
                        {(item.product.price_public_ht * item.quantity).toFixed(2)}€
                      </p>
                      <button
                        onClick={() => removeItem(item.product.id)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Colonne droite: Client + Totaux */}
          <div className="space-y-6">
            {/* Infos client */}
            <div className="bg-white rounded-xl shadow p-6">
              <h2 className="font-bold text-lg mb-4 flex items-center gap-2">
                <User className="w-5 h-5 text-[#FF9900]" />
                Informations client
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nom / Entreprise *</label>
                  <input
                    type="text"
                    value={customerInfo.name}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF9900]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                  <input
                    type="email"
                    value={customerInfo.email}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, email: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF9900]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Téléphone</label>
                  <input
                    type="tel"
                    value={customerInfo.phone}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF9900]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Notes internes</label>
                  <textarea
                    value={customerInfo.notes}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, notes: e.target.value })}
                    rows={2}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF9900]"
                    placeholder="Notes pour vous (non envoyées au client)"
                  />
                </div>
              </div>
            </div>

            {/* Remise */}
            <div className="bg-white rounded-xl shadow p-6">
              <h2 className="font-bold text-lg mb-4 flex items-center gap-2">
                <Percent className="w-5 h-5 text-[#FF9900]" />
                Remise
              </h2>
              <div className="flex items-center gap-3">
                <input
                  type="number"
                  min="0"
                  max="50"
                  value={discountPercent}
                  onChange={(e) => setDiscountPercent(Math.min(50, Math.max(0, parseInt(e.target.value) || 0)))}
                  className="w-24 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF9900] text-center"
                />
                <span className="text-gray-600">%</span>
                {discountAmount > 0 && (
                  <span className="text-green-600 font-medium">-{discountAmount.toFixed(2)}€</span>
                )}
              </div>
            </div>

            {/* Totaux */}
            <div className="bg-white rounded-xl shadow p-6">
              <h2 className="font-bold text-lg mb-4">Récapitulatif</h2>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Sous-total HT</span>
                  <span>{subtotalHT.toFixed(2)}€</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Remise ({discountPercent}%)</span>
                    <span>-{discountAmount.toFixed(2)}€</span>
                  </div>
                )}
                <div className="flex justify-between font-bold border-t pt-2">
                  <span>Total HT</span>
                  <span>{totalHT.toFixed(2)}€</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>TVA (20%)</span>
                  <span>{(totalTTC - totalHT).toFixed(2)}€</span>
                </div>
                <div className="flex justify-between font-bold text-xl text-[#FF9900] pt-2 border-t">
                  <span>Total TTC</span>
                  <span>{totalTTC.toFixed(2)}€</span>
                </div>
              </div>
            </div>

            {/* Bouton envoi */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}
            {success && (
              <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
                {success}
              </div>
            )}
            <button
              onClick={handleSendQuote}
              disabled={loading || quoteItems.length === 0}
              className="w-full bg-[#FF9900] hover:bg-[#E68A00] disabled:bg-gray-300 text-white py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2"
            >
              {loading ? (
                'Envoi en cours...'
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  Envoyer le devis
                </>
              )}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
