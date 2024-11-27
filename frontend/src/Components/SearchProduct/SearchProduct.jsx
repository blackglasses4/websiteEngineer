import React, { useState, useEffect, useRef } from 'react';
import { FaUserCircle, FaSearch } from 'react-icons/fa';
import ThemeSwitch from '../ThemeSwitch/ThemeSwitch';
import './SearchProduct.scss';

const SearchProduct = () => {
    const [input, setInput] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [dataProducts, setDataProducts] = useState([]);
    const [confirmedResults, setConfirmedResults] = useState([]);
    const inputWrapperRef = useRef(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('http://localhost:3001/products');
                const data = await response.json();
                setDataProducts(data);
            } catch (error) {
                console.error("Błąd podczas pobierania danych:", error);
            }
        };

        fetchProducts();
    }, []);

    useEffect(() => {
        if (input === "") {
            setSearchResults([]);
        } else {
            const filterResults = dataProducts.filter(product =>
                product.name.toLowerCase().includes(input.toLowerCase())
            );
            setSearchResults(filterResults);
        }
    }, [input, dataProducts]);

    const handleInputChange = (e) => {
        setInput(e.target.value);
    };

    const handleKey = (e) => {
        if (e.key === "Enter") {
            setConfirmedResults(searchResults);
            setInput("");
        }
    };

    const handleReset = () => {
        setConfirmedResults([]);
        setInput("");
    };

    const handleClickOutside = (event) => {
        if (inputWrapperRef.current && !inputWrapperRef.current.contains(event.target)) {
            setInput("");
        }
    };

    const handleEscKey = (e) => {
        if (e.key === 'Escape') {
            setInput("");
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("keydown", handleEscKey);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("keydown", handleEscKey);
        };
    }, []);

    return (
        <div className="search-product">
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
                                    <a href="#" onClick={(e) => {
                                        e.preventDefault();
                                        setConfirmedResults((prevResults) => {
                                            if(prevResults.some((item) => item.id === product.item)) {
                                                return prevResults;
                                            }
                                            return [...prevResults, product];
                                        });
                                    }}>{product.name.length > 50 ? `${product.name.slice(0, 50)}...` : product.name}</a>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>

            <section className="admin-search_products">
                <button className='button-reset' onClick={handleReset}>Resetuj</button>
                {confirmedResults.length === 0 ? (
                    <p className='search-empty'>Brak wyników do wyświetlenia. Spróbuj wyszukać produkt powyżej.</p>
                ) : (
                    <table className="admin-search_table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Kategoria</th>
                                <th>Nazwa</th>
                                <th>Zdjęcie</th>
                                <th>Popularne</th>
                                <th>Nowa cena</th>
                                <th>Stara cena</th>
                                <th>Opis</th>
                                <th>Rozmiary</th>
                                <th>Edytuj</th>
                                <th>Usuń</th>
                            </tr>
                        </thead>
                        <tbody>
                            {confirmedResults.map((product) => (
                                <tr key={product.id}>
                                    <td>{product.id}</td>
                                    <td>{product.category || 'Brak'}</td>
                                    <td>{product.name.length > 25 ? `${product.name.slice(0,25)}...` : product.name}</td>
                                    <td><img src={product.image} alt={product.name} className="cart-item-image" /></td>
                                    <td>{product.popular === "true" ? 'Tak' : 'Nie'}</td>
                                    <td>{product.new_price} zł</td>
                                    <td>{product.old_price ? `${product.old_price} zł` : '—'}</td>
                                    <td>{product.description ? product.description.slice(0,25) + '...' : 'Brak opisu'}</td>
                                    <td>{product.sizes.join(', ') || 'Brak'}</td>
                                    <td><button className='button-edit'>Edytuj</button></td>
                                    <td><button className='button-delete'>Usuń</button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </section>

            <section className="admin-search_products-mobile">
                <button className='button-reset' onClick={handleReset}>Resetuj</button>
                {confirmedResults.length === 0 ? (
                    <p className='search-empty'>Brak wyników do wyświetlenia. Spróbuj wyszukać produkt powyżej.</p>
                ) : (
                    <div className="search-mobile">
                        {confirmedResults.map((product) => (
                            <div className="search-mobile_product" key={product.id}>
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="product-image"
                                />
                                <div className="product-details">
                                    <p><span>ID: </span>{product.id}</p>
                                    <p><span>Nazwa: </span>{product.name.length > 25 ? `${product.name.slice(0, 25)}...` : product.name}</p>
                                    <p><span>Popularne: </span>{product.popular ? 'Tak' : 'Nie'}</p>
                                    <p><span>Nowa cena: </span>{product.new_price} zł</p>
                                    <p><span>Stara cena: </span>{product.old_price ? `${product.old_price} zł` : '—'}</p>
                                    <p><span>Opis: </span>{product.description ? product.description.slice(0, 50) + '...' : 'Brak opisu'}</p>
                                    <p><span>Rozmiary: </span>{product.sizes.join(', ') || 'Brak'}</p>
                                    
                                    <div className="mobile-button">
                                        <button className='button-edit'>Edytuj</button>
                                        <button className='button-delete'>Usuń</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </section>
        </div>
    );
};

export default SearchProduct;
