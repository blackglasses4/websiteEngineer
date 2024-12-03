import React, { useEffect, useState } from 'react';
import { useCart } from '../CartContext';
import colorTranslations from '../../../hooks/translations';
import './CartPage.scss';

const CartPage = () => {
  const { cart, removeFromCart } = useCart();
  const [products, setProducts] = useState([]);

  const colorTranslations = {
    red: "czerwony",
    blue: "niebieski",
    green: "zielony",
    yellow: "żółty",
    black: "czarny",
    white: "biały",
    purple: "fioletowy"
    // Dodaj inne kolory według potrzeb
  };

  useEffect(() => {
    // Ustawienie produktów w stanie po załadowaniu koszyka
    setProducts(cart.map(product => ({
      ...product,
      quantity: product.quantity || 1,  // Ustawienie domyślnej ilości na 1, jeśli jest pusta
    })));
  }, [cart]);

  const updateQuantity = (productId, newQuantity) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.productId === productId ? { ...product, quantity: Math.max(1, newQuantity) } : product
      )
    );
  };

  const calculateTotal = () => {
    return products.reduce((total, product) => {
      const price = product.price || 0;
      return total + price * (product.quantity || 1);
    }, 0);
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
                        <img src={product.image} alt={product.name} className="cart-item-image" />
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
            <button className="checkout-button">Przejdź do płatności</button>
          </div>
        </>
      )}
    </section>

    {/* <section className="cart-mobile">
        <h1>Twój koszyk</h1>
          {products.length === 0 ? (
            <p className='cart-empty'>Koszyk jest pusty &nbsp;&rarr; &nbsp;<a href="/">Przejdź do sklepu</a></p>
          ) : (
            <>
          <div className="cart-cards">
            {products.map((product) => (
              <div className="cart-card" key={product.id}>
                <img
                  src={product.image}
                  alt={product.name}
                  className="cart-item-image"
                />
                <div className="cart-card-details">
                  <p className='product-name'>{product.name.length > 25 ? `${product.name.slice(0,25)}...` : product.name}</p>
                  <p><span>Cena:</span> {product.new_price} zł</p>
                  <div className="product-quantity">
                  <span>Ilość:</span>
                    <input
                      type="number"
                      value={product.quantity}
                      min="1"
                      onChange={(e) => updateQuantity(product.id, parseInt(e.target.value, 10))}
                    />
                  </div>
                  <p><span>Całkowita cena: </span>{(product.new_price * product.quantity).toFixed(2)} zł</p>
                  <button className="remove-button" onClick={() => removeFromCart(product.id)}>Usuń</button>
                </div>
            </div>))}
          </div>
          <div className="cart-summary">
            <h2>Podsumowanie</h2>
            <p>Łączna kwota: {calculateTotal().toFixed(2)} zł</p>
            <button className="checkout-button">Przejdź do płatności</button>
          </div>
          </>
        )}
    </section> */}
  </>
  );
};

export default CartPage;
