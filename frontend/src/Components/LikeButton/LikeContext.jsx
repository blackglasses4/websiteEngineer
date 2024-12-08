import React, { createContext, useState, useContext } from 'react';

// Kontekst dla polubionych produktów
const LikeContext = createContext();

export const LikeProvider = ({ children }) => {
  const [likedProducts, setLikedProducts] = useState([]);

  // Funkcja zmieniająca status "polubienia" produktu
  const toggleLike = (productId) => {
    setLikedProducts((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId) // Usuwanie z listy polubionych
        : [...prev, productId] // Dodawanie do listy polubionych
    );
  };

  return (
    <LikeContext.Provider value={{ likedProducts, toggleLike }}>
      {children}
    </LikeContext.Provider>
  );
};

export const useLikes = () => useContext(LikeContext);
