import React, { useEffect, useState } from 'react';
import './PopularProduct.scss';

const PopularProduct = () => {
  const [dataProduct, setDataProduct] = useState([]);
  const [error, setError] = useState(false);
  const [isFetched, setIsFetched] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:3001/products');

        if (!response.ok) {
          throw new Error(`Błąd połączenia! Status: ${response.status}`);
        }

        const data = await response.json();
        const popularProducts = data.filter(product => product.popular === "true");

        setDataProduct(popularProducts);
        setIsFetched(true);

      } catch (error) {
        console.error("Błąd podczas pobierania danych:", error);
        setError(true);
      }
    };

    if (!isFetched) {
      fetchProducts();
    }
  }, [isFetched]);

  if (error) {
    return (
      <section className='popularProduct'>
        <h1>POPULAR PRODUCT</h1>
        <div className="error-products">
          <p>Błąd podczas pobierania produktów. Przepraszamy za utrudnienia</p>
        </div>
      </section>
    );
  }

  return (
    <section className='popularProduct'>
      <h1>POPULAR PRODUCT</h1>
      <div className="popular-item">
        {dataProduct.map((item) => (
          <div className="item" key={item.id}>
            <img src={item.image} alt={item.name} />
            <p>{item.name}</p>
            <div className="item-prices">
              <div className="item-prices-new">{item.new_price}zł</div>
              <div className="item-prices-old">{item.old_price}zł</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PopularProduct;
