import React, { useState, useEffect } from 'react';
import { FaSearch, FaShoppingCart, FaUserCircle, FaBarsStaggered, FaTimes } from 'react-icons/fa';
import { useCart } from '../Cart/CartContext.jsx';
import ThemeSwitch from '../ThemeSwitch/ThemeSwitch.jsx';
import './Navbar.scss';

const Navbar = () => {
  const [input, setInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [dataProducts, setDataProducts] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { cart } = useCart();

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
      </div>

      <div className={`nav-icons ${isMenuOpen ? 'menu-open' : ''}`}>
        <ThemeSwitch />
        <a href="/cart">
          <FaShoppingCart />
          <div className="nav-icons-cart">{cart.length}</div>
        </a>
        <a href="/"><FaUserCircle /></a>
      </div>
    </header>
  );
};

export default Navbar;
