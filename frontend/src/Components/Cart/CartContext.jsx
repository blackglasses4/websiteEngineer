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
      const uniqueId = `${productDetails.productId}-${productDetails.size}-${productDetails.color}`;
      const isExisting = prevCart.some((item) => item.uniqueId === uniqueId);
  
      if (!isExisting) {
        return [
          ...prevCart,
          { ...productDetails, uniqueId, quantity: 1 }, // Dodajemy nowy produkt
        ];
      }
  
      // Jeśli istnieje, zwiększ ilość
      return prevCart.map((item) =>
        item.uniqueId === uniqueId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    });
  };  

  const updateCart = (uniqueId, updatedFields) => {
    setCart((prevCart) =>
      prevCart.map((product) =>
        product.uniqueId === uniqueId
          ? { ...product, ...updatedFields }
          : product
      )
    );
  };

  const removeFromCart = (productToRemove) => {
    setCart((prevCart) =>
      prevCart.filter((product) => product.uniqueId !== productToRemove.uniqueId)
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