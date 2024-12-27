import React, { createContext, useState, useEffect, useContext } from 'react';
import { getProducts } from '../backend';

const ProductContext = createContext();

export const useProducts = () => {
    const context = useContext(ProductContext);
    return context;
};

export const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                //do zmiany
                const response = await getProducts();
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                console.error("Błąd podczas pobierania produktów", error);
                setError(true);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    return (
        <ProductContext.Provider value={{ products, error, loading }}>
            {children}
        </ProductContext.Provider>
    );
};
