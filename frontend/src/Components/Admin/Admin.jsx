import React, { useState, useEffect } from 'react';
import { FaUserCircle, FaSearch } from 'react-icons/fa';
import ThemeSwitch from '../ThemeSwitch/ThemeSwitch';
import './Admin.scss';

const Admin = () => {
    const [input, setInput] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [dataProducts, setDataProducts] = useState([]);  

    useEffect(() => {
        const fetchProducts = async () => {
          try {
            const response = await fetch('http://localhost:3001/products');
            const data = await response.json();
            setDataProducts(data);
          } catch(error) {
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
          console.log("Wyniki wyszukiwania:", filterResults);
        }
    }, [input, dataProducts]);

    const handleInputChange = (e) => {
        setInput(e.target.value);
    };
    
    return (
        <>
            <header className='header-admin'>
                <a href="/" className='a-name' rel='internal'>NAZWA</a>
                <h3>Admin Panel</h3>
                <div className='nav-icons'>
                    <ThemeSwitch />
                    <a href="/"><FaUserCircle/></a>
                </div>
            </header>

            <nav className='nav-admin'>
                <div className="nav-search">
                    <div className="input-wrapper">
                    <FaSearch id="search-icon" />
                    <input
                        placeholder="Szukaj..."
                        value={input}
                        onChange={handleInputChange}
                    />
                    </div>

                    <div className='input-response'>
                    {input && searchResults.length === 0 && <p>Nie znaleziono żadnych wyników</p>} 
                    {input && searchResults.length > 0 && (
                    <ul>
                        {searchResults.map((product) => (
                        <li key={product.id}>
                            <a href={`/product/${product.id}`}>{product.name.length > 50 ? `${product.name.slice(0, 50)}...` : product.name}</a>
                        </li>
                        ))}
                    </ul>
                    )}
                    </div>
                </div>
            </nav>

            <section className="search-products">
                    <h1>Wyszukane produkty</h1>
                {/* {products.length === 0 ? (
                    <p className='cart-empty'>Koszyk jest pusty &nbsp;&rarr; &nbsp;<a href="/">Przejdź do sklepu</a></p>
                ) : ( */}
                    
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
                        <th>Usuń</th>
                    </tr>
                    </thead>
                    <tbody>
                    {/* {products.map((product) => (
                        <tr key={product.id}>
                        <td data-label="Produkt"><img src={product.image} alt={product.name} className="cart-item-image" /></td>
                        <td data-label="Tytuł"><p>{product.name.length > 25 ? `${product.name.slice(0,25)}...` : product.name}</p></td>
                        <td data-label="Cena">{product.new_price} zł</td>
                        <td data-label="Ilość">
                            <input
                            type="number"
                            value={product.quantity}
                            min="1"
                            onChange={(e) => updateQuantity(product.id, parseInt(e.target.value, 10))}
                            />
                        </td>
                        <td data-label="Całkowita cena">{(product.new_price * product.quantity).toFixed(2)} zł</td>
                        <td>
                            <button onClick={() => removeFromCart(product.id)} className="remove-button">
                            Usuń
                            </button>
                        </td>
                        </tr>
                    ))} */}
                    </tbody>
                </table>
                {/* )} */}
            </section>
        </>
  )
}

export default Admin