import React, { useState, useEffect, useMemo } from 'react';
import { Helmet } from 'react-helmet';
import { supabase } from '../lib/supabase';
import { 
  Search, Plus, Minus, Trash2, Send, FileText, Percent, User, Mail, Phone, Lock, 
  Calculator, Lightbulb, ShoppingBag, Package, Ruler, Droplets, CheckCircle, 
  ArrowRight, Sparkles, Zap, ChevronDown, ChevronUp, RefreshCw, ClipboardCopy,
  MessageCircle, Camera, HelpCircle, CheckSquare, Square
} from 'lucide-react';

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

interface CalculatorProduct {
  id: string;
  name: string;
  description: string;
  quantity: number;
  unit: string;
  pricePerUnit: number;
  totalPrice: number;
  productSlug?: string;
  category: 'principal' | 'complementaire' | 'entretien';
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
  
  // ===== CALCULATEUR PRO =====
  const [showCalculator, setShowCalculator] = useState(true);
  const [surface, setSurface] = useState<number>(30);
  const [projectType, setProjectType] = useState<'renovation' | 'neuf'>('renovation');
  const [finishType, setFinishType] = useState<'vitrification' | 'huile'>('vitrification');
  
  // Options produits complémentaires
  const [includeLiant, setIncludeLiant] = useState<boolean>(true);
  const [includeSpatule, setIncludeSpatule] = useState<boolean>(true);
  const [includeRouleau, setIncludeRouleau] = useState<boolean>(true);
  const [includeNettoyant, setIncludeNettoyant] = useState<boolean>(true);
  const [includeEntretien, setIncludeEntretien] = useState<boolean>(true);
  const [includeAbrasifs, setIncludeAbrasifs] = useState<boolean>(true);
  
  // Produits Supabase pour suggestions
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [suggestedProducts, setSuggestedProducts] = useState<Product[]>([]);
  
  // Guide d'appel
  const [showCallGuide, setShowCallGuide] = useState(false);
  const [checkedQuestions, setCheckedQuestions] = useState<string[]>([]);
  const [copiedMessage, setCopiedMessage] = useState<string | null>(null);

  const ADMIN_PASSWORD = 'Lematoubleu1789';

  // ===== PRESETS SURFACE =====
  const surfacePresets = [20, 30, 50, 80, 100, 150];

  // ===== PACKS PRECONFIGURES =====
  const quickPacks = [
    {
      id: 'vitri-standard',
      name: '🛡️ Pack Vitrification',
      description: 'Fond dur + Vitrificateur + Accessoires',
      color: 'from-orange-500 to-amber-500',
      finishType: 'vitrification' as const,
    },
    {
      id: 'huile-standard',
      name: '🌿 Pack Huile Naturelle',
      description: 'Huile 2K + Accessoires + Entretien',
      color: 'from-green-500 to-emerald-500',
      finishType: 'huile' as const,
    },
    {
      id: 'reno-complete',
      name: '🔄 Pack Réno Complète',
      description: 'Tout inclus : liant, abrasifs, finition',
      color: 'from-blue-500 to-indigo-500',
      finishType: 'vitrification' as const,
      fullReno: true,
    },
  ];

  // ===== PRODUITS STARS (ajout rapide) =====
  const starProducts = [
    { name: 'PALL-X 96', slug: 'pall-x-96', emoji: '⭐' },
    { name: 'PALL-X EXTREME', slug: 'extreme', emoji: '💪' },
    { name: 'MAGIC OIL 2K', slug: 'magic-oil-2k', emoji: '🌿' },
    { name: 'PALL-X 320', slug: 'pall-x-320', emoji: '🎯' },
  ];

  // ===== UPSELL MALIN - Catégories de produits complémentaires =====
  const upsellCategories = [
    {
      title: '🖌️ Rouleaux & Manchons',
      color: 'bg-blue-500',
      products: [
        { name: 'Manchon Aqua SP 8mm', slug: 'aqua', hint: 'vitrificateur' },
        { name: 'Manchon Mohair 11mm', slug: 'mohair', hint: 'huile' },
        { name: 'Manchon microfibre', slug: 'microfibre', hint: 'polyvalent' },
        { name: 'Monture rouleau 25cm', slug: 'monture', hint: 'support' },
        { name: 'Perche télescopique', slug: 'perche', hint: '1.2-2.4m' },
      ]
    },
    {
      title: '⚙️ Abrasifs',
      color: 'bg-orange-500',
      products: [
        { name: 'Grain 36', slug: 'grain-36', hint: 'décapage' },
        { name: 'Grain 50', slug: 'grain-50', hint: 'ponçage' },
        { name: 'Grain 80', slug: 'grain-80', hint: 'finition' },
        { name: 'Grain 100', slug: 'grain-100', hint: 'fin' },
        { name: 'Grain 120', slug: 'grain-120', hint: 'extra fin' },
        { name: 'Treillis égrenage', slug: 'treillis', hint: 'inter-couches' },
      ]
    },
    {
      title: '🔧 Joints & Rebouchage',
      color: 'bg-amber-600',
      products: [
        { name: 'Joint acrylique Chêne', slug: 'joint chene', hint: 'acrylique' },
        { name: 'Joint acrylique Hêtre', slug: 'joint hetre', hint: 'acrylique' },
        { name: 'Joint acrylique Noyer', slug: 'joint noyer', hint: 'acrylique' },
        { name: 'Joint acrylique Blanc', slug: 'joint blanc', hint: 'plinthes' },
        { name: 'PALL-X KITT 1L', slug: 'kitt 1l', hint: 'liant' },
        { name: 'PALL-X KITT 5L', slug: 'kitt 5l', hint: 'liant XL' },
        { name: 'X-FILLER', slug: 'filler', hint: 'rebouchage' },
      ]
    },
    {
      title: '🧴 Nettoyage & Entretien',
      color: 'bg-green-600',
      products: [
        { name: 'CLEAN & GO', slug: 'clean go', hint: 'nettoyant' },
        { name: 'FINISH CARE', slug: 'finish care', hint: 'entretien vitri' },
        { name: 'MAGIC OIL CARE', slug: 'magic oil care', hint: 'entretien huile' },
        { name: 'REFRESH', slug: 'refresh', hint: 'rénovateur' },
        { name: 'CLEAN STRONG', slug: 'clean strong', hint: 'décrassant' },
      ]
    },
    {
      title: '🎨 Teintes & Couleurs',
      color: 'bg-purple-600',
      products: [
        { name: 'PALL-X 333 Color', slug: '333 color', hint: 'teinte fond' },
        { name: 'MAGIC OIL 2K Color', slug: 'magic oil color', hint: 'huile teintée' },
        { name: 'Coffret Color Collection', slug: 'color collection', hint: 'nuancier' },
      ]
    },
    {
      title: '🛠️ Outils & Accessoires',
      color: 'bg-gray-600',
      products: [
        { name: 'Spatule inox crantée', slug: 'spatule', hint: 'application' },
        { name: 'Spatule japonaise', slug: 'japonaise', hint: 'finition' },
        { name: 'Bac à peinture', slug: 'bac', hint: 'support' },
        { name: 'Grille d\'essorage', slug: 'grille', hint: 'accessoire' },
        { name: 'Pistolet cartouche', slug: 'pistolet', hint: 'joints' },
      ]
    },
  ];

