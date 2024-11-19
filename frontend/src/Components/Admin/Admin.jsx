import React, { useState, useEffect, useRef } from 'react';
import { FaUserCircle, FaSearch } from 'react-icons/fa';
import ThemeSwitch from '../ThemeSwitch/ThemeSwitch';
import './Admin.scss';

const Admin = () => {
    const [input, setInput] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [dataProducts, setDataProducts] = useState([]);
    const [confirmedResults, setConfirmedResults] = useState([]);
    const inputWrapperRef = useRef(null); // Ref to detect clicks outside

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

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <>
            <header className='header-admin'>
                <a href="/" className='a-name' rel='internal'>NAZWA</a>
                <h3>Admin Panel</h3>
                <div className='nav-icons'>
                    <ThemeSwitch />
                    <a href="/"><FaUserCircle /></a>
                </div>
            </header>

            <nav className='nav-admin'>
                <div className="nav-search" ref={inputWrapperRef}>
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
            </nav>

            <section className="search-products">
                <h1>Wyszukane produkty</h1>
                <button className='button-reset' onClick={handleReset}>Resetuj</button>
                {confirmedResults.length === 0 ? (
                    <p className='cart-empty'>Brak wyników do wyświetlenia. Spróbuj wyszukać produkt powyżej.</p>
                ) : (
                    <table className="cart-table">
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
                                    <td>{product.name}</td>
                                    <td><img src={product.image} alt={product.name} className="cart-item-image" /></td>
                                    <td>{product.popular ? 'Tak' : 'Nie'}</td>
                                    <td>{product.new_price} zł</td>
                                    <td>{product.old_price ? `${product.old_price} zł` : '—'}</td>
                                    <td>{product.description ? product.description.slice(0, 50) + '...' : 'Brak opisu'}</td>
                                    <td>{product.sizes.join(', ') || 'Brak'}</td>
                                    <td><button className='button-edit'>Edytuj</button></td>
                                    <td><button className='button-delete'>Usuń</button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </section>
        </>
    );
};

export default Admin;
