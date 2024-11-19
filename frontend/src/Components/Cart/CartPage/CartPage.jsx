import React, { useEffect, useState } from 'react';
import { useCart } from '../CartContext';
import './CartPage.scss';

const CartPage = () => {
  const { cart, removeFromCart } = useCart();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`http://localhost:3001/products`);
        if (!response.ok) throw new Error('Błąd pobierania produktów');
        const data = await response.json();
        // Filtruj produkty na podstawie id w koszyku
        const filteredProducts = data.filter((product) => cart.includes(product.id));
        setProducts(filteredProducts.map((product) => ({ ...product, quantity: 1 }))); // Domyślna ilość: 1
      } catch (error) {
        console.error('Błąd pobierania produktów:', error);
      } finally {
        setLoading(false);
      }
    };

    if (cart.length > 0) {
      fetchProducts();
    } else {
      setProducts([]);
      setLoading(false);
    }
  }, [cart]);

  const updateQuantity = (id, newQuantity) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === id ? { ...product, quantity: Math.max(1, newQuantity) } : product
      )
    );
  };

  const calculateTotal = () => {
    return products.reduce((total, product) => {
      const price = product.new_price || 0;
      return total + price * product.quantity;
    }, 0);
  };

  if (loading) return <p>Ładowanie koszyka...</p>;

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
                <th>Ilość</th>
                <th>Całkowita cena</th>
                <th>Usuń</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
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

    <section className="cart-mobile">
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
    </section>
  </>
  );
};

export default CartPage;
