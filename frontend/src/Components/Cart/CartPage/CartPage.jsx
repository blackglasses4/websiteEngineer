import React, { useEffect, useState } from 'react';
import { useCart } from '../CartContext';
import { useNavigate } from 'react-router-dom'; 
import colorTranslations from '../../../hooks/translations';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

import './CartPage.scss';

const CartPage = () => {
  const { cart, removeFromCart, updateCart, clearCart } = useCart();
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setProducts(cart.map(product => ({
      ...product,
      quantity: product.quantity || 1,
    })));
  }, [cart]);

  const updateQuantity = (productId, newQuantity) => {
    const validQuantity = Math.max(1, newQuantity);
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.productId === productId
          ? { ...product, quantity: validQuantity }
          : product
      )
    );
  
    updateCart(productId, { quantity: validQuantity });
  };  

  const calculateTotal = () => {
    return products.reduce((total, product) => {
      const price = product.price || 0;
      return total + price * (product.quantity || 1);
    }, 0);
  };

  const handleCheckout = () => {
    const orderData = cart.map((product) => ({
      productId: product.productId,
      quantity: product.quantity || 1,
      price: product.price || 0,
    }));

    localStorage.setItem('order', JSON.stringify(orderData));
    navigate('/order');
  };

  return (
    <>
    <section className="cart">
      <h1>Twój koszyk</h1>
      {products.length === 0 ? (
        <p className='cart-empty'>Koszyk jest pusty &nbsp;&rarr; &nbsp;<a href="/">Przejdź do sklepu</a></p>
      ) : (
        <>
          <table className="cart-table">
            <thead>
              <tr>
                <th>Produkt</th>
                <th>Tytuł</th>
                <th>Cena</th>
                <th>Rozmiar</th>
                <th>Kolor</th>
                <th>Ilość</th>
                <th>Całkowita cena</th>
                <th>Usuń</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.productId}>
                  <td data-label="Produkt"> {product.image ? (
                        <LazyLoadImage
                        src={product.image}
                        className='cart-item-image'
                        effect="blur"
                        alt={product.name}
                        width="100%"
                        height="auto"
                        threshold={100}
                      />
                      ) : (
                        <span>Brak zdjęcia</span>
                      )}</td>
                  <td data-label="Tytuł"><p>{product.name.length > 25 ? `${product.name.slice(0,25)}...` : product.name}</p></td>
                  <td data-label="Cena">{product.price} zł</td>
                  <td data-label="Rozmiar">{product.size}</td>
                  <td data-label="Kolor">{colorTranslations[product.color] || product.color}</td>
                  <td data-label="Ilość">
                    <input
                      type="number"
                      value={product.quantity || 1}
                      min="1"
                      onChange={(e) => updateQuantity(product.productId, parseInt(e.target.value, 10))}
                    />
                  </td>
                  <td data-label="Całkowita cena">{(product.price * product.quantity).toFixed(2)} zł</td>
                  <td>
                    <button onClick={() => removeFromCart(product)} className="remove-button">
                      Usuń
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="cart-summary">
            <h2>Podsumowanie</h2>
            <p>Łączna kwota: {calculateTotal().toFixed(2)} zł</p>
            <button className="checkout-button" onClick={handleCheckout}>Złóż zamówienie</button>
            <button className="clear-cart-button" onClick={clearCart}>Wyczyść koszyk</button>
          </div>
        </>
      )}
    </section>

    <section className="cart-mobile">
        <h1>Twój koszyk</h1>
          {products.length === 0 ? (
            <p className='cart-empty'>Koszyk jest pusty &nbsp;&rarr; &nbsp;<a href="/">Przejdź do sklepu</a></p>
          ) : (
            <>
          <div className="cart-cards">
            {products.map((product) => (
              <div className="cart-card" key={product.productId}>
                  <LazyLoadImage
                        src={product.image}
                        className='cart-item-image'
                        effect="blur"
                        alt={product.name}
                        height="auto"
                        threshold={100}
                  />
                <div className="cart-card-details">
                  <p className='product-name'>{product.name.length > 25 ? `${product.name.slice(0,25)}...` : product.name}</p>
                  
                  <p><span>Rozmiar: </span>{product.size}</p>
                  <p><span>Kolor: </span>{colorTranslations[product.color] || product.color}</p>
                  <p><span>Cena:</span> {product.price} zł</p>
                  <div className="product-quantity">
                  <span>Ilość:</span>
                    <input
                      type="number"
                      value={product.quantity || 1}
                      min="1"
                      onChange={(e) => updateQuantity(product.productId, parseInt(e.target.value, 10))}
                    />
                  </div>
                  <p><span>Całkowita cena: </span>{(product.price * product.quantity).toFixed(2)} zł</p>
                  <button onClick={() => removeFromCart(product)} className="remove-button">Usuń</button>
                </div>
            </div>))}
          </div>
          <div className="cart-summary">
            <h2>Podsumowanie</h2>
            <p>Łączna kwota: {calculateTotal().toFixed(2)} zł</p>
            <button className="checkout-button" onClick={handleCheckout}>Złóż zamówienie</button>
          </div>
          </>
        )}
    </section>
  </>
  );
};

export default CartPage;
