import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface CartItem {
  id: string;
  name: string;
  price_ht: number;
  quantity: number;
  image_url?: string;
  unit?: string;
}

interface CompanyCode {
  id: string;
  code: string;
  company_name: string;
  discount_percent: number;
}

interface CartContextType {
  items: CartItem[];
  companyCode: CompanyCode | null;
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  setCompanyCode: (code: CompanyCode | null) => void;
  subtotalHT: number;
  discountAmount: number;
  shippingHT: number;
  totalHT: number;
  totalTTC: number;
  itemCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const SHIPPING_THRESHOLD = 630; // Franco à partir de 630€ HT
const SHIPPING_COST = 15; // 15€ HT si < 630€
const TVA_RATE = 0.20;

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('pallmann-cart');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [companyCode, setCompanyCode] = useState<CompanyCode | null>(() => {
    const saved = localStorage.getItem('pallmann-company-code');
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    localStorage.setItem('pallmann-cart', JSON.stringify(items));
  }, [items]);

  useEffect(() => {
    if (companyCode) {
      localStorage.setItem('pallmann-company-code', JSON.stringify(companyCode));
    } else {
      localStorage.removeItem('pallmann-company-code');
    }
  }, [companyCode]);

  const addItem = (item: Omit<CartItem, 'quantity'>) => {
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

  const clearCart = () => {
    setItems([]);
  };

  const subtotalHT = items.reduce((sum, item) => sum + item.price_ht * item.quantity, 0);
  
  const discountAmount = companyCode 
    ? subtotalHT * (companyCode.discount_percent / 100) 
    : 0;
  
  const subtotalAfterDiscount = subtotalHT - discountAmount;
  
  const shippingHT = subtotalAfterDiscount >= SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
  
  const totalHT = subtotalAfterDiscount + shippingHT;
  
  const totalTTC = totalHT * (1 + TVA_RATE);
  
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider value={{
      items,
      companyCode,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      setCompanyCode,
      subtotalHT,
      discountAmount,
      shippingHT,
      totalHT,
      totalTTC,
      itemCount,
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
