import React, { createContext, useContext, useState } from 'react';

// Tworzymy kontekst polubień
const LikesContext = createContext();

// Hook pomocniczy
export const useLikes = () => useContext(LikesContext);

// Provider, który będzie udostępniał dane o polubionych produktach
const LikesProvider = ({ children }) => {
  const [likedProducts, setLikedProducts] = useState([]);

  const toggleLike = (id) => {
    setLikedProducts((prev) =>
      prev.includes(id) ? prev.filter((productId) => productId !== id) : [...prev, id]
    );
  };

  return (
    <LikesContext.Provider value={{ likedProducts, toggleLike }}>
      {children}
    </LikesContext.Provider>
  );
};

export default LikesProvider;