  // ===== GUIDE D'APPEL - Questions types =====
  const callGuideQuestions = [
    { id: 'surface', question: "📐 Quelle est la surface à traiter ?", hint: "en m²" },
    { id: 'type-parquet', question: "🪵 Quel type de parquet ?", hint: "massif, contrecollé, stratifié..." },
    { id: 'etat', question: "🔍 État actuel du parquet ?", hint: "vitrifié, huilé, brut, abîmé..." },
    { id: 'finition', question: "✨ Quelle finition souhaitée ?", hint: "vitrification ou huile" },
    { id: 'aspect', question: "🎨 Quel aspect ?", hint: "mat, satiné, brillant, teinté..." },
    { id: 'pieces', question: "🏠 Quelles pièces ?", hint: "salon, chambre, cuisine, salle de bain..." },
    { id: 'escalier', question: "🪜 Y a-t-il un escalier ?", hint: "nombre de marches" },
    { id: 'meubles', question: "🛋️ Les meubles sont déplacés ?", hint: "ou à prévoir" },
    { id: 'delai', question: "📅 Délai souhaité ?", hint: "urgence ou flexible" },
    { id: 'budget', question: "💰 Budget approximatif ?", hint: "si mentionné" },
  ];

  const whatsappMessages = [
    {
      id: 'photo-parquet',
      label: '📸 Demander photo parquet',
      message: "Bonjour ! Pour établir votre devis, pourriez-vous m'envoyer une photo de votre parquet actuel ? Cela m'aidera à vous conseiller le meilleur produit. Merci ! 🙏"
    },
    {
      id: 'photo-surface',
      label: '📐 Demander photo pièce',
      message: "Bonjour ! Pourriez-vous m'envoyer une photo de la pièce entière ? Cela me permettra d'évaluer la surface et les contraintes. Merci !"
    },
    {
      id: 'photo-etat',
      label: '🔍 Demander photo détail usure',
      message: "Bonjour ! Pourriez-vous me faire une photo des zones les plus abîmées de votre parquet ? Je pourrai ainsi mieux évaluer le travail nécessaire. Merci !"
    },
    {
      id: 'devis-envoye',
      label: '✅ Devis envoyé',
      message: "Bonjour ! Je viens de vous envoyer le devis par email. N'hésitez pas si vous avez des questions. Le lien de paiement sécurisé est inclus si vous souhaitez commander directement. À bientôt !"
    },
    {
      id: 'relance',
      label: '🔔 Relance douce',
      message: "Bonjour ! Je me permets de revenir vers vous concernant le devis envoyé. Avez-vous eu le temps de le consulter ? Je reste disponible pour toute question. Bonne journée !"
    },
  ];

