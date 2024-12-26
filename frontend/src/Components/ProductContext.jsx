import React, { createContext, useState, useEffect, useContext } from 'react';
import {BACKEND_URL, BACKEND_URL2} from './config';

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
                const response = await fetch(`${BACKEND_URL2}/products/products_list`);
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
