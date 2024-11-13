import React, { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import { FaShoppingCart } from 'react-icons/fa';
import { FaUserCircle } from "react-icons/fa";
import ThemeSwitch from '../ThemeSwitch/ThemeSwitch.jsx';
import './Navbar.scss';

const Navbar = () => {
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
    if(input === "") {
      setSearchResults([]);
    }
    else {
      const filterResults = dataProducts.filter(product => 
        product.name.toLowerCase().includes(input.toLowerCase())
      );
      setSearchResults(filterResults);
    }
  }, [input, dataProducts]);

  const handleInputChange = (e) => {
    setInput(e.target.value);
  }

  return (
    <header>
      <a href="/" className='a-name' rel='internal'>NAZWAAAAA</a>

      <div className="nav-search">
        <div className='input-wrapper'>
          <FaSearch id="search-icon" />
          <input
            placeholder='Szukaj...'
            value={input}
            onChange={handleInputChange}
          />
        </div>

        <div className='input-response'>
          {input && searchResults.length === 0 && <p>Nie znaleziono żadnych wyników</p>} 
          {input && searchResults.length > 0 && (
            <ul>
              {searchResults.map(product => (
                <li key={product.id}>
                  <a href={`/product/${product.id}`}>{product.name}</a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className='nav-icons'>
        <ThemeSwitch/>
        <a href="/cart"><FaShoppingCart/><div className="nav-icons-cart">0</div></a>
        <a href="/"><FaUserCircle/>
        </a>
      </div>
    </header>
  );
}

export default Navbar;
