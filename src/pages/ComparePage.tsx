import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useCompare } from '../lib/CompareContext';
import { GitCompare, X, ShoppingCart, ArrowLeft, Check, Minus, FileText, ExternalLink } from 'lucide-react';
import { useCart } from '../lib/CartContext';

const TVA_RATE = 0.20;

export default function ComparePage() {
  const { products, removeProduct, clearAll } = useCompare();
  const { addItem } = useCart();

  const handleAddToCart = (product: any) => {
    addItem({
      id: product.id,
      name: product.name,
      price_ht: product.price_public_ht,
      quantity: 1,
      image_url: product.image_url,
    });
  };

  if (products.length < 2) {
    return (
      <>
        <Helmet>
          <title>Comparer des produits | Pallmann Store</title>
        </Helmet>
        <div className="min-h-screen flex flex-col bg-gray-50">
          <Header />
          <main className="flex-1 max-w-4xl mx-auto px-4 py-12 text-center">
            <GitCompare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Comparateur de produits
            </h1>
            <p className="text-gray-600 mb-8">
              Sélectionnez au moins 2 produits pour les comparer.
            </p>
            <Link
              to="/"
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold"
            >
              <ArrowLeft className="w-5 h-5" />
              Parcourir les produits
            </Link>
          </main>
          <Footer />
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Comparer {products.length} produits | Pallmann Store</title>
      </Helmet>

      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />

        <main className="flex-1 max-w-7xl mx-auto px-4 py-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <GitCompare className="w-8 h-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">
                Comparaison de {products.length} produits
              </h1>
            </div>
            <button
              onClick={clearAll}
              className="text-gray-500 hover:text-red-500 text-sm font-medium"
            >
              Effacer tout
            </button>
          </div>

          {/* Table de comparaison */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="p-4 text-left bg-gray-50 w-40">Produit</th>
                    {products.map(product => (
                      <th key={product.id} className="p-4 text-center min-w-[200px]">
                        <div className="relative">
                          <button
                            onClick={() => removeProduct(product.id)}
                            className="absolute -top-2 -right-2 p-1 bg-red-100 hover:bg-red-200 rounded-full"
                          >
                            <X className="w-4 h-4 text-red-600" />
                          </button>
                          {product.image_url && (
                            <img 
                              src={product.image_url} 
                              alt={product.name}
                              className="w-24 h-24 object-contain mx-auto mb-2"
                            />
                          )}
                          <Link 
                            to={`/produit/${product.slug}`}
                            className="font-semibold text-gray-900 hover:text-blue-600 text-sm line-clamp-2"
                          >
                            {product.name}
                          </Link>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {/* Prix HT */}
                  <tr className="border-b bg-blue-50">
                    <td className="p-4 font-semibold text-gray-700">Prix HT</td>
                    {products.map(product => (
                      <td key={product.id} className="p-4 text-center">
                        <span className="text-2xl font-bold text-blue-600">
                          {product.price_public_ht?.toFixed(2)}€
                        </span>
                      </td>
                    ))}
                  </tr>
                  
                  {/* Prix TTC */}
                  <tr className="border-b">
                    <td className="p-4 font-semibold text-gray-700">Prix TTC</td>
                    {products.map(product => (
                      <td key={product.id} className="p-4 text-center text-gray-600">
                        {(product.price_public_ht * (1 + TVA_RATE)).toFixed(2)}€
                      </td>
                    ))}
                  </tr>

                  {/* Catégorie */}
                  <tr className="border-b">
                    <td className="p-4 font-semibold text-gray-700">Catégorie</td>
                    {products.map(product => (
                      <td key={product.id} className="p-4 text-center text-gray-600">
                        {product.category_name || '-'}
                      </td>
                    ))}
                  </tr>

                  {/* Référence */}
                  <tr className="border-b">
                    <td className="p-4 font-semibold text-gray-700">Référence</td>
                    {products.map(product => (
                      <td key={product.id} className="p-4 text-center text-gray-600 font-mono text-sm">
                        {product.ref || '-'}
                      </td>
                    ))}
                  </tr>

                  {/* Conditionnement */}
                  <tr className="border-b">
                    <td className="p-4 font-semibold text-gray-700">Conditionnement</td>
                    {products.map(product => (
                      <td key={product.id} className="p-4 text-center text-gray-600">
                        {product.pack_size ? `${product.pack_size} ${product.unit || ''}` : '-'}
                      </td>
                    ))}
                  </tr>

                  {/* Description */}
                  <tr className="border-b">
                    <td className="p-4 font-semibold text-gray-700 align-top">Description</td>
                    {products.map(product => (
                      <td key={product.id} className="p-4 text-center text-gray-600 text-sm">
                        {product.description?.slice(0, 150) || '-'}
                        {product.description && product.description.length > 150 && '...'}
                      </td>
                    ))}
                  </tr>

                  {/* Rendement - extrait de la description */}
                  <tr className="border-b">
                    <td className="p-4 font-semibold text-gray-700">Rendement</td>
                    {products.map(product => {
                      const match = product.description?.match(/(\d+)\s*m²\s*\/\s*litre/i) 
                        || product.description?.match(/env\.\s*(\d+)\s*m²/i);
                      return (
                        <td key={product.id} className="p-4 text-center text-gray-600">
                          {match ? `~${match[1]} m²/L` : '-'}
                        </td>
                      );
                    })}
                  </tr>

                  {/* Séchage - extrait de la description */}
                  <tr className="border-b">
                    <td className="p-4 font-semibold text-gray-700">Séchage</td>
                    {products.map(product => {
                      const match = product.description?.match(/(\d+)h?\s*entre\s*couches/i)
                        || product.description?.match(/Séchage[^:]*:\s*([^,\n]+)/i);
                      return (
                        <td key={product.id} className="p-4 text-center text-gray-600">
                          {match ? match[1] + (match[1].includes('h') ? '' : 'h') : '-'}
                        </td>
                      );
                    })}
                  </tr>

                  {/* Fiche technique PDF */}
                  <tr className="border-b bg-blue-50">
                    <td className="p-4 font-semibold text-gray-700">Fiche technique</td>
                    {products.map(product => (
                      <td key={product.id} className="p-4 text-center">
                        {(product as any).pdf_url ? (
                          <a
                            href={(product as any).pdf_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-lg text-sm font-medium transition-colors"
                          >
                            <FileText className="w-4 h-4" />
                            Voir PDF
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </td>
                    ))}
                  </tr>

                  {/* Actions */}
                  <tr className="bg-gray-50">
                    <td className="p-4 font-semibold text-gray-700">Action</td>
                    {products.map(product => (
                      <td key={product.id} className="p-4 text-center">
                        <button
                          onClick={() => handleAddToCart(product)}
                          className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
                        >
                          <ShoppingCart className="w-4 h-4" />
                          Ajouter
                        </button>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Retour */}
          <div className="mt-8 text-center">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-gray-600 hover:text-blue-600 font-medium"
            >
              <ArrowLeft className="w-5 h-5" />
              Continuer mes achats
            </Link>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}
