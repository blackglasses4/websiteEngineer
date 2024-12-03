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

  const addToCart = (productDetails) => {
    setCart((prevCart) => {
      const isExisting = prevCart.some(
        (item) =>
          item.productId === productDetails.productId &&
          item.size === productDetails.size &&
          item.image === productDetails.image &&
          item.price === productDetails.price &&
          item.color === productDetails.color
      );
      
      if (!isExisting) {
        return [...prevCart, productDetails]; // Dodaj nowy produkt do koszyka
      }
      return prevCart;// Unikamy duplikatów
    });
  };

  const removeFromCart = (productToRemove) => {
    setCart((prevCart) =>
      prevCart.filter(
        (product) =>
          product.productId !== productToRemove.productId ||
          product.size !== productToRemove.size ||
          product.color !== productToRemove.color
      )
    );
  };
  
  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