  // ===== CALCULS DU CALCULATEUR =====
  const calculateProducts = (): CalculatorProduct[] => {
    const products: CalculatorProduct[] = [];
    
    if (finishType === 'vitrification') {
      // Fond dur : 1L pour 10-12m²
      const fondDurLitres = Math.ceil(surface / 10);
      products.push({
        id: 'fond-dur',
        name: 'PALL-X 320 - Fond dur',
        description: 'Fond dur aqueux universel, 1 couche',
        quantity: fondDurLitres,
        unit: 'L',
        pricePerUnit: 23,
        totalPrice: fondDurLitres * 23,
        productSlug: 'pall-x-320',
        category: 'principal'
      });

      // Vitrificateur : 1L pour 10-12m² par couche, 2 couches
      const vitrificateurLitres = Math.ceil((surface / 10) * 2);
      products.push({
        id: 'vitrificateur',
        name: 'PALL-X 96 ORIGINAL - Vitrificateur',
        description: 'Vitrificateur mono-composant premium, 2 couches',
        quantity: vitrificateurLitres,
        unit: 'L',
        pricePerUnit: 40.10,
        totalPrice: vitrificateurLitres * 40.10,
        productSlug: 'pall-x-96-original',
        category: 'principal'
      });
    } else {
      // Huile : 1L pour 20-25m² par couche, 2 couches
      const huileLitres = Math.ceil((surface / 20) * 2);
      products.push({
        id: 'huile',
        name: 'MAGIC OIL 2K ORIGINAL - Huile',
        description: 'Huile naturelle bi-composante, 2 couches',
        quantity: huileLitres,
        unit: 'L',
        pricePerUnit: 122.86,
        totalPrice: huileLitres * 122.86,
        productSlug: 'magic-oil-2k-original',
        category: 'principal'
      });
    }

    // Liant (pour joints) si rénovation
    if (projectType === 'renovation' && includeLiant) {
      const liantLitres = Math.ceil(surface / 40);
      products.push({
        id: 'liant',
        name: 'PALL-X KITT - Liant joints',
        description: 'Pour rebouchage des joints et fissures',
        quantity: liantLitres,
        unit: 'L',
        pricePerUnit: 24.20,
        totalPrice: liantLitres * 24.20,
        productSlug: 'pall-x-kitt',
        category: 'complementaire'
      });
    }

    // Abrasifs
    if (includeAbrasifs) {
      const nbDisques = Math.ceil(surface / 25);
      products.push({
        id: 'abrasif-80',
        name: 'Disques abrasifs grain 80',
        description: 'Finition avant application',
        quantity: nbDisques,
        unit: 'pièce(s)',
        pricePerUnit: 3.50,
        totalPrice: nbDisques * 3.50,
        productSlug: 'grain-80',
        category: 'complementaire'
      });
      products.push({
        id: 'abrasif-100',
        name: 'Disques abrasifs grain 100/120',
        description: 'Égrenage inter-couches',
        quantity: nbDisques,
        unit: 'pièce(s)',
        pricePerUnit: 3.80,
        totalPrice: nbDisques * 3.80,
        productSlug: 'grain-100',
        category: 'complementaire'
      });
    }

    // Spatule
    if (includeSpatule) {
      products.push({
        id: 'spatule',
        name: 'Spatule inox crantée',
        description: 'Pour application uniforme',
        quantity: 1,
        unit: 'pièce',
        pricePerUnit: 18.50,
        totalPrice: 18.50,
        productSlug: 'spatule-inox',
        category: 'complementaire'
      });
    }

    // Rouleau
    if (includeRouleau) {
      const nbRouleaux = Math.max(1, Math.ceil(surface / 50));
      products.push({
        id: 'rouleau',
        name: finishType === 'vitrification' ? 'Rouleau Aqua SP 8mm' : 'Rouleau Mohair 11mm',
        description: finishType === 'vitrification' ? 'Pour vitrificateur aqueux' : 'Pour huile naturelle',
        quantity: nbRouleaux,
        unit: 'pièce(s)',
        pricePerUnit: 14.90,
        totalPrice: nbRouleaux * 14.90,
        productSlug: finishType === 'vitrification' ? 'rouleau-aqua' : 'rouleau-mohair',
        category: 'complementaire'
      });
    }

    // Nettoyant
    if (includeNettoyant) {
      const nettoyantLitres = Math.max(1, Math.ceil(surface / 80));
      products.push({
        id: 'nettoyant',
        name: 'CLEAN & GO - Nettoyant',
        description: 'Nettoyage avant application (dilué)',
        quantity: nettoyantLitres,
        unit: 'L',
        pricePerUnit: 15.80,
        totalPrice: nettoyantLitres * 15.80,
        productSlug: 'clean-and-go',
        category: 'complementaire'
      });
    }

    // Produit d'entretien
    if (includeEntretien) {
      products.push({
        id: 'entretien',
        name: finishType === 'vitrification' ? 'FINISH CARE - Entretien' : 'MAGIC OIL CARE - Entretien',
        description: 'Entretien régulier après finition',
        quantity: 1,
        unit: 'L',
        pricePerUnit: finishType === 'vitrification' ? 22.50 : 28.50,
        totalPrice: finishType === 'vitrification' ? 22.50 : 28.50,
        productSlug: finishType === 'vitrification' ? 'finish-care' : 'magic-oil-care',
        category: 'entretien'
      });
    }

    return products;
  };

  const calculatedProducts = calculateProducts();
  const calculatorTotalHT = calculatedProducts.reduce((sum, p) => sum + p.totalPrice, 0);

