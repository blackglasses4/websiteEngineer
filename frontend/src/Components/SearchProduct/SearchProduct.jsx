import React, { useState, useEffect, useRef } from 'react';
import { FaUserCircle, FaSearch } from 'react-icons/fa';
import ThemeSwitch from '../ThemeSwitch/ThemeSwitch';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './SearchProduct.scss';

const SearchProduct = () => {
    const [input, setInput] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [products, setProducts] = useState([]);
    const [confirmedResults, setConfirmedResults] = useState([]);
    const inputWrapperRef = useRef(null);
    const [productToDelete, setProductToDelete] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('http://localhost:3001/products');
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                toast.error('Nie udało się załadować produktów.', {
                    position: 'top-right',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
        };

        fetchProducts();
    }, []);

    const handleConfirmDelete = (id) => {
        if(!id) {
            console.error('Id is undefined or invalid');
            return;
        }

        setProductToDelete(id);
        
        const toastId = toast.info((
            <div>
                <p>Czy na pewno chcesz usunąć ten produkt?</p>
                <div className='toast-div'>
                    <button onClick={() => handleDeleteProdukt(id, toastId)}>Usuń</button>
                    <button onClick={() => toast.dismiss(toastId)}>Anuluj</button>
                </div>
            </div>
        ), {
            className: "custom-toast",
            autoClose: false,
        });
              
    };    

    const handleDeleteProdukt = async (id, toastId) => {
        if (!id) {
            console.error('ID is undefined or invalid');
            return;
        }

        try {
            const response = await fetch(`http://localhost:3001/products/${id}`, {
                method: 'DELETE',
            });
    
            if (!response.ok) {
                throw new Error('Wystąpił błąd podczas usuwania produktu.');
            }
    
            setProducts((prev) => prev.filter((product) => product.id !== id));
    
            toast.success('Produkt został usunięty!', {
                position: 'top-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });

            toast.dismiss(toastId);
        } catch (err) {
            toast.error(err.message || 'Nie udało się usunąć produktu.', {
                position: 'top-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            toast.dismiss(toastId);
        } finally {
            setProductToDelete(null);
            toast.dismiss(toastId);
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
                                    <td><button className='button-delete' onClick={() => handleConfirmDelete(product.id)}>Usuń</button></td>
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
                                        <button className='button-delete' onClick={() => handleConfirmDelete(product.id)}>Usuń</button>
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
