import React, { useState, useEffect, useRef } from 'react';
import { FaSearch } from 'react-icons/fa';
import useClick from '../useClick';
import './SearchProduct.scss';

const SearchBar = ({ products, setConfirmedResults }) => {
    const [input, setInput] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const inputWrapperRef = useRef(null);

    useClick(inputWrapperRef, () => setInput("")); 

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
