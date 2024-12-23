import React, { useState, useEffect, useRef } from 'react';
import { FaSearch, FaShoppingCart, FaUserCircle, FaBars, FaTimes } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import ThemeSwitch from '../ThemeSwitch/ThemeSwitch.jsx';
import { toast } from "react-toastify";
import { useProducts } from '../LikeButton/ProductContext.jsx';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

import useClick from '../useClick.jsx';
import { useUser } from '../../Pages/UserContext.jsx';
import { useCart } from '../Cart/CartContext.jsx';


import './Navbar.scss';

const Navbar = () => {
  const [input, setInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isUserMenuOpen, setUserMenuOpen] = useState(false);
  const searchWrapperRef = useRef(null);
  const { dataProducts } = useProducts();
  const { cart } = useCart();
  const { usernameUser, logout } = useUser();
  
  const navigate = useNavigate();
  useClick(searchWrapperRef, () => setInput(""));
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

  const toggleUserMenu = () => {
    if (!usernameUser) return;
    setUserMenuOpen(!isUserMenuOpen);
  };

  const buttonLogout = () => {
    logout();

    toast.success("Wylogowałeś się!");

    setTimeout(() => {
      navigate("/login");
    }, 1000);
  };

  return (
    <header className='header-main'>
      <a href="/" className="a-name" rel="internal" aria-label="Logo sklepu internetowego">
        <LazyLoadImage
          src="/images/logo.png"
          effect="blur"
          className="logo"
          alt="Logo sklepu"
          width="100px"
          height="auto"
        />
      </a>
      {/* „zaopatrz się” lub „przygotuj się” na sportowe wyzwania to oznacza gearUp */}

      <div className="nav-search" ref={searchWrapperRef}>
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
        <a href="/cart" aria-label="Przycisk do przejścia na stronę z koszykiem">
          <FaShoppingCart />
          <div className="nav-icons-cart">{cart.length}</div>
        </a>

        {usernameUser ? (
          <div className="nav-user" onClick={toggleUserMenu}>
              <button onClick={buttonLogout}>Wyloguj się</button>
          </div>
        ) : (
          <a href="/login" aria-label="Przycisk do przejścia na stronę logowania"><FaUserCircle /></a>
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
          <a href="/cart" onClick={toggleMenu} aria-label="Przycisk do przejścia na stronę z koszykiem">
            <FaShoppingCart />
            <div className="nav-icons-cart">{cart.length}</div>
          </a>
            {usernameUser ? (
            <div className="nav-user" onClick={toggleUserMenu}>
                <button onClick={buttonLogout}>Wyloguj się</button>
            </div>
          ) : (
            <a href="/login" aria-label="Przycisk do przejścia na stronę logowania"><FaUserCircle /></a>
          )}
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