  // ===== SUGGESTIONS CROSS-SELL INTELLIGENTES =====
  const crossSellSuggestions = useMemo(() => {
    const suggestions: { text: string; searchTerms: string[] }[] = [];
    
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
      i.product.name.toLowerCase().includes('fond dur') ||
      i.product.name.toLowerCase().includes('320') ||
      i.product.name.toLowerCase().includes('325')
    );
    const hasRouleau = quoteItems.some(i => 
      i.product.name.toLowerCase().includes('rouleau')
    );
    const hasAbrasif = quoteItems.some(i => 
      i.product.name.toLowerCase().includes('disque') || 
      i.product.name.toLowerCase().includes('grain') ||
      i.product.name.toLowerCase().includes('abrasif')
    );
    const hasEntretien = quoteItems.some(i => 
      i.product.name.toLowerCase().includes('care') || 
      i.product.name.toLowerCase().includes('entretien') ||
      i.product.name.toLowerCase().includes('clean')
    );
    const hasTeinte = quoteItems.some(i => 
      i.product.name.toLowerCase().includes('color') || 
      i.product.name.toLowerCase().includes('333')
    );
    
    if (hasVitrificateur && !hasFondDur) {
      suggestions.push({ 
        text: "💡 FOND DUR recommandé avec ce vitrificateur", 
        searchTerms: ['pall-x 320', 'pall-x base', 'fond dur'] 
      });
    }
    if (hasVitrificateur && !hasRouleau) {
      suggestions.push({ 
        text: "🖌️ ROULEAU AQUA SP adapté aux vitrificateurs", 
        searchTerms: ['rouleau', 'aqua'] 
      });
    }
    if (hasHuile && !hasRouleau) {
      suggestions.push({ 
        text: "🖌️ ROULEAU MOHAIR idéal pour les huiles", 
        searchTerms: ['rouleau', 'mohair'] 
      });
    }
    if ((hasVitrificateur || hasHuile) && !hasAbrasif) {
      suggestions.push({ 
        text: "⚙️ ABRASIFS pour préparation et égrenage", 
        searchTerms: ['grain', 'disque', 'treillis'] 
      });
    }
    if (hasVitrificateur && !hasEntretien) {
      suggestions.push({ 
        text: "🧴 FINISH CARE pour entretien parquet vitrifié", 
        searchTerms: ['finish care', 'clean go'] 
      });
    }
    if (hasHuile && !hasEntretien) {
      suggestions.push({ 
        text: "🧴 MAGIC OIL CARE pour entretien parquet huilé", 
        searchTerms: ['magic oil care'] 
      });
    }
    if ((hasVitrificateur || hasHuile) && !hasTeinte) {
      suggestions.push({ 
        text: "🎨 PALL-X 333 COLOR pour teinter le parquet", 
        searchTerms: ['333 color', 'teinte'] 
      });
    }
    if (hasVitrificateur) {
      suggestions.push({ 
        text: "⭐ Upgrade PALL-X EXTREME pour ultra-résistance", 
        searchTerms: ['extreme'] 
      });
    }

    return suggestions;
  }, [quoteItems]);

  // ===== AUTH =====
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

  // Charger tous les produits au démarrage
  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await supabase
        .from('pallmann_products')
        .select('id, name, slug, price_public_ht, image_url, ref')
        .eq('published', true)
        .gt('price_public_ht', 0);
      setAllProducts(data || []);
    };
    fetchProducts();
  }, []);

  // ===== RECHERCHE =====
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
        .or(`name.ilike.%${searchTerm}%,ref.ilike.%${searchTerm}%,slug.ilike.%${searchTerm}%`)
        .limit(12);

      setSearchResults(data || []);
    };

    const debounce = setTimeout(searchProducts, 300);
    return () => clearTimeout(debounce);
  }, [searchTerm]);

  // ===== ACTIONS DEVIS =====
  const addProduct = (product: Product, qty: number = 1) => {
    const existing = quoteItems.find(item => item.product.id === product.id);
    if (existing) {
      setQuoteItems(quoteItems.map(item =>
        item.product.id === product.id
          ? { ...item, quantity: item.quantity + qty }
          : item
      ));
    } else {
      setQuoteItems([...quoteItems, { product, quantity: qty }]);
    }
    setSearchTerm('');
    setSearchResults([]);
  };

  const addFromCalculator = async (calcProduct: CalculatorProduct) => {
    // Chercher le produit réel dans Supabase
    const { data } = await supabase
      .from('pallmann_products')
      .select('id, name, slug, price_public_ht, image_url, ref')
      .eq('published', true)
      .ilike('slug', `%${calcProduct.productSlug}%`)
      .limit(1);
    
    if (data && data.length > 0) {
      addProduct(data[0], calcProduct.quantity);
    } else {
      // Fallback: chercher par nom
      const { data: fallback } = await supabase
        .from('pallmann_products')
        .select('id, name, slug, price_public_ht, image_url, ref')
        .eq('published', true)
        .ilike('name', `%${calcProduct.name.split(' - ')[0]}%`)
        .limit(1);
      
      if (fallback && fallback.length > 0) {
        addProduct(fallback[0], calcProduct.quantity);
      }
    }
  };

  const addAllFromCalculator = async () => {
    for (const p of calculatedProducts) {
      await addFromCalculator(p);
    }
  };

  // ===== QUICK PACK - Ajoute un pack complet en 1 clic =====
  const applyQuickPack = async (pack: typeof quickPacks[0], surfaceM2: number) => {
    // Définir les paramètres
    setSurface(surfaceM2);
    setFinishType(pack.finishType);
    if (pack.fullReno) {
      setProjectType('renovation');
      setIncludeLiant(true);
      setIncludeAbrasifs(true);
    }
    setIncludeSpatule(true);
    setIncludeRouleau(true);
    setIncludeNettoyant(true);
    setIncludeEntretien(true);
    
    // Attendre que le state soit mis à jour puis ajouter
    setTimeout(async () => {
      await addAllFromCalculator();
    }, 100);
  };

  // ===== AJOUT RAPIDE PRODUIT STAR =====
  const addStarProduct = async (slug: string) => {
    const { data } = await supabase
      .from('pallmann_products')
      .select('id, name, slug, price_public_ht, image_url, ref')
      .eq('published', true)
      .ilike('slug', `%${slug}%`)
      .limit(5);
    
    if (data && data.length > 0) {
      // Ouvrir les résultats de recherche pour choisir
      setSearchResults(data);
      setSearchTerm(slug);
    }
  };

  // ===== GUIDE D'APPEL =====
  const toggleQuestion = (id: string) => {
    setCheckedQuestions(prev => 
      prev.includes(id) ? prev.filter(q => q !== id) : [...prev, id]
    );
  };

  const copyToClipboard = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedMessage(id);
      setTimeout(() => setCopiedMessage(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const openWhatsApp = (phone: string, message: string) => {
    const cleanPhone = phone.replace(/\s/g, '').replace(/^0/, '33');
    const url = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
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

  // ===== CALCULS DEVIS =====
  const subtotalHT = quoteItems.reduce((sum, item) => sum + item.product.price_public_ht * item.quantity, 0);
  const discountAmount = subtotalHT * (discountPercent / 100);
  const totalHT = subtotalHT - discountAmount;
  const totalTTC = totalHT * 1.20;

  // ===== ENVOI DEVIS =====
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

  // ===== LOGIN PAGE =====
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-[#FF9900] to-[#F0C300] rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Espace Technicien</h1>
            <p className="text-gray-600">Pallmann Store - Création de devis</p>
          </div>
          <form onSubmit={handleLogin}>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Mot de passe"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl mb-4 focus:ring-2 focus:ring-[#FF9900] focus:border-transparent"
            />
            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
            <button
              type="submit"
              className="w-full py-3 rounded-xl font-bold text-white transition-all hover:shadow-lg"
              style={{ background: 'linear-gradient(135deg, #FF9900 0%, #F0C300 100%)' }}
            >
              Connexion
            </button>
          </form>
        </div>
      </div>
    );
  }

  // ===== MAIN PAGE =====
  return (
    <div className="min-h-screen bg-gray-100">
      <Helmet>
        <title>Espace Technicien - Devis | Pallmann Store</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      {/* Header */}
      <header className="bg-gradient-to-r from-[#1a1a1a] to-[#2d2d2d] text-white py-4 px-6 sticky top-0 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-[#FF9900] to-[#F0C300] rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold">Espace Technicien</h1>
              <p className="text-xs text-gray-400">Création de devis Pallmann</p>
            </div>
          </div>
          <button
            onClick={() => {
              localStorage.removeItem('admin_auth');
              setIsAuthenticated(false);
            }}
            className="text-gray-400 hover:text-white text-sm px-4 py-2 rounded-lg hover:bg-white/10 transition-all"
          >
            Déconnexion
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-4 md:p-6">
        
        {/* ===== ZONE ACTION RAPIDE - EN HAUT ===== */}
        <div className="mb-6 bg-gradient-to-r from-slate-800 to-slate-900 rounded-2xl p-6 shadow-xl">
          <h2 className="text-white text-lg font-bold mb-4 flex items-center gap-2">
            <Zap className="w-5 h-5 text-yellow-400" />
            ⚡ Actions Rapides — Concentrez-vous sur l'appel !
          </h2>
          
          {/* PACKS PRECONFIGURES */}
          <div className="mb-6">
            <p className="text-gray-400 text-sm mb-3">📦 Packs complets (1 clic = tout ajouté)</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {quickPacks.map(pack => (
                <div key={pack.id} className={`bg-gradient-to-r ${pack.color} rounded-xl p-4 text-white`}>
                  <div className="font-bold text-lg mb-1">{pack.name}</div>
                  <div className="text-sm text-white/80 mb-3">{pack.description}</div>
                  <div className="flex flex-wrap gap-2">
                    {surfacePresets.slice(0, 4).map(s => (
                      <button
                        key={s}
                        onClick={() => applyQuickPack(pack, s)}
                        className="px-3 py-1.5 bg-white/20 hover:bg-white/30 rounded-lg text-sm font-bold transition-all"
                      >
                        {s}m²
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* PRODUITS STARS - Ajout rapide */}
          <div className="mb-6">
            <p className="text-gray-400 text-sm mb-3">⭐ Produits stars — Finitions principales</p>
            <div className="flex flex-wrap gap-2">
              {starProducts.map(sp => (
                <button
                  key={sp.slug}
                  onClick={() => addStarProduct(sp.slug)}
                  className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg text-sm font-semibold transition-all flex items-center gap-2"
                >
                  <span>{sp.emoji}</span>
                  {sp.name}
                </button>
              ))}
            </div>
          </div>

          {/* UPSELL MALIN - Accessoires par catégorie */}
          <div>
            <p className="text-gray-400 text-sm mb-3">💰 Upsell Malin — Accessoires & Compléments</p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
              {upsellCategories.map(cat => (
                <div key={cat.title} className="bg-white/5 rounded-xl p-3 border border-white/10">
                  <div className={`${cat.color} text-white text-xs font-bold px-2 py-1 rounded-lg mb-2 text-center`}>
                    {cat.title}
                  </div>
                  <div className="space-y-1">
                    {cat.products.map(p => (
                      <button
                        key={p.slug}
                        onClick={() => addStarProduct(p.slug)}
                        className="w-full text-left px-2 py-1.5 text-xs text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-all"
                        title={p.hint}
                      >
                        {p.name}
                        <span className="text-white/40 ml-1">({p.hint})</span>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ===== GUIDE D'APPEL TÉLÉPHONIQUE ===== */}
        <div className="mb-6">
          <button
            onClick={() => setShowCallGuide(!showCallGuide)}
            className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl p-4 flex items-center justify-between shadow-lg hover:shadow-xl transition-all"
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <HelpCircle className="w-6 h-6" />
              </div>
              <div className="text-left">
                <h2 className="text-lg font-bold">📋 Guide d'Appel</h2>
                <p className="text-sm text-white/80">Questions types + Messages WhatsApp</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="bg-white/20 px-3 py-1 rounded-full text-sm font-bold">
                {checkedQuestions.length}/{callGuideQuestions.length} ✓
              </span>
              {showCallGuide ? <ChevronUp className="w-6 h-6" /> : <ChevronDown className="w-6 h-6" />}
            </div>
          </button>

          {showCallGuide && (
            <div className="bg-white rounded-b-xl shadow-lg p-6 border-x border-b border-purple-200 -mt-2">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Questions à poser */}
                <div>
                  <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <CheckSquare className="w-5 h-5 text-purple-600" />
                    Questions à poser au client
                  </h3>
                  <div className="space-y-2">
                    {callGuideQuestions.map(q => (
                      <button
                        key={q.id}
                        onClick={() => toggleQuestion(q.id)}
                        className={`w-full p-3 rounded-xl border-2 transition-all text-left flex items-start gap-3 ${
                          checkedQuestions.includes(q.id)
                            ? 'border-green-500 bg-green-50'
                            : 'border-gray-200 hover:border-purple-300'
                        }`}
                      >
                        <div className={`w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0 mt-0.5 ${
                          checkedQuestions.includes(q.id)
                            ? 'bg-green-500 text-white'
                            : 'bg-gray-200'
                        }`}>
                          {checkedQuestions.includes(q.id) && <CheckCircle className="w-4 h-4" />}
                        </div>
                        <div>
                          <div className={`font-semibold ${checkedQuestions.includes(q.id) ? 'text-green-700 line-through' : 'text-gray-900'}`}>
                            {q.question}
                          </div>
                          <div className="text-xs text-gray-500">{q.hint}</div>
                        </div>
                      </button>
                    ))}
                  </div>
                  <button
                    onClick={() => setCheckedQuestions([])}
                    className="mt-4 text-sm text-purple-600 hover:underline"
                  >
                    🔄 Réinitialiser la checklist
                  </button>
                </div>

                {/* Messages WhatsApp */}
                <div>
                  <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <MessageCircle className="w-5 h-5 text-green-600" />
                    Messages WhatsApp prêts
                  </h3>
                  <div className="space-y-3">
                    {whatsappMessages.map(msg => (
                      <div key={msg.id} className="p-3 bg-gray-50 rounded-xl border border-gray-200">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-semibold text-gray-800">{msg.label}</span>
                          <div className="flex gap-2">
                            <button
                              onClick={() => copyToClipboard(msg.message, msg.id)}
                              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
                                copiedMessage === msg.id
                                  ? 'bg-green-500 text-white'
                                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                              }`}
                            >
                              <ClipboardCopy className="w-3 h-3" />
                              {copiedMessage === msg.id ? 'Copié !' : 'Copier'}
                            </button>
                            {customerInfo.phone && (
                              <button
                                onClick={() => openWhatsApp(customerInfo.phone, msg.message)}
                                className="px-3 py-1 bg-green-500 text-white rounded-lg text-xs font-bold hover:bg-green-600 transition-all flex items-center gap-1"
                              >
                                <Send className="w-3 h-3" />
                                Envoyer
                              </button>
                            )}
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 bg-white p-2 rounded-lg border border-gray-100">
                          {msg.message}
                        </p>
                      </div>
                    ))}
                  </div>
                  
                  {/* Lien WhatsApp direct si téléphone renseigné */}
                  {customerInfo.phone && (
                    <div className="mt-4 p-3 bg-green-50 rounded-xl border border-green-200">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold text-green-800">
                          📱 WhatsApp : {customerInfo.phone}
                        </span>
                        <button
                          onClick={() => openWhatsApp(customerInfo.phone, '')}
                          className="px-4 py-2 bg-green-500 text-white rounded-lg font-bold hover:bg-green-600 transition-all flex items-center gap-2"
                        >
                          <MessageCircle className="w-4 h-4" />
                          Ouvrir WhatsApp
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* ===== CALCULATEUR PRO (DÉTAILLÉ) ===== */}
        <div className="mb-6">
          <button
            onClick={() => setShowCalculator(!showCalculator)}
            className="w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-xl p-4 flex items-center justify-between shadow-lg hover:shadow-xl transition-all"
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <Calculator className="w-6 h-6" />
              </div>
              <div className="text-left">
                <h2 className="text-lg font-bold">🧮 Calculateur Personnalisé</h2>
                <p className="text-sm text-white/80">Ajuster les détails si besoin</p>
              </div>
            </div>
            {showCalculator ? <ChevronUp className="w-6 h-6" /> : <ChevronDown className="w-6 h-6" />}
          </button>

          {showCalculator && (
            <div className="bg-white rounded-b-xl shadow-lg p-6 border-x border-b border-orange-200 -mt-2">
              <div className="grid md:grid-cols-2 gap-8">
                {/* Paramètres */}
                <div className="space-y-6">
                  {/* Presets Surface */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-2 flex items-center gap-2">
                      <Ruler className="w-4 h-4 text-orange-500" />
                      Surface rapide
                    </label>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {surfacePresets.map(s => (
                        <button
                          key={s}
                          onClick={() => setSurface(s)}
                          className={`px-4 py-2 rounded-lg font-bold text-sm transition-all ${
                            surface === s 
                              ? 'bg-orange-500 text-white shadow-md' 
                              : 'bg-gray-100 text-gray-700 hover:bg-orange-100'
                          }`}
                        >
                          {s}m²
                        </button>
                      ))}
                    </div>
                    <div className="flex items-center gap-4">
                      <input
                        type="range"
                        min="5"
                        max="300"
                        value={surface}
                        onChange={(e) => setSurface(Number(e.target.value))}
                        className="flex-1 h-3 rounded-full appearance-none cursor-pointer"
                        style={{ 
                          background: `linear-gradient(to right, #F97316 0%, #F97316 ${(surface-5)/295*100}%, #D4D4D4 ${(surface-5)/295*100}%, #D4D4D4 100%)` 
                        }}
                      />
                      <div className="flex items-center gap-1 bg-orange-50 border border-orange-200 px-4 py-2 rounded-xl">
                        <input
                          type="number"
                          min="5"
                          max="500"
                          value={surface}
                          onChange={(e) => setSurface(Number(e.target.value) || 5)}
                          className="w-16 text-center font-bold text-gray-900 bg-transparent focus:outline-none"
                        />
                        <span className="text-gray-600">m²</span>
                      </div>
                    </div>
                  </div>

                  {/* Type projet */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-2">Type de projet</label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        onClick={() => setProjectType('renovation')}
                        className={`p-3 rounded-xl border-2 transition-all text-left ${
                          projectType === 'renovation'
                            ? 'border-orange-500 bg-orange-50'
                            : 'border-gray-200 hover:border-orange-300'
                        }`}
                      >
                        <div className="font-bold text-gray-900">🔄 Rénovation</div>
                        <div className="text-xs text-gray-600">Parquet existant</div>
                      </button>
                      <button
                        onClick={() => setProjectType('neuf')}
                        className={`p-3 rounded-xl border-2 transition-all text-left ${
                          projectType === 'neuf'
                            ? 'border-orange-500 bg-orange-50'
                            : 'border-gray-200 hover:border-orange-300'
                        }`}
                      >
                        <div className="font-bold text-gray-900">✨ Parquet neuf</div>
                        <div className="text-xs text-gray-600">Première finition</div>
                      </button>
                    </div>
                  </div>

                  {/* Type finition */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-2">Type de finition</label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        onClick={() => setFinishType('vitrification')}
                        className={`p-3 rounded-xl border-2 transition-all text-left ${
                          finishType === 'vitrification'
                            ? 'border-orange-500 bg-orange-50'
                            : 'border-gray-200 hover:border-orange-300'
                        }`}
                      >
                        <Droplets className={`w-5 h-5 mb-1 ${finishType === 'vitrification' ? 'text-orange-500' : 'text-gray-400'}`} />
                        <div className="font-bold text-gray-900">Vitrification</div>
                        <div className="text-xs text-gray-600">Protection filmogène</div>
                      </button>
                      <button
                        onClick={() => setFinishType('huile')}
                        className={`p-3 rounded-xl border-2 transition-all text-left ${
                          finishType === 'huile'
                            ? 'border-green-500 bg-green-50'
                            : 'border-gray-200 hover:border-green-300'
                        }`}
                      >
                        <Droplets className={`w-5 h-5 mb-1 ${finishType === 'huile' ? 'text-green-600' : 'text-gray-400'}`} />
                        <div className="font-bold text-gray-900">Huilage</div>
                        <div className="text-xs text-gray-600">Aspect naturel</div>
                      </button>
                    </div>
                  </div>

                  {/* Options */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-2">Produits complémentaires</label>
                    <div className="grid grid-cols-2 gap-2">
                      {projectType === 'renovation' && (
                        <label className="flex items-center gap-2 text-sm cursor-pointer">
                          <input type="checkbox" checked={includeLiant} onChange={(e) => setIncludeLiant(e.target.checked)} className="rounded text-orange-500" />
                          Liant joints
                        </label>
                      )}
                      <label className="flex items-center gap-2 text-sm cursor-pointer">
                        <input type="checkbox" checked={includeAbrasifs} onChange={(e) => setIncludeAbrasifs(e.target.checked)} className="rounded text-orange-500" />
                        Abrasifs
                      </label>
                      <label className="flex items-center gap-2 text-sm cursor-pointer">
                        <input type="checkbox" checked={includeSpatule} onChange={(e) => setIncludeSpatule(e.target.checked)} className="rounded text-orange-500" />
                        Spatule
                      </label>
                      <label className="flex items-center gap-2 text-sm cursor-pointer">
                        <input type="checkbox" checked={includeRouleau} onChange={(e) => setIncludeRouleau(e.target.checked)} className="rounded text-orange-500" />
                        Rouleau
                      </label>
                      <label className="flex items-center gap-2 text-sm cursor-pointer">
                        <input type="checkbox" checked={includeNettoyant} onChange={(e) => setIncludeNettoyant(e.target.checked)} className="rounded text-orange-500" />
                        Nettoyant
                      </label>
                      <label className="flex items-center gap-2 text-sm cursor-pointer">
                        <input type="checkbox" checked={includeEntretien} onChange={(e) => setIncludeEntretien(e.target.checked)} className="rounded text-orange-500" />
                        Entretien
                      </label>
                    </div>
                  </div>
                </div>

                {/* Résultats calculateur */}
                <div className="bg-gray-50 rounded-xl p-4">
                  <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                    <Package className="w-5 h-5 text-orange-500" />
                    Produits recommandés pour {surface}m²
                  </h3>
                  
                  <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2">
                    {calculatedProducts.map((p) => (
                      <div 
                        key={p.id}
                        className={`flex items-center justify-between p-2 rounded-lg text-sm ${
                          p.category === 'principal' ? 'bg-orange-100 border border-orange-200' :
                          p.category === 'complementaire' ? 'bg-white border border-gray-200' :
                          'bg-green-50 border border-green-200'
                        }`}
                      >
                        <div className="flex-1">
                          <div className="font-semibold text-gray-900">{p.name}</div>
                          <div className="text-xs text-gray-500">{p.quantity} {p.unit} × {p.pricePerUnit}€</div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-gray-800">{p.totalPrice.toFixed(0)}€</span>
                          <button
                            onClick={() => addFromCalculator(p)}
                            className="p-1.5 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-all"
                            title="Ajouter au devis"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Total et CTA */}
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-semibold text-gray-700">Estimation totale HT</span>
                      <span className="text-xl font-bold text-orange-600">{calculatorTotalHT.toFixed(0)}€</span>
                    </div>
                    <button
                      onClick={addAllFromCalculator}
                      className="w-full py-3 rounded-xl font-bold text-white flex items-center justify-center gap-2 transition-all hover:shadow-lg"
                      style={{ background: 'linear-gradient(135deg, #F97316 0%, #EA580C 100%)' }}
                    >
                      <ShoppingBag className="w-5 h-5" />
                      Tout ajouter au devis
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* ===== SUGGESTIONS CROSS-SELL ===== */}
        {crossSellSuggestions.length > 0 && quoteItems.length > 0 && (
          <div className="mb-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-200">
            <h3 className="font-bold text-blue-800 mb-3 flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-yellow-500" />
              Suggestions pour augmenter la vente
            </h3>
            <div className="flex flex-wrap gap-2">
              {crossSellSuggestions.slice(0, 5).map((s, i) => (
                <button
                  key={i}
                  onClick={() => setSearchTerm(s.searchTerms[0])}
                  className="px-3 py-2 bg-white rounded-lg text-sm font-medium text-blue-700 hover:bg-blue-100 transition-all border border-blue-200 shadow-sm"
                >
                  {s.text}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Colonne gauche: Recherche + Devis */}
          <div className="lg:col-span-2 space-y-6">
            {/* Recherche */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="font-bold text-lg mb-4 flex items-center gap-2">
                <Search className="w-5 h-5 text-orange-500" />
                Rechercher un produit
              </h2>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Nom du produit, référence..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
                
                {searchResults.length > 0 && (
                  <div className="absolute z-10 w-full mt-2 bg-white rounded-xl shadow-xl border border-gray-100 max-h-80 overflow-y-auto">
                    {searchResults.map(product => (
                      <button
                        key={product.id}
                        onClick={() => addProduct(product)}
                        className="w-full p-3 flex items-center gap-3 hover:bg-orange-50 transition-all text-left border-b border-gray-50 last:border-0"
                      >
                        {product.image_url && (
                          <img src={product.image_url} alt="" className="w-12 h-12 object-contain rounded-lg bg-gray-50" />
                        )}
                        <div className="flex-1 min-w-0">
                          <div className="font-semibold text-gray-900 truncate">{product.name}</div>
                          <div className="text-xs text-gray-500">Réf: {product.ref}</div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-orange-600">{product.price_public_ht?.toFixed(2)}€</div>
                          <div className="text-xs text-gray-500">HT</div>
                        </div>
                        <Plus className="w-5 h-5 text-orange-500" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Panier devis */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="font-bold text-lg mb-4 flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-orange-500" />
                Panier devis ({quoteItems.length} produit{quoteItems.length > 1 ? 's' : ''})
              </h2>

              {quoteItems.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <ShoppingBag className="w-12 h-12 mx-auto mb-3 opacity-30" />
                  <p>Utilisez le calculateur PRO ou la recherche</p>
                  <p className="text-sm">pour ajouter des produits</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {quoteItems.map(item => (
                    <div key={item.product.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                      {item.product.image_url && (
                        <img src={item.product.image_url} alt="" className="w-14 h-14 object-contain rounded-lg bg-white" />
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-gray-900 truncate">{item.product.name}</div>
                        <div className="text-sm text-gray-600">{item.product.price_public_ht?.toFixed(2)}€ × {item.quantity}</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="p-1.5 bg-gray-200 rounded-lg hover:bg-gray-300"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-8 text-center font-bold">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="p-1.5 bg-gray-200 rounded-lg hover:bg-gray-300"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="text-right min-w-[80px]">
                        <div className="font-bold text-gray-900">{(item.product.price_public_ht * item.quantity).toFixed(2)}€</div>
                      </div>
                      <button
                        onClick={() => removeItem(item.product.id)}
                        className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Colonne droite: Client + Totaux + Envoi */}
          <div className="space-y-6">
            {/* Infos client */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="font-bold text-lg mb-4 flex items-center gap-2">
                <User className="w-5 h-5 text-orange-500" />
                Client
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nom *</label>
                  <input
                    type="text"
                    value={customerInfo.name}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500"
                    placeholder="M. Dupont"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                  <input
                    type="email"
                    value={customerInfo.email}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, email: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500"
                    placeholder="client@email.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Téléphone</label>
                  <input
                    type="tel"
                    value={customerInfo.phone}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500"
                    placeholder="06 12 34 56 78"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                  <textarea
                    value={customerInfo.notes}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, notes: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500"
                    rows={2}
                    placeholder="Notes internes..."
                  />
                </div>
              </div>
            </div>

            {/* Remise + Totaux */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="font-bold text-lg mb-4 flex items-center gap-2">
                <Percent className="w-5 h-5 text-orange-500" />
                Remise & Total
              </h2>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Remise (%)</label>
                <div className="flex gap-2">
                  {[0, 5, 10, 15, 20].map(pct => (
                    <button
                      key={pct}
                      onClick={() => setDiscountPercent(pct)}
                      className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${
                        discountPercent === pct
                          ? 'bg-orange-500 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {pct}%
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2 pt-4 border-t border-gray-100">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Sous-total HT</span>
                  <span className="font-semibold">{subtotalHT.toFixed(2)}€</span>
                </div>
                {discountPercent > 0 && (
                  <div className="flex justify-between text-sm text-green-600">
                    <span>Remise {discountPercent}%</span>
                    <span>-{discountAmount.toFixed(2)}€</span>
                  </div>
                )}
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Total HT</span>
                  <span className="font-bold">{totalHT.toFixed(2)}€</span>
                </div>
                <div className="flex justify-between text-lg pt-2 border-t border-gray-200">
                  <span className="font-bold">Total TTC</span>
                  <span className="font-extrabold text-orange-600">{totalTTC.toFixed(2)}€</span>
                </div>
              </div>
            </div>

            {/* Envoi */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                  {error}
                </div>
              )}
              {success && (
                <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm">
                  {success}
                </div>
              )}
              
              <button
                onClick={handleSendQuote}
                disabled={loading || quoteItems.length === 0}
                className={`w-full py-4 rounded-xl font-bold text-white flex items-center justify-center gap-2 transition-all ${
                  loading || quoteItems.length === 0
                    ? 'bg-gray-300 cursor-not-allowed'
                    : 'hover:shadow-lg'
                }`}
                style={loading || quoteItems.length === 0 ? {} : { background: 'linear-gradient(135deg, #F97316 0%, #EA580C 100%)' }}
              >
                {loading ? (
                  <>
                    <RefreshCw className="w-5 h-5 animate-spin" />
                    Envoi en cours...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Envoyer le devis au client
                  </>
                )}
              </button>
              <p className="text-xs text-gray-500 text-center mt-3">
                Le client recevra un email avec le récapitulatif et un lien de paiement Stripe
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
