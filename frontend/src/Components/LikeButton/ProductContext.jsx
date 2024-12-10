import React, { createContext, useState, useEffect, useContext } from 'react';

// Kontekst dla produktów
const ProductsContext = createContext();

export const useProducts = () => {
  return useContext(ProductsContext);
};

export const ProductsProvider = ({ children }) => {
  const [dataProducts, setDataProducts] = useState([]);

  // Pobieranie produktów z API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:3001/products');
        const data = await response.json();
        setDataProducts(data); // Przechowujemy wszystkie produkty
      } catch (error) {
        console.error("Błąd podczas pobierania danych:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <ProductsContext.Provider value={{ dataProducts }}>
      {children}
    </ProductsContext.Provider>
  );
};
