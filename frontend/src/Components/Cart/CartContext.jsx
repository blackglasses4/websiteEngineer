import React, { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    // Wczytaj tylko ID produktów z localStorage
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];  // Sprawdzamy, czy są zapisane ID w koszyku
  });

  // Zapisujemy ID produktów do localStorage
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));  // Zapisujemy tylko ID produktów
  }, [cart]);

  const addToCart = (productId) => {
    setCart((prevCart) => {
      if (!prevCart.includes(productId)) {
        return [...prevCart, productId];  // Dodajemy tylko ID, nie cały obiekt
      }
      return prevCart;  // Unikamy duplikatów
    });
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((id) => id !== productId));  // Usuwamy produkt na podstawie ID
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
