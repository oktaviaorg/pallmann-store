import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface QuoteItem {
  id: string;
  name: string;
  price_ht: number;
  quantity: number;
  image_url?: string;
  unit?: string;
}

interface QuoteContextType {
  items: QuoteItem[];
  addItem: (item: Omit<QuoteItem, 'quantity'>) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearQuote: () => void;
  itemCount: number;
  totalHT: number;
  isInQuote: (id: string) => boolean;
}

const QuoteContext = createContext<QuoteContextType | undefined>(undefined);

const STORAGE_KEY = 'pallmann-quote';

export function QuoteProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<QuoteItem[]>(() => {
    if (typeof window === 'undefined') return [];
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const addItem = (item: Omit<QuoteItem, 'quantity'>) => {
    setItems(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => 
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeItem = (id: string) => {
    setItems(prev => prev.filter(i => i.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id);
    } else {
      setItems(prev => prev.map(i => 
        i.id === id ? { ...i, quantity } : i
      ));
    }
  };

  const clearQuote = () => {
    setItems([]);
  };

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  
  const totalHT = items.reduce((sum, item) => sum + item.price_ht * item.quantity, 0);

  const isInQuote = (id: string) => items.some(item => item.id === id);

  return (
    <QuoteContext.Provider value={{
      items,
      addItem,
      removeItem,
      updateQuantity,
      clearQuote,
      itemCount,
      totalHT,
      isInQuote,
    }}>
      {children}
    </QuoteContext.Provider>
  );
}

export function useQuote() {
  const context = useContext(QuoteContext);
  if (!context) {
    throw new Error('useQuote must be used within a QuoteProvider');
  }
  return context;
}
