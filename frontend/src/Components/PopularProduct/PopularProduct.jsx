import React, { useEffect, useState } from 'react';
import './PopularProduct.scss';

const PopularProduct = () => {
  const [dataProduct, setDataProduct] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:3001/products');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setDataProduct(data);
        setLoading(false);
      } catch (error) {
        console.error("Błąd podczas pobierania danych:", error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <p>Ładowanie produktów...</p>;

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
