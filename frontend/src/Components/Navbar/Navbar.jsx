import React, { useState, useEffect } from 'react'; // Dodajemy useEffect
import { FaSearch, FaShoppingCart, FaUserCircle, FaBars, FaTimes } from 'react-icons/fa';
import { useCart } from '../Cart/CartContext.jsx';
import ThemeSwitch from '../ThemeSwitch/ThemeSwitch.jsx';
import { useLikes } from '../LikeButton/LikeContext.jsx';
import LikeButton from '../LikeButton/LikeButton';
import { Link } from 'react-router-dom';
import { useProducts } from '../LikeButton/ProductContext.jsx'; // Importujemy useProducts
import './Navbar.scss';

const Navbar = () => {
  const [input, setInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const { dataProducts } = useProducts(); // Korzystamy z kontekstu Products
  const { likedProducts, toggleLike } = useLikes(); // Z kontekstu Like

  const { cart } = useCart();

  useEffect(() => {
    if (input === "") {
      setSearchResults([]);
    } else {
      // Sprawdzamy, czy dataProducts istnieje, zanim będziemy go używać
      if (dataProducts && Array.isArray(dataProducts)) {
        const filterResults = dataProducts.filter(product =>
          product.name.toLowerCase().includes(input.toLowerCase())
        );
        setSearchResults(filterResults);
      }
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

  // Renderujemy tylko wtedy, gdy dataProducts istnieje
  if (!dataProducts) {
    return <div>Ładowanie...</div>; // lub cokolwiek, co wskazuje na ładowanie danych
  }

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
                <a href={`/product/${product.id}`} onClick={closeMenu}>{product.name}</a>
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
        <a href="/"><FaUserCircle /></a>
        <div className="nav-like">
          <Link to="/liked" className="liked-products-link">
            <LikeButton
              style={{ color: 'white' }}
              isLiked={likedProducts.length > 0} 
              onToggle={() => toggleLike(dataProducts.map(p => p.id))}
            />
            <span>{likedProducts.length}</span>
          </Link>
        </div>
      </div>

      <div className="hamburger-menu" onClick={toggleMenu}>
        <FaBars />
      </div>

      <div className={`mobile-menu ${isMenuOpen ? 'open' : ''}`}>
        <div className="hamburger-menu" onClick={toggleMenu}>
          <FaTimes />
        </div>
        <div className="mobile-menu-icons">
          <ThemeSwitch />
          <a href="/cart" onClick={closeMenu}>
            <FaShoppingCart />
            <div className="nav-icons-cart">{cart.length}</div>
          </a>
          <a href="/" onClick={closeMenu}>
            <FaUserCircle />
          </a>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
