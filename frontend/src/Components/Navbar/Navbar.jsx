import React, { useState, useEffect } from 'react';
import { FaSearch, FaShoppingCart, FaUserCircle, FaBars, FaTimes } from 'react-icons/fa';
import { FaBarsStaggered } from "react-icons/fa6";
import ThemeSwitch from '../ThemeSwitch/ThemeSwitch.jsx';
import './Navbar.scss';

const Navbar = () => {
  const [input, setInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [dataProducts, setDataProducts] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

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

      <div className={`nav-icons ${isMenuOpen ? 'menu-open' : ''}`}>
        <ThemeSwitch />
        <a href="/cart"><FaShoppingCart /><div className="nav-icons-cart">0</div></a>
        <a href="/"><FaUserCircle /></a>
      </div>

      <div className="hamburger-menu" onClick={toggleMenu}>
        <FaBarsStaggered id="hamburger-icon" />
      </div>

      {isMenuOpen && (
        <div className="mobile-menu">
          <div className="close-menu" onClick={closeMenu}>
            <FaTimes id="close-icon" />
          </div>
          <a href="/cart"><FaShoppingCart /></a>
          <a href="/"><FaUserCircle /></a>
          <ThemeSwitch />
        </div>
      )}
    </header>
  );
};

export default Navbar;
