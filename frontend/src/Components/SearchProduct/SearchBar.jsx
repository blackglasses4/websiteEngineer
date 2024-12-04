import React, { useState, useEffect, useRef } from 'react';
import { FaSearch } from 'react-icons/fa';
import './SearchProduct.scss';

const SearchBar = ({ products, setConfirmedResults }) => {
    const [input, setInput] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const inputWrapperRef = useRef(null);

    // Handle input change
    const handleInputChange = (e) => {
        setInput(e.target.value);
    };

    // Handle Enter key
    const handleKey = (e) => {
        if (e.key === "Enter") {
            setConfirmedResults(searchResults);
            setInput("");
        }
    };

    // Clear input on Esc key
    const handleEscKey = (e) => {
        if (e.key === 'Escape') {
            setInput("");
        }
    };

    // Handle click outside input to reset input
    const handleClickOutside = (event) => {
        if (inputWrapperRef.current && !inputWrapperRef.current.contains(event.target)) {
            setInput("");
        }
    };

    useEffect(() => {
        if (input === "") {
            setSearchResults([]);
        } else {
            const filterResults = products.filter(product =>
                product.name.toLowerCase().includes(input.toLowerCase())
            );
            setSearchResults(filterResults);
        }
    }, [input, products]);

    // Adding event listeners for click outside and Esc key
    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("keydown", handleEscKey);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("keydown", handleEscKey);
        };
    }, []);

    return (
        <>
            <h1 className='admin-h1'>Wyszukane produkty</h1>

            <div className="admin-search" ref={inputWrapperRef}>
                <div className="input-wrapper">
                    <FaSearch id="search-icon" />
                    <input
                        placeholder="Szukaj..."
                        value={input}
                        onChange={handleInputChange}
                        onKeyDown={handleKey}
                    />
                </div>

                <div className='input-response'>
                    {input && searchResults.length === 0 && <p>Nie znaleziono żadnych wyników</p>}
                    {input && searchResults.length > 0 && (
                        <ul>
                        {searchResults.map((product) => (
                            <li key={product.id}>
                                <button
                                    onClick={(e) => {
                                        setConfirmedResults((prevResults) => {
                                            if (prevResults.some((item) => item.id === product.id)) {
                                                return prevResults;
                                            }
                                            return [...prevResults, product];
                                        });
                                    }}>
                                    {product.name.length > 50 ? `${product.name.slice(0, 50)}...` : product.name}
                                </button>
                            </li>
                        ))}
                    </ul>                    
                    )}
                </div>
            </div>
        </>
    );
}

export default SearchBar;
