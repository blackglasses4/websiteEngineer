import React, { createContext, useState, useContext, useEffect } from 'react';
import { useUser } from '../../Pages/UserContext';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { usernameUser } = useUser();
  
  const [cart, setCart] = useState(() => {
    if (usernameUser) {
      const savedCart = localStorage.getItem('cart');
      return savedCart ? JSON.parse(savedCart) : [];
    }
    return [];
  });

  useEffect(() => {
    if (usernameUser) {
      const savedCart = localStorage.getItem('cart');
      setCart(savedCart ? JSON.parse(savedCart) : []);
    }
  }, [usernameUser]);

  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key === 'cart') {
        const updatedCart = JSON.parse(event.newValue || '[]');
        setCart(updatedCart);
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  useEffect(() => {
    if (usernameUser && cart.length > 0) {
      localStorage.setItem('cart', JSON.stringify(cart));
    }
  }, [cart, usernameUser]);

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
        return [...prevCart, productDetails];
      }
      return prevCart;
    });
  };

  const updateCart = (productId, updatedFields) => {
    setCart((prevCart) =>
      prevCart.map((product) =>
        product.productId === productId
          ? { ...product, ...updatedFields }
          : product
      )
    );
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
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
