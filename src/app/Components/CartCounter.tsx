"use client";
import React, { createContext, useContext, useState, useCallback } from 'react';

interface CartItem {
  slug: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  originalPrice: number;
  category: string;
  uniqueKey: string;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: any, quantity?: number) => void;
  removeFromCart: (uniqueKey: string) => void;
  updateQuantity: (uniqueKey: string, quantity: number) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = useCallback((product: any, quantity: number = 1) => {
    setCartItems(prevItems => {
      const uniqueKey = `${product.category}-${product.slug}`;
      
      const existingItem = prevItems.find(item => item.uniqueKey === uniqueKey);
      
      if (existingItem) {
        return prevItems.map(item =>
          item.uniqueKey === uniqueKey 
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }

      return [...prevItems, {
        slug: product.slug,
        name: product.name,
        price: product.price,
        quantity,
        image: product.image,
        originalPrice: product.originalPrice,
        category: product.category,
        uniqueKey
      }];
    });
  }, []);

  const removeFromCart = useCallback((uniqueKey: string) => {
    setCartItems(prevItems => prevItems.filter(item => item.uniqueKey !== uniqueKey));
  }, []);

  const updateQuantity = useCallback((uniqueKey: string, quantity: number) => {
    setCartItems(prevItems =>
      prevItems.map(item => 
        item.uniqueKey === uniqueKey ? { ...item, quantity } : item
      )
    );
  }, []);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
} 