import React, { createContext, useState, useContext, useEffect } from 'react';
import { useUser } from '../../Pages/UserContext'; 

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { usernameUser } = useUser();
  const [cart, setCart] = useState([]);

  const getCartKey = () => (usernameUser ? `cart_${usernameUser}` : null);

  useEffect(() => {
    const cartKey = getCartKey();
    if (cartKey) {
      const savedCart = localStorage.getItem(cartKey);
      setCart(savedCart ? JSON.parse(savedCart) : []);
    } else {
      setCart([]);
    }
  }, [usernameUser]);

  useEffect(() => {
    const cartKey = getCartKey();
    if (cartKey) {
      localStorage.setItem(cartKey, JSON.stringify(cart));
    }
  }, [cart, usernameUser]);

  const addToCart = (productDetails) => {
    setCart((prevCart) => {
      const isExisting = prevCart.some(
        (item) =>
          item.productId === productDetails.productId &&
          item.size === productDetails.size &&
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

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, updateCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);