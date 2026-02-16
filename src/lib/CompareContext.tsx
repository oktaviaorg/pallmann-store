import React, { createContext, useContext, useState, useEffect } from 'react';

interface Product {
  id: string;
  name: string;
  slug: string;
  description?: string;
  price_public_ht: number;
  image_url?: string;
  category_name?: string;
  unit?: string;
  pack_size?: number;
  ref?: string;
  pdf_url?: string;
  features?: string[];
}

interface CompareContextType {
  products: Product[];
  addProduct: (product: Product) => void;
  removeProduct: (id: string) => void;
  clearAll: () => void;
  isInCompare: (id: string) => boolean;
  canAdd: boolean;
}

const CompareContext = createContext<CompareContextType | undefined>(undefined);

const MAX_COMPARE = 3;

export const CompareProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);

  // Charger depuis localStorage
  useEffect(() => {
    const saved = localStorage.getItem('compareProducts');
    if (saved) {
      try {
        setProducts(JSON.parse(saved));
      } catch (e) {}
    }
  }, []);

  // Sauvegarder dans localStorage
  useEffect(() => {
    localStorage.setItem('compareProducts', JSON.stringify(products));
  }, [products]);

  const addProduct = (product: Product) => {
    if (products.length >= MAX_COMPARE) return;
    if (products.find(p => p.id === product.id)) return;
    setProducts([...products, product]);
  };

  const removeProduct = (id: string) => {
    setProducts(products.filter(p => p.id !== id));
  };

  const clearAll = () => {
    setProducts([]);
  };

  const isInCompare = (id: string) => {
    return products.some(p => p.id === id);
  };

  return (
    <CompareContext.Provider value={{
      products,
      addProduct,
      removeProduct,
      clearAll,
      isInCompare,
      canAdd: products.length < MAX_COMPARE
    }}>
      {children}
    </CompareContext.Provider>
  );
};

export const useCompare = () => {
  const context = useContext(CompareContext);
  if (!context) {
    throw new Error('useCompare must be used within CompareProvider');
  }
  return context;
};
