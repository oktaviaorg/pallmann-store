import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Header from '../components/Header';
import Footer from '../components/Footer';
import TechnicianCallout from '../components/TechnicianCallout';
import { useCart } from '../lib/CartContext';
import { supabase } from '../lib/supabase';
import { ShoppingCart, ArrowLeft, Package, Truck, Shield, FileText } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  meta_title: string;
  meta_description: string;
  image_url: string;
  price_public_ht: number;
  ref: string;
  pdf_url?: string;
  unit: string;
  pack_size: number;
}

export default function ProductPage() {
  const { slug } = useParams<{ slug: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();

  useEffect(() => {
    async function fetchProduct() {
      if (!slug) return;
      
      const { data, error } = await supabase
        .from('pallmann_products')
        .select('*')
        .eq('slug', slug)
        .eq('published', true)
        .single();

      if (data && !error) {
        setProduct(data);
      }
      setLoading(false);
    }

    fetchProduct();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-[#F7FAFC]">
        <Header />
        <main className="flex-grow pt-24 pb-16 flex items-center justify-center">
          <div className="animate-pulse text-gray-500">Chargement...</div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col bg-[#F7FAFC]">
        <Header />
        <main className="flex-grow pt-24 pb-16">
          <div className="max-w-4xl mx-auto px-4 text-center py-16">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Produit non trouvé</h1>
            <p className="text-gray-600 mb-8">Ce produit n'existe pas ou n'est plus disponible.</p>
            <Link to="/boutique" className="inline-flex items-center gap-2 bg-[#FF9900] hover:bg-[#F0C300] text-white px-6 py-3 rounded-lg font-bold">
              <ArrowLeft className="w-5 h-5" />
              Retour à la boutique
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const priceTTC = (product.price_public_ht * 1.20).toFixed(2);
  const cleanName = product.name.replace(/([a-zéèàù])([A-Z])/g, '$1 - $2').trim();
  const cleanDescription = (product.description || product.meta_description || '').split('ProduitsGUIDE')[0].trim();

  // Formater le conditionnement
  const formatConditionnement = () => {
    const unit = product.unit || '';
    const packSize = product.pack_size || 1;
    
    if (unit === 'L' || unit === 'l') {
      if (packSize >= 1) {
        return {
          badge: `Bidon de ${packSize} litre${packSize > 1 ? 's' : ''}`,
          short: `${packSize}L`,
          perUnit: packSize > 1 ? `(${(product.price_public_ht / packSize).toFixed(2)}€ HT/L)` : ''
        };
      } else {
        const ml = Math.round(packSize * 1000);
        return { badge: `Flacon de ${ml}ml`, short: `${ml}ml`, perUnit: '' };
      }
    }
    
    if (packSize > 1 && (!unit || unit === 'UN' || unit === 'pièce')) {
      return {
        badge: `Lot de ${packSize} pièces`,
        short: `x${packSize}`,
        perUnit: `(${(product.price_public_ht / packSize).toFixed(2)}€ HT/pièce)`
      };
    }
    
    if (unit === 'kg' || unit === 'KG') {
      return {
        badge: `${packSize}kg`,
        short: `${packSize}kg`,
        perUnit: packSize > 1 ? `(${(product.price_public_ht / packSize).toFixed(2)}€ HT/kg)` : ''
      };
    }
    
    return { badge: '', short: '', perUnit: '' };
  };
  
  const conditionnement = formatConditionnement();

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: cleanName,
      price_ht: product.price_public_ht,
      quantity,
      image_url: product.image_url,
    });
  };

  // Schema.org Product markup for SEO
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": cleanName,
    "description": cleanDescription,
    "image": product.image_url,
    "sku": product.ref || product.slug,
    "mpn": product.ref || product.slug,
    "brand": {
      "@type": "Brand",
      "name": "Pallmann"
    },
    "offers": {
      "@type": "Offer",
      "url": `https://www.pallmann-store.com/produit/${product.slug}`,
      "priceCurrency": "EUR",
      "price": priceTTC,
      "priceValidUntil": new Date(Date.now() + 30*24*60*60*1000).toISOString().split('T')[0],
      "availability": "https://schema.org/InStock",
      "seller": {
        "@type": "Organization",
        "name": "Pallmann Store"
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F7FAFC]">
      <Helmet>
        <title>{cleanName} | Pallmann Store</title>
        <meta name="description" content={cleanDescription.substring(0, 160)} />
        <meta property="og:title" content={cleanName} />
        <meta property="og:description" content={cleanDescription.substring(0, 160)} />
        <meta property="og:image" content={product.image_url} />
        <meta property="og:url" content={`https://www.pallmann-store.com/produit/${product.slug}`} />
        <meta property="og:type" content="product" />
        <meta property="product:price:amount" content={priceTTC} />
        <meta property="product:price:currency" content="EUR" />
        <link rel="canonical" href={`https://www.pallmann-store.com/produit/${product.slug}`} />
        <script type="application/ld+json">
          {JSON.stringify(productSchema)}
        </script>
      </Helmet>

      <Header />

      <main className="flex-grow pt-24 pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="mb-6">
            <ol className="flex items-center gap-2 text-sm text-gray-500">
              <li><Link to="/" className="hover:text-[#FF9900]">Accueil</Link></li>
              <li>/</li>
              <li><Link to="/boutique" className="hover:text-[#FF9900]">Boutique</Link></li>
              <li>/</li>
              <li className="text-gray-900 font-medium truncate max-w-[200px]">{cleanName}</li>
            </ol>
          </nav>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {/* Image */}
            <div className="bg-white rounded-2xl shadow-lg p-8 flex items-center justify-center">
              <img 
                src={product.image_url || '/images/pallmann-default.png'} 
                alt={cleanName}
                className="max-w-full max-h-[400px] object-contain"
              />
            </div>

            {/* Infos */}
            <div className="space-y-6">
              <div>
                <p className="text-sm text-[#FF9900] font-semibold mb-2">PALLMANN</p>
                <h1 className="text-3xl font-bold text-[#1A1A1A] mb-2">{cleanName}</h1>
                {product.ref && (
                  <p className="text-sm text-gray-500">Réf: {product.ref}</p>
                )}
                {conditionnement.badge && (
                  <p className="inline-block mt-2 px-3 py-1.5 bg-amber-100 text-amber-800 font-semibold rounded-lg text-sm">
                    📦 {conditionnement.badge}
                  </p>
                )}
              </div>

              <div className="bg-[#FFFBEB] border border-[#FF9900]/30 rounded-xl p-6">
                <div className="flex items-baseline gap-3">
                  <span className="text-4xl font-bold text-[#FF9900]">{priceTTC}€</span>
                  <span className="text-gray-500">TTC</span>
                  {conditionnement.short && (
                    <span className="text-gray-400 text-sm">/ {conditionnement.short}</span>
                  )}
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  {product.price_public_ht.toFixed(2)}€ HT
                  {conditionnement.perUnit && (
                    <span className="text-emerald-600 ml-2">{conditionnement.perUnit}</span>
                  )}
                </p>
              </div>

              <div className="prose prose-sm text-gray-600 max-w-none">
                <p>{cleanDescription}</p>
              </div>

              {/* Quantité + Ajouter au panier */}
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-l-lg"
                  >
                    -
                  </button>
                  <span className="px-4 py-2 font-bold text-gray-900 min-w-[50px] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-r-lg"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={handleAddToCart}
                  className="flex-grow bg-[#FF9900] hover:bg-[#F0C300] text-white py-3 px-6 rounded-lg font-bold flex items-center justify-center gap-2 transition-all"
                >
                  <ShoppingCart className="w-5 h-5" />
                  Ajouter au panier
                </button>
              </div>

              {/* Avantages */}
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200">
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <Truck className="w-5 h-5 text-[#FF9900]" />
                  <span>Franco à 630€ HT</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <Shield className="w-5 h-5 text-[#FF9900]" />
                  <span>Paiement sécurisé</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <Package className="w-5 h-5 text-[#FF9900]" />
                  <span>Expédition 3 jours</span>
                </div>
                {product.pdf_url && (
                  <a 
                    href={product.pdf_url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-sm text-[#FF9900] hover:underline"
                  >
                    <FileText className="w-5 h-5" />
                    <span>Fiche technique</span>
                  </a>
                )}
              </div>

              {/* Encart technicien */}
              <div className="mt-6">
                <TechnicianCallout />
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
