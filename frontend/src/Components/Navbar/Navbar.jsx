import React, { useState, useEffect } from 'react';
import { FaSearch, FaShoppingCart, FaUserCircle, FaBars, FaTimes } from 'react-icons/fa';
import { useCart } from '../Cart/CartContext.jsx';
import ThemeSwitch from '../ThemeSwitch/ThemeSwitch.jsx';
import NavbarCategory from './NavbarCategory.jsx'

import { useLikes } from '../LikeButton/LikeContext.jsx';
import LikeButton from '../LikeButton/LikeButton';
import { Link } from 'react-router-dom';
import { useProducts } from '../LikeButton/ProductContext.jsx';
import LikeProductModal from '../LikeButton/LikeProductModal';
import './Navbar.scss';

const Navbar = () => {
  const [input, setInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  
  const { dataProducts } = useProducts();
  const { likedProducts, toggleLike } = useLikes();
  const { cart } = useCart();

  useEffect(() => {
    if (input === "") {
      setSearchResults([]);
    } else if (dataProducts && Array.isArray(dataProducts)) {
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

  const toggleModal = () => {
    setModalOpen(!isModalOpen);
  };

  return (
    <header className='header-main'>
      <a href="/" className="a-name" rel="internal">NAZWAAAAA</a>

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
                <a href={`/product/${product.id}`} onClick={toggleMenu}>{product.name}</a>
              </li>
            ))}
          </ul>
        )}
        </div>
      </div>

      <div className={`nav-icons ${isMenuOpen ? 'menu-open' : ''}`}>
        <ThemeSwitch />
        <a href="/cart">
          <FaShoppingCart />
          <div className="nav-icons-cart">{cart.length}</div>
        </a>

        <div className="nav-like">
          <div className="liked-products-link">
            <LikeButton
              onClick={toggleModal}
              style={{ color: 'white' }}
              isLiked={likedProducts.length > 0}/>
            <span>{likedProducts.length}</span>
          </div>
        </div>
        <a href="/"><FaUserCircle /></a>

        {isModalOpen && (
          <LikeProductModal
            likedProducts={likedProducts}
            dataProducts={dataProducts}
            onClose={toggleModal}
            toggleLike={toggleLike}
          />
        )}
      </div>

      <div className="hamburger-menu" onClick={toggleMenu}>
        <FaBars style={{color:"white"}}/>
      </div>

      <div className={`mobile-menu ${isMenuOpen ? 'open' : ''}`}>
        <div className="hamburger-menu" onClick={toggleMenu}>
          <FaTimes />
        </div>
        <div className="mobile-menu-icons">
          <ThemeSwitch />
          <a href="/cart" onClick={toggleMenu}>
            <FaShoppingCart />
            <div className="nav-icons-cart">{cart.length}</div>
          </a>
          <a href="/" onClick={toggleMenu}>
            <FaUserCircle />
          </a>
          <div className="nav-like">
            <div className="liked-products-link">
              <LikeButton
                onClick={toggleModal}
                style={{ color: 'white' }}
                isLiked={likedProducts.length > 0}/>
              <span>{likedProducts.length}</span>
            </div>
          </div>
          <p>Kategorie</p>
          <div className='mobile-nav-category'>
            <Link to="/koszulka" className='a-name' rel='internal'>Koszulki</Link>
            <Link to="/kurtka" className='a-name' rel='internal'>Kurtki</Link>
            <Link to="/koszulka" className='a-name' rel='internal'>Koszulki</Link>
            <Link to="/kurtka" className='a-name' rel='internal'>Kurtki</Link>
            <Link to="/koszulka" className='a-name' rel='internal'>Koszulki</Link>
            <Link to="/equipment" className='a-name' rel='internal'>Sprzęty</Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
